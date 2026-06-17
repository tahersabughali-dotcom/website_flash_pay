import type { LanguageCode } from "@/types/common";
import { AlertBox } from "@/components/shared/AlertBox";

interface ContactTrustNoticeProps {
  lang: LanguageCode;
}

export function ContactTrustNotice({ lang }: ContactTrustNoticeProps) {
  return (
    <AlertBox
      variant="warning"
      title={lang === "ar" ? "تنبيه ضد الاحتيال" : "Anti-fraud notice"}
      content={
        lang === "ar"
          ? "تواصل فقط عبر القنوات الرسمية المنشورة هنا. لا ترسل أموالاً لحسابات غير موثقة باسم Flash Pay."
          : "Contact only through the official channels listed here. Do not send money to unverified accounts claiming to be Flash Pay."
      }
    />
  );
}
