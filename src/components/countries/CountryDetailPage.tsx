import Link from "next/link";
import type { LanguageCode } from "@/types/common";
import type { Country } from "@/types/country";
import { PageHero } from "@/components/shared/PageHero";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";
import { DetailSection } from "@/components/shared/DetailSection";
import { getLocalized } from "@/lib/i18n";
import { CountryAvailability } from "./CountryAvailability";
import { CountryServices } from "./CountryServices";
import { CountryRoutes } from "./CountryRoutes";
import { CountryFAQ } from "./CountryFAQ";

interface CountryDetailPageProps {
  country: Country;
  lang: LanguageCode;
}

export function CountryDetailPage({ country, lang }: CountryDetailPageProps) {
  return (
    <div className="flash-page-wrap">
      <Link
        href="/countries"
        className="mb-6 inline-block text-sm text-flash-muted hover:text-flash-primary"
      >
        {lang === "ar" ? "← كل الدول" : "← All Countries"}
      </Link>

      <PageHero
        eyebrow={getLocalized(country.region, lang)}
        title={`${country.flag} ${getLocalized(country.name, lang)}`}
        subtitle={getLocalized(country.partnerCoverage, lang)}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/request"
            className="inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-flash-primary"
          >
            {lang === "ar" ? "ابدأ طلباً" : "Start a Request"}
          </Link>
          <Link
            href={`/route-finder?from=${country.slug}`}
            className="inline-flex rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white"
          >
            {lang === "ar" ? "Flash Route Finder" : "Flash Route Finder"}
          </Link>
        </div>
      </PageHero>

      <div className="mt-8 space-y-10">
        {country.notes && (
          <DetailSection title={lang === "ar" ? "ملاحظات مهمة" : "Important notes"}>
            <p className="text-flash-muted">{getLocalized(country.notes, lang)}</p>
          </DetailSection>
        )}

        <CountryAvailability country={country} lang={lang} />

        <CountryServices country={country} lang={lang} />

        <CountryRoutes country={country} lang={lang} />

        <CountryFAQ country={country} lang={lang} />

        <DisclaimerBox
          title={lang === "ar" ? "تنبيه التوفر" : "Availability notice"}
          content={
            lang === "ar"
              ? "قد يعتمد التوفر على الدولة، العملة، تغطية الشركاء، ونوع الخدمة. Flash Pay لا تدّعي وكالة مباشرة لشركات عالمية."
              : "Availability may depend on country, currency, partner coverage, and service type. Flash Pay does not claim direct agency for global companies."
          }
        />
      </div>
    </div>
  );
}
