import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/coming-soon/ComingSoonPage";
import { settingsData } from "@/data/settingsData";
import { buildPageMetadata, staticPageSeo } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(settingsData, staticPageSeo.trade);

export default function TradePage() {
  return <ComingSoonPage slug="flash-trade" />;
}
