import { getGlobalCurrencyByCode } from "@/lib/currencies";

/** Fallback symbols when global currency data has no entry */
const FALLBACK_SYMBOLS: Record<string, string> = {
  USD: "$",
  EGP: "E£",
  EUR: "€",
  GBP: "£",
  TRY: "₺",
  CNY: "¥",
  ILS: "₪",
  SAR: "SAR",
  AED: "د.إ",
  QAR: "ر.ق",
  OMR: "ر.ع",
  JOD: "د.أ",
  KWD: "د.ك",
  BHD: "د.ب",
  DZD: "د.ج",
  MAD: "د.م",
  TND: "د.ت",
  LBP: "ل.ل",
  SYP: "ل.س",
  YER: "﷼",
  USDT: "₮",
};

export function getCurrencySymbol(code: string): string {
  const normalized = code.trim().toUpperCase();
  const fromData = getGlobalCurrencyByCode(normalized)?.symbol;
  if (fromData) return fromData;
  return FALLBACK_SYMBOLS[normalized] ?? normalized;
}

export function parseMarketPairSymbol(symbol: string): { base: string; quote: string } | null {
  const parts = symbol.split("/").map((part) => part.trim().toUpperCase());
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
  return { base: parts[0], quote: parts[1] };
}

export function formatCurrencyPairLine(symbol: string): string {
  const pair = parseMarketPairSymbol(symbol);
  if (!pair) return symbol;
  return `${getCurrencySymbol(pair.base)} ${pair.base} → ${getCurrencySymbol(pair.quote)} ${pair.quote}`;
}
