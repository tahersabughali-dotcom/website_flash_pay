import type { PaymentMethodDefinition } from "@/types/payment";

export type { PaymentMethodDefinition };

export const paymentMethodsData: PaymentMethodDefinition[] = [
  { id: "pm-cash", slug: "cash", title: { ar: "نقداً", en: "Cash" }, status: "active", order: 1 },
  { id: "pm-bank", slug: "bank-transfer", title: { ar: "تحويل بنكي", en: "Bank Transfer" }, status: "active", order: 2 },
  { id: "pm-wallet", slug: "electronic-wallet", title: { ar: "محفظة إلكترونية", en: "Electronic Wallet" }, status: "active", order: 3 },
  { id: "pm-usdt-trc20", slug: "usdt-trc20", title: { ar: "USDT TRC20", en: "USDT TRC20" }, status: "active", order: 4 },
  { id: "pm-usdt-erc20", slug: "usdt-erc20", title: { ar: "USDT ERC20", en: "USDT ERC20" }, status: "active", order: 5 },
  { id: "pm-usdt-bep20", slug: "usdt-bep20", title: { ar: "USDT BEP20", en: "USDT BEP20" }, status: "active", order: 6 },
  { id: "pm-paypal", slug: "paypal", title: { ar: "PayPal", en: "PayPal" }, status: "active", order: 7 },
  { id: "pm-wise", slug: "wise", title: { ar: "Wise", en: "Wise" }, status: "active", order: 8 },
  { id: "pm-payoneer", slug: "payoneer", title: { ar: "Payoneer", en: "Payoneer" }, status: "active", order: 9 },
  { id: "pm-partner-office", slug: "partner-office", title: { ar: "مكتب شريك", en: "Partner Office" }, status: "active", order: 10 },
  { id: "pm-auth-partner", slug: "authorized-partner-office", title: { ar: "مكتب شريك معتمد", en: "Authorized Partner Office" }, status: "active", order: 11 },
  { id: "pm-service-point", slug: "service-point", title: { ar: "نقطة خدمة", en: "Service Point" }, status: "active", order: 12 },
];
