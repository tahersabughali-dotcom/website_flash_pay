import type { LanguageCode } from "@/types/common";

export const WHATSAPP_PREPARED_SUCCESS = {
  ar: "تم تجهيز طلبك. يمكنك إرساله الآن عبر WhatsApp.",
  en: "Your request is prepared. You can send it now via WhatsApp.",
} as const;

export const WHATSAPP_PREPARED_WITH_PREVIEW_NOTE = {
  ar: "تم تجهيز طلبك. يمكنك إرساله الآن عبر WhatsApp. (معاينة محلية للوحة الإدارة فقط — ليس استلامًا رسميًا.)",
  en: "Your request is prepared. You can send it now via WhatsApp. (Local admin preview only — not official receipt.)",
} as const;

export function getWhatsAppPreparedSuccess(lang: LanguageCode, withPreviewNote = false): string {
  return withPreviewNote
    ? WHATSAPP_PREPARED_WITH_PREVIEW_NOTE[lang]
    : WHATSAPP_PREPARED_SUCCESS[lang];
}
