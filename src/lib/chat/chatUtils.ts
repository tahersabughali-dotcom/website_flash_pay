import { chatData } from "@/data/chatData";
import { settingsData } from "@/data/settingsData";
import { isFeatureEnabled } from "@/data/featureFlagsData";
import { isAdminPreviewEnabled } from "@/lib/auth/adminAccessConfig";
import type { ChatMessage, ChatMessageSender, ChatSessionStatus } from "@/types/chat";
import type { LanguageCode } from "@/types/common";
import { getLocalized } from "@/lib/i18n";

export function createChatMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createChatMessage(
  sender: ChatMessageSender,
  content: string,
): ChatMessage {
  return {
    id: createChatMessageId(),
    sender,
    content,
    createdAt: new Date().toISOString(),
  };
}

export function isChatWidgetEnabled(): boolean {
  if (!isFeatureEnabled("showChatWidget")) return false;

  const publicFlag = process.env.NEXT_PUBLIC_CHAT_ENABLED;
  if (publicFlag === "false") return false;

  return true;
}

const SENSITIVE_PATTERNS = {
  ar: [
    "سعر",
    "أسعار",
    "سعر اليوم",
    "كم السعر",
    "متى",
    "وقت التنفيذ",
    "execution",
    "مضمون",
    "حي",
    "لحظي",
    "real time",
    "guaranteed",
  ],
  en: [
    "price",
    "rate",
    "today rate",
    "how much",
    "execution time",
    "when will",
    "guaranteed",
    "live rate",
    "real-time",
    "real time",
  ],
};

export function isSensitiveFinancialQuestion(text: string, lang: LanguageCode): boolean {
  const normalized = text.trim().toLowerCase();
  const patterns = [...SENSITIVE_PATTERNS[lang], ...SENSITIVE_PATTERNS.en];

  return patterns.some((pattern) => normalized.includes(pattern.toLowerCase()));
}

export function appendOfficialWhatsAppHint(content: string, lang: LanguageCode): string {
  if (content.includes(settingsData.whatsappNumber)) return content;

  const hint =
    lang === "ar"
      ? `\n\nWhatsApp الرسمي: ${settingsData.whatsappNumber}`
      : `\n\nOfficial WhatsApp: ${settingsData.whatsappNumber}`;

  if (content.toLowerCase().includes("whatsapp")) {
    return `${content}${hint}`;
  }

  return content;
}

export function getWelcomeMessages(lang: LanguageCode): ChatMessage[] {
  return [
    createChatMessage("bot", getLocalized(chatData.welcomeMessage, lang)),
    createChatMessage("bot", getLocalized(chatData.offlineMessage, lang)),
  ];
}

export function getHandoffSystemMessage(lang: LanguageCode): ChatMessage {
  return createChatMessage("system", getLocalized(chatData.uiLabels.handoffTransferred, lang));
}

export function getDirectReplySoonMessage(lang: LanguageCode): ChatMessage {
  return createChatMessage("system", getLocalized(chatData.uiLabels.directReplySoonNote, lang));
}

export function getLiveHumanSoonMessage(lang: LanguageCode): ChatMessage {
  return createChatMessage("system", getLocalized(chatData.uiLabels.liveHumanSoon, lang));
}

export function isChatAdminPreviewEnabled(): boolean {
  return isAdminPreviewEnabled();
}

export function sessionStatusLabel(
  status: ChatSessionStatus,
  lang: LanguageCode,
): string {
  const labels: Record<ChatSessionStatus, { ar: string; en: string }> = {
    bot: { ar: "مساعد آلي", en: "AI assistant" },
    waiting_for_human: { ar: "بانتظار موظف", en: "Waiting for agent" },
    human: { ar: "موظف", en: "Agent" },
    closed: { ar: "مغلقة", en: "Closed" },
  };

  return labels[status][lang];
}
