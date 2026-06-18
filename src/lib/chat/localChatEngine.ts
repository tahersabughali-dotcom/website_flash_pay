import { chatAnswerTemplates } from "@/data/chatAnswerTemplates";
import { chatData } from "@/data/chatData";
import { chatIntentsData } from "@/data/chatIntentsData";
import type { ChatEngineContext, ChatEngineResult, ChatKnowledgeIndexEntry } from "@/types/chat";
import type { LanguageCode } from "@/types/common";
import { getLocalized } from "@/lib/i18n";
import {
  formatKnowledgeAnswer,
  getKnowledgeEntryById,
  searchKnowledgeIndex,
} from "@/lib/chat/buildChatKnowledgeIndex";
import {
  detectSensitiveGuardrail,
  getGuardrailAnswer,
  type SensitiveGuardrailType,
} from "@/lib/chat/chatGuardrails";
import { logUnansweredQuestion } from "@/lib/chat/unansweredQuestions";
import { appendOfficialWhatsAppHint } from "./chatUtils";

function normalizeText(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s/]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findIntent(id: string) {
  return chatIntentsData.find((intent) => intent.id === id) ?? null;
}

function detectIntent(text: string) {
  const normalized = normalizeText(text);
  if (!normalized) return null;

  if (
    /(أي رقم|any number|حساب رسمي|verify.*official|اتأكد|أتأكد|مركز الثقة|trust center)/i.test(
      normalized,
    ) &&
    !/(payoneer|western union|wise|paypal|stripe|moneygram|ria)/i.test(normalized)
  ) {
    return findIntent("intent-trust");
  }

  if (/(سعر|price|rate|كم)/i.test(normalized) && /(usdt|تتر|tether)/i.test(normalized)) {
    return findIntent("intent-rate-price");
  }

  if (/(بيع usdt|sell usdt|usdt to cash|بيع.*usdt)/i.test(normalized)) {
    return findIntent("intent-usdt-sell");
  }

  if (/طرق الاستلام|receiving method|how to receive|payout method/i.test(normalized)) {
    return findIntent("intent-receiving-methods");
  }

  if (
    /(أستلم|استلم|receive money|pick up|collect transfer)/i.test(normalized) &&
    !/(أرسل|ارسل|send money|send transfer)/i.test(normalized)
  ) {
    return findIntent("intent-transfer-receive");
  }

  if (
    /(فوري|فوراً|instant|immediate|execution time|how long|كم ساعة|كم يوم|مدة)/i.test(
      normalized,
    ) &&
    /(تحويل|حوالة|transfer|remittance)/i.test(normalized)
  ) {
    return findIntent("intent-timing");
  }

  if (/(تحويل تجاري|تجاري كبير|جملة|bulk|b2b|high volume|wholesale)/i.test(normalized)) {
    return findIntent("intent-business-bulk");
  }

  if (/(سهم|أسهم|استثمار|stock|shares|investment advice|أفضل سهم|portfolio)/i.test(normalized)) {
    return findIntent("intent-investment");
  }

  if (
    /(أسعار مباشرة|live price|real time price|real-time price)/i.test(normalized) ||
    (/مباشرة/i.test(normalized) && /(أسعار|سعر|price|rate)/i.test(normalized))
  ) {
    return findIntent("intent-markets");
  }

  let best = chatIntentsData[0];
  let bestScore = 0;

  for (const intent of chatIntentsData) {
    let score = 0;
    for (const keyword of [...intent.keywords.ar, ...intent.keywords.en]) {
      const key = normalizeText(keyword);
      if (key.length < 2) continue;
      if (normalized.includes(key)) {
        score = Math.max(score, key.length + (key.length > 6 ? 2 : 0));
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }

  return bestScore >= 3 ? best : null;
}

export function getDetectedIntentId(text: string): string | null {
  return detectIntent(text)?.id ?? null;
}

function getGuardrailReply(type: SensitiveGuardrailType, text: string, lang: LanguageCode): string {
  const normalized = text.trim().toLowerCase();
  if (
    type === "rate" &&
    (normalized.includes("مباشرة") ||
      normalized.includes("markets") ||
      normalized.includes("السوق") ||
      normalized.includes("market"))
  ) {
    const base = getGuardrailAnswer("rate", lang);
    const marketsNote =
      lang === "ar"
        ? "\n\nFlash Markets (/markets) للمعلومات الإرشادية فقط — وليس سعرًا تنفيذيًا."
        : "\n\nFlash Markets (/markets) is indicative only — not an execution price.";
    return base + marketsNote;
  }

  return getGuardrailAnswer(type, lang);
}

function matchQuickQuestion(text: string, lang: LanguageCode): ChatEngineResult | null {
  const normalized = normalizeText(text);

  for (const question of chatData.quickQuestions) {
    const label = normalizeText(getLocalized(question.label, lang));
    if (normalized === label || normalized.includes(label) || label.includes(normalized)) {
      if (question.triggersHandoff) {
        return {
          reply: getLocalized(chatData.humanHandoffMessage, lang),
          triggersHandoff: true,
          source: "local",
        };
      }

      if (question.knowledgeId) {
        const entry = getKnowledgeEntryById(question.knowledgeId);
        if (entry) {
          return {
            reply: appendOfficialWhatsAppHint(formatKnowledgeAnswer(entry, lang), lang),
            source: "knowledge",
            matchedEntryId: entry.id,
          };
        }
      }
    }
  }

  return null;
}

function entryMatchesQuery(entry: ChatKnowledgeIndexEntry, normalized: string): boolean {
  return [...entry.keywords.ar, ...entry.keywords.en].some((keyword) => {
    const key = keyword.trim().toLowerCase();
    return key.length >= 2 && normalized.includes(key);
  });
}

function resolveFromKnowledge(
  text: string,
  lang: LanguageCode,
  preferredIds?: string[],
): ChatEngineResult | null {
  const normalized = normalizeText(text);

  if (preferredIds?.length) {
    for (const id of preferredIds) {
      const preferredEntry = getKnowledgeEntryById(id);
      if (preferredEntry && entryMatchesQuery(preferredEntry, normalized)) {
        if (preferredEntry.safetyLevel === "sensitive" || preferredEntry.safetyLevel === "restricted") {
          const guardrail = detectSensitiveGuardrail(text, lang);
          if (guardrail) {
            return {
              reply: appendOfficialWhatsAppHint(getGuardrailAnswer(guardrail, lang), lang),
              source: "guardrail",
              matchedEntryId: preferredEntry.id,
            };
          }
        }

        let reply = formatKnowledgeAnswer(preferredEntry, lang);
        if (preferredEntry.clarifyingQuestion && text.length < 20) {
          reply += `\n\n${getLocalized(preferredEntry.clarifyingQuestion, lang)}`;
        }

        return {
          reply: appendOfficialWhatsAppHint(reply, lang),
          source: "knowledge",
          matchedEntryId: preferredEntry.id,
        };
      }
    }
  }

  const entry = searchKnowledgeIndex(text, lang, preferredIds);
  if (!entry) return null;

  if (entry.safetyLevel === "sensitive" || entry.safetyLevel === "restricted") {
    const guardrail = detectSensitiveGuardrail(text, lang);
    if (guardrail) {
      return {
        reply: appendOfficialWhatsAppHint(getGuardrailAnswer(guardrail, lang), lang),
        source: "guardrail",
        matchedEntryId: entry.id,
      };
    }
  }

  let reply = formatKnowledgeAnswer(entry, lang);

  if (entry.clarifyingQuestion && text.length < 20) {
    reply += `\n\n${getLocalized(entry.clarifyingQuestion, lang)}`;
  }

  return {
    reply: appendOfficialWhatsAppHint(reply, lang),
    source: "knowledge",
    matchedEntryId: entry.id,
  };
}

export function generateLocalChatResponse(
  userMessage: string,
  context: ChatEngineContext,
): ChatEngineResult {
  const { lang } = context;
  const text = userMessage.trim();

  if (!text) {
    return {
      reply: getLocalized(chatData.uiLabels.defaultFallback, lang),
      source: "fallback",
    };
  }

  const guardrail = detectSensitiveGuardrail(text, lang);
  if (guardrail) {
    return {
      reply: appendOfficialWhatsAppHint(getGuardrailReply(guardrail, text, lang), lang),
      source: "guardrail",
    };
  }

  const intent = detectIntent(text);

  if (intent?.id === "intent-out-of-scope") {
    return {
      reply: getLocalized(chatAnswerTemplates.outOfScope, lang),
      source: "intent",
      intentId: intent.id,
    };
  }

  if (intent?.triggersHandoff) {
    return {
      reply: getLocalized(chatData.humanHandoffMessage, lang),
      triggersHandoff: true,
      source: "intent",
      intentId: intent.id,
    };
  }

  if (intent?.safetyLevel === "sensitive" || intent?.safetyLevel === "restricted") {
    const guardrailType =
      detectSensitiveGuardrail(text, lang) ??
      (intent.id.includes("investment")
        ? "investment"
        : intent.id.includes("licensing")
          ? "licensing"
          : intent.id.includes("timing")
            ? "timing"
            : "rate");
    return {
      reply: appendOfficialWhatsAppHint(getGuardrailAnswer(guardrailType, lang), lang),
      source: "guardrail",
      intentId: intent.id,
    };
  }

  const quickMatch = matchQuickQuestion(text, lang);
  if (quickMatch) return quickMatch;

  if (intent?.knowledgeIds?.length) {
    const fromIntent = resolveFromKnowledge(text, lang, intent.knowledgeIds);
    if (fromIntent) {
      return { ...fromIntent, source: "intent", intentId: intent.id };
    }
  }

  const knowledgeMatch = resolveFromKnowledge(text, lang);
  if (knowledgeMatch) return knowledgeMatch;

  logUnansweredQuestion(text, lang);

  return {
    reply: getLocalized(chatData.uiLabels.defaultFallback, lang),
    source: "fallback",
  };
}

export const CHAT_SYSTEM_INSTRUCTION = `You are the Flash Pay Global Platform support assistant.

Identity & scope:
- Flash Pay coordinates money transfers, USDT buy/sell, digital platform cash-outs, and business payments through partner networks.
- Answer ONLY about Flash Pay services, website pages, trust/safety, and navigation.
- Arabic-first when the user writes in Arabic; otherwise English.

Legal-safe rules (MANDATORY):
- NEVER provide guaranteed rates, fixed prices, commissions, or execution timelines.
- NEVER provide financial, investment, or trading advice.
- NEVER claim direct licenses or official agency for PayPal, Wise, Payoneer, Stripe, Western Union, MoneyGram, RIA, or any global brand unless explicitly verified on the website.
- Market dashboard data is indicative/informational ONLY — not execution prices.
- Flash Wallet and Flash Trade are COMING SOON — no balances, deposits, withdrawals, or trade execution.

Answer style:
1. Short direct answer
2. What Flash Pay can help with
3. What details you need (country, amount, currency, payment/receiving method, USDT network)
4. Recommended action: Request Center (/request), Route Finder (/route-finder), Trust Center (/trust), Contact (/contact), or official WhatsApp

For prices, fees, timing, and availability: always direct to official WhatsApp — price depends on country, currency, amount, and receiving method.

For unknown questions outside scope: politely redirect to /request or official WhatsApp. Do not invent services or countries not on the website.`;
