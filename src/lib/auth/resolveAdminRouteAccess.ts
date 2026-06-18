import type { AdminChatAccessMode, AdminAuthState } from "@/types/auth";
import {
  isAdminAuthConfigured,
  isAdminDashboardPreviewEnabled,
  isAdminPreviewEnabled,
  isContentAdminPreviewEnabled,
  isProductionEnvironment,
  isRequestAdminPreviewEnabled,
} from "@/lib/auth/adminAccessConfig";

export type AdminProtectedRoute =
  | "dashboard"
  | "content"
  | "coverage"
  | "settings"
  | "requests"
  | "chat";

export interface AdminRouteGateResult {
  allowed: boolean;
  mode: AdminChatAccessMode;
  authState: AdminAuthState;
  warnings: string[];
  redirectTo?: string;
}

export function isAdminRoutePreviewEnabled(route: AdminProtectedRoute): boolean {
  switch (route) {
    case "dashboard":
    case "coverage":
    case "settings":
      return isAdminDashboardPreviewEnabled();
    case "content":
      return isAdminDashboardPreviewEnabled() && isContentAdminPreviewEnabled();
    case "requests":
      return isRequestAdminPreviewEnabled();
    case "chat":
      return isAdminPreviewEnabled();
    default:
      return false;
  }
}

export function isAdminPathPreviewEnabled(pathname: string): boolean {
  if (pathname === "/admin/login") return true;
  if (
    pathname === "/admin" ||
    pathname.startsWith("/admin/coverage") ||
    pathname.startsWith("/admin/settings")
  ) {
    return isAdminDashboardPreviewEnabled();
  }
  if (pathname.startsWith("/admin/content")) return isAdminRoutePreviewEnabled("content");
  if (pathname.startsWith("/admin/requests")) return isRequestAdminPreviewEnabled();
  if (pathname.startsWith("/admin/chat")) return isAdminPreviewEnabled();
  return false;
}

function previewDisabledMessage(route: AdminProtectedRoute, isProd: boolean): string {
  if (isProd) {
    return "Admin preview is disabled. Enable enableAdminAuth with Supabase before production use.";
  }
  switch (route) {
    case "content":
      return "showAdminDashboardPreview or showContentAdminPreview is off.";
    case "requests":
      return "showRequestAdminPreview is off.";
    case "chat":
      return "showChatAdminPreview is off.";
    default:
      return "showAdminDashboardPreview is off.";
  }
}

export async function resolveAdminRouteGate(
  route: AdminProtectedRoute,
  options?: {
    resolveSession?: () => Promise<{ email: string | null; authenticated: boolean }>;
    getRole?: (email: string) => import("@/types/auth").AdminRole | null;
    canAccess?: (role: import("@/types/auth").AdminRole) => boolean;
  },
): Promise<AdminRouteGateResult> {
  const isProd = isProductionEnvironment();
  const previewEnabled = isAdminRoutePreviewEnabled(route);
  const authConfigured = isAdminAuthConfigured();

  if (!previewEnabled) {
    return {
      allowed: false,
      mode: "production_blocked",
      authState: "unauthorized",
      warnings: [previewDisabledMessage(route, isProd)],
    };
  }

  if (isProd && !authConfigured) {
    return {
      allowed: false,
      mode: "production_blocked",
      authState: "unauthorized",
      warnings: [
        "Production admin routes blocked until Supabase Auth and ADMIN_ALLOWED_EMAILS are configured.",
      ],
      redirectTo: "/admin/login",
    };
  }

  if (authConfigured && options?.resolveSession && options.getRole && options.canAccess) {
    const { email, authenticated } = await options.resolveSession();
    if (authenticated && email) {
      const role = options.getRole(email);
      if (role && options.canAccess(role)) {
        return {
          allowed: true,
          mode: "authenticated",
          authState: "authenticated",
          warnings: [],
        };
      }
      return {
        allowed: false,
        mode: "auth_required",
        authState: "unauthorized",
        warnings: ["Signed-in email is not in ADMIN_ALLOWED_EMAILS."],
        redirectTo: "/admin/login",
      };
    }

    if (isProd) {
      return {
        allowed: false,
        mode: "auth_required",
        authState: "unauthenticated",
        warnings: ["Authentication required for admin routes in production."],
        redirectTo: "/admin/login",
      };
    }
  }

  return {
    allowed: true,
    mode: "local_mock_preview",
    authState: "unauthenticated",
    warnings: [
      "Local preview mode — not production-safe. Authentication bypassed in development only.",
      "Hidden URL is not security. Enable authentication before production.",
    ],
  };
}
