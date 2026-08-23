import fs from "fs";
import path from "path";

const outDir = path.resolve(__dirname, "..", "out");

const requiredFiles = [
  // Root assets
  "icon.png",
  "app-screen-overview.png",
  "screenshots/home.png",
  "screenshots/downloads.png",
  "screenshots/galary.png",
  "screenshots/statussaver.png",
  "screenshots/satings.png",
  "screenshots/allscreens.png",
  "screenshots/homedark.png",
  "robots.txt",
  "sitemap.xml",
  "manifest.webmanifest",
  ".nojekyll",

  // Vortyx subpath assets (for GitHub Pages compatibility)
  "Vortyx/icon.png",
  "Vortyx/app-screen-overview.png",
  "Vortyx/screenshots/home.png",
  "Vortyx/screenshots/downloads.png",
  "Vortyx/screenshots/galary.png",
  "Vortyx/screenshots/statussaver.png",
  "Vortyx/screenshots/satings.png",

  // Core HTML routes
  "index.html",
  "faq/index.html",
  "download/index.html",
  "features/index.html",
  "screenshots/index.html",
  "providers/index.html",
  "about/index.html",
  "contact/index.html",
  "privacy/index.html",
  "terms/index.html",
  "changelog/index.html",
  "disclaimer/index.html",
  "data-deletion/index.html",
  "diagnostics/index.html",
  "licenses/index.html",
  "support/index.html",

  // Portal downloader landing pages
  "youtube-downloader/index.html",
  "video-downloader/index.html",
  "audio-downloader/index.html",
  "spotify-downloader/index.html",
  "soundcloud-downloader/index.html",
  "tiktok-downloader/index.html",
  "instagram-downloader/index.html",
  "facebook-downloader/index.html",
  "twitter-downloader/index.html",
  "reddit-downloader/index.html",
  "pinterest-downloader/index.html",
  "playlist-downloader/index.html",
];

async function runAssetAudit() {
  console.log("==================================================");
  console.log("🔍 RUNNING PRODUCTION ASSET & ROUTE VERIFICATION AUDIT");
  console.log("==================================================");

  if (!fs.existsSync(outDir)) {
    console.error(`❌ Output directory does not exist: ${outDir}`);
    process.exit(1);
  }

  let passed = 0;
  let failed = 0;

  for (const relPath of requiredFiles) {
    const fullPath = path.join(outDir, relPath);
    if (fs.existsSync(fullPath)) {
      const stat = fs.statSync(fullPath);
      if (stat.size > 0 || relPath === ".nojekyll") {
        console.log(`✅ [FOUND] ${relPath} (${stat.size} bytes)`);
        passed++;
      } else {
        console.error(`❌ [EMPTY] ${relPath} is 0 bytes!`);
        failed++;
      }
    } else {
      console.error(`❌ [MISSING] ${relPath} not found in ${outDir}`);
      failed++;
    }
  }

  console.log("\n--------------------------------------------------");
  console.log(`Audit Summary: ${passed} PASSED, ${failed} FAILED (Total: ${requiredFiles.length})`);
  console.log("--------------------------------------------------");

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log("🎉 ALL PRODUCTION ASSETS AND ROUTES VERIFIED SUCCESSFULLY (0 MISSING FILES)");
  }
}

runAssetAudit();
