import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";
import { settingsData } from "@/data/settingsData";
import { buildPageMetadata, staticPageSeo } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(settingsData, staticPageSeo.contact);

export default function ContactRoutePage() {
  return <ContactPage />;
}
