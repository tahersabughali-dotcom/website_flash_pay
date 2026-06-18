"use client";

import { useState } from "react";
import { settingsData } from "@/data/settingsData";
import type { LanguageCode } from "@/types/common";
import { FormField } from "@/components/shared/FormField";
import { FormFeedback } from "@/components/shared/FormFeedback";
import { HoneypotField } from "@/components/shared/HoneypotField";
import { SelectField, TextArea, TextInput } from "@/components/shared/FormInputs";
import { FormSection } from "@/components/shared/FormSection";
import { contactTopicsData } from "@/data/pageContentData";
import { FORM_LIMITS, sanitizeFormText } from "@/lib/forms/validation";
import { getWhatsAppPreparedSuccess } from "@/lib/forms/formMessages";
import { PUBLIC_FORM_IDS, processWhatsAppFormSubmit } from "@/lib/forms/submitWhatsAppForm";
import { validatePublicFormFields } from "@/lib/forms/validation";
import { formatContactMessage, openWhatsAppInNewTab } from "@/lib/whatsapp";
import { getLocalized } from "@/lib/i18n";

interface ContactFormProps {
  lang: LanguageCode;
}

export function ContactForm({ lang }: ContactFormProps) {
  const [values, setValues] = useState({
    name: "",
    whatsappNumber: "",
    topic: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const submitError = processWhatsAppFormSubmit({
      formId: PUBLIC_FORM_IDS.contact,
      lang,
      honeypot,
      onHoneypotDiscard: () => setSuccess(getWhatsAppPreparedSuccess(lang)),
      validate: () =>
        validatePublicFormFields(
          [
            { key: "name", label: { ar: "الاسم", en: "Name" }, required: true, type: "text" },
            {
              key: "whatsappNumber",
              label: { ar: "WhatsApp", en: "WhatsApp" },
              required: true,
              type: "phone",
            },
            {
              key: "message",
              label: { ar: "الرسالة", en: "Message" },
              type: "message",
            },
          ],
          values,
          lang,
        ),
      onSubmit: () => {
        const message = formatContactMessage([
          { label: "Name", value: sanitizeFormText(values.name, FORM_LIMITS.nameMax) },
          {
            label: "WhatsApp",
            value: sanitizeFormText(values.whatsappNumber, FORM_LIMITS.phoneMaxDigits + 6),
          },
          { label: "Topic", value: sanitizeFormText(values.topic, 80) },
          { label: "Message", value: sanitizeFormText(values.message, FORM_LIMITS.messageMax) },
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
      title={lang === "ar" ? "نموذج التواصل" : "Contact form"}
      description={
        lang === "ar"
          ? "سيتم تجهيز رسالتك لفتح WhatsApp — لا يتم حفظ البيانات على خادم حالياً."
          : "Your message will be prepared to open WhatsApp — data is not stored on a server yet."
      }
    >
      <form
        onSubmit={handleSubmit}
        className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <HoneypotField value={honeypot} onChange={setHoneypot} />

        <div className="grid gap-5">
          <FormField
            label={lang === "ar" ? "الاسم" : "Name"}
            htmlFor="contact-name"
            required
          >
            <TextInput
              id="contact-name"
              value={values.name}
              maxLength={FORM_LIMITS.nameMax}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </FormField>

          <FormField label="WhatsApp" htmlFor="contact-whatsapp" required>
            <TextInput
              id="contact-whatsapp"
              value={values.whatsappNumber}
              onChange={(e) => handleChange("whatsappNumber", e.target.value)}
            />
          </FormField>

          <FormField label={lang === "ar" ? "الموضوع" : "Topic"} htmlFor="contact-topic">
            <SelectField
              id="contact-topic"
              options={contactTopicsData.map((option) => ({
                value: option.value,
                label: getLocalized(option.label, lang),
              }))}
              placeholder={lang === "ar" ? "اختر الموضوع" : "Select topic"}
              value={values.topic}
              onChange={(e) => handleChange("topic", e.target.value)}
            />
          </FormField>

          <FormField label={lang === "ar" ? "الرسالة" : "Message"} htmlFor="contact-message">
            <TextArea
              id="contact-message"
              value={values.message}
              maxLength={FORM_LIMITS.messageMax}
              onChange={(e) => handleChange("message", e.target.value)}
            />
          </FormField>
        </div>

        <FormFeedback error={error} success={success} />

        <button
          type="submit"
          className="mt-6 flash-btn-primary bg-[#25D366] hover:bg-[#1fb855]"
        >
          {lang === "ar" ? "إرسال عبر WhatsApp" : "Send via WhatsApp"}
        </button>
      </form>
    </FormSection>
  );
}
