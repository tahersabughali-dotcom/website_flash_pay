"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { settingsData } from "@/data/settingsData";
import type { LanguageCode } from "@/types/common";
import type { GlobalCoverageStatus } from "@/types/globalCountry";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { DataGrid } from "@/components/shared/DataGrid";
import { EmptyState } from "@/components/shared/EmptyState";
import { CTASection } from "@/components/shared/CTASection";
import { CountryCard } from "@/components/shared/CountryCard";
import { AlertBox } from "@/components/shared/AlertBox";
import { LtrText } from "@/components/shared/LtrText";
import {
  filterGlobalCountries,
  getFeaturedOperationalCountries,
  getUniqueGlobalRegions,
  GLOBAL_COUNTRY_COUNT,
} from "@/lib/countries";
import { filterCountries, getUniqueCountryRegions, resolveServiceLabels } from "@/lib/dataAccess";
import { CountriesFilter } from "./CountriesFilter";
import { GlobalCountriesFilter, GlobalCountryCard } from "./GlobalCountryCard";

const GLOBAL_PAGE_SIZE = 30;

function FeaturedOperationalCard({
  country,
  lang,
  featured,
}: {
  country: import("@/types/country").Country;
  lang: LanguageCode;
  featured?: boolean;
}) {
  const serviceLabels = resolveServiceLabels(country.availableServices.slice(0, 3), lang);

  return (
    <div
      className={
        featured
          ? "flash-featured-card flash-card-interactive flex h-full flex-col p-5 sm:p-6"
          : "flash-card-interactive flex h-full flex-col p-5"
      }
    >
      {featured && (
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-flash-primary to-flash-primary/30" />
      )}
      <CountryCard country={country} lang={lang} variant="plain" size={featured ? "lg" : "md"} />
      <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-xs text-flash-muted">
        <p className="line-clamp-1">
          {lang === "ar" ? "العملات:" : "Currencies:"}{" "}
          <LtrText className="font-medium text-flash-text/80">
            {country.currencies.slice(0, 6).join(" · ")}
          </LtrText>
        </p>
        <p className="line-clamp-2">
          {lang === "ar" ? "الخدمات:" : "Services:"}{" "}
          {serviceLabels.join(lang === "ar" ? " · " : ", ")}
        </p>
      </div>
      <div className="mt-auto flex flex-wrap gap-2 pt-4">
        <Link href={country.route} className="flash-btn-secondary min-h-9 px-3 py-2 text-xs">
          {lang === "ar" ? "عرض التفاصيل" : "View details"}
        </Link>
        <Link href="/request" className="flash-btn-primary min-h-9 px-3 py-2 text-xs">
          {lang === "ar" ? "ابدأ طلبًا" : "Start request"}
        </Link>
      </div>
    </div>
  );
}

