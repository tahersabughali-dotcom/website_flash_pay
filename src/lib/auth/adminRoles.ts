import type { AdminPermissions, AdminRole } from "@/types/auth";
import { adminRolesData } from "@/data/adminRolesData";

export { adminRolesData };

const ROLE_PERMISSIONS: Record<AdminRole, AdminPermissions> = {
  super_admin: {
    canViewChat: true,
    canReplyToChat: true,
    canCloseChat: true,
    canReopenChat: true,
    canMarkWaiting: true,
    canAddInternalNote: true,
    canManageAgents: true,
  },
  admin: {
    canViewChat: true,
    canReplyToChat: true,
    canCloseChat: true,
    canReopenChat: true,
    canMarkWaiting: true,
    canAddInternalNote: true,
    canManageAgents: false,
  },
  support_agent: {
    canViewChat: true,
    canReplyToChat: true,
    canCloseChat: false,
    canReopenChat: false,
    canMarkWaiting: true,
    canAddInternalNote: true,
    canManageAgents: false,
  },
  viewer: {
    canViewChat: true,
    canReplyToChat: false,
    canCloseChat: false,
    canReopenChat: false,
    canMarkWaiting: false,
    canAddInternalNote: false,
    canManageAgents: false,
  },
};

/** Permissions for local development preview (clearly not production-safe) */
export const localPreviewPermissions: AdminPermissions = {
  ...ROLE_PERMISSIONS.admin,
  canManageAgents: false,
};

export function getPermissionsForRole(role: AdminRole | null): AdminPermissions {
  if (!role) {
    return ROLE_PERMISSIONS.viewer;
  }
  return ROLE_PERMISSIONS[role];
}

export function canAccessAdminChat(role: AdminRole | null): boolean {
  return Boolean(role && getPermissionsForRole(role).canViewChat);
}

export function canViewChat(role: AdminRole | null): boolean {
  return getPermissionsForRole(role).canViewChat;
}

export function canReplyToChat(role: AdminRole | null): boolean {
  return getPermissionsForRole(role).canReplyToChat;
}

export function canCloseChat(role: AdminRole | null): boolean {
  return getPermissionsForRole(role).canCloseChat;
}

export function canReopenChat(role: AdminRole | null): boolean {
  return getPermissionsForRole(role).canReopenChat;
}

export function canMarkWaitingForHuman(role: AdminRole | null): boolean {
  return getPermissionsForRole(role).canMarkWaiting;
}

export function canAddInternalNote(role: AdminRole | null): boolean {
  return getPermissionsForRole(role).canAddInternalNote;
}

export function canManageAgents(role: AdminRole | null): boolean {
  return getPermissionsForRole(role).canManageAgents;
}

export function isValidAdminRole(value: string): value is AdminRole {
  return (adminRolesData.roles as readonly string[]).includes(value);
}
