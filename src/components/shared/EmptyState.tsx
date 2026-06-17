import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  className?: string;
}

export function EmptyState({ title, description, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-white px-6 py-12 text-center",
        className,
      )}
    >
      <div
        className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-flash-primary-light text-flash-primary"
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p className="font-medium text-flash-text">{title}</p>
      {description && <p className="mx-auto mt-2 max-w-md text-sm text-flash-muted">{description}</p>}
    </div>
  );
}
