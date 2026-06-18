import type { GlobalReceivingMethod } from "@/types/payment";

const availabilityDefault = {
  ar: "تختلف طرق الاستلام حسب الدولة، العملة، المبلغ، وشبكة الشركاء.",
  en: "Receiving methods vary by country, currency, amount, and partner network.",
};

function rm(
  slug: string,
  title: { ar: string; en: string },
  description: { ar: string; en: string },
  category: GlobalReceivingMethod["category"],
  icon: string,
  order: number,
  options?: Partial<GlobalReceivingMethod>,
): GlobalReceivingMethod {
  return {
    id: `grm-${slug}`,
    slug,
    title,
    description,
    category,
    iconImage: `/icons/receiving/${icon}.svg`,
    status: options?.status ?? "available_by_request",
    availabilityNote: options?.availabilityNote ?? availabilityDefault,
    requiresConfirmation: options?.requiresConfirmation ?? true,
    isFeatured: options?.isFeatured ?? false,
    order,
    relatedCountries: options?.relatedCountries ?? [],
    relatedCurrencies: options?.relatedCurrencies ?? [],
    ...options,
  };
}

export const globalReceivingMethodsData: GlobalReceivingMethod[] = [
  rm("cash-pickup", { ar: "استلام نقد", en: "Cash Pickup" }, { ar: "استلام نقد من نقطة أو مكتب.", en: "Cash pickup from a point or office." }, "cash", "cash-pickup", 1, { status: "active", isFeatured: true }),
  rm("cash-delivery", { ar: "تسليم كاش", en: "Cash Delivery" }, { ar: "تسليم نقد حسب التغطية.", en: "Cash delivery by coverage." }, "cash", "cash-delivery", 2, { status: "partner_network", isFeatured: true }),
  rm("cash", { ar: "نقد", en: "Cash" }, { ar: "استلام نقدي عام.", en: "General cash receiving." }, "cash", "cash-pickup", 3, { status: "active" }),
  rm("bank-transfer", { ar: "تحويل بنكي", en: "Bank Transfer" }, { ar: "استلام عبر حساب بنكي.", en: "Receive via bank account." }, "bank", "bank-transfer", 4, { status: "active", isFeatured: true }),
  rm("mobile-wallet", { ar: "محفظة mobile", en: "Mobile Wallet" }, { ar: "استلام عبر محفظة mobile.", en: "Receive via mobile wallet." }, "mobile_wallet", "wallet", 5, { status: "partner_network" }),
  rm("electronic-wallet", { ar: "محفظة إلكترونية", en: "Electronic Wallet" }, { ar: "استلام عبر محفظة إلكترونية.", en: "Receive via e-wallet." }, "ewallet", "wallet", 6, { status: "active" }),
  rm("usdt-trc20", { ar: "USDT TRC20", en: "USDT TRC20" }, { ar: "استلام USDT على TRC20.", en: "Receive USDT on TRC20." }, "usdt", "usdt-wallet", 7, { status: "active", relatedCurrencies: ["USDT"] }),
  rm("usdt-erc20", { ar: "USDT ERC20", en: "USDT ERC20" }, { ar: "استلام USDT على ERC20.", en: "Receive USDT on ERC20." }, "usdt", "usdt-wallet", 8, { status: "active", relatedCurrencies: ["USDT"] }),
  rm("usdt-bep20", { ar: "USDT BEP20", en: "USDT BEP20" }, { ar: "استلام USDT على BEP20.", en: "Receive USDT on BEP20." }, "usdt", "usdt-wallet", 9, { status: "active", relatedCurrencies: ["USDT"] }),
  rm("usdt-wallet", { ar: "محفظة USDT", en: "USDT Wallet" }, { ar: "استلام USDT على الشبكة المتفق عليها.", en: "Receive USDT on agreed network." }, "usdt", "usdt-wallet", 10, { status: "active", isFeatured: true }),
  rm("partner-office", { ar: "استلام من مكتب شريك", en: "Partner Office Pickup" }, { ar: "استلام من مكتب شريك Flash Pay.", en: "Pickup from Flash Pay partner office." }, "partner", "partner-pickup", 11, { status: "active" }),
  rm("authorized-partner-office", { ar: "مكتب شريك معتمد حيث يتوفر", en: "Authorized Partner Office Where Available" }, { ar: "استلام من مكاتب معتمدة حسب المنطقة.", en: "Pickup from authorized offices by region." }, "partner", "partner-pickup", 12, { status: "partner_network" }),
  rm("supplier-payment", { ar: "دفع مورد", en: "Supplier Payment" }, { ar: "استلام/دفع موردين تجاري.", en: "Business supplier payment receiving." }, "business", "default", 13, { status: "active" }),
  rm("business-settlement", { ar: "تسوية تجارية", en: "Business Settlement" }, { ar: "تسويات B2B للشركات.", en: "B2B business settlements." }, "business", "default", 14, { status: "available_by_request" }),
  rm("platform-cash-out", { ar: "سحب منصة", en: "Platform Cash-Out" }, { ar: "سحب من PayPal/Wise/Payoneer وغيرها — تنسيق فقط.", en: "PayPal/Wise/Payoneer cash-out — coordination only." }, "digital_platform", "wallet", 15, { status: "partner_network", isFeatured: true }),
];

export const GLOBAL_RECEIVING_METHOD_COUNT = globalReceivingMethodsData.length;
