import type { AdminRole } from "@/types/auth";

/**
 * Static admin role metadata — no private emails here.
 * Email → role mapping is server-only via ADMIN_ALLOWED_EMAILS.
 */
export const adminRolesData = {
  roles: ["super_admin", "admin", "support_agent", "viewer"] as const satisfies readonly AdminRole[],
  labels: {
    super_admin: { ar: "مدير عام", en: "Super admin" },
    admin: { ar: "مدير", en: "Admin" },
    support_agent: { ar: "موظف دعم", en: "Support agent" },
    viewer: { ar: "عرض فقط", en: "Viewer" },
  } satisfies Record<AdminRole, { ar: string; en: string }>,
  defaultRole: "admin" as AdminRole,
} as const;
