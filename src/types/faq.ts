import type { BaseEntity, LocalizedString } from "./common";

export type FaqCategory =
  | "general"
  | "services"
  | "trust"
  | "business"
  | "partners"
  | "markets";

export interface FaqItem extends BaseEntity {
  question: LocalizedString;
  answer: LocalizedString;
  category: FaqCategory;
}
