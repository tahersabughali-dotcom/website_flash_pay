import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/types/chat";
import type { LanguageCode } from "@/types/common";
import { cn } from "@/lib/utils";
import { ChatMessageContent } from "./ChatMessageContent";

interface ChatMessagesProps {
  messages: ChatMessage[];
  lang: LanguageCode;
  isTyping?: boolean;
}

export function ChatMessages({ messages, lang, isTyping }: ChatMessagesProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-3 py-3 sm:px-4" aria-live="polite">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} lang={lang} />
      ))}
      {isTyping && (
        <div className="flex justify-start">
          <div className="rounded-2xl rounded-ee-md bg-white px-3 py-2 text-xs text-flash-muted shadow-sm ring-1 ring-slate-200">
            {lang === "ar" ? "جاري الكتابة..." : "Typing..."}
          </div>
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
}

function MessageBubble({ message, lang }: { message: ChatMessage; lang: LanguageCode }) {
  const isVisitor = message.sender === "visitor";
  const isSystem = message.sender === "system";

  return (
    <div className={cn("flex", isVisitor ? "justify-start" : "justify-end")}>
      <div
        className={cn(
          "max-w-[92%] rounded-2xl px-3 py-2.5 text-sm shadow-sm sm:max-w-[88%] sm:px-3.5 sm:py-3",
          isVisitor && "rounded-es-md bg-white text-flash-text ring-1 ring-slate-200",
          message.sender === "bot" &&
            "rounded-ee-md bg-flash-primary-light text-flash-text ring-1 ring-flash-primary/10",
          message.sender === "human" &&
            "rounded-ee-md bg-emerald-50 text-emerald-950 ring-1 ring-emerald-200",
          isSystem &&
            "mx-auto max-w-full rounded-xl bg-amber-50 text-amber-950 ring-1 ring-amber-200",
        )}
      >
        {!isVisitor && !isSystem && (
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide opacity-70">
            {message.sender === "human"
              ? lang === "ar"
                ? "موظف"
                : "Agent"
              : lang === "ar"
                ? "المساعد"
                : "Assistant"}
          </p>
        )}
        {message.content.includes("\n") || message.content.includes("/") ? (
          <ChatMessageContent content={message.content} />
        ) : (
          <p className="whitespace-pre-wrap leading-relaxed [overflow-wrap:anywhere]">{message.content}</p>
        )}
      </div>
    </div>
  );
}
