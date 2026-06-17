import type { LanguageCode, LocalizedString } from "./common";

export interface BrandColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
}

export interface SeoDefaults {
  title: LocalizedString;
  description: LocalizedString;
  keywords: string[];
  ogImage: string;
}

export interface PlatformSettings {
  brandName: string;
  platformName: LocalizedString;
  logo: string;
  websiteUrl: string;
  whatsappNumber: string;
  defaultLanguage: LanguageCode;
  supportedLanguages: LanguageCode[];
  email: string;
  facebookUrl: string;
  instagramUrl: string;
  telegramUrl: string;
  supportHours: LocalizedString;
  showMarketsTicker: boolean;
  showComingSoonSections: boolean;
  showPartnerNetwork: boolean;
  showRouteFinder: boolean;
  maintenanceMode: boolean;
  brandColors: BrandColors;
  seoDefaults: SeoDefaults;
}
