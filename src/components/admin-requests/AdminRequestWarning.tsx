import type { AdminRequestsAccess } from "@/types/auth";
import { AdminSecurityBanner } from "@/components/admin/AdminSecurityBanner";

interface AdminRequestWarningProps {
  access: AdminRequestsAccess;
}

export function AdminRequestWarning({ access }: AdminRequestWarningProps) {
  return <AdminSecurityBanner extraWarnings={access.warnings} />;
}
