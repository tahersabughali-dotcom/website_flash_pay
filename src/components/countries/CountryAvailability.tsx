import type { LanguageCode } from "@/types/common";
import type { Country } from "@/types/country";
import { DetailSection } from "@/components/shared/DetailSection";
import { InfoList } from "@/components/shared/InfoList";
import {
  resolvePaymentMethodLabel,
  resolveReceivingMethodLabel,
} from "@/lib/dataAccess";
import { getLocalized } from "@/lib/i18n";

interface CountryAvailabilityProps {
  country: Country;
  lang: LanguageCode;
}

export function CountryAvailability({ country, lang }: CountryAvailabilityProps) {
  return (
    <DetailSection
      title={lang === "ar" ? "التوفر والتغطية" : "Availability & coverage"}
      subtitle={getLocalized(country.partnerCoverage, lang)}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <InfoList
          title={lang === "ar" ? "العملات المدعومة" : "Supported currencies"}
          items={country.currencies}
        />
        <InfoList
          title={lang === "ar" ? "طرق الدفع" : "Payment methods"}
          items={country.paymentMethods.map((slug) =>
            resolvePaymentMethodLabel(slug, lang),
          )}
        />
        <InfoList
          title={lang === "ar" ? "طرق الاستلام" : "Receiving methods"}
          items={country.receivingMethods.map((slug) =>
            resolveReceivingMethodLabel(slug, lang),
          )}
        />
        <InfoList
          title={lang === "ar" ? "تغطية الشبكة" : "Network coverage"}
          items={[getLocalized(country.partnerCoverage, lang)]}
        />
      </div>
    </DetailSection>
  );
}
