"use client";

import { useState } from "react";
import type { LanguageCode, LocalizedString } from "@/types/common";
import { getLocalized } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: LocalizedString;
  answer: LocalizedString;
}

interface FAQAccordionProps {
  items: FAQItem[];
  lang: LanguageCode;
  className?: string;
}

export function FAQAccordion({ items, lang, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={index} className="rounded-xl border border-slate-200 bg-white">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex w-full items-center justify-between px-4 py-4 text-start text-sm font-medium text-flash-text"
            >
              {getLocalized(item.question, lang)}
              <span className="text-flash-muted">{open ? "−" : "+"}</span>
            </button>
            {open && (
              <div className="border-t border-slate-100 px-4 py-4 text-sm text-flash-muted">
                {getLocalized(item.answer, lang)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
