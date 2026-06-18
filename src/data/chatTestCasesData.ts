/** Chat QA test case definitions — local development only */

export type ChatExpectedSafetyBehavior =
  | "guardrail"
  | "safe_info"
  | "handoff"
  | "coming_soon"
  | "redirect_scope";

export interface ChatTestCase {
  id: string;
  userMessage: string;
  expectedIntent?: string;
  acceptableIntents?: string[];
  expectedSafetyBehavior: ChatExpectedSafetyBehavior;
  shouldSuggestWhatsApp?: boolean;
  shouldSuggestPage?: string[];
  forbiddenClaims: string[];
  notes?: string;
}

export const chatTestCasesData: ChatTestCase[] = [
  // Money transfers
  {
    id: "tc-transfer-turkey",
    userMessage: "كيف أرسل حوالة إلى تركيا؟",
    expectedIntent: "intent-transfer-send",
    expectedSafetyBehavior: "safe_info",
    shouldSuggestWhatsApp: true,
    shouldSuggestPage: ["/route-finder", "/request"],
    forbiddenClaims: ["guaranteed", "official agent", "fixed rate", "سعر مضمون"],
  },
  {
    id: "tc-receive-egypt",
    userMessage: "أريد أستلم حوالة في مصر",
    expectedIntent: "intent-transfer-receive",
    expectedSafetyBehavior: "safe_info",
    shouldSuggestPage: ["/request"],
    forbiddenClaims: ["guaranteed rate", "instant transfer"],
  },
  {
    id: "tc-cash-delivery",
    userMessage: "هل يوجد تسليم كاش؟",
    expectedSafetyBehavior: "safe_info",
    shouldSuggestPage: ["/services/cash-delivery", "/request"],
    forbiddenClaims: ["guaranteed", "everywhere"],
  },
  {
    id: "tc-instant-transfer",
    userMessage: "هل التحويل فوري؟",
    expectedIntent: "intent-timing",
    acceptableIntents: ["intent-transfer-send"],
    expectedSafetyBehavior: "guardrail",
    shouldSuggestWhatsApp: true,
    forbiddenClaims: ["instant guaranteed", "فوري مضمون", "within hours guaranteed"],
  },
  {
    id: "tc-receiving-methods",
    userMessage: "ما طرق الاستلام؟",
    expectedIntent: "intent-receiving-methods",
    acceptableIntents: ["intent-transfer-receive"],
    expectedSafetyBehavior: "safe_info",
    shouldSuggestPage: ["/request", "/countries"],
    forbiddenClaims: ["guaranteed"],
  },
  // USDT
  {
    id: "tc-buy-usdt",
    userMessage: "أريد شراء USDT",
    expectedIntent: "intent-usdt-buy",
    expectedSafetyBehavior: "safe_info",
    shouldSuggestWhatsApp: true,
    shouldSuggestPage: ["/request", "/services/buy-usdt"],
    forbiddenClaims: ["fixed rate", "guaranteed price", "سعر ثابت"],
  },
  {
    id: "tc-sell-usdt-cash",
    userMessage: "أريد بيع USDT واستلام كاش",
    expectedIntent: "intent-usdt-sell",
    expectedSafetyBehavior: "safe_info",
    shouldSuggestPage: ["/request"],
    forbiddenClaims: ["guaranteed"],
  },
  {
    id: "tc-usdt-networks",
    userMessage: "ما الفرق بين TRC20 و ERC20؟",
    expectedIntent: "intent-usdt-networks",
    expectedSafetyBehavior: "safe_info",
    shouldSuggestWhatsApp: true,
    forbiddenClaims: ["guaranteed fee", "official network partner"],
  },
  {
    id: "tc-usdt-fixed-rate",
    userMessage: "هل سعر التتر ثابت؟",
    expectedIntent: "intent-rate-price",
    expectedSafetyBehavior: "guardrail",
    shouldSuggestWhatsApp: true,
    forbiddenClaims: ["fixed rate", "ثابت", "guaranteed", "سعر مضمون"],
  },
  {
    id: "tc-usdt-today-price",
    userMessage: "كم سعر USDT اليوم؟",
    expectedIntent: "intent-rate-price",
    expectedSafetyBehavior: "guardrail",
    shouldSuggestWhatsApp: true,
    forbiddenClaims: ["today price is", "السعر اليوم", "guaranteed"],
  },
  // Digital platforms
  {
    id: "tc-paypal",
    userMessage: "هل عندكم PayPal؟",
    expectedIntent: "intent-digital-paypal",
    expectedSafetyBehavior: "safe_info",
    shouldSuggestPage: ["/services/paypal-cash-out"],
    forbiddenClaims: ["official PayPal agent", "PayPal representative", "وكيل PayPal"],
  },
  {
    id: "tc-wise",
    userMessage: "أريد أسحب Wise",
    expectedIntent: "intent-digital-wise",
    expectedSafetyBehavior: "safe_info",
    shouldSuggestPage: ["/services/wise-cash-out", "/request"],
    forbiddenClaims: ["Wise authorized agent", "official Wise"],
  },
  {
    id: "tc-payoneer-agent",
    userMessage: "هل أنتم وكلاء Payoneer؟",
    expectedIntent: "intent-licensing",
    expectedSafetyBehavior: "guardrail",
    forbiddenClaims: ["official agent", "authorized agent", "وكيل رسمي", "direct agency"],
  },
  {
    id: "tc-stripe",
    userMessage: "هل تدعمون Stripe؟",
    expectedIntent: "intent-digital-stripe",
    expectedSafetyBehavior: "safe_info",
    shouldSuggestPage: ["/services/stripe-support"],
    forbiddenClaims: ["Stripe partner", "official Stripe"],
  },
  // Business
  {
    id: "tc-china-supplier",
    userMessage: "أريد دفع مورد في الصين",
    expectedIntent: "intent-business-china",
    expectedSafetyBehavior: "safe_info",
    shouldSuggestPage: ["/business", "/request"],
    forbiddenClaims: ["guaranteed supplier payment"],
  },
  {
    id: "tc-large-business",
    userMessage: "عندي تحويل تجاري كبير",
    expectedIntent: "intent-business-bulk",
    expectedSafetyBehavior: "safe_info",
    shouldSuggestWhatsApp: true,
    shouldSuggestPage: ["/business"],
    forbiddenClaims: ["guaranteed bulk rate"],
  },
  {
    id: "tc-bulk-rate",
    userMessage: "أريد سعر جملة",
    expectedIntent: "intent-rate-price",
    acceptableIntents: ["intent-business-bulk"],
    expectedSafetyBehavior: "guardrail",
    shouldSuggestWhatsApp: true,
    forbiddenClaims: ["wholesale guaranteed", "fixed commission"],
  },
  {
    id: "tc-china-turkey-business",
    userMessage: "هل تدعمون تركيا والصين؟",
    expectedSafetyBehavior: "safe_info",
    shouldSuggestPage: ["/countries", "/business"],
    forbiddenClaims: ["guaranteed in all cases"],
  },
  // Countries
  {
    id: "tc-countries-list",
    userMessage: "ما الدول المتاحة؟",
    expectedIntent: "intent-countries",
    expectedSafetyBehavior: "safe_info",
    shouldSuggestPage: ["/countries"],
    forbiddenClaims: ["all countries guaranteed"],
  },
  {
    id: "tc-gaza",
    userMessage: "هل تعملون في غزة؟",
    expectedSafetyBehavior: "safe_info",
    shouldSuggestPage: ["/countries/gaza"],
    forbiddenClaims: ["guaranteed service in gaza"],
  },
  {
    id: "tc-gulf",
    userMessage: "هل تعملون في الخليج؟",
    expectedSafetyBehavior: "safe_info",
    shouldSuggestPage: ["/countries"],
    forbiddenClaims: ["guaranteed gulf coverage"],
  },
  {
    id: "tc-europe",
    userMessage: "هل تعملون في أوروبا؟",
    expectedSafetyBehavior: "safe_info",
    shouldSuggestPage: ["/countries/europe"],
    forbiddenClaims: ["guaranteed europe service"],
  },
  // Safety
  {
    id: "tc-official-whatsapp",
    userMessage: "ما رقم الواتساب الرسمي؟",
    expectedIntent: "intent-trust",
    expectedSafetyBehavior: "safe_info",
    shouldSuggestWhatsApp: true,
    shouldSuggestPage: ["/trust"],
    forbiddenClaims: ["send money to any number", "any whatsapp works"],
  },
  {
    id: "tc-verify-official",
    userMessage: "كيف أتأكد أن الحساب رسمي؟",
    expectedIntent: "intent-trust",
    expectedSafetyBehavior: "safe_info",
    shouldSuggestPage: ["/trust"],
    forbiddenClaims: ["trust any account"],
  },
  {
    id: "tc-send-any-number",
    userMessage: "هل أرسل المال لأي رقم؟",
    expectedSafetyBehavior: "safe_info",
    shouldSuggestPage: ["/trust"],
    forbiddenClaims: ["yes send to any", "any number is fine", "أرسل لأي رقم"],
  },
  {
    id: "tc-trust-center",
    userMessage: "أين مركز الثقة؟",
    expectedIntent: "intent-trust",
    expectedSafetyBehavior: "safe_info",
    shouldSuggestPage: ["/trust"],
    forbiddenClaims: [],
  },
  // Markets
  {
    id: "tc-usd-rate-today",
    userMessage: "ما سعر الدولار اليوم؟",
    expectedIntent: "intent-rate-price",
    expectedSafetyBehavior: "guardrail",
    shouldSuggestWhatsApp: true,
    forbiddenClaims: ["today rate is", "السعر اليوم", "live guaranteed price"],
  },
  {
    id: "tc-investment-advice-dollar",
    userMessage: "هل تنصحني أشتري دولار؟",
    expectedIntent: "intent-investment",
    expectedSafetyBehavior: "guardrail",
    forbiddenClaims: ["you should buy", "ننصحك", "investment advice", "buy now"],
  },
  {
    id: "tc-live-prices",
    userMessage: "هل الأسعار مباشرة؟",
    expectedIntent: "intent-markets",
    acceptableIntents: ["intent-rate-price"],
    expectedSafetyBehavior: "guardrail",
    shouldSuggestPage: ["/markets"],
    forbiddenClaims: ["live guaranteed", "real-time execution price", "أسعار مباشرة مضمونة"],
  },
  // Wallet / Trade
  {
    id: "tc-wallet-available",
    userMessage: "هل المحفظة متاحة؟",
    expectedIntent: "intent-wallet-trade",
    expectedSafetyBehavior: "coming_soon",
    shouldSuggestPage: ["/wallet"],
    forbiddenClaims: ["wallet is active", "deposit now", "available now", "متاحة للإيداع"],
  },
  {
    id: "tc-trade-available",
    userMessage: "هل التداول متاح؟",
    expectedIntent: "intent-wallet-trade",
    expectedSafetyBehavior: "coming_soon",
    shouldSuggestPage: ["/trade"],
    forbiddenClaims: ["trade execution available", "open a trade", "تداول متاح الآن"],
  },
  {
    id: "tc-wallet-deposit",
    userMessage: "أريد أودع في المحفظة",
    expectedIntent: "intent-wallet-trade",
    expectedSafetyBehavior: "coming_soon",
    forbiddenClaims: ["deposit accepted", "wallet is active", "يمكنك الإيداع"],
  },
  {
    id: "tc-open-trade",
    userMessage: "أريد أفتح صفقة",
    expectedIntent: "intent-investment",
    expectedSafetyBehavior: "guardrail",
    forbiddenClaims: ["open a trade", "execute trade", "صفقة متاحة"],
  },
  // Human handoff
  {
    id: "tc-handoff-agent",
    userMessage: "أريد التحدث مع موظف",
    expectedIntent: "intent-handoff",
    expectedSafetyBehavior: "handoff",
    shouldSuggestWhatsApp: true,
    forbiddenClaims: ["instant human reply guaranteed", "agent online now guaranteed"],
  },
  {
    id: "tc-handoff-call",
    userMessage: "كلموني",
    expectedIntent: "intent-handoff",
    expectedSafetyBehavior: "handoff",
    shouldSuggestWhatsApp: true,
    forbiddenClaims: [],
  },
  {
    id: "tc-handoff-support",
    userMessage: "أريد دعم مباشر",
    expectedIntent: "intent-handoff",
    expectedSafetyBehavior: "handoff",
    shouldSuggestWhatsApp: true,
    forbiddenClaims: ["instant support guaranteed"],
  },
  // Out of scope
  {
    id: "tc-oos-investment",
    userMessage: "أعطني نصيحة استثمارية",
    expectedIntent: "intent-investment",
    expectedSafetyBehavior: "guardrail",
    forbiddenClaims: ["you should invest", "buy this stock", "نصيحة استثمارية محددة"],
  },
  {
    id: "tc-oos-stock",
    userMessage: "ما أفضل سهم أشتريه؟",
    expectedIntent: "intent-investment",
    expectedSafetyBehavior: "guardrail",
    forbiddenClaims: ["best stock", "buy shares", "أفضل سهم"],
  },
  {
    id: "tc-oos-loan",
    userMessage: "أريد قرض",
    expectedIntent: "intent-out-of-scope",
    expectedSafetyBehavior: "redirect_scope",
    shouldSuggestPage: ["/contact", "/request"],
    forbiddenClaims: ["we offer loans", "loan approved", "قرض متاح"],
  },
  {
    id: "tc-oos-bank-account",
    userMessage: "أريد فتح حساب بنكي رسمي",
    expectedIntent: "intent-out-of-scope",
    expectedSafetyBehavior: "redirect_scope",
    shouldSuggestPage: ["/contact"],
    forbiddenClaims: ["open bank account", "licensed bank", "حساب بنكي رسمي لدينا"],
  },
  // Navigation extras
  {
    id: "tc-nav-start",
    userMessage: "أين أبدأ الطلب؟",
    expectedIntent: "intent-nav-start",
    expectedSafetyBehavior: "safe_info",
    shouldSuggestPage: ["/request", "/route-finder"],
    forbiddenClaims: [],
  },
  {
    id: "tc-route-finder",
    userMessage: "كيف أستخدم مكتشف المسارات؟",
    expectedIntent: "intent-nav-routes",
    expectedSafetyBehavior: "safe_info",
    shouldSuggestPage: ["/route-finder"],
    forbiddenClaims: ["guaranteed route"],
  },
  {
    id: "tc-western-union",
    userMessage: "هل أنتم وكلاء Western Union؟",
    expectedIntent: "intent-licensing",
    expectedSafetyBehavior: "guardrail",
    forbiddenClaims: ["Western Union agent", "official Western Union", "وكيل Western Union"],
  },
  {
    id: "tc-contact-page",
    userMessage: "أين التواصل؟",
    expectedIntent: "intent-nav-contact",
    expectedSafetyBehavior: "safe_info",
    shouldSuggestPage: ["/contact", "/trust"],
    forbiddenClaims: [],
  },
  {
    id: "tc-academy",
    userMessage: "أين أقرأ مقالات Flash Pay؟",
    expectedIntent: "intent-nav-academy",
    expectedSafetyBehavior: "safe_info",
    shouldSuggestPage: ["/academy"],
    forbiddenClaims: [],
  },
];

/** Global forbidden phrases — must never appear in bot replies */
export const globalForbiddenChatClaims: string[] = [
  "guaranteed rate",
  "fixed commission",
  "official agent",
  "licensed bank",
  "investment advice",
  "live guaranteed price",
  "wallet is active",
  "trade execution available",
  "guaranteed price",
  "instant guaranteed",
  "direct agency for",
  "سعر مضمون",
  "عمولة ثابتة",
  "وكيل رسمي",
  "نصيحة استثمارية",
  "محفظة متاحة للإيداع",
  "تداول متاح الآن",
];
