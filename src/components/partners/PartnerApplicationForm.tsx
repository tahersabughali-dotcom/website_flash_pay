"use client";

import { useMemo, useState } from "react";
import { partnerNetworkData } from "@/data/partnerNetworkData";
import { settingsData } from "@/data/settingsData";
import type { LanguageCode } from "@/types/common";
import { FormField } from "@/components/shared/FormField";
import { SelectField, TextArea, TextInput } from "@/components/shared/FormInputs";
import { FormSection } from "@/components/shared/FormSection";
import {
  getActiveCountriesForSelect,
  getActiveCurrenciesForSelect,
} from "@/lib/dataAccess";
import { getLocalized } from "@/lib/i18n";
import { filterByStatus, sortByOrder } from "@/lib/filters";
import {
  formatPartnerApplicationMessage,
  openWhatsAppInNewTab,
} from "@/lib/whatsapp";

interface PartnerApplicationFormProps {
  lang: LanguageCode;
}

export function PartnerApplicationForm({ lang }: PartnerApplicationFormProps) {
  const [values, setValues] = useState({
    officeName: "",
    country: "",
    city: "",
    partnerType: "",
    monthlyVolume: "",
    availableCurrencies: "",
    availableServices: "",
    whatsappNumber: "",
    notes: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const countryOptions = getActiveCountriesForSelect(lang);
  const currencyOptions = getActiveCurrenciesForSelect(lang);
  const partnerTypeOptions = useMemo(
    () =>
      sortByOrder(filterByStatus(partnerNetworkData)).map((entry) => ({
        value: entry.slug,
        label: getLocalized(entry.title, lang),
      })),
    [lang],
  );

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSubmitted(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!values.officeName.trim() || !values.whatsappNumber.trim()) {
      setError(
        lang === "ar"
          ? "يرجى إدخال اسم المكتب ورقم WhatsApp."
          : "Please enter office name and WhatsApp number.",
      );
      return;
    }

    const message = formatPartnerApplicationMessage([
      { label: "Office Name", value: values.officeName },
      { label: "Country", value: values.country },
      { label: "City", value: values.city },
      { label: "Partner Type", value: values.partnerType },
      { label: "Monthly Volume", value: values.monthlyVolume },
      { label: "Available Currencies", value: values.availableCurrencies },
      { label: "Available Services", value: values.availableServices },
      { label: "WhatsApp", value: values.whatsappNumber },
      { label: "Notes", value: values.notes },
    ]);

    openWhatsAppInNewTab({
      phoneNumber: settingsData.whatsappNumber,
      message,
    });

    setSubmitted(true);
    setError(null);
  };

  return (
    <FormSection
      title={lang === "ar" ? "طلب الانضمام كشريك" : "Partner application"}
      description={
        lang === "ar"
          ? "املأ النموذج لفتح WhatsApp — لا يتم حفظ البيانات حالياً."
          : "Fill the form to open WhatsApp — data is not stored yet."
      }
    >
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label={lang === "ar" ? "اسم المكتب" : "Office name"}
            htmlFor="partner-office"
            required
          >
            <TextInput
              id="partner-office"
              value={values.officeName}
              onChange={(e) => handleChange("officeName", e.target.value)}
            />
          </FormField>

          <FormField label={lang === "ar" ? "الدولة" : "Country"} htmlFor="partner-country">
            <SelectField
              id="partner-country"
              options={countryOptions}
              placeholder={lang === "ar" ? "اختر الدولة" : "Select country"}
              value={values.country}
              onChange={(e) => handleChange("country", e.target.value)}
            />
          </FormField>

          <FormField label={lang === "ar" ? "المدينة" : "City"} htmlFor="partner-city">
            <TextInput
              id="partner-city"
              value={values.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </FormField>

          <FormField
            label={lang === "ar" ? "نوع الشريك" : "Partner type"}
            htmlFor="partner-type"
          >
            <SelectField
              id="partner-type"
              options={partnerTypeOptions}
              placeholder={lang === "ar" ? "اختر النوع" : "Select type"}
              value={values.partnerType}
              onChange={(e) => handleChange("partnerType", e.target.value)}
            />
          </FormField>

          <FormField
            label={lang === "ar" ? "الحجم الشهري" : "Monthly volume"}
            htmlFor="partner-volume"
          >
            <TextInput
              id="partner-volume"
              value={values.monthlyVolume}
              onChange={(e) => handleChange("monthlyVolume", e.target.value)}
            />
          </FormField>

          <FormField
            label={lang === "ar" ? "العملات المتاحة" : "Available currencies"}
            htmlFor="partner-currencies"
          >
            <SelectField
              id="partner-currencies"
              options={currencyOptions}
              placeholder={lang === "ar" ? "اختر عملة" : "Select currency"}
              value={values.availableCurrencies}
              onChange={(e) => handleChange("availableCurrencies", e.target.value)}
            />
          </FormField>

          <FormField
            label={lang === "ar" ? "الخدمات المتاحة" : "Available services"}
            htmlFor="partner-services"
            className="sm:col-span-2"
          >
            <TextInput
              id="partner-services"
              value={values.availableServices}
              onChange={(e) => handleChange("availableServices", e.target.value)}
            />
          </FormField>

          <FormField label="WhatsApp" htmlFor="partner-whatsapp" required>
            <TextInput
              id="partner-whatsapp"
              value={values.whatsappNumber}
              onChange={(e) => handleChange("whatsappNumber", e.target.value)}
            />
          </FormField>

          <FormField
            label={lang === "ar" ? "ملاحظات" : "Notes"}
            htmlFor="partner-notes"
            className="sm:col-span-2"
          >
            <TextArea
              id="partner-notes"
              value={values.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
            />
          </FormField>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        {submitted && (
          <p className="mt-4 text-sm text-emerald-700">
            {lang === "ar" ? "تم فتح WhatsApp." : "WhatsApp opened."}
          </p>
        )}

        <button
          type="submit"
          className="mt-6 flash-btn-primary"
        >
          {lang === "ar" ? "إرسال عبر WhatsApp" : "Send via WhatsApp"}
        </button>
      </form>
    </FormSection>
  );
}
