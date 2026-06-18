import type { AdminDashboardAccess } from "@/types/auth";
import { AdminSecurityBanner } from "./AdminSecurityBanner";

interface AdminWarningBannerProps {
  access: AdminDashboardAccess;
}

export function AdminWarningBanner({ access }: AdminWarningBannerProps) {
  return <AdminSecurityBanner extraWarnings={access.warnings} />;
}
