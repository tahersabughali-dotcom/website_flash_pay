"use client";

import { useState } from "react";
import type { LanguageCode } from "@/types/common";
import { chatData } from "@/data/chatData";
import { getLocalized } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface ChatQuickRepliesProps {
  lang: LanguageCode;
  onSelect: (text: string) => void;
  disabled?: boolean;
}

export function ChatQuickReplies({ lang, onSelect, disabled }: ChatQuickRepliesProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const activeCategory =
    chatData.quickCategories.find((category) => category.id === activeCategoryId) ?? null;

  return (
    <div className="space-y-2 px-3 pb-2">
      <div className="flex flex-wrap gap-2">
        {chatData.quickCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            disabled={disabled}
            onClick={() =>
              setActiveCategoryId((current) =>
                current === category.id ? null : category.id,
              )
            }
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition",
              activeCategoryId === category.id
                ? "border-flash-primary bg-flash-primary text-white"
                : "border-flash-primary/20 bg-flash-primary-light text-flash-primary hover:border-flash-primary/40 hover:bg-white",
              disabled && "cursor-not-allowed opacity-50",
            )}
          >
            {getLocalized(category.label, lang)}
          </button>
        ))}
      </div>

      {activeCategory && (
        <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-2">
          {activeCategory.questions.map((question) => (
            <button
              key={question.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(getLocalized(question.label, lang))}
              className={cn(
                "rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-flash-text transition hover:border-flash-primary/30 hover:bg-flash-primary-light",
                disabled && "cursor-not-allowed opacity-50",
              )}
            >
              {getLocalized(question.label, lang)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
