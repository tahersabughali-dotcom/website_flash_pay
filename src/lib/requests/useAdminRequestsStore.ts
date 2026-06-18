"use client";

import { useCallback, useState } from "react";
import type {
  AdminRequestFilters,
  AdminRequestPriority,
  AdminRequestStatus,
  AdminServiceRequest,
} from "@/types/adminRequest";
import {
  addInternalNote,
  archiveRequest,
  assignRequest,
  countRequestsByStatus,
  filterRequests,
  listRequests,
  updateRequestPriority,
  updateRequestStatus,
} from "@/lib/requests/requestRepository";

export function useAdminRequestsStore() {
  const [requests, setRequests] = useState<AdminServiceRequest[]>(() => listRequests());
  const [filters, setFilters] = useState<AdminRequestFilters>({
    status: "all",
    priority: "all",
    source: "all",
    search: "",
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const refresh = useCallback(() => {
    setRequests(listRequests());
  }, []);

  const filtered = filterRequests(requests, filters);
  const selected =
    filtered.find((item) => item.id === selectedId) ??
    requests.find((item) => item.id === selectedId);
  const counts = countRequestsByStatus(requests);

  const mutate = useCallback(
    (updater: () => AdminServiceRequest | undefined) => {
      const result = updater();
      refresh();
      return result;
    },
    [refresh],
  );

  return {
    requests,
    filtered,
    filters,
    setFilters,
    selected,
    selectedId,
    setSelectedId,
    counts,
    refresh,
    setStatus: (id: string, status: AdminRequestStatus) =>
      mutate(() => updateRequestStatus(id, status)),
    setPriority: (id: string, priority: AdminRequestPriority) =>
      mutate(() => updateRequestPriority(id, priority)),
    addNote: (id: string, author: string, content: string) =>
      mutate(() => addInternalNote(id, { author, content })),
    assign: (id: string, agentName: string) => mutate(() => assignRequest(id, agentName)),
    archive: (id: string) => mutate(() => archiveRequest(id)),
  };
}
