import { articlesData } from "@/data/articlesData";
import { countriesData } from "@/data/countriesData";
import { servicesData } from "@/data/servicesData";
import { staticPageSeo } from "@/lib/seo";
import { absoluteUrl } from "@/lib/siteUrl";

export interface SitemapEntry {
  path: string;
  priority: number;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
}

/** Static public routes from SEO registry */
export function getStaticSitemapPaths(): string[] {
  return Object.values(staticPageSeo).map((page) => page.path);
}

/** Active service detail pages only */
export function getServiceSitemapPaths(): string[] {
  return servicesData
    .filter((service) => service.status === "active")
    .map((service) => `/services/${service.slug}`);
}

/** Active country detail pages only */
export function getCountrySitemapPaths(): string[] {
  return countriesData
    .filter((country) => country.status === "active")
    .map((country) => `/countries/${country.slug}`);
}

/** Published academy articles only */
export function getArticleSitemapPaths(): string[] {
  return articlesData
    .filter((article) => article.status === "published")
    .map((article) => `/academy/${article.slug}`);
}

export function getAllSitemapEntries(): SitemapEntry[] {
  const staticPaths = getStaticSitemapPaths();
  const dynamicPaths = [
    ...getServiceSitemapPaths(),
    ...getCountrySitemapPaths(),
    ...getArticleSitemapPaths(),
  ];

  const uniquePaths = Array.from(new Set([...staticPaths, ...dynamicPaths]));

  return uniquePaths.map((path) => ({
    path,
    priority: path === "/" ? 1 : path.startsWith("/academy/") ? 0.6 : 0.8,
    changeFrequency: path.startsWith("/academy/") ? "weekly" : "monthly",
  }));
}

export function getSitemapUrls(): string[] {
  return getAllSitemapEntries().map((entry) => absoluteUrl(entry.path));
}
