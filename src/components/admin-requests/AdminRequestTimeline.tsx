import type { LanguageCode } from "@/types/common";
import type { AdminServiceRequest } from "@/types/adminRequest";
import { getLocalized } from "@/lib/i18n";

export function AdminRequestTimeline({
  request,
  lang,
}: {
  request: AdminServiceRequest;
  lang: LanguageCode;
}) {
  return (
    <div className="space-y-3">
      {request.timeline
        .slice()
        .reverse()
        .map((event) => (
          <div key={event.id} className="flex gap-3">
            <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-flash-primary" />
            <div>
              <p className="text-sm font-medium text-flash-text">
                {getLocalized(event.label, lang)}
              </p>
              {event.meta && <p className="text-xs text-flash-muted">{event.meta}</p>}
              <p className="text-[11px] text-flash-muted">
                {new Date(event.createdAt).toLocaleString(lang === "ar" ? "ar-EG" : "en-GB")}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
