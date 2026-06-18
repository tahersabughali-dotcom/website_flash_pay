import type { LanguageCode } from "@/types/common";
import type { AdminRequestPriority } from "@/types/adminRequest";
import { ADMIN_REQUEST_PRIORITY_LABELS } from "@/data/mockRequestsData";
import { getLocalized } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const TONE: Record<AdminRequestPriority, string> = {
  normal: "bg-slate-100 text-slate-700 ring-slate-200",
  high: "bg-orange-50 text-orange-900 ring-orange-200",
  urgent: "bg-red-50 text-red-800 ring-red-200",
};

export function AdminRequestPriorityBadge({
  priority,
  lang,
  className,
}: {
  priority: AdminRequestPriority;
  lang: LanguageCode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1",
        TONE[priority],
        className,
      )}
    >
      {getLocalized(ADMIN_REQUEST_PRIORITY_LABELS[priority], lang)}
    </span>
  );
}
