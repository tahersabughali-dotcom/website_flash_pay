import type { ChatMessageSender, ChatSessionPriority, ChatSessionStatus } from "./chat";

/** Row shape for public.chat_sessions */
export interface ChatSessionRow {
  id: string;
  visitor_id: string;
  visitor_name: string | null;
  visitor_contact: string | null;
  country: string | null;
  status: ChatSessionStatus;
  priority: ChatSessionPriority;
  source: string;
  assigned_agent_id: string | null;
  last_message: string | null;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
}

/** Row shape for public.chat_messages */
export interface ChatMessageRow {
  id: string;
  session_id: string;
  sender: ChatMessageSender;
  body: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

/** Row shape for public.chat_agents */
export interface ChatAgentRow {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
}

export type ChatSessionInsert = Pick<
  ChatSessionRow,
  "visitor_id" | "status" | "priority" | "source"
> &
  Partial<
    Pick<
      ChatSessionRow,
      | "visitor_name"
      | "visitor_contact"
      | "country"
      | "assigned_agent_id"
      | "last_message"
    >
  >;

export type ChatSessionUpdate = Partial<
  Pick<
    ChatSessionRow,
    | "visitor_name"
    | "visitor_contact"
    | "country"
    | "status"
    | "priority"
    | "assigned_agent_id"
    | "last_message"
    | "closed_at"
  >
>;

export type ChatMessageInsert = Pick<
  ChatMessageRow,
  "session_id" | "sender" | "body"
> &
  Partial<Pick<ChatMessageRow, "metadata">>;

export type ChatAgentInsert = Pick<
  ChatAgentRow,
  "name" | "email" | "role" | "status"
>;
