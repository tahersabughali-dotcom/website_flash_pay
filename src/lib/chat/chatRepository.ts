import { cloneMockChatSessions } from "@/data/mockChatSessionsData";
import { isAdminPreviewEnabled, isLiveChatRealtimeEnabled } from "@/lib/auth/adminAccessConfig";
import { readForceMockMode } from "@/lib/supabase/chatConnectionStatus";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/isConfigured";
import { getWelcomeMessages } from "@/lib/chat/chatUtils";
import {
  mapMessageRowToChatMessage,
  mapSessionRowToAdminSession,
} from "@/lib/chat/chatMappers";
import type { AdminChatSession, ChatMessage, ChatMessageSender, ChatSessionStatus } from "@/types/chat";
import type { ChatMessageRow, ChatSessionRow } from "@/types/chatDatabase";
import type { LanguageCode } from "@/types/common";

export function isChatRepositoryRemote(): boolean {
  if (!isSupabaseConfigured()) return false;
  if (readForceMockMode()) return false;
  if (isLiveChatRealtimeEnabled()) return true;
  if (isAdminPreviewEnabled() && process.env.NODE_ENV === "development") return true;
  return false;
}

export class ChatRepositoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChatRepositoryError";
  }
}

function getClient() {
  return getSupabaseBrowserClient();
}

async function updateSessionLastMessage(
  sessionId: string,
  lastMessage: string,
  extra?: { status?: ChatSessionStatus; closed_at?: string | null },
): Promise<void> {
  const client = getClient();
  if (!client) return;

  const patch: Record<string, unknown> = { last_message: lastMessage };
  if (extra?.status) patch.status = extra.status;
  if (extra?.closed_at !== undefined) patch.closed_at = extra.closed_at;

  await client.from("chat_sessions").update(patch).eq("id", sessionId);
}

export async function createOrGetVisitorSession(
  visitorId: string,
  lang: LanguageCode,
): Promise<{ sessionId: string; status: ChatSessionStatus; isNew: boolean } | null> {
  const client = getClient();
  if (!client) return null;

  const { data: existing, error: findError } = await client
    .from("chat_sessions")
    .select("*")
    .eq("visitor_id", visitorId)
    .neq("status", "closed")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle<ChatSessionRow>();

  if (findError) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[chatRepository] createOrGetVisitorSession find failed", findError.message);
    }
    return null;
  }

  if (existing) {
    return {
      sessionId: existing.id,
      status: existing.status,
      isNew: false,
    };
  }

  const { data: created, error: createError } = await client
    .from("chat_sessions")
    .insert({
      visitor_id: visitorId,
      visitor_name: lang === "ar" ? "زائر" : "Visitor",
      status: "bot",
      priority: "normal",
      source: "website_widget",
      last_message: null,
    })
    .select("*")
    .single<ChatSessionRow>();

  if (createError || !created) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[chatRepository] createOrGetVisitorSession create failed", createError?.message);
    }
    return null;
  }

  const welcomeMessages = getWelcomeMessages(lang);
  for (const message of welcomeMessages) {
    await addMessage(created.id, message.sender, message.content);
  }

  return {
    sessionId: created.id,
    status: created.status,
    isNew: true,
  };
}

export async function getMessagesBySessionId(sessionId: string): Promise<ChatMessage[]> {
  const client = getClient();
  if (!client) return [];

  const { data, error } = await client
    .from("chat_messages")
    .select("*")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });

  if (error || !data) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[chatRepository] getMessagesBySessionId failed", error?.message);
    }
    return [];
  }

  return (data as ChatMessageRow[]).map(mapMessageRowToChatMessage);
}

export async function listAdminSessions(): Promise<AdminChatSession[]> {
  if (!isChatRepositoryRemote()) {
    return cloneMockChatSessions();
  }

  const client = getClient();
  if (!client) {
    throw new ChatRepositoryError("Supabase client unavailable");
  }

  const { data, error } = await client
    .from("chat_sessions")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error || !data) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[chatRepository] listAdminSessions failed", error?.message);
    }
    throw new ChatRepositoryError(error?.message ?? "Failed to load chat sessions");
  }

  return (data as ChatSessionRow[]).map((row) => mapSessionRowToAdminSession(row));
}

export async function loadAdminSessionWithMessages(
  sessionId: string,
  internalNotes: string[] = [],
): Promise<AdminChatSession | null> {
  if (!isChatRepositoryRemote()) {
    return cloneMockChatSessions().find((session) => session.id === sessionId) ?? null;
  }

  const client = getClient();
  if (!client) return null;

  const { data: row, error } = await client
    .from("chat_sessions")
    .select("*")
    .eq("id", sessionId)
    .maybeSingle<ChatSessionRow>();

  if (error || !row) {
    console.warn("[chatRepository] loadAdminSessionWithMessages failed", error?.message);
    return null;
  }

  const messages = await getMessagesBySessionId(sessionId);
  return mapSessionRowToAdminSession(row, messages, internalNotes);
}

