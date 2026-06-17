import { FINANCIAL_DISCLAIMER } from "@/lib/constants";
import type { LanguageCode } from "@/types/common";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";

interface DisclaimerSectionProps {
  lang: LanguageCode;
}

export function DisclaimerSection({ lang }: DisclaimerSectionProps) {
  return (
    <DisclaimerBox
      title={lang === "ar" ? "إخلاء مسؤولية مالية" : "Financial disclaimer"}
      content={FINANCIAL_DISCLAIMER[lang]}
    />
  );
}
