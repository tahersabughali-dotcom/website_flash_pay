"use client";

import { useMemo } from "react";
import type { AdminRequestsAccess } from "@/types/auth";
import { settingsData } from "@/data/settingsData";
import { useAdminRequestsStore } from "@/lib/requests/useAdminRequestsStore";
import { getTextDirection } from "@/lib/i18n";
import { AdminRequestDetail } from "./AdminRequestDetail";
import { AdminRequestEmptyState } from "./AdminRequestEmptyState";
import { AdminRequestFiltersBar } from "./AdminRequestFilters";
import { AdminRequestWarning } from "./AdminRequestWarning";
import { AdminRequestsSidebar } from "./AdminRequestsSidebar";
import { AdminRequestsTable } from "./AdminRequestsTable";

interface AdminRequestsPageProps {
  access: AdminRequestsAccess;
}

export function AdminRequestsPage({ access }: AdminRequestsPageProps) {
  const lang = settingsData.defaultLanguage;
  const dir = getTextDirection(lang);
  const store = useAdminRequestsStore();

  const requestTypes = useMemo(
    () => [...new Set(store.requests.map((item) => item.requestType))].sort(),
    [store.requests],
  );

  return (
    <div dir={dir} className="min-h-screen bg-flash-surface">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-wide text-flash-primary">
            Flash Pay Admin
          </p>
          <h1 className="mt-1 text-2xl font-bold text-flash-text sm:text-3xl">
            {lang === "ar" ? "إدارة الطلبات" : "Request Management"}
          </h1>
          <p className="mt-2 text-sm text-flash-muted">
            {lang === "ar"
              ? "معاينة محلية — البيانات مخزنة في المتصفح فقط"
              : "Local preview — data stored in browser only"}
          </p>
        </div>

        <AdminRequestWarning access={access} />

        <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
          <AdminRequestsSidebar counts={store.counts} lang={lang} />

          <div className="space-y-4">
            <AdminRequestFiltersBar
              filters={store.filters}
              onChange={store.setFilters}
              requestTypes={requestTypes}
              lang={lang}
            />

            {store.filtered.length === 0 ? (
              <AdminRequestEmptyState lang={lang} />
            ) : (
              <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
                <AdminRequestsTable
                  requests={store.filtered}
                  selectedId={store.selectedId}
                  onSelect={store.setSelectedId}
                  lang={lang}
                />
                {store.selected ? (
                  <AdminRequestDetail
                    request={store.selected}
                    lang={lang}
                    onStatusChange={(status) => store.setStatus(store.selected!.id, status)}
                    onPriorityChange={(priority) =>
                      store.setPriority(store.selected!.id, priority)
                    }
                    onAddNote={(content) =>
                      store.addNote(store.selected!.id, "Admin Preview", content)
                    }
                    onArchive={() => store.archive(store.selected!.id)}
                  />
                ) : (
                  <div className="flash-card flex items-center justify-center p-8 text-sm text-flash-muted">
                    {lang === "ar" ? "اختر طلبًا لعرض التفاصيل" : "Select a request to view details"}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
