import dns from "dns";
import net from "net";

export class SecurityError extends Error {
  public code: string;
  constructor(message: string, code: string = "SSRF_VIOLATION") {
    super(message);
    this.name = "SecurityError";
    this.code = code;
  }
}

/**
 * Checks whether an IPv4 address is in a private, loopback, or cloud-metadata range.
 */
function isPrivateIPv4(ip: string): boolean {
  const parts = ip.split(".").map((p) => parseInt(p, 10));
  if (parts.length !== 4 || parts.some(isNaN)) return true;

  const [a, b] = parts;

  // 0.0.0.0/8 (Broadcast/Current network)
  if (a === 0) return true;

  // 127.0.0.0/8 (Loopback)
  if (a === 127) return true;

  // 10.0.0.0/8 (Private RFC1918)
  if (a === 10) return true;

  // 172.16.0.0/12 (Private RFC1918)
  if (a === 172 && b >= 16 && b <= 31) return true;

  // 192.168.0.0/16 (Private RFC1918)
  if (a === 192 && b === 168) return true;

  // 169.254.0.0/16 (Link-local & AWS/GCP/Azure Cloud Metadata 169.254.169.254)
  if (a === 169 && b === 254) return true;

  // 100.64.0.0/10 (Carrier-grade NAT)
  if (a === 100 && b >= 64 && b <= 127) return true;

  // 192.0.0.0/24 (IETF Protocol Assignments)
  if (a === 192 && b === 0) return true;

  // 224.0.0.0/4 (Multicast) & 240.0.0.0/4 (Reserved)
  if (a >= 224) return true;

  return false;
}

/**
 * Checks whether an IPv6 address is in a loopback, link-local, or private range.
 */
function isPrivateIPv6(ip: string): boolean {
  const clean = ip.toLowerCase().trim();

  // Loopback ::1
  if (clean === "::1" || clean === "0:0:0:0:0:0:0:1") return true;

  // Unspecified ::
  if (clean === "::" || clean === "0:0:0:0:0:0:0:0") return true;

  // Link-local fe80::/10
  if (clean.startsWith("fe8") || clean.startsWith("fe9") || clean.startsWith("fea") || clean.startsWith("feb")) {
    return true;
  }

  // Unique local fc00::/7 (fc00:: and fd00::)
  if (clean.startsWith("fc") || clean.startsWith("fd")) {
    return true;
  }

  // IPv4-mapped IPv6 ::ffff:127.0.0.1
  if (clean.includes("::ffff:")) {
    const ipv4Part = clean.split("::ffff:")[1];
    if (ipv4Part && net.isIPv4(ipv4Part)) {
      return isPrivateIPv4(ipv4Part);
    }
  }

  return false;
}

/**
 * Pre-resolves DNS and validates that the host does not resolve to any forbidden IP address.
 */
export async function validateHostSecurity(hostname: string): Promise<string> {
  const cleanHost = hostname.trim().toLowerCase();

  // Quick rejection of obvious internal hosts
  if (
    cleanHost === "localhost" ||
    cleanHost.endsWith(".localhost") ||
    cleanHost.endsWith(".local") ||
    cleanHost.endsWith(".internal") ||
    cleanHost === "metadata.google.internal" ||
    cleanHost === "169.254.169.254"
  ) {
    throw new SecurityError(`Access to internal host '${cleanHost}' is forbidden.`);
  }

  // If directly provided as IP
  if (net.isIPv4(cleanHost)) {
    if (isPrivateIPv4(cleanHost)) {
      throw new SecurityError(`Access to private IP address '${cleanHost}' is blocked.`);
    }
    return cleanHost;
  }

  if (net.isIPv6(cleanHost)) {
    if (isPrivateIPv6(cleanHost)) {
      throw new SecurityError(`Access to private IPv6 address '${cleanHost}' is blocked.`);
    }
    return cleanHost;
  }

  // DNS Pre-Resolution to prevent DNS-rebinding
  try {
    const lookup = await dns.promises.lookup(cleanHost, { all: true });
    if (!lookup || lookup.length === 0) {
      throw new SecurityError(`Could not resolve hostname '${cleanHost}'.`);
    }

    for (const record of lookup) {
      if (record.family === 4 && isPrivateIPv4(record.address)) {
        throw new SecurityError(
          `Host '${cleanHost}' resolved to restricted private IP '${record.address}'. Blocked.`
        );
      }
      if (record.family === 6 && isPrivateIPv6(record.address)) {
        throw new SecurityError(
          `Host '${cleanHost}' resolved to restricted IPv6 '${record.address}'. Blocked.`
        );
      }
    }

    return lookup[0].address;
  } catch (err: any) {
    if (err instanceof SecurityError) throw err;
    throw new SecurityError(`DNS lookup failed for '${cleanHost}': ${err.message}`);
  }
}

/**
 * Validates a full URL before any network operation:
 * - Scheme must be http: or https:
 * - Port must be 80, 443, or default
 * - Host must not resolve to any private/loopback/cloud IP
 */
export async function validateUrlSecurity(targetUrl: string): Promise<URL> {
  let parsed: URL;
  try {
    parsed = new URL(targetUrl.trim());
  } catch {
    throw new SecurityError("Invalid URL format.");
  }

  // Protocol validation
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new SecurityError(
      `Unsupported protocol '${parsed.protocol}'. Only HTTP and HTTPS are permitted.`
    );
  }

  // Port whitelist
  const port = parsed.port ? parseInt(parsed.port, 10) : parsed.protocol === "https:" ? 443 : 80;
  if (port !== 80 && port !== 443 && port !== 8080 && port !== 8443) {
    throw new SecurityError(`Access to non-standard port ${port} is forbidden.`);
  }

  // DNS & IP Validation
  await validateHostSecurity(parsed.hostname);

  return parsed;
}

/**
 * Secure multi-hop HTTP fetcher with redirect validation and DNS-rebinding protection on every hop.
 */
export async function secureFetch(
  targetUrl: string,
  options: RequestInit = {},
  maxRedirects: number = 3
): Promise<Response> {
  let currentUrl = targetUrl;
  let redirectsRemaining = maxRedirects;

  while (true) {
    const validatedUrl = await validateUrlSecurity(currentUrl);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
      const response = await fetch(validatedUrl.toString(), {
        ...options,
        redirect: "manual", // Handle redirects manually to validate destination IP
        signal: controller.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          ...options.headers,
        },
      });

      clearTimeout(timeout);

      // Handle redirect status codes
      if ([301, 302, 303, 307, 308].includes(response.status)) {
        if (redirectsRemaining <= 0) {
          throw new SecurityError("Exceeded maximum redirect limit.");
        }
        redirectsRemaining--;

        const location = response.headers.get("location");
        if (!location) {
          return response;
        }

        // Resolve relative redirects against current URL
        currentUrl = new URL(location, validatedUrl).toString();
        continue;
      }

      return response;
    } catch (err: any) {
      clearTimeout(timeout);
      if (err instanceof SecurityError) throw err;
      if (err.name === "AbortError") {
        throw new SecurityError("Request timed out while connecting to destination.");
      }
      throw new SecurityError(`Network request failed: ${err.message}`);
    }
  }
}

export { sanitizeFilename } from "./sanitize";
