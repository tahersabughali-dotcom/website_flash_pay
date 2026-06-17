import { Suspense } from "react";
import type { Metadata } from "next";
import { RouteFinderPage } from "@/components/route-finder/RouteFinderPage";
import { settingsData } from "@/data/settingsData";
import { buildPageMetadata, staticPageSeo } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(
  settingsData,
  staticPageSeo.routeFinder,
);

function RouteFinderFallback() {
  const lang = settingsData.defaultLanguage;
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 text-center text-flash-muted">
      {lang === "ar" ? "جاري التحميل..." : "Loading..."}
    </div>
  );
}

export default function RouteFinderRoutePage() {
  return (
    <Suspense fallback={<RouteFinderFallback />}>
      <RouteFinderPage />
    </Suspense>
  );
}
