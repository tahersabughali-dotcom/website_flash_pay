import type { Article } from "@/types/article";

const TS = "2026-06-17T12:00:00.000Z";

function article(partial: Omit<Article, "createdAt" | "updatedAt">): Article {
  return { ...partial, createdAt: TS, updatedAt: TS };
}

export const articlesData: Article[] = [
  article({
    id: "art-what-is-usdt",
    slug: "what-is-usdt",
    title: { ar: "ما هو USDT؟", en: "What is USDT?" },
    excerpt: {
      ar: "مقدمة تعليمية عن USDT واستخداماته الشائعة.",
      en: "An educational introduction to USDT and common use cases.",
    },
    content: {
      ar: "USDT هو stablecoin مرتبط بالدولار الأمريكي في نظرية تصميمه. هذا المحتوى تعليمي فقط ولا يُعد نصيحة مالية.\n\nللخدمات المتعلقة بـ USDT، تواصل مع Flash Pay عبر القنوات الرسمية. التوفر يعتمد على الدولة وشبكة الشركاء.",
      en: "USDT is a stablecoin designed to track the US dollar in theory. This content is educational only and not financial advice.\n\nFor USDT-related services, contact Flash Pay through official channels. Availability depends on country and partner network.",
    },
    category: "usdt",
    author: "Flash Academy",
    status: "published",
    order: 1,
    isFeatured: true,
    showOnHome: true,
    publishedAt: TS,
    tags: ["usdt", "crypto", "education"],
    seoTitle: { ar: "ما هو USDT؟ | Flash Academy", en: "What is USDT? | Flash Academy" },
    seoDescription: {
      ar: "دليل تعليمي عن USDT.",
      en: "Educational guide to USDT.",
    },
  }),
  article({
    id: "art-transfer-method",
    slug: "choose-money-transfer-method",
    title: {
      ar: "كيف تختار طريقة التحويل المناسبة؟",
      en: "How to choose the right money transfer method?",
    },
    excerpt: {
      ar: "عوامل مهمة عند اختيار طريقة التحويل.",
      en: "Important factors when choosing a transfer method.",
    },
    content: {
      ar: "اختيار طريقة التحويل يعتمد على الدولة، العملة، السرعة، والتكلفة. Flash Pay تنسق الخدمات عبر شبكة شركاء — لا ندّعي وكالة مباشرة لشركات عالمية.",
      en: "Choosing a transfer method depends on country, currency, speed, and cost. Flash Pay coordinates services through a partner network — we do not claim direct agency for global companies.",
    },
    category: "money_transfers",
    author: "Flash Academy",
    status: "published",
    order: 2,
    isFeatured: true,
    publishedAt: TS,
    tags: ["transfers", "guide"],
    seoTitle: {
      ar: "اختيار طريقة التحويل",
      en: "Choose a transfer method",
    },
    seoDescription: {
      ar: "دليل تعليمي لاختيار التحويل.",
      en: "Educational guide to choosing transfers.",
    },
  }),
  article({
    id: "art-paypal-wise-payoneer",
    slug: "paypal-wise-payoneer-difference",
    title: {
      ar: "الفرق بين PayPal و Wise و Payoneer",
      en: "Difference between PayPal, Wise, and Payoneer",
    },
    excerpt: {
      ar: "مقارنة تعليمية — بدون ادعاء شراكة رسمية.",
      en: "Educational comparison — no official partnership claim.",
    },
    content: {
      ar: "كل منصة لها استخدامات مختلفة. Flash Pay لا تمثل هذه الشركات رسمياً. قد نساعد في تنسيق حلول سحب أو دفع حسب التوفر.",
      en: "Each platform has different use cases. Flash Pay does not officially represent these companies. We may help coordinate cash-out or payment solutions subject to availability.",
    },
    category: "digital_wallets",
    author: "Flash Academy",
    status: "published",
    order: 3,
    isFeatured: false,
    publishedAt: TS,
    tags: ["paypal", "wise", "payoneer"],
  }),
  article({
    id: "art-fake-accounts",
    slug: "protect-from-fake-accounts",
    title: {
      ar: "كيف تحمي نفسك من الحسابات المالية المزيفة؟",
      en: "How to protect yourself from fake financial accounts?",
    },
    excerpt: {
      ar: "نصائح أمان للتواصل مع Flash Pay.",
      en: "Safety tips for contacting Flash Pay.",
    },
    content: {
      ar: "تواصل فقط عبر القنوات الرسمية المنشورة في مركز الثقة. لا ترسل أموالًا لحسابات غير موثقة. تحقق من رقم WhatsApp والموقع قبل أي تحويل.",
      en: "Contact only through official channels published in Trust Center. Do not send money to unverified accounts. Verify WhatsApp number and website before any transfer.",
    },
    category: "fraud_protection",
    author: "Flash Academy",
    status: "published",
    order: 4,
    isFeatured: true,
    publishedAt: TS,
    tags: ["fraud", "safety", "trust"],
  }),
  article({
    id: "art-exchange-rates-traders",
    slug: "exchange-rates-for-traders",
    title: {
      ar: "فهم أسعار الصرف للتجار",
      en: "Understanding exchange rates for traders",
    },
    excerpt: {
      ar: "معلومات تعليمية — ليست أسعاراً مضمونة.",
      en: "Educational information — not guaranteed rates.",
    },
    content: {
      ar: "أسعار الصرف تتغير وتعتمد على السيولة والدولة والحجم. اطلب السعر عبر WhatsApp — السعر النهائي يُؤكَّد مباشرة حسب السوق والتوفر.",
      en: "Exchange rates change and depend on liquidity, country, and volume. Request a price via WhatsApp — the final price is confirmed directly based on market conditions and availability.",
    },
    category: "trading_basics",
    author: "Flash Academy",
    status: "published",
    order: 5,
    isFeatured: false,
    publishedAt: TS,
    tags: ["rates", "traders", "education"],
  }),
  article({
    id: "art-usd-egp-analysis",
    slug: "usd-egp-market-outlook",
    title: {
      ar: "نظرة Flash Pay على USD/EGP",
      en: "Flash Pay Outlook on USD/EGP",
    },
    excerpt: {
      ar: "ملاحظات معلوماتية — ليست نصيحة استثمارية.",
      en: "Informational notes — not investment advice.",
    },
    content: {
      ar: "هذا المحتوى لأغراض معلوماتية فقط. للأسعار التنفيذية، اطلب السعر عبر WhatsApp.",
      en: "This content is informational only. For execution rates, request a price via WhatsApp.",
    },
    category: "market_analysis",
    author: "Flash Pay Insights",
    status: "published",
    order: 6,
    isFeatured: true,
    publishedAt: TS,
    tags: ["forex", "usd-egp", "analysis"],
    seoTitle: { ar: "تحليل USD/EGP", en: "USD/EGP Outlook" },
    seoDescription: {
      ar: "معلومات تعليمية عن USD/EGP.",
      en: "Educational information on USD/EGP.",
    },
  }),
];

export const academyData: Article[] = articlesData;
