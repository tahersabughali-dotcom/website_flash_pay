import type { ChatMessage, ChatSessionStatus } from "@/types/chat";
import type { LanguageCode } from "@/types/common";
import { ChatComposer } from "./ChatComposer";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatQuickReplies } from "./ChatQuickReplies";
import { HumanHandoffNotice } from "./HumanHandoffNotice";

interface ChatWindowProps {
  lang: LanguageCode;
  messages: ChatMessage[];
  status: ChatSessionStatus;
  isTyping: boolean;
  onClose: () => void;
  onSend: (text: string) => void;
  onQuickSelect: (text: string) => void;
  onRequestHuman: () => void;
}

export function ChatWindow({
  lang,
  messages,
  status,
  isTyping,
  onClose,
  onSend,
  onQuickSelect,
  onRequestHuman,
}: ChatWindowProps) {
  const showHandoff = status === "waiting_for_human";

  return (
    <div
      className="flex h-[min(70vh,520px)] w-[min(calc(100vw-1rem),380px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-flash-surface shadow-2xl ring-1 ring-black/5 max-sm:h-[min(68vh,480px)]"
      role="dialog"
      aria-modal="false"
      aria-label={lang === "ar" ? "نافذة المحادثة" : "Chat window"}
    >
      <ChatHeader lang={lang} status={status} onClose={onClose} />

      {showHandoff && (
        <div className="border-b border-amber-100 bg-white px-3 py-3">
          <HumanHandoffNotice lang={lang} />
        </div>
      )}

      <ChatMessages messages={messages} lang={lang} isTyping={isTyping} />

      {status === "bot" && messages.length <= 3 && (
        <ChatQuickReplies lang={lang} onSelect={onQuickSelect} disabled={isTyping} />
      )}

      <ChatComposer
        lang={lang}
        status={status}
        onSend={onSend}
        onRequestHuman={onRequestHuman}
        disabled={isTyping}
      />
    </div>
  );
}
