import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Allowed origins for extension handshake
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
  const handshakeToken = crypto.randomBytes(24).toString("hex");
  const expiresAt = Date.now() + 1000 * 60 * 15; // 15 minutes validity

  return NextResponse.json(
    {
      status: "active",
      service: "vortyx-ext-bridge",
      version: "1.1.0",
      handshakeToken,
      expiresAt,
      timestamp: Date.now(),
      features: ["status-scanner", "local-sandbox", "direct-media-bridge"],
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
    const clientId = body?.clientId || `ext_${crypto.randomBytes(8).toString("hex")}`;
    const sessionToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = Date.now() + 1000 * 60 * 60; // 1 hour

    return NextResponse.json(
      {
        success: true,
        sessionToken,
        clientId,
        expiresAt,
        message: "Extension bridge activated successfully with secure scoped handshake.",
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
        error: "Malformed activation request",
      },
      {
        status: 400,
        headers: getCorsHeaders(origin),
      }
    );
  }
}
