"use client";

import { useState } from "react";
import { settingsData } from "@/data/settingsData";
import type { LanguageCode } from "@/types/common";
import { FormField } from "@/components/shared/FormField";
import { SelectField, TextArea, TextInput } from "@/components/shared/FormInputs";
import { FormSection } from "@/components/shared/FormSection";
import {
  getActiveCountriesForSelect,
  getActiveCurrenciesForSelect,
} from "@/lib/dataAccess";
import {
  formatBusinessRequestMessage,
  openWhatsAppInNewTab,
} from "@/lib/whatsapp";

interface BusinessRequestFormProps {
  lang: LanguageCode;
}

export function BusinessRequestForm({ lang }: BusinessRequestFormProps) {
  const [values, setValues] = useState({
    companyName: "",
    country: "",
    businessType: "",
    monthlyVolume: "",
    requiredCurrencies: "",
    targetCountries: "",
    whatsappNumber: "",
    notes: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const countryOptions = getActiveCountriesForSelect(lang);
  const currencyOptions = getActiveCurrenciesForSelect(lang);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSubmitted(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!values.companyName.trim() || !values.whatsappNumber.trim()) {
      setError(
        lang === "ar"
          ? "يرجى إدخال اسم الشركة ورقم WhatsApp."
          : "Please enter company name and WhatsApp number.",
      );
      return;
    }

    const message = formatBusinessRequestMessage([
      { label: "Company Name", value: values.companyName },
      { label: "Country", value: values.country },
      { label: "Business Type", value: values.businessType },
      { label: "Monthly Volume", value: values.monthlyVolume },
      { label: "Required Currencies", value: values.requiredCurrencies },
      { label: "Target Countries", value: values.targetCountries },
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
      title={lang === "ar" ? "طلب Flash Business Class" : "Flash Business Class request"}
      description={
        lang === "ar"
          ? "املأ النموذج وسيتم فتح WhatsApp برسالة منظمة — لا يتم حفظ البيانات حالياً."
          : "Fill the form to open WhatsApp with a structured message — data is not stored yet."
      }
    >
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label={lang === "ar" ? "اسم الشركة" : "Company name"}
            htmlFor="business-company"
            required
          >
            <TextInput
              id="business-company"
              value={values.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
            />
          </FormField>

          <FormField
            label={lang === "ar" ? "الدولة" : "Country"}
            htmlFor="business-country"
          >
            <SelectField
              id="business-country"
              options={countryOptions}
              placeholder={lang === "ar" ? "اختر الدولة" : "Select country"}
              value={values.country}
              onChange={(e) => handleChange("country", e.target.value)}
            />
          </FormField>

          <FormField
            label={lang === "ar" ? "نوع النشاط" : "Business type"}
            htmlFor="business-type"
          >
            <TextInput
              id="business-type"
              value={values.businessType}
              onChange={(e) => handleChange("businessType", e.target.value)}
            />
          </FormField>

          <FormField
            label={lang === "ar" ? "الحجم الشهري" : "Monthly volume"}
            htmlFor="business-volume"
          >
            <TextInput
              id="business-volume"
              value={values.monthlyVolume}
              onChange={(e) => handleChange("monthlyVolume", e.target.value)}
            />
          </FormField>

          <FormField
            label={lang === "ar" ? "العملات المطلوبة" : "Required currencies"}
            htmlFor="business-currencies"
            className="sm:col-span-2"
          >
            <SelectField
              id="business-currencies"
              options={currencyOptions}
              placeholder={lang === "ar" ? "اختر عملة" : "Select currency"}
              value={values.requiredCurrencies}
              onChange={(e) => handleChange("requiredCurrencies", e.target.value)}
            />
          </FormField>

          <FormField
            label={lang === "ar" ? "الدول المستهدفة" : "Target countries"}
            htmlFor="business-targets"
            className="sm:col-span-2"
          >
            <TextInput
              id="business-targets"
              value={values.targetCountries}
              onChange={(e) => handleChange("targetCountries", e.target.value)}
            />
          </FormField>

          <FormField
            label="WhatsApp"
            htmlFor="business-whatsapp"
            required
          >
            <TextInput
              id="business-whatsapp"
              value={values.whatsappNumber}
              onChange={(e) => handleChange("whatsappNumber", e.target.value)}
            />
          </FormField>

          <FormField
            label={lang === "ar" ? "ملاحظات" : "Notes"}
            htmlFor="business-notes"
            className="sm:col-span-2"
          >
            <TextArea
              id="business-notes"
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
