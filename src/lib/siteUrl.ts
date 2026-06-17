import { settingsData } from "@/data/settingsData";

/**
 * Production site URL — prefers NEXT_PUBLIC_SITE_URL on Vercel/hosting,
 * otherwise falls back to settingsData.websiteUrl.
 */
export function getWebsiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const raw = fromEnv || settingsData.websiteUrl;
  return raw.replace(/\/$/, "");
}

/** Build an absolute URL for metadata, sitemap, and robots. */
export function absoluteUrl(path: string): string {
  const base = getWebsiteUrl();
  if (!path || path === "/") return `${base}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
