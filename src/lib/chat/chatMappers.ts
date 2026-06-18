import type { AdminChatSession, ChatMessage } from "@/types/chat";
import type { ChatMessageRow, ChatSessionRow } from "@/types/chatDatabase";

export function mapMessageRowToChatMessage(row: ChatMessageRow): ChatMessage {
  return {
    id: row.id,
    sender: row.sender,
    content: row.body,
    createdAt: row.created_at,
  };
}

export function mapSessionRowToAdminSession(
  row: ChatSessionRow,
  messages: ChatMessage[] = [],
  internalNotes: string[] = [],
): AdminChatSession {
  return {
    id: row.id,
    visitorName: row.visitor_name ?? "زائر",
    visitorContact: row.visitor_contact ?? undefined,
    country: row.country ?? undefined,
    status: row.status,
    priority: row.priority,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    lastMessage: row.last_message ?? "",
    messages,
    internalNotes,
  };
}
