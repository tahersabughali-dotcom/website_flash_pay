import { businessData } from "@/data/businessData";
import { articlesData } from "@/data/articlesData";
import { businessServiceSlugs } from "@/data/marketCategoriesData";
import { marketsData } from "@/data/marketsData";
import { comingSoonData } from "@/data/comingSoonData";
import { countriesData } from "@/data/countriesData";
import { currenciesData } from "@/data/currenciesData";
import { isFeatureEnabled } from "@/data/featureFlagsData";
import { partnerNetworkData } from "@/data/partnerNetworkData";
import { paymentMethodsData } from "@/data/paymentMethodsData";
import { receivingMethodsData } from "@/data/receivingMethodsData";
import { requestTypesData } from "@/data/requestTypesData";
import { servicesData } from "@/data/servicesData";
import { settingsData } from "@/data/settingsData";
import { trustData, type TrustDocument } from "@/data/trustData";
import { marketSourceLabels } from "@/data/pageContentData";
import type { LanguageCode } from "@/types/common";
import type { Article, AcademyCategory } from "@/types/article";
import type { MarketCategory, MarketItem } from "@/types/market";
import type { Country } from "@/types/country";
import type { PartnerNetworkEntry } from "@/types/partner";
import type { RequestType } from "@/types/request";
import type { Service, ServiceCategory } from "@/types/service";
import { filterByStatus, findBySlug, sortByOrder } from "./filters";
import { getLocalized } from "./i18n";

export function getFeaturedServices(limit?: number): Service[] {
  const items = sortByOrder(
    filterByStatus(servicesData, { includeComingSoon: false }),
  ).filter((s) => s.isFeatured && s.showOnHome);

  return limit ? items.slice(0, limit) : items;
}

export function getAllServices(): Service[] {
  return sortByOrder(filterByStatus(servicesData, { includeComingSoon: true }));
}

export function getServiceBySlug(slug: string): Service | undefined {
  return findBySlug(getAllServices(), slug);
}

export function getServicesBySlugs(slugs: string[]): Service[] {
  return slugs
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is Service => service !== undefined);
}

export function getRelatedServices(service: Service, limit = 3): Service[] {
  return getAllServices()
    .filter(
      (item) =>
        item.slug !== service.slug &&
        item.category === service.category &&
        item.status !== "coming_soon",
    )
    .slice(0, limit);
}

export function getRelatedCountriesForService(service: Service): Country[] {
  const slugs = service.countries ?? [];
  return slugs
    .map((slug) => getCountryBySlug(slug))
    .filter((country): country is Country => country !== undefined);
}

export function filterServices(options: {
  category?: ServiceCategory | "all";
  search?: string;
  lang?: LanguageCode;
}): Service[] {
  const lang = options.lang ?? settingsData.defaultLanguage;
  const query = options.search?.trim().toLowerCase() ?? "";

  return getAllServices().filter((service) => {
    if (options.category && options.category !== "all" && service.category !== options.category) {
      return false;
    }

    if (!query) return true;

    const title = getLocalized(service.title, lang).toLowerCase();
    const short = getLocalized(service.shortDescription, lang).toLowerCase();
    const tags = (service.tags ?? []).join(" ").toLowerCase();

    return title.includes(query) || short.includes(query) || tags.includes(query);
  });
}

export function getFeaturedCountries(limit?: number): Country[] {
  const items = sortByOrder(filterByStatus(countriesData)).filter(
    (c) => c.isFeatured && c.showOnHome,
  );

  return limit ? items.slice(0, limit) : items;
}

export function getAllCountries(): Country[] {
  return sortByOrder(filterByStatus(countriesData));
}

export function getCountryBySlug(slug: string): Country | undefined {
  return findBySlug(getAllCountries(), slug);
}

export function getUniqueCountryRegions(lang?: LanguageCode): string[] {
  const language = lang ?? settingsData.defaultLanguage;
  const regions = new Set<string>();

  getAllCountries().forEach((country) => {
    regions.add(getLocalized(country.region, language));
  });

  return Array.from(regions).sort((a, b) => a.localeCompare(b));
}

