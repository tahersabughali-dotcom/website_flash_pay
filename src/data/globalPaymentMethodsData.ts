import type { GlobalPaymentMethod } from "@/types/payment";

const availabilityDefault = {
  ar: "تختلف طرق الدفع حسب الدولة، العملة، المبلغ، وشبكة الشركاء.",
  en: "Payment methods vary by country, currency, amount, and partner network.",
};

function pm(
  slug: string,
  title: { ar: string; en: string },
  description: { ar: string; en: string },
  category: GlobalPaymentMethod["category"],
  icon: string,
  order: number,
  options?: Partial<GlobalPaymentMethod>,
): GlobalPaymentMethod {
  return {
    id: `gpm-${slug}`,
    slug,
    title,
    description,
    category,
    iconImage: `/icons/payments/${icon}.svg`,
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

export const globalPaymentMethodsData: GlobalPaymentMethod[] = [
  pm("cash", { ar: "نقد", en: "Cash" }, { ar: "دفع نقدي حسب التغطية المحلية.", en: "Cash payment where local coverage allows." }, "cash", "cash", 1, { status: "active", isFeatured: true }),
  pm("bank-transfer", { ar: "تحويل بنكي", en: "Bank Transfer" }, { ar: "تحويل بنكي محلي أو دولي عبر شركاء.", en: "Local or international bank transfer via partners." }, "bank", "bank", 2, { status: "active", isFeatured: true }),
  pm("local-bank-deposit", { ar: "إيداع بنكي محلي", en: "Local Bank Deposit" }, { ar: "إيداع في حساب بنكي محلي عند التوفر.", en: "Deposit to a local bank account when available." }, "bank", "bank", 3),
  pm("mobile-wallet", { ar: "محفظة mobile", en: "Mobile Wallet" }, { ar: "محافظ mobile حسب الدولة.", en: "Mobile wallets by country." }, "mobile_wallet", "mobile-wallet", 4, { status: "partner_network" }),
  pm("electronic-wallet", { ar: "محفظة إلكترونية", en: "Electronic Wallet" }, { ar: "محافظ إلكترونية معتمدة حسب المنطقة.", en: "Electronic wallets supported by region." }, "ewallet", "ewallet", 5, { status: "active" }),
  pm("usdt-trc20", { ar: "USDT TRC20", en: "USDT TRC20" }, { ar: "شراء/بيع USDT عبر شبكة TRC20.", en: "Buy/sell USDT via TRC20 network." }, "usdt", "usdt", 6, { status: "active", isFeatured: true, relatedCurrencies: ["USDT"] }),
  pm("usdt-erc20", { ar: "USDT ERC20", en: "USDT ERC20" }, { ar: "شراء/بيع USDT عبر شبكة ERC20.", en: "Buy/sell USDT via ERC20 network." }, "usdt", "usdt", 7, { status: "active", relatedCurrencies: ["USDT"] }),
  pm("usdt-bep20", { ar: "USDT BEP20", en: "USDT BEP20" }, { ar: "شراء/بيع USDT عبر شبكة BEP20.", en: "Buy/sell USDT via BEP20 network." }, "usdt", "usdt", 8, { status: "active", relatedCurrencies: ["USDT"] }),
  pm("paypal", { ar: "PayPal", en: "PayPal" }, { ar: "تنسيق سحب/دفع عبر PayPal — بدون ادعاء وكالة رسمية.", en: "PayPal cash-out coordination — no official agency claim." }, "digital_platform", "platform", 9, { status: "partner_network" }),
  pm("wise", { ar: "Wise", en: "Wise" }, { ar: "تنسيق سحب Wise — بدون ادعاء وكالة رسمية.", en: "Wise cash-out coordination — no official agency claim." }, "digital_platform", "platform", 10, { status: "partner_network" }),
  pm("payoneer", { ar: "Payoneer", en: "Payoneer" }, { ar: "تنسيق سحب Payoneer — بدون ادعاء وكالة رسمية.", en: "Payoneer cash-out coordination — no official agency claim." }, "digital_platform", "platform", 11, { status: "partner_network" }),
  pm("stripe", { ar: "Stripe", en: "Stripe" }, { ar: "دعم تجاري لـ Stripe حيث يتوفر — بدون ادعاء شراكة رسمية.", en: "Business Stripe support where available — no official partnership claim." }, "digital_platform", "platform", 12, { status: "available_by_request" }),
  pm("card-payment", { ar: "دفع بالبطاقة", en: "Card Payment" }, { ar: "بطاقات debit/credit حسب التغطية.", en: "Debit/credit cards by coverage." }, "card", "card", 13),
  pm("partner-office", { ar: "مكتب شريك", en: "Partner Office" }, { ar: "دفع عبر مكاتب شركاء Flash Pay.", en: "Payment via Flash Pay partner offices." }, "partner", "partner-office", 14, { status: "active", isFeatured: true }),
  pm("authorized-partner-office", { ar: "مكتب شريك معتمد حيث يتوفر", en: "Authorized Partner Office Where Available" }, { ar: "مكاتب شركاء معتمدة حسب المنطقة — بدون ادعاء وكالة عالمية.", en: "Authorized partner offices by region — no global agency claim." }, "partner", "partner-office", 15, { status: "partner_network" }),
  pm("service-point", { ar: "نقطة خدمة / وكيل", en: "Agent / Service Point" }, { ar: "نقاط خدمة محلية عبر شبكة الشركاء.", en: "Local service points via partner network." }, "partner", "partner-office", 16, { status: "partner_network" }),
  pm("western-union-coordination", { ar: "تنسيق Western Union", en: "Western Union Coordination" }, { ar: "تنسيق عبر شبكة شركاء — Flash Pay ليست وكيل Western Union رسمي.", en: "Coordination via partners — Flash Pay is not an official Western Union agent." }, "coordination", "platform", 17, { status: "partner_network", availabilityNote: { ar: "تنسيق فقط — ليس وكالة رسمية.", en: "Coordination only — not an official agency." } }),
  pm("moneygram-coordination", { ar: "تنسيق MoneyGram", en: "MoneyGram Coordination" }, { ar: "تنسيق عبر شبكة شركاء — بدون ادعاء وكالة MoneyGram.", en: "Partner coordination — no MoneyGram agency claim." }, "coordination", "platform", 18, { status: "partner_network" }),
  pm("ria-coordination", { ar: "تنسيق RIA", en: "RIA Coordination" }, { ar: "تنسيق عبر شبكة شركاء — بدون ادعاء وكالة RIA.", en: "Partner coordination — no RIA agency claim." }, "coordination", "platform", 19, { status: "partner_network" }),
  pm("instapay", { ar: "InstaPay", en: "InstaPay" }, { ar: "InstaPay في مصر حسب التغطية.", en: "InstaPay in Egypt by coverage." }, "local", "mobile-wallet", 20, { relatedCountries: ["EG"] }),
  pm("vodafone-cash", { ar: "Vodafone Cash", en: "Vodafone Cash" }, { ar: "Vodafone Cash في مصر حسب التغطية.", en: "Vodafone Cash in Egypt by coverage." }, "local", "mobile-wallet", 21, { relatedCountries: ["EG"] }),
  pm("orange-money", { ar: "Orange Money", en: "Orange Money" }, { ar: "Orange Money حسب الدولة.", en: "Orange Money by country." }, "local", "mobile-wallet", 22),
  pm("zain-cash", { ar: "Zain Cash", en: "Zain Cash" }, { ar: "Zain Cash في الأردن/العراق حسب التغطية.", en: "Zain Cash in Jordan/Iraq by coverage." }, "local", "mobile-wallet", 23),
  pm("click", { ar: "Click", en: "Click" }, { ar: "Click في الأردن حسب التغطية.", en: "Click in Jordan by coverage." }, "local", "mobile-wallet", 24, { relatedCountries: ["JO"] }),
  pm("poste-algerie", { ar: "Poste d'Algérie", en: "Poste d'Algérie" }, { ar: "خدمات بريد الجزائر حسب التنسيق المحلي.", en: "Algeria Post services by local coordination." }, "local", "bank", 25, { relatedCountries: ["DZ"] }),
  pm("sham-accounts", { ar: "حسابات شام / تنسيق محلي", en: "Sham Accounts / Local Coordination" }, { ar: "تنسيق محلي في بلاد الشام حسب التغطية.", en: "Levant local coordination by coverage." }, "local", "bank", 26),
  pm("business-bank-transfer", { ar: "تحويل تجاري بنكي", en: "Business Bank Transfer" }, { ar: "تحويلات B2B عبر شركاء.", en: "B2B transfers via partners." }, "business", "business", 27, { status: "active", isFeatured: true }),
  pm("supplier-payment", { ar: "دفع مورد", en: "Supplier Payment" }, { ar: "دفع موردين في الصين وغيرها.", en: "Supplier payments in China and beyond." }, "business", "supplier", 28, { status: "active", isFeatured: true }),
  pm("bulk-settlement", { ar: "تسوية جملة", en: "Bulk Settlement" }, { ar: "تسويات حجم كبير للشركات.", en: "High-volume business settlements." }, "business", "business", 29, { status: "available_by_request" }),
];

export const GLOBAL_PAYMENT_METHOD_COUNT = globalPaymentMethodsData.length;
