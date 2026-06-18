import { countriesData } from "@/data/countriesData";
import { globalCountriesData } from "@/data/globalCountriesData";
import type { LanguageCode } from "@/types/common";
import type { Country } from "@/types/country";
import type { GlobalCountry, GlobalCoverageStatus } from "@/types/globalCountry";
import { getLocalized } from "@/lib/i18n";
import { sortByOrder } from "@/lib/filters";

export const OPERATIONAL_SLUG_TO_ISO2: Record<string, string> = {
  egypt: "EG",
  turkey: "TR",
  china: "CN",
  uae: "AE",
  "saudi-arabia": "SA",
  qatar: "QA",
  oman: "OM",
  jordan: "JO",
  kuwait: "KW",
  gaza: "PS",
  "united-states": "US",
  "united-kingdom": "GB",
  algeria: "DZ",
  morocco: "MA",
  syria: "SY",
  lebanon: "LB",
  yemen: "YE",
};

const OPERATIONAL_SLUGS = new Set(countriesData.map((c) => c.slug));

export function getOperationalIso2(slug: string): string | undefined {
  return OPERATIONAL_SLUG_TO_ISO2[slug];
}

export function getOperationalCountries(): Country[] {
  return sortByOrder(countriesData.filter((c) => c.status === "active"));
}

export function getFeaturedOperationalCountries(): Country[] {
  return getOperationalCountries().filter((c) => c.isFeatured);
}

export function getGlobalDirectoryCountries(): GlobalCountry[] {
  return globalCountriesData
    .filter((c) => c.showOnCountriesPage)
    .sort((a, b) => a.order - b.order);
}

export function getGlobalCountryByIso2(iso2: string): GlobalCountry | undefined {
  return globalCountriesData.find((c) => c.iso2.toLowerCase() === iso2.toLowerCase());
}

export function getGlobalCountryBySlug(slug: string): GlobalCountry | undefined {
  return globalCountriesData.find((c) => c.slug === slug);
}

export function isOperationalCountrySlug(slug: string): boolean {
  return OPERATIONAL_SLUGS.has(slug);
}

export function getCountryPageHref(country: GlobalCountry): string {
  if (country.operationalSlug && isOperationalCountrySlug(country.operationalSlug)) {
    return `/countries/${country.operationalSlug}`;
  }
  return "/request";
}

export function getUniqueGlobalRegions(lang: LanguageCode): string[] {
  const regions = new Set<string>();
  getGlobalDirectoryCountries().forEach((country) => {
    regions.add(getLocalized(country.region, lang));
  });
  return Array.from(regions).sort((a, b) => a.localeCompare(b));
}

export function filterGlobalCountries(options: {
  region?: string;
  status?: GlobalCoverageStatus | "all";
  search?: string;
  lang?: LanguageCode;
  excludeOperational?: boolean;
}): GlobalCountry[] {
  const lang = options.lang ?? "ar";
  const query = options.search?.trim().toLowerCase() ?? "";

  return getGlobalDirectoryCountries().filter((country) => {
    if (options.excludeOperational && country.operationalSlug && isOperationalCountrySlug(country.operationalSlug)) {
      return false;
    }

    if (options.region && options.region !== "all") {
      if (getLocalized(country.region, lang) !== options.region) return false;
    }

    if (options.status && options.status !== "all" && country.status !== options.status) {
      return false;
    }

    if (!query) return true;

    const name = getLocalized(country.name, lang).toLowerCase();
    const iso = `${country.iso2} ${country.iso3}`.toLowerCase();
    return name.includes(query) || iso.includes(query) || country.slug.includes(query);
  });
}

export { GLOBAL_COUNTRY_COUNT } from "@/data/globalCountriesData";
