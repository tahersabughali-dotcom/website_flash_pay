import type { MetadataRoute } from "next";
import { getAllSitemapEntries } from "@/lib/sitemap";
import { absoluteUrl } from "@/lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return getAllSitemapEntries().map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
