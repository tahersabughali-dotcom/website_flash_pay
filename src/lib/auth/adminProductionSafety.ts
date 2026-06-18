import {
  areAnyAdminPreviewFlagsEnabled,
  isAdminAuthConfigured,
  isAdminAuthFeatureEnabled,
  isAllowedAdminEmailsConfigured,
  isProductionEnvironment,
  isPublicAdminPreviewEnabled,
} from "@/lib/auth/adminAccessConfig";
import { isSupabaseConfigured } from "@/lib/supabase/isConfigured";

export interface AdminProductionSafetyReport {
  isProduction: boolean;
  previewFlagsActive: boolean;
  adminAuthFeatureEnabled: boolean;
  adminAuthConfigured: boolean;
  supabaseConfigured: boolean;
  allowedEmailsConfigured: boolean;
  publicPreviewOverride: boolean;
  isProductionUnsafe: boolean;
  warnings: string[];
}

/**
 * Detects unsafe production admin configuration.
 * Never exposes secret values — yes/no status only.
 */
export function evaluateAdminProductionSafety(): AdminProductionSafetyReport {
  const isProduction = isProductionEnvironment();
  const previewFlagsActive = areAnyAdminPreviewFlagsEnabled();
  const adminAuthFeatureEnabled = isAdminAuthFeatureEnabled();
  const adminAuthConfigured = isAdminAuthConfigured();
  const supabaseConfigured = isSupabaseConfigured();
  const allowedEmailsConfigured = isAllowedAdminEmailsConfigured();
  const publicPreviewOverride = isPublicAdminPreviewEnabled();

  const warnings: string[] = [];

  if (isProduction && previewFlagsActive && !adminAuthConfigured) {
    warnings.push(
      "Unsafe: production with admin preview flags on but admin auth is not fully configured.",
    );
  }

  if (isProduction && previewFlagsActive) {
    warnings.push("Admin preview flags should be false in production unless auth is fully enabled.");
  }

  if (!supabaseConfigured && adminAuthFeatureEnabled) {
    warnings.push("enableAdminAuth is on but Supabase is not configured.");
  }

  if (adminAuthFeatureEnabled && !allowedEmailsConfigured) {
    warnings.push("enableAdminAuth is on but ADMIN_ALLOWED_EMAILS is missing.");
  }

  if (publicPreviewOverride && isProduction) {
    warnings.push("NEXT_PUBLIC_ENABLE_ADMIN_PREVIEW should be false in production.");
  }

  warnings.push("Hidden URL is not real security — use authentication and permissions.");

  return {
    isProduction,
    previewFlagsActive,
    adminAuthFeatureEnabled,
    adminAuthConfigured,
    supabaseConfigured,
    allowedEmailsConfigured,
    publicPreviewOverride,
    isProductionUnsafe: isProduction && previewFlagsActive && !adminAuthConfigured,
    warnings,
  };
}

export function getAdminProductionSafetyReport(): AdminProductionSafetyReport {
  return evaluateAdminProductionSafety();
}
