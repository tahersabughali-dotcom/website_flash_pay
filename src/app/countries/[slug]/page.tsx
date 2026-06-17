import type { Metadata } from "next";
import { CountryDetailPage } from "@/components/countries/CountryDetailPage";
import { NotFoundState } from "@/components/shared/NotFoundState";
import { settingsData } from "@/data/settingsData";
import { getCountryBySlug } from "@/lib/dataAccess";
import { buildCountryMetadata, buildPageMetadata } from "@/lib/seo";

interface CountryDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CountryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) {
    return buildPageMetadata(settingsData, {
      title: { ar: "دولة غير موجودة", en: "Country not found" },
      description: settingsData.seoDefaults.description,
      path: `/countries/${slug}`,
    });
  }

  return buildCountryMetadata(country, settingsData);
}

export default async function CountryDetailRoutePage({
  params,
}: CountryDetailPageProps) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  const lang = settingsData.defaultLanguage;

  if (!country) {
    return (
      <div className="px-4 py-16">
        <NotFoundState
          title={lang === "ar" ? "الدولة غير موجودة" : "Country not found"}
          description={
            lang === "ar"
              ? "قد تكون هذه الدولة مخفية أو غير متاحة."
              : "This country may be hidden or unavailable."
          }
          backHref="/countries"
          backLabel={lang === "ar" ? "العودة للدول" : "Back to countries"}
        />
      </div>
    );
  }

  return <CountryDetailPage country={country} lang={lang} />;
}
