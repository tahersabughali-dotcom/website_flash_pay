import Link from "next/link";
import type { LanguageCode } from "@/types/common";
import type { Service } from "@/types/service";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";
import { getLocalized } from "@/lib/i18n";
import { formatWhatsAppRequestMessage } from "@/lib/whatsapp";

interface ServiceCTAProps {
  service: Service;
  lang: LanguageCode;
}

export function ServiceCTA({ service, lang }: ServiceCTAProps) {
  const whatsappMessage = formatWhatsAppRequestMessage({
    requestType: `Service Inquiry: ${getLocalized(service.title, "en")}`,
    fields: [
      { label: "Service", value: getLocalized(service.title, "en") },
      {
        label: "Notes",
        value:
          "I would like to inquire about this service. No guaranteed rates expected on website.",
      },
    ],
  });

  const isComingSoon = service.status === "coming_soon";

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-flash-surface p-5">
      <h3 className="font-semibold text-flash-text">
        {lang === "ar" ? "ابدأ الآن" : "Get started"}
      </h3>

      {isComingSoon ? (
        <DisclaimerBox
          content={
            lang === "ar"
              ? "هذه الخدمة قيد التطوير — لا توجد وظائف فعّالة حالياً."
              : "This service is under development — no active functionality at this time."
          }
        />
      ) : (
        <>
          <Link
            href="/request"
            className="flex w-full items-center justify-center rounded-xl bg-flash-primary px-4 py-3 text-sm font-semibold text-white"
          >
            {lang === "ar" ? "ابدأ طلباً" : "Start a Request"}
          </Link>
          <WhatsAppButton
            message={whatsappMessage}
            label={lang === "ar" ? "اسأل عبر WhatsApp" : "Ask on WhatsApp"}
            className="w-full justify-center"
          />
        </>
      )}

      <p className="text-xs text-flash-muted">
        {lang === "ar"
          ? "التوفر يعتمد على الدولة، العملة، نوع الخدمة، وتغطية الشركاء."
          : "Availability depends on country, currency, service type, and partner coverage."}
      </p>
    </div>
  );
}
