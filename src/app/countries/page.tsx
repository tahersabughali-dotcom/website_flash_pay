import type { Metadata } from "next";
import { CountriesPage } from "@/components/countries/CountriesPage";
import { settingsData } from "@/data/settingsData";
import { buildPageMetadata, staticPageSeo } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(settingsData, staticPageSeo.countries);

export default function CountriesRoutePage() {
  return <CountriesPage />;
}
