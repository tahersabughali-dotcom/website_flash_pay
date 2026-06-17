import type {
  BaseEntity,
  FeatureFlags,
  LocalizedString,
  SeoFields,
  Taggable,
} from "./common";

export type AcademyCategory =
  | "usdt"
  | "money_transfers"
  | "digital_wallets"
  | "paypal"
  | "wise"
  | "payoneer"
  | "business_payments"
  | "currency_exchange"
  | "market_analysis"
  | "fraud_protection"
  | "trading_basics";

export interface Article extends BaseEntity, SeoFields, FeatureFlags, Taggable {
  title: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedString;
  category: AcademyCategory;
  author: string;
  publishedAt: string;
}
