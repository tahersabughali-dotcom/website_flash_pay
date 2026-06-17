import type { LanguageCode } from "@/types/common";
import type { Service } from "@/types/service";
import { serviceCategoriesData } from "@/data/serviceCategoriesData";
import { executionTypesData } from "@/data/executionTypesData";
import { getLocalized } from "@/lib/i18n";

interface ServiceInfoPanelProps {
  service: Service;
  lang: LanguageCode;
}

export function ServiceInfoPanel({ service, lang }: ServiceInfoPanelProps) {
  const category = serviceCategoriesData.find((item) => item.id === service.category);
  const execution = executionTypesData.find((item) => item.id === service.executionType);

  const rows = [
    {
      label: lang === "ar" ? "الفئة" : "Category",
      value: category ? getLocalized(category.label, lang) : service.category,
    },
    {
      label: lang === "ar" ? "نوع التنفيذ" : "Execution type",
      value: execution ? getLocalized(execution.label, lang) : service.executionType,
    },
    {
      label: lang === "ar" ? "الحالة" : "Status",
      value:
        service.status === "coming_soon"
          ? lang === "ar"
            ? "قريباً"
            : "Coming Soon"
          : lang === "ar"
            ? "نشط"
            : "Active",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-semibold text-flash-text">
        {lang === "ar" ? "معلومات الخدمة" : "Service info"}
      </h3>
      <dl className="mt-4 space-y-3">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="text-xs uppercase tracking-wide text-flash-muted">{row.label}</dt>
            <dd className="mt-1 text-sm font-medium text-flash-text">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
