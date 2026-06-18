import { LtrText } from "@/components/shared/LtrText";
import { cn } from "@/lib/utils";

interface InfoListProps {
  title: string;
  items: string[];
  emptyLabel?: string;
  className?: string;
}

export function InfoList({ title, items, emptyLabel, className }: InfoListProps) {
  return (
    <div className={cn("rounded-xl border border-slate-200 bg-white p-4", className)}>
      <p className="text-xs font-medium uppercase tracking-wide text-flash-muted">{title}</p>
      {items.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-2">
          {items.map((item) => (
            <li
              key={item}
              className="rounded-full bg-flash-primary-light px-3 py-1 text-xs font-medium text-flash-primary"
            >
              <LtrText>{item}</LtrText>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-flash-muted">{emptyLabel ?? "—"}</p>
      )}
    </div>
  );
}
