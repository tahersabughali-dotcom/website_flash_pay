import type { Metadata } from "next";
import { BusinessPage } from "@/components/business/BusinessPage";
import { settingsData } from "@/data/settingsData";
import { buildPageMetadata, staticPageSeo } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(settingsData, staticPageSeo.business);

export default function BusinessRoutePage() {
  return <BusinessPage />;
}
