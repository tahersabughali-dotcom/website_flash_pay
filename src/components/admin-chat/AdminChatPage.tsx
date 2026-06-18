"use client";

import { useMemo } from "react";
import type { AdminChatAccess } from "@/types/auth";
import { settingsData } from "@/data/settingsData";
import { useAdminChatStore } from "@/lib/chat/adminChatStore";
import type { AdminChatStatusFilter } from "@/types/chat";
import { getTextDirection } from "@/lib/i18n";
import { AdminChatConversation } from "./AdminChatConversation";
import { AdminChatEmptyState } from "./AdminChatEmptyState";
import { AdminChatModeBanner } from "./AdminChatModeBanner";
import { AdminSupabaseStatusPanel } from "./AdminSupabaseStatusPanel";
import { AdminChatSidebar } from "./AdminChatSidebar";
import { AdminChatWarning } from "./AdminChatWarning";
import { AdminUnansweredQuestions } from "./AdminUnansweredQuestions";

interface AdminChatPageProps {
  access: AdminChatAccess;
}

export function AdminChatPage({ access }: AdminChatPageProps) {
  const lang = settingsData.defaultLanguage;
  const dir = getTextDirection(lang);
  const store = useAdminChatStore();
  const permissions = access.permissions;

  const statusCounts = useMemo(() => {
    const counts: Record<AdminChatStatusFilter, number> = {
      all: store.sessions.length,
      bot: 0,
      waiting_for_human: 0,
      human: 0,
      closed: 0,
    };

    for (const session of store.sessions) {
      counts[session.status] += 1;
    }

    return counts;
  }, [store.sessions]);

  const subtitle = useMemo(() => {
    if (access.mode === "authenticated") {
      return lang === "ar"
        ? "صندوق محادثات محمي — وصول مصرح"
        : "Protected inbox — authorized access";
    }
    if (store.isRemote) {
      return lang === "ar"
        ? "Supabase متصل — معاينة تطوير محلية"
        : "Supabase connected — local development preview";
    }
    return lang === "ar"
      ? "وضع محلي — بيانات تجريبية"
      : "Local mode — mock data";
  }, [access.mode, lang, store.isRemote]);

  return (
    <div dir={dir} className="min-h-screen bg-flash-surface">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
        <AdminChatModeBanner access={access} />
        <div className="mt-4">
          <AdminSupabaseStatusPanel
            serverConnection={access.connection}
            isRemote={store.isRemote}
          />
        </div>
        <div className="mt-4">
          <AdminChatWarning access={access} />
        </div>

        {store.loadError && store.isRemote && (
          <div
            role="alert"
            className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-950"
          >
            {lang === "ar"
              ? `تعذر تحميل جلسات Supabase: ${store.loadError}. تحقق من schema.sql وسياسات RLS المحلية.`
              : `Could not load Supabase sessions: ${store.loadError}. Check schema.sql and local RLS policies.`}
          </div>
        )}

        {store.isRemote && store.usePollingFallback && !store.loadError && (
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
            {lang === "ar"
              ? "Realtime غير نشط — يتم تحديث الصندوق كل 5 ثوانٍ. فعّل Realtime في Supabase للتحديث الفوري."
              : "Realtime is inactive — inbox refreshes every 5 seconds. Enable Supabase Realtime for instant updates."}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-flash-text">
              {lang === "ar" ? "صندوق محادثات Flash Pay" : "Flash Pay Chat Inbox"}
            </h1>
            <p className="mt-1 text-sm text-flash-muted">{subtitle}</p>
          </div>
          <p className="text-xs text-flash-muted">
            {lang === "ar"
              ? `${store.sessions.length} محادثة`
              : `${store.sessions.length} conversations`}
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[320px_1fr] lg:gap-6">
          <div className="min-h-[520px] lg:sticky lg:top-6 lg:self-start">
            <AdminChatSidebar
              sessions={store.sessions}
              filteredSessions={store.filteredSessions}
              selectedSessionId={store.selectedSessionId}
              statusFilter={store.statusFilter}
              statusCounts={statusCounts}
              onSelectSession={store.selectSession}
              onStatusFilterChange={store.setStatusFilter}
            />
          </div>

          <div className="min-h-[520px]">
            {store.selectedSession ? (
              <AdminChatConversation
                session={store.selectedSession}
                permissions={permissions}
                onSendReply={(content) =>
                  store.sendHumanReply(store.selectedSession!.id, content)
                }
                onClose={() => store.closeSession(store.selectedSession!.id)}
                onReopen={() => store.reopenSession(store.selectedSession!.id)}
                onMarkWaiting={() => store.markWaitingForHuman(store.selectedSession!.id)}
                onAddNote={(note) => store.addInternalNote(store.selectedSession!.id, note)}
              />
            ) : (
              <AdminChatEmptyState />
            )}
          </div>
        </div>

        <div className="mt-8">
          <AdminUnansweredQuestions />
        </div>
      </div>
    </div>
  );
}
