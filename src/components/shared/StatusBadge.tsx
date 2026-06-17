import type { EntityStatus } from "@/types/common";
import { cn } from "@/lib/utils";

const statusStyles: Record<EntityStatus, string> = {
  active: "bg-emerald-100 text-emerald-800",
  hidden: "bg-slate-100 text-slate-600",
  coming_soon: "bg-amber-100 text-amber-800",
  disabled: "bg-slate-100 text-slate-500",
  beta: "bg-blue-100 text-blue-800",
  archived: "bg-slate-100 text-slate-500",
  draft: "bg-slate-100 text-slate-500",
  published: "bg-emerald-100 text-emerald-800",
};

interface StatusBadgeProps {
  status: EntityStatus;
  label: string;
  className?: string;
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        statusStyles[status],
        className,
      )}
    >
      {label}
    </span>
  );
}
