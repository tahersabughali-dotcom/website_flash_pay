import type { Metadata } from "next";
import { PartnersPage } from "@/components/partners/PartnersPage";
import { settingsData } from "@/data/settingsData";
import { buildPageMetadata, staticPageSeo } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(settingsData, staticPageSeo.partners);

export default function PartnersRoutePage() {
  return <PartnersPage />;
}
