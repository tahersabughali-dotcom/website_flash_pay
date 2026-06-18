import { countriesData } from "@/data/countriesData";
import { globalCountriesData } from "@/data/globalCountriesData";
import { globalCurrenciesData } from "@/data/globalCurrenciesData";
import { globalPaymentMethodsData } from "@/data/globalPaymentMethodsData";
import { globalReceivingMethodsData } from "@/data/globalReceivingMethodsData";
import type { GlobalCoverageStatus } from "@/types/globalCountry";
import type { AdminDashboardAccess } from "@/types/auth";
import { settingsData } from "@/data/settingsData";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { AdminWarningBanner } from "@/components/admin/AdminWarningBanner";

interface AdminCoveragePageProps {
  access: AdminDashboardAccess;
}

const STATUS_LABELS: Record<GlobalCoverageStatus, string> = {
  active: "نشط",
  supported: "مدعوم",
  available_by_request: "حسب الطلب",
  limited: "محدود",
  partner_network: "شبكة شركاء",
  coming_soon: "قريبًا",
  not_available: "غير متاح",
};

function countByStatus<T extends { status: GlobalCoverageStatus }>(items: T[]) {
  const counts: Partial<Record<GlobalCoverageStatus, number>> = {};
  for (const item of items) {
    counts[item.status] = (counts[item.status] ?? 0) + 1;
  }
  return counts;
}

export function AdminCoveragePage({ access }: AdminCoveragePageProps) {
  const lang = settingsData.defaultLanguage;

  const globalStatus = countByStatus(globalCountriesData);
  const currencyStatus = countByStatus(globalCurrenciesData);
  const paymentStatus = countByStatus(globalPaymentMethodsData);
  const receivingStatus = countByStatus(globalReceivingMethodsData);

  const statusRows = (Object.keys(STATUS_LABELS) as GlobalCoverageStatus[]).map((status) => ({
    status,
    label: STATUS_LABELS[status],
    countries: globalStatus[status] ?? 0,
    currencies: currencyStatus[status] ?? 0,
    payments: paymentStatus[status] ?? 0,
    receiving: receivingStatus[status] ?? 0,
  }));

  return (
    <AdminShell access={access}>
      <div className="space-y-6">
        <AdminWarningBanner access={access} />

        <div>
          <h1 className="text-2xl font-bold text-flash-text">
            {lang === "ar" ? "التغطية العالمية" : "Global coverage"}
          </h1>
          <p className="mt-2 text-sm text-flash-muted">
            {lang === "ar"
              ? "مراجعة داخلية للدول والعملات وطرق الدفع والاستلام."
              : "Internal review of countries, currencies, and payment methods."}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <AdminStatCard
            label={lang === "ar" ? "الدول التشغيلية" : "Operational countries"}
            value={countriesData.filter((c) => c.status === "active").length}
          />
          <AdminStatCard
            label={lang === "ar" ? "دليل الدول" : "Country directory"}
            value={globalCountriesData.length}
          />
          <AdminStatCard label={lang === "ar" ? "العملات" : "Currencies"} value={globalCurrenciesData.length} />
          <AdminStatCard
            label={lang === "ar" ? "طرق الدفع + الاستلام" : "Payment + receiving"}
            value={globalPaymentMethodsData.length + globalReceivingMethodsData.length}
          />
        </div>

        <p className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          {lang === "ar"
            ? "ظهور دولة أو عملة في الدليل لا يعني توفر الخدمة بشكل مؤكد."
            : "Listing a country or currency does not mean confirmed service availability."}
        </p>

        <div className="flash-card overflow-hidden">
          <div className="border-b border-slate-100 px-4 py-3">
            <h2 className="text-sm font-bold text-flash-text">
              {lang === "ar" ? "توزيع الحالات" : "Status distribution"}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-xs text-flash-muted">
                <tr>
                  <th className="px-4 py-2 text-start">الحالة</th>
                  <th className="px-4 py-2 text-start">الدول</th>
                  <th className="px-4 py-2 text-start">العملات</th>
                  <th className="px-4 py-2 text-start">الدفع</th>
                  <th className="px-4 py-2 text-start">الاستلام</th>
                </tr>
              </thead>
              <tbody>
                {statusRows.map((row) => (
                  <tr key={row.status} className="border-t border-slate-100">
                    <td className="px-4 py-2 font-medium text-flash-text">{row.label}</td>
                    <td className="px-4 py-2">{row.countries}</td>
                    <td className="px-4 py-2">{row.currencies}</td>
                    <td className="px-4 py-2">{row.payments}</td>
                    <td className="px-4 py-2">{row.receiving}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
