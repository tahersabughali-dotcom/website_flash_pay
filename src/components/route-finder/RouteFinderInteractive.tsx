"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { settingsData } from "@/data/settingsData";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";
import {
  getActiveCountriesForSelect,
  getActiveCurrenciesForSelect,
  getActiveReceivingMethodsForSelect,
} from "@/lib/dataAccess";
import { searchRoutes } from "@/lib/routeFinder";
import type { LanguageCode } from "@/types/common";
import { RouteFinderForm } from "./RouteFinderForm";
import { RouteResultCard } from "./RouteResultCard";
import { RouteEmptyState } from "./RouteEmptyState";

export interface RouteFinderFormState {
  fromCountrySlug: string;
  toCountrySlug: string;
  currency: string;
  amount: string;
  receivingMethod: string;
}

const initialForm: RouteFinderFormState = {
  fromCountrySlug: "",
  toCountrySlug: "",
  currency: "",
  amount: "",
  receivingMethod: "",
};

export function RouteFinderInteractive() {
  const lang = settingsData.defaultLanguage;
  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from") ?? "";
  const toParam = searchParams.get("to") ?? "";

  const [form, setForm] = useState<RouteFinderFormState>({
    ...initialForm,
    fromCountrySlug: fromParam,
    toCountrySlug: toParam,
  });
  const [searched, setSearched] = useState(Boolean(fromParam && toParam));

  const countries = useMemo(() => getActiveCountriesForSelect(lang), [lang]);
  const currencies = useMemo(() => getActiveCurrenciesForSelect(lang), [lang]);
  const receivingMethods = useMemo(() => getActiveReceivingMethodsForSelect(lang), [lang]);

  const results = useMemo(() => {
    if (!searched || !form.fromCountrySlug || !form.toCountrySlug) return [];

    const amount = form.amount ? Number(form.amount) : undefined;

    return searchRoutes({
      fromCountrySlug: form.fromCountrySlug,
      toCountrySlug: form.toCountrySlug,
      currency: form.currency || undefined,
      amount: amount !== undefined && !Number.isNaN(amount) ? amount : undefined,
      receivingMethod: form.receivingMethod || undefined,
    });
  }, [form, searched]);

  const handleSearch = () => {
    setSearched(true);
  };

  return (
    <>
      <section className="mt-8">
        <RouteFinderForm
          form={form}
          onChange={setForm}
          onSearch={handleSearch}
          countries={countries}
          currencies={currencies}
          receivingMethods={receivingMethods}
          lang={lang}
        />
      </section>

      {searched && (
        <section className="mt-8">
          <SectionHeader
            title={
              lang === "ar"
                ? `${results.length} مسار متاح`
                : `${results.length} route${results.length === 1 ? "" : "s"} found`
            }
            subtitle={
              lang === "ar"
                ? "التوفر يعتمد على الدولة، العملة، نوع الخدمة، وتغطية الشركاء."
                : "Availability depends on country, currency, service type, and partner coverage."
            }
          />

          {results.length > 0 ? (
            <div className="grid gap-4">
              {results.map((route) => (
                <RouteResultCard
                  key={route.id}
                  route={route}
                  form={form}
                  lang={lang}
                />
              ))}
            </div>
          ) : (
            <RouteEmptyState form={form} lang={lang} />
          )}
        </section>
      )}

      <div className="mt-8">
        <DisclaimerBox
          title={lang === "ar" ? "تنبيه مهم" : "Important notice"}
          content={
            lang === "ar"
              ? "Flash Pay لا تضمن أسعارًا نهائية أو رسومًا على الموقع. بعض الخدمات تُنسق عبر شبكة شركاء موثوقة."
              : "Flash Pay does not guarantee final rates or fees on the website. Some services are coordinated through trusted partner offices."
          }
        />
      </div>
    </>
  );
}

export function RouteFinderFormFallback({ lang }: { lang: LanguageCode }) {
  return (
    <section className="mt-8">
      <div className="flash-card p-6 text-sm text-flash-muted">
        {lang === "ar"
          ? "استخدم النموذج أدناه للبحث عن مسارات متاحة بين الدول."
          : "Use the form below to search for available routes between countries."}
      </div>
    </section>
  );
}
