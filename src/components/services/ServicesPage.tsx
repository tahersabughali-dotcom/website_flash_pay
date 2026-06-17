"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { pageContentData } from "@/data/pageContentData";
import { serviceCategoriesData } from "@/data/serviceCategoriesData";
import { settingsData } from "@/data/settingsData";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { DataGrid } from "@/components/shared/DataGrid";
import { EmptyState } from "@/components/shared/EmptyState";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { CTASection } from "@/components/shared/CTASection";
import { filterServices } from "@/lib/dataAccess";
import { getLocalized } from "@/lib/i18n";
import type { ServiceCategory } from "@/types/service";
import { ServicesFilter } from "./ServicesFilter";

export function ServicesPage() {
  const lang = settingsData.defaultLanguage;
  const content = pageContentData.services;
  const [category, setCategory] = useState<ServiceCategory | "all">("all");
  const [search, setSearch] = useState("");

  const services = useMemo(
    () => filterServices({ category, search, lang }),
    [category, search, lang],
  );

  const categories = serviceCategoriesData.map((item) => ({
    id: item.id,
    label: getLocalized(item.label, lang),
  }));

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
        <ServicesFilter
          categories={categories}
          category={category}
          onCategoryChange={setCategory}
          search={search}
          onSearchChange={setSearch}
          lang={lang}
        />
      </section>

      <section className="mt-8">
        <SectionHeader
          title={
            lang === "ar"
              ? `${services.length} خدمة`
              : `${services.length} service${services.length === 1 ? "" : "s"}`
          }
        />

        {services.length > 0 ? (
          <DataGrid columns={3}>
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} lang={lang} />
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
