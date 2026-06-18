import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AdminContentPage } from "@/components/admin-content/AdminContentPage";
import { adminRouteMetadata } from "@/lib/admin/adminRouteMetadata";
import { resolveAdminContentAccess } from "@/lib/auth/resolveAdminDashboardAccess";

export const metadata: Metadata = {
  ...adminRouteMetadata,
  title: "Admin Content | Flash Pay",
};

export default async function AdminContentRoutePage() {
  const access = await resolveAdminContentAccess();

  if (!access.allowed) {
    if (access.redirectTo) {
      redirect(access.redirectTo);
    }
    notFound();
  }

  return <AdminContentPage access={access} />;
}
