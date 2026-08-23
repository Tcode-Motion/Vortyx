import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { downloadAndProcessMedia } from "../../../lib/media/pipeline";
import { validateUrlSecurity, SecurityError } from "../../../lib/security/ssrfGuard";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const targetUrl = req.nextUrl.searchParams.get("url") || "";
  const type = (req.nextUrl.searchParams.get("type") || "video") as "video" | "audio";
  const quality = req.nextUrl.searchParams.get("quality") || "1080";

  if (!targetUrl) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  // 1. SSRF Protection
  try {
    await validateUrlSecurity(targetUrl);
  } catch (err: any) {
    if (err instanceof SecurityError) {
      return new NextResponse(`Security violation: ${err.message}`, { status: 403 });
    }
  }

  try {
    // 2. Fetch and verify real media file via pipeline
    const media = await downloadAndProcessMedia(targetUrl, type, quality);
    const filePath = media.filePath;
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;

    // 3. Handle Range Requests for HTML5 Video/Audio seek & scrub
    const range = req.headers.get("range");

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize || end >= fileSize || start > end) {
        return new NextResponse(null, {
          status: 416,
          headers: { "Content-Range": `bytes */${fileSize}` },
        });
      }

      const chunksize = end - start + 1;
      const stream = fs.createReadStream(filePath, { start, end });

      // @ts-ignore
      return new NextResponse(stream, {
        status: 206,
        headers: {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunksize.toString(),
          "Content-Type": media.mimeType,
          "Content-Disposition": "inline",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    // Full file stream
    const stream = fs.createReadStream(filePath);
    // @ts-ignore
    return new NextResponse(stream, {
      status: 200,
      headers: {
        "Accept-Ranges": "bytes",
        "Content-Length": fileSize.toString(),
        "Content-Type": media.mimeType,
        "Content-Disposition": "inline",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err: any) {
    return new NextResponse(`Media preview failed: ${err.message}`, { status: 500 });
  }
}
