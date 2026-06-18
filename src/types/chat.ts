import type { LanguageCode, LocalizedString } from "./common";

/** Chat session lifecycle — foundation for future live human takeover */
export type ChatSessionStatus = "bot" | "waiting_for_human" | "human" | "closed";

/** Message author — foundation for future admin inbox */
export type ChatMessageSender = "visitor" | "bot" | "human" | "system";

export interface ChatMessage {
  id: string;
  sender: ChatMessageSender;
  content: string;
  createdAt: string;
}

export interface ChatQuickQuestion {
  id: string;
  label: LocalizedString;
  /** Optional knowledge entry id to answer from */
  knowledgeId?: string;
  /** When true, triggers human handoff instead of bot reply */
  triggersHandoff?: boolean;
}

export interface ChatQuickCategory {
  id: string;
  label: LocalizedString;
  questions: ChatQuickQuestion[];
}

export type ChatKnowledgeCategory =
  | "transfers"
  | "usdt"
  | "payment_methods"
  | "countries"
  | "business"
  | "partners"
  | "markets"
  | "trust"
  | "navigation"
  | "coming_soon"
  | "digital_platforms"
  | "general";

export type ChatSafetyLevel = "safe" | "sensitive" | "restricted";

export type ChatSuggestedAction =
  | "request"
  | "route_finder"
  | "whatsapp"
  | "contact"
  | "handoff"
  | "services"
  | "countries"
  | "markets"
  | "trust"
  | "academy"
  | "business";

export interface ChatKnowledgeIndexEntry {
  id: string;
  category: ChatKnowledgeCategory;
  title: LocalizedString;
  answer: LocalizedString;
  keywords: { ar: string[]; en: string[] };
  relatedLinks: string[];
  priority: number;
  safetyLevel: ChatSafetyLevel;
  suggestedActions: ChatSuggestedAction[];
  clarifyingQuestion?: LocalizedString;
  neededInfo?: LocalizedString;
}

export interface ChatIntentDefinition {
  id: string;
  category: ChatKnowledgeCategory;
  keywords: { ar: string[]; en: string[] };
  knowledgeIds?: string[];
  triggersHandoff?: boolean;
  safetyLevel?: ChatSafetyLevel;
}

export interface ChatKnowledgeEntry {
  id: string;
  keywords: { ar: string[]; en: string[] };
  answer: LocalizedString;
  /** Route to sensitive-price fallback instead of this answer */
  sensitive?: boolean;
}

export interface ChatUiLabels {
  placeholder: LocalizedString;
  send: LocalizedString;
  talkToHuman: LocalizedString;
  openWhatsApp: LocalizedString;
  close: LocalizedString;
  openChat: LocalizedString;
  typing: LocalizedString;
  liveHumanSoon: LocalizedString;
  handoffTransferred: LocalizedString;
  directReplySoonNote: LocalizedString;
  defaultFallback: LocalizedString;
  sensitiveFallback: LocalizedString;
}

export interface ChatData {
  widgetTitle: LocalizedString;
  widgetSubtitle?: LocalizedString;
  welcomeMessage: LocalizedString;
  offlineMessage: LocalizedString;
  humanHandoffMessage: LocalizedString;
  quickCategories: ChatQuickCategory[];
  /** Legacy flat list — derived from categories for compatibility */
  quickQuestions: ChatQuickQuestion[];
  safeKnowledgeBase: ChatKnowledgeEntry[];
  uiLabels: ChatUiLabels;
}

export interface ChatEngineContext {
  lang: LanguageCode;
}

export interface ChatEngineResult {
  reply: string;
  triggersHandoff?: boolean;
  source: "local" | "knowledge" | "sensitive" | "fallback" | "intent" | "guardrail";
  matchedEntryId?: string;
  intentId?: string;
}

export type ChatSessionPriority = "normal" | "high";

/** Admin inbox session — foundation for future Supabase chat_sessions table */
export interface AdminChatSession {
  id: string;
  visitorName: string;
  visitorContact?: string;
  country?: string;
  status: ChatSessionStatus;
  priority: ChatSessionPriority;
  createdAt: string;
  updatedAt: string;
  lastMessage: string;
  messages: ChatMessage[];
  internalNotes: string[];
}

export type AdminChatStatusFilter = ChatSessionStatus | "all";