export function CountriesPage() {
  const lang = settingsData.defaultLanguage;
  const [region, setRegion] = useState("all");
  const [search, setSearch] = useState("");
  const [globalRegion, setGlobalRegion] = useState("all");
  const [globalStatus, setGlobalStatus] = useState<GlobalCoverageStatus | "all">("all");
  const [globalSearch, setGlobalSearch] = useState("");
  const [visibleGlobalCount, setVisibleGlobalCount] = useState(GLOBAL_PAGE_SIZE);

  const featured = useMemo(() => getFeaturedOperationalCountries(), []);

  const operationalRegions = useMemo(() => {
    const items = getUniqueCountryRegions(lang);
    return [
      { id: "all", label: lang === "ar" ? "كل المناطق" : "All regions" },
      ...items.map((item) => ({ id: item, label: item })),
    ];
  }, [lang]);

  const filteredOperational = useMemo(
    () => filterCountries({ region, search, lang }),
    [region, search, lang],
  );

  const globalRegions = useMemo(() => {
    const items = getUniqueGlobalRegions(lang);
    return [
      { id: "all", label: lang === "ar" ? "كل المناطق" : "All regions" },
      ...items.map((item) => ({ id: item, label: item })),
    ];
  }, [lang]);

  const filteredGlobal = useMemo(
    () =>
      filterGlobalCountries({
        region: globalRegion,
        status: globalStatus,
        search: globalSearch,
        lang,
        excludeOperational: false,
      }),
    [globalRegion, globalStatus, globalSearch, lang],
  );

  const visibleGlobal = filteredGlobal.slice(0, visibleGlobalCount);

  return (
    <div className="flash-page-wrap">
      <PageHero
        eyebrow={lang === "ar" ? "Flash Pay Global" : "Flash Pay Global"}
        title={lang === "ar" ? "الدول والتغطية العالمية" : "Countries & Global Coverage"}
        subtitle={
          lang === "ar"
            ? "استكشف الدول، العملات، وطرق الاستلام المتاحة أو التي يمكن تأكيدها حسب الطلب عبر Flash Pay."
            : "Explore countries, currencies, and receiving methods available or confirmable by request through Flash Pay."
        }
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/request" className="flash-btn-primary !bg-white !text-flash-primary hover:!bg-white/90">
            {lang === "ar" ? "ابدأ طلبًا" : "Start request"}
          </Link>
          <Link href="/currencies" className="flash-btn-secondary !border-white/40 !text-white hover:!bg-white/10">
            {lang === "ar" ? "العملات" : "Currencies"}
          </Link>
          <Link href="/payment-methods" className="flash-btn-secondary !border-white/40 !text-white hover:!bg-white/10">
            {lang === "ar" ? "طرق الدفع" : "Payment methods"}
          </Link>
        </div>
      </PageHero>

      <AlertBox
        className="mt-8"
        variant="warning"
        title={lang === "ar" ? "تنبيه التغطية" : "Coverage notice"}
        content={
          lang === "ar"
            ? "ظهور الدولة في الدليل لا يعني توفر الخدمة بشكل مؤكد. يتم تأكيد التوفر حسب الدولة، العملة، المبلغ، وطريقة الاستلام."
            : "Listing a country in the directory does not guarantee service availability. Availability is confirmed based on country, currency, amount, and receiving method."
        }
      />

      <section className="mt-10">
        <SectionHeader
          title={lang === "ar" ? "دول Flash Pay التشغيلية" : "Flash Pay operational countries"}
          subtitle={
            lang === "ar"
              ? "دول ذات تغطية تشغيلية أقوى وصفحات تفصيلية."
              : "Countries with stronger operational coverage and detail pages."
          }
        />
        <DataGrid columns={2} className="lg:grid-cols-2">
          {featured.map((country) => (
            <FeaturedOperationalCard key={country.id} country={country} lang={lang} featured />
          ))}
        </DataGrid>
      </section>

      <section className="mt-12">
        <SectionHeader title={lang === "ar" ? "تصفية الدول التشغيلية" : "Filter operational countries"} />
        <CountriesFilter
          regions={operationalRegions}
          region={region}
          onRegionChange={setRegion}
          search={search}
          onSearchChange={setSearch}
          lang={lang}
        />
        <div className="mt-6">
          {filteredOperational.length > 0 ? (
            <DataGrid columns={3}>
              {filteredOperational.map((country) => (
                <FeaturedOperationalCard key={country.id} country={country} lang={lang} />
              ))}
            </DataGrid>
          ) : (
            <EmptyState
              title={lang === "ar" ? "لا نتائج" : "No results"}
              description={lang === "ar" ? "جرّب بحثًا أو منطقة أخرى." : "Try another search or region."}
            />
          )}
        </div>
      </section>

      <section className="mt-14">
        <SectionHeader
          title={lang === "ar" ? "الدليل العالمي للدول" : "Global country directory"}
          subtitle={
            lang === "ar"
              ? `${GLOBAL_COUNTRY_COUNT} دولة ومنطقة — مرجعية فقط، وليست وعدًا بالخدمة.`
              : `${GLOBAL_COUNTRY_COUNT} countries and territories — reference only, not a service promise.`
          }
        />
        <AlertBox
          className="mb-5"
          variant="info"
          content={
            lang === "ar"
              ? "الدليل العالمي للمرجعية والبحث. للتأكيد الفعلي، استخدم مركز الطلبات أو WhatsApp."
              : "Global directory for reference and search. For actual confirmation, use the Request Center or WhatsApp."
          }
        />
        <GlobalCountriesFilter
          regions={globalRegions}
          region={globalRegion}
          onRegionChange={(value) => {
            setGlobalRegion(value);
            setVisibleGlobalCount(GLOBAL_PAGE_SIZE);
          }}
          status={globalStatus}
          onStatusChange={(value) => {
            setGlobalStatus(value);
            setVisibleGlobalCount(GLOBAL_PAGE_SIZE);
          }}
          search={globalSearch}
          onSearchChange={(value) => {
            setGlobalSearch(value);
            setVisibleGlobalCount(GLOBAL_PAGE_SIZE);
          }}
          lang={lang}
        />
        <div className="mt-6">
          {visibleGlobal.length > 0 ? (
            <>
              <DataGrid columns={4}>
                {visibleGlobal.map((country) => (
                  <GlobalCountryCard key={country.id} country={country} lang={lang} compact />
                ))}
              </DataGrid>
              {visibleGlobalCount < filteredGlobal.length && (
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => setVisibleGlobalCount((count) => count + GLOBAL_PAGE_SIZE)}
                    className="flash-btn-secondary"
                  >
                    {lang === "ar"
                      ? `عرض المزيد (${filteredGlobal.length - visibleGlobalCount} متبقية)`
                      : `Show more (${filteredGlobal.length - visibleGlobalCount} remaining)`}
                  </button>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              title={lang === "ar" ? "لا نتائج" : "No results"}
              description={lang === "ar" ? "جرّب بحثًا أو فلترًا مختلفًا." : "Try a different search or filter."}
            />
          )}
        </div>
      </section>

      <div className="mt-12">
        <CTASection
          title={lang === "ar" ? "هل تريد تأكيد التوفر؟" : "Need availability confirmed?"}
          description={
            lang === "ar"
              ? "أرسل تفاصيل طلبك عبر WhatsApp أو مركز الطلبات."
              : "Send your request details via WhatsApp or the Request Center."
          }
          lang={lang}
        />
      </div>
    </div>
  );
}
