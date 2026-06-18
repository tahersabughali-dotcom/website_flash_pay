import type { AdminDashboardAccess } from "@/types/auth";
import { settingsData } from "@/data/settingsData";
import { getAdminDashboardStats } from "@/lib/admin/adminDashboardStats";
import { AdminQuickLinks } from "./AdminQuickLinks";
import { AdminShell } from "./AdminShell";
import { AdminStatCard } from "./AdminStatCard";
import { AdminSystemStatus } from "./AdminSystemStatus";
import { AdminWarningBanner } from "./AdminWarningBanner";

interface AdminDashboardPageProps {
  access: AdminDashboardAccess;
}

export function AdminDashboardPage({ access }: AdminDashboardPageProps) {
  const lang = settingsData.defaultLanguage;
  const stats = getAdminDashboardStats();

  const statCards = [
    { label: lang === "ar" ? "الخدمات النشطة" : "Active services", value: stats.servicesCount },
    {
      label: lang === "ar" ? "الدول التشغيلية" : "Operational countries",
      value: stats.operationalCountriesCount,
    },
    {
      label: lang === "ar" ? "دليل الدول العالمي" : "Global country directory",
      value: stats.globalDirectoryCountriesCount,
    },
    { label: lang === "ar" ? "العملات" : "Currencies", value: stats.currenciesCount },
    {
      label: lang === "ar" ? "طرق الدفع والاستلام" : "Payment & receiving methods",
      value: `${stats.paymentReceivingTotal}+`,
    },
    {
      label: lang === "ar" ? "طلبات محلية" : "Local requests",
      value: stats.localRequestsCount,
      hint: lang === "ar" ? "معاينة المتصفح" : "Browser preview",
    },
    {
      label: lang === "ar" ? "محادثات تجريبية" : "Preview chats",
      value: stats.localChatSessionsCount,
    },
    {
      label: lang === "ar" ? "مقالات الأكاديمية" : "Academy articles",
      value: stats.articlesCount,
    },
  ];

  return (
    <AdminShell access={access}>
      <div className="space-y-6">
        <AdminWarningBanner access={access} />

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-flash-text sm:text-3xl">
              {lang === "ar" ? "لوحة تحكم Flash Pay" : "Flash Pay Control Panel"}
            </h1>
            <span className="rounded-full bg-flash-primary-light px-2.5 py-0.5 text-xs font-semibold text-flash-primary">
              {lang === "ar" ? "وضع تجريبي محلي" : "Local preview mode"}
            </span>
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-flash-muted sm:text-base">
            {lang === "ar"
              ? "مركز إدارة داخلي تجريبي لمتابعة الطلبات، الدردشة، المحتوى، التغطية، وإعدادات الموقع."
              : "Internal preview hub for requests, chat, content, coverage, and site settings."}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => (
            <AdminStatCard key={card.label} {...card} />
          ))}
        </div>

        <div>
          <h2 className="mb-4 text-lg font-bold text-flash-text">
            {lang === "ar" ? "روابط سريعة" : "Quick links"}
          </h2>
          <AdminQuickLinks />
        </div>

        <AdminSystemStatus />
      </div>
    </AdminShell>
  );
}
