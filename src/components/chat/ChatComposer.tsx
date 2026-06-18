import { useState } from "react";
import type { ChatSessionStatus } from "@/types/chat";
import type { LanguageCode } from "@/types/common";
import { chatData } from "@/data/chatData";
import { FORM_LIMITS } from "@/lib/forms/validation";
import { getLocalized } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface ChatComposerProps {
  lang: LanguageCode;
  status: ChatSessionStatus;
  onSend: (text: string) => void;
  onRequestHuman: () => void;
  disabled?: boolean;
}

export function ChatComposer({
  lang,
  status,
  onSend,
  onRequestHuman,
  disabled,
}: ChatComposerProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
  };

  return (
    <div className="border-t border-slate-200 bg-white p-3">
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          rows={2}
          maxLength={FORM_LIMITS.messageMax}
          disabled={disabled || status === "closed"}
          placeholder={getLocalized(chatData.uiLabels.placeholder, lang)}
          className="min-h-[44px] flex-1 resize-none rounded-xl border border-slate-200 bg-flash-surface px-3 py-2 text-sm text-flash-text outline-none transition focus:border-flash-primary focus:ring-2 focus:ring-flash-primary/20"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim() || status === "closed"}
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-flash-primary px-4 text-sm font-semibold text-white transition hover:bg-flash-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {getLocalized(chatData.uiLabels.send, lang)}
        </button>
      </form>

      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onRequestHuman}
          disabled={disabled || status === "waiting_for_human" || status === "closed"}
          className={cn(
            "rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-flash-text transition hover:border-flash-primary/30 hover:bg-flash-primary-light",
            (status === "waiting_for_human" || status === "closed") &&
              "cursor-not-allowed opacity-50",
          )}
        >
          {getLocalized(chatData.uiLabels.talkToHuman, lang)}
        </button>
      </div>
    </div>
  );
}
