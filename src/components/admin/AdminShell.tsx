import type { AdminDashboardAccess } from "@/types/auth";
import { getTextDirection } from "@/lib/i18n";
import { settingsData } from "@/data/settingsData";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";

interface AdminShellProps {
  access: AdminDashboardAccess;
  children: React.ReactNode;
}

export function AdminShell({ access, children }: AdminShellProps) {
  const lang = settingsData.defaultLanguage;
  const dir = getTextDirection(lang);

  return (
    <div dir={dir} className="min-h-screen bg-flash-surface">
      <div className="lg:flex">
        <AdminSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminTopbar />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-5 sm:px-6 sm:py-6">
            {children}
          </main>
        </div>
      </div>
      {access.mode === "local_mock_preview" && (
        <p className="sr-only">Local admin preview — authentication bypassed</p>
      )}
    </div>
  );
}
