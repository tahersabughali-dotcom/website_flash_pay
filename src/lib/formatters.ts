import type { LanguageCode } from "@/types/common";

export function formatNumber(value: number, lang: LanguageCode = "en"): string {
  return new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-US").format(value);
}

export function formatPercent(value: number, lang: LanguageCode = "en"): string {
  return new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

export function formatDate(iso: string, lang: LanguageCode = "en"): string {
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-US", {
    dateStyle: "medium",
  }).format(new Date(iso));
}
