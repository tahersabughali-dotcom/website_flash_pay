import type { Metadata } from "next";
import { TrustCenterPage } from "@/components/trust/TrustCenterPage";
import { settingsData } from "@/data/settingsData";
import { buildPageMetadata, staticPageSeo } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(
  settingsData,
  staticPageSeo.trust,
);

export default function TrustPage() {
  return <TrustCenterPage />;
}
