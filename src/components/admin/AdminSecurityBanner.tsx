import { settingsData } from "@/data/settingsData";
import { ADMIN_SECURITY_WARNING } from "@/lib/auth/adminAuthNotes";

interface AdminSecurityBannerProps {
  extraWarnings?: string[];
}

export function AdminSecurityBanner({ extraWarnings = [] }: AdminSecurityBannerProps) {
  const lang = settingsData.defaultLanguage;

  return (
    <div
      role="alert"
      className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950"
    >
      <p className="font-semibold">{lang === "ar" ? "تنبيه أمان" : "Security notice"}</p>
      <p className="mt-1 leading-relaxed">{ADMIN_SECURITY_WARNING[lang]}</p>
      {extraWarnings.map((warning) => (
        <p key={warning} className="mt-2 text-xs text-amber-800">
          {warning}
        </p>
      ))}
    </div>
  );
}
