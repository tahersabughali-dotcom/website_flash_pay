import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AdminCoveragePage } from "@/components/admin-coverage/AdminCoveragePage";
import { adminRouteMetadata } from "@/lib/admin/adminRouteMetadata";
import { resolveAdminCoverageAccess } from "@/lib/auth/resolveAdminDashboardAccess";

export const metadata: Metadata = {
  ...adminRouteMetadata,
  title: "Admin Coverage | Flash Pay",
};

export default async function AdminCoverageRoutePage() {
  const access = await resolveAdminCoverageAccess();

  if (!access.allowed) {
    if (access.redirectTo) {
      redirect(access.redirectTo);
    }
    notFound();
  }

  return <AdminCoveragePage access={access} />;
}
