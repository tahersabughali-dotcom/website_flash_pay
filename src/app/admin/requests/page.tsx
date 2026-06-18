import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AdminRequestsPage } from "@/components/admin-requests/AdminRequestsPage";
import { resolveAdminRequestsAccess } from "@/lib/auth/adminAuth";

export const metadata: Metadata = {
  title: "Admin Requests | Flash Pay",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminRequestsRoutePage() {
  const access = await resolveAdminRequestsAccess();

  if (!access.allowed) {
    if (access.redirectTo) {
      redirect(access.redirectTo);
    }
    notFound();
  }

  return <AdminRequestsPage access={access} />;
}
