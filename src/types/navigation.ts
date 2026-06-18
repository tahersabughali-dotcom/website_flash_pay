import type { BaseEntity, LocalizedString } from "./common";

/** Maps nav items to feature flag keys for visibility control */
export type FeatureFlagKey =
  | "showMarkets"
  | "showWallet"
  | "showTrade"
  | "showPartners"
  | "showAcademy"
  | "showRouteFinder"
  | "showBusiness"
  | "showPartnerNetwork"
  | "showComingSoon"
  | "showMarketTicker"
  | "showTrustCenter"
  | "showSmartRequestCenter"
  | "showChatWidget"
  | "showChatAdminPreview"
  | "showRequestAdminPreview"
  | "showAdminDashboardPreview"
  | "showContentAdminPreview"
  | "enableLiveChatRealtime"
  | "enableChatAi"
  | "enableAdminAuth";

export interface NavigationItem extends BaseEntity {
  title: LocalizedString;
  description?: LocalizedString;
  route: string;
  icon?: string;
  /** When set, item is hidden unless this feature flag is true */
  featureFlag?: FeatureFlagKey;
  /** Show in main header navigation */
  showInNav?: boolean;
  /** Show in footer navigation */
  showInFooter?: boolean;
}
