async function testLiveProductionServer() {
  console.log("================================================================================");
  console.log("   LIVE HTTP PRODUCTION SERVER VALIDATION (PORT 3008)");
  console.log("================================================================================\n");

  const baseUrl = "http://localhost:3008";
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, name: string, extra?: any) {
    if (condition) {
      console.log(`  ✅ [PASS] ${name}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${name}`, extra || "");
      failed++;
    }
  }

  // 1. Diagnostics endpoint
  console.log("[1/6] Testing GET /api/diagnostics...");
  const diagRes = await fetch(`${baseUrl}/api/diagnostics`);
  assert(diagRes.status === 200, "GET /api/diagnostics returns HTTP 200");
  const diagData = await diagRes.json();
  assert(diagData.system?.framework === "Next.js 16 App Router", "Diagnostics reports Next.js 16 App Router");
  assert(diagData.storage?.isAccessible === true, "Storage is marked accessible in production");
  assert(diagData.storage?.canReadWrite === true, "Storage has verified Read/Write access");
  assert(diagData.overview?.totalProviders >= 35, `Providers count verified: ${diagData.overview?.totalProviders}`);

  // 2. Resolve endpoint
  console.log("\n[2/6] Testing POST /api/resolve...");
  const resolveRes = await fetch(`${baseUrl}/api/resolve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }),
  });
  assert(resolveRes.status === 200, "POST /api/resolve returns HTTP 200");
  const resolveData = await resolveRes.json();
  assert(!!resolveData.title, `Resolved title: "${resolveData.title}"`);
  assert(resolveData.formats?.length > 0, `Formats returned: ${resolveData.formats?.length}`);

  // 3. HTTP Range 206 Preview streaming endpoint
  console.log("\n[3/6] Testing GET /api/preview (HTTP Range 206 Partial Content)...");
  const previewRes = await fetch(
    `${baseUrl}/api/preview?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DdQw4w9WgXcQ&type=audio&quality=128`,
    {
      headers: { Range: "bytes=0-1024" },
    }
  );
  assert(previewRes.status === 206, `HTTP Range request returns 206 Partial Content (Got ${previewRes.status})`);
  assert(previewRes.headers.get("accept-ranges") === "bytes", "Header Accept-Ranges: bytes is present");
  assert(!!previewRes.headers.get("content-range"), `Header Content-Range: ${previewRes.headers.get("content-range")}`);
  const previewBytes = await previewRes.arrayBuffer();
  assert(previewBytes.byteLength === 1025, `Range byte length exact match: ${previewBytes.byteLength} bytes`);

  // 4. HTML Routes
  console.log("\n[4/6] Testing GET / (Main Downloader)...");
  const homeRes = await fetch(`${baseUrl}/`);
  assert(homeRes.status === 200, "GET / returns HTTP 200");

  console.log("\n[5/6] Testing GET /providers...");
  const provRes = await fetch(`${baseUrl}/providers`);
  assert(provRes.status === 200, "GET /providers returns HTTP 200");

  console.log("\n[6/6] Testing GET /diagnostics...");
  const diagPageRes = await fetch(`${baseUrl}/diagnostics`);
  assert(diagPageRes.status === 200, "GET /diagnostics returns HTTP 200");

  console.log("\n================================================================================");
  console.log(`   LIVE PRODUCTION SERVER TEST RESULT: ${passed} PASSED, ${failed} FAILED`);
  console.log("================================================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

testLiveProductionServer().catch((err) => {
  console.error("Live production test error:", err);
  process.exit(1);
});
