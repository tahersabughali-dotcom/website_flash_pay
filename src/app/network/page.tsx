import type { Metadata } from "next";
import { NetworkPage } from "@/components/network/NetworkPage";
import { settingsData } from "@/data/settingsData";
import { buildPageMetadata, staticPageSeo } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(settingsData, staticPageSeo.network);

export default function NetworkRoutePage() {
  return <NetworkPage />;
}
