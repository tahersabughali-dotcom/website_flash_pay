import { mockRequestsData } from "@/data/mockRequestsData";
import type {
  AdminRequestInternalNote,
  AdminRequestPriority,
  AdminRequestStatus,
  AdminServiceRequest,
  CreateAdminRequestInput,
} from "@/types/adminRequest";
import {
  REQUESTS_STORAGE_KEY,
  createInternalNote,
  createTimelineEvent,
  generateRequestId,
  generateRequestNumber,
  priorityTimelineLabel,
  statusTimelineLabel,
} from "./requestUtils";

// TODO(Supabase): Replace localStorage with service_requests table + RLS-protected API routes.

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readStorage(): AdminServiceRequest[] {
  if (!isBrowser()) return [...mockRequestsData];

  try {
    const raw = window.localStorage.getItem(REQUESTS_STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(mockRequestsData));
      return [...mockRequestsData];
    }
    const parsed = JSON.parse(raw) as AdminServiceRequest[];
    return Array.isArray(parsed) ? parsed : [...mockRequestsData];
  } catch {
    return [...mockRequestsData];
  }
}

function writeStorage(requests: AdminServiceRequest[]): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(requests));
}

function touch(request: AdminServiceRequest): AdminServiceRequest {
  return { ...request, updatedAt: new Date().toISOString() };
}

export function listRequests(): AdminServiceRequest[] {
  return readStorage().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getRequestById(id: string): AdminServiceRequest | undefined {
  return readStorage().find((request) => request.id === id);
}

export function createRequest(data: CreateAdminRequestInput): AdminServiceRequest {
  const existing = readStorage();
  const now = new Date().toISOString();
  const request: AdminServiceRequest = {
    ...data,
    id: generateRequestId(),
    requestNumber: generateRequestNumber(existing),
    internalNotes: data.internalNotes ?? [],
    timeline: data.timeline ?? [
      createTimelineEvent("created", statusTimelineLabel("new")),
    ],
    createdAt: now,
    updatedAt: now,
  };

  writeStorage([request, ...existing]);
  return request;
}

function updateRequestById(
  id: string,
  updater: (request: AdminServiceRequest) => AdminServiceRequest,
): AdminServiceRequest | undefined {
  const existing = readStorage();
  let updated: AdminServiceRequest | undefined;

  const next = existing.map((request) => {
    if (request.id !== id) return request;
    updated = touch(updater(request));
    return updated;
  });

  if (!updated) return undefined;
  writeStorage(next);
  return updated;
}

export function updateRequestStatus(
  id: string,
  status: AdminRequestStatus,
): AdminServiceRequest | undefined {
  return updateRequestById(id, (request) => ({
    ...request,
    status,
    timeline: [
      ...request.timeline,
      createTimelineEvent("status", statusTimelineLabel(status)),
    ],
  }));
}

export function updateRequestPriority(
  id: string,
  priority: AdminRequestPriority,
): AdminServiceRequest | undefined {
  return updateRequestById(id, (request) => ({
    ...request,
    priority,
    timeline: [
      ...request.timeline,
      createTimelineEvent("priority", priorityTimelineLabel(priority)),
    ],
  }));
}

export function addInternalNote(
  id: string,
  note: Omit<AdminRequestInternalNote, "id" | "createdAt">,
): AdminServiceRequest | undefined {
  const entry = createInternalNote(note.author, note.content);
  return updateRequestById(id, (request) => ({
    ...request,
    internalNotes: [entry, ...request.internalNotes],
    timeline: [
      ...request.timeline,
      createTimelineEvent(
        "note",
        { ar: "ملاحظة داخلية", en: "Internal note" },
        note.content.slice(0, 80),
      ),
    ],
  }));
}

export function assignRequest(id: string, agentName: string): AdminServiceRequest | undefined {
  return updateRequestById(id, (request) => ({
    ...request,
    assignedTo: agentName,
    timeline: [
      ...request.timeline,
      createTimelineEvent(
        "assignment",
        { ar: "تعيين مسؤول", en: "Assignment" },
        agentName,
      ),
    ],
  }));
}

export function archiveRequest(id: string): AdminServiceRequest | undefined {
  return updateRequestStatus(id, "archived");
}

export {
  buildCustomerWhatsAppUrl,
  buildInternalRequestSummary,
  createRequestFromFormPayload,
  filterRequests,
  countRequestsByStatus,
} from "./requestUtils";
