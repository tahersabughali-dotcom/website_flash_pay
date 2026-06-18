import Link from "next/link";
import type { LanguageCode } from "@/types/common";
import type { Country } from "@/types/country";
import {
  resolvePaymentMethodLabel,
  resolveReceivingMethodLabel,
  resolveServiceLabels,
} from "@/lib/dataAccess";
import { getLocalized } from "@/lib/i18n";
import { CTASection } from "@/components/shared/CTASection";

interface CountryDetailPlaceholderProps {
  country: Country;
  lang: LanguageCode;
}

export function CountryDetailPlaceholder({ country, lang }: CountryDetailPlaceholderProps) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-12">
      <Link
        href="/countries"
        className="mb-6 inline-block text-sm text-flash-muted hover:text-flash-primary"
      >
        {lang === "ar" ? "← كل الدول" : "← All Countries"}
      </Link>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{country.flag}</span>
          <div>
            <h1 className="text-3xl font-bold text-flash-text">
              {getLocalized(country.name, lang)}
            </h1>
            <p className="mt-1 text-flash-muted">
              {getLocalized(country.region, lang)}
            </p>
          </div>
        </div>

        {country.notes && (
          <p className="mt-6 text-flash-muted">{getLocalized(country.notes, lang)}</p>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <InfoBlock
            title={lang === "ar" ? "العملات" : "Currencies"}
            value={country.currencies.join(", ")}
          />
          <InfoBlock
            title={lang === "ar" ? "طرق الدفع" : "Payment Methods"}
            value={country.paymentMethods
              .map((slug) => resolvePaymentMethodLabel(slug, lang))
              .join(", ")}
          />
          <InfoBlock
            title={lang === "ar" ? "طرق الاستلام" : "Receiving Methods"}
            value={country.receivingMethods
              .map((slug) => resolveReceivingMethodLabel(slug, lang))
              .join(", ")}
          />
          <InfoBlock
            title={lang === "ar" ? "الخدمات" : "Services"}
            value={resolveServiceLabels(country.availableServices, lang).join(", ")}
          />
        </div>

        <p className="mt-6 text-sm text-flash-muted">
          {getLocalized(country.partnerCoverage, lang)}
        </p>

        <div className="mt-6 rounded-xl bg-flash-surface p-4 text-sm text-flash-muted">
          {lang === "ar"
            ? "صفحة الدولة الكاملة ستُبنى في مرحلة لاحقة."
            : "Full country page will be built in a later phase."}
        </div>

        <Link
          href="/request"
          className="mt-6 inline-flex rounded-xl bg-flash-primary px-5 py-3 text-sm font-semibold text-white"
        >
          {lang === "ar" ? "ابدأ طلباً" : "Start a Request"}
        </Link>
      </div>

      <div className="mt-10">
        <CTASection
          title={lang === "ar" ? "اطلب خدمة في هذه الدولة" : "Request service in this country"}
          description={getLocalized(country.partnerCoverage, lang)}
          lang={lang}
        />
      </div>
    </div>
  );
}

function InfoBlock({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-flash-muted">{title}</p>
      <p className="mt-2 text-sm text-flash-text">{value}</p>
    </div>
  );
}
