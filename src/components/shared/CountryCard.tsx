import Link from "next/link";
import type { LanguageCode } from "@/types/common";
import type { Country } from "@/types/country";
import { FlagIcon } from "@/components/shared/FlagIcon";
import { CoverageStatusBadge } from "@/components/shared/CoverageStatusBadge";
import { getOperationalIso2 } from "@/lib/countries";
import { getFlagImageUrl } from "@/lib/icons";
import { getLocalized } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface CountryCardProps {
  country: Country;
  lang: LanguageCode;
  className?: string;
  variant?: "card" | "plain";
  size?: "md" | "lg";
}

export function CountryCard({
  country,
  lang,
  className,
  variant = "card",
  size = "md",
}: CountryCardProps) {
  const iso2 = getOperationalIso2(country.slug);
  const flagSize = size === "lg" ? "lg" : "md";

  const content = (
    <>
      <FlagIcon
        iso2={iso2}
        flagImageUrl={iso2 ? getFlagImageUrl(iso2) : undefined}
        flagEmoji={country.flag}
        alt={getLocalized(country.name, lang)}
        size={flagSize}
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className={cn(
              "font-semibold text-flash-text group-hover:text-flash-primary",
              size === "lg" && "text-lg",
            )}
          >
            {getLocalized(country.name, lang)}
          </h3>
          <CoverageStatusBadge status="active" lang={lang} />
        </div>
        <p className="mt-1 truncate text-xs text-flash-muted">
          {getLocalized(country.region, lang)}
        </p>
      </div>
    </>
  );

  if (variant === "plain") {
    return (
      <Link href={country.route} className={cn("group flex items-center gap-4", className)}>
        {content}
      </Link>
    );
  }

  return (
    <Link
      href={country.route}
      className={cn("group flex items-center gap-4 flash-card-interactive p-4", className)}
    >
      {content}
    </Link>
  );
}
