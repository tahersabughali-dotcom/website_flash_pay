"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { cloneMockChatSessions } from "@/data/mockChatSessionsData";
import { createChatMessage } from "@/lib/chat/chatUtils";
import {
  addHumanMessage,
  closeSession as closeRemoteSession,
  ChatRepositoryError,
  isChatRepositoryRemote,
  listAdminSessions,
  loadAdminSessionWithMessages,
  markWaitingForHuman as markWaitingForHumanRemote,
  reopenSession as reopenRemoteSession,
  subscribeToAdminSessions,
  subscribeToSessionMessages,
} from "@/lib/chat/chatRepository";
import type {
  AdminChatSession,
  AdminChatStatusFilter,
  ChatSessionStatus,
} from "@/types/chat";

interface MockAdminChatState {
  sessions: AdminChatSession[];
  selectedSessionId: string | null;
  statusFilter: AdminChatStatusFilter;
}

type MockAdminChatAction =
  | { type: "SELECT_SESSION"; sessionId: string }
  | { type: "SET_STATUS_FILTER"; filter: AdminChatStatusFilter }
  | { type: "SEND_HUMAN_REPLY"; sessionId: string; content: string }
  | { type: "CLOSE_SESSION"; sessionId: string }
  | { type: "REOPEN_SESSION"; sessionId: string }
  | { type: "MARK_WAITING"; sessionId: string }
  | { type: "ADD_INTERNAL_NOTE"; sessionId: string; note: string };

function touchSession(
  session: AdminChatSession,
  lastMessage: string,
  message?: AdminChatSession["messages"][number],
  status?: ChatSessionStatus,
): AdminChatSession {
  return {
    ...session,
    lastMessage,
    updatedAt: new Date().toISOString(),
    status: status ?? session.status,
    messages: message ? [...session.messages, message] : session.messages,
  };
}

function mockAdminChatReducer(
  state: MockAdminChatState,
  action: MockAdminChatAction,
): MockAdminChatState {
  switch (action.type) {
    case "SELECT_SESSION":
      return { ...state, selectedSessionId: action.sessionId };

    case "SET_STATUS_FILTER":
      return { ...state, statusFilter: action.filter };

    case "SEND_HUMAN_REPLY": {
      const message = createChatMessage("human", action.content);
      return {
        ...state,
        sessions: state.sessions.map((session) =>
          session.id === action.sessionId
            ? touchSession(session, action.content, message, "human")
            : session,
        ),
      };
    }

    case "CLOSE_SESSION":
      return {
        ...state,
        sessions: state.sessions.map((session) =>
          session.id === action.sessionId
            ? { ...session, status: "closed", updatedAt: new Date().toISOString() }
            : session,
        ),
      };

    case "REOPEN_SESSION":
      return {
        ...state,
        sessions: state.sessions.map((session) =>
          session.id === action.sessionId
            ? { ...session, status: "human", updatedAt: new Date().toISOString() }
            : session,
        ),
      };

    case "MARK_WAITING":
      return {
        ...state,
        sessions: state.sessions.map((session) =>
          session.id === action.sessionId
            ? { ...session, status: "waiting_for_human", updatedAt: new Date().toISOString() }
            : session,
        ),
      };

    case "ADD_INTERNAL_NOTE":
      return {
        ...state,
        sessions: state.sessions.map((session) =>
          session.id === action.sessionId
            ? {
                ...session,
                internalNotes: [...session.internalNotes, action.note],
                updatedAt: new Date().toISOString(),
              }
            : session,
        ),
      };

    default:
      return state;
  }
}

const mockInitialState: MockAdminChatState = {
  sessions: cloneMockChatSessions(),
  selectedSessionId: cloneMockChatSessions()[1]?.id ?? null,
  statusFilter: "all",
};

