"use client";

import type { LanguageCode } from "@/types/common";
import { FormField } from "@/components/shared/FormField";
import { SelectField, TextInput } from "@/components/shared/FormInputs";
import type { RouteFinderFormState } from "./RouteFinderInteractive";

interface RouteFinderFormProps {
  form: RouteFinderFormState;
  onChange: (form: RouteFinderFormState) => void;
  onSearch: () => void;
  countries: { value: string; label: string }[];
  currencies: { value: string; label: string }[];
  receivingMethods: { value: string; label: string }[];
  lang: LanguageCode;
}

export function RouteFinderForm({
  form,
  onChange,
  onSearch,
  countries,
  currencies,
  receivingMethods,
  lang,
}: RouteFinderFormProps) {
  const update = (key: keyof RouteFinderFormState, value: string) => {
    onChange({ ...form, [key]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label={lang === "ar" ? "من دولة" : "From country"}
          htmlFor="from-country"
          required
        >
          <SelectField
            id="from-country"
            value={form.fromCountrySlug}
            onChange={(e) => update("fromCountrySlug", e.target.value)}
            options={countries}
            placeholder={lang === "ar" ? "اختر..." : "Select..."}
          />
        </FormField>

        <FormField
          label={lang === "ar" ? "إلى دولة" : "To country"}
          htmlFor="to-country"
          required
        >
          <SelectField
            id="to-country"
            value={form.toCountrySlug}
            onChange={(e) => update("toCountrySlug", e.target.value)}
            options={countries}
            placeholder={lang === "ar" ? "اختر..." : "Select..."}
          />
        </FormField>

        <FormField label={lang === "ar" ? "العملة" : "Currency"} htmlFor="currency">
          <SelectField
            id="currency"
            value={form.currency}
            onChange={(e) => update("currency", e.target.value)}
            options={currencies}
            placeholder={lang === "ar" ? "اختياري" : "Optional"}
          />
        </FormField>

        <FormField label={lang === "ar" ? "المبلغ" : "Amount"} htmlFor="amount">
          <TextInput
            id="amount"
            type="number"
            min="0"
            value={form.amount}
            onChange={(e) => update("amount", e.target.value)}
            placeholder={lang === "ar" ? "اختياري" : "Optional"}
          />
        </FormField>

        <FormField
          label={lang === "ar" ? "طريقة الاستلام المفضلة" : "Preferred receiving method"}
          htmlFor="receiving-method"
          className="sm:col-span-2"
        >
          <SelectField
            id="receiving-method"
            value={form.receivingMethod}
            onChange={(e) => update("receivingMethod", e.target.value)}
            options={receivingMethods}
            placeholder={lang === "ar" ? "اختياري" : "Optional"}
          />
        </FormField>
      </div>

      <button
        type="submit"
        className="mt-6 rounded-xl bg-flash-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-flash-primary-dark"
      >
        {lang === "ar" ? "ابحث عن المسارات" : "Find routes"}
      </button>
    </form>
  );
}
