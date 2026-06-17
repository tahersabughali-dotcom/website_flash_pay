import Link from "next/link";
import type { LanguageCode, LocalizedString } from "@/types/common";
import { getLocalized } from "@/lib/i18n";
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
  const content = (
    <>
      {icon && (
        <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-flash-primary-light text-sm font-semibold text-flash-primary">
          {icon.slice(0, 2).toUpperCase()}
        </span>
      )}
      <h3 className="font-semibold text-flash-text">{getLocalized(title, lang)}</h3>
      {description && (
        <p className="mt-2 line-clamp-2 text-sm text-flash-muted">
          {getLocalized(description, lang)}
        </p>
      )}
    </>
  );

  const baseClass = cn(
    "flash-card-interactive p-4",
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
