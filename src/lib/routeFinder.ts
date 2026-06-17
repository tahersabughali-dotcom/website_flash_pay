import { routeFinderData } from "@/data/routeFinderData";
import { executionTypesData } from "@/data/executionTypesData";
import type { RouteDefinition } from "@/types/route";
import type { ExecutionType } from "@/types/common";
import { filterByStatus, sortByOrder } from "./filters";

export interface RouteFinderQuery {
  fromCountrySlug: string;
  toCountrySlug: string;
  currency?: string;
  amount?: number;
  receivingMethod?: string;
}

export function getAllRoutes(): RouteDefinition[] {
  return sortByOrder(filterByStatus(routeFinderData));
}

export function findRoutes(
  routes: RouteDefinition[],
  query: RouteFinderQuery,
): RouteDefinition[] {
  if (!query.fromCountrySlug || !query.toCountrySlug) return [];

  const publicRoutes = sortByOrder(filterByStatus(routes));

  return publicRoutes.filter((route) => {
    if (route.fromCountrySlug !== query.fromCountrySlug) return false;
    if (route.toCountrySlug !== query.toCountrySlug) return false;

    if (query.currency && !route.currencies.includes(query.currency)) return false;

    if (
      query.receivingMethod &&
      !route.receivingMethods.includes(query.receivingMethod)
    ) {
      return false;
    }

    if (query.amount !== undefined && !Number.isNaN(query.amount)) {
      if (route.amountMin !== undefined && query.amount < route.amountMin) return false;
      if (route.amountMax !== undefined && query.amount > route.amountMax) return false;
    }

    return true;
  });
}

export function searchRoutes(query: RouteFinderQuery): RouteDefinition[] {
  return findRoutes(getAllRoutes(), query);
}

export function getRoutesForCountry(countrySlug: string): RouteDefinition[] {
  return getAllRoutes().filter(
    (route) =>
      route.fromCountrySlug === countrySlug || route.toCountrySlug === countrySlug,
  );
}

export function getExecutionTypeDefinition(type: ExecutionType) {
  return executionTypesData.find((item) => item.id === type);
}