export function filterCountries(options: {
  region?: string;
  search?: string;
  lang?: LanguageCode;
}): Country[] {
  const lang = options.lang ?? settingsData.defaultLanguage;
  const query = options.search?.trim().toLowerCase() ?? "";

  return getAllCountries().filter((country) => {
    const regionLabel = getLocalized(country.region, lang);

    if (options.region && options.region !== "all" && regionLabel !== options.region) {
      return false;
    }

    if (!query) return true;

    const name = getLocalized(country.name, lang).toLowerCase();
    const currencies = country.currencies.join(" ").toLowerCase();
    const services = country.availableServices.join(" ").toLowerCase();

    return name.includes(query) || currencies.includes(query) || services.includes(query);
  });
}

export function getAllRequestTypes(): RequestType[] {
  return sortByOrder(filterByStatus(requestTypesData));
}

export function getRequestTypeBySlug(slug: string): RequestType | undefined {
  return findBySlug(getAllRequestTypes(), slug);
}

export function getActiveCountriesForSelect(lang?: LanguageCode) {
  const language = lang ?? settingsData.defaultLanguage;
  return getAllCountries().map((country) => ({
    value: country.slug,
    label: getLocalized(country.name, language),
  }));
}

export function getActiveCurrenciesForSelect(lang?: LanguageCode) {
  const language = lang ?? settingsData.defaultLanguage;
  return currenciesData
    .filter((c) => c.status === "active")
    .sort((a, b) => a.order - b.order)
    .map((currency) => ({
      value: currency.code,
      label: `${currency.code} — ${getLocalized(currency.name, language)}`,
    }));
}

export function getActivePaymentMethodsForSelect(lang?: LanguageCode) {
  const language = lang ?? settingsData.defaultLanguage;
  return paymentMethodsData
    .filter((m) => m.status === "active")
    .sort((a, b) => a.order - b.order)
    .map((method) => ({
      value: method.slug,
      label: getLocalized(method.title, language),
    }));
}

export function getActiveReceivingMethodsForSelect(lang?: LanguageCode) {
  const language = lang ?? settingsData.defaultLanguage;
  return receivingMethodsData
    .filter((m) => m.status === "active")
    .sort((a, b) => a.order - b.order)
    .map((method) => ({
      value: method.slug,
      label: getLocalized(method.title, language),
    }));
}

export function resolveCountryLabel(slug: string, lang?: LanguageCode): string {
  const country = getCountryBySlug(slug);
  if (!country) return slug;
  return getLocalized(country.name, lang ?? settingsData.defaultLanguage);
}

export function resolvePaymentMethodLabel(slug: string, lang?: LanguageCode): string {
  const method = paymentMethodsData.find((m) => m.slug === slug);
  if (!method) return slug;
  return getLocalized(method.title, lang ?? settingsData.defaultLanguage);
}

export function resolveReceivingMethodLabel(slug: string, lang?: LanguageCode): string {
  const method = receivingMethodsData.find((m) => m.slug === slug);
  if (!method) return slug;
  return getLocalized(method.title, lang ?? settingsData.defaultLanguage);
}

const SERVICE_LABEL_FALLBACK = {
  ar: "خدمة متاحة",
  en: "Available service",
} as const;

export function resolveServiceLabel(slug: string, lang?: LanguageCode): string {
  const language = lang ?? settingsData.defaultLanguage;
  const service = getServiceBySlug(slug);
  if (!service) return getLocalized(SERVICE_LABEL_FALLBACK, language);
  return getLocalized(service.title, language);
}

export function resolveServiceLabels(slugs: string[], lang?: LanguageCode): string[] {
  return slugs.map((slug) => resolveServiceLabel(slug, lang));
}

export function resolveMarketSourceLabel(source: string, lang?: LanguageCode): string {
  const language = lang ?? settingsData.defaultLanguage;
  const normalized = source.trim().toLowerCase().replace(/\s+\/\s+/g, "-").replace(/\s+/g, "-");

  if (normalized in marketSourceLabels) {
    return getLocalized(
      marketSourceLabels[normalized as keyof typeof marketSourceLabels],
      language,
    );
  }

  if (source === "Manual / Indicative") {
    return getLocalized(marketSourceLabels["manual-indicative"], language);
  }

  return source;
}

