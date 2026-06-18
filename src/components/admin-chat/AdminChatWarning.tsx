import type { AdminChatAccess } from "@/types/auth";
import { AdminSecurityBanner } from "@/components/admin/AdminSecurityBanner";

interface AdminChatWarningProps {
  access: AdminChatAccess;
}

export function AdminChatWarning({ access }: AdminChatWarningProps) {
  const showStrongWarning =
    access.mode === "local_mock_preview" ||
    access.mode === "supabase_connected_preview" ||
    access.authState === "unauthenticated";

  if (!showStrongWarning && access.mode === "authenticated") {
    return null;
  }

  return <AdminSecurityBanner extraWarnings={access.warnings} />;
}
