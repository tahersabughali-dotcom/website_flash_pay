import type { LocalizedString } from "@/types/common";
import type { MarketCategory } from "@/types/market";
import type { AcademyCategory } from "@/types/article";

export const marketCategoriesData: {
  id: MarketCategory;
  label: LocalizedString;
}[] = [
  { id: "forex", label: { ar: "Forex", en: "Forex" } },
  { id: "crypto", label: { ar: "Crypto", en: "Crypto" } },
  { id: "metals", label: { ar: "Metals", en: "Metals" } },
  { id: "energy", label: { ar: "Energy", en: "Energy" } },
  { id: "indices", label: { ar: "Indices", en: "Indices" } },
];

export const academyCategoriesData: {
  id: AcademyCategory | "all";
  label: LocalizedString;
}[] = [
  { id: "all", label: { ar: "الكل", en: "All" } },
  { id: "usdt", label: { ar: "USDT", en: "USDT" } },
  { id: "money_transfers", label: { ar: "تحويلات مالية", en: "Money Transfers" } },
  { id: "digital_wallets", label: { ar: "محافظ رقمية", en: "Digital Wallets" } },
  { id: "business_payments", label: { ar: "مدفوعات تجارية", en: "Business Payments" } },
  { id: "market_analysis", label: { ar: "تحليل الأسواق", en: "Market Analysis" } },
  { id: "fraud_protection", label: { ar: "حماية من الاحتيال", en: "Fraud Protection" } },
  { id: "trading_basics", label: { ar: "أساسيات التداول", en: "Trading Basics" } },
];

/** Business-related service slugs shown on Flash Business Class page */
export const businessServiceSlugs = [
  "supplier-payments",
  "business-payments",
  "china-payments",
  "turkey-payments",
  "bulk-exchange-rates",
  "buy-usdt",
  "global-money-transfers",
] as const;
