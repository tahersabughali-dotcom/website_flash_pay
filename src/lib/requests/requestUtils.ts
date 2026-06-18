import type {
  AdminRequestFilters,
  AdminRequestInternalNote,
  AdminRequestPriority,
  AdminRequestSource,
  AdminRequestStatus,
  AdminRequestTimelineEvent,
  AdminServiceRequest,
  CreateAdminRequestInput,
} from "@/types/adminRequest";
import type { RequestType } from "@/types/request";
import type { LanguageCode } from "@/types/common";
import { buildRequestWhatsAppPayload } from "@/lib/requestForm";
import { sanitizeFormText, sanitizeNotes } from "@/lib/forms/validation";
import { formatWhatsAppRequestMessage } from "@/lib/whatsapp";
import { getLocalized } from "@/lib/i18n";
import { buildWhatsAppUrlFromSettings } from "@/lib/whatsapp";
import { settingsData } from "@/data/settingsData";
import {
  ADMIN_REQUEST_PRIORITY_LABELS,
  ADMIN_REQUEST_STATUS_LABELS,
} from "@/data/mockRequestsData";

export const REQUESTS_STORAGE_KEY = "flash-pay-service-requests-v1";

export function generateRequestId(): string {
  return `req-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function generateRequestNumber(existing: AdminServiceRequest[]): string {
  const year = new Date().getFullYear();
  const max = existing.reduce((acc, item) => {
    const match = item.requestNumber.match(/FP-\d{4}-(\d+)/);
    return match ? Math.max(acc, Number(match[1])) : acc;
  }, 0);
  return `FP-${year}-${String(max + 1).padStart(4, "0")}`;
}

export function createTimelineEvent(
  type: AdminRequestTimelineEvent["type"],
  label: { ar: string; en: string },
  meta?: string,
): AdminRequestTimelineEvent {
  return {
    id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    type,
    label,
    createdAt: new Date().toISOString(),
    meta,
  };
}

export function buildInternalRequestSummary(
  request: AdminServiceRequest,
  lang: LanguageCode = "ar",
): string {
  const lines = [
    `#${request.requestNumber} — ${request.requestType}`,
    `${lang === "ar" ? "العميل" : "Customer"}: ${request.customerName}`,
    `${lang === "ar" ? "WhatsApp" : "WhatsApp"}: ${request.customerWhatsapp}`,
    `${lang === "ar" ? "الحالة" : "Status"}: ${getLocalized(ADMIN_REQUEST_STATUS_LABELS[request.status], lang)}`,
  ];

  if (request.fromCountry || request.toCountry) {
    lines.push(
      `${lang === "ar" ? "المسار" : "Route"}: ${request.fromCountry ?? "—"} → ${request.toCountry ?? "—"}`,
    );
  }

  if (request.amount || request.currency) {
    lines.push(
      `${lang === "ar" ? "المبلغ" : "Amount"}: ${request.amount ?? "—"} ${request.currency ?? ""}`.trim(),
    );
  }

  if (request.notes) {
    lines.push(`${lang === "ar" ? "ملاحظات" : "Notes"}: ${request.notes}`);
  }

  return lines.join("\n");
}

export function buildCustomerWhatsAppUrl(request: AdminServiceRequest): string {
  return buildWhatsAppUrlFromSettings(
    settingsData.whatsappNumber,
    request.whatsappMessagePreview,
  );
}

