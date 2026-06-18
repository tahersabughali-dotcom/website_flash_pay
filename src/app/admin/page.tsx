import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AdminDashboardPage } from "@/components/admin/AdminDashboardPage";
import { adminRouteMetadata } from "@/lib/admin/adminRouteMetadata";
import { resolveAdminDashboardAccess } from "@/lib/auth/resolveAdminDashboardAccess";

export const metadata: Metadata = {
  ...adminRouteMetadata,
  title: "Admin Dashboard | Flash Pay",
};

export default async function AdminDashboardRoutePage() {
  const access = await resolveAdminDashboardAccess();

  if (!access.allowed) {
    if (access.redirectTo) {
      redirect(access.redirectTo);
    }
    notFound();
  }

  return <AdminDashboardPage access={access} />;
}
