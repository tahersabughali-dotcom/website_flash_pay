import type { Metadata } from "next";
import type { LanguageCode, LocalizedString } from "@/types/common";
import type { Article } from "@/types/article";
import type { Country } from "@/types/country";
import type { Service } from "@/types/service";
import type { PlatformSettings } from "@/types/settings";
import { getLocalized } from "./i18n";
import { absoluteUrl, getWebsiteUrl } from "./siteUrl";

export interface PageSeoInput {
  title?: LocalizedString;
  description?: LocalizedString;
  path?: string;
  lang?: LanguageCode;
  keywords?: string[];
}

export function buildPageMetadata(
  settings: PlatformSettings,
  input: PageSeoInput = {},
): Metadata {
  const lang = input.lang ?? settings.defaultLanguage;
  const title =
    getLocalized(input.title, lang) ||
    getLocalized(settings.seoDefaults.title, lang);
  const description =
    getLocalized(input.description, lang) ||
    getLocalized(settings.seoDefaults.description, lang);
  const siteUrl = getWebsiteUrl();
  const canonical = input.path ? absoluteUrl(input.path) : `${siteUrl}/`;
  const ogImagePath = settings.seoDefaults.ogImage;
  const ogImageUrl = ogImagePath.startsWith("http")
    ? ogImagePath
    : absoluteUrl(ogImagePath);

  return {
    title,
    description,
    keywords: input.keywords ?? settings.seoDefaults.keywords,
    metadataBase: new URL(siteUrl),
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: settings.brandName,
      images: [
        {
          url: ogImageUrl,
          alt: `${settings.brandName} — ${getLocalized(settings.platformName, lang)}`,
        },
      ],
      locale: lang === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export function buildServiceMetadata(
  service: Service,
  settings: PlatformSettings,
  lang?: LanguageCode,
): Metadata {
  const language = lang ?? settings.defaultLanguage;

  return buildPageMetadata(settings, {
    lang: language,
    path: `/services/${service.slug}`,
    title:
      service.seoTitle ??
      service.title,
    description:
      service.seoDescription ??
      service.shortDescription,
    keywords: service.tags,
  });
}

export function buildCountryMetadata(
  country: Country,
  settings: PlatformSettings,
  lang?: LanguageCode,
): Metadata {
  const language = lang ?? settings.defaultLanguage;

  return buildPageMetadata(settings, {
    lang: language,
    path: `/countries/${country.slug}`,
    title:
      country.seoTitle ??
      country.name,
    description:
      country.seoDescription ??
      country.partnerCoverage,
  });
}

export function buildArticleMetadata(
  article: Article,
  settings: PlatformSettings,
  lang?: LanguageCode,
): Metadata {
  const language = lang ?? settings.defaultLanguage;

  return buildPageMetadata(settings, {
    lang: language,
    path: `/academy/${article.slug}`,
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.excerpt,
    keywords: article.tags,
  });
}

export const staticPageSeo = {
  routeFinder: {
    title: {
      ar: "Flash Route Finder | Flash Pay",
      en: "Flash Route Finder | Flash Pay",
    },
    description: {
      ar: "ابحث عن مسارات مالية متاحة بين الدول واطلب سعراً حياً عبر WhatsApp.",
      en: "Find available financial routes between countries and request a live rate via WhatsApp.",
    },
    path: "/route-finder",
  },
  trust: {
    title: {
      ar: "Trust Center | Flash Pay",
      en: "Trust Center | Flash Pay",
    },
    description: {
      ar: "قنوات رسمية، تنبيهات أمان، وإخلاء مسؤولية — Flash Pay Trust Center.",
      en: "Official channels, safety notices, and disclaimers — Flash Pay Trust Center.",
    },
    path: "/trust",
  },
  markets: {
    title: {
      ar: "Flash Markets | Flash Pay",
      en: "Flash Markets | Flash Pay",
    },
    description: {
      ar: "لوحة معلومات أسواق Flash Pay — معلومات إرشادية فقط.",
      en: "Flash Pay market dashboard — indicative information only.",
    },
    path: "/markets",
  },
  business: {
    title: {
      ar: "Flash Business Class | Flash Pay",
      en: "Flash Business Class | Flash Pay",
    },
    description: {
      ar: "حلول premium للتجار والشركات — التوفر يعتمد على الدولة والشبكة.",
      en: "Premium solutions for traders and companies — availability depends on country and network.",
    },
    path: "/business",
  },
  partners: {
    title: {
      ar: "Flash Partners | Flash Pay",
      en: "Flash Partners | Flash Pay",
    },
    description: {
      ar: "انضم إلى شبكة شركاء Flash Pay — مكاتب، سيولة، وتغطية دولية.",
      en: "Join the Flash Pay partner network — offices, liquidity, and country coverage.",
    },
    path: "/partners",
  },
  network: {
    title: {
      ar: "Flash Pay Network | Flash Pay",
      en: "Flash Pay Network | Flash Pay",
    },
    description: {
      ar: "كيف تعمل شبكة Flash Pay — خدمات مباشرة وتنسيق عبر الشركاء.",
      en: "How the Flash Pay network operates — direct services and partner coordination.",
    },
    path: "/network",
  },
  academy: {
    title: {
      ar: "Flash Academy | Flash Pay",
      en: "Flash Academy | Flash Pay",
    },
    description: {
      ar: "محتوى تعليمي عن التحويلات، USDT، الأمان، والأسواق.",
      en: "Educational content on transfers, USDT, safety, and markets.",
    },
    path: "/academy",
  },
  contact: {
    title: {
      ar: "Contact | Flash Pay",
      en: "Contact | Flash Pay",
    },
    description: {
      ar: "تواصل رسمي مع Flash Pay — قنوات موثوقة فقط.",
      en: "Official Flash Pay contact — trusted channels only.",
    },
    path: "/contact",
  },
  home: {
    title: {
      ar: "Flash Pay | منصة مالية عالمية",
      en: "Flash Pay | Global Financial Platform",
    },
    description: {
      ar: "تحويلات، USDT، Business Class، أسواق، Academy، وشبكة شركاء — عبر قنوات رسمية.",
      en: "Transfers, USDT, Business Class, markets, Academy, and partner network — through official channels.",
    },
    path: "/",
  },
  wallet: {
    title: {
      ar: "Flash Wallet | قريباً",
      en: "Flash Wallet | Coming Soon",
    },
    description: {
      ar: "محفظة Flash Wallet قيد التطوير — لا أرصدة فعّالة ولا تنفيذ حالياً.",
      en: "Flash Wallet is under development — no active balances or execution.",
    },
    path: "/wallet",
  },
  trade: {
    title: {
      ar: "Flash Trade | قريباً",
      en: "Flash Trade | Coming Soon",
    },
    description: {
      ar: "Flash Trade قيد التطوير — قد يتطلب إعداداً تنظيمياً. لا تداول فعّال.",
      en: "Flash Trade is under development — may require regulatory preparation. No active trading.",
    },
    path: "/trade",
  },
  services: {
    title: {
      ar: "Services | Flash Pay",
      en: "Services | Flash Pay",
    },
    description: {
      ar: "استكشف خدمات Flash Pay — التوفر يعتمد على الدولة وتغطية شبكة الشركاء.",
      en: "Explore Flash Pay services — availability depends on country and partner network coverage.",
    },
    path: "/services",
  },
  countries: {
    title: {
      ar: "Countries Hub | Flash Pay",
      en: "Countries Hub | Flash Pay",
    },
    description: {
      ar: "تغطية الدول والعملات والخدمات — التوفر يختلف حسب المنطقة.",
      en: "Country coverage, currencies, and services — availability varies by region.",
    },
    path: "/countries",
  },
  request: {
    title: {
      ar: "Smart Request Center | Flash Pay",
      en: "Smart Request Center | Flash Pay",
    },
    description: {
      ar: "أرسل طلباً منظماً عبر WhatsApp الرسمي — بدون أسعار مضمونة على الموقع.",
      en: "Send a structured request via official WhatsApp — no guaranteed rates on the website.",
    },
    path: "/request",
  },
} as const;
