/** Supported content languages — extend when adding Turkish, French, etc. */
export type LanguageCode = "ar" | "en";

/** Bilingual (or multilingual) text field used across all data records */
export type LocalizedString = Record<LanguageCode, string>;

/** Visibility and lifecycle state for platform entities */
export type EntityStatus =
  | "active"
  | "hidden"
  | "coming_soon"
  | "disabled"
  | "beta"
  | "archived"
  | "draft"
  | "published";

/** How a service is executed — drives legal wording in the UI */
export type ExecutionType =
  | "direct"
  | "partner"
  | "authorized_partner"
  | "referral"
  | "coordination"
  | "liquidity_partner"
  | "local_office_partner"
  | "coming_soon";

/** Partner record status (future partner portal) */
export type PartnerStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "suspended"
  | "vip"
  | "hidden";

/** Base fields shared by most data-driven records */
export interface BaseEntity {
  id: string;
  slug: string;
  status: EntityStatus;
  order: number;
  createdAt: string;
  updatedAt: string;
}

/** SEO metadata — reusable on pages, services, countries, articles */
export interface SeoFields {
  seoTitle?: LocalizedString;
  seoDescription?: LocalizedString;
  keywords?: string[];
}

/** Optional tagging for filtering and search */
export interface Taggable {
  tags?: string[];
}

/** Featured / homepage visibility flags */
export interface FeatureFlags {
  isFeatured?: boolean;
  showOnHome?: boolean;
}
