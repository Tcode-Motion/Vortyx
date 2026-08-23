import fs from "fs";
import path from "path";
import sitemap from "../src/app/sitemap";
import robots from "../src/app/robots";

async function runSeoAudit() {
  console.log("================================================================================");
  console.log("   VORTYX PRODUCTION SEO & METADATA AUDIT TEST SUITE");
  console.log("================================================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${testName}${detail ? ` (${detail})` : ""}`);
      failed++;
    }
  }

  // --- 1. Sitemap Verification ---
  console.log("[STAGE 1] Testing Dynamic Sitemap Output...");
  const sitemapEntries = sitemap();
  assert(Array.isArray(sitemapEntries) && sitemapEntries.length >= 20, `Sitemap contains ${sitemapEntries.length} canonical URLs (>= 20 required)`);

  const sitemapUrls = sitemapEntries.map((e) => e.url);
  const requiredSitemapPaths = [
    "/video-downloader",
    "/youtube-downloader",
    "/audio-downloader",
    "/playlist-downloader",
    "/instagram-downloader",
    "/tiktok-downloader",
    "/spotify-downloader",
    "/soundcloud-downloader",
    "/facebook-downloader",
    "/twitter-downloader",
    "/reddit-downloader",
    "/pinterest-downloader",
    "/providers",
    "/faq",
    "/features",
    "/download",
  ];

  for (const p of requiredSitemapPaths) {
    const found = sitemapUrls.some((u) => u.endsWith(p));
    assert(found, `Sitemap includes canonical page for ${p}`);
  }

  // Verify technical/internal pages are EXCLUDED from sitemap
  const disallowedInSitemap = ["/api", "/diagnostics", "/_next", "/admin"];
  for (const dis of disallowedInSitemap) {
    const hasDisallowed = sitemapUrls.some((u) => u.includes(dis));
    assert(!hasDisallowed, `Technical route "${dis}" is safely excluded from sitemap`);
  }

  // --- 2. Robots.txt Rules ---
  console.log("\n[STAGE 2] Testing Robots.txt Directives & Sitemap Reference...");
  const robotsConfig = robots();
  assert(!!robotsConfig.sitemap, `Robots links to sitemap: ${robotsConfig.sitemap}`);
  assert(robotsConfig.rules !== undefined, "Robots rules are defined");

  // --- 3. Page File Audits (Metadata, H1, Schema.org) ---
  console.log("\n[STAGE 3] Auditing Dedicated SEO Landing Pages...");
  const appDir = path.resolve(process.cwd(), "src/app");

  const seoPages = [
    { route: "youtube-downloader", schema: "WebApplication" },
    { route: "video-downloader", schema: "WebApplication" },
    { route: "audio-downloader", schema: "WebApplication" },
    { route: "playlist-downloader", schema: "WebApplication" },
    { route: "instagram-downloader", schema: "WebApplication" },
    { route: "tiktok-downloader", schema: "WebApplication" },
    { route: "spotify-downloader", schema: "WebApplication" },
    { route: "soundcloud-downloader", schema: "WebApplication" },
    { route: "facebook-downloader", schema: "WebApplication" },
    { route: "twitter-downloader", schema: "WebApplication" },
    { route: "reddit-downloader", schema: "WebApplication" },
    { route: "pinterest-downloader", schema: "WebApplication" },
  ];

  for (const page of seoPages) {
    const pagePath = path.join(appDir, page.route, "page.tsx");
    assert(fs.existsSync(pagePath), `Page file exists for /${page.route}`);

    const content = fs.readFileSync(pagePath, "utf-8");

    // Title & Description in metadata
    assert(content.includes("title:"), `Metadata title defined for /${page.route}`);
    assert(content.includes("description:"), `Meta description defined for /${page.route}`);
    assert(content.includes("canonical:"), `Canonical URL configured for /${page.route}`);
    assert(content.includes("openGraph:"), `Open Graph metadata defined for /${page.route}`);

    // H1 Heading
    assert(content.includes("<h1"), `Semantic H1 heading present in /${page.route}`);

    // FAQ and JSON-LD schema
    assert(content.includes('application/ld+json'), `Schema.org JSON-LD structured data in /${page.route}`);
    assert(content.includes("FAQPage"), `FAQPage schema in /${page.route}`);
  }

  // --- 4. Keyword Research Artifact Verification ---
  console.log("\n[STAGE 4] Verifying Keyword Strategy Database...");
  const keywordDocPath = path.resolve(process.cwd(), "docs/seo_keyword_strategy.md");
  assert(fs.existsSync(keywordDocPath), "Keyword strategy document exists in docs/seo_keyword_strategy.md");
  const keywordContent = fs.readFileSync(keywordDocPath, "utf-8");
  assert(keywordContent.includes("Cluster 1"), "Keyword research contains structured search clusters");
  assert(keywordContent.includes("Transactional"), "Keyword research covers search intent classifications");

  // --- Summary ---
  console.log("\n================================================================================");
  console.log(`   SEO AUDIT SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("================================================================================\n");

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runSeoAudit().catch((err) => {
  console.error("SEO audit test error:", err);
  process.exit(1);
});