/** Map public form payloads to admin request records — reusable for future forms */
export function createRequestFromFormPayload(input: {
  requestType: RequestType;
  values: Record<string, string>;
  source: AdminRequestSource;
  priority?: AdminRequestPriority;
  serviceSlug?: string;
  tags?: string[];
}): CreateAdminRequestInput {
  const payload = buildRequestWhatsAppPayload(input.requestType, input.values);
  const whatsappMessagePreview = formatWhatsAppRequestMessage(payload);

  return {
    customerName:
      sanitizeFormText(input.values.customerName ?? "", 100) ||
      (input.source === "website_form" ? "عميل الموقع" : "Website Visitor"),
    customerWhatsapp: sanitizeFormText(input.values.whatsappNumber ?? "", 30),
    requestType: getLocalized(input.requestType.title, "en"),
    serviceSlug: input.serviceSlug ?? input.requestType.slug,
    fromCountry: sanitizeFormText(input.values.fromCountry ?? "") || undefined,
    toCountry: sanitizeFormText(input.values.toCountry ?? "") || undefined,
    amount: sanitizeFormText(input.values.amount ?? "").replace(/,/g, "") || undefined,
    currency: sanitizeFormText(input.values.currency ?? "") || undefined,
    paymentMethod: sanitizeFormText(input.values.paymentMethod ?? "") || undefined,
    receivingMethod: sanitizeFormText(input.values.receivingMethod ?? "") || undefined,
    notes: sanitizeNotes(input.values.notes),
    source: input.source,
    status: "new",
    priority: input.priority ?? "normal",
    whatsappMessagePreview,
    tags: input.tags,
  };
}

interface GenericFormRequestInput {
  source: AdminRequestSource;
  requestTypeLabel: string;
  customerName: string;
  customerWhatsapp: string;
  fields: { label: string; value?: string }[];
  notes?: string;
  serviceSlug?: string;
  tags?: string[];
}

function buildGenericWhatsAppPreview(
  requestTypeLabel: string,
  fields: { label: string; value?: string }[],
): string {
  return formatWhatsAppRequestMessage({
    requestType: requestTypeLabel,
    fields: fields.map((field) => ({ label: field.label, value: field.value })),
  });
}

/**
 * Reusable mapper for /contact, /business, /partners — local admin preview only.
 * TODO(Step 29+): Connect when Supabase backend + server validation are production-ready.
 */
export function createRequestFromGenericFormPayload(
  input: GenericFormRequestInput,
): CreateAdminRequestInput {
  const safeFields = input.fields
    .map((field) => ({
      label: field.label,
      value: field.value ? sanitizeFormText(field.value, 500) : undefined,
    }))
    .filter((field) => field.value);

  return {
    customerName: sanitizeFormText(input.customerName, 100) || "Website Visitor",
    customerWhatsapp: sanitizeFormText(input.customerWhatsapp, 30),
    requestType: input.requestTypeLabel,
    serviceSlug: input.serviceSlug,
    notes: sanitizeNotes(input.notes),
    source: input.source,
    status: "new",
    priority: "normal",
    whatsappMessagePreview: buildGenericWhatsAppPreview(input.requestTypeLabel, safeFields),
    tags: input.tags,
  };
}

// TODO(Step 29+): Wire createRequestFromGenericFormPayload to forms only after server-side validation.
export function createRequestFromContactFormPayload(values: {
  name: string;
  whatsappNumber: string;
  topic?: string;
  message?: string;
}): CreateAdminRequestInput {
  return createRequestFromGenericFormPayload({
    source: "website_form",
    requestTypeLabel: "Contact Form",
    customerName: values.name,
    customerWhatsapp: values.whatsappNumber,
    serviceSlug: "contact",
    fields: [
      { label: "Name", value: values.name },
      { label: "WhatsApp", value: values.whatsappNumber },
      { label: "Topic", value: values.topic },
      { label: "Message", value: values.message },
    ],
    notes: values.message,
    tags: ["contact"],
  });
}

export function createRequestFromBusinessFormPayload(values: {
  companyName: string;
  whatsappNumber: string;
  country?: string;
  businessType?: string;
  monthlyVolume?: string;
  requiredCurrencies?: string;
  targetCountries?: string;
  notes?: string;
}): CreateAdminRequestInput {
  return createRequestFromGenericFormPayload({
    source: "business_form",
    requestTypeLabel: "Flash Business Class",
    customerName: values.companyName,
    customerWhatsapp: values.whatsappNumber,
    serviceSlug: "business",
    fields: [
      { label: "Company Name", value: values.companyName },
      { label: "Country", value: values.country },
      { label: "Business Type", value: values.businessType },
      { label: "Monthly Volume", value: values.monthlyVolume },
      { label: "Required Currencies", value: values.requiredCurrencies },
      { label: "Target Countries", value: values.targetCountries },
      { label: "WhatsApp", value: values.whatsappNumber },
      { label: "Notes", value: values.notes },
    ],
    notes: values.notes,
    tags: ["business"],
  });
}

