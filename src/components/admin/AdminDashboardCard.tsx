import Link from "next/link";
import { cn } from "@/lib/utils";

interface AdminDashboardCardProps {
  title: string;
  description: string;
  href: string;
  badge?: string;
  className?: string;
}

export function AdminDashboardCard({
  title,
  description,
  href,
  badge,
  className,
}: AdminDashboardCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-flash-primary/40 hover:shadow-md",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-bold text-flash-text group-hover:text-flash-primary">{title}</h3>
        {badge && (
          <span className="shrink-0 rounded-full bg-flash-primary-light px-2 py-0.5 text-[10px] font-semibold text-flash-primary">
            {badge}
          </span>
        )}
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-flash-muted">{description}</p>
      <span className="mt-4 text-sm font-semibold text-flash-primary">فتح ←</span>
    </Link>
  );
}
