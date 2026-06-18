import { useState } from "react";
import type { AdminChatSession } from "@/types/chat";
import type { AdminPermissions } from "@/types/auth";
import { settingsData } from "@/data/settingsData";

interface AdminChatComposerProps {
  session: AdminChatSession;
  permissions: AdminPermissions;
  onSendReply: (content: string) => void;
  onClose: () => void;
  onReopen: () => void;
  onMarkWaiting: () => void;
  onAddNote: (note: string) => void;
}

export function AdminChatComposer({
  session,
  permissions,
  onSendReply,
  onClose,
  onReopen,
  onMarkWaiting,
  onAddNote,
}: AdminChatComposerProps) {
  const lang = settingsData.defaultLanguage;
  const [reply, setReply] = useState("");
  const [note, setNote] = useState("");
  const isClosed = session.status === "closed";
  const readOnly = !permissions.canReplyToChat;

  const handleSend = (event: React.FormEvent) => {
    event.preventDefault();
    const text = reply.trim();
    if (!text || isClosed || !permissions.canReplyToChat) return;
    onSendReply(text);
    setReply("");
  };

  const handleAddNote = () => {
    const text = note.trim();
    if (!text || !permissions.canAddInternalNote) return;
    onAddNote(text);
    setNote("");
  };

  if (readOnly) {
    return (
      <div className="border-t border-slate-200 bg-white p-4 text-sm text-flash-muted">
        {lang === "ar"
          ? "عرض فقط — لا يمكنك الرد أو إدارة هذه المحادثة."
          : "View only — you cannot reply or manage this conversation."}
      </div>
    );
  }

  return (
    <div className="border-t border-slate-200 bg-white p-4">
      <form onSubmit={handleSend} className="space-y-3">
        <textarea
          value={reply}
          onChange={(event) => setReply(event.target.value)}
          rows={3}
          disabled={isClosed || !permissions.canReplyToChat}
          placeholder={
            lang === "ar" ? "اكتب رد الموظف..." : "Type an agent reply..."
          }
          className="w-full resize-none rounded-xl border border-slate-200 bg-flash-surface px-3 py-2 text-sm outline-none focus:border-flash-primary focus:ring-2 focus:ring-flash-primary/20 disabled:opacity-50"
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={isClosed || !reply.trim() || !permissions.canReplyToChat}
            className="flash-btn-primary !px-4 !py-2 !text-xs disabled:opacity-50"
          >
            {lang === "ar" ? "إرسال الرد" : "Send reply"}
          </button>
          {!isClosed && permissions.canMarkWaiting && (
            <button
              type="button"
              onClick={onMarkWaiting}
              className="flash-btn-secondary !px-3 !py-2 !text-xs"
            >
              {lang === "ar" ? "بانتظار موظف" : "Mark waiting"}
            </button>
          )}
          {!isClosed && permissions.canCloseChat ? (
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-flash-muted hover:bg-slate-50"
            >
              {lang === "ar" ? "إغلاق" : "Close"}
            </button>
          ) : null}
          {isClosed && permissions.canReopenChat ? (
            <button
              type="button"
              onClick={onReopen}
              className="flash-btn-secondary !px-3 !py-2 !text-xs"
            >
              {lang === "ar" ? "إعادة فتح" : "Reopen"}
            </button>
          ) : null}
        </div>
      </form>

      {permissions.canAddInternalNote && (
        <div className="mt-4 border-t border-slate-100 pt-4">
          <p className="text-xs font-medium text-flash-muted">
            {lang === "ar" ? "ملاحظة داخلية" : "Internal note"}
          </p>
          <div className="mt-2 flex gap-2">
            <input
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder={lang === "ar" ? "ملاحظة للفريق..." : "Team note..."}
              className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-flash-primary"
            />
            <button
              type="button"
              onClick={handleAddNote}
              className="shrink-0 rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium hover:bg-flash-primary-light"
            >
              {lang === "ar" ? "إضافة" : "Add"}
            </button>
          </div>
          {session.internalNotes.length > 0 && (
            <ul className="mt-3 space-y-1 text-xs text-flash-muted">
              {session.internalNotes.map((entry, index) => (
                <li key={`${session.id}-note-${index}`} className="rounded-lg bg-flash-surface px-2 py-1">
                  {entry}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
