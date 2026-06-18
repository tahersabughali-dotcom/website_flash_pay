import type { AdminChatSession } from "@/types/chat";
import type { AdminPermissions } from "@/types/auth";
import { settingsData } from "@/data/settingsData";
import { sessionStatusLabel } from "@/lib/chat/chatUtils";
import { AdminChatComposer } from "./AdminChatComposer";
import { AdminChatMessageList } from "./AdminChatMessageList";

interface AdminChatConversationProps {
  session: AdminChatSession;
  permissions: AdminPermissions;
  onSendReply: (content: string) => void;
  onClose: () => void;
  onReopen: () => void;
  onMarkWaiting: () => void;
  onAddNote: (note: string) => void;
}

export function AdminChatConversation({
  session,
  permissions,
  onSendReply,
  onClose,
  onReopen,
  onMarkWaiting,
  onAddNote,
}: AdminChatConversationProps) {
  const lang = settingsData.defaultLanguage;

  return (
    <section className="flex h-full min-h-[520px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-flash-surface shadow-sm">
      <header className="border-b border-slate-200 bg-white px-4 py-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-flash-text">{session.visitorName}</h2>
            <p className="mt-1 text-sm text-flash-muted">
              {[session.country, session.visitorContact].filter(Boolean).join(" · ")}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-flash-primary-light px-3 py-1 text-xs font-medium text-flash-primary">
              {sessionStatusLabel(session.status, lang)}
            </span>
            {session.priority === "high" && (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                {lang === "ar" ? "أولوية عالية" : "High priority"}
              </span>
            )}
          </div>
        </div>
      </header>

      <AdminChatMessageList messages={session.messages} />

      {!permissions.canViewChat ? (
        <div className="border-t border-slate-200 bg-white p-4 text-sm text-flash-muted">
          {lang === "ar" ? "لا تملك صلاحية عرض هذه المحادثة." : "You do not have permission to view this conversation."}
        </div>
      ) : (
        <AdminChatComposer
          session={session}
          permissions={permissions}
          onSendReply={onSendReply}
          onClose={onClose}
          onReopen={onReopen}
          onMarkWaiting={onMarkWaiting}
          onAddNote={onAddNote}
        />
      )}
    </section>
  );
}
