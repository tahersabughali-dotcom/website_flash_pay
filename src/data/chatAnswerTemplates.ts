import type { LocalizedString } from "@/types/common";

/** Safe answer templates — legally careful wording */
export const chatAnswerTemplates = {
  rateSafe: {
    ar: "السعر والعمولة يتم تأكيدهما عبر WhatsApp حسب الدولة، العملة، المبلغ، وطريقة الاستلام. يمكنك إرسال تفاصيل طلبك للحصول على السعر المناسب.",
    en: "Price and fees are confirmed via WhatsApp based on country, currency, amount, and receiving method. Send your request details for an accurate quote.",
  },
  timingSafe: {
    ar: "مدة التنفيذ تعتمد على الدولة، طريقة الدفع، طريقة الاستلام، والتغطية المتاحة. يمكن لفريق Flash Pay تأكيد الوقت المتوقع عبر WhatsApp.",
    en: "Execution time depends on country, payment method, receiving method, and available coverage. Flash Pay team can confirm expected timing via WhatsApp.",
  },
  licensingSafe: {
    ar: "تعمل Flash Pay من خلال خدمات مباشرة وشبكة شركاء ومكاتب معتمدة حيثما يتوفر ذلك. لا ندّعي وكالة مباشرة لأي جهة عالمية إلا إذا تم توضيح ذلك رسميًا.",
    en: "Flash Pay operates through direct services and a partner network with authorized offices where available. We do not claim direct agency for any global brand unless officially stated.",
  },
  investmentSafe: {
    ar: "معلومات الأسواق داخل Flash Pay معلوماتية فقط وليست نصيحة مالية أو استثمارية.",
    en: "Flash Markets information is indicative only and is not financial or investment advice.",
  },
  walletTradeSafe: {
    ar: "Flash Wallet و Flash Trade قيد التطوير وغير متاحين للتنفيذ الآن. لا توجد أرصدة أو تداول فعّال حاليًا. للمزيد: /wallet · /trade",
    en: "Flash Wallet and Flash Trade are under development and not available for execution yet. No active balances or trading. Learn more: /wallet · /trade",
  },
  whatsappOfficial: {
    ar: "للأسعار التنفيذية والتوفر، تواصل عبر WhatsApp الرسمي المنشور في مركز الثقة.",
    en: "For execution rates and availability, contact us via official WhatsApp published in Trust Center.",
  },
  fixedRateDeny: {
    ar: "لا يوجد سعر ثابت مضمون على الموقع. السعر النهائي يُؤكَّد مباشرة حسب السوق والتوفر.",
    en: "There is no guaranteed fixed rate on the website. Final price is confirmed directly based on market and availability.",
  },
  routeAvailability: {
    ar: "توفر المسار يعتمد على الدولة، المبلغ، العملة، وتغطية الشركاء — وليس مضمونًا لكل حالة.",
    en: "Route availability depends on country, amount, currency, and partner coverage — not guaranteed for every case.",
  },
  antiFraud: {
    ar: "لا ترسل أموالًا لحسابات غير موثقة. تحقق من WhatsApp الرسمي والموقع قبل أي تحويل.",
    en: "Do not send money to unverified accounts. Verify official WhatsApp and website before any transfer.",
  },
  outOfScope: {
    ar: "هذا الطلب خارج نطاق خدمات Flash Pay الحالية. للمساعدة في التحويلات أو USDT أو خدمات الشركات، ابدأ من /request أو تواصل عبر /contact.",
    en: "This request is outside Flash Pay's current services. For transfers, USDT, or business services, start at /request or contact us at /contact.",
  },
} as const satisfies Record<string, LocalizedString>;

export const chatActionLabels = {
  request: { ar: "مركز الطلبات (/request)", en: "Request Center (/request)" },
  route_finder: { ar: "مكتشف المسارات (/route-finder)", en: "Route Finder (/route-finder)" },
  whatsapp: { ar: "WhatsApp الرسمي", en: "Official WhatsApp" },
  contact: { ar: "صفحة التواصل (/contact)", en: "Contact page (/contact)" },
  services: { ar: "الخدمات (/services)", en: "Services (/services)" },
  countries: { ar: "الدول (/countries)", en: "Countries (/countries)" },
  markets: { ar: "الأسواق (/markets)", en: "Markets (/markets)" },
  trust: { ar: "مركز الثقة (/trust)", en: "Trust Center (/trust)" },
  academy: { ar: "الأكاديمية (/academy)", en: "Academy (/academy)" },
  business: { ar: "خدمات الشركات (/business)", en: "Business (/business)" },
  handoff: { ar: "التحدث مع موظف", en: "Talk to an agent" },
} as const;

export const chatNeededInfoLabels = {
  transfer: {
    ar: "للمساعدة نحتاج: الدولة، المبلغ، العملة، وطريقة الاستلام.",
    en: "To help we need: country, amount, currency, and receiving method.",
  },
  usdt: {
    ar: "لإعطائك سعرًا دقيقًا نحتاج: الدولة، المبلغ، طريقة الدفع، والشبكة TRC20 / ERC20 / BEP20.",
    en: "For an accurate quote we need: country, amount, payment method, and network TRC20 / ERC20 / BEP20.",
  },
  business: {
    ar: "للطلبات التجارية: الدولة، العملة، الحجم الشهري التقريبي، ونوع المورد/العميل.",
    en: "For business requests: country, currency, approximate monthly volume, and supplier/client type.",
  },
} as const satisfies Record<string, LocalizedString>;
