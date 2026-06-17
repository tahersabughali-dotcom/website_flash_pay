import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-3xl bg-gradient-to-br from-flash-primary via-flash-primary to-flash-primary-dark px-6 py-10 text-white shadow-xl sm:px-10 sm:py-12",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-sm font-medium uppercase tracking-wide opacity-90">{eyebrow}</p>
      )}
      <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">{title}</h1>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed opacity-95 sm:text-lg">
          {subtitle}
        </p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </section>
  );
}
