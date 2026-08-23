import { NextRequest } from "next/server";

interface RateLimitBucket {
  tokens: number;
  lastRefill: number;
  activeJobs: number;
}

const IP_BUCKETS = new Map<string, RateLimitBucket>();

// Rate Limit Config
const MAX_TOKENS = 30; // Max requests per window
const REFILL_RATE_PER_SEC = 0.5; // 30 requests per minute
const MAX_CONCURRENT_JOBS_PER_IP = 4;
export const MAX_PLAYLIST_ITEMS = 50;
export const MAX_FILE_SIZE_BYTES = 500 * 1024 * 1024; // 500 MB
export const MAX_DURATION_SECONDS = 180 * 60; // 3 hours

/**
 * Extracts client IP from Next.js request headers
 */
export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0].trim();
    if (first) return first;
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

/**
 * Checks and consumes a token for the client IP.
 * Returns true if allowed, false if rate limited.
 */
export function checkRateLimit(ip: string): { allowed: boolean; remaining: number; retryAfter?: number } {
  const now = Date.now();
  let bucket = IP_BUCKETS.get(ip);

  if (!bucket) {
    bucket = { tokens: MAX_TOKENS, lastRefill: now, activeJobs: 0 };
    IP_BUCKETS.set(ip, bucket);
  } else {
    // Refill tokens based on elapsed time
    const elapsedSec = (now - bucket.lastRefill) / 1000;
    bucket.tokens = Math.min(MAX_TOKENS, bucket.tokens + elapsedSec * REFILL_RATE_PER_SEC);
    bucket.lastRefill = now;
  }

  if (bucket.tokens >= 1) {
    bucket.tokens -= 1;
    return { allowed: true, remaining: Math.floor(bucket.tokens) };
  }

  const retryAfter = Math.ceil((1 - bucket.tokens) / REFILL_RATE_PER_SEC);
  return { allowed: false, remaining: 0, retryAfter };
}

/**
 * Tracks active jobs for concurrency limiting
 */
export function acquireJobSlot(ip: string): boolean {
  const bucket = IP_BUCKETS.get(ip) || { tokens: MAX_TOKENS, lastRefill: Date.now(), activeJobs: 0 };
  if (bucket.activeJobs >= MAX_CONCURRENT_JOBS_PER_IP) {
    return false;
  }
  bucket.activeJobs += 1;
  IP_BUCKETS.set(ip, bucket);
  return true;
}

export function releaseJobSlot(ip: string): void {
  const bucket = IP_BUCKETS.get(ip);
  if (bucket && bucket.activeJobs > 0) {
    bucket.activeJobs -= 1;
  }
}

// Periodic cleanup of idle buckets every 10 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, bucket] of IP_BUCKETS.entries()) {
      if (now - bucket.lastRefill > 600000 && bucket.activeJobs === 0) {
        IP_BUCKETS.delete(ip);
      }
    }
  }, 600000);
}
