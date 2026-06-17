import { cn } from "@/lib/utils";

interface FilterTabsProps<T extends string> {
  items: { id: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  scrollable?: boolean;
}

export function FilterTabs<T extends string>({
  items,
  value,
  onChange,
  className,
  scrollable = false,
}: FilterTabsProps<T>) {
  const tabs = items.map((item) => (
    <button
      key={item.id}
      type="button"
      aria-pressed={value === item.id}
      onClick={() => onChange(item.id)}
      className={cn(
        "min-h-11 shrink-0 rounded-full border px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flash-primary focus-visible:ring-offset-2",
        value === item.id
          ? "border-flash-primary bg-flash-primary text-white"
          : "border-slate-200 bg-white text-flash-muted hover:border-flash-primary hover:text-flash-primary",
      )}
    >
      {item.label}
    </button>
  ));

  if (scrollable) {
    return (
      <div className={cn("flash-filter-scroll", className)}>
        <div className="flash-filter-scroll-inner">{tabs}</div>
      </div>
    );
  }

  return <div className={cn("flex flex-wrap gap-2", className)}>{tabs}</div>;
}
