import Image from "next/image";
import type { ChatSessionStatus } from "@/types/chat";
import type { LanguageCode } from "@/types/common";
import { chatData } from "@/data/chatData";
import { getLocalized } from "@/lib/i18n";
import { ChatStatusBadge } from "./ChatStatusBadge";

const CHAT_MARK_SRC = "/images/logo-mark.png";

interface ChatHeaderProps {
  lang: LanguageCode;
  status: ChatSessionStatus;
  onClose: () => void;
}

export function ChatHeader({ lang, status, onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-slate-200/80 bg-gradient-to-l from-flash-primary to-flash-primary-dark px-4 py-3 text-white">
      <div className="flex min-w-0 items-start gap-3">
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-white/15 p-1">
          <Image
            src={CHAT_MARK_SRC}
            alt=""
            width={28}
            height={28}
            className="h-full w-full object-contain brightness-0 invert"
          />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold">{getLocalized(chatData.widgetTitle, lang)}</p>
          {chatData.widgetSubtitle && (
            <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-white/85">
              {getLocalized(chatData.widgetSubtitle, lang)}
            </p>
          )}
          <div className="mt-1.5">
            <ChatStatusBadge
              status={status}
              lang={lang}
              className="!bg-white/15 !text-white"
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15 transition hover:bg-white/25"
        aria-label={getLocalized(chatData.uiLabels.close, lang)}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
    </div>
  );
}
