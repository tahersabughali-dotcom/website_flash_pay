import type {
  BaseEntity,
  FeatureFlags,
  LocalizedString,
  SeoFields,
} from "./common";

export interface CountryFaqItem {
  question: LocalizedString;
  answer: LocalizedString;
}

export interface Country extends BaseEntity, SeoFields, FeatureFlags {
  name: LocalizedString;
  flag: string;
  region: LocalizedString;
  route: string;
  currencies: string[];
  paymentMethods: string[];
  receivingMethods: string[];
  availableServices: string[];
  availableRoutes: string[];
  partnerCoverage: LocalizedString;
  notes?: LocalizedString;
  faq?: CountryFaqItem[];
}
