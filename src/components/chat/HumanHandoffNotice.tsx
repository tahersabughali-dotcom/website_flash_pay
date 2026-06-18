import type { LanguageCode } from "@/types/common";
import { chatData } from "@/data/chatData";
import { getLocalized } from "@/lib/i18n";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";

interface HumanHandoffNoticeProps {
  lang: LanguageCode;
}

export function HumanHandoffNotice({ lang }: HumanHandoffNoticeProps) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">
      <p>{getLocalized(chatData.humanHandoffMessage, lang)}</p>
      <div className="mt-3">
        <WhatsAppButton
          label={getLocalized(chatData.uiLabels.openWhatsApp, lang)}
          className="w-full justify-center !rounded-lg !py-2.5 !text-xs"
        />
      </div>
    </div>
  );
}
