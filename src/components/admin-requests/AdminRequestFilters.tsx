"use client";

import type { LanguageCode } from "@/types/common";
import type { AdminRequestFilters } from "@/types/adminRequest";
import { ADMIN_REQUEST_SOURCE_LABELS } from "@/data/mockRequestsData";
import { getLocalized } from "@/lib/i18n";

interface AdminRequestFiltersProps {
  filters: AdminRequestFilters;
  onChange: (filters: AdminRequestFilters) => void;
  requestTypes: string[];
  lang: LanguageCode;
}

export function AdminRequestFiltersBar({
  filters,
  onChange,
  requestTypes,
  lang,
}: AdminRequestFiltersProps) {
  return (
    <div className="flash-filter-panel !lg:grid-cols-1 xl:grid-cols-4">
      <input
        type="search"
        value={filters.search ?? ""}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
        placeholder={
          lang === "ar" ? "بحث بالاسم / WhatsApp / رقم الطلب" : "Search name / WhatsApp / request #"
        }
        className="flash-filter-input xl:col-span-2"
      />
      <select
        value={filters.status ?? "all"}
        onChange={(e) =>
          onChange({ ...filters, status: e.target.value as AdminRequestFilters["status"] })
        }
        className="flash-filter-select"
      >
        <option value="all">{lang === "ar" ? "كل الحالات" : "All statuses"}</option>
        <option value="new">{lang === "ar" ? "طلب جديد" : "New"}</option>
        <option value="reviewing">{lang === "ar" ? "قيد المراجعة" : "Reviewing"}</option>
        <option value="waiting_for_customer">{lang === "ar" ? "بانتظار العميل" : "Waiting"}</option>
        <option value="quoted">{lang === "ar" ? "تم تقديم سعر" : "Quoted"}</option>
        <option value="in_progress">{lang === "ar" ? "قيد التنفيذ" : "In progress"}</option>
        <option value="completed">{lang === "ar" ? "مكتمل" : "Completed"}</option>
        <option value="cancelled">{lang === "ar" ? "ملغي" : "Cancelled"}</option>
      </select>
      <select
        value={filters.priority ?? "all"}
        onChange={(e) =>
          onChange({ ...filters, priority: e.target.value as AdminRequestFilters["priority"] })
        }
        className="flash-filter-select"
      >
        <option value="all">{lang === "ar" ? "كل الأولويات" : "All priorities"}</option>
        <option value="normal">{lang === "ar" ? "عادي" : "Normal"}</option>
        <option value="high">{lang === "ar" ? "مرتفع" : "High"}</option>
        <option value="urgent">{lang === "ar" ? "عاجل" : "Urgent"}</option>
      </select>
      <select
        value={filters.source ?? "all"}
        onChange={(e) =>
          onChange({ ...filters, source: e.target.value as AdminRequestFilters["source"] })
        }
        className="flash-filter-select"
      >
        <option value="all">{lang === "ar" ? "كل المصادر" : "All sources"}</option>
        {Object.entries(ADMIN_REQUEST_SOURCE_LABELS).map(([key, label]) => (
          <option key={key} value={key}>
            {getLocalized(label, lang)}
          </option>
        ))}
      </select>
      <select
        value={filters.requestType ?? ""}
        onChange={(e) => onChange({ ...filters, requestType: e.target.value || undefined })}
        className="flash-filter-select"
      >
        <option value="">{lang === "ar" ? "كل الأنواع" : "All types"}</option>
        {requestTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={filters.country ?? ""}
        onChange={(e) => onChange({ ...filters, country: e.target.value || undefined })}
        placeholder={lang === "ar" ? "رمز الدولة (eg, tr...)" : "Country slug (eg, tr...)"}
        className="flash-filter-input"
      />
      <input
        type="text"
        value={filters.currency ?? ""}
        onChange={(e) => onChange({ ...filters, currency: e.target.value || undefined })}
        placeholder={lang === "ar" ? "العملة (USD, EGP...)" : "Currency (USD, EGP...)"}
        className="flash-filter-input"
      />
    </div>
  );
}
