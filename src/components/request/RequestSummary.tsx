import type { LanguageCode } from "@/types/common";
import type { RequestType } from "@/types/request";
import type { WhatsAppRequestMessageInput } from "@/lib/whatsapp";
import { getLocalized } from "@/lib/i18n";
import { formatWhatsAppRequestMessage } from "@/lib/whatsapp";

interface RequestSummaryProps {
  requestType: RequestType;
  payload: WhatsAppRequestMessageInput;
  lang: LanguageCode;
  previewUrl: string;
}

export function RequestSummary({ requestType, payload, lang, previewUrl }: RequestSummaryProps) {
  const preview = formatWhatsAppRequestMessage(payload);

  return (
    <aside className="rounded-2xl border border-slate-200 bg-flash-surface p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-flash-text">
        {lang === "ar" ? "معاينة الطلب" : "Request Preview"}
      </h3>
      <p className="mt-2 text-sm text-flash-muted">
        {getLocalized(requestType.title, lang)}
      </p>

      <pre className="mt-4 overflow-x-auto rounded-xl bg-white p-4 text-xs leading-relaxed text-flash-text whitespace-pre-wrap border border-slate-200">
        {preview}
      </pre>

      <p className="mt-4 text-xs text-flash-muted">
        {lang === "ar"
          ? "سيتم استخدام رقم WhatsApp الرسمي من إعدادات المنصة."
          : "The official WhatsApp number from platform settings will be used."}
      </p>

      <a
        href={previewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex text-xs font-medium text-flash-primary hover:underline"
      >
        {lang === "ar" ? "معاينة رابط WhatsApp" : "Preview WhatsApp link"}
      </a>
    </aside>
  );
}
