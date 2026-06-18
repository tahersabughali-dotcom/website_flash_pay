"use client";

import { useState } from "react";
import { settingsData } from "@/data/settingsData";
import type { LanguageCode } from "@/types/common";
import { FormField } from "@/components/shared/FormField";
import { FormFeedback } from "@/components/shared/FormFeedback";
import { HoneypotField } from "@/components/shared/HoneypotField";
import { SelectField, TextArea, TextInput } from "@/components/shared/FormInputs";
import { FormSection } from "@/components/shared/FormSection";
import {
  getActiveCountriesForSelect,
  getActiveCurrenciesForSelect,
} from "@/lib/dataAccess";
import { FORM_LIMITS, sanitizeFormText, validatePublicFormFields } from "@/lib/forms/validation";
import { getWhatsAppPreparedSuccess } from "@/lib/forms/formMessages";
import { PUBLIC_FORM_IDS, processWhatsAppFormSubmit } from "@/lib/forms/submitWhatsAppForm";
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
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const countryOptions = getActiveCountriesForSelect(lang);
  const currencyOptions = getActiveCurrenciesForSelect(lang);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const submitError = processWhatsAppFormSubmit({
      formId: PUBLIC_FORM_IDS.business,
      lang,
      honeypot,
      onHoneypotDiscard: () => setSuccess(getWhatsAppPreparedSuccess(lang)),
      validate: () =>
        validatePublicFormFields(
          [
            {
              key: "companyName",
              label: { ar: "اسم الشركة", en: "Company name" },
              required: true,
              type: "text",
            },
            {
              key: "whatsappNumber",
              label: { ar: "WhatsApp", en: "WhatsApp" },
              required: true,
              type: "phone",
            },
            {
              key: "notes",
              label: { ar: "ملاحظات", en: "Notes" },
              type: "notes",
            },
          ],
          values,
          lang,
        ),
      onSubmit: () => {
        const message = formatBusinessRequestMessage([
          { label: "Company Name", value: sanitizeFormText(values.companyName, FORM_LIMITS.nameMax) },
          { label: "Country", value: sanitizeFormText(values.country, 80) },
          { label: "Business Type", value: sanitizeFormText(values.businessType, 80) },
          { label: "Monthly Volume", value: sanitizeFormText(values.monthlyVolume, 80) },
          { label: "Required Currencies", value: sanitizeFormText(values.requiredCurrencies, 120) },
          { label: "Target Countries", value: sanitizeFormText(values.targetCountries, 120) },
          {
            label: "WhatsApp",
            value: sanitizeFormText(values.whatsappNumber, FORM_LIMITS.phoneMaxDigits + 6),
          },
          { label: "Notes", value: sanitizeFormText(values.notes, FORM_LIMITS.notesMax) },
        ]);

        openWhatsAppInNewTab({
          phoneNumber: settingsData.whatsappNumber,
          message,
        });

        setSuccess(getWhatsAppPreparedSuccess(lang));
      },
    });

    if (submitError) {
      setError(submitError);
      setSuccess(null);
      return;
    }

    setError(null);
  };

  return (
    <FormSection
      title={lang === "ar" ? "طلب Flash Business Class" : "Flash Business Class request"}
      description={
        lang === "ar"
          ? "املأ النموذج لتجهيز رسالة WhatsApp — لا يتم حفظ البيانات على خادم حالياً."
          : "Fill the form to prepare a WhatsApp message — data is not stored on a server yet."
      }
    >
      <form
        onSubmit={handleSubmit}
        className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <HoneypotField value={honeypot} onChange={setHoneypot} />

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label={lang === "ar" ? "اسم الشركة" : "Company name"}
            htmlFor="business-company"
            required
          >
            <TextInput
              id="business-company"
              value={values.companyName}
              maxLength={FORM_LIMITS.nameMax}
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
              maxLength={100}
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
              maxLength={100}
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
              maxLength={200}
              onChange={(e) => handleChange("targetCountries", e.target.value)}
            />
          </FormField>

          <FormField label="WhatsApp" htmlFor="business-whatsapp" required>
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
              maxLength={FORM_LIMITS.notesMax}
              onChange={(e) => handleChange("notes", e.target.value)}
            />
          </FormField>
        </div>

        <FormFeedback error={error} success={success} />

        <button type="submit" className="mt-6 flash-btn-primary">
          {lang === "ar" ? "إرسال عبر WhatsApp" : "Send via WhatsApp"}
        </button>
      </form>
    </FormSection>
  );
}
