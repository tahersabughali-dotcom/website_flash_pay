import { settingsData } from "@/data/settingsData";
import { ADMIN_LOGIN_NOTICE } from "@/lib/auth/adminAuthNotes";

export function AdminAuthNotice() {
  const lang = settingsData.defaultLanguage;

  return (
    <div className="rounded-xl border border-flash-primary/20 bg-flash-primary-light px-4 py-3 text-sm text-flash-text">
      <p className="font-semibold text-flash-primary">
        {lang === "ar" ? "دخول فريق Flash Pay" : "Flash Pay team access"}
      </p>
      <p className="mt-1 leading-relaxed">{ADMIN_LOGIN_NOTICE[lang]}</p>
    </div>
  );
}
