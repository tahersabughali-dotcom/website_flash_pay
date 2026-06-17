import type { Metadata } from "next";
import { Suspense } from "react";
import { RequestCenter } from "@/components/request/RequestCenter";
import { settingsData } from "@/data/settingsData";
import { uiLabelsData } from "@/data/pageContentData";
import { buildPageMetadata, staticPageSeo } from "@/lib/seo";
import { getLocalized } from "@/lib/i18n";

export const metadata: Metadata = buildPageMetadata(settingsData, staticPageSeo.request);

function RequestFallback() {
  const lang = settingsData.defaultLanguage;
  return (
    <div className="flash-page-wrap py-12 text-center text-flash-muted">
      {getLocalized(uiLabelsData.loading, lang)}
    </div>
  );
}

export default function RequestPage() {
  return (
    <Suspense fallback={<RequestFallback />}>
      <RequestCenter />
    </Suspense>
  );
}
