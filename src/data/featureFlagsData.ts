import type { FeatureFlagKey } from "@/types/navigation";

/**
 * Central feature flags — toggle major platform sections without code changes.
 *
 * PRE-LAUNCH (Step 8): review before deployment.
 * - Set false to hide sections from navigation and home previews.
 * - Wallet/Trade should stay visible as Coming Soon only (showWallet/showTrade).
 */
export const featureFlagsData: Record<FeatureFlagKey, boolean> = {
  showMarkets: true,
  showWallet: true,
  showTrade: true,
  showPartners: true,
  showAcademy: true,
  showRouteFinder: true,
  showBusiness: true,
  showPartnerNetwork: true,
  showComingSoon: true,
  showMarketTicker: true,
  showTrustCenter: true,
  showSmartRequestCenter: true,
};

export function isFeatureEnabled(flag: FeatureFlagKey): boolean {
  return featureFlagsData[flag] === true;
}
