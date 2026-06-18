import Link from "next/link";
import type { LanguageCode } from "@/types/common";
import type { Country } from "@/types/country";
import { PageHero } from "@/components/shared/PageHero";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";
import { DetailSection } from "@/components/shared/DetailSection";
import { FlagIcon } from "@/components/shared/FlagIcon";
import { CoverageStatusBadge } from "@/components/shared/CoverageStatusBadge";
import { getOperationalIso2 } from "@/lib/countries";
import { getFlagImageUrl } from "@/lib/icons";
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
  const iso2 = getOperationalIso2(country.slug);

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
        title={getLocalized(country.name, lang)}
        subtitle={getLocalized(country.partnerCoverage, lang)}
      >
        <div className="flex flex-wrap items-center gap-3">
          <FlagIcon
            iso2={iso2}
            flagImageUrl={iso2 ? getFlagImageUrl(iso2) : undefined}
            flagEmoji={country.flag}
            alt={getLocalized(country.name, lang)}
            size="lg"
            className="ring-2 ring-white/30"
          />
          <CoverageStatusBadge
            status="active"
            lang={lang}
            className="bg-white/15 text-white ring-white/30"
          />
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/request"
            className="inline-flex min-h-11 items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-flash-primary"
          >
            {lang === "ar" ? "ابدأ طلباً" : "Start a Request"}
          </Link>
          <Link
            href={`/route-finder?from=${country.slug}`}
            className="inline-flex min-h-11 items-center rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white"
          >
            {lang === "ar" ? "Flash Route Finder" : "Flash Route Finder"}
          </Link>
          <Link
            href="/currencies"
            className="inline-flex min-h-11 items-center rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white"
          >
            {lang === "ar" ? "العملات" : "Currencies"}
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
              ? "ظهور الدولة أو الخدمة هنا لا يعني توفرًا مؤكدًا لكل مبلغ أو طريقة. يتم التأكيد حسب العملة، المبلغ، وطريقة الاستلام. Flash Pay لا تدّعي وكالة مباشرة لشركات عالمية."
              : "Listing this country or service does not guarantee availability for every amount or method. Confirmation depends on currency, amount, and receiving method. Flash Pay does not claim direct agency for global companies."
          }
        />
      </div>
    </div>
  );
}
