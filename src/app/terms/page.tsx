import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { getLegalPage } from "@/data/legalPagesData";
import { settingsData } from "@/data/settingsData";
import { buildPageMetadata } from "@/lib/seo";

const content = getLegalPage("terms");

export const metadata: Metadata = buildPageMetadata(settingsData, {
  title: content.seoTitle,
  description: content.seoDescription,
  path: content.path,
});

export default function TermsPage() {
  return <LegalPage content={content} />;
}
