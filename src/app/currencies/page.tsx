import type { Metadata } from "next";
import { CurrenciesPage } from "@/components/currencies/CurrenciesPage";
import { settingsData } from "@/data/settingsData";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(settingsData, {
  title: { ar: "العملات | Flash Pay", en: "Currencies | Flash Pay" },
  description: {
    ar: "دليل العملات المدعومة والمرجعية — التوفر يُؤكَّد عبر WhatsApp.",
    en: "Supported and reference currencies directory — availability confirmed via WhatsApp.",
  },
  path: "/currencies",
});

export default function CurrenciesRoutePage() {
  return <CurrenciesPage />;
}
