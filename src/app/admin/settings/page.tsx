import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AdminSettingsPage } from "@/components/admin-settings/AdminSettingsPage";
import { adminRouteMetadata } from "@/lib/admin/adminRouteMetadata";
import { resolveAdminSettingsAccess } from "@/lib/auth/resolveAdminDashboardAccess";

export const metadata: Metadata = {
  ...adminRouteMetadata,
  title: "Admin Settings | Flash Pay",
};

export default async function AdminSettingsRoutePage() {
  const access = await resolveAdminSettingsAccess();

  if (!access.allowed) {
    if (access.redirectTo) {
      redirect(access.redirectTo);
    }
    notFound();
  }

  return <AdminSettingsPage access={access} />;
}
