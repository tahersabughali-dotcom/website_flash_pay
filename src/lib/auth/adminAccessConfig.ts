import { isValidAdminRole } from "@/lib/auth/adminRoles";
import { isSupabaseConfigured } from "@/lib/supabase/isConfigured";
import type { AdminEmailRoleEntry, AdminRole } from "@/types/auth";
import {
  areAnyResolvedAdminPreviewFlagsEnabled,
  isAdminAuthEnabled,
  isAdminDashboardPreviewEnabled,
  isAdminPreviewEnabled,
  isChatAdminPreviewEnabled,
  isChatAiEnabled,
  isContentAdminPreviewEnabled,
  isLiveChatRealtimeEnabled,
  isProductionEnvironment,
  isRequestAdminPreviewEnabled,
} from "@/lib/config/featureFlags";

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Shared helpers safe for middleware and client bundling (no secrets). */
export { isProductionEnvironment };

export function isPublicAdminPreviewEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_ADMIN_PREVIEW === "true";
}

export {
  isAdminPreviewEnabled,
  isChatAdminPreviewEnabled,
  isRequestAdminPreviewEnabled,
  isAdminDashboardPreviewEnabled,
  isContentAdminPreviewEnabled,
  isLiveChatRealtimeEnabled,
};

export function isAdminAuthFeatureEnabled(): boolean {
  return isAdminAuthEnabled();
}

export function isChatAiFeatureEnabled(): boolean {
  return isChatAiEnabled();
}

export function parseAllowedAdminEmails(raw?: string): AdminEmailRoleEntry[] {
  const source = raw?.trim();
  if (!source) return [];

  return source
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [emailPart, rolePart] = entry.split(":").map((part) => part.trim());
      const email = normalizeEmail(emailPart ?? "");
      const role =
        rolePart && isValidAdminRole(rolePart) ? rolePart : ("admin" as AdminRole);
      return { email, role };
    })
    .filter((entry) => entry.email.includes("@"));
}

export function isAllowedAdminEmailsConfigured(): boolean {
  return parseAllowedAdminEmails(process.env.ADMIN_ALLOWED_EMAILS).length > 0;
}

export function isAdminAuthConfigured(): boolean {
  return (
    isAdminAuthEnabled() &&
    isSupabaseConfigured() &&
    isAllowedAdminEmailsConfigured()
  );
}

export function areAnyAdminPreviewFlagsEnabled(): boolean {
  return areAnyResolvedAdminPreviewFlagsEnabled();
}

export function isLocalRequestDraftEnabled(): boolean {
  return isRequestAdminPreviewEnabled();
}
