import type { LocalizedString } from "@/types/common";

/** Page-level content for listing and utility pages — edit here, not in components */
export const pageContentData = {
  services: {
    hero: {
      eyebrow: { ar: "الخدمات", en: "Services" },
      title: { ar: "خدمات Flash Pay", en: "Flash Pay Services" },
      subtitle: {
        ar: "خدمات عبر شبكة شركائنا — التوفر يعتمد على الدولة، العملة، وتغطية الشركاء.",
        en: "Services through our partner network — availability depends on country, currency, and partner coverage.",
      },
      ctaLabel: { ar: "ابدأ طلبًا", en: "Start a Request" },
      ctaHref: "/request",
    },
    bottomCta: {
      title: { ar: "لم تجد الخدمة المناسبة؟", en: "Didn't find the right service?" },
      description: {
        ar: "استخدم مركز الطلبات الذكي وسنساعدك في التوجيه.",
        en: "Use the Smart Request Center and we will guide you.",
      },
    },
    empty: {
      title: { ar: "لا توجد نتائج", en: "No results found" },
      description: {
        ar: "جرّب تغيير البحث أو الفئة.",
        en: "Try changing your search or category filter.",
      },
    },
  },
  countries: {
    hero: {
      eyebrow: { ar: "الدول", en: "Countries" },
      title: { ar: "مركز الدول", en: "Countries Hub" },
      subtitle: {
        ar: "استكشف الدول المدعومة، العملات، والخدمات المتاحة حسب التغطية.",
        en: "Explore supported countries, currencies, and available services by coverage.",
      },
      ctaLabel: { ar: "طلب خدمة لدولة", en: "Request Country Service" },
      ctaHref: "/request",
    },
    bottomCta: {
      title: { ar: "هل تحتاج خدمة في دولة معينة؟", en: "Need service in a specific country?" },
      description: {
        ar: "أرسل طلبك عبر WhatsApp الرسمي.",
        en: "Send your request via official WhatsApp.",
      },
    },
    empty: {
      title: { ar: "لا توجد نتائج", en: "No results found" },
      description: {
        ar: "جرّب تغيير البحث أو المنطقة.",
        en: "Try changing your search or region filter.",
      },
    },
    allRegionsLabel: { ar: "كل المناطق", en: "All Regions" },
  },
  request: {
    hero: {
      eyebrow: { ar: "مركز الطلبات", en: "Smart Request Center" },
      title: { ar: "مركز الطلبات الذكي", en: "Smart Request Center" },
      subtitle: {
        ar: "اختر نوع الخدمة وأرسل طلبك عبر WhatsApp الرسمي برسالة منظمة.",
        en: "Choose your service type and send a structured request via official WhatsApp.",
      },
    },
    step1: {
      title: { ar: "1. اختر نوع الطلب", en: "1. Choose request type" },
      subtitle: {
        ar: "التوفر يعتمد على الدولة، العملة، وشبكة الشركاء.",
        en: "Availability depends on country, currency, and partner network.",
      },
    },
    step2: {
      title: { ar: "2. أكمل تفاصيل الطلب", en: "2. Complete request details" },
    },
    selectPrompt: {
      ar: "يرجى اختيار نوع الطلب للمتابعة.",
      en: "Please select a request type to continue.",
    },
  },
  routeFinder: {
    hero: {
      eyebrow: { ar: "مكتشف المسارات", en: "Route Finder" },
      title: { ar: "مكتشف المسارات", en: "Flash Route Finder" },
      subtitle: {
        ar: "ابحث عن المسارات المتاحة بين الدول ثم اطلب السعر عبر WhatsApp.",
        en: "Find available routes between countries, then request a price via WhatsApp.",
      },
    },
    formLoading: {
      ar: "جاري تحميل نموذج البحث...",
      en: "Loading search form...",
    },
  },
} as const;

export interface ContactTopicOption {
  value: string;
  label: LocalizedString;
}

export const contactTopicsData: ContactTopicOption[] = [
  { value: "general", label: { ar: "استفسار عام", en: "General inquiry" } },
  { value: "service", label: { ar: "طلب خدمة", en: "Service request" } },
  { value: "business", label: { ar: "استفسار تجاري", en: "Business inquiry" } },
  { value: "partner", label: { ar: "استفسار شراكة", en: "Partner inquiry" } },
  { value: "trust", label: { ar: "ثقة / أمان", en: "Trust / safety" } },
];

export const marketSourceLabels = {
  "manual-indicative": { ar: "إرشادي / يدوي", en: "Manual / Indicative" },
} as const;

export const marketPriceModeLabels = {
  indicative: { ar: "إرشادي / معلوماتي فقط", en: "Indicative / informational only" },
  manual: { ar: "إرشادي / يدوي", en: "Manual / indicative" },
  unavailable: { ar: "غير متاح", en: "Unavailable" },
} as const;

export const marketCardLabels = {
  source: { ar: "المصدر", en: "Source" },
  lastUpdated: { ar: "آخر تحديث", en: "Last updated" },
  priceMode: { ar: "وضع السعر", en: "Price mode" },
  notLivePrice: {
    ar: "ليس سعرًا مباشرًا أو لحظيًا",
    en: "Not a live or real-time price",
  },
  requestPriceViaWhatsApp: {
    ar: "السعر يتم تأكيده عبر WhatsApp",
    en: "Price confirmed via WhatsApp",
  },
  requestExecutionPrice: {
    ar: "اطلب السعر عبر WhatsApp",
    en: "Request price via WhatsApp",
  },
} as const;

export const uiLabelsData = {
  startRequest: { ar: "ابدأ طلبًا", en: "Start a Request" },
  loading: { ar: "جاري التحميل...", en: "Loading..." },
  trustCenter: { ar: "مركز الثقة", en: "Trust Center" },
  search: { ar: "بحث", en: "Search" },
  searchArticles: { ar: "بحث في المقالات", en: "Search articles" },
  searchPlaceholder: { ar: "بحث...", en: "Search..." },
  searchServices: { ar: "ابحث عن خدمة...", en: "Search services..." },
  category: { ar: "الفئة", en: "Category" },
  comingSoon: { ar: "قريباً", en: "Coming Soon" },
  soon: { ar: "قريباً", en: "Soon" },
  menu: { ar: "القائمة", en: "Menu" },
  close: { ar: "إغلاق", en: "Close" },
  indicativeOnly: {
    ar: "إرشادي / معلوماتي فقط",
    en: "Indicative / informational only",
  },
} as const;
