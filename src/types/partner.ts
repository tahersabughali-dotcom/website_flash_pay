import type { BaseEntity, LocalizedString, PartnerStatus } from "./common";

export interface PartnerNetworkEntry extends BaseEntity {
  title: LocalizedString;
  description: LocalizedString;
  type: string;
  countries?: string[];
  partnerStatus?: PartnerStatus;
}

export interface PartnerTypeDefinition {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
}
