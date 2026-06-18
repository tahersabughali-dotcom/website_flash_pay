import { globalCurrenciesData } from "@/data/globalCurrenciesData";
import type { LanguageCode } from "@/types/common";
import type { GlobalCoverageStatus } from "@/types/globalCountry";
import type { CurrencyType, GlobalCurrency } from "@/types/currency";
import { getLocalized } from "@/lib/i18n";

export function getAllGlobalCurrencies(): GlobalCurrency[] {
  return [...globalCurrenciesData].sort((a, b) => a.order - b.order);
}

export function getFeaturedGlobalCurrencies(): GlobalCurrency[] {
  return getAllGlobalCurrencies().filter((c) => c.isFeatured);
}

export function getGlobalCurrencyByCode(code: string): GlobalCurrency | undefined {
  return globalCurrenciesData.find((c) => c.code.toLowerCase() === code.toLowerCase());
}

export function filterGlobalCurrencies(options: {
  type?: CurrencyType | "all";
  status?: GlobalCoverageStatus | "all";
  search?: string;
  lang?: LanguageCode;
}): GlobalCurrency[] {
  const lang = options.lang ?? "ar";
  const query = options.search?.trim().toLowerCase() ?? "";

  return getAllGlobalCurrencies().filter((currency) => {
    if (options.type && options.type !== "all" && currency.type !== options.type) return false;
    if (options.status && options.status !== "all" && currency.status !== options.status) return false;

    if (!query) return true;

    const name = getLocalized(currency.name, lang).toLowerCase();
    return name.includes(query) || currency.code.toLowerCase().includes(query);
  });
}

export function resolveGlobalCurrencyLabel(code: string, lang?: LanguageCode): string {
  const currency = getGlobalCurrencyByCode(code);
  if (!currency) return code;
  return `${currency.code} — ${getLocalized(currency.name, lang ?? "ar")}`;
}

export { GLOBAL_CURRENCY_COUNT } from "@/data/globalCurrenciesData";
