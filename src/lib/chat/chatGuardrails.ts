import { chatAnswerTemplates } from "@/data/chatAnswerTemplates";
import type { LanguageCode } from "@/types/common";

export type SensitiveGuardrailType =
  | "rate"
  | "timing"
  | "licensing"
  | "investment"
  | "wallet_trade";

const PATTERNS: Record<SensitiveGuardrailType, { ar: string[]; en: string[] }> = {
  rate: {
    ar: [
      "سعر",
      "أسعار",
      "كام",
      "عمولة",
      "نسبة",
      "سعر اليوم",
      "سعر الدولار",
      "سعر التتر",
      "ثابت",
      "مضمون",
      "fixed rate",
      "guaranteed rate",
      "commission",
      "fee",
    ],
    en: [
      "price",
      "rate",
      "fee",
      "commission",
      "today rate",
      "fixed rate",
      "guaranteed",
      "how much",
      "exchange rate",
    ],
  },
  timing: {
    ar: ["مدة", "متى", "وقت التنفيذ", "كم يوم", "كم ساعة", "سرعة", "فوري", "فوراً", "instant", "immediate"],
    en: ["how long", "execution time", "when will", "timing", "how fast", "delivery time", "instant", "immediate"],
  },
  licensing: {
    ar: [
      "وكيل",
      "وكلاء",
      "وكالة",
      "western union",
      "moneygram",
      "ria",
      "payoneer",
      "مرخص",
      "ترخيص",
      "official agent",
    ],
    en: [
      "western union",
      "moneygram",
      "ria",
      "official agent",
      "licensed agent",
      "authorized agent",
      "direct agency",
    ],
  },
  investment: {
    ar: ["استثمار", "نصيحة مالية", "portfolio", "ربح", "خسارة", "توصية", "صفقة", "سهم", "أسهم", "أفضل سهم", "تنصحني", "ننصح", "أنصح", "أشتري دولار", "شراء دولار"],
    en: ["invest", "investment", "financial advice", "trading recommendation", "should i buy", "stock", "shares", "open a trade", "buy dollar", "recommend"],
  },
  wallet_trade: {
    ar: ["محفظة", "wallet", "flash wallet", "flash trade", "إيداع في المحفظة", "سحب من المحفظة", "رصيد المحفظة", "التداول", "تداول flash"],
    en: ["wallet balance", "flash wallet", "flash trade", "trading platform", "deposit to wallet", "withdraw from wallet", "flash trade available"],
  },
};

export function detectSensitiveGuardrail(
  text: string,
  lang: LanguageCode,
): SensitiveGuardrailType | null {
  const normalized = text.trim().toLowerCase();

  const order: SensitiveGuardrailType[] = [
    "wallet_trade",
    "investment",
    "licensing",
    "timing",
    "rate",
  ];

  for (const type of order) {
    const patterns = [...PATTERNS[type].ar, ...PATTERNS[type].en];
    if (patterns.some((pattern) => normalized.includes(pattern.toLowerCase()))) {
      if (type === "rate" && lang === "ar" && normalized.includes("ثقة")) continue;
      if (
        type === "licensing" &&
        (normalized.includes("اتأكد") ||
          normalized.includes("verify") ||
          normalized.includes("مركز الثقة") ||
          normalized.includes("trust center") ||
          (normalized.includes("حساب") && normalized.includes("رسمي") && !normalized.includes("payoneer") &&
            !normalized.includes("western union")))
      ) {
        continue;
      }
      return type;
    }
  }

  return null;
}

export function getGuardrailAnswer(
  type: SensitiveGuardrailType,
  lang: LanguageCode,
): string {
  const map = {
    rate: chatAnswerTemplates.rateSafe,
    timing: chatAnswerTemplates.timingSafe,
    licensing: chatAnswerTemplates.licensingSafe,
    investment: chatAnswerTemplates.investmentSafe,
    wallet_trade: chatAnswerTemplates.walletTradeSafe,
  };

  return map[type][lang];
}
