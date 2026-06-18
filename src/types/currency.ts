import type { LocalizedString } from "./common";
import type { GlobalCoverageStatus } from "./globalCountry";

export type CurrencyType =
  | "fiat"
  | "crypto"
  | "stablecoin"
  | "metal"
  | "internal_reference";

export interface GlobalCurrency {
  id: string;
  code: string;
  numericCode?: string;
  symbol: string;
  name: LocalizedString;
  countries: string[];
  type: CurrencyType;
  iconImage: string;
  status: GlobalCoverageStatus;
  isFeatured: boolean;
  order: number;
  notes: LocalizedString;
}

/** Operational currency used in forms — kept in currenciesData.ts */
export interface CurrencyDefinition {
  id: string;
  code: string;
  name: LocalizedString;
  symbol: string;
  status: "active" | "hidden";
  order: number;
}
