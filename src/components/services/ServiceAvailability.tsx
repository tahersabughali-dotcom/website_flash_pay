import type { LanguageCode } from "@/types/common";
import type { Service } from "@/types/service";
import { InfoList } from "@/components/shared/InfoList";
import {
  resolveCountryLabel,
  resolvePaymentMethodLabel,
  resolveReceivingMethodLabel,
} from "@/lib/dataAccess";

interface ServiceAvailabilityProps {
  service: Service;
  lang: LanguageCode;
}

export function ServiceAvailability({ service, lang }: ServiceAvailabilityProps) {
  const emptyLabel = lang === "ar" ? "حسب التوفر" : "Subject to availability";

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <InfoList
        title={lang === "ar" ? "الدول المدعومة" : "Supported countries"}
        items={(service.countries ?? []).map((slug) => resolveCountryLabel(slug, lang))}
        emptyLabel={emptyLabel}
      />
      <InfoList
        title={lang === "ar" ? "العملات" : "Currencies"}
        items={service.currencies ?? []}
        emptyLabel={emptyLabel}
      />
      <InfoList
        title={lang === "ar" ? "طرق الدفع" : "Payment methods"}
        items={(service.paymentMethods ?? []).map((slug) =>
          resolvePaymentMethodLabel(slug, lang),
        )}
        emptyLabel={emptyLabel}
      />
      <InfoList
        title={lang === "ar" ? "طرق الاستلام" : "Receiving methods"}
        items={(service.receivingMethods ?? []).map((slug) =>
          resolveReceivingMethodLabel(slug, lang),
        )}
        emptyLabel={emptyLabel}
      />
    </div>
  );
}
