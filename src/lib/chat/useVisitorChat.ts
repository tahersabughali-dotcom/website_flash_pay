"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { settingsData } from "@/data/settingsData";
import type { ChatMessage, ChatSessionStatus } from "@/types/chat";
import { generateLocalChatResponse } from "@/lib/chat/localChatEngine";
import {
  createChatMessage,
  getDirectReplySoonMessage,
  getHandoffSystemMessage,
  getWelcomeMessages,
} from "@/lib/chat/chatUtils";
import {
  addBotMessage,
  addSystemMessage,
  addVisitorMessage,
  createOrGetVisitorSession,
  getMessagesBySessionId,
  isChatRepositoryRemote,
  markWaitingForHuman,
  subscribeToSessionMessages,
  subscribeToSessionStatus,
} from "@/lib/chat/chatRepository";
import { getOrCreateVisitorId } from "@/lib/chat/visitorSession";
import {
  registerUnansweredQuestionsConsoleHelper,
} from "@/lib/chat/unansweredQuestions";
import { registerChatTestConsoleHelper } from "@/lib/chat/runChatTestCases";

async function fetchChatReply(
  message: string,
  lang: "ar" | "en",
): Promise<{ reply: string; triggersHandoff?: boolean } | null> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, lang }),
    });

    if (!response.ok) return null;

    const data = (await response.json()) as { reply?: string; triggersHandoff?: boolean };
    const reply = data.reply?.trim();
    if (!reply) return null;

    return { reply, triggersHandoff: data.triggersHandoff };
  } catch {
    return null;
  }
}

