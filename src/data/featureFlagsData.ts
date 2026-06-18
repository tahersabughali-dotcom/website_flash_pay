import type { FeatureFlagKey } from "@/types/navigation";

/**
 * Central feature flags — toggle major platform sections without code changes.
 *
 * PRE-LAUNCH: review before deployment.
 * - Public nav flags (showMarkets, etc.) control marketing sections.
 * - Wallet/Trade should stay visible as Coming Soon only (showWallet/showTrade).
 *
 * PRODUCTION LOCKDOWN (Step 31):
 * - Admin preview flags below may stay `true` for LOCAL development.
 * - In production builds, resolved flags in `src/lib/config/featureFlags.ts` IGNORE
 *   raw preview `true` values unless explicit NEXT_PUBLIC_ENABLE_* env vars are set.
 * - Hidden URL is not real security.
 * - See `.env.example` and FINAL_PRODUCTION_SAFETY_AUDIT.md.
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
  showChatWidget: true,
  /** LOCAL DEV: chat admin preview — resolved OFF in production unless NEXT_PUBLIC_ENABLE_CHAT_ADMIN_PREVIEW */
  showChatAdminPreview: true,
  /**
   * LOCAL DEV admin preview flags — raw values for development only.
   * Production uses resolved flags (see src/lib/config/featureFlags.ts).
   */
  /** LOCAL DEV: request admin preview */
  showRequestAdminPreview: true,
  /** LOCAL DEV: admin dashboard preview at /admin */
  showAdminDashboardPreview: true,
  /** LOCAL DEV: content admin preview at /admin/content */
  showContentAdminPreview: true,
  /** OFF by default — production requires NEXT_PUBLIC_ENABLE_LIVE_CHAT_REALTIME + secured Supabase */
  enableLiveChatRealtime: false,
  /** OFF by default — production requires NEXT_PUBLIC_ENABLE_CHAT_AI + server OPENAI_API_KEY */
  enableChatAi: false,
  /**
   * OFF by default — production requires ENABLE_ADMIN_AUTH + Supabase + ADMIN_ALLOWED_EMAILS.
   * Hidden URL is not real security.
   */
  enableAdminAuth: false,
};

export function isFeatureEnabled(flag: FeatureFlagKey): boolean {
  return featureFlagsData[flag] === true;
}
