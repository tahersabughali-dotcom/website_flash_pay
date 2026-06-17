import type { LanguageCode } from "@/types/common";
import { FINANCIAL_DISCLAIMER } from "@/lib/constants";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";

interface ArticleDisclaimerProps {
  lang: LanguageCode;
}

export function ArticleDisclaimer({ lang }: ArticleDisclaimerProps) {
  return (
    <DisclaimerBox
      title={lang === "ar" ? "إخلاء مسؤولية" : "Disclaimer"}
      content={FINANCIAL_DISCLAIMER[lang]}
    />
  );
}
