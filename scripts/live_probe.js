async function probeUrl(url) {
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    console.log(`[PROBE] ${res.status} ${res.statusText} -> ${url}`);
    return { url, status: res.status };
  } catch (err) {
    console.error(`[PROBE ERROR] ${url}: ${err.message}`);
    return { url, status: 0, error: err.message };
  }
}

async function runLiveProbes() {
  console.log("=== LIVE PRODUCTION MULTI-TARGET VERIFICATION ===");
  const targets = [
    "https://techscript.is-a.dev/Vortyx/",
    "https://techscript.is-a.dev/Vortyx/manifest.webmanifest",
    "https://techscript.is-a.dev/Vortyx/icon.png",
    "https://techscript.is-a.dev/Vortyx/screenshots/home.png",
    "https://techscript.is-a.dev/Vortyx/screenshots/downloads.png",
    "https://techscript.is-a.dev/Vortyx/screenshots/satings.png",
    "https://techscript.is-a.dev/Vortyx/screenshots/galary.png",
    "https://techscript.is-a.dev/Vortyx/screenshots/statussaver.png",
    "https://techscript.is-a.dev/Vortyx/faq/",
    "https://techscript.is-a.dev/Vortyx/download/",
    "https://techscript.is-a.dev/Vortyx/providers/",
    "https://techscript.is-a.dev/Vortyx/diagnostics/",
    "https://techscript.is-a.dev/Vortyx/features/",
    "https://techscript.is-a.dev/Vortyx/screenshots/",
    "https://techscript.is-a.dev/Vortyx/sitemap.xml",
    "https://techscript.is-a.dev/Vortyx/robots.txt",
    "https://vortyx-app.web.app/",
    "https://mediapick-4f48c.web.app/"
  ];

  for (const t of targets) {
    await probeUrl(t);
  }
}

runLiveProbes();
