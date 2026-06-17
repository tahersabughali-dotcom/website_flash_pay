import type { BaseEntity, ExecutionType, LocalizedString } from "./common";

export interface RouteDefinition extends BaseEntity {
  fromCountrySlug: string;
  toCountrySlug: string;
  amountMin?: number;
  amountMax?: number;
  currencies: string[];
  paymentMethods: string[];
  receivingMethods: string[];
  availableServiceSlugs: string[];
  executionType: ExecutionType;
  notes?: LocalizedString;
}
