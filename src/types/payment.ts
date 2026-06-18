import type { LocalizedString } from "./common";
import type { GlobalCoverageStatus } from "./globalCountry";

export type PaymentMethodCategory =
  | "cash"
  | "bank"
  | "mobile_wallet"
  | "ewallet"
  | "usdt"
  | "digital_platform"
  | "card"
  | "partner"
  | "coordination"
  | "business"
  | "local"
  | "other";

export interface GlobalPaymentMethod {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  category: PaymentMethodCategory;
  iconImage: string;
  status: GlobalCoverageStatus;
  availabilityNote: LocalizedString;
  requiresConfirmation: boolean;
  isFeatured: boolean;
  order: number;
  relatedCountries: string[];
  relatedCurrencies: string[];
}

export interface GlobalReceivingMethod {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  category: PaymentMethodCategory;
  iconImage: string;
  status: GlobalCoverageStatus;
  availabilityNote: LocalizedString;
  requiresConfirmation: boolean;
  isFeatured: boolean;
  order: number;
  relatedCountries: string[];
  relatedCurrencies: string[];
}

/** Operational payment method — kept in paymentMethodsData.ts */
export interface PaymentMethodDefinition {
  id: string;
  slug: string;
  title: LocalizedString;
  status: "active" | "hidden";
  order: number;
}

export interface ReceivingMethodDefinition {
  id: string;
  slug: string;
  title: LocalizedString;
  status: "active" | "hidden";
  order: number;
}
