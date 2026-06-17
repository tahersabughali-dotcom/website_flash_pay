import { cn } from "@/lib/utils";

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <section className={cn("space-y-5", className)}>
      <div>
        <h2 className="text-lg font-semibold text-flash-text">{title}</h2>
        {description && <p className="mt-1 text-sm text-flash-muted">{description}</p>}
      </div>
      {children}
    </section>
  );
}
