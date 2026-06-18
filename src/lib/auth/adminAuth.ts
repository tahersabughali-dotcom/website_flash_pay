import "server-only";

import type { AdminChatAccess, AdminChatConnectionInfo, AdminRequestsAccess, AdminRole } from "@/types/auth";
import {
  canAccessAdminChat,
  getPermissionsForRole,
  localPreviewPermissions,
} from "@/lib/auth/adminRoles";
import {
  isAdminAuthConfigured,
  isAdminPreviewEnabled,
  isLiveChatRealtimeEnabled,
  isProductionEnvironment,
  parseAllowedAdminEmails,
} from "@/lib/auth/adminAccessConfig";
import { isAdminAuthEnabled } from "@/lib/config/featureFlags";
import { createSupabaseServerClient } from "@/lib/supabase/serverAuth";
import { isSupabaseConfigured, isSupabaseAdminConfigured } from "@/lib/supabase/isConfigured";
import { resolveAdminRouteGate } from "@/lib/auth/resolveAdminRouteAccess";

function buildAdminConnectionInfo(): AdminChatConnectionInfo {
  return {
    supabaseConfigured: isSupabaseConfigured(),
    serviceRoleConfigured: isSupabaseAdminConfigured(),
    siteUrlConfigured: Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim()),
    realtimeFeatureEnabled: isLiveChatRealtimeEnabled(),
    adminAuthFeatureEnabled: isAdminAuthEnabled(),
    adminAuthConfigured: isAdminAuthConfigured(),
  };
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isAdminEmail(email: string): boolean {
  const normalized = normalizeEmail(email);
  return parseAllowedAdminEmails(process.env.ADMIN_ALLOWED_EMAILS).some(
    (entry) => entry.email === normalized,
  );
}

export function getAdminRole(email: string): AdminRole | null {
  const normalized = normalizeEmail(email);
  const entry = parseAllowedAdminEmails(process.env.ADMIN_ALLOWED_EMAILS).find(
    (item) => item.email === normalized,
  );
  return entry?.role ?? null;
}

export {
  canAccessAdminChat,
  canReplyToChat,
  canCloseChat,
  canViewChat,
} from "@/lib/auth/adminRoles";

export async function resolveAdminChatAccess(): Promise<AdminChatAccess> {
  const warnings: string[] = [];
  const isProd = isProductionEnvironment();
  const previewEnabled = isAdminPreviewEnabled();
  const supabaseReady = isSupabaseConfigured();
  const authConfigured = isAdminAuthConfigured();
  const remoteChat =
    supabaseReady &&
    (isLiveChatRealtimeEnabled() || (previewEnabled && !isProd));

  if (!previewEnabled && !authConfigured) {
    return {
      allowed: false,
      mode: "production_blocked",
      authState: "unauthorized",
      email: null,
      role: null,
      permissions: getPermissionsForRole(null),
      warnings: [
        isProd
          ? "Admin chat preview is disabled. Enable enableAdminAuth with Supabase Auth before production use."
          : "Admin chat preview flag is off.",
      ],
    };
  }

  if (supabaseReady && authConfigured) {
    const supabase = await createSupabaseServerClient();

    if (supabase) {
      const { data, error } = await supabase.auth.getUser();
      const email = data.user?.email ?? null;

      if (email && !error) {
        const role = getAdminRole(email);

        if (role && canAccessAdminChat(role)) {
          return {
            allowed: true,
            mode: "authenticated",
            authState: "authenticated",
            email,
            role,
            permissions: getPermissionsForRole(role),
            warnings,
            connection: buildAdminConnectionInfo(),
          };
        }

        return {
          allowed: false,
          mode: "auth_required",
          authState: "unauthorized",
          email,
          role: null,
          permissions: getPermissionsForRole(null),
          warnings: ["Signed-in email is not in ADMIN_ALLOWED_EMAILS."],
          redirectTo: "/admin/login",
        };
      }
    }

    if (isProd) {
      return {
        allowed: false,
        mode: "auth_required",
        authState: "unauthenticated",
        email: null,
        role: null,
        permissions: getPermissionsForRole(null),
        warnings: ["Authentication required for admin chat in production."],
        redirectTo: "/admin/login",
      };
    }
  }

  if (isProd) {
    return {
      allowed: false,
      mode: "production_blocked",
      authState: "unauthorized",
      email: null,
      role: null,
      permissions: getPermissionsForRole(null),
      warnings: [
        "Production admin chat is blocked until Supabase Auth and ADMIN_ALLOWED_EMAILS are configured.",
      ],
      redirectTo: "/admin/login",
    };
  }

  if (previewEnabled) {
    warnings.push(
      "Local preview mode — not production-safe. Authentication bypassed in development only.",
    );

    if (remoteChat && supabaseReady) {
      warnings.push("Supabase connected without authenticated admin session.");
    }

    return {
      allowed: true,
      mode: supabaseReady ? "supabase_connected_preview" : "local_mock_preview",
      authState: "unauthenticated",
      email: null,
      role: "admin",
      permissions: localPreviewPermissions,
      warnings,
      connection: buildAdminConnectionInfo(),
    };
  }

  return {
    allowed: false,
    mode: "auth_required",
    authState: "unauthenticated",
    email: null,
    role: null,
    permissions: getPermissionsForRole(null),
    warnings: ["Admin preview disabled."],
    redirectTo: "/admin/login",
  };
}

export async function resolveAdminRequestsAccess(): Promise<AdminRequestsAccess> {
  const supabase = await createSupabaseServerClient();

  return resolveAdminRouteGate("requests", {
    resolveSession: async () => {
      if (!supabase) return { email: null, authenticated: false };
      const { data, error } = await supabase.auth.getUser();
      const email = data.user?.email ?? null;
      return { email, authenticated: Boolean(email && !error) };
    },
    getRole: getAdminRole,
    canAccess: canAccessAdminChat,
  });
}