export function useVisitorChat(isOpen: boolean) {
  const lang = settingsData.defaultLanguage;
  const remote = isChatRepositoryRemote();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [status, setStatus] = useState<ChatSessionStatus>("bot");
  const [isTyping, setIsTyping] = useState(false);
  const [isReady, setIsReady] = useState(!remote);
  const [usingLocalFallback, setUsingLocalFallback] = useState(false);
  const [realtimeActive, setRealtimeActive] = useState(false);
  const messagesPollRef = useRef<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(() => getWelcomeMessages(lang));
  const messageIdsRef = useRef<Set<string>>(new Set());

  const mergeMessage = useCallback((message: ChatMessage) => {
    if (messageIdsRef.current.has(message.id)) return;
    messageIdsRef.current.add(message.id);
    setMessages((prev) => [...prev, message]);
  }, []);

  const appendLocalMessage = useCallback((message: ChatMessage) => {
    messageIdsRef.current.add(message.id);
    setMessages((prev) => [...prev, message]);
  }, []);

  useEffect(() => {
    registerUnansweredQuestionsConsoleHelper();
    if (process.env.NODE_ENV === "development") {
      registerChatTestConsoleHelper();
    }
  }, []);

  useEffect(() => {
    if (!remote || !isOpen || sessionId) return;

    let cancelled = false;

    void (async () => {
      const visitorId = getOrCreateVisitorId();
      const result = await createOrGetVisitorSession(visitorId, lang);

      if (cancelled || !result) {
        if (!cancelled && remote && !result) {
          if (process.env.NODE_ENV === "development") {
            console.warn(
              "[useVisitorChat] Supabase session unavailable — falling back to local chat mode.",
            );
          }
          setUsingLocalFallback(true);
          setIsReady(true);
        }
        return;
      }

      setUsingLocalFallback(false);

      setSessionId(result.sessionId);
      setStatus(result.status);

      const loaded = await getMessagesBySessionId(result.sessionId);
      if (cancelled) return;

      messageIdsRef.current = new Set(loaded.map((message) => message.id));
      setMessages(loaded.length > 0 ? loaded : getWelcomeMessages(lang));
      setIsReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [isOpen, lang, remote, sessionId]);

  useEffect(() => {
    if (!remote || !sessionId || usingLocalFallback) return;

    const unsubMessages = subscribeToSessionMessages(
      sessionId,
      (message) => {
        mergeMessage(message);
        if (message.sender === "human") {
          setStatus("human");
        }
      },
      (subscriptionStatus) => {
        const active = subscriptionStatus === "SUBSCRIBED";
        setRealtimeActive(active);

        if (messagesPollRef.current) {
          window.clearInterval(messagesPollRef.current);
          messagesPollRef.current = null;
        }

        if (!active) {
          messagesPollRef.current = window.setInterval(() => {
            void getMessagesBySessionId(sessionId).then((loaded) => {
              if (loaded.length === 0) return;
              setMessages((prev) => {
                const known = new Set(prev.map((item) => item.id));
                const merged = [...prev];
                for (const item of loaded) {
                  if (!known.has(item.id)) {
                    messageIdsRef.current.add(item.id);
                    merged.push(item);
                  }
                }
                return merged;
              });
            });
          }, 5000);
        }
      },
    );

    const unsubStatus = subscribeToSessionStatus(sessionId, setStatus);

    return () => {
      unsubMessages();
      unsubStatus();
      if (messagesPollRef.current) {
        window.clearInterval(messagesPollRef.current);
        messagesPollRef.current = null;
      }
    };
  }, [mergeMessage, remote, sessionId, usingLocalFallback]);

  const persistSystemMessages = useCallback(
    async (items: ChatMessage[]) => {
      if (!remote || !sessionId || usingLocalFallback) {
        items.forEach(appendLocalMessage);
        return;
      }

      for (const item of items) {
        const saved = await addSystemMessage(sessionId, item.content);
        if (saved) {
          mergeMessage(saved);
        } else {
          appendLocalMessage(item);
        }
      }
    },
    [appendLocalMessage, mergeMessage, remote, sessionId, usingLocalFallback],
  );

  const requestHumanHandoff = useCallback(() => {
    if (status === "waiting_for_human" || status === "human" || status === "closed") {
      return;
    }

    setStatus("waiting_for_human");

    const handoffMessages = [getHandoffSystemMessage(lang), getDirectReplySoonMessage(lang)];

    if (remote && sessionId && !usingLocalFallback) {
      void markWaitingForHuman(sessionId);
      void persistSystemMessages(handoffMessages);
      return;
    }

    handoffMessages.forEach(appendLocalMessage);
  }, [appendLocalMessage, lang, persistSystemMessages, remote, sessionId, status, usingLocalFallback]);

  const respondToUser = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      setIsTyping(true);

      try {
        if (remote && sessionId && !usingLocalFallback) {
          const visitorMessage = await addVisitorMessage(sessionId, trimmed);
          if (visitorMessage) {
            mergeMessage(visitorMessage);
          } else {
            appendLocalMessage(createChatMessage("visitor", trimmed));
          }
        } else {
          appendLocalMessage(createChatMessage("visitor", trimmed));
        }

        if (status === "waiting_for_human" || status === "human") {
          const ack = createChatMessage(
            "system",
            lang === "ar"
              ? "وصلت رسالتك في الدردشة. سيتم الرد البشري لاحقًا — أو تواصل عبر WhatsApp الرسمي الآن."
              : "Your message is in the chat. A human reply will follow later — or contact us on official WhatsApp now.",
          );

          if (remote && sessionId && !usingLocalFallback) {
            const saved = await addSystemMessage(sessionId, ack.content);
            if (saved) mergeMessage(saved);
            else appendLocalMessage(ack);
          } else {
            appendLocalMessage(ack);
          }
          return;
        }

        const apiResult = await fetchChatReply(trimmed, lang);
        const localResult = generateLocalChatResponse(trimmed, { lang });
        const shouldHandoff =
          (apiResult?.triggersHandoff || localResult.triggersHandoff) && status === "bot";
        const replyText = apiResult?.reply ?? localResult.reply;

        if (shouldHandoff) {
          if (remote && sessionId && !usingLocalFallback) {
            const botSaved = await addBotMessage(sessionId, replyText);
            if (botSaved) mergeMessage(botSaved);
            else appendLocalMessage(createChatMessage("bot", replyText));

            await markWaitingForHuman(sessionId);
            setStatus("waiting_for_human");
            await persistSystemMessages([
              getHandoffSystemMessage(lang),
              getDirectReplySoonMessage(lang),
            ]);
          } else {
            appendLocalMessage(createChatMessage("bot", replyText));
            setStatus("waiting_for_human");
            appendLocalMessage(getHandoffSystemMessage(lang));
            appendLocalMessage(getDirectReplySoonMessage(lang));
          }
          return;
        }

        if (remote && sessionId && !usingLocalFallback) {
          const botSaved = await addBotMessage(sessionId, replyText);
          if (botSaved) mergeMessage(botSaved);
          else appendLocalMessage(createChatMessage("bot", replyText));
        } else {
          appendLocalMessage(createChatMessage("bot", replyText));
        }
      } finally {
        setIsTyping(false);
      }
    },
    [
      appendLocalMessage,
      lang,
      mergeMessage,
      persistSystemMessages,
      remote,
      sessionId,
      status,
      usingLocalFallback,
    ],
  );

  const handleSend = useCallback(
    (text: string) => {
      void respondToUser(text);
    },
    [respondToUser],
  );

  const handleQuickSelect = useCallback(
    (text: string) => {
      void respondToUser(text);
    },
    [respondToUser],
  );

  const modeLabel = useMemo(() => {
    if (usingLocalFallback) return "local_fallback" as const;
    return remote ? ("supabase" as const) : ("local" as const);
  }, [remote, usingLocalFallback]);

  return {
    lang,
    messages,
    status,
    isTyping,
    isReady,
    modeLabel,
    usingLocalFallback,
    realtimeActive,
    handleSend,
    handleQuickSelect,
    requestHumanHandoff,
  };
}
