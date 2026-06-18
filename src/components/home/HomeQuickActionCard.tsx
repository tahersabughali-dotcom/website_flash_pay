import Link from "next/link";
import type { LanguageCode, LocalizedString } from "@/types/common";
import { getLocalized, getActionArrow } from "@/lib/i18n";
import { getRequestTypeIconGlyph } from "@/lib/requestTypeIcons";
import { cn } from "@/lib/utils";

interface HomeQuickActionCardProps {
  title: LocalizedString;
  description?: LocalizedString;
  lang: LanguageCode;
  href: string;
  icon?: string;
  primary?: boolean;
  popular?: boolean;
  className?: string;
}

export function HomeQuickActionCard({
  title,
  description,
  lang,
  href,
  icon,
  primary = false,
  popular = false,
  className,
}: HomeQuickActionCardProps) {
  const glyph = getRequestTypeIconGlyph(icon);

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex min-h-[11.5rem] flex-col rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition",
        "hover:-translate-y-0.5 hover:border-flash-primary/35 hover:shadow-md",
        primary && "border-flash-primary/15 ring-1 ring-flash-primary/10 sm:p-5",
        className,
      )}
    >
      {popular && (
        <span className="absolute end-3 top-3 rounded-full border border-flash-primary/15 bg-flash-primary-light/80 px-2 py-0.5 text-[10px] font-semibold text-flash-primary">
          {lang === "ar" ? "الأكثر طلبًا" : "Popular"}
        </span>
      )}

      {icon && (
        <span
          className={cn(
            "mb-3 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-flash-primary-light to-white text-flash-primary shadow-sm ring-1 ring-flash-primary/10 transition group-hover:ring-flash-primary/20",
            primary ? "h-14 w-14 text-2xl" : "h-11 w-11 text-lg",
          )}
          aria-hidden
        >
          {glyph}
        </span>
      )}

      <h3
        className={cn(
          "font-bold leading-snug text-flash-text",
          primary ? "text-[1.05rem] sm:text-lg" : "text-base",
        )}
      >
        {getLocalized(title, lang)}
      </h3>

      {description && (
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-flash-muted">
          {getLocalized(description, lang)}
        </p>
      )}

      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-flash-primary opacity-90 transition group-hover:opacity-100">
        {lang === "ar" ? "ابدأ" : "Start"} {getActionArrow(lang)}
      </span>
    </Link>
  );
}
