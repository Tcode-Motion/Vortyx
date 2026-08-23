import { NextRequest, NextResponse } from "next/server";
import { providerRegistry } from "../../../lib/providers/registry";
import { validateUrlSecurity, SecurityError } from "../../../lib/security/ssrfGuard";
import { checkRateLimit, getClientIp } from "../../../lib/security/rateLimiter";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rateLimit = checkRateLimit(ip);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: `Daily / rate limit reached for this session. Please wait ${rateLimit.retryAfter || 5} seconds before extracting another media stream.`,
        isLimitReached: true,
        errorVideoUrl: "/error-video.mp4",
      },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const targetUrl = (body.url || "").trim();
    const mode = body.mode || "auto";

    if (!targetUrl) {
      return NextResponse.json(
        {
          error: "Please provide a valid media URL from YouTube, Spotify, Instagram, TikTok, etc.",
          isError: true,
          errorVideoUrl: "/error-video.mp4",
        },
        { status: 400 }
      );
    }

    // SSRF & DNS-Rebind Security Check
    try {
      await validateUrlSecurity(targetUrl);
    } catch (secErr: any) {
      return NextResponse.json(
        {
          error: `Security violation: ${secErr.message}`,
          isError: true,
          errorVideoUrl: "/error-video.mp4",
        },
        { status: 403 }
      );
    }

    // Resolve via ProviderRegistry
    const normalized = await providerRegistry.resolve(targetUrl, { preferredMode: mode });
    return NextResponse.json(normalized);
  } catch (err: any) {
    if (err instanceof SecurityError) {
      return NextResponse.json(
        { error: err.message, isError: true, errorVideoUrl: "/error-video.mp4" },
        { status: 403 }
      );
    }
    return NextResponse.json(
      {
        error: err?.message || "Failed to extract media from the requested URL.",
        isError: true,
        errorVideoUrl: "/error-video.mp4",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const targetUrl = req.nextUrl.searchParams.get("url") || "";
  const mode = (req.nextUrl.searchParams.get("mode") || "auto") as "auto" | "audio" | "video";

  if (!targetUrl) {
    return NextResponse.json(
      { error: "Query parameter 'url' is required.", isError: true, errorVideoUrl: "/error-video.mp4" },
      { status: 400 }
    );
  }

  const ip = getClientIp(req);
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Rate limit reached.", isLimitReached: true, errorVideoUrl: "/error-video.mp4" },
      { status: 429 }
    );
  }

  try {
    await validateUrlSecurity(targetUrl);
    const normalized = await providerRegistry.resolve(targetUrl, { preferredMode: mode });
    return NextResponse.json(normalized);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Media extraction failed.", isError: true, errorVideoUrl: "/error-video.mp4" },
      { status: 500 }
    );
  }
}
