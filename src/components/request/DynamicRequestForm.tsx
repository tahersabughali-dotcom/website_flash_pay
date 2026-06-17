"use client";

import { useMemo, useState } from "react";
import { settingsData } from "@/data/settingsData";
import type { LanguageCode } from "@/types/common";
import type { RequestType } from "@/types/request";
import { FormField } from "@/components/shared/FormField";
import { SelectField, TextArea, TextInput } from "@/components/shared/FormInputs";
import {
  buildRequestWhatsAppPayload,
  getSelectOptionsForField,
  validateRequestForm,
} from "@/lib/requestForm";
import { getLocalized } from "@/lib/i18n";
import {
  buildWhatsAppUrlFromSettings,
  formatWhatsAppRequestMessage,
  openWhatsAppInNewTab,
} from "@/lib/whatsapp";
import { RequestSummary } from "./RequestSummary";

interface DynamicRequestFormProps {
  requestType: RequestType;
  lang: LanguageCode;
}

export function DynamicRequestForm({ requestType, lang }: DynamicRequestFormProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const summaryPayload = useMemo(
    () => buildRequestWhatsAppPayload(requestType, values),
    [requestType, values],
  );

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSubmitted(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const validationError = validateRequestForm(requestType, values, lang);
    if (validationError) {
      setError(validationError);
      return;
    }

    const payload = buildRequestWhatsAppPayload(requestType, values);
    const message = formatWhatsAppRequestMessage(payload);

    openWhatsAppInNewTab({
      phoneNumber: settingsData.whatsappNumber,
      message,
    });

    setSubmitted(true);
    setError(null);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {requestType.fields.map((field) => {
            const label = getLocalized(field.label, lang);
            const fieldId = `${requestType.slug}-${field.name}`;

            if (field.type === "textarea") {
              return (
                <FormField
                  key={field.name}
                  label={label}
                  htmlFor={fieldId}
                  required={field.required}
                  className="sm:col-span-2"
                >
                  <TextArea
                    id={fieldId}
                    value={values[field.name] ?? ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  />
                </FormField>
              );
            }

            if (field.type === "select") {
              const options = getSelectOptionsForField(field.name, lang);
              return (
                <FormField
                  key={field.name}
                  label={label}
                  htmlFor={fieldId}
                  required={field.required}
                >
                  <SelectField
                    id={fieldId}
                    value={values[field.name] ?? ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    options={options}
                    placeholder={lang === "ar" ? "اختر..." : "Select..."}
                  />
                </FormField>
              );
            }

            return (
              <FormField
                key={field.name}
                label={label}
                htmlFor={fieldId}
                required={field.required}
              >
                <TextInput
                  id={fieldId}
                  type={field.type === "number" ? "number" : "text"}
                  value={values[field.name] ?? ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              </FormField>
            );
          })}
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        {submitted && (
          <p className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {lang === "ar"
              ? "تم فتح WhatsApp. أكّد الطلب هناك."
              : "WhatsApp opened. Please confirm your request there."}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="submit"
            className="flash-btn-primary"
          >
            {lang === "ar" ? "إرسال عبر WhatsApp" : "Send via WhatsApp"}
          </button>
          <button
            type="button"
            onClick={() => {
              setValues({});
              setError(null);
              setSubmitted(false);
            }}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-flash-muted transition hover:border-flash-primary hover:text-flash-primary"
          >
            {lang === "ar" ? "مسح" : "Clear"}
          </button>
        </div>
      </form>

      <RequestSummary
        requestType={requestType}
        payload={summaryPayload}
        lang={lang}
        previewUrl={buildWhatsAppUrlFromSettings(
          settingsData.whatsappNumber,
          formatWhatsAppRequestMessage(summaryPayload),
        )}
      />
    </div>
  );
}
