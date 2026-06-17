import type {
  BaseEntity,
  ExecutionType,
  FeatureFlags,
  LocalizedString,
  SeoFields,
  Taggable,
} from "./common";

export type ServiceCategory =
  | "individual"
  | "business"
  | "crypto"
  | "digital_platform"
  | "country"
  | "market"
  | "partner_network"
  | "future";

export interface Service extends BaseEntity, SeoFields, FeatureFlags, Taggable {
  title: LocalizedString;
  shortDescription: LocalizedString;
  fullDescription: LocalizedString;
  category: ServiceCategory;
  executionType: ExecutionType;
  icon?: string;
  route: string;
  countries?: string[];
  currencies?: string[];
  paymentMethods?: string[];
  receivingMethods?: string[];
}
