import type { LanguageCode } from "@/types/common";
import { AlertBox } from "@/components/shared/AlertBox";

interface BusinessTrustPanelProps {
  lang: LanguageCode;
}

export function BusinessTrustPanel({ lang }: BusinessTrustPanelProps) {
  return (
    <div className="space-y-4">
      <AlertBox
        variant="info"
        title={lang === "ar" ? "توفر الخدمة" : "Service availability"}
        content={
          lang === "ar"
            ? "التوفر يعتمد على الدولة، العملة، المبلغ، وتغطية شبكة الشركاء. لا نعد بأسعار مضمونة."
            : "Availability depends on country, currency, amount, and partner network coverage. We do not promise guaranteed rates."
        }
      />
      <AlertBox
        variant="warning"
        title={lang === "ar" ? "تنسيق عبر الشبكة" : "Network coordination"}
        content={
          lang === "ar"
            ? "بعض الخدمات مباشرة وبعضها عبر مكاتب شركاء أو مكاتب معتمدة حيثما توفرت."
            : "Some services are direct; others are coordinated through partner or authorized partner offices where available."
        }
      />
    </div>
  );
}
