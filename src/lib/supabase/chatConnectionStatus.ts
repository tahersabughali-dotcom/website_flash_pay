import {
  isAdminAuthConfigured,
  isAdminPreviewEnabled,
  isLiveChatRealtimeEnabled,
} from "@/lib/auth/adminAccessConfig";
import { isAdminAuthEnabled } from "@/lib/config/featureFlags";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  isSupabaseAdminConfigured,
  isSupabaseConfigured,
} from "@/lib/supabase/isConfigured";

export type SupabaseTableProbeStatus =
  | "ok"
  | "missing"
  | "rls_blocked"
  | "unconfigured"
  | "error";

export interface SupabaseChatSchemaProbe {
  sessionsTable: SupabaseTableProbeStatus;
  messagesTable: SupabaseTableProbeStatus;
  agentsTable: SupabaseTableProbeStatus;
  checkedAt: string;
  hint?: string;
}

export interface ChatConnectionStatusSnapshot {
  supabaseConfigured: boolean;
  serviceRoleConfigured: boolean;
  realtimeFeatureEnabled: boolean;
  adminAuthFeatureEnabled: boolean;
  adminAuthConfigured: boolean;
  adminPreviewEnabled: boolean;
  repositoryMode: "mock_fallback" | "supabase_live_test" | "unconfigured";
  forceMockMode: boolean;
}

const FORCE_MOCK_STORAGE_KEY = "flashpay_admin_force_mock";

function classifyProbeError(message: string): SupabaseTableProbeStatus {
  const lower = message.toLowerCase();

  if (lower.includes("does not exist") || lower.includes("could not find the table")) {
    return "missing";
  }

  if (
    lower.includes("permission denied") ||
    lower.includes("row-level security") ||
    lower.includes("rls") ||
    lower.includes("42501")
  ) {
    return "rls_blocked";
  }

  return "error";
}

async function probeTable(table: "chat_sessions" | "chat_messages" | "chat_agents") {
  const client = getSupabaseBrowserClient();
  if (!client) return "unconfigured" as const;

  const { error } = await client.from(table).select("id").limit(1);

  if (!error) return "ok" as const;
  return classifyProbeError(error.message);
}

export function readForceMockMode(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(FORCE_MOCK_STORAGE_KEY) === "true";
}

export function writeForceMockMode(enabled: boolean): void {
  if (typeof window === "undefined") return;

  if (enabled) {
    window.localStorage.setItem(FORCE_MOCK_STORAGE_KEY, "true");
  } else {
    window.localStorage.removeItem(FORCE_MOCK_STORAGE_KEY);
  }

  window.dispatchEvent(new CustomEvent("flashpay-chat-mode-change"));
}

export function getChatConnectionStatusSnapshot(
  forceMockMode = readForceMockMode(),
): ChatConnectionStatusSnapshot {
  const supabaseConfigured = isSupabaseConfigured();
  const preview = isAdminPreviewEnabled();
  const remoteEligible =
    supabaseConfigured &&
    !forceMockMode &&
    (isLiveChatRealtimeEnabled() || (preview && process.env.NODE_ENV === "development"));

  let repositoryMode: ChatConnectionStatusSnapshot["repositoryMode"] = "unconfigured";

  if (forceMockMode && preview) {
    repositoryMode = "mock_fallback";
  } else if (remoteEligible) {
    repositoryMode = "supabase_live_test";
  } else if (preview) {
    repositoryMode = "mock_fallback";
  }

  return {
    supabaseConfigured,
    serviceRoleConfigured: isSupabaseAdminConfigured(),
    realtimeFeatureEnabled: isLiveChatRealtimeEnabled(),
    adminAuthFeatureEnabled: isAdminAuthEnabled(),
    adminAuthConfigured: isAdminAuthConfigured(),
    adminPreviewEnabled: preview,
    repositoryMode,
    forceMockMode,
  };
}

export async function probeSupabaseChatSchema(): Promise<SupabaseChatSchemaProbe> {
  if (!isSupabaseConfigured()) {
    return {
      sessionsTable: "unconfigured",
      messagesTable: "unconfigured",
      agentsTable: "unconfigured",
      checkedAt: new Date().toISOString(),
      hint: "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local",
    };
  }

  const [sessionsTable, messagesTable, agentsTable] = await Promise.all([
    probeTable("chat_sessions"),
    probeTable("chat_messages"),
    probeTable("chat_agents"),
  ]);

  let hint: string | undefined;

  if ([sessionsTable, messagesTable, agentsTable].includes("missing")) {
    hint = "Run supabase/schema.sql in the Supabase SQL Editor.";
  } else if ([sessionsTable, messagesTable].includes("rls_blocked")) {
    hint =
      "RLS is blocking anon access. For local testing only, uncomment the LOCAL DEVELOPMENT policies in supabase/schema.sql.";
  } else if (agentsTable === "rls_blocked") {
    hint = "chat_agents select may require local-dev policy for admin previews.";
  }

  return {
    sessionsTable,
    messagesTable,
    agentsTable,
    checkedAt: new Date().toISOString(),
    hint,
  };
}

export type RealtimeProbeStatus = "unconfigured" | "subscribed" | "failed" | "timeout";

export async function probeSupabaseRealtime(timeoutMs = 4000): Promise<RealtimeProbeStatus> {
  const client = getSupabaseBrowserClient();
  if (!client) return "unconfigured";

  return new Promise((resolve) => {
    let settled = false;
    const channel = client
      .channel("flashpay-realtime-probe")
      .on("postgres_changes", { event: "*", schema: "public", table: "chat_sessions" }, () => undefined)
      .subscribe((status) => {
        if (settled) return;

        if (status === "SUBSCRIBED") {
          settled = true;
          window.clearTimeout(timer);
          void client.removeChannel(channel);
          resolve("subscribed");
        }

        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          settled = true;
          window.clearTimeout(timer);
          void client.removeChannel(channel);
          resolve("failed");
        }
      });

    const timer = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      void client.removeChannel(channel);
      resolve("timeout");
    }, timeoutMs);
  });
}
