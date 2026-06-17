import type { LanguageCode, LocalizedString } from "@/types/common";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";
import { getLocalized } from "@/lib/i18n";

interface FutureDisclaimerProps {
  lang: LanguageCode;
  regulatoryNote?: LocalizedString;
}

export function FutureDisclaimer({ lang, regulatoryNote }: FutureDisclaimerProps) {
  return (
    <div className="space-y-4">
      <DisclaimerBox
        title={lang === "ar" ? "قريباً — قيد التطوير" : "Coming Soon — Under Development"}
        content={
          lang === "ar"
            ? "هذه الميزة غير متاحة حالياً. لا توجد أرصدة، ولا تنفيذ، ولا أزرار إيداع أو سحب فعّالة."
            : "This feature is not available yet. There are no balances, execution, or active deposit/withdraw actions."
        }
      />
      {regulatoryNote && (
        <DisclaimerBox
          title={lang === "ar" ? "ملاحظة تنظيمية" : "Regulatory note"}
          content={getLocalized(regulatoryNote, lang)}
        />
      )}
    </div>
  );
}
