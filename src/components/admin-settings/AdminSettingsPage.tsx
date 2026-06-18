import { settingsData } from "@/data/settingsData";
import type { AdminDashboardAccess } from "@/types/auth";
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
import { getLocalized } from "@/lib/i18n";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminWarningBanner } from "@/components/admin/AdminWarningBanner";

interface AdminSettingsPageProps {
  access: AdminDashboardAccess;
}

export function AdminSettingsPage({ access }: AdminSettingsPageProps) {
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

  const securityRows = [
    {
      label: lang === "ar" ? "معاينة محلية (خام)" : "Raw local preview flag",
      value: rawPreviewActive ? yes : no,
    },
    {
      label: lang === "ar" ? "معاينة مفعّلة (محلولة)" : "Resolved preview active",
      value: areAnyResolvedAdminPreviewFlagsEnabled() ? yes : no,
    },
    {
      label: lang === "ar" ? "مصادقة المشرف مفعّلة" : "Admin auth enabled",
      value: isAdminAuthFeatureEnabled() ? yes : no,
    },
    {
      label: lang === "ar" ? "البريد المسموح مُعدّ" : "Allowed emails configured",
      value: isAllowedAdminEmailsConfigured() ? yes : no,
    },
    {
      label: "Supabase configured",
      value: isSupabaseConfigured() ? yes : no,
    },
    {
      label: lang === "ar" ? "آمن للإنتاج" : "Production safe",
      value: safety.isProductionUnsafe ? no : yes,
    },
  ];

  const rows = [
    ...securityRows,
    {
      label: lang === "ar" ? "لوحة التحكم (خام → محلول)" : "Admin dashboard (raw → resolved)",
      value: `${isRawFeatureEnabled("showAdminDashboardPreview") ? "on" : "off"} → ${resolved.showAdminDashboardPreview ? "on" : "off"}`,
    },
    {
      label: lang === "ar" ? "إدارة المحتوى (خام → محلول)" : "Content admin (raw → resolved)",
      value: `${isRawFeatureEnabled("showContentAdminPreview") ? "on" : "off"} → ${resolved.showContentAdminPreview ? "on" : "off"}`,
    },
    {
      label: lang === "ar" ? "لوحة الطلبات (خام → محلول)" : "Requests (raw → resolved)",
      value: `${isRawFeatureEnabled("showRequestAdminPreview") ? "on" : "off"} → ${resolved.showRequestAdminPreview ? "on" : "off"}`,
    },
    {
      label: lang === "ar" ? "دردشة المشرف (خام → محلول)" : "Admin chat (raw → resolved)",
      value: `${isRawFeatureEnabled("showChatAdminPreview") ? "on" : "off"} → ${resolved.showChatAdminPreview ? "on" : "off"}`,
    },
    {
      label: lang === "ar" ? "enableAdminAuth (خام → محلول)" : "enableAdminAuth (raw → resolved)",
      value: `${isRawFeatureEnabled("enableAdminAuth") ? "on" : "off"} → ${resolved.enableAdminAuth ? "on" : "off"}`,
    },
    {
      label: lang === "ar" ? "enableChatAi (خام → محلول)" : "enableChatAi (raw → resolved)",
      value: `${isRawFeatureEnabled("enableChatAi") ? "on" : "off"} → ${resolved.enableChatAi ? "on" : "off"}`,
    },
    {
      label: lang === "ar" ? "enableLiveChatRealtime (خام → محلول)" : "enableLiveChatRealtime (raw → resolved)",
      value: `${isRawFeatureEnabled("enableLiveChatRealtime") ? "on" : "off"} → ${resolved.enableLiveChatRealtime ? "on" : "off"}`,
    },
    { label: lang === "ar" ? "اسم الموقع" : "Website name", value: settingsData.brandName },
    { label: lang === "ar" ? "WhatsApp الرسمي" : "Official WhatsApp", value: settingsData.whatsappNumber },
    { label: lang === "ar" ? "رابط الموقع" : "Site URL", value: settingsData.websiteUrl },
    { label: lang === "ar" ? "البريد" : "Email", value: settingsData.email },
    { label: lang === "ar" ? "مسار الشعار" : "Logo path", value: settingsData.logo },
    {
      label: lang === "ar" ? "عنوان SEO" : "SEO title",
      value: getLocalized(settingsData.seoDefaults.title, lang),
    },
    {
      label: lang === "ar" ? "مصادقة جاهزة بالكامل" : "Auth fully configured",
      value: isAdminAuthConfigured() ? yes : no,
    },
  ];

  return (
    <AdminShell access={access}>
      <div className="space-y-6">
        <AdminWarningBanner access={access} />

        <div>
          <h1 className="text-2xl font-bold text-flash-text">
            {lang === "ar" ? "إعدادات الموقع" : "Site settings"}
          </h1>
          <p className="mt-2 text-sm text-flash-muted">
            {lang === "ar"
              ? "معاينة للقراءة فقط — لا تُعرض أسرار أو مفاتيح خدمة. الأعلام المحلولة تُطبَّق في الإنتاج."
              : "Read-only preview — no secrets shown. Resolved flags apply in production."}
          </p>
        </div>

        <div className="flash-card divide-y divide-slate-100">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
            >
              <dt className="text-sm font-medium text-flash-muted">{row.label}</dt>
              <dd className="text-sm font-semibold text-flash-text sm:text-end">{row.value}</dd>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
