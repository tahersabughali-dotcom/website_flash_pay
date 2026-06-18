import type { ChatSessionStatus } from "@/types/chat";
import type { LanguageCode } from "@/types/common";
import { sessionStatusLabel } from "@/lib/chat/chatUtils";
import { cn } from "@/lib/utils";

interface ChatStatusBadgeProps {
  status: ChatSessionStatus;
  lang: LanguageCode;
  className?: string;
}

export function ChatStatusBadge({ status, lang, className }: ChatStatusBadgeProps) {
  const tone =
    status === "waiting_for_human"
      ? "bg-amber-100 text-amber-800"
      : status === "human"
        ? "bg-emerald-100 text-emerald-800"
        : status === "closed"
          ? "bg-slate-100 text-slate-600"
          : "bg-flash-primary-light text-flash-primary";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        tone,
        className,
      )}
    >
      {sessionStatusLabel(status, lang)}
    </span>
  );
}
