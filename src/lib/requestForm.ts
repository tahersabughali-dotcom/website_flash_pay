import type { LanguageCode } from "@/types/common";
import type { RequestType } from "@/types/request";
import {
  getActiveCountriesForSelect,
  getActiveCurrenciesForSelect,
  getActivePaymentMethodsForSelect,
  getActiveReceivingMethodsForSelect,
  resolveCountryLabel,
  resolvePaymentMethodLabel,
  resolveReceivingMethodLabel,
} from "./dataAccess";
import {
  FORM_LIMITS,
  sanitizeFormText,
  sanitizeNotes,
  validateAmount,
  validateMessageText,
  validatePublicFormFields,
  validateWhatsAppNumber,
  type PublicFormFieldRule,
} from "@/lib/forms/validation";
import { getLocalized } from "./i18n";

function fieldRuleFromRequestField(
  field: RequestType["fields"][number],
): PublicFormFieldRule {
  let type: PublicFormFieldRule["type"] = "text";

  if (field.name === "whatsappNumber") type = "phone";
  else if (field.name === "amount") type = "amount";
  else if (field.name === "notes") type = "notes";
  else if (field.type === "textarea") type = "message";

  return {
    key: field.name,
    label: field.label,
    required: field.required,
    type,
  };
}

export function validateRequestForm(
  requestType: RequestType,
  values: Record<string, string>,
  lang: LanguageCode,
): string | null {
  const rules = requestType.fields.map(fieldRuleFromRequestField);
  const baseError = validatePublicFormFields(rules, values, lang);
  if (baseError) return baseError;

  for (const field of requestType.fields) {
    const raw = values[field.name];
    if (!raw?.trim()) continue;

    if (field.name === "customerName") {
      const name = sanitizeFormText(raw, FORM_LIMITS.nameMax);
      if (name.length < FORM_LIMITS.nameMin) {
        return lang === "ar" ? "يرجى إدخال اسم العميل." : "Please enter the customer name.";
      }
    }

    if (field.name === "whatsappNumber") {
      const phoneError = validateWhatsAppNumber(raw, lang);
      if (phoneError) return phoneError;
    }

    if (field.name === "amount") {
      const amountError = validateAmount(raw, lang, field.required);
      if (amountError) return amountError;
    }

    if (field.name === "notes" && raw.trim()) {
      const notesError = validateMessageText(raw, lang, {
        maxLength: FORM_LIMITS.notesMax,
        label: field.label,
      });
      if (notesError) return notesError;
    }
  }

  return null;
}

/** Sanitize request form values before WhatsApp preview or local draft storage */
export function sanitizeRequestFormValues(
  values: Record<string, string>,
): Record<string, string> {
  const next: Record<string, string> = {};

  for (const [key, value] of Object.entries(values)) {
    if (key === "notes") {
      const notes = sanitizeNotes(value);
      if (notes) next[key] = notes;
      continue;
    }
    if (key === "amount") {
      next[key] = sanitizeFormText(value).replace(/,/g, "");
      continue;
    }
    if (key === "whatsappNumber") {
      next[key] = sanitizeFormText(value, 30);
      continue;
    }
    next[key] = sanitizeFormText(value, key === "customerName" ? FORM_LIMITS.nameMax : 200);
  }

  return next;
}

export function getWhatsAppFieldLabel(fieldName: string, fallback: string): string {
  const labels: Record<string, string> = {
    fromCountry: "From Country",
    toCountry: "To Country",
    amount: "Amount",
    currency: "Currency",
    paymentMethod: "Payment Method",
    receivingMethod: "Receiving Method",
    customerName: "Customer Name",
    whatsappNumber: "Customer WhatsApp",
    notes: "Notes",
  };
  return labels[fieldName] ?? fallback;
}

export function buildRequestWhatsAppPayload(
  requestType: RequestType,
  values: Record<string, string>,
) {
  const sanitized = sanitizeRequestFormValues(values);
  const requestTypeTitle = getLocalized(requestType.title, "en");

  const fields = requestType.fields.map((field) => {
    const raw = sanitized[field.name]?.trim();
    let displayValue = raw;

    if (raw && (field.name === "fromCountry" || field.name === "toCountry")) {
      displayValue = resolveCountryLabel(raw, "en");
    } else if (raw && field.name === "paymentMethod") {
      displayValue = resolvePaymentMethodLabel(raw, "en");
    } else if (raw && field.name === "receivingMethod") {
      displayValue = resolveReceivingMethodLabel(raw, "en");
    }

    return {
      label: getWhatsAppFieldLabel(field.name, getLocalized(field.label, "en")),
      value: displayValue,
    };
  });

  return { requestType: requestTypeTitle, fields };
}

export function getSelectOptionsForField(
  fieldName: string,
  lang: LanguageCode,
): { value: string; label: string }[] {
  switch (fieldName) {
    case "fromCountry":
    case "toCountry":
      return getActiveCountriesForSelect(lang);
    case "currency":
      return getActiveCurrenciesForSelect(lang);
    case "paymentMethod":
      return getActivePaymentMethodsForSelect(lang);
    case "receivingMethod":
      return getActiveReceivingMethodsForSelect(lang);
    default:
      return [];
  }
}