export async function addMessage(
  sessionId: string,
  sender: ChatMessageSender,
  body: string,
  metadata?: Record<string, unknown>,
): Promise<ChatMessage | null> {
  const client = getClient();
  if (!client) return null;

  const trimmed = body.trim();
  if (!trimmed) return null;

  const { data, error } = await client
    .from("chat_messages")
    .insert({
      session_id: sessionId,
      sender,
      body: trimmed,
      metadata: metadata ?? null,
    })
    .select("*")
    .single<ChatMessageRow>();

  if (error || !data) {
    console.warn("[chatRepository] addMessage failed", error?.message);
    return null;
  }

  await updateSessionLastMessage(sessionId, trimmed);
  return mapMessageRowToChatMessage(data);
}

export async function addVisitorMessage(sessionId: string, body: string): Promise<ChatMessage | null> {
  return addMessage(sessionId, "visitor", body);
}

export async function addBotMessage(sessionId: string, body: string): Promise<ChatMessage | null> {
  return addMessage(sessionId, "bot", body);
}

export async function addHumanMessage(sessionId: string, body: string): Promise<ChatMessage | null> {
  const message = await addMessage(sessionId, "human", body);
  if (message) {
    await updateSessionStatus(sessionId, "human");
  }
  return message;
}

export async function addSystemMessage(sessionId: string, body: string): Promise<ChatMessage | null> {
  return addMessage(sessionId, "system", body);
}

export async function updateSessionStatus(
  sessionId: string,
  status: ChatSessionStatus,
): Promise<boolean> {
  const client = getClient();
  if (!client) return false;

  const patch: Record<string, unknown> = { status };
  if (status === "closed") {
    patch.closed_at = new Date().toISOString();
  } else {
    patch.closed_at = null;
  }

  const { error } = await client.from("chat_sessions").update(patch).eq("id", sessionId);

  if (error) {
    console.warn("[chatRepository] updateSessionStatus failed", error.message);
    return false;
  }

  return true;
}

export async function closeSession(sessionId: string): Promise<boolean> {
  return updateSessionStatus(sessionId, "closed");
}

export async function reopenSession(sessionId: string): Promise<boolean> {
  return updateSessionStatus(sessionId, "human");
}

export async function markWaitingForHuman(sessionId: string): Promise<boolean> {
  return updateSessionStatus(sessionId, "waiting_for_human");
}

export type SessionMessageHandler = (message: ChatMessage) => void;
export type SessionStatusHandler = (status: ChatSessionStatus) => void;

export type RealtimeSubscriptionStatus = "SUBSCRIBED" | "CHANNEL_ERROR" | "TIMED_OUT" | "CLOSED";

export function subscribeToSessionMessages(
  sessionId: string,
  onMessage: SessionMessageHandler,
  onStatus?: (status: RealtimeSubscriptionStatus) => void,
): () => void {
  const client = getClient();
  if (!client) return () => undefined;

  const channel = client
    .channel(`chat-messages-${sessionId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "chat_messages",
        filter: `session_id=eq.${sessionId}`,
      },
      (payload) => {
        const row = payload.new as ChatMessageRow;
        onMessage(mapMessageRowToChatMessage(row));
      },
    )
    .subscribe((status) => {
      if (status === "SUBSCRIBED" || status === "CHANNEL_ERROR" || status === "TIMED_OUT" || status === "CLOSED") {
        onStatus?.(status);
      }
    });

  return () => {
    void client.removeChannel(channel);
  };
}

export function subscribeToSessionStatus(
  sessionId: string,
  onStatus: SessionStatusHandler,
): () => void {
  const client = getClient();
  if (!client) return () => undefined;

  const channel = client
    .channel(`chat-session-status-${sessionId}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "chat_sessions",
        filter: `id=eq.${sessionId}`,
      },
      (payload) => {
        const row = payload.new as ChatSessionRow;
        onStatus(row.status);
      },
    )
    .subscribe();

  return () => {
    void client.removeChannel(channel);
  };
}

export function subscribeToAdminSessions(
  onChange: () => void,
  onStatus?: (status: RealtimeSubscriptionStatus) => void,
): () => void {
  const client = getClient();
  if (!client) return () => undefined;

  const channel = client
    .channel("chat-admin-sessions")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "chat_sessions" },
      () => onChange(),
    )
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "chat_messages" },
      () => onChange(),
    )
    .subscribe((status) => {
      if (status === "SUBSCRIBED" || status === "CHANNEL_ERROR" || status === "TIMED_OUT" || status === "CLOSED") {
        onStatus?.(status);
      }
    });

  return () => {
    void client.removeChannel(channel);
  };
}

/**
 * API routes were not added for Step 13 because the anon Supabase client is sufficient
 * for local foundation when permissive dev RLS policies are enabled in schema.sql.
 * Production should use authenticated agents + strict RLS or server routes with service role.
 */
export const CHAT_API_ROUTES_NOTE =
  "Client-side anon Supabase via chatRepository is used for local foundation. Server API routes reserved for production auth.";
