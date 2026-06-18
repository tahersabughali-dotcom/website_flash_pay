import { featureFlagsData } from "@/data/featureFlagsData";
import type { FeatureFlagKey } from "@/types/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/isConfigured";

export interface ResolvedFeatureFlags {
  showAdminDashboardPreview: boolean;
  showContentAdminPreview: boolean;
  showChatAdminPreview: boolean;
  showRequestAdminPreview: boolean;
  enableAdminAuth: boolean;
  enableChatAi: boolean;
  enableLiveChatRealtime: boolean;
}

function isProductionMode(simulateProduction = false): boolean {
  return simulateProduction || process.env.NODE_ENV === "production";
}

function isProduction(): boolean {
  return isProductionMode(false);
}

function envTrue(key: string): boolean {
  return process.env[key]?.trim() === "true";
}

function readRaw(flag: FeatureFlagKey): boolean {
  return featureFlagsData[flag] === true;
}

function hasAllowedAdminEmailsConfigured(): boolean {
  const raw = process.env.ADMIN_ALLOWED_EMAILS?.trim();
  if (!raw) return false;
  return raw
    .split(",")
    .map((entry) => entry.trim())
    .some((entry) => entry.includes("@"));
}

function resolveDashboardPreview(simulateProduction = false): boolean {
  if (!isProductionMode(simulateProduction)) {
    return readRaw("showAdminDashboardPreview") || envTrue("NEXT_PUBLIC_ENABLE_ADMIN_PREVIEW");
  }
  return envTrue("NEXT_PUBLIC_ENABLE_ADMIN_PREVIEW");
}

function resolveContentPreview(simulateProduction = false): boolean {
  if (!isProductionMode(simulateProduction)) {
    return (
      readRaw("showContentAdminPreview") ||
      envTrue("NEXT_PUBLIC_ENABLE_CONTENT_ADMIN_PREVIEW") ||
      envTrue("NEXT_PUBLIC_ENABLE_ADMIN_PREVIEW")
    );
  }
  return (
    envTrue("NEXT_PUBLIC_ENABLE_CONTENT_ADMIN_PREVIEW") || envTrue("NEXT_PUBLIC_ENABLE_ADMIN_PREVIEW")
  );
}

function resolveChatAdminPreview(simulateProduction = false): boolean {
  if (!isProductionMode(simulateProduction)) {
    return (
      readRaw("showChatAdminPreview") ||
      envTrue("NEXT_PUBLIC_ENABLE_CHAT_ADMIN_PREVIEW") ||
      envTrue("NEXT_PUBLIC_ENABLE_ADMIN_PREVIEW")
    );
  }
  return (
    envTrue("NEXT_PUBLIC_ENABLE_CHAT_ADMIN_PREVIEW") || envTrue("NEXT_PUBLIC_ENABLE_ADMIN_PREVIEW")
  );
}

function resolveRequestAdminPreview(simulateProduction = false): boolean {
  if (!isProductionMode(simulateProduction)) {
    return (
      readRaw("showRequestAdminPreview") ||
      envTrue("NEXT_PUBLIC_ENABLE_REQUEST_ADMIN_PREVIEW") ||
      envTrue("NEXT_PUBLIC_ENABLE_ADMIN_PREVIEW")
    );
  }
  return (
    envTrue("NEXT_PUBLIC_ENABLE_REQUEST_ADMIN_PREVIEW") ||
    envTrue("NEXT_PUBLIC_ENABLE_ADMIN_PREVIEW")
  );
}

function resolveAdminAuth(simulateProduction = false): boolean {
  if (!isProductionMode(simulateProduction)) {
    return readRaw("enableAdminAuth") || envTrue("ENABLE_ADMIN_AUTH");
  }
  return (
    envTrue("ENABLE_ADMIN_AUTH") &&
    isSupabaseConfigured() &&
    hasAllowedAdminEmailsConfigured()
  );
}

function resolveChatAi(simulateProduction = false): boolean {
  if (!isProductionMode(simulateProduction)) {
    return readRaw("enableChatAi") || envTrue("NEXT_PUBLIC_ENABLE_CHAT_AI");
  }
  return envTrue("NEXT_PUBLIC_ENABLE_CHAT_AI") && Boolean(process.env.OPENAI_API_KEY?.trim());
}

function resolveLiveChatRealtime(simulateProduction = false): boolean {
  if (!isSupabaseConfigured()) return false;
  if (!isProductionMode(simulateProduction)) {
    return readRaw("enableLiveChatRealtime") || envTrue("NEXT_PUBLIC_ENABLE_LIVE_CHAT_REALTIME");
  }
  return envTrue("NEXT_PUBLIC_ENABLE_LIVE_CHAT_REALTIME");
}

function buildResolvedFlags(simulateProduction = false): ResolvedFeatureFlags {
  return {
    showAdminDashboardPreview: resolveDashboardPreview(simulateProduction),
    showContentAdminPreview: resolveContentPreview(simulateProduction),
    showChatAdminPreview: resolveChatAdminPreview(simulateProduction),
    showRequestAdminPreview: resolveRequestAdminPreview(simulateProduction),
    enableAdminAuth: resolveAdminAuth(simulateProduction),
    enableChatAi: resolveChatAi(simulateProduction),
    enableLiveChatRealtime: resolveLiveChatRealtime(simulateProduction),
  };
}

/**
 * Production readiness check — evaluates flags as if NODE_ENV=production
 * without mutating process.env (safe for scripts and typecheck).
 */
export function getProductionSimulatedResolvedFlags(): ResolvedFeatureFlags {
  return buildResolvedFlags(true);
}

export function getResolvedFeatureFlags(): ResolvedFeatureFlags {
  return buildResolvedFlags(false);
}

/** Raw value from featureFlagsData — for admin settings comparison only */
export function isRawFeatureEnabled(flag: FeatureFlagKey): boolean {
  return readRaw(flag);
}

export function isAdminDashboardPreviewEnabled(): boolean {
  return resolveDashboardPreview(false);
}

export function isContentAdminPreviewEnabled(): boolean {
  return resolveContentPreview(false) && resolveDashboardPreview(false);
}

export function isChatAdminPreviewEnabled(): boolean {
  return resolveChatAdminPreview(false);
}

export function isRequestAdminPreviewEnabled(): boolean {
  return resolveRequestAdminPreview(false);
}

/** Legacy alias — chat admin preview (used by existing guards) */
export function isAdminPreviewEnabled(): boolean {
  return isChatAdminPreviewEnabled();
}

export function isAdminAuthEnabled(): boolean {
  return resolveAdminAuth(false);
}

export function isChatAiEnabled(): boolean {
  return resolveChatAi(false);
}

export function isLiveChatRealtimeEnabled(): boolean {
  return resolveLiveChatRealtime(false);
}

export function areAnyResolvedAdminPreviewFlagsEnabled(): boolean {
  const flags = getResolvedFeatureFlags();
  return (
    flags.showAdminDashboardPreview ||
    flags.showContentAdminPreview ||
    flags.showChatAdminPreview ||
    flags.showRequestAdminPreview
  );
}

export function isProductionEnvironment(): boolean {
  return isProduction();
}
