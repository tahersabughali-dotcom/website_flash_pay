import type { RequestFormData } from "@/types/request";

export interface WhatsAppMessageOptions {
  phoneNumber: string;
  message: string;
}

export interface WhatsAppFieldLine {
  label: string;
  value?: string;
}

export interface WhatsAppRequestMessageInput {
  requestType: string;
  fields: WhatsAppFieldLine[];
}

export function sanitizeWhatsAppNumber(phoneNumber: string): string {
  return phoneNumber.replace(/\D/g, "");
}

export function buildWhatsAppUrl({ phoneNumber, message }: WhatsAppMessageOptions): string {
  const digits = sanitizeWhatsAppNumber(phoneNumber);
  if (!digits) return "#";
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppUrlFromSettings(
  phoneNumber: string,
  message: string,
): string {
  return buildWhatsAppUrl({ phoneNumber, message });
}

function buildStructuredMessage(requestType: string, fields: WhatsAppFieldLine[]): string {
  const lines = [`Flash Pay — ${requestType}`, ""];

  for (const field of fields) {
    const value = field.value?.trim();
    if (value) {
      lines.push(`${field.label}: ${value}`);
    }
  }

  return lines.join("\n");
}

/** Format a structured smart request message with only non-empty fields */
export function formatWhatsAppRequestMessage(input: WhatsAppRequestMessageInput): string {
  return buildStructuredMessage(input.requestType, input.fields);
}

/** Alias for smart request center flows */
export function formatSmartRequestMessage(input: WhatsAppRequestMessageInput): string {
  return formatWhatsAppRequestMessage(input);
}

/** Legacy helper — kept for compatibility */
export function formatRequestWhatsAppMessage(data: RequestFormData): string {
  return formatWhatsAppRequestMessage({
    requestType: "Smart Request",
    fields: [
      { label: "From Country", value: data.fromCountry },
      { label: "To Country", value: data.toCountry },
      { label: "Amount", value: data.amount },
      { label: "Currency", value: data.currency },
      { label: "Payment Method", value: data.paymentMethod },
      { label: "Receiving Method", value: data.receivingMethod },
      { label: "Customer Name", value: data.customerName },
      { label: "Customer WhatsApp", value: data.whatsappNumber },
      { label: "Notes", value: data.notes },
    ],
  });
}

export function openWhatsAppInNewTab(options: WhatsAppMessageOptions): void {
  const url = buildWhatsAppUrl(options);
  if (url === "#") return;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function openWhatsApp(options: WhatsAppMessageOptions): string {
  return buildWhatsAppUrl(options);
}

export function formatRouteFinderRequestMessage(fields: WhatsAppFieldLine[]): string {
  return buildStructuredMessage("Route Finder Request", fields);
}

export function formatBusinessRequestMessage(fields: WhatsAppFieldLine[]): string {
  return buildStructuredMessage("Business Request", fields);
}

export function formatPartnerApplicationMessage(fields: WhatsAppFieldLine[]): string {
  return buildStructuredMessage("Partner Application", fields);
}

export function formatContactMessage(fields: WhatsAppFieldLine[]): string {
  return buildStructuredMessage("Contact Request", fields);
}

export function formatMarketPriceInquiryMessage(
  assetSymbol: string,
  fields: WhatsAppFieldLine[] = [],
): string {
  return buildStructuredMessage("Market Price Inquiry", [
    { label: "Asset", value: assetSymbol },
    ...fields,
  ]);
}

/** @deprecated Use formatPartnerApplicationMessage */
export function formatPartnerRequestMessage(fields: WhatsAppFieldLine[]): string {
  return formatPartnerApplicationMessage(fields);
}
