import { cn } from "@/lib/utils";

interface DetailSectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function DetailSection({ title, subtitle, children, className }: DetailSectionProps) {
  return (
    <section className={cn("space-y-4", className)}>
      <div>
        <h2 className="text-lg font-semibold text-flash-text">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-flash-muted">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