export function getHomeRequestTypes(limit?: number): RequestType[] {
  const items = sortByOrder(filterByStatus(requestTypesData));
  return limit ? items.slice(0, limit) : items;
}

export function getPartnerNetworkPreview(limit?: number): PartnerNetworkEntry[] {
  if (!isFeatureEnabled("showPartnerNetwork")) return [];
  const items = sortByOrder(filterByStatus(partnerNetworkData));
  return limit ? items.slice(0, limit) : items;
}

export function getPublishedTrustItems(limit?: number): TrustDocument[] {
  const items = trustData
    .filter((t) => t.status === "published")
    .sort((a, b) => a.order - b.order);
  return limit ? items.slice(0, limit) : items;
}

export function getComingSoonFeatures(limit?: number) {
  if (!isFeatureEnabled("showComingSoon")) return [];
  const items = [...comingSoonData].sort((a, b) => a.order - b.order);
  return limit ? items.slice(0, limit) : items;
}

export function getComingSoonBySlug(slug: string) {
  return comingSoonData.find((item) => item.slug === slug);
}

export function getHomeMarketPreview(limit = 4): MarketItem[] {
  if (!isFeatureEnabled("showMarkets")) return [];
  return getAllMarketItems().slice(0, limit);
}

export function getActiveBusinessOfferings(limit?: number) {
  if (!isFeatureEnabled("showBusiness")) return [];
  const items = businessData
    .filter((b) => b.status === "active")
    .sort((a, b) => a.order - b.order);
  return limit ? items.slice(0, limit) : items;
}

export function getActiveBusinessOfferingsFull() {
  return businessData
    .filter((item) => item.status === "active")
    .sort((a, b) => a.order - b.order);
}

export function getBusinessServices(): Service[] {
  return getServicesBySlugs([...businessServiceSlugs]);
}

export function getAllMarketItems(): MarketItem[] {
  return sortByOrder(filterByStatus(marketsData));
}

export function getMarketItemsByCategory(category: MarketCategory): MarketItem[] {
  return getAllMarketItems().filter((item) => item.category === category);
}

export function getMarketItemBySlug(slug: string): MarketItem | undefined {
  return findBySlug(getAllMarketItems(), slug);
}

export interface MarketInsightItem {
  id: string;
  slug: string;
  title: Article["title"];
  excerpt: Article["excerpt"];
  author: string;
  publishedAt: string;
  href: string;
}

export function getMarketInsights(limit?: number): MarketInsightItem[] {
  const items: MarketInsightItem[] = getPublishedArticles({
    category: "market_analysis",
  }).map((article) => ({
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    author: article.author,
    publishedAt: article.publishedAt,
    href: `/academy/${article.slug}`,
  }));

  return limit ? items.slice(0, limit) : items;
}

export function getPublishedArticles(options?: {
  category?: AcademyCategory | "all";
  search?: string;
  lang?: LanguageCode;
}): Article[] {
  const lang = options?.lang ?? settingsData.defaultLanguage;
  const query = options?.search?.trim().toLowerCase() ?? "";

  let items = sortByOrder(
    articlesData.filter((article) => article.status === "published"),
  );

  if (options?.category && options.category !== "all") {
    items = items.filter((article) => article.category === options.category);
  }

  if (query) {
    items = items.filter((article) => {
      const title = getLocalized(article.title, lang).toLowerCase();
      const excerpt = getLocalized(article.excerpt, lang).toLowerCase();
      const tags = (article.tags ?? []).join(" ").toLowerCase();
      return title.includes(query) || excerpt.includes(query) || tags.includes(query);
    });
  }

  return items.sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export function getArticleBySlug(slug: string): Article | undefined {
  return findBySlug(articlesData, slug);
}

export function getPublishedArticleBySlug(slug: string): Article | undefined {
  const article = getArticleBySlug(slug);
  if (!article || article.status !== "published") return undefined;
  return article;
}

export function getFeaturedArticles(limit?: number): Article[] {
  const items = getPublishedArticles().filter((article) => article.isFeatured);
  return limit ? items.slice(0, limit) : items;
}
