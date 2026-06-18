"use client";

import type { LanguageCode } from "@/types/common";
import type { AdminServiceRequest } from "@/types/adminRequest";
import { AdminRequestPriorityBadge } from "./AdminRequestPriorityBadge";
import { AdminRequestStatusBadge } from "./AdminRequestStatusBadge";
import { cn } from "@/lib/utils";

interface AdminRequestsTableProps {
  requests: AdminServiceRequest[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  lang: LanguageCode;
}

export function AdminRequestsTable({
  requests,
  selectedId,
  onSelect,
  lang,
}: AdminRequestsTableProps) {
  return (
    <div className="flash-card overflow-hidden">
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-flash-muted">
            <tr>
              <th className="px-4 py-3 text-start">{lang === "ar" ? "الطلب" : "Request"}</th>
              <th className="px-4 py-3 text-start">{lang === "ar" ? "العميل" : "Customer"}</th>
              <th className="px-4 py-3 text-start">{lang === "ar" ? "المبلغ" : "Amount"}</th>
              <th className="px-4 py-3 text-start">{lang === "ar" ? "الحالة" : "Status"}</th>
              <th className="px-4 py-3 text-start">{lang === "ar" ? "الأولوية" : "Priority"}</th>
              <th className="px-4 py-3 text-start">{lang === "ar" ? "التاريخ" : "Created"}</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr
                key={request.id}
                className={cn(
                  "cursor-pointer border-t border-slate-100 hover:bg-flash-primary-light/40",
                  selectedId === request.id && "bg-flash-primary-light/60",
                )}
                onClick={() => onSelect(request.id)}
              >
                <td className="px-4 py-3">
                  <p className="font-semibold text-flash-text">{request.requestNumber}</p>
                  <p className="text-xs text-flash-muted">{request.requestType}</p>
                </td>
                <td className="px-4 py-3">
                  <p>{request.customerName}</p>
                  <p className="text-xs text-flash-muted">{request.customerWhatsapp}</p>
                </td>
                <td className="px-4 py-3">
                  {request.amount ? `${request.amount} ${request.currency ?? ""}`.trim() : "—"}
                </td>
                <td className="px-4 py-3">
                  <AdminRequestStatusBadge status={request.status} lang={lang} />
                </td>
                <td className="px-4 py-3">
                  <AdminRequestPriorityBadge priority={request.priority} lang={lang} />
                </td>
                <td className="px-4 py-3 text-xs text-flash-muted">
                  {new Date(request.createdAt).toLocaleString(lang === "ar" ? "ar-EG" : "en-GB")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="space-y-3 p-3 md:hidden">
        {requests.map((request) => (
          <button
            key={request.id}
            type="button"
            onClick={() => onSelect(request.id)}
            className={cn(
              "w-full rounded-xl border border-slate-200 p-3 text-start",
              selectedId === request.id && "border-flash-primary bg-flash-primary-light/40",
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-flash-text">{request.requestNumber}</p>
                <p className="text-xs text-flash-muted">{request.requestType}</p>
              </div>
              <AdminRequestStatusBadge status={request.status} lang={lang} />
            </div>
            <p className="mt-2 text-sm">{request.customerName}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
