import type { Metadata } from "next";
import { AdminLoginPage } from "@/components/admin-auth/AdminLoginPage";

export const metadata: Metadata = {
  title: "Admin Login | Flash Pay",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginRoutePage() {
  return <AdminLoginPage />;
}
