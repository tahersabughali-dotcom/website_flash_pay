import type { LanguageCode } from "@/types/common";
import type { AdminRequestStatus } from "@/types/adminRequest";
import { ADMIN_REQUEST_STATUS_LABELS } from "@/data/mockRequestsData";
import { getLocalized } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const TONE: Record<AdminRequestStatus, string> = {
  new: "bg-blue-50 text-blue-800 ring-blue-200",
  reviewing: "bg-indigo-50 text-indigo-800 ring-indigo-200",
  waiting_for_customer: "bg-amber-50 text-amber-900 ring-amber-200",
  quoted: "bg-cyan-50 text-cyan-900 ring-cyan-200",
  in_progress: "bg-violet-50 text-violet-900 ring-violet-200",
  completed: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  cancelled: "bg-red-50 text-red-800 ring-red-200",
  archived: "bg-slate-100 text-slate-700 ring-slate-200",
};

export function AdminRequestStatusBadge({
  status,
  lang,
  className,
}: {
  status: AdminRequestStatus;
  lang: LanguageCode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1",
        TONE[status],
        className,
      )}
    >
      {getLocalized(ADMIN_REQUEST_STATUS_LABELS[status], lang)}
    </span>
  );
}
