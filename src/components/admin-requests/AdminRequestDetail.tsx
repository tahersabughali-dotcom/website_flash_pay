"use client";

import type { LanguageCode } from "@/types/common";
import type { AdminRequestPriority, AdminRequestStatus, AdminServiceRequest } from "@/types/adminRequest";
import { buildCustomerWhatsAppUrl } from "@/lib/requests/requestRepository";
import { resolveCountryLabel } from "@/lib/dataAccess";
import { AdminRequestNotes } from "./AdminRequestNotes";
import { AdminRequestPriorityBadge } from "./AdminRequestPriorityBadge";
import { AdminRequestStatusBadge } from "./AdminRequestStatusBadge";
import { AdminRequestTimeline } from "./AdminRequestTimeline";

const STATUS_ACTIONS: { status: AdminRequestStatus; ar: string; en: string }[] = [
  { status: "reviewing", ar: "قيد المراجعة", en: "Reviewing" },
  { status: "waiting_for_customer", ar: "بانتظار العميل", en: "Waiting" },
  { status: "quoted", ar: "تم تقديم سعر", en: "Quoted" },
  { status: "in_progress", ar: "قيد التنفيذ", en: "In progress" },
  { status: "completed", ar: "مكتمل", en: "Completed" },
  { status: "cancelled", ar: "ملغي", en: "Cancelled" },
];

interface AdminRequestDetailProps {
  request: AdminServiceRequest;
  lang: LanguageCode;
  onStatusChange: (status: AdminRequestStatus) => void;
  onPriorityChange: (priority: AdminRequestPriority) => void;
  onAddNote: (content: string) => void;
  onArchive: () => void;
}

export function AdminRequestDetail({
  request,
  lang,
  onStatusChange,
  onPriorityChange,
  onAddNote,
  onArchive,
}: AdminRequestDetailProps) {
  const whatsappUrl = buildCustomerWhatsAppUrl(request);

  return (
    <div className="flash-card space-y-6 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-flash-text">{request.requestNumber}</h2>
          <p className="text-sm text-flash-muted">{request.requestType}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <AdminRequestStatusBadge status={request.status} lang={lang} />
          <AdminRequestPriorityBadge priority={request.priority} lang={lang} />
        </div>
      </div>

      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <Info label={lang === "ar" ? "العميل" : "Customer"} value={request.customerName} />
        <Info label="WhatsApp" value={request.customerWhatsapp} />
        <Info
          label={lang === "ar" ? "المسار" : "Route"}
          value={
            request.fromCountry || request.toCountry
              ? `${request.fromCountry ? resolveCountryLabel(request.fromCountry, lang) : "—"} → ${request.toCountry ? resolveCountryLabel(request.toCountry, lang) : "—"}`
              : "—"
          }
        />
        <Info
          label={lang === "ar" ? "المبلغ" : "Amount"}
          value={request.amount ? `${request.amount} ${request.currency ?? ""}`.trim() : "—"}
        />
        <Info label={lang === "ar" ? "المصدر" : "Source"} value={request.source} />
        <Info label={lang === "ar" ? "المسؤول" : "Assigned"} value={request.assignedTo ?? "—"} />
      </dl>

      {request.notes && (
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-flash-muted">
            {lang === "ar" ? "ملاحظات العميل" : "Customer notes"}
          </p>
          <p className="mt-2 text-sm text-flash-text">{request.notes}</p>
        </div>
      )}

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-flash-muted">
          {lang === "ar" ? "معاينة رسالة WhatsApp" : "WhatsApp message preview"}
        </p>
        <pre className="mt-2 max-h-48 overflow-auto rounded-xl bg-slate-50 p-3 text-xs whitespace-pre-wrap text-flash-text">
          {request.whatsappMessagePreview}
        </pre>
      </div>

      <div className="flex flex-wrap gap-2">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flash-btn-primary text-xs">
          {lang === "ar" ? "فتح WhatsApp" : "Open WhatsApp"}
        </a>
        <button type="button" onClick={onArchive} className="flash-btn-secondary text-xs">
          {lang === "ar" ? "أرشفة" : "Archive"}
        </button>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-flash-text">
          {lang === "ar" ? "تغيير الحالة" : "Change status"}
        </p>
        <div className="flex flex-wrap gap-2">
          {STATUS_ACTIONS.map((action) => (
            <button
              key={action.status}
              type="button"
              onClick={() => onStatusChange(action.status)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-flash-primary hover:bg-flash-primary-light"
            >
              {lang === "ar" ? action.ar : action.en}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-flash-text">
          {lang === "ar" ? "الأولوية" : "Priority"}
        </p>
        <div className="flex flex-wrap gap-2">
          {(["normal", "high", "urgent"] as AdminRequestPriority[]).map((priority) => (
            <button
              key={priority}
              type="button"
              onClick={() => onPriorityChange(priority)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs"
            >
              <AdminRequestPriorityBadge priority={priority} lang={lang} />
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-flash-text">
          {lang === "ar" ? "الملاحظات الداخلية" : "Internal notes"}
        </p>
        <AdminRequestNotes request={request} lang={lang} onAddNote={onAddNote} />
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-flash-text">
          {lang === "ar" ? "السجل" : "Activity"}
        </p>
        <AdminRequestTimeline request={request} lang={lang} />
      </div>

      <p className="text-xs text-flash-muted">
        {lang === "ar"
          ? "تغيير الحالة لا يعني تنفيذًا ماليًا تلقائيًا — للمراجعة الداخلية فقط."
          : "Status changes do not imply automatic financial execution — internal review only."}
      </p>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-flash-muted">{label}</dt>
      <dd className="mt-1 font-medium text-flash-text">{value}</dd>
    </div>
  );
}
