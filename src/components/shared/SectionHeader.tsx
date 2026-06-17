import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
  align?: "start" | "center";
}

export function SectionHeader({
  title,
  subtitle,
  action,
  className,
  align = "start",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between",
        align === "center" && "flex-col items-center text-center sm:items-center",
        className,
      )}
    >
      <div className={align === "center" ? "text-center" : undefined}>
        <h2 className="text-xl font-semibold text-flash-text sm:text-2xl">{title}</h2>
        {subtitle && (
          <p className="mt-2 max-w-2xl text-sm text-flash-muted sm:text-base">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
