import Link from "next/link";
import { homepageData } from "@/data/homepageData";
import { settingsData } from "@/data/settingsData";
import { DataGrid } from "@/components/shared/DataGrid";
import { EmptyState } from "@/components/shared/EmptyState";
import { CountryCard } from "@/components/shared/CountryCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { getFeaturedCountries } from "@/lib/dataAccess";
import { getLocalized, getActionArrow } from "@/lib/i18n";

export function HomeCountriesSection() {
  const lang = settingsData.defaultLanguage;
  const config = homepageData.sections.countries;
  const countries = getFeaturedCountries(8);

  return (
    <section className="flash-section">
      <SectionHeader
        title={getLocalized(config.title, lang)}
        subtitle={getLocalized(config.subtitle, lang)}
        action={
          <Link href={config.actionHref!} className="flash-link-action">
            {getLocalized(config.actionLabel!, lang)} {getActionArrow(lang)}
          </Link>
        }
      />

      {countries.length > 0 ? (
        <DataGrid columns={4}>
          {countries.map((country) => (
            <CountryCard key={country.id} country={country} lang={lang} />
          ))}
        </DataGrid>
      ) : (
        <EmptyState
          title={lang === "ar" ? "لا توجد دول مميزة" : "No featured countries"}
          description={
            lang === "ar"
              ? "أضف دولاً مميزة في countriesData.ts"
              : "Add featured countries in countriesData.ts"
          }
        />
      )}
    </section>
  );
}
