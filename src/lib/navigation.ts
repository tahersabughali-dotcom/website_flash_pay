import { isFeatureEnabled } from "@/data/featureFlagsData";
import { navigationData } from "@/data/navigationData";
import type { NavigationItem } from "@/types/navigation";
import { filterByStatus, sortByOrder } from "./filters";

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

export function getNavigationByRoute(route: string): NavigationItem | undefined {
  return navigationData.find((item) => item.route === route);
}

export function getNavigationBySlug(slug: string): NavigationItem | undefined {
  return navigationData.find((item) => item.slug === slug);
}
