import type { LanguageCode } from "@/types/common";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";

interface NetworkDisclaimerProps {
  lang: LanguageCode;
}

export function NetworkDisclaimer({ lang }: NetworkDisclaimerProps) {
  return (
    <DisclaimerBox
      title={lang === "ar" ? "إشعار قانوني" : "Legal notice"}
      content={
        lang === "ar"
          ? "قد تُقدَّم بعض الخدمات مباشرة، بينما قد تُنسَّق أخرى عبر مكاتب شركاء أو مكاتب شركاء معتمدة حيثما توفرت. Flash Pay لا تدّعي ترخيصاً مباشراً لأي خدمة عالمية تابعة لطرف ثالث ما لم يُذكر ذلك صراحة."
          : "Some services may be provided directly, while others may be coordinated through partner offices or authorized partner offices where available. Flash Pay does not claim direct authorization for any third-party global service unless explicitly stated."
      }
    />
  );
}
