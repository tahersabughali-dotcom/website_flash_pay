const VISITOR_ID_KEY = "flashpay_chat_visitor_id";

function createVisitorId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `visitor-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/** Anonymous visitor id — persisted in localStorage, no login required */
export function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") {
    return createVisitorId();
  }

  const existing = window.localStorage.getItem(VISITOR_ID_KEY)?.trim();
  if (existing) {
    return existing;
  }

  const id = createVisitorId();
  window.localStorage.setItem(VISITOR_ID_KEY, id);
  return id;
}

export function peekVisitorId(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(VISITOR_ID_KEY)?.trim() || null;
}
