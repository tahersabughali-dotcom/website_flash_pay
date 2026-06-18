/**
 * Flash Pay — public release candidate production readiness check (Step 32).
 * Simulates production flag resolution — does not print secrets.
 *
 * Run: npx tsx scripts/check-production-readiness.ts
 */

import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getProductionSimulatedResolvedFlags } from "../src/lib/config/featureFlags";
import { getAllSitemapEntries } from "../src/lib/sitemap";
import { featureFlagsData } from "../src/data/featureFlagsData";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

interface CheckResult {
  id: string;
  label: string;
  pass: boolean;
  detail: string;
}

function yesNo(value: boolean): string {
  return value ? "yes" : "no";
}

function runChecks(): CheckResult[] {
  const resolved = getProductionSimulatedResolvedFlags();
  const sitemapPaths = getAllSitemapEntries().map((entry) => entry.path);
  const adminInSitemap = sitemapPaths.some((path) => path.startsWith("/admin"));

  const legalPaths = ["/privacy-policy", "/terms", "/risk-disclaimer", "/security"];
  const legalPresent = legalPaths.every((path) => sitemapPaths.includes(path));

  const hubPaths = ["/currencies", "/payment-methods", "/request", "/trust", "/contact"];
  const hubsPresent = hubPaths.every((path) => sitemapPaths.includes(path));

  const envExamplePath = join(ROOT, ".env.example");
  const envExample = existsSync(envExamplePath) ? readFileSync(envExamplePath, "utf8") : "";
  const envExampleSafe =
    envExample.includes("NEXT_PUBLIC_ENABLE_ADMIN_PREVIEW=false") &&
    envExample.includes("NEXT_PUBLIC_ENABLE_CHAT_AI=false") &&
    envExample.includes("NEXT_PUBLIC_ENABLE_LIVE_CHAT_REALTIME=false") &&
    envExample.includes("ENABLE_ADMIN_AUTH=false") &&
    !/SUPABASE_SERVICE_ROLE_KEY=\S+/.test(envExample);

  const rawAdminAuthOff = featureFlagsData.enableAdminAuth === false;
  const rawChatAiOff = featureFlagsData.enableChatAi === false;
  const rawRealtimeOff = featureFlagsData.enableLiveChatRealtime === false;

  const publicFlagsOn =
    featureFlagsData.showMarkets === true &&
    featureFlagsData.showSmartRequestCenter === true &&
    featureFlagsData.showChatWidget === true;

  const robotsPath = join(ROOT, "src", "app", "robots.ts");
  const robotsContent = existsSync(robotsPath) ? readFileSync(robotsPath, "utf8") : "";
  const robotsBlocksAdmin =
    robotsContent.includes('"/admin/"') || robotsContent.includes("'/admin/'");

  return [
    {
      id: "admin-dashboard-preview",
      label: "Admin dashboard preview (resolved OFF in production)",
      pass: !resolved.showAdminDashboardPreview,
      detail: `active: ${yesNo(resolved.showAdminDashboardPreview)}`,
    },
    {
      id: "content-admin-preview",
      label: "Content admin preview (resolved OFF)",
      pass: !resolved.showContentAdminPreview,
      detail: `active: ${yesNo(resolved.showContentAdminPreview)}`,
    },
    {
      id: "chat-admin-preview",
      label: "Chat admin preview (resolved OFF)",
      pass: !resolved.showChatAdminPreview,
      detail: `active: ${yesNo(resolved.showChatAdminPreview)}`,
    },
    {
      id: "request-admin-preview",
      label: "Request admin preview (resolved OFF)",
      pass: !resolved.showRequestAdminPreview,
      detail: `active: ${yesNo(resolved.showRequestAdminPreview)}`,
    },
    {
      id: "ai-chat",
      label: "AI chat (resolved OFF unless explicitly enabled)",
      pass: !resolved.enableChatAi,
      detail: `enabled: ${yesNo(resolved.enableChatAi)}`,
    },
    {
      id: "live-realtime",
      label: "Live chat realtime (resolved OFF unless explicitly enabled)",
      pass: !resolved.enableLiveChatRealtime,
      detail: `enabled: ${yesNo(resolved.enableLiveChatRealtime)}`,
    },
    {
      id: "admin-auth",
      label: "Admin auth resolved OFF in production simulation",
      pass: !resolved.enableAdminAuth,
      detail: `enabled: ${yesNo(resolved.enableAdminAuth)}`,
    },
    {
      id: "sitemap-admin",
      label: "No /admin routes in sitemap",
      pass: !adminInSitemap,
      detail: adminInSitemap ? "admin paths found" : "clean",
    },
    {
      id: "sitemap-legal",
      label: "Legal pages in sitemap",
      pass: legalPresent,
      detail: legalPresent ? "all present" : "missing legal path",
    },
    {
      id: "sitemap-hubs",
      label: "Key public hubs in sitemap",
      pass: hubsPresent,
      detail: hubsPresent ? "all present" : "missing hub path",
    },
    {
      id: "env-example",
      label: ".env.example has safe production defaults",
      pass: envExampleSafe,
      detail: envExampleSafe ? "safe" : "review required",
    },
    {
      id: "raw-sensitive-flags",
      label: "Raw featureFlagsData sensitive flags default OFF",
      pass: rawAdminAuthOff && rawChatAiOff && rawRealtimeOff,
      detail: `enableAdminAuth: ${yesNo(!rawAdminAuthOff)}, enableChatAi: ${yesNo(!rawChatAiOff)}, enableLiveChatRealtime: ${yesNo(!rawRealtimeOff)}`,
    },
    {
      id: "public-flags",
      label: "Public marketing flags remain ON in data",
      pass: publicFlagsOn,
      detail: `markets/request/chat-widget: ${yesNo(publicFlagsOn)}`,
    },
    {
      id: "robots-admin",
      label: "robots.ts disallows /admin/",
      pass: robotsBlocksAdmin,
      detail: robotsBlocksAdmin ? "disallow present" : "missing disallow",
    },
  ];
}

function main(): void {
  const results = runChecks();
  const failed = results.filter((item) => !item.pass);

  console.log("Flash Pay — Public Release Candidate Production Readiness");
  console.log("Simulated: production flag resolution (preview/AI/realtime env cleared)");
  console.log(`Checks: ${results.length - failed.length}/${results.length} passed\n`);

  for (const item of results) {
    const status = item.pass ? "PASS" : "FAIL";
    console.log(`[${status}] ${item.label}`);
    console.log(`       ${item.detail}`);
  }

  console.log("\n---");
  if (failed.length === 0) {
    console.log("Overall: PASS — public-only release candidate configuration looks safe.");
    console.log("Note: Client-side form protection alone is not enough for backend writes.");
    console.log("Hidden URL is not production security.");
    process.exit(0);
  }

  console.log(`Overall: FAIL — ${failed.length} check(s) need attention before public deploy.`);
  process.exit(1);
}

main();
