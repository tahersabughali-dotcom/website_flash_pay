import type { PlatformSettings } from "@/types/settings";

/**
 * Central platform settings — edit here only.
 * WhatsApp, social links, brand, and SEO defaults must never be duplicated elsewhere.
 *
 * Step 9 — production values applied. Remaining before final marketing launch:
 * [ ] email — confirm support@flashpay.uk mailbox is active
 * [ ] DNS — connect www.flashpay.uk on Vercel and set NEXT_PUBLIC_SITE_URL
 *
 * Brand assets (public/images/): logo.png, logo-header.png, logo-mark.png,
 * favicon.png, og-default.png
 */
export const settingsData: PlatformSettings = {
  brandName: "Flash Pay",
  platformName: {
    ar: "منصة Flash Pay المالية العالمية",
    en: "Flash Pay Global Platform",
  },
  logo: "/images/logo.png",
  websiteUrl: "https://www.flashpay.uk",
  whatsappNumber: "00 972 56-663-3393",
  defaultLanguage: "ar",
  supportedLanguages: ["ar", "en"],
  // TODO: confirm mailbox exists before relying on this address publicly
  email: "support@flashpay.uk",
  facebookUrl: "",
  instagramUrl: "",
  telegramUrl: "",
  supportHours: {
    ar: "الدعم متاح عبر واتساب خلال أوقات العمل",
    en: "Support is available via WhatsApp during working hours",
  },
  showMarketsTicker: true,
  showComingSoonSections: true,
  showPartnerNetwork: true,
  showRouteFinder: true,
  maintenanceMode: false,
  brandColors: {
    primary: "#0066CC",
    primaryLight: "#E8F4FD",
    primaryDark: "#004C99",
    accent: "#00A3E0",
    background: "#FFFFFF",
    surface: "#F8FAFC",
    text: "#0F172A",
    textMuted: "#64748B",
  },
  seoDefaults: {
    title: {
      ar: "Flash Pay | منصة مالية عالمية",
      en: "Flash Pay | Global Financial Platform",
    },
    description: {
      ar: "تحويلات، USDT، Business Class، أسواق إرشادية، Academy، وشبكة شركاء — عبر قنوات رسمية.",
      en: "Transfers, USDT, Business Class, indicative markets, Academy, and partner network — through official channels.",
    },
    keywords: ["flash pay", "money transfer", "usdt", "fintech", "flashpay"],
    ogImage: "/images/og-default.png",
  },
};
