import Link from "next/link";
import type { LanguageCode, LocalizedString } from "@/types/common";
import { getLocalized } from "@/lib/i18n";
import { getRequestTypeIconGlyph } from "@/lib/requestTypeIcons";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: LocalizedString;
  description?: LocalizedString;
  lang: LanguageCode;
  href?: string;
  icon?: string;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  lang,
  href,
  icon,
  className,
}: FeatureCardProps) {
  const glyph = getRequestTypeIconGlyph(icon);

  const content = (
    <>
      {icon && (
        <span
          className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-flash-primary-light to-white text-lg font-semibold text-flash-primary shadow-sm ring-1 ring-flash-primary/10 transition group-hover:scale-105 group-hover:ring-flash-primary/25"
          aria-hidden
        >
          {glyph}
        </span>
      )}
      <h3 className="text-base font-bold leading-snug text-flash-text sm:text-[1.05rem]">
        {getLocalized(title, lang)}
      </h3>
      {description && (
        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-flash-muted">
          {getLocalized(description, lang)}
        </p>
      )}
    </>
  );

  const baseClass = cn(
    "group flash-card-interactive flex h-full flex-col p-5 transition hover:-translate-y-0.5 hover:border-flash-primary/45 hover:shadow-lg sm:p-6",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={baseClass}>
        {content}
      </Link>
    );
  }

  return <div className={baseClass}>{content}</div>;
}
