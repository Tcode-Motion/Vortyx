import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-static";

const ALLOWED_ORIGINS = [
  "https://techscript.is-a.dev",
  "https://web.whatsapp.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3008",
  "http://127.0.0.1:3008",
];

function getCorsHeaders(origin: string | null) {
  const isAllowed = origin && (ALLOWED_ORIGINS.includes(origin) || origin.startsWith("chrome-extension://") || origin.startsWith("moz-extension://"));
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, X-Correlation-ID",
    "Access-Control-Max-Age": "86400",
  };
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(origin),
  });
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin");
  const authToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = Date.now() + 1000 * 60 * 30; // 30 minutes

  return NextResponse.json(
    {
      success: true,
      authToken,
      tokenType: "Bearer",
      expiresAt,
      scope: ["wa-status-discovery", "local-sandbox"],
      timestamp: Date.now(),
    },
    {
      status: 200,
      headers: getCorsHeaders(origin),
    }
  );
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  try {
    const body = await request.json().catch(() => ({}));
    const refreshToken = body?.refreshToken;
    const newAuthToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = Date.now() + 1000 * 60 * 30;

    return NextResponse.json(
      {
        success: true,
        authToken: newAuthToken,
        tokenType: "Bearer",
        expiresAt,
        scope: ["wa-status-discovery", "local-sandbox"],
        refreshed: !!refreshToken,
        timestamp: Date.now(),
      },
      {
        status: 200,
        headers: getCorsHeaders(origin),
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Malformed auth-token request",
      },
      {
        status: 400,
        headers: getCorsHeaders(origin),
      }
    );
  }
}
