/** Admin authentication and authorization types — Flash Pay Global Platform */

export type AdminRole = "super_admin" | "admin" | "support_agent" | "viewer";

export type AdminAuthState =
  | "unauthenticated"
  | "authenticated"
  | "loading"
  | "unauthorized";

/** Admin inbox access mode shown in UI */
export type AdminChatAccessMode =
  | "local_mock_preview"
  | "supabase_connected_preview"
  | "auth_required"
  | "production_blocked"
  | "authenticated";

export interface AdminPermissions {
  canViewChat: boolean;
  canReplyToChat: boolean;
  canCloseChat: boolean;
  canReopenChat: boolean;
  canMarkWaiting: boolean;
  canAddInternalNote: boolean;
  canManageAgents: boolean;
}

export interface AdminChatAccess {
  allowed: boolean;
  mode: AdminChatAccessMode;
  authState: AdminAuthState;
  email: string | null;
  role: AdminRole | null;
  permissions: AdminPermissions;
  warnings: string[];
  redirectTo?: string;
  connection?: AdminChatConnectionInfo;
}

/** Safe connection flags — no secret values */
export interface AdminChatConnectionInfo {
  supabaseConfigured: boolean;
  serviceRoleConfigured: boolean;
  siteUrlConfigured: boolean;
  realtimeFeatureEnabled: boolean;
  adminAuthFeatureEnabled: boolean;
  adminAuthConfigured: boolean;
}

export interface AdminEmailRoleEntry {
  email: string;
  role: AdminRole;
}

/** Request management dashboard access — local preview only until auth + DB */
export interface AdminRequestsAccess {
  allowed: boolean;
  mode: AdminChatAccessMode;
  authState: AdminAuthState;
  warnings: string[];
  redirectTo?: string;
}

/** Main admin dashboard access — local preview only until auth + DB */
export interface AdminDashboardAccess {
  allowed: boolean;
  mode: AdminChatAccessMode;
  authState: AdminAuthState;
  warnings: string[];
  redirectTo?: string;
}
