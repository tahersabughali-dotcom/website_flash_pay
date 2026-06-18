"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { pageContentData } from "@/data/pageContentData";
import { settingsData } from "@/data/settingsData";
import type { LanguageCode } from "@/types/common";
import type { Country } from "@/types/country";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { DataGrid } from "@/components/shared/DataGrid";
import { EmptyState } from "@/components/shared/EmptyState";
import { CountryCard } from "@/components/shared/CountryCard";
import { CTASection } from "@/components/shared/CTASection";
import { filterCountries, getUniqueCountryRegions, resolveServiceLabels } from "@/lib/dataAccess";
import { getLocalized } from "@/lib/i18n";
import { CountriesFilter } from "./CountriesFilter";

function CountryHubCard({ country, lang }: { country: Country; lang: LanguageCode }) {
  const serviceLabels = resolveServiceLabels(country.availableServices.slice(0, 3), lang);

  return (
    <div className="flash-card-interactive p-4">
      <CountryCard country={country} lang={lang} variant="plain" />
      <div className="mt-3 border-t border-slate-100 pt-3 text-xs text-flash-muted">
        <p>
          {lang === "ar" ? "العملات:" : "Currencies:"}{" "}
          {country.currencies.slice(0, 5).join(", ")}
        </p>
        <p className="mt-1 line-clamp-2">
          {lang === "ar" ? "الخدمات:" : "Services:"}{" "}
          {serviceLabels.join(lang === "ar" ? " · " : ", ")}
        </p>
      </div>
    </div>
  );
}

export function CountriesPage() {
  const lang = settingsData.defaultLanguage;
  const content = pageContentData.countries;
  const [region, setRegion] = useState("all");
  const [search, setSearch] = useState("");

  const regions = useMemo(() => {
    const items = getUniqueCountryRegions(lang);
    return [
      { id: "all", label: getLocalized(content.allRegionsLabel, lang) },
      ...items.map((item) => ({ id: item, label: item })),
    ];
  }, [lang, content.allRegionsLabel]);

  const countries = useMemo(
    () => filterCountries({ region, search, lang }),
    [region, search, lang],
  );

  return (
    <div className="flash-page-wrap">
      <PageHero
        eyebrow={getLocalized(content.hero.eyebrow, lang)}
        title={getLocalized(content.hero.title, lang)}
        subtitle={getLocalized(content.hero.subtitle, lang)}
      >
        <Link href={content.hero.ctaHref} className="flash-btn-primary !bg-white !text-flash-primary hover:!bg-white/90">
          {getLocalized(content.hero.ctaLabel, lang)}
        </Link>
      </PageHero>

      <section className="mt-10">
        <CountriesFilter
          regions={regions}
          region={region}
          onRegionChange={setRegion}
          search={search}
          onSearchChange={setSearch}
          lang={lang}
        />
      </section>

      <section className="mt-8">
        <SectionHeader
          title={
            lang === "ar"
              ? `${countries.length} دولة`
              : `${countries.length} countr${countries.length === 1 ? "y" : "ies"}`
          }
        />

        {countries.length > 0 ? (
          <DataGrid columns={3}>
            {countries.map((country) => (
              <CountryHubCard key={country.id} country={country} lang={lang} />
            ))}
          </DataGrid>
        ) : (
          <EmptyState
            title={getLocalized(content.empty.title, lang)}
            description={getLocalized(content.empty.description, lang)}
          />
        )}
      </section>

      <div className="mt-12">
        <CTASection
          title={getLocalized(content.bottomCta.title, lang)}
          description={getLocalized(content.bottomCta.description, lang)}
          lang={lang}
        />
      </div>
    </div>
  );
}
