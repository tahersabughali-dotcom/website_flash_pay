import type { AdminDashboardAccess } from "@/types/auth";
import { settingsData } from "@/data/settingsData";
import { AdminSecurityBanner } from "@/components/admin/AdminSecurityBanner";

interface AdminContentWarningProps {
  access: AdminDashboardAccess;
}

export function AdminContentWarning({ access }: AdminContentWarningProps) {
  const lang = settingsData.defaultLanguage;

  return (
    <div className="space-y-3">
      <AdminSecurityBanner extraWarnings={access.warnings} />
      <p className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-flash-muted">
        {lang === "ar"
          ? "هذه معاينة للمحتوى فقط — لا يتم حفظ أي تعديل من المتصفح. التحرير الحقيقي يتطلب ربط Supabase لاحقًا."
          : "Content preview only — no browser edits are saved. Real editing requires Supabase integration later."}
      </p>
    </div>
  );
}
