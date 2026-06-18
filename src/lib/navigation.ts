import { isFeatureEnabled } from "@/data/featureFlagsData";
import { navigationData } from "@/data/navigationData";
import type { NavigationItem } from "@/types/navigation";
import { filterByStatus, sortByOrder } from "./filters";

/** Primary desktop header links — full nav remains in mobile menu and footer. */
const DESKTOP_HEADER_NAV_SLUGS = [
  "services",
  "countries",
  "route-finder",
  "markets",
  "business",
  "partners",
  "academy",
  "trust",
  "contact",
] as const;

export function getVisibleNavigation(options?: {
  footer?: boolean;
}): NavigationItem[] {
  return sortByOrder(filterByStatus(navigationData)).filter((item) => {
    if (options?.footer && !item.showInFooter) return false;
    if (!options?.footer && item.showInNav === false) return false;
    if (item.featureFlag && !isFeatureEnabled(item.featureFlag)) return false;
    return true;
  });
}

export function getDesktopHeaderNavigation(): NavigationItem[] {
  const visible = getVisibleNavigation();

  return DESKTOP_HEADER_NAV_SLUGS.map((slug) =>
    visible.find((item) => item.slug === slug),
  ).filter((item): item is NavigationItem => Boolean(item));
}

export function getNavigationByRoute(route: string): NavigationItem | undefined {
  return navigationData.find((item) => item.route === route);
}

export function getNavigationBySlug(slug: string): NavigationItem | undefined {
  return navigationData.find((item) => item.slug === slug);
}
