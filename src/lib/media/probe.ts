import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";

const execAsync = promisify(exec);

export interface MagicByteResult {
  valid: boolean;
  format?: string;
  mimeType?: string;
  error?: string;
}

export interface ProbeResult {
  valid: boolean;
  format?: string;
  duration?: number;
  videoCodec?: string;
  audioCodec?: string;
  resolution?: string;
  sizeBytes?: number;
  error?: string;
}

/**
 * Validates container magic bytes directly from a buffer.
 * Rejects HTML, JSON, error responses, and invalid containers.
 */
export function validateMagicBytes(buffer: Buffer): MagicByteResult {
  if (!buffer || buffer.length < 8) {
    return { valid: false, error: "Buffer is too small to contain valid media headers." };
  }

  // Check for HTML / XML / JSON text
  const startStr = buffer.slice(0, 64).toString("utf8").trim().toLowerCase();
  if (
    startStr.startsWith("<!doctype") ||
    startStr.startsWith("<html") ||
    startStr.startsWith("<?xml") ||
    startStr.startsWith("<svg") ||
    startStr.startsWith("{") ||
    startStr.startsWith("[") ||
    startStr.includes("error") ||
    startStr.includes("404 not found") ||
    startStr.includes("403 forbidden") ||
    startStr.includes("access denied")
  ) {
    return {
      valid: false,
      error: `Payload contains text/HTML/JSON error data instead of binary media (${startStr.slice(0, 30)}...).`,
    };
  }

  // 1. MP4 / M4V / MOV (ftyp box at byte offset 4)
  if (buffer.length >= 12) {
    const boxType = buffer.toString("ascii", 4, 8);
    if (boxType === "ftyp" || boxType === "moov" || boxType === "mdat" || boxType === "free") {
      const majorBrand = buffer.toString("ascii", 8, 12).trim();
      return { valid: true, format: "mp4", mimeType: "video/mp4" };
    }
  }

  // 2. WebM / MKV (EBML Header 0x1A 0x45 0xDF 0xA3)
  if (
    buffer[0] === 0x1a &&
    buffer[1] === 0x45 &&
    buffer[2] === 0xdf &&
    buffer[3] === 0xa3
  ) {
    return { valid: true, format: "webm", mimeType: "video/webm" };
  }

  // 3. MP3 (ID3 tag or MPEG audio sync word 0xFF 0xFB / 0xFF 0xF3 / 0xFF 0xF2)
  if (buffer[0] === 0x49 && buffer[1] === 0x44 && buffer[2] === 0x33) {
    // "ID3" tag header
    return { valid: true, format: "mp3", mimeType: "audio/mpeg" };
  }
  if (
    buffer[0] === 0xff &&
    (buffer[1] === 0xfb || buffer[1] === 0xf3 || buffer[1] === 0xf2 || buffer[1] === 0xfa || buffer[1] === 0xe3)
  ) {
    // Raw MPEG audio frame header
    return { valid: true, format: "mp3", mimeType: "audio/mpeg" };
  }

  // 4. AAC (ADTS Sync word 0xFFF)
  if (buffer[0] === 0xff && (buffer[1] === 0xf1 || buffer[1] === 0xf9)) {
    return { valid: true, format: "aac", mimeType: "audio/aac" };
  }

  // 5. Ogg / Opus / Vorbis ("OggS" 0x4F 0x67 0x67 0x53)
  if (
    buffer[0] === 0x4f &&
    buffer[1] === 0x67 &&
    buffer[2] === 0x67 &&
    buffer[3] === 0x53
  ) {
    return { valid: true, format: "ogg", mimeType: "audio/ogg" };
  }

  // 6. WAV ("RIFF" ... "WAVE")
  if (
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.length >= 12 &&
    buffer.toString("ascii", 8, 12) === "WAVE"
  ) {
    return { valid: true, format: "wav", mimeType: "audio/wav" };
  }

  // 7. FLAC ("fLaC")
  if (buffer.toString("ascii", 0, 4) === "fLaC") {
    return { valid: true, format: "flac", mimeType: "audio/flac" };
  }

  // 8. JPEG (0xFF 0xD8 0xFF)
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { valid: true, format: "jpg", mimeType: "image/jpeg" };
  }

  // 9. PNG (0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A)
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return { valid: true, format: "png", mimeType: "image/png" };
  }

  // 10. WebP ("RIFF" ... "WEBP")
  if (
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.length >= 12 &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return { valid: true, format: "webp", mimeType: "image/webp" };
  }

  return {
    valid: false,
    error: `Unknown or unsupported binary signature [${buffer.slice(0, 8).toString("hex")}].`,
  };
}

/**
 * Validates a file on disk using FFprobe to inspect stream codecs, duration, and container.
 */
export async function probeMediaWithFfprobe(filePath: string): Promise<ProbeResult> {
  if (!fs.existsSync(filePath)) {
    return { valid: false, error: "File does not exist on disk." };
  }

  const stat = fs.statSync(filePath);
  if (stat.size === 0) {
    return { valid: false, error: "File is 0 bytes (empty)." };
  }

  // Fast magic byte pre-check
  try {
    const fd = fs.openSync(filePath, "r");
    const headerBuf = Buffer.alloc(64);
    fs.readSync(fd, headerBuf, 0, 64, 0);
    fs.closeSync(fd);

    const magic = validateMagicBytes(headerBuf);
    if (!magic.valid) {
      return { valid: false, error: magic.error };
    }
  } catch (err: any) {
    return { valid: false, error: `Header read failed: ${err.message}` };
  }

  // Deep probe using ffprobe if available
  try {
    const ffprobeBin = process.env.FFPROBE_PATH || "ffprobe";
    const cmd = `"${ffprobeBin}" -v error -show_format -show_streams -print_format json "${filePath.replace(/"/g, '\\"')}"`;
    const { stdout } = await execAsync(cmd, { timeout: 10000 });
    const probe = JSON.parse(stdout);

    const format = probe.format?.format_name || "unknown";
    const duration = parseFloat(probe.format?.duration || "0");
    const streams = probe.streams || [];

    const videoStream = streams.find((s: any) => s.codec_type === "video");
    const audioStream = streams.find((s: any) => s.codec_type === "audio");

    let resolution = undefined;
    if (videoStream && videoStream.width && videoStream.height) {
      resolution = `${videoStream.width}x${videoStream.height}`;
    }

    if (streams.length === 0) {
      return { valid: false, error: "No audio or video streams found in container." };
    }

    return {
      valid: true,
      format,
      duration,
      videoCodec: videoStream?.codec_name,
      audioCodec: audioStream?.codec_name,
      resolution,
      sizeBytes: stat.size,
    };
  } catch (err: any) {
    // If ffprobe fails, fallback to magic bytes
    return {
      valid: true,
      sizeBytes: stat.size,
      error: `Deep probe warning: ${err.message}`,
    };
  }
}