export function createRequestFromPartnerFormPayload(values: {
  officeName: string;
  whatsappNumber: string;
  country?: string;
  city?: string;
  partnerType?: string;
  monthlyVolume?: string;
  availableCurrencies?: string;
  availableServices?: string;
  notes?: string;
}): CreateAdminRequestInput {
  return createRequestFromGenericFormPayload({
    source: "partner_form",
    requestTypeLabel: "Partner Application",
    customerName: values.officeName,
    customerWhatsapp: values.whatsappNumber,
    serviceSlug: "partners",
    fields: [
      { label: "Office Name", value: values.officeName },
      { label: "Country", value: values.country },
      { label: "City", value: values.city },
      { label: "Partner Type", value: values.partnerType },
      { label: "Monthly Volume", value: values.monthlyVolume },
      { label: "Available Currencies", value: values.availableCurrencies },
      { label: "Available Services", value: values.availableServices },
      { label: "WhatsApp", value: values.whatsappNumber },
      { label: "Notes", value: values.notes },
    ],
    notes: values.notes,
    tags: ["partner"],
  });
}

// TODO(Step 29+): Map /business, /partners, /contact, /markets, and chat handoff forms when backend is ready.
// Helpers: createRequestFromContactFormPayload, createRequestFromBusinessFormPayload, createRequestFromPartnerFormPayload
export const FUTURE_REQUEST_SOURCE_MAP = {
  business_form: "/business",
  partner_form: "/partners",
  market_inquiry: "/markets",
  route_finder: "/route-finder",
  chat: "/request",
} as const;

export function filterRequests(
  requests: AdminServiceRequest[],
  filters: AdminRequestFilters,
): AdminServiceRequest[] {
  const search = filters.search?.trim().toLowerCase() ?? "";

  return requests.filter((request) => {
    if (filters.status && filters.status !== "all" && request.status !== filters.status) {
      return false;
    }
    if (filters.priority && filters.priority !== "all" && request.priority !== filters.priority) {
      return false;
    }
    if (filters.source && filters.source !== "all" && request.source !== filters.source) {
      return false;
    }
    if (filters.requestType && request.requestType !== filters.requestType) {
      return false;
    }
    if (filters.country) {
      const country = filters.country.toLowerCase();
      if (
        request.fromCountry?.toLowerCase() !== country &&
        request.toCountry?.toLowerCase() !== country
      ) {
        return false;
      }
    }
    if (filters.currency && request.currency?.toLowerCase() !== filters.currency.toLowerCase()) {
      return false;
    }
    if (!search) return true;

    const haystack = [
      request.requestNumber,
      request.customerName,
      request.customerWhatsapp,
      request.requestType,
      request.notes,
      request.fromCountry,
      request.toCountry,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(search);
  });
}

export function countRequestsByStatus(
  requests: AdminServiceRequest[],
): Record<AdminRequestStatus | "urgent", number> {
  const counts = {
    new: 0,
    reviewing: 0,
    waiting_for_customer: 0,
    quoted: 0,
    in_progress: 0,
    completed: 0,
    cancelled: 0,
    archived: 0,
    urgent: 0,
  };

  for (const request of requests) {
    counts[request.status] += 1;
    if (request.priority === "urgent" && request.status !== "archived") {
      counts.urgent += 1;
    }
  }

  return counts;
}

export function createInternalNote(author: string, content: string): AdminRequestInternalNote {
  return {
    id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    author,
    content,
    createdAt: new Date().toISOString(),
  };
}

export function statusTimelineLabel(status: AdminRequestStatus): { ar: string; en: string } {
  return ADMIN_REQUEST_STATUS_LABELS[status];
}

export function priorityTimelineLabel(priority: AdminRequestPriority): { ar: string; en: string } {
  return ADMIN_REQUEST_PRIORITY_LABELS[priority];
}
