"use client";

import { useState } from "react";
import type { LanguageCode } from "@/types/common";
import type { AdminServiceRequest } from "@/types/adminRequest";

interface AdminRequestNotesProps {
  request: AdminServiceRequest;
  lang: LanguageCode;
  onAddNote: (content: string) => void;
}

export function AdminRequestNotes({ request, lang, onAddNote }: AdminRequestNotesProps) {
  const [note, setNote] = useState("");

  return (
    <div className="space-y-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!note.trim()) return;
          onAddNote(note.trim());
          setNote("");
        }}
        className="space-y-2"
      >
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder={lang === "ar" ? "ملاحظة داخلية للفريق..." : "Internal team note..."}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-flash-primary focus:ring-2 focus:ring-flash-primary/20"
        />
        <button type="submit" className="flash-btn-secondary text-xs">
          {lang === "ar" ? "إضافة ملاحظة" : "Add note"}
        </button>
      </form>
      <ul className="space-y-3">
        {request.internalNotes.length === 0 && (
          <li className="text-sm text-flash-muted">
            {lang === "ar" ? "لا توجد ملاحظات بعد." : "No notes yet."}
          </li>
        )}
        {request.internalNotes.map((entry) => (
          <li key={entry.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm text-flash-text">{entry.content}</p>
            <p className="mt-1 text-[11px] text-flash-muted">
              {entry.author} · {new Date(entry.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
