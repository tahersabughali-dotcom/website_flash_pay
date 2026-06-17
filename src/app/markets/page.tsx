import type { Metadata } from "next";
import { MarketsPage } from "@/components/markets/MarketsPage";
import { settingsData } from "@/data/settingsData";
import { buildPageMetadata, staticPageSeo } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(settingsData, staticPageSeo.markets);

export default function MarketsRoutePage() {
  return <MarketsPage />;
}
