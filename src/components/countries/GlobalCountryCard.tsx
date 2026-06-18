"use client";

import Link from "next/link";
import type { LanguageCode } from "@/types/common";
import type { GlobalCountry, GlobalCoverageStatus } from "@/types/globalCountry";
import { FlagIcon } from "@/components/shared/FlagIcon";
import { CoverageStatusBadge } from "@/components/shared/CoverageStatusBadge";
import { LtrText } from "@/components/shared/LtrText";
import { getCountryPageHref } from "@/lib/countries";
import { getLocalized } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface GlobalCountryCardProps {
  country: GlobalCountry;
  lang: LanguageCode;
  compact?: boolean;
}

export function GlobalCountryCard({ country, lang, compact }: GlobalCountryCardProps) {
  const href = getCountryPageHref(country);
  const cta =
    country.operationalSlug && href.startsWith("/countries/")
      ? lang === "ar"
        ? "عرض التفاصيل"
        : "View details"
      : lang === "ar"
        ? "تحقق من التوفر"
        : "Check availability";

  const currencyPreview = country.currencies.slice(0, 4).join(" · ");

  return (
    <article
      className={cn(
        "flash-directory-card flex h-full flex-col",
        compact ? "p-3" : "p-4",
      )}
    >
      <div className="flex items-start gap-2.5 sm:gap-3">
        <FlagIcon
          iso2={country.iso2}
          flagImageUrl={country.flagImageUrl}
          flagEmoji={country.flagEmoji}
          alt={getLocalized(country.name, lang)}
          size={compact ? "sm" : "md"}
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start gap-x-2 gap-y-1">
            <h3
              className={cn(
                "min-w-0 flex-1 font-semibold leading-snug text-flash-text",
                compact ? "text-sm" : "text-base",
              )}
            >
              {getLocalized(country.name, lang)}
            </h3>
            <CoverageStatusBadge status={country.status} lang={lang} className="shrink-0" />
          </div>
          <p className="mt-1 line-clamp-1 text-xs text-flash-muted">
            {getLocalized(country.region, lang)}
          </p>
          {currencyPreview && (
            <p className="mt-1.5 line-clamp-1 text-[11px] text-flash-muted">
              {lang === "ar" ? "عملات:" : "Currencies:"}{" "}
              <LtrText className="font-medium text-flash-text/80">{currencyPreview}</LtrText>
            </p>
          )}
          {!compact && (
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-flash-muted">
              {getLocalized(country.coverageNote, lang)}
            </p>
          )}
        </div>
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-3">
        <Link href={href} className="flash-btn-secondary min-h-9 px-3 py-2 text-xs">
          {cta}
        </Link>
        <Link
          href="/route-finder"
          className="text-xs font-medium text-flash-primary hover:underline"
        >
          {lang === "ar" ? "مكتشف المسارات" : "Route finder"}
        </Link>
      </div>
    </article>
  );
}

export function GlobalCountriesFilter({
  regions,
  region,
  onRegionChange,
  status,
  onStatusChange,
  search,
  onSearchChange,
  lang,
}: {
  regions: { id: string; label: string }[];
  region: string;
  onRegionChange: (value: string) => void;
  status: GlobalCoverageStatus | "all";
  onStatusChange: (value: GlobalCoverageStatus | "all") => void;
  search: string;
  onSearchChange: (value: string) => void;
  lang: LanguageCode;
}) {
  const statuses: { id: GlobalCoverageStatus | "all"; label: string }[] = [
    { id: "all", label: lang === "ar" ? "كل الحالات" : "All statuses" },
    { id: "active", label: lang === "ar" ? "متاح" : "Active" },
    { id: "available_by_request", label: lang === "ar" ? "حسب الطلب" : "By request" },
    { id: "partner_network", label: lang === "ar" ? "شبكة شركاء" : "Partner network" },
  ];

  return (
    <div className="flash-filter-panel">
      <input
        type="search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={lang === "ar" ? "ابحث بالاسم أو ISO..." : "Search name or ISO..."}
        className="flash-filter-input"
      />
      <select
        value={region}
        onChange={(e) => onRegionChange(e.target.value)}
        className="flash-filter-select"
      >
        {regions.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as GlobalCoverageStatus | "all")}
        className="flash-filter-select"
      >
        {statuses.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
