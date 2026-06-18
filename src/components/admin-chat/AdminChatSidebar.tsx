import type { AdminChatSession, AdminChatStatusFilter } from "@/types/chat";
import { settingsData } from "@/data/settingsData";
import { AdminChatSessionCard } from "./AdminChatSessionCard";
import { AdminChatStatusTabs } from "./AdminChatStatusTabs";

interface AdminChatSidebarProps {
  sessions: AdminChatSession[];
  filteredSessions: AdminChatSession[];
  selectedSessionId: string | null;
  statusFilter: AdminChatStatusFilter;
  statusCounts: Record<AdminChatStatusFilter, number>;
  onSelectSession: (sessionId: string) => void;
  onStatusFilterChange: (filter: AdminChatStatusFilter) => void;
}

export function AdminChatSidebar({
  filteredSessions,
  selectedSessionId,
  statusFilter,
  statusCounts,
  onSelectSession,
  onStatusFilterChange,
}: AdminChatSidebarProps) {
  const lang = settingsData.defaultLanguage;

  return (
    <aside className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-4">
        <h2 className="text-base font-semibold text-flash-text">
          {lang === "ar" ? "المحادثات" : "Conversations"}
        </h2>
        <p className="mt-1 text-xs text-flash-muted">
          {lang === "ar" ? "معاينة محلية — بيانات تجريبية" : "Local preview — mock data"}
        </p>
        <div className="mt-4">
          <AdminChatStatusTabs
            active={statusFilter}
            counts={statusCounts}
            onChange={onStatusFilterChange}
          />
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {filteredSessions.length > 0 ? (
          filteredSessions.map((session) => (
            <AdminChatSessionCard
              key={session.id}
              session={session}
              selected={session.id === selectedSessionId}
              onSelect={onSelectSession}
            />
          ))
        ) : (
          <p className="px-2 py-6 text-center text-sm text-flash-muted">
            {lang === "ar" ? "لا توجد محادثات في هذا التصفية." : "No conversations in this filter."}
          </p>
        )}
      </div>
    </aside>
  );
}
