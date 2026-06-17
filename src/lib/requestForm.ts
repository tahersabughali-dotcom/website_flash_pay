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
import { getLocalized } from "./i18n";

export function validateRequestForm(
  requestType: RequestType,
  values: Record<string, string>,
  lang: LanguageCode,
): string | null {
  for (const field of requestType.fields) {
    if (!field.required) continue;
    const value = values[field.name]?.trim();
    if (!value) {
      return lang === "ar"
        ? `يرجى تعبئة حقل: ${getLocalized(field.label, lang)}`
        : `Please fill in: ${getLocalized(field.label, lang)}`;
    }
  }
  return null;
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
  const requestTypeTitle = getLocalized(requestType.title, "en");

  const fields = requestType.fields.map((field) => {
    const raw = values[field.name]?.trim();
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
