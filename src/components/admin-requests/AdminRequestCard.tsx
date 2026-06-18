import type { LanguageCode } from "@/types/common";
import type { AdminServiceRequest } from "@/types/adminRequest";
import { AdminRequestPriorityBadge } from "./AdminRequestPriorityBadge";
import { AdminRequestStatusBadge } from "./AdminRequestStatusBadge";

export function AdminRequestCard({
  request,
  lang,
}: {
  request: AdminServiceRequest;
  lang: LanguageCode;
}) {
  return (
    <div className="flash-card p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-lg font-semibold text-flash-text">{request.requestNumber}</p>
          <p className="text-sm text-flash-muted">{request.requestType}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <AdminRequestStatusBadge status={request.status} lang={lang} />
          <AdminRequestPriorityBadge priority={request.priority} lang={lang} />
        </div>
      </div>
    </div>
  );
}
