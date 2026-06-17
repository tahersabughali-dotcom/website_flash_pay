import type { EntityStatus } from "@/types/common";

const PUBLIC_STATUSES: EntityStatus[] = [
  "active",
  "coming_soon",
  "beta",
  "published",
];

export function isPublicStatus(status: EntityStatus): boolean {
  return PUBLIC_STATUSES.includes(status);
}

export function filterByStatus<T extends { status: EntityStatus }>(
  items: T[],
  options?: { includeComingSoon?: boolean; includeBeta?: boolean },
): T[] {
  const includeComingSoon = options?.includeComingSoon ?? true;
  const includeBeta = options?.includeBeta ?? true;

  return items.filter((item) => {
    if (item.status === "hidden" || item.status === "draft" || item.status === "archived") {
      return false;
    }
    if (item.status === "disabled") return false;
    if (item.status === "coming_soon" && !includeComingSoon) return false;
    if (item.status === "beta" && !includeBeta) return false;
    return isPublicStatus(item.status);
  });
}

export function sortByOrder<T extends { order: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.order - b.order);
}

export function findBySlug<T extends { slug: string }>(
  items: T[],
  slug: string,
): T | undefined {
  return items.find((item) => item.slug === slug);
}

export function findById<T extends { id: string }>(
  items: T[],
  id: string,
): T | undefined {
  return items.find((item) => item.id === id);
}
