/** Admin service request types — local preview / future Supabase integration */

export type AdminRequestStatus =
  | "new"
  | "reviewing"
  | "waiting_for_customer"
  | "quoted"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "archived";

export type AdminRequestPriority = "normal" | "high" | "urgent";

export type AdminRequestSource =
  | "website_form"
  | "route_finder"
  | "chat"
  | "whatsapp_manual"
  | "business_form"
  | "partner_form"
  | "market_inquiry";

export interface AdminRequestInternalNote {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface AdminRequestTimelineEvent {
  id: string;
  type: "status" | "priority" | "note" | "assignment" | "created";
  label: { ar: string; en: string };
  createdAt: string;
  meta?: string;
}

export interface AdminServiceRequest {
  id: string;
  requestNumber: string;
  customerName: string;
  customerWhatsapp: string;
  requestType: string;
  serviceSlug?: string;
  fromCountry?: string;
  toCountry?: string;
  amount?: string;
  currency?: string;
  paymentMethod?: string;
  receivingMethod?: string;
  notes?: string;
  source: AdminRequestSource;
  status: AdminRequestStatus;
  priority: AdminRequestPriority;
  assignedTo?: string;
  internalNotes: AdminRequestInternalNote[];
  timeline: AdminRequestTimelineEvent[];
  createdAt: string;
  updatedAt: string;
  lastContactAt?: string;
  whatsappMessagePreview: string;
  tags?: string[];
}

export type CreateAdminRequestInput = Omit<
  AdminServiceRequest,
  "id" | "requestNumber" | "internalNotes" | "timeline" | "createdAt" | "updatedAt"
> & {
  internalNotes?: AdminRequestInternalNote[];
  timeline?: AdminRequestTimelineEvent[];
};

export interface AdminRequestFilters {
  status?: AdminRequestStatus | "all";
  priority?: AdminRequestPriority | "all";
  requestType?: string;
  source?: AdminRequestSource | "all";
  country?: string;
  currency?: string;
  search?: string;
}
