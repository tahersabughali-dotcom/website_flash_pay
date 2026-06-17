import type { LanguageCode } from "@/types/common";
import { MARKET_DISCLAIMER } from "@/lib/constants";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";

interface MarketDisclaimerProps {
  lang: LanguageCode;
}

export function MarketDisclaimer({ lang }: MarketDisclaimerProps) {
  return (
    <DisclaimerBox
      title={lang === "ar" ? "إخلاء مسؤولية السوق" : "Market disclaimer"}
      content={MARKET_DISCLAIMER[lang]}
    />
  );
}
