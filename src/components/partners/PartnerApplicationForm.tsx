"use client";

import { useMemo, useState } from "react";
import { partnerNetworkData } from "@/data/partnerNetworkData";
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
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
    setSuccess(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const submitError = processWhatsAppFormSubmit({
      formId: PUBLIC_FORM_IDS.partners,
      lang,
      honeypot,
      onHoneypotDiscard: () => setSuccess(getWhatsAppPreparedSuccess(lang)),
      validate: () =>
        validatePublicFormFields(
          [
            {
              key: "officeName",
              label: { ar: "اسم المكتب", en: "Office name" },
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
        const message = formatPartnerApplicationMessage([
          { label: "Office Name", value: sanitizeFormText(values.officeName, FORM_LIMITS.nameMax) },
          { label: "Country", value: sanitizeFormText(values.country, 80) },
          { label: "City", value: sanitizeFormText(values.city, 80) },
          { label: "Partner Type", value: sanitizeFormText(values.partnerType, 80) },
          { label: "Monthly Volume", value: sanitizeFormText(values.monthlyVolume, 80) },
          {
            label: "Available Currencies",
            value: sanitizeFormText(values.availableCurrencies, 120),
          },
          {
            label: "Available Services",
            value: sanitizeFormText(values.availableServices, 120),
          },
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
      title={lang === "ar" ? "طلب الانضمام كشريك" : "Partner application"}
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
            label={lang === "ar" ? "اسم المكتب" : "Office name"}
            htmlFor="partner-office"
            required
          >
            <TextInput
              id="partner-office"
              value={values.officeName}
              maxLength={FORM_LIMITS.nameMax}
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
              maxLength={100}
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
              maxLength={100}
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
              maxLength={200}
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
