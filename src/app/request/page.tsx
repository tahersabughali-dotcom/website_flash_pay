import type { Metadata } from "next";
import { Suspense } from "react";
import { RequestCenterForm } from "@/components/request/RequestCenterForm";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { settingsData } from "@/data/settingsData";
import { pageContentData } from "@/data/pageContentData";
import { buildPageMetadata, staticPageSeo } from "@/lib/seo";
import { getLocalized } from "@/lib/i18n";

export const metadata: Metadata = buildPageMetadata(settingsData, staticPageSeo.request);

function RequestFormFallback() {
  const lang = settingsData.defaultLanguage;
  const content = pageContentData.request;

  return (
    <section className="mt-8">
      <SectionHeader
        title={getLocalized(content.step1.title, lang)}
        subtitle={getLocalized(content.step1.subtitle, lang)}
      />
      <div className="flash-card p-6 text-sm text-flash-muted">
        {getLocalized(content.selectPrompt, lang)}
      </div>
    </section>
  );
}

export default function RequestPage() {
  const lang = settingsData.defaultLanguage;
  const content = pageContentData.request;

  return (
    <div className="flash-page-wrap">
      <PageHero
        eyebrow={getLocalized(content.hero.eyebrow, lang)}
        title={getLocalized(content.hero.title, lang)}
        subtitle={getLocalized(content.hero.subtitle, lang)}
      />

      <Suspense fallback={<RequestFormFallback />}>
        <RequestCenterForm />
      </Suspense>
    </div>
  );
}
