import { settingsData } from "@/data/settingsData";

export function AdminTopbar() {
  const lang = settingsData.defaultLanguage;

  return (
    <header className="hidden items-center justify-between border-b border-slate-200 bg-white px-6 py-4 lg:flex">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-flash-primary">
          Flash Pay
        </p>
        <p className="text-sm text-flash-muted">
          {lang === "ar" ? "لوحة تحكم داخلية" : "Internal control panel"}
        </p>
      </div>
      <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900">
        {lang === "ar" ? "وضع تجريبي محلي" : "Local preview mode"}
      </span>
    </header>
  );
}
