import Link from "next/link";
import type { LanguageCode } from "@/types/common";
import type { Country } from "@/types/country";
import { DetailSection } from "@/components/shared/DetailSection";
import { EmptyState } from "@/components/shared/EmptyState";
import { ExecutionTypeBadge } from "@/components/shared/ExecutionTypeBadge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { resolveCountryLabel } from "@/lib/dataAccess";
import { getRoutesForCountry } from "@/lib/routeFinder";
import { getLocalized } from "@/lib/i18n";

interface CountryRoutesProps {
  country: Country;
  lang: LanguageCode;
}

export function CountryRoutes({ country, lang }: CountryRoutesProps) {
  const routes = getRoutesForCountry(country.slug).filter((route) =>
    country.availableRoutes.includes(route.slug),
  );

  const allRoutes = routes.length > 0 ? routes : getRoutesForCountry(country.slug);

  return (
    <DetailSection title={lang === "ar" ? "المسارات المتاحة" : "Available routes"}>
      {allRoutes.length > 0 ? (
        <div className="grid gap-3">
          {allRoutes.map((route) => (
            <Link
              key={route.id}
              href={`/route-finder?from=${route.fromCountrySlug}&to=${route.toCountrySlug}`}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-flash-primary hover:shadow-sm"
            >
              <div>
                <p className="font-medium text-flash-text">
                  {resolveCountryLabel(route.fromCountrySlug, lang)} →{" "}
                  {resolveCountryLabel(route.toCountrySlug, lang)}
                </p>
                {route.notes && (
                  <p className="mt-1 text-xs text-flash-muted">
                    {getLocalized(route.notes, lang)}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <StatusBadge status={route.status} label={lang === "ar" ? "متاح" : "Available"} />
                <ExecutionTypeBadge executionType={route.executionType} />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          title={lang === "ar" ? "لا توجد مسارات معروضة" : "No listed routes"}
          description={
            lang === "ar"
              ? "استخدم Flash Route Finder أو تواصل معنا."
              : "Use Flash Route Finder or contact us."
          }
        />
      )}
    </DetailSection>
  );
}
