import type { LanguageCode, LocalizedString } from "@/types/common";
import { getLocalized } from "@/lib/i18n";

export const FORM_LIMITS = {
  nameMin: 2,
  nameMax: 100,
  phoneMinDigits: 8,
  phoneMaxDigits: 15,
  messageMax: 2000,
  notesMax: 1000,
  amountMax: 999_999_999_999,
  minMeaningfulMessageLength: 3,
  maxRepeatedCharRun: 8,
} as const;

const CONTROL_CHAR_REGEX = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const MEANINGLESS_MESSAGE_REGEX = /^[\s\W\d]*$/;

export function sanitizeFormText(value: string, maxLength?: number): string {
  const cleaned = value.replace(CONTROL_CHAR_REGEX, "").trim();
  if (!maxLength) return cleaned;
  return cleaned.slice(0, maxLength);
}

export function sanitizeNotes(value?: string): string | undefined {
  const cleaned = sanitizeFormText(value ?? "", FORM_LIMITS.notesMax);
  return cleaned || undefined;
}

export function countDigits(value: string): number {
  return value.replace(/\D/g, "").length;
}

export function validateRequiredValue(
  value: string | undefined,
  label: LocalizedString,
  lang: LanguageCode,
): string | null {
  if (!value?.trim()) {
    return lang === "ar"
      ? `يرجى تعبئة حقل: ${getLocalized(label, lang)}`
      : `Please fill in: ${getLocalized(label, lang)}`;
  }
  return null;
}

export function validateName(value: string, lang: LanguageCode, required = true): string | null {
  const trimmed = sanitizeFormText(value, FORM_LIMITS.nameMax);
  if (!trimmed) {
    return required
      ? lang === "ar"
        ? "يرجى إدخال الاسم."
        : "Please enter a name."
      : null;
  }
  if (trimmed.length < FORM_LIMITS.nameMin) {
    return lang === "ar" ? "الاسم قصير جدًا." : "Name is too short.";
  }
  if (hasSuspiciousRepeatedCharacters(trimmed)) {
    return lang === "ar" ? "يرجى إدخال اسم صالح." : "Please enter a valid name.";
  }
  return null;
}

export function validateWhatsAppNumber(value: string, lang: LanguageCode): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return lang === "ar" ? "يرجى إدخال رقم WhatsApp." : "Please enter a WhatsApp number.";
  }

  const digits = countDigits(trimmed);
  if (digits < FORM_LIMITS.phoneMinDigits || digits > FORM_LIMITS.phoneMaxDigits) {
    return lang === "ar"
      ? "يرجى إدخال رقم WhatsApp صالح (8–15 رقمًا)."
      : "Please enter a valid WhatsApp number (8–15 digits).";
  }

  if (!/^[\d\s+\-().]+$/.test(trimmed)) {
    return lang === "ar"
      ? "رقم WhatsApp يحتوي على رموز غير مسموحة."
      : "WhatsApp number contains invalid characters.";
  }

  return null;
}

export function validateAmount(
  value: string,
  lang: LanguageCode,
  required = false,
): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return required
      ? lang === "ar"
        ? "يرجى إدخال المبلغ."
        : "Please enter an amount."
      : null;
  }

  const normalized = trimmed.replace(/,/g, "");
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
    return lang === "ar"
      ? "صيغة المبلغ غير صالحة. استخدم أرقامًا فقط."
      : "Invalid amount format. Use numbers only.";
  }

  const amount = Number(normalized);
  if (!Number.isFinite(amount) || amount <= 0) {
    return lang === "ar" ? "يرجى إدخال مبلغًا أكبر من صفر." : "Please enter an amount greater than zero.";
  }

  if (amount > FORM_LIMITS.amountMax) {
    return lang === "ar" ? "المبلغ كبير جدًا." : "Amount is too large.";
  }

  return null;
}