export function useAdminChatStore() {
  const [remoteEnabled, setRemoteEnabled] = useState(isChatRepositoryRemote());
  const remote = remoteEnabled;
  const [mockState, mockDispatch] = useReducer(mockAdminChatReducer, mockInitialState);
  const [remoteSessions, setRemoteSessions] = useState<AdminChatSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [statusFilter, setStatusFilterState] = useState<AdminChatStatusFilter>("all");
  const [internalNotes, setInternalNotes] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(remote);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [realtimeActive, setRealtimeActive] = useState(false);
  const [usePollingFallback, setUsePollingFallback] = useState(false);
  const usePollingRef = useRef(false);

  useEffect(() => {
    const syncMode = () => {
      setRemoteEnabled(isChatRepositoryRemote());
    };

    window.addEventListener("flashpay-chat-mode-change", syncMode);
    return () => window.removeEventListener("flashpay-chat-mode-change", syncMode);
  }, []);

  const mergeSessionList = useCallback(
    (
      list: AdminChatSession[],
      prev: AdminChatSession[],
      keepSelection: boolean,
    ): AdminChatSession[] => {
      const selectedMessages =
        keepSelection && selectedSessionId
          ? prev.find((session) => session.id === selectedSessionId)?.messages
          : undefined;

      return list.map((session) => {
        const notes = internalNotes[session.id] ?? [];
        if (session.id === selectedSessionId && selectedMessages?.length) {
          return { ...session, messages: selectedMessages, internalNotes: notes };
        }
        return { ...session, messages: [], internalNotes: notes };
      });
    },
    [internalNotes, selectedSessionId],
  );

  const syncRemoteSessions = useCallback(
    async (keepSelection = true) => {
      try {
        const list = await listAdminSessions();
        setLoadError(null);
        setRemoteSessions((prev) => mergeSessionList(list, prev, keepSelection));
        setSelectedSessionId((current) => current ?? list[0]?.id ?? null);
      } catch (error) {
        const message =
          error instanceof ChatRepositoryError
            ? error.message
            : "Failed to load Supabase sessions";
        setLoadError(message);
        setRemoteSessions([]);
        setSelectedSessionId(null);
      } finally {
        setLoading(false);
      }
    },
    [mergeSessionList],
  );

  useEffect(() => {
    if (!remote) return;

    let cancelled = false;

    const bootstrap = async () => {
      try {
        const list = await listAdminSessions();
        if (cancelled) return;
        setLoadError(null);
        setRemoteSessions((prev) => mergeSessionList(list, prev, false));
        setSelectedSessionId((current) => current ?? list[0]?.id ?? null);
      } catch (error) {
        if (cancelled) return;
        const message =
          error instanceof ChatRepositoryError
            ? error.message
            : "Failed to load Supabase sessions";
        setLoadError(message);
        setRemoteSessions([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void bootstrap();

    const unsubscribe = subscribeToAdminSessions(
      () => {
        if (!cancelled) {
          void syncRemoteSessions(true);
        }
      },
      (status) => {
        if (cancelled) return;
        const active = status === "SUBSCRIBED";
        usePollingRef.current = !active;
        setRealtimeActive(active);
        setUsePollingFallback(!active);
      },
    );

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [mergeSessionList, remote, syncRemoteSessions]);

  useEffect(() => {
    if (!remote) return;

    const pollTimer = window.setInterval(() => {
      if (usePollingRef.current) {
        void syncRemoteSessions(true);
      }
    }, 5000);

    return () => window.clearInterval(pollTimer);
  }, [remote, syncRemoteSessions]);

  useEffect(() => {
    if (!remote || !selectedSessionId) return;

    let cancelled = false;

    void loadAdminSessionWithMessages(
      selectedSessionId,
      internalNotes[selectedSessionId] ?? [],
    ).then((session) => {
      if (cancelled || !session) return;

      setRemoteSessions((prev) =>
        prev.map((item) => (item.id === session.id ? session : item)),
      );
    });

    const unsubscribe = subscribeToSessionMessages(
      selectedSessionId,
      (message) => {
        setRemoteSessions((prev) =>
          prev.map((session) => {
            if (session.id !== selectedSessionId) return session;
            if (session.messages.some((item) => item.id === message.id)) return session;
            return touchSession(session, message.content, message);
          }),
        );
      },
      (status) => {
        const active = status === "SUBSCRIBED";
        usePollingRef.current = !active;
        setRealtimeActive(active);
        setUsePollingFallback(!active);
      },
    );

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [internalNotes, remote, selectedSessionId]);

  const sessions = remote ? remoteSessions : mockState.sessions;
  const activeSelectedId = remote ? selectedSessionId : mockState.selectedSessionId;
  const activeStatusFilter = remote ? statusFilter : mockState.statusFilter;

  const filteredSessions = useMemo(() => {
    if (activeStatusFilter === "all") return sessions;
    return sessions.filter((session) => session.status === activeStatusFilter);
  }, [activeStatusFilter, sessions]);

  const selectedSession = useMemo(
    () => sessions.find((session) => session.id === activeSelectedId) ?? null,
    [activeSelectedId, sessions],
  );

  const selectSession = useCallback(
    (sessionId: string) => {
      if (remote) {
        setSelectedSessionId(sessionId);
        return;
      }
      mockDispatch({ type: "SELECT_SESSION", sessionId });
    },
    [remote],
  );

  const setStatusFilter = useCallback(
    (filter: AdminChatStatusFilter) => {
      if (remote) {
        setStatusFilterState(filter);
        return;
      }
      mockDispatch({ type: "SET_STATUS_FILTER", filter });
    },
    [remote],
  );

  const sendHumanReply = useCallback(
    async (sessionId: string, content: string) => {
      const text = content.trim();
      if (!text) return;

      if (remote) {
        await addHumanMessage(sessionId, text);
        await syncRemoteSessions(true);
        if (selectedSessionId === sessionId) {
          const session = await loadAdminSessionWithMessages(
            sessionId,
            internalNotes[sessionId] ?? [],
          );
          if (session) {
            setRemoteSessions((prev) =>
              prev.map((item) => (item.id === sessionId ? session : item)),
            );
          }
        }
        return;
      }

      mockDispatch({ type: "SEND_HUMAN_REPLY", sessionId, content: text });
    },
    [internalNotes, remote, selectedSessionId, syncRemoteSessions],
  );

  const closeSession = useCallback(
    async (sessionId: string) => {
      if (remote) {
        await closeRemoteSession(sessionId);
        await syncRemoteSessions(true);
        return;
      }
      mockDispatch({ type: "CLOSE_SESSION", sessionId });
    },
    [remote, syncRemoteSessions],
  );

  const reopenSession = useCallback(
    async (sessionId: string) => {
      if (remote) {
        await reopenRemoteSession(sessionId);
        await syncRemoteSessions(true);
        return;
      }
      mockDispatch({ type: "REOPEN_SESSION", sessionId });
    },
    [remote, syncRemoteSessions],
  );

  const markWaitingForHuman = useCallback(
    async (sessionId: string) => {
      if (remote) {
        await markWaitingForHumanRemote(sessionId);
        await syncRemoteSessions(true);
        return;
      }
      mockDispatch({ type: "MARK_WAITING", sessionId });
    },
    [remote, syncRemoteSessions],
  );

  const addInternalNote = useCallback(
    (sessionId: string, note: string) => {
      const text = note.trim();
      if (!text) return;

      if (remote) {
        setInternalNotes((prev) => ({
          ...prev,
          [sessionId]: [...(prev[sessionId] ?? []), text],
        }));
        setRemoteSessions((prev) =>
          prev.map((session) =>
            session.id === sessionId
              ? { ...session, internalNotes: [...session.internalNotes, text] }
              : session,
          ),
        );
        return;
      }

      mockDispatch({ type: "ADD_INTERNAL_NOTE", sessionId, note: text });
    },
    [remote],
  );

  return {
    sessions,
    filteredSessions,
    selectedSession,
    selectedSessionId: activeSelectedId,
    statusFilter: activeStatusFilter,
    loading,
    loadError,
    realtimeActive,
    usePollingFallback,
    isRemote: remote,
    selectSession,
    setStatusFilter,
    sendHumanReply,
    closeSession,
    reopenSession,
    markWaitingForHuman,
    addInternalNote,
  };
}

export type AdminChatStore = ReturnType<typeof useAdminChatStore>;
