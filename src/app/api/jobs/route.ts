import { NextRequest, NextResponse } from "next/server";
import { jobManager } from "../../../lib/queue/jobManager";
import { getClientIp, acquireJobSlot, releaseJobSlot } from "../../../lib/security/rateLimiter";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!acquireJobSlot(ip)) {
    return NextResponse.json(
      { error: "Too many concurrent download jobs active. Please wait for an existing job to finish." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { url, title, platformId, selectedFormat, isBatch } = body;

    if (!url || !selectedFormat) {
      releaseJobSlot(ip);
      return NextResponse.json({ error: "Missing required job parameters." }, { status: 400 });
    }

    const job = jobManager.createJob(url, title || "Media_Download", platformId || "generic", selectedFormat, !!isBatch);
    return NextResponse.json(job, { status: 201 });
  } catch (err: any) {
    releaseJobSlot(ip);
    return NextResponse.json({ error: err?.message || "Failed to create download job." }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (id) {
    const job = jobManager.getJob(id);
    if (!job) {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }
    return NextResponse.json(job);
  }

  const jobs = jobManager.listActiveJobs();
  return NextResponse.json({ jobs });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, action } = body;

    if (!id || !action) {
      return NextResponse.json({ error: "Missing id or action." }, { status: 400 });
    }

    if (action === "cancel") {
      const cancelled = jobManager.cancelJob(id);
      return NextResponse.json({ success: cancelled, id });
    }

    if (action === "retry") {
      const retried = jobManager.retryJob(id);
      return NextResponse.json(retried || { error: "Failed to retry job." });
    }

    return NextResponse.json({ error: `Unsupported action: ${action}` }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Job action failed." }, { status: 500 });
  }
}
