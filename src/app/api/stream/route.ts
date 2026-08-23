import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { downloadAndProcessMedia } from "../../../lib/media/pipeline";
import { validateUrlSecurity, SecurityError } from "../../../lib/security/ssrfGuard";
import { sanitizeFilename } from "../../../lib/security/sanitize";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url") || "";
  const sourceUrl = req.nextUrl.searchParams.get("sourceUrl") || url;
  const title = req.nextUrl.searchParams.get("title") || "Vortyx_Download";
  const format = req.nextUrl.searchParams.get("format") || "mp4";
  const type = format === "mp3" || format === "m4a" || format === "wav" ? "audio" : "video";

  if (!sourceUrl && !url) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  const targetUrl = sourceUrl || url;

  // 1. SSRF & Security Check
  try {
    await validateUrlSecurity(targetUrl);
  } catch (secErr: any) {
    if (secErr instanceof SecurityError) {
      return new NextResponse(`Security violation: ${secErr.message}`, { status: 403 });
    }
  }

  // 2. Process real media through pipeline
  try {
    // If it's a direct image file request (thumbnail)
    if (format === "jpg" || format === "jpeg" || format === "png" || format === "webp") {
      const imgRes = await fetch(targetUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        },
      });

      if (!imgRes.ok) {
        return NextResponse.redirect(targetUrl);
      }

      const imgBuffer = await imgRes.arrayBuffer();
      const filename = sanitizeFilename(title, format);

      return new NextResponse(imgBuffer, {
        status: 200,
        headers: {
          "Content-Type": format === "png" ? "image/png" : format === "webp" ? "image/webp" : "image/jpeg",
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Content-Length": imgBuffer.byteLength.toString(),
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // Video / Audio Pipeline Processing
    const media = await downloadAndProcessMedia(targetUrl, type, "1080");
    const filePath = media.filePath;
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const filename = sanitizeFilename(title, format);

    // Range Support for direct download resume
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
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // Full verified media delivery
    const stream = fs.createReadStream(filePath);
    // @ts-ignore
    return new NextResponse(stream, {
      status: 200,
      headers: {
        "Accept-Ranges": "bytes",
        "Content-Length": fileSize.toString(),
        "Content-Type": media.mimeType,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err: any) {
    return new NextResponse(`Download failed: ${err?.message || "Could not retrieve media."}`, { status: 500 });
  }
}
