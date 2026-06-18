import type { AdminChatSession } from "@/types/chat";
import { settingsData } from "@/data/settingsData";
import { sessionStatusLabel } from "@/lib/chat/chatUtils";
import { cn } from "@/lib/utils";

interface AdminChatSessionCardProps {
  session: AdminChatSession;
  selected: boolean;
  onSelect: (sessionId: string) => void;
}

export function AdminChatSessionCard({ session, selected, onSelect }: AdminChatSessionCardProps) {
  const lang = settingsData.defaultLanguage;

  return (
    <button
      type="button"
      onClick={() => onSelect(session.id)}
      className={cn(
        "w-full rounded-xl border p-3 text-start transition",
        selected
          ? "border-flash-primary bg-flash-primary-light shadow-sm"
          : "border-slate-200 bg-white hover:border-flash-primary/30 hover:bg-flash-surface",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="truncate text-sm font-semibold text-flash-text">{session.visitorName}</p>
        {session.priority === "high" && (
          <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
            {lang === "ar" ? "مهم" : "High"}
          </span>
        )}
      </div>
      {session.country && (
        <p className="mt-1 text-xs text-flash-muted">{session.country}</p>
      )}
      <p className="mt-2 line-clamp-2 text-xs text-flash-text">{session.lastMessage}</p>
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-flash-primary ring-1 ring-flash-primary/15">
          {sessionStatusLabel(session.status, lang)}
        </span>
        <span className="text-[10px] text-flash-muted">
          {new Date(session.updatedAt).toLocaleTimeString(lang === "ar" ? "ar-EG" : "en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </button>
  );
}
