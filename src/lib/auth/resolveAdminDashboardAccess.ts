import "server-only";

import type { AdminDashboardAccess } from "@/types/auth";
import { canAccessAdminChat } from "@/lib/auth/adminRoles";
import { getAdminRole } from "@/lib/auth/adminAuth";
import { createSupabaseServerClient } from "@/lib/supabase/serverAuth";
import {
  resolveAdminRouteGate,
  type AdminProtectedRoute,
} from "@/lib/auth/resolveAdminRouteAccess";

async function resolveAuthenticatedAdmin(): Promise<{
  email: string | null;
  authenticated: boolean;
}> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { email: null, authenticated: false };

  const { data, error } = await supabase.auth.getUser();
  const email = data.user?.email ?? null;
  return { email, authenticated: Boolean(email && !error) };
}

async function resolveRoute(route: AdminProtectedRoute): Promise<AdminDashboardAccess> {
  return resolveAdminRouteGate(route, {
    resolveSession: resolveAuthenticatedAdmin,
    getRole: getAdminRole,
    canAccess: canAccessAdminChat,
  });
}

export async function resolveAdminDashboardAccess(): Promise<AdminDashboardAccess> {
  return resolveRoute("dashboard");
}

export async function resolveAdminContentAccess(): Promise<AdminDashboardAccess> {
  return resolveRoute("content");
}

export async function resolveAdminCoverageAccess(): Promise<AdminDashboardAccess> {
  return resolveRoute("coverage");
}

export async function resolveAdminSettingsAccess(): Promise<AdminDashboardAccess> {
  return resolveRoute("settings");
}
