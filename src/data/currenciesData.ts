import type { LocalizedString } from "@/types/common";

export interface CurrencyDefinition {
  id: string;
  code: string;
  name: LocalizedString;
  symbol: string;
  status: "active" | "hidden";
  order: number;
}

export const currenciesData: CurrencyDefinition[] = [
  { id: "USD", code: "USD", name: { ar: "دولار أمريكي", en: "US Dollar" }, symbol: "$", status: "active", order: 1 },
  { id: "EUR", code: "EUR", name: { ar: "يورو", en: "Euro" }, symbol: "€", status: "active", order: 2 },
  { id: "GBP", code: "GBP", name: { ar: "جنيه إسترليني", en: "British Pound" }, symbol: "£", status: "active", order: 3 },
  { id: "EGP", code: "EGP", name: { ar: "جنيه مصري", en: "Egyptian Pound" }, symbol: "E£", status: "active", order: 4 },
  { id: "TRY", code: "TRY", name: { ar: "ليرة تركية", en: "Turkish Lira" }, symbol: "₺", status: "active", order: 5 },
  { id: "CNY", code: "CNY", name: { ar: "يوان صيني", en: "Chinese Yuan" }, symbol: "¥", status: "active", order: 6 },
  { id: "ILS", code: "ILS", name: { ar: "شيكل", en: "Israeli Shekel" }, symbol: "₪", status: "active", order: 7 },
  { id: "SAR", code: "SAR", name: { ar: "ريال سعودي", en: "Saudi Riyal" }, symbol: "SAR", status: "active", order: 8 },
  { id: "AED", code: "AED", name: { ar: "درهم إماراتي", en: "UAE Dirham" }, symbol: "AED", status: "active", order: 9 },
  { id: "QAR", code: "QAR", name: { ar: "ريال قطري", en: "Qatari Riyal" }, symbol: "QAR", status: "active", order: 10 },
  { id: "OMR", code: "OMR", name: { ar: "ريال عماني", en: "Omani Rial" }, symbol: "OMR", status: "active", order: 11 },
  { id: "JOD", code: "JOD", name: { ar: "دينار أردني", en: "Jordanian Dinar" }, symbol: "JD", status: "active", order: 12 },
  { id: "KWD", code: "KWD", name: { ar: "دينار كويتي", en: "Kuwaiti Dinar" }, symbol: "KD", status: "active", order: 13 },
  { id: "USDT", code: "USDT", name: { ar: "USDT", en: "USDT" }, symbol: "USDT", status: "active", order: 14 },
];
