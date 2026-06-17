"use client";

import { useState } from "react";
import { settingsData } from "@/data/settingsData";
import type { LanguageCode } from "@/types/common";
import { FormField } from "@/components/shared/FormField";
import { SelectField, TextArea, TextInput } from "@/components/shared/FormInputs";
import { FormSection } from "@/components/shared/FormSection";
import { contactTopicsData } from "@/data/pageContentData";
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
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSubmitted(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!values.name.trim() || !values.whatsappNumber.trim()) {
      setError(
        lang === "ar"
          ? "يرجى إدخال الاسم ورقم WhatsApp."
          : "Please enter your name and WhatsApp number.",
      );
      return;
    }

    const message = formatContactMessage([
      { label: "Name", value: values.name },
      { label: "WhatsApp", value: values.whatsappNumber },
      { label: "Topic", value: values.topic },
      { label: "Message", value: values.message },
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
      title={lang === "ar" ? "نموذج التواصل" : "Contact form"}
      description={
        lang === "ar"
          ? "سيتم فتح WhatsApp برسالة منظمة — لا يتم حفظ البيانات حالياً."
          : "WhatsApp will open with a structured message — data is not stored yet."
      }
    >
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5">
          <FormField
            label={lang === "ar" ? "الاسم" : "Name"}
            htmlFor="contact-name"
            required
          >
            <TextInput
              id="contact-name"
              value={values.name}
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
              onChange={(e) => handleChange("message", e.target.value)}
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
          className="mt-6 flash-btn-primary bg-[#25D366] hover:bg-[#1fb855]"
        >
          {lang === "ar" ? "إرسال عبر WhatsApp" : "Send via WhatsApp"}
        </button>
      </form>
    </FormSection>
  );
}
