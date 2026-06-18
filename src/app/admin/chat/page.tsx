import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AdminChatPage } from "@/components/admin-chat/AdminChatPage";
import { resolveAdminChatAccess } from "@/lib/auth/adminAuth";

export const metadata: Metadata = {
  title: "Admin Chat | Flash Pay",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminChatRoutePage() {
  const access = await resolveAdminChatAccess();

  if (!access.allowed) {
    if (access.redirectTo) {
      redirect(access.redirectTo);
    }
    notFound();
  }

  return <AdminChatPage access={access} />;
}
