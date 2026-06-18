"use client";

import { useMemo, useState } from "react";
import { settingsData } from "@/data/settingsData";
import type { LanguageCode } from "@/types/common";
import type { RequestType } from "@/types/request";
import { FormField } from "@/components/shared/FormField";
import { FormFeedback } from "@/components/shared/FormFeedback";
import { HoneypotField } from "@/components/shared/HoneypotField";
import { SelectField, TextArea, TextInput } from "@/components/shared/FormInputs";
import { isLocalRequestDraftEnabled } from "@/lib/auth/adminAccessConfig";
import { FORM_LIMITS } from "@/lib/forms/validation";
import { getWhatsAppPreparedSuccess } from "@/lib/forms/formMessages";
import { PUBLIC_FORM_IDS, processWhatsAppFormSubmit } from "@/lib/forms/submitWhatsAppForm";
import { getLocalized } from "@/lib/i18n";
import {
  buildRequestWhatsAppPayload,
  getSelectOptionsForField,
  sanitizeRequestFormValues,
  validateRequestForm,
} from "@/lib/requestForm";
import {
  createRequest,
  createRequestFromFormPayload,
} from "@/lib/requests/requestRepository";
import {
  buildWhatsAppUrlFromSettings,
  formatWhatsAppRequestMessage,
  openWhatsAppInNewTab,
} from "@/lib/whatsapp";
import { RequestSummary } from "./RequestSummary";
import { VisualSelectPreview } from "@/components/shared/VisualSelectPreview";

interface DynamicRequestFormProps {
  requestType: RequestType;
  lang: LanguageCode;
}

export function DynamicRequestForm({ requestType, lang }: DynamicRequestFormProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const summaryPayload = useMemo(
    () => buildRequestWhatsAppPayload(requestType, values),
    [requestType, values],
  );

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const submitError = processWhatsAppFormSubmit({
      formId: PUBLIC_FORM_IDS.request,
      lang,
      honeypot,
      onHoneypotDiscard: () =>
        setSuccess(getWhatsAppPreparedSuccess(lang, isLocalRequestDraftEnabled())),
      validate: () => validateRequestForm(requestType, values, lang),
      onSubmit: () => {
        const sanitized = sanitizeRequestFormValues(values);
        const payload = buildRequestWhatsAppPayload(requestType, sanitized);
        const message = formatWhatsAppRequestMessage(payload);

        if (isLocalRequestDraftEnabled()) {
          createRequest(
            createRequestFromFormPayload({
              requestType,
              values: sanitized,
              source: "website_form",
              serviceSlug: requestType.slug,
            }),
          );
        }

        openWhatsAppInNewTab({
          phoneNumber: settingsData.whatsappNumber,
          message,
        });

        setSuccess(getWhatsAppPreparedSuccess(lang, isLocalRequestDraftEnabled()));
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
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <form
        onSubmit={handleSubmit}
        className="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
      >
        <HoneypotField value={honeypot} onChange={setHoneypot} />

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {requestType.fields.map((field) => {
            const label = getLocalized(field.label, lang);
            const fieldId = `${requestType.slug}-${field.name}`;
            const maxLength =
              field.name === "notes"
                ? FORM_LIMITS.notesMax
                : field.name === "customerName"
                  ? FORM_LIMITS.nameMax
                  : undefined;

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
                    maxLength={maxLength}
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
                  <VisualSelectPreview fieldName={field.name} value={values[field.name] ?? ""} lang={lang} />
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
                  maxLength={maxLength}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              </FormField>
            );
          })}
        </div>

        <FormFeedback error={error} success={success} />

        <div className="mt-6 flex flex-wrap gap-3">
          <button type="submit" className="flash-btn-primary">
            {lang === "ar" ? "إرسال عبر WhatsApp" : "Send via WhatsApp"}
          </button>
          <button
            type="button"
            onClick={() => {
              setValues({});
              setHoneypot("");
              setError(null);
              setSuccess(null);
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
