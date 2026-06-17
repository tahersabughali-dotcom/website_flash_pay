import type { Metadata } from "next";
import { ServicesPage } from "@/components/services/ServicesPage";
import { settingsData } from "@/data/settingsData";
import { buildPageMetadata, staticPageSeo } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(settingsData, staticPageSeo.services);

export default function ServicesRoutePage() {
  return <ServicesPage />;
}
