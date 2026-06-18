import type { ChatIntentDefinition } from "@/types/chat";

/**
 * Chat intents — map common visitor phrases to knowledge categories.
 * Arabic synonyms included per Step 15 requirements.
 */
export const chatIntentsData: ChatIntentDefinition[] = [
  {
    id: "intent-out-of-scope",
    category: "general",
    keywords: {
      ar: ["قرض", "loan", "حساب بنكي", "bank account", "فتح حساب", "mortgage"],
      en: ["loan", "bank account", "open account", "mortgage", "credit line"],
    },
  },
  {
    id: "intent-handoff",
    category: "general",
    triggersHandoff: true,
    keywords: {
      ar: ["موظف", "خدمة عملاء", "أريد شخص", "تواصل مباشر", "كلموني", "الدعم", "إنسان", "بشري", "ممثل", "دعم مباشر"],
      en: ["agent", "human", "representative", "talk to someone", "customer service", "support team", "direct support"],
    },
  },
  {
    id: "intent-rate-price",
    category: "markets",
    safetyLevel: "sensitive",
    keywords: {
      ar: ["سعر", "أسعار", "كام", "عمولة", "نسبة", "سعر اليوم", "سعر الدولار", "سعر التتر", "ثابت", "مضمون", "guaranteed"],
      en: ["price", "rate", "fee", "commission", "today rate", "fixed rate", "guaranteed", "how much"],
    },
  },
  {
    id: "intent-timing",
    category: "general",
    safetyLevel: "sensitive",
    keywords: {
      ar: ["مدة", "متى", "وقت التنفيذ", "كم يوم", "كم ساعة", "سرعة", "فوري", "فوراً", "instant"],
      en: ["how long", "execution time", "when will", "timing", "how fast", "instant", "immediate"],
    },
  },
  {
    id: "intent-licensing",
    category: "trust",
    safetyLevel: "sensitive",
    keywords: {
      ar: ["وكيل", "وكلاء", "وكالة", "رسمي", "مرخص", "ترخيص", "western union", "moneygram", "ria", "payoneer"],
      en: ["agent", "agency", "licensed", "license", "official agent", "western union", "moneygram", "authorized", "payoneer"],
    },
  },
  {
    id: "intent-investment",
    category: "markets",
    safetyLevel: "restricted",
    keywords: {
      ar: ["استثمار", "ربح", "خسارة", "نصيحة مالية", "portfolio", "صفقة", "سهم", "أسهم", "تنصحني", "ننصح"],
      en: ["invest", "investment", "trading advice", "financial advice", "profit", "portfolio", "stock", "shares", "open a trade", "recommend"],
    },
  },
  {
    id: "intent-wallet-trade",
    category: "coming_soon",
    keywords: {
      ar: ["محفظة", "wallet", "flash wallet", "flash trade", "إيداع في المحفظة", "أودع في المحفظة", "رصيد المحفظة", "التداول"],
      en: ["wallet", "flash wallet", "flash trade", "deposit to wallet", "wallet balance", "flash trade"],
    },
    knowledgeIds: ["kb-wallet-trade", "static-coming-soon"],
  },
  {
    id: "intent-transfer-send",
    category: "transfers",
    keywords: {
      ar: ["حوالة", "تحويل", "إرسال مال", "ارسل", "أرسل", "send money", "remittance"],
      en: ["transfer", "send money", "remittance", "wire", "send transfer"],
    },
    knowledgeIds: ["static-send-transfer", "kb-transfers"],
  },
  {
    id: "intent-transfer-receive",
    category: "transfers",
    keywords: {
      ar: ["استلام", "أستلم", "receive", "استلام حوالة", "تسليم"],
      en: ["receive", "receive money", "pick up", "collect transfer"],
    },
    knowledgeIds: ["static-receive-transfer"],
  },
  {
    id: "intent-usdt-buy",
    category: "usdt",
    keywords: {
      ar: ["شراء usdt", "buy usdt", "usdt", "تتر", "تيذر", "يو اس دي تي"],
      en: ["buy usdt", "purchase usdt", "usdt buy", "tether"],
    },
    knowledgeIds: ["static-buy-usdt", "kb-buy-usdt"],
  },
  {
    id: "intent-usdt-sell",
    category: "usdt",
    keywords: {
      ar: ["بيع usdt", "أبيع", "sell usdt", "usdt to cash", "كاش"],
      en: ["sell usdt", "usdt sell", "cash out usdt"],
    },
    knowledgeIds: ["static-sell-usdt", "kb-sell-usdt"],
  },
  {
    id: "intent-usdt-networks",
    category: "usdt",
    keywords: {
      ar: ["trc20", "erc20", "bep20", "شبكة", "network", "كريبتو", "عملات رقمية"],
      en: ["trc20", "erc20", "bep20", "network", "crypto", "blockchain"],
    },
    knowledgeIds: ["static-usdt-networks"],
  },
  {
    id: "intent-digital-paypal",
    category: "digital_platforms",
    keywords: {
      ar: ["paypal", "باي بال", "pay pal"],
      en: ["paypal", "pay pal"],
    },
    knowledgeIds: ["dyn-svc-paypal-cash-out"],
  },
  {
    id: "intent-digital-wise",
    category: "digital_platforms",
    keywords: {
      ar: ["wise", "وايز", "transferwise"],
      en: ["wise", "transferwise"],
    },
    knowledgeIds: ["dyn-svc-wise-cash-out"],
  },
  {
    id: "intent-digital-payoneer",
    category: "digital_platforms",
    keywords: {
      ar: ["payoneer", "بايونير"],
      en: ["payoneer"],
    },
    knowledgeIds: ["dyn-svc-payoneer-cash-out"],
  },
  {
    id: "intent-digital-stripe",
    category: "digital_platforms",
    keywords: {
      ar: ["stripe", "سترايب"],
      en: ["stripe"],
    },
    knowledgeIds: ["dyn-svc-stripe-support"],
  },
  {
    id: "intent-business-china",
    category: "business",
    keywords: {
      ar: ["مورد", "الصين", "china", "supplier", "دفع مورد", "import"],
      en: ["supplier", "china payment", "pay supplier", "import"],
    },
    knowledgeIds: ["static-business-supplier", "dyn-biz-supplier-payments"],
  },
  {
    id: "intent-business-bulk",
    category: "business",
    keywords: {
      ar: ["جملة", "bulk", "حجم كبير", "liquidity", "سيولة", "شركة", "تجاري"],
      en: ["bulk", "wholesale rate", "high volume", "liquidity", "business", "b2b"],
    },
    knowledgeIds: ["static-business-bulk", "dyn-biz-high-volume-liquidity"],
  },
  {
    id: "intent-countries",
    category: "countries",
    keywords: {
      ar: ["دول", "دولة", "متاح", "تغطية", "countries"],
      en: ["countries", "country", "coverage", "available countries"],
    },
    knowledgeIds: ["static-countries-overview", "kb-countries"],
  },
  {
    id: "intent-partners",
    category: "partners",
    keywords: {
      ar: ["شريك", "شراكة", "مكتب", "partner", "network"],
      en: ["partner", "partnership", "office", "network"],
    },
    knowledgeIds: ["static-partners-overview"],
  },
  {
    id: "intent-markets",
    category: "markets",
    keywords: {
      ar: ["سوق", "markets", "أسعار السوق", "dashboard"],
      en: ["markets", "market dashboard", "indicative"],
    },
    knowledgeIds: ["static-markets-info", "kb-markets"],
  },
  {
    id: "intent-trust",
    category: "trust",
    keywords: {
      ar: ["ثقة", "أمان", "احتيال", "رسمي", "whatsapp", "واتساب", "رقم", "اتأكد", "أتأكد", "حساب رسمي"],
      en: ["trust", "safety", "scam", "fraud", "official", "whatsapp number", "verify account", "official account"],
    },
    knowledgeIds: [
      "static-trust-verify",
      "static-trust-send-any",
      "static-trust-whatsapp",
      "static-trust-safety",
      "kb-contact",
      "kb-trust",
    ],
  },
  {
    id: "intent-nav-start",
    category: "navigation",
    keywords: {
      ar: ["أين أبدأ", "كيف أطلب", "ابدأ", "أين الطلب", "how to start"],
      en: ["where to start", "how to request", "get started", "how do i order"],
    },
    knowledgeIds: ["static-nav-start"],
  },
  {
    id: "intent-nav-routes",
    category: "navigation",
    keywords: {
      ar: ["مسار", "route finder", "مكتشف", "من دولة"],
      en: ["route finder", "find route", "corridor"],
    },
    knowledgeIds: ["static-nav-routes", "kb-route-finder"],
  },
  {
    id: "intent-nav-contact",
    category: "navigation",
    keywords: {
      ar: ["تواصل", "contact", "دعم", "support"],
      en: ["contact", "support page", "reach you"],
    },
    knowledgeIds: ["static-nav-contact"],
  },
  {
    id: "intent-nav-academy",
    category: "navigation",
    keywords: {
      ar: ["أكاديمية", "academy", "مقالات", "articles"],
      en: ["academy", "articles", "learn"],
    },
    knowledgeIds: ["static-nav-academy"],
  },
  {
    id: "intent-payment-methods",
    category: "payment_methods",
    keywords: {
      ar: ["طرق الدفع", "طريقة دفع", "كاش", "بنك", "محفظة", "payment method"],
      en: ["payment method", "how to pay", "cash", "bank"],
    },
    knowledgeIds: ["static-payment-methods"],
  },
  {
    id: "intent-receiving-methods",
    category: "transfers",
    keywords: {
      ar: ["طرق الاستلام", "استلام كاش", "receiving method"],
      en: ["receiving method", "how to receive", "payout method"],
    },
    knowledgeIds: ["static-receiving-methods"],
  },
];
