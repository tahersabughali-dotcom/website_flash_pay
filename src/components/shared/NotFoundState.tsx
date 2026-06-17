import Link from "next/link";
import { settingsData } from "@/data/settingsData";
import { cn } from "@/lib/utils";

interface NotFoundStateProps {
  title: string;
  description: string;
  backHref: string;
  backLabel: string;
  className?: string;
}

export function NotFoundState({
  title,
  description,
  backHref,
  backLabel,
  className,
}: NotFoundStateProps) {
  const lang = settingsData.defaultLanguage;

  return (
    <div
      className={cn(
        "mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm",
        className,
      )}
    >
      <h1 className="text-2xl font-semibold text-flash-text">{title}</h1>
      <p className="mt-3 text-sm text-flash-muted">{description}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href={backHref} className="flash-btn-primary">
          {backLabel}
        </Link>
        <Link href="/request" className="flash-btn-secondary">
          {lang === "ar" ? "ابدأ طلباً" : "Start a Request"}
        </Link>
      </div>
    </div>
  );
}