export function hasSuspiciousRepeatedCharacters(value: string): boolean {
  const run = FORM_LIMITS.maxRepeatedCharRun;
  return new RegExp(`(.)\\1{${run - 1},}`).test(value);
}

export function isMeaninglessShortMessage(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (trimmed.length < FORM_LIMITS.minMeaningfulMessageLength) return true;
  return MEANINGLESS_MESSAGE_REGEX.test(trimmed);
}

export function validateMessageText(
  value: string,
  lang: LanguageCode,
  options?: { required?: boolean; maxLength?: number; label?: LocalizedString },
): string | null {
  const maxLength = options?.maxLength ?? FORM_LIMITS.messageMax;
  const trimmed = sanitizeFormText(value, maxLength);

  if (!trimmed) {
    return options?.required
      ? lang === "ar"
        ? `يرجى تعبئة حقل: ${getLocalized(options?.label ?? { ar: "الرسالة", en: "Message" }, lang)}`
        : `Please fill in: ${getLocalized(options?.label ?? { ar: "الرسالة", en: "Message" }, lang)}`
      : null;
  }

  if (trimmed.length > maxLength) {
    return lang === "ar"
      ? `النص طويل جدًا (الحد الأقصى ${maxLength} حرفًا).`
      : `Text is too long (maximum ${maxLength} characters).`;
  }

  if (hasSuspiciousRepeatedCharacters(trimmed)) {
    return lang === "ar"
      ? "يرجى كتابة رسالة أوضح بدون تكرار مفرط."
      : "Please write a clearer message without excessive repetition.";
  }

  if (isMeaninglessShortMessage(trimmed)) {
    return lang === "ar"
      ? "الرسالة قصيرة جدًا أو غير واضحة."
      : "Message is too short or unclear.";
  }

  return null;
}

export type PublicFieldType = "text" | "phone" | "amount" | "message" | "notes";

export interface PublicFormFieldRule {
  key: string;
  label: LocalizedString;
  required?: boolean;
  type?: PublicFieldType;
}

export function validatePublicFormFields(
  rules: PublicFormFieldRule[],
  values: Record<string, string>,
  lang: LanguageCode,
): string | null {
  for (const rule of rules) {
    const raw = values[rule.key] ?? "";

    if (rule.required && !raw.trim()) {
      const requiredError = validateRequiredValue(raw, rule.label, lang);
      if (requiredError) return requiredError;
    }

    if (!raw.trim()) continue;

    switch (rule.type) {
      case "phone": {
        const phoneError = validateWhatsAppNumber(raw, lang);
        if (phoneError) return phoneError;
        break;
      }
      case "amount": {
        const amountError = validateAmount(raw, lang, rule.required);
        if (amountError) return amountError;
        break;
      }
      case "message": {
        const messageError = validateMessageText(raw, lang, {
          required: rule.required,
          maxLength: FORM_LIMITS.messageMax,
          label: rule.label,
        });
        if (messageError) return messageError;
        break;
      }
      case "notes": {
        const notesError = validateMessageText(raw, lang, {
          required: rule.required,
          maxLength: FORM_LIMITS.notesMax,
          label: rule.label,
        });
        if (notesError) return notesError;
        break;
      }
      default: {
        const text = sanitizeFormText(raw, FORM_LIMITS.nameMax);
        if (rule.required && text.length < FORM_LIMITS.nameMin) {
          return lang === "ar"
            ? `يرجى إدخال قيمة صالحة لحقل: ${getLocalized(rule.label, lang)}`
            : `Please enter a valid value for: ${getLocalized(rule.label, lang)}`;
        }
        if (hasSuspiciousRepeatedCharacters(text)) {
          return lang === "ar"
            ? `يرجى مراجعة حقل: ${getLocalized(rule.label, lang)}`
            : `Please review field: ${getLocalized(rule.label, lang)}`;
        }
        break;
      }
    }
  }

  return null;
}
