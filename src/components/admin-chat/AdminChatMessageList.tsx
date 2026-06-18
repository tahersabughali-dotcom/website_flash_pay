import type { ChatMessage } from "@/types/chat";
import { settingsData } from "@/data/settingsData";
import { cn } from "@/lib/utils";

interface AdminChatMessageListProps {
  messages: ChatMessage[];
}

export function AdminChatMessageList({ messages }: AdminChatMessageListProps) {
  const lang = settingsData.defaultLanguage;

  return (
    <div className="flex-1 space-y-3 overflow-y-auto p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex",
            message.sender === "visitor" ? "justify-start" : "justify-end",
            message.sender === "system" && "justify-center",
          )}
        >
          <div
            className={cn(
              "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm",
              message.sender === "visitor" && "rounded-es-md bg-white ring-1 ring-slate-200",
              message.sender === "bot" && "rounded-ee-md bg-flash-primary-light text-flash-text",
              message.sender === "human" && "rounded-ee-md bg-emerald-50 text-emerald-950 ring-1 ring-emerald-200",
              message.sender === "system" && "max-w-full bg-amber-50 text-amber-950 ring-1 ring-amber-200",
            )}
          >
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide opacity-70">
            {senderLabel(message.sender, lang)}
          </p>
          <p className="whitespace-pre-wrap">{message.content}</p>
          <p className="mt-1 text-[10px] opacity-60">
            {new Date(message.createdAt).toLocaleString(lang === "ar" ? "ar-EG" : "en-GB")}
          </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function senderLabel(sender: ChatMessage["sender"], lang: "ar" | "en"): string {
  const labels = {
    visitor: { ar: "الزائر", en: "Visitor" },
    bot: { ar: "المساعد", en: "Assistant" },
    human: { ar: "موظف", en: "Agent" },
    system: { ar: "النظام", en: "System" },
  };
  return labels[sender][lang];
}
