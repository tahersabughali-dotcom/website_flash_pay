"use client";

import { useState } from "react";
import { settingsData } from "@/data/settingsData";
import {
  clearUnansweredQuestions,
  getUnansweredQuestions,
  type UnansweredQuestionEntry,
} from "@/lib/chat/unansweredQuestions";

export function AdminUnansweredQuestions() {
  const lang = settingsData.defaultLanguage;
  const [items, setItems] = useState<UnansweredQuestionEntry[]>(() =>
    typeof window !== "undefined" ? getUnansweredQuestions() : [],
  );

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-flash-muted">
        {lang === "ar"
          ? "لا توجد أسئلة غير مُجابة محليًا بعد (localStorage)."
          : "No locally logged unanswered questions yet (localStorage)."}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-flash-text">
          {lang === "ar" ? "أسئلة غير مُجابة (محلي)" : "Unanswered questions (local)"}
        </p>
        <button
          type="button"
          onClick={() => {
            clearUnansweredQuestions();
            setItems([]);
          }}
          className="text-xs text-flash-primary hover:underline"
        >
          {lang === "ar" ? "مسح" : "Clear"}
        </button>
      </div>
      <ul className="mt-3 max-h-40 space-y-2 overflow-y-auto text-xs text-flash-muted">
        {items.slice(0, 10).map((entry) => (
          <li key={`${entry.createdAt}-${entry.question}`} className="rounded-lg bg-flash-surface px-2 py-1">
            <span className="font-medium text-flash-text">{entry.question}</span>
            <span className="ms-2 opacity-60">{entry.lang}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
