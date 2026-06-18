import type { LocalizedString } from "./common";

export type GlobalCoverageStatus =
  | "active"
  | "supported"
  | "available_by_request"
  | "limited"
  | "partner_network"
  | "coming_soon"
  | "not_available";

export interface GlobalCountry {
  id: string;
  slug: string;
  iso2: string;
  iso3: string;
  name: LocalizedString;
  officialName: LocalizedString;
  region: LocalizedString;
  subregion: LocalizedString;
  flagEmoji: string;
  flagImageUrl: string;
  currencies: string[];
  phoneCode: string;
  status: GlobalCoverageStatus;
  coverageNote: LocalizedString;
  isFeatured: boolean;
  showOnCountriesPage: boolean;
  /** Links to operational country slug in countriesData when present */
  operationalSlug?: string;
  order: number;
}
