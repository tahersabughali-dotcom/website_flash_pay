import Link from "next/link";
import type { LanguageCode } from "@/types/common";
import type { Country } from "@/types/country";
import { DetailSection } from "@/components/shared/DetailSection";
import { IconImage } from "@/components/shared/IconImage";
import { LtrText } from "@/components/shared/LtrText";
import {
  resolvePaymentMethodLabel,
  resolveReceivingMethodLabel,
} from "@/lib/dataAccess";
import { getGlobalCurrencyByCode } from "@/lib/currencies";
import { getCurrencyIconPath, getPaymentIconPath, getReceivingIconPath } from "@/lib/icons";
import { getLocalized } from "@/lib/i18n";

interface CountryAvailabilityProps {
  country: Country;
  lang: LanguageCode;
}

function IconChipList({
  title,
  items,
}: {
  title: string;
  items: { label: string; icon: string }[];
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-flash-muted">{title}</p>
      {items.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-2">
          {items.map((item) => (
            <li
              key={item.label}
              className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-flash-primary-light px-2.5 py-1 text-xs font-medium text-flash-primary"
            >
              <IconImage src={item.icon} alt="" size={16} />
              <LtrText className="truncate">{item.label}</LtrText>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-flash-muted">—</p>
      )}
    </div>
  );
}

export function CountryAvailability({ country, lang }: CountryAvailabilityProps) {
  const currencyItems = country.currencies.map((code) => {
    const currency = getGlobalCurrencyByCode(code);
    return {
      label: currency ? `${code} — ${getLocalized(currency.name, lang)}` : code,
      icon: getCurrencyIconPath(code),
    };
  });

  const paymentItems = country.paymentMethods.map((slug) => ({
    label: resolvePaymentMethodLabel(slug, lang),
    icon: getPaymentIconPath(slug),
  }));

  const receivingItems = country.receivingMethods.map((slug) => ({
    label: resolveReceivingMethodLabel(slug, lang),
    icon: getReceivingIconPath(slug),
  }));

  return (
    <DetailSection
      title={lang === "ar" ? "التوفر والتغطية" : "Availability & coverage"}
      subtitle={getLocalized(country.partnerCoverage, lang)}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <IconChipList
          title={lang === "ar" ? "العملات المدعومة" : "Supported currencies"}
          items={currencyItems}
        />
        <IconChipList
          title={lang === "ar" ? "طرق الدفع" : "Payment methods"}
          items={paymentItems}
        />
        <IconChipList
          title={lang === "ar" ? "طرق الاستلام" : "Receiving methods"}
          items={receivingItems}
        />
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-flash-muted">
            {lang === "ar" ? "تغطية الشبكة" : "Network coverage"}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-flash-text">
            {getLocalized(country.partnerCoverage, lang)}
          </p>
          <LinkRow lang={lang} />
        </div>
      </div>
    </DetailSection>
  );
}

function LinkRow({ lang }: { lang: LanguageCode }) {
  return (
    <div className="mt-4 flex flex-wrap gap-3 text-xs">
      <Link href="/payment-methods" className="font-medium text-flash-primary hover:underline">
        {lang === "ar" ? "كل طرق الدفع" : "All payment methods"}
      </Link>
      <Link href="/currencies" className="font-medium text-flash-primary hover:underline">
        {lang === "ar" ? "دليل العملات" : "Currency directory"}
      </Link>
    </div>
  );
}
