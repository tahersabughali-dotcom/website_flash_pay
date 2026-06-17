import Link from "next/link";
import type { LanguageCode } from "@/types/common";
import type { Country } from "@/types/country";
import { getLocalized } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface CountryCardProps {
  country: Country;
  lang: LanguageCode;
  className?: string;
  variant?: "card" | "plain";
}

export function CountryCard({
  country,
  lang,
  className,
  variant = "card",
}: CountryCardProps) {
  const content = (
    <>
      <span className="text-3xl" aria-hidden="true">
        {country.flag}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-flash-text group-hover:text-flash-primary">
          {getLocalized(country.name, lang)}
        </h3>
        <p className="mt-1 truncate text-xs text-flash-muted">
          {getLocalized(country.region, lang)}
        </p>
      </div>
    </>
  );

  if (variant === "plain") {
    return (
      <Link
        href={country.route}
        className={cn("group flex items-center gap-4", className)}
      >
        {content}
      </Link>
    );
  }

  return (
    <Link
      href={country.route}
      className={cn(
        "group flex items-center gap-4 flash-card-interactive p-4",
        className,
      )}
    >
      {content}
    </Link>
  );
}
