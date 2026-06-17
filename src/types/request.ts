import type { BaseEntity, LocalizedString } from "./common";

export interface RequestTypeField {
  name: string;
  label: LocalizedString;
  type: "text" | "number" | "select" | "textarea";
  required?: boolean;
  options?: { value: string; label: LocalizedString }[];
}

export interface RequestType extends BaseEntity {
  title: LocalizedString;
  description: LocalizedString;
  icon?: string;
  fields: RequestTypeField[];
}

export interface RequestFormData {
  requestType: string;
  fromCountry?: string;
  toCountry?: string;
  amount?: string;
  currency?: string;
  paymentMethod?: string;
  receivingMethod?: string;
  customerName?: string;
  whatsappNumber?: string;
  notes?: string;
}
