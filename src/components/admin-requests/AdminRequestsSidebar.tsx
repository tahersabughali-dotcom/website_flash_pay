import type { LanguageCode } from "@/types/common";

interface AdminRequestsSidebarProps {
  counts: {
    new: number;
    reviewing: number;
    waiting_for_customer: number;
    completed: number;
    urgent: number;
  };
  lang: LanguageCode;
}

export function AdminRequestsSidebar({ counts, lang }: AdminRequestsSidebarProps) {
  const cards = [
    { label: lang === "ar" ? "طلبات جديدة" : "New", value: counts.new },
    { label: lang === "ar" ? "قيد المراجعة" : "In review", value: counts.reviewing },
    {
      label: lang === "ar" ? "بانتظار العميل" : "Waiting for customer",
      value: counts.waiting_for_customer,
    },
    { label: lang === "ar" ? "مكتملة" : "Completed", value: counts.completed },
    { label: lang === "ar" ? "عاجلة" : "Urgent", value: counts.urgent },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
      {cards.map((card) => (
        <div key={card.label} className="flash-card p-4">
          <p className="text-xs text-flash-muted">{card.label}</p>
          <p className="mt-1 text-2xl font-bold text-flash-text">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
