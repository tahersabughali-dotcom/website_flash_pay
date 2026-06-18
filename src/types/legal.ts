import type { LocalizedString } from "@/types/common";

export type LegalPageKey = "privacy-policy" | "terms" | "risk-disclaimer" | "security";

export interface LegalSection {
  heading: LocalizedString;
  paragraphs: LocalizedString[];
  /** Renders as amber warning card */
  isWarning?: boolean;
}

export interface LegalPageContent {
  key: LegalPageKey;
  path: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  lastUpdated: string;
  seoTitle: LocalizedString;
  seoDescription: LocalizedString;
  sections: LegalSection[];
}

export interface LegalFooterLink {
  href: string;
  label: LocalizedString;
}
