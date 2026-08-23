import { exec, spawn } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { validateMagicBytes, probeMediaWithFfprobe, ProbeResult } from "./probe";
import { sanitizeFilename } from "../security/sanitize";
import { diskStorage } from "../storage/diskStorage";

const execAsync = promisify(exec);

export interface ProcessedMediaResult {
  filePath: string;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  duration: number;
  format: string;
  probe: ProbeResult;
}

function getYtDlpBin(): string {
  return process.env.YTDLP_PATH || "yt-dlp";
}

function getFfmpegBin(): string {
  return process.env.FFMPEG_PATH || "ffmpeg";
}

/**
 * Extracts raw metadata using yt-dlp with android+web player client arguments.
 */
export async function extractMediaInfo(url: string): Promise<any> {
  const cleanUrl = url.trim();
  const ytdlp = getYtDlpBin();
  const cmd = `"${ytdlp}" --extractor-args "youtube:player_client=android,web,mweb" -j --no-warnings --no-check-certificates --skip-download "${cleanUrl.replace(/"/g, '\\"')}"`;

  try {
    const { stdout } = await execAsync(cmd, { timeout: 30000, maxBuffer: 15 * 1024 * 1024 });
    return JSON.parse(stdout);
  } catch (err: any) {
    throw new Error(`Media metadata extraction error: ${err.message}`);
  }
}

/**
 * Downloads and processes real media into a verified, standalone container (MP4 for video, MP3 for audio).
 */
export async function downloadAndProcessMedia(
  url: string,
  type: "video" | "audio",
  quality: string = "1080",
  onProgress?: (progress: number, speed: string, downloadedBytes: number) => void
): Promise<ProcessedMediaResult> {
  diskStorage.ensureDirs();

  const hash = crypto.createHash("md5").update(`${url}_${type}_${quality}`).digest("hex");
  const extension = type === "audio" ? "mp3" : "mp4";
  const finalFilePath = diskStorage.resolveSafePath("completed", `${hash}.${extension}`);
  const tempTemplate = path.join(diskStorage.getTempDir(), `${hash}.%(ext)s`);

  // Return cached file if valid and not expired (< 30 mins old)
  if (fs.existsSync(finalFilePath)) {
    const stat = fs.statSync(finalFilePath);
    if (Date.now() - stat.mtimeMs < 30 * 60 * 1000 && stat.size > 1024) {
      const probe = await probeMediaWithFfprobe(finalFilePath);
      if (probe.valid) {
        return {
          filePath: finalFilePath,
          filename: `Vortyx_Media.${extension}`,
          mimeType: type === "audio" ? "audio/mpeg" : "video/mp4",
          sizeBytes: stat.size,
          duration: probe.duration || 0,
          format: probe.format || extension,
          probe,
        };
      }
    }
    // Remove invalid or stale file
    try {
      fs.unlinkSync(finalFilePath);
    } catch {
      // Ignore
    }
  }

  // Construct yt-dlp arguments with android+web player client fallback
  const ytdlp = getYtDlpBin();
  const ffmpeg = getFfmpegBin();

  const args: string[] = [
    "--extractor-args",
    "youtube:player_client=android,web,mweb",
    "--no-warnings",
    "--no-check-certificates",
    "--newline",
    "-o",
    tempTemplate,
  ];

  if (process.env.FFMPEG_PATH) {
    args.push("--ffmpeg-location", ffmpeg);
  }

  if (type === "audio") {
    args.push("-x", "--audio-format", "mp3", "--audio-quality", "0");
  } else {
    // 18 / best mp4 container
    args.push(
      "-f",
      "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/bestvideo+bestaudio/best",
      "--merge-output-format",
      "mp4"
    );
  }

  args.push(url);

  return new Promise((resolve, reject) => {
    let errorOutput = "";
    const proc = spawn(ytdlp, args);

    proc.stdout.on("data", (data) => {
      const text = data.toString();
      // Parse progress: [download]  45.2% of ~  12.34MiB at  2.45MiB/s ETA 00:05
      const match = text.match(/\[download\]\s+([\d\.]+)%\s+of\s+~?([\d\.]+\w+)\s+at\s+([\d\.]+\w+\/s)/);
      if (match && onProgress) {
        const percent = parseFloat(match[1]);
        const speed = match[3];
        onProgress(percent, speed, 0);
      }
    });

    proc.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    proc.on("close", async (code) => {
      if (code !== 0 && !fs.existsSync(finalFilePath)) {
        // Check if a file was downloaded with a different extension in temp folder
        const tempDir = diskStorage.getTempDir();
        try {
          const files = fs.readdirSync(tempDir);
          const matched = files.find((f) => f.startsWith(hash));
          if (matched) {
            const downloadedPath = path.join(tempDir, matched);
            // Move / rename to final file path
            await fs.promises.rename(downloadedPath, finalFilePath);
          } else {
            return reject(new Error(`Extraction pipeline failed (code ${code}): ${errorOutput.slice(-300)}`));
          }
        } catch (e: any) {
          return reject(new Error(`Extraction pipeline error: ${e.message}`));
        }
      }

      // Check if temp file needs to be moved to completed folder
      if (!fs.existsSync(finalFilePath)) {
        const tempPath = path.join(diskStorage.getTempDir(), `${hash}.${extension}`);
        if (fs.existsSync(tempPath)) {
          try {
            await fs.promises.rename(tempPath, finalFilePath);
          } catch {
            // Ignore
          }
        }
      }

      if (!fs.existsSync(finalFilePath)) {
        return reject(new Error("Extracted media file was not generated on disk."));
      }

      // Probe final media file to verify valid audio/video container
      try {
        const probe = await probeMediaWithFfprobe(finalFilePath);
        if (!probe.valid) {
          try {
            fs.unlinkSync(finalFilePath);
          } catch {}
          return reject(new Error(`Media container validation rejected the file: ${probe.error}`));
        }

        const stat = fs.statSync(finalFilePath);
        resolve({
          filePath: finalFilePath,
          filename: `Vortyx_Media.${extension}`,
          mimeType: type === "audio" ? "audio/mpeg" : "video/mp4",
          sizeBytes: stat.size,
          duration: probe.duration || 0,
          format: probe.format || extension,
          probe,
        });
      } catch (err: any) {
        reject(new Error(`Failed to validate final media container: ${err.message}`));
      }
    });

    proc.on("error", (err) => {
      reject(new Error(`Failed to spawn yt-dlp binary: ${err.message}`));
    });
  });
}
