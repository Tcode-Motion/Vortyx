import { GET as activateGET, POST as activatePOST, OPTIONS as activateOPTIONS } from "../src/app/api/ext/activate/route";
import { GET as authGET, POST as authPOST, OPTIONS as authOPTIONS } from "../src/app/api/ext/auth-token/route";
import { NextRequest } from "next/server";

async function runExtensionApiTests() {
  console.log("================================================================================");
  console.log("   VORTYX EXTENSION API & HANDSHAKE TEST SUITE");
  console.log("================================================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, msg: string) {
    if (condition) {
      console.log(`  ✅ [PASS] ${msg}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${msg}`);
      failed++;
    }
  }

  console.log("[STAGE 1] Testing /api/ext/activate Endpoint...");
  
  // 1. GET activate
  const reqGet = new NextRequest("http://localhost:3000/api/ext/activate", {
    method: "GET",
    headers: { origin: "https://web.whatsapp.com" },
  });
  const resGet = await activateGET(reqGet);
  const dataGet = await resGet.json();
  assert(resGet.status === 200, "Activate GET returns status 200");
  assert(dataGet.status === "active", "Activate GET returns status 'active'");
  assert(!!dataGet.handshakeToken, "Activate GET returns handshakeToken");
  assert(dataGet.expiresAt > Date.now(), "Activate GET returns future expiresAt timestamp");

  // 2. OPTIONS CORS activate
  const reqOpt = new NextRequest("http://localhost:3000/api/ext/activate", {
    method: "OPTIONS",
    headers: { origin: "https://web.whatsapp.com" },
  });
  const resOpt = await activateOPTIONS(reqOpt);
  assert(resOpt.status === 204, "Activate OPTIONS returns 204 No Content for CORS preflight");
  assert(resOpt.headers.get("Access-Control-Allow-Origin") === "https://web.whatsapp.com", "Activate OPTIONS sets CORS origin correctly");

  // 3. POST activate
  const reqPost = new NextRequest("http://localhost:3000/api/ext/activate", {
    method: "POST",
    headers: { "Content-Type": "application/json", origin: "http://localhost:3000" },
    body: JSON.stringify({ clientId: "test_client_1" }),
  });
  const resPost = await activatePOST(reqPost);
  const dataPost = await resPost.json();
  assert(resPost.status === 200, "Activate POST returns 200");
  assert(dataPost.success === true, "Activate POST returns success=true");
  assert(dataPost.clientId === "test_client_1", "Activate POST preserves clientId");
  assert(!!dataPost.sessionToken, "Activate POST generates sessionToken");

  console.log("\n[STAGE 2] Testing /api/ext/auth-token Endpoint...");

  // 4. GET auth-token
  const reqAuthGet = new NextRequest("http://localhost:3000/api/ext/auth-token", {
    method: "GET",
    headers: { origin: "http://localhost:3000" },
  });
  const resAuthGet = await authGET(reqAuthGet);
  const dataAuthGet = await resAuthGet.json();
  assert(resAuthGet.status === 200, "Auth token GET returns 200");
  assert(dataAuthGet.success === true, "Auth token GET returns success=true");
  assert(!!dataAuthGet.authToken, "Auth token GET returns authToken string");
  assert(dataAuthGet.tokenType === "Bearer", "Auth token GET returns Bearer tokenType");

  // 5. POST auth-token refresh
  const reqAuthPost = new NextRequest("http://localhost:3000/api/ext/auth-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: "sample_refresh" }),
  });
  const resAuthPost = await authPOST(reqAuthPost);
  const dataAuthPost = await resAuthPost.json();
  assert(resAuthPost.status === 200, "Auth token POST returns 200");
  assert(dataAuthPost.refreshed === true, "Auth token POST handles token refresh");

  console.log("\n================================================================================");
  console.log(`   EXTENSION API AUDIT SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("================================================================================\n");

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runExtensionApiTests().catch((e) => {
  console.error(e);
  process.exit(1);
});
