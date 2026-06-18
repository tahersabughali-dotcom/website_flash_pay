import { Suspense } from "react";
import type { Metadata } from "next";
import {
  RouteFinderFormFallback,
  RouteFinderInteractive,
} from "@/components/route-finder/RouteFinderInteractive";
import { PageHero } from "@/components/shared/PageHero";
import { pageContentData } from "@/data/pageContentData";
import { settingsData } from "@/data/settingsData";
import { buildPageMetadata, staticPageSeo } from "@/lib/seo";
import { getLocalized } from "@/lib/i18n";

export const metadata: Metadata = buildPageMetadata(
  settingsData,
  staticPageSeo.routeFinder,
);

export default function RouteFinderRoutePage() {
  const lang = settingsData.defaultLanguage;
  const content = pageContentData.routeFinder;

  return (
    <div className="flash-page-wrap">
      <PageHero
        eyebrow={getLocalized(content.hero.eyebrow, lang)}
        title={getLocalized(content.hero.title, lang)}
        subtitle={getLocalized(content.hero.subtitle, lang)}
      />

      <Suspense fallback={<RouteFinderFormFallback lang={lang} />}>
        <RouteFinderInteractive />
      </Suspense>
    </div>
  );
}
