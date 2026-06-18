import type { LocalizedString } from "@/types/common";

/**
 * Homepage section content — edit titles, subtitles, and CTAs here.
 * PRE-LAUNCH: review hero and bottom CTA wording in settingsData + homepageData together.
 */
export interface HomepageSection {
  id: string;
  slug: string;
  title: LocalizedString;
  status: "active" | "hidden" | "coming_soon";
  order: number;
}

export interface HomeSectionConfig {
  title: LocalizedString;
  subtitle: LocalizedString;
  actionLabel?: LocalizedString;
  actionHref?: string;
  secondaryActionLabel?: LocalizedString;
  secondaryActionHref?: string;
}

export const homepageData = {
  hero: {
    eyebrow: {
      ar: "منصة مالية عالمية",
      en: "Global financial platform",
    },
    title: {
      ar: "منصة Flash Pay المالية العالمية",
      en: "Flash Pay Global Platform",
    },
    subtitle: {
      ar: "حلول مالية عالمية للتحويلات، USDT، الأعمال، الأسواق، والسيولة الرقمية — عبر شبكة شركاء موثوقة.",
      en: "Global financial solutions for transfers, USDT, business payments, markets, and digital liquidity — through a trusted partner network.",
    },
    primaryCta: {
      label: { ar: "ابدأ طلبًا", en: "Start a Request" },
      href: "/request",
    },
    secondaryCta: {
      label: { ar: "استكشف الخدمات", en: "Explore Services" },
      href: "/services",
    },
  },
  sections: {
    smartActions: {
      title: { ar: "ماذا تريد أن تفعل اليوم؟", en: "What do you want to do today?" },
      subtitle: {
        ar: "اختر احتياجك — سنوجّهك إلى الطلب المناسب عبر القنوات الرسمية.",
        en: "Choose your need — we will guide you to the right request through official channels.",
      },
      actionLabel: { ar: "مركز الطلبات", en: "Request Center" },
      actionHref: "/request",
    },
    services: {
      title: { ar: "خدمات Flash Pay", en: "Flash Pay Services" },
      subtitle: {
        ar: "خدمات منسّقة عبر شبكة شركائنا — التوفر يعتمد على الدولة والتغطية.",
        en: "Services coordinated through our partner network — availability depends on country and coverage.",
      },
      actionLabel: { ar: "كل الخدمات", en: "All Services" },
      actionHref: "/services",
    },
    routeFinder: {
      title: { ar: "مكتشف المسارات | Flash Route Finder", en: "Flash Route Finder" },
      subtitle: {
        ar: "ابحث عن مسارات مالية متاحة بين الدول — ثم اطلب سعرًا عبر WhatsApp.",
        en: "Find available financial routes between countries — then request a rate via WhatsApp.",
      },
      actionLabel: { ar: "افتح مكتشف المسارات", en: "Open Route Finder" },
      actionHref: "/route-finder",
    },
    markets: {
      title: { ar: "Flash Markets | لوحة الأسواق", en: "Flash Markets" },
      subtitle: {
        ar: "معلومات إرشادية فقط — ليست أسعارًا تنفيذية أو لحظية.",
        en: "Indicative information only — not execution or real-time prices.",
      },
      actionLabel: { ar: "لوحة الأسواق", en: "Market Dashboard" },
      actionHref: "/markets",
    },
    business: {
      title: { ar: "Flash Business Class | حلول الأعمال", en: "Flash Business Class" },
      subtitle: {
        ar: "حلول متميزة للتجار والشركات — التوفر يعتمد على الدولة والحجم وشبكة الشركاء.",
        en: "Premium solutions for traders and companies — availability depends on country, volume, and partner network.",
      },
      actionLabel: { ar: "حلول الأعمال", en: "Business Class" },
      actionHref: "/business",
    },
    network: {
      title: { ar: "شبكة Flash Pay", en: "Flash Pay Network" },
      subtitle: {
        ar: "تعمل Flash Pay من خلال شبكة واسعة من المكاتب الشريكة ونقاط الخدمة.",
        en: "Flash Pay operates through a wide network of partner offices and service points.",
      },
      actionLabel: { ar: "استكشف الشبكة", en: "Explore Network" },
      actionHref: "/network",
      secondaryActionLabel: { ar: "كن شريكًا", en: "Become a Partner" },
      secondaryActionHref: "/partners",
    },
    countries: {
      title: { ar: "تغطية الدول", en: "Country Coverage" },
      subtitle: {
        ar: "خدمات وتغطية حسب الدولة — التوفر يختلف حسب الشريك والعملة.",
        en: "Services and coverage by country — availability varies by partner and currency.",
      },
      actionLabel: { ar: "كل الدول", en: "All Countries" },
      actionHref: "/countries",
    },
    academy: {
      title: { ar: "Flash Academy | الأكاديمية", en: "Flash Academy" },
      subtitle: {
        ar: "محتوى تعليمي عن التحويلات، USDT، الأمان، والأسواق — لأغراض معلوماتية.",
        en: "Educational content on transfers, USDT, safety, and markets — for informational purposes.",
      },
      actionLabel: { ar: "الأكاديمية", en: "Flash Academy" },
      actionHref: "/academy",
    },
    trust: {
      title: { ar: "مركز الثقة", en: "Trust Center" },
      subtitle: {
        ar: "الأمان، الشفافية، والقنوات الرسمية.",
        en: "Safety, transparency, and official channels.",
      },
      actionLabel: { ar: "مركز الثقة", en: "Trust Center" },
      actionHref: "/trust",
    },
    future: {
      title: { ar: "مستقبل المنصة", en: "Platform Future" },
      subtitle: {
        ar: "ميزات قيد التطوير — ليست خدمات فعّالة حاليًا.",
        en: "Features under development — not active services yet.",
      },
    },
    bottomCta: {
      title: {
        ar: "هل تحتاج سعرًا أو مساعدة؟",
        en: "Need a rate or assistance?",
      },
      subtitle: {
        ar: "تواصل معنا عبر WhatsApp الرسمي. لا أسعار مضمونة على الموقع.",
        en: "Contact us via official WhatsApp. No guaranteed rates on the website.",
      },
    },
  } satisfies Record<string, HomeSectionConfig | { title: LocalizedString; subtitle: LocalizedString }>,
  sectionRegistry: [] as HomepageSection[],
  footer: {
    tagline: {
      ar: "منصة مالية عالمية — خدمات عبر شبكة شركاء موثوقة.",
      en: "Global financial platform — services through a trusted partner network.",
    },
    safetyNotice: {
      ar: "Flash Pay لا تدّعي تراخيص أو وكالات مباشرة لشركات عالمية ما لم يُؤكَّد ذلك قانونيًا. تواصل فقط عبر القنوات الرسمية.",
      en: "Flash Pay does not claim licenses or direct agency for global companies unless legally confirmed. Contact only through official channels.",
    },
  },
};
