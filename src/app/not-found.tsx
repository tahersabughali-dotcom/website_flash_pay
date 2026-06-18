import type { Metadata } from "next";
import { NotFoundState } from "@/components/shared/NotFoundState";
import { settingsData } from "@/data/settingsData";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata(settingsData, {
    title: { ar: "الصفحة غير موجودة", en: "Page not found" },
    description: settingsData.seoDefaults.description,
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFoundPage() {
  const lang = settingsData.defaultLanguage;

  return (
    <div className="flash-page-wrap py-16">
      <NotFoundState
        title={lang === "ar" ? "الصفحة غير موجودة" : "Page not found"}
        description={
          lang === "ar"
            ? "قد تكون هذه الصفحة مخفية أو غير متاحة."
            : "This page may be hidden or unavailable."
        }
        backHref="/"
        backLabel={lang === "ar" ? "العودة للرئيسية" : "Back to Home"}
      />
    </div>
  );
}
