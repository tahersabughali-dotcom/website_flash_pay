import type { AdminChatStatusFilter } from "@/types/chat";
import { settingsData } from "@/data/settingsData";
import { sessionStatusLabel } from "@/lib/chat/chatUtils";
import { cn } from "@/lib/utils";

interface AdminChatStatusTabsProps {
  active: AdminChatStatusFilter;
  counts: Record<AdminChatStatusFilter, number>;
  onChange: (filter: AdminChatStatusFilter) => void;
}

const tabs: AdminChatStatusFilter[] = [
  "all",
  "waiting_for_human",
  "human",
  "bot",
  "closed",
];

export function AdminChatStatusTabs({ active, counts, onChange }: AdminChatStatusTabsProps) {
  const lang = settingsData.defaultLanguage;

  const label = (filter: AdminChatStatusFilter) => {
    if (filter === "all") return lang === "ar" ? "الكل" : "All";
    return sessionStatusLabel(filter, lang);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-medium transition",
            active === tab
              ? "bg-flash-primary text-white"
              : "bg-white text-flash-muted ring-1 ring-slate-200 hover:bg-flash-primary-light hover:text-flash-primary",
          )}
        >
          {label(tab)} ({counts[tab]})
        </button>
      ))}
    </div>
  );
}
