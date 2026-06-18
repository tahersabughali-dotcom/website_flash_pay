import type { LanguageCode, LocalizedString } from "@/types/common";

export function getLocalized(
  field: LocalizedString | undefined,
  lang: LanguageCode,
  fallbackLang: LanguageCode = "en",
): string {
  if (!field) return "";
  return field[lang] ?? field[fallbackLang] ?? Object.values(field)[0] ?? "";
}

export function isRtlLanguage(lang: LanguageCode): boolean {
  return lang === "ar";
}

export function getTextDirection(lang: LanguageCode): "rtl" | "ltr" {
  return isRtlLanguage(lang) ? "rtl" : "ltr";
}

/** RTL-aware arrow for section action links. */
export function getActionArrow(lang: LanguageCode): string {
  return lang === "ar" ? "←" : "→";
}
