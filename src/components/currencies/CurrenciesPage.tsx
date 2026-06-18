"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { settingsData } from "@/data/settingsData";
import type { CurrencyType } from "@/types/currency";
import type { GlobalCoverageStatus } from "@/types/globalCountry";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { DataGrid } from "@/components/shared/DataGrid";
import { EmptyState } from "@/components/shared/EmptyState";
import { AlertBox } from "@/components/shared/AlertBox";
import { CurrencyCard } from "@/components/currencies/CurrencyCard";
import { CurrenciesFilter } from "@/components/currencies/CurrenciesFilter";
import { filterGlobalCurrencies, getFeaturedGlobalCurrencies, GLOBAL_CURRENCY_COUNT } from "@/lib/currencies";

const PAGE_SIZE = 24;

function CurrencyGridSection({
  title,
  currencies,
  lang,
  compact,
}: {
  title: string;
  currencies: ReturnType<typeof filterGlobalCurrencies>;
  lang: typeof settingsData.defaultLanguage;
  compact?: boolean;
}) {
  if (currencies.length === 0) return null;

  return (
    <div className="mt-8">
      <SectionHeader title={title} />
      <DataGrid columns={4}>
        {currencies.map((currency) => (
          <CurrencyCard key={currency.id} currency={currency} lang={lang} compact={compact} />
        ))}
      </DataGrid>
    </div>
  );
}

export function CurrenciesPage() {
  const lang = settingsData.defaultLanguage;
  const [type, setType] = useState<CurrencyType | "all">("all");
  const [status, setStatus] = useState<GlobalCoverageStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const featured = useMemo(() => getFeaturedGlobalCurrencies(), []);
  const filtered = useMemo(
    () => filterGlobalCurrencies({ type, status, search, lang }),
    [type, status, search, lang],
  );
  const visible = filtered.slice(0, visibleCount);
  const showGroupedSections = type === "all" && !search.trim();

  const fiatVisible = showGroupedSections
    ? visible.filter((currency) => currency.type === "fiat")
    : [];
  const digitalVisible = showGroupedSections
    ? visible.filter((currency) => currency.type !== "fiat")
    : [];

  return (
    <div className="flash-page-wrap">
      <PageHero
        eyebrow={lang === "ar" ? "Flash Pay Global" : "Flash Pay Global"}
        title={lang === "ar" ? "العملات المدعومة والمرجعية" : "Supported & Reference Currencies"}
        subtitle={
          lang === "ar"
            ? "دليل العملات — لا يعني توفر سعر أو تنفيذ فوري."
            : "Currency directory — not a guarantee of instant pricing or execution."
        }
      >
        <Link href="/request" className="flash-btn-primary !bg-white !text-flash-primary hover:!bg-white/90">
          {lang === "ar" ? "اطلب السعر عبر WhatsApp" : "Request rate via WhatsApp"}
        </Link>
      </PageHero>

      <AlertBox
        className="mt-8"
        variant="warning"
        title={lang === "ar" ? "تنبيه" : "Notice"}
        content={
          lang === "ar"
            ? "عرض العملة داخل الدليل لا يعني توفر سعر أو تنفيذ فوري. السعر والتوفر يتم تأكيدهما عبر WhatsApp."
            : "Listing a currency does not mean instant pricing or execution. Rate and availability are confirmed via WhatsApp."
        }
      />

      <section className="mt-10">
        <SectionHeader
          title={lang === "ar" ? "عملات مميزة" : "Featured currencies"}
          subtitle={lang === "ar" ? "عملات شائعة في مسارات Flash Pay." : "Common currencies in Flash Pay corridors."}
        />
        <DataGrid columns={4}>
          {featured.map((currency) => (
            <CurrencyCard key={currency.id} currency={currency} lang={lang} featured />
          ))}
        </DataGrid>
      </section>

      <section className="mt-12">
        <SectionHeader
          title={lang === "ar" ? "كل العملات" : "All currencies"}
          subtitle={
            lang === "ar" ? `${GLOBAL_CURRENCY_COUNT} عملة` : `${GLOBAL_CURRENCY_COUNT} currencies`
          }
        />
        <CurrenciesFilter
          type={type}
          onTypeChange={(value) => {
            setType(value);
            setVisibleCount(PAGE_SIZE);
          }}
          status={status}
          onStatusChange={(value) => {
            setStatus(value);
            setVisibleCount(PAGE_SIZE);
          }}
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setVisibleCount(PAGE_SIZE);
          }}
          lang={lang}
        />
        <div className="mt-6">
          {visible.length > 0 ? (
            <>
              {showGroupedSections ? (
                <>
                  <CurrencyGridSection
                    title={lang === "ar" ? "عملات ورقية (FIAT)" : "Fiat currencies"}
                    currencies={fiatVisible}
                    lang={lang}
                    compact
                  />
                  <CurrencyGridSection
                    title={lang === "ar" ? "أصول رقمية / Stablecoin" : "Digital / stablecoin assets"}
                    currencies={digitalVisible}
                    lang={lang}
                    compact
                  />
                </>
              ) : (
                <DataGrid columns={4}>
                  {visible.map((currency) => (
                    <CurrencyCard key={currency.id} currency={currency} lang={lang} compact />
                  ))}
                </DataGrid>
              )}
              {visibleCount < filtered.length && (
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    className="flash-btn-secondary"
                    onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                  >
                    {lang === "ar" ? "عرض المزيد" : "Show more"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              title={lang === "ar" ? "لا نتائج" : "No results"}
              description={
                lang === "ar" ? "جرّب رمزًا أو نوعًا مختلفًا." : "Try a different code or type."
              }
            />
          )}
        </div>
      </section>
    </div>
  );
}
