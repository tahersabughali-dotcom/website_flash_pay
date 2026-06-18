import { settingsData } from "@/data/settingsData";
import {
  isAdminAuthConfigured,
  isAdminAuthFeatureEnabled,
  isAllowedAdminEmailsConfigured,
} from "@/lib/auth/adminAccessConfig";
import { evaluateAdminProductionSafety } from "@/lib/auth/adminProductionSafety";
import {
  areAnyResolvedAdminPreviewFlagsEnabled,
  getResolvedFeatureFlags,
  isRawFeatureEnabled,
} from "@/lib/config/featureFlags";
import { isSupabaseConfigured } from "@/lib/supabase/isConfigured";

export function AdminSystemStatus() {
  const lang = settingsData.defaultLanguage;
  const safety = evaluateAdminProductionSafety();
  const resolved = getResolvedFeatureFlags();

  const yes = lang === "ar" ? "نعم" : "Yes";
  const no = lang === "ar" ? "لا" : "No";

  const rawPreviewActive =
    isRawFeatureEnabled("showAdminDashboardPreview") ||
    isRawFeatureEnabled("showContentAdminPreview") ||
    isRawFeatureEnabled("showChatAdminPreview") ||
    isRawFeatureEnabled("showRequestAdminPreview");

  const items = [
    {
      label: lang === "ar" ? "معاينة محلية (خام)" : "Raw local preview flag",
      value: rawPreviewActive ? yes : no,
      ok: !safety.isProduction || !rawPreviewActive,
    },
    {
      label: lang === "ar" ? "معاينة مفعّلة (محلولة)" : "Resolved preview active",
      value: areAnyResolvedAdminPreviewFlagsEnabled() ? yes : no,
      ok: !safety.isProductionUnsafe,
    },
    {
      label: lang === "ar" ? "مصادقة المشرف مفعّلة" : "Admin auth enabled",
      value: isAdminAuthFeatureEnabled() ? yes : no,
      ok: isAdminAuthFeatureEnabled(),
    },
    {
      label: lang === "ar" ? "البريد المسموح مُعدّ" : "Allowed emails configured",
      value: isAllowedAdminEmailsConfigured() ? yes : no,
      ok: isAllowedAdminEmailsConfigured(),
    },
    {
      label: "Supabase",
      value: isSupabaseConfigured() ? yes : no,
      ok: isSupabaseConfigured(),
    },
    {
      label: lang === "ar" ? "آمن للإنتاج" : "Production safe",
      value: safety.isProductionUnsafe ? no : yes,
      ok: !safety.isProductionUnsafe,
    },
    {
      label: lang === "ar" ? "لوحة الطلبات (محلولة)" : "Requests dashboard (resolved)",
      value: resolved.showRequestAdminPreview
        ? lang === "ar"
          ? "معاينة"
          : "Preview"
        : lang === "ar"
          ? "مخفية"
          : "Hidden",
      ok: resolved.showRequestAdminPreview,
    },
    {
      label: lang === "ar" ? "دردشة المشرف (محلولة)" : "Admin chat (resolved)",
      value: resolved.showChatAdminPreview
        ? lang === "ar"
          ? "معاينة"
          : "Preview"
        : lang === "ar"
          ? "مخفية"
          : "Hidden",
      ok: resolved.showChatAdminPreview,
    },
    {
      label: lang === "ar" ? "مصادقة جاهزة" : "Auth fully configured",
      value: isAdminAuthConfigured() ? yes : no,
      ok: isAdminAuthConfigured(),
    },
  ];

  return (
    <div className="flash-card p-5">
      <h2 className="text-base font-bold text-flash-text">
        {lang === "ar" ? "حالة النظام والأمان" : "System & security status"}
      </h2>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li
            key={item.label}
            className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2 text-sm"
          >
            <span className="text-flash-muted">{item.label}</span>
            <span
              className={
                item.ok ? "font-semibold text-emerald-700" : "font-medium text-amber-800"
              }
            >
              {item.value}
            </span>
          </li>
        ))}
      </ul>
      {safety.isProductionUnsafe && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-900">
          {lang === "ar"
            ? "تكوين غير آمن: معاينة الإدارة مفعّلة في الإنتاج بدون مصادقة كاملة."
            : "Unsafe configuration: admin preview enabled in production without full auth."}
        </p>
      )}
      <p className="mt-4 text-xs text-flash-muted">
        {lang === "ar"
          ? "لا تُعرض مفاتيح سرية أو قيم .env في هذه اللوحة."
          : "No secret keys or .env values are shown in this panel."}
      </p>
    </div>
  );
}
