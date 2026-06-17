import type { LanguageCode } from "@/types/common";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";

interface PartnerNetworkNoticeProps {
  lang: LanguageCode;
}

export function PartnerNetworkNotice({ lang }: PartnerNetworkNoticeProps) {
  return (
    <DisclaimerBox
      title={lang === "ar" ? "إشعار شبكة الشركاء" : "Partner network notice"}
      content={
        lang === "ar"
          ? "Flash Pay تعمل عبر شبكة شركاء موثوقة ومكاتب شركاء — وبعضها معتمد حيثما توفر. لا ندّعي أن كل شريك مرخّص ما لم يُذكر صراحة. توفر الخدمة يعتمد على الدولة وتغطية الشركاء."
          : "Flash Pay operates through a trusted partner network and partner offices — some authorized where available. We do not claim every partner is licensed unless explicitly stated. Service availability depends on country and partner coverage."
      }
    />
  );
}
