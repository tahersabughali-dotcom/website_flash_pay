import type { LocalizedString } from "@/types/common";

export interface BusinessOffering {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  status: "active" | "hidden" | "coming_soon";
  order: number;
}

export const businessData: BusinessOffering[] = [
  {
    id: "biz-transfers",
    slug: "business-transfers",
    title: { ar: "تحويلات تجارية", en: "Business Transfers" },
    description: {
      ar: "تحويلات بأحجام كبيرة للشركات والتجار.",
      en: "High-volume transfers for companies and traders.",
    },
    status: "active",
    order: 1,
  },
  {
    id: "biz-supplier",
    slug: "supplier-payments",
    title: { ar: "مدفوعات الموردين", en: "Supplier Payments" },
    description: {
      ar: "دفع موردين في الصين وتركيا وغيرها.",
      en: "Pay suppliers in China, Turkey, and beyond.",
    },
    status: "active",
    order: 2,
  },
  {
    id: "biz-liquidity",
    slug: "high-volume-liquidity",
    title: { ar: "سيولة بأحجام كبيرة", en: "High-Volume Liquidity" },
    description: {
      ar: "USD وCNY وTRY وUSDT — حسب التوفر.",
      en: "USD, CNY, TRY, and USDT — subject to availability.",
    },
    status: "active",
    order: 3,
  },
  {
    id: "biz-bulk-rates",
    slug: "bulk-rates",
    title: { ar: "أسعار بالجملة", en: "Bulk Rates" },
    description: {
      ar: "أسعار خاصة للأحجام الكبيرة — تُؤكد مباشرة.",
      en: "Special rates for high volumes — confirmed directly.",
    },
    status: "active",
    order: 4,
  },
  {
    id: "biz-account-manager",
    slug: "dedicated-account-manager",
    title: { ar: "مدير حساب مخصص", en: "Dedicated Account Manager" },
    description: {
      ar: "دعم premium للعملاء التجاريين.",
      en: "Premium support for business clients.",
    },
    status: "active",
    order: 5,
  },
];
