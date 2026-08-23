import { validateMagicBytes, probeMediaWithFfprobe } from "../src/lib/media/probe.ts";
import { downloadAndProcessMedia } from "../src/lib/media/pipeline.ts";
import fs from "fs";

async function runTests() {
  console.log("==================================================");
  console.log("   UNIVERSAL MEDIA PIPELINE END-TO-END TEST");
  console.log("==================================================");

  let passed = 0;
  let failed = 0;

  // 1. Magic Bytes Validation Test on HTML/JSON error payloads
  console.log("\n[TEST 1] Testing rejection of fake HTML/JSON error payloads...");
  const fakeHtml = Buffer.from("<!DOCTYPE html><html><body>Error 404 Not Found</body></html>");
  const fakeJson = Buffer.from('{"status":"error","message":"Rate limit exceeded"}');
  const resHtml = validateMagicBytes(fakeHtml);
  const resJson = validateMagicBytes(fakeJson);

  if (!resHtml.valid && !resJson.valid) {
    console.log("  ✅ PASSED: Fake HTML/JSON payloads correctly rejected.");
    passed++;
  } else {
    console.error("  ❌ FAILED: Fake HTML/JSON was not rejected!", resHtml, resJson);
    failed++;
  }

  // 2. Magic Bytes Validation Test on Synthetic MP4 and MP3 headers
  console.log("\n[TEST 2] Testing binary signature detection (MP4 & MP3)...");
  // MP4 ftyp box header
  const mp4Header = Buffer.from([0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d]);
  // MP3 ID3 header
  const mp3Header = Buffer.from([0x49, 0x44, 0x33, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0a]);

  const resMp4 = validateMagicBytes(mp4Header);
  const resMp3 = validateMagicBytes(mp3Header);

  if (resMp4.valid && resMp4.format === "mp4" && resMp3.valid && resMp3.format === "mp3") {
    console.log("  ✅ PASSED: MP4 (ftyp) and MP3 (ID3) headers detected correctly.");
    passed++;
  } else {
    console.error("  ❌ FAILED: Binary signatures failed detection.", resMp4, resMp3);
    failed++;
  }

  // 3. Test real media pipeline extraction on public test video
  console.log("\n[TEST 3] Testing full end-to-end media pipeline download & verification...");
  const testUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  try {
    console.log("  -> Downloading and processing media stream for test video...");
    const result = await downloadAndProcessMedia(testUrl, "audio", "128", (p, speed) => {
      process.stdout.write(`\r  -> Progress: ${p.toFixed(1)}% at ${speed}      `);
    });

    console.log("\n  -> Media file successfully retrieved:", result.filePath);
    console.log("  -> File Size:", (result.sizeBytes / 1024 / 1024).toFixed(2), "MB");
    console.log("  -> Detected Format:", result.format);
    console.log("  -> Duration:", result.duration.toFixed(1), "seconds");
    console.log("  -> Audio Codec:", result.probe.audioCodec || "N/A");

    if (result.sizeBytes > 100000 && result.duration > 30 && result.probe.valid) {
      console.log("  ✅ PASSED: Real playable media bytes verified with valid duration and stream codec.");
      passed++;
    } else {
      console.error("  ❌ FAILED: File produced was invalid or too small.", result);
      failed++;
    }
  } catch (err) {
    console.error("  ❌ FAILED: Media pipeline encountered an error:", err.message);
    failed++;
  }

  console.log("\n==================================================");
  console.log(`   TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("==================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
