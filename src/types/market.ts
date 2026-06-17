import type { BaseEntity, LocalizedString, SeoFields } from "./common";

export type MarketCategory =
  | "forex"
  | "crypto"
  | "metals"
  | "energy"
  | "indices";

export type MarketPriceMode = "indicative" | "manual" | "unavailable";

export interface MarketItem extends BaseEntity {
  symbol: string;
  name: LocalizedString;
  category: MarketCategory;
  price: number | null;
  change: number | null;
  changePercent: number | null;
  source: string;
  priceMode: MarketPriceMode;
  isLive?: boolean;
}

export type MarketDirection = "bullish" | "bearish" | "neutral";

export interface MarketAnalysisArticle extends BaseEntity, SeoFields {
  title: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedString;
  market: string;
  asset: string;
  direction: MarketDirection;
  supportLevels?: string[];
  resistanceLevels?: string[];
  positiveScenario?: LocalizedString;
  negativeScenario?: LocalizedString;
  author: string;
  publishedAt: string;
}
