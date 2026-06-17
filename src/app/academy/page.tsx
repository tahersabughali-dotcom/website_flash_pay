import type { Metadata } from "next";
import { AcademyPage } from "@/components/academy/AcademyPage";
import { settingsData } from "@/data/settingsData";
import { buildPageMetadata, staticPageSeo } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(settingsData, staticPageSeo.academy);

export default function AcademyRoutePage() {
  return <AcademyPage />;
}
