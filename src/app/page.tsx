import type { Metadata } from "next";
import { FoundationHome } from "@/components/home/FoundationHome";
import { settingsData } from "@/data/settingsData";
import { buildPageMetadata, staticPageSeo } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(settingsData, staticPageSeo.home);

export default function HomePage() {
  return <FoundationHome />;
}
