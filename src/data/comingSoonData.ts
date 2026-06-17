import type { LocalizedString } from "@/types/common";

export interface ComingSoonConcept {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
}

export interface ComingSoonFeature {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  route: string;
  status: "coming_soon";
  order: number;
  concepts?: ComingSoonConcept[];
  regulatoryNote?: LocalizedString;
  underDevelopmentLabel?: LocalizedString;
}

export const comingSoonData: ComingSoonFeature[] = [
  {
    id: "cs-wallet",
    slug: "flash-wallet",
    title: { ar: "Flash Wallet", en: "Flash Wallet" },
    description: {
      ar: "محفظة USDT ومتعددة العملات — قيد التطوير. لا توجد أرصدة فعّالة.",
      en: "USDT and multi-currency wallet — under development. No active balances.",
    },
    route: "/wallet",
    status: "coming_soon",
    order: 1,
    underDevelopmentLabel: {
      ar: "قيد التطوير",
      en: "Under Development",
    },
    concepts: [
      {
        id: "wallet-usdt",
        title: { ar: "محفظة USDT", en: "USDT wallet" },
        description: {
          ar: "مفهوم مستقبلي لحفظ USDT — بدون أرصدة فعّالة حالياً.",
          en: "Future concept for USDT storage — no active balances now.",
        },
      },
      {
        id: "wallet-multi",
        title: { ar: "رصيد متعدد العملات", en: "Multi-currency balance" },
        description: {
          ar: "عرض أرصدة متعددة — قيد التخطيط فقط.",
          en: "Multi-currency balance view — planning stage only.",
        },
      },
      {
        id: "wallet-qr",
        title: { ar: "استلام QR", en: "QR receive" },
        description: {
          ar: "استلام عبر QR — ميزة مستقبلية.",
          en: "QR-based receive — future feature.",
        },
      },
      {
        id: "wallet-internal",
        title: { ar: "تحويلات داخلية", en: "Internal transfers" },
        description: {
          ar: "تحويلات بين مستخدمي المنصة — قيد التطوير.",
          en: "Transfers between platform users — under development.",
        },
      },
      {
        id: "wallet-history",
        title: { ar: "سجل المعاملات", en: "Transaction history" },
        description: {
          ar: "سجل معاملات مستقبلي — غير متاح حالياً.",
          en: "Future transaction history — not available yet.",
        },
      },
      {
        id: "wallet-security",
        title: { ar: "طبقات أمان", en: "Security layers" },
        description: {
          ar: "أمان متقدم مخطط — بدون تنفيذ فعلي بعد.",
          en: "Advanced security planned — not implemented yet.",
        },
      },
    ],
  },
  {
    id: "cs-trade",
    slug: "flash-trade",
    title: { ar: "Flash Trade", en: "Flash Trade" },
    description: {
      ar: "تداول مستقبلي — قد يتطلب إعداداً تنظيمياً. لا تداول فعّال حالياً.",
      en: "Future trading — may require regulatory preparation. No active trading now.",
    },
    route: "/trade",
    status: "coming_soon",
    order: 2,
    underDevelopmentLabel: {
      ar: "قيد التطوير",
      en: "Under Development",
    },
    regulatoryNote: {
      ar: "قد تتطلب هذه الخدمة إعداداً قانونياً وتنظيمياً قبل الإطلاق.",
      en: "This service may require legal and regulatory preparation before launch.",
    },
    concepts: [
      {
        id: "trade-forex",
        title: { ar: "Forex", en: "Forex" },
        description: {
          ar: "مفهوم تداول عملات — غير متاح للتنفيذ.",
          en: "Forex trading concept — not available for execution.",
        },
      },
      {
        id: "trade-crypto",
        title: { ar: "Crypto", en: "Crypto" },
        description: {
          ar: "مفهوم تداول crypto — قيد التخطيط.",
          en: "Crypto trading concept — in planning.",
        },
      },
      {
        id: "trade-gold",
        title: { ar: "Gold", en: "Gold" },
        description: {
          ar: "مفهوم تداول الذهب — مستقبلي.",
          en: "Gold trading concept — future.",
        },
      },
      {
        id: "trade-indices",
        title: { ar: "Indices", en: "Indices" },
        description: {
          ar: "مؤشرات — للعرض التعليمي المستقبلي فقط.",
          en: "Indices — for future educational display only.",
        },
      },
      {
        id: "trade-charts",
        title: { ar: "Charts", en: "Charts" },
        description: {
          ar: "رسوم بيانية — بدون تنفيذ تداول.",
          en: "Charts — without trading execution.",
        },
      },
      {
        id: "trade-demo",
        title: { ar: "Demo account", en: "Demo account" },
        description: {
          ar: "حساب تجريبي محتمل — غير متاح.",
          en: "Potential demo account — not available.",
        },
      },
      {
        id: "trade-education",
        title: { ar: "Education tools", en: "Education tools" },
        description: {
          ar: "أدوات تعليمية — ليست نصيحة استثمارية.",
          en: "Education tools — not investment advice.",
        },
      },
    ],
  },
  {
    id: "cs-app",
    slug: "flash-app",
    title: { ar: "Flash App", en: "Flash App" },
    description: {
      ar: "تطبيق جوال للمنصة — قريباً.",
      en: "Mobile app for the platform — coming soon.",
    },
    route: "/contact",
    status: "coming_soon",
    order: 3,
  },
  {
    id: "cs-partner-portal",
    slug: "partner-portal",
    title: { ar: "بوابة الشركاء", en: "Partner Portal" },
    description: {
      ar: "لوحة شركاء مستقبلية لإدارة الطلبات والأسعار.",
      en: "Future partner dashboard for requests and rates.",
    },
    route: "/partners",
    status: "coming_soon",
    order: 4,
  },
  {
    id: "cs-client-area",
    slug: "client-area",
    title: { ar: "منطقة العملاء", en: "Client Area" },
    description: {
      ar: "حساب عميل مستقبلي لتتبع الطلبات.",
      en: "Future client account to track requests.",
    },
    route: "/contact",
    status: "coming_soon",
    order: 5,
  },
  {
    id: "cs-admin",
    slug: "admin-dashboard",
    title: { ar: "لوحة الإدارة", en: "Admin Dashboard" },
    description: {
      ar: "لوحة تحكم مستقبلية لإدارة المحتوى والطلبات.",
      en: "Future admin dashboard for content and requests.",
    },
    route: "/contact",
    status: "coming_soon",
    order: 6,
  },
];
