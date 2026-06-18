"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { AdminChatConnectionInfo } from "@/types/auth";
import { settingsData } from "@/data/settingsData";
import {
  getChatConnectionStatusSnapshot,
  probeSupabaseChatSchema,
  probeSupabaseRealtime,
  readForceMockMode,
  writeForceMockMode,
  type RealtimeProbeStatus,
  type SupabaseChatSchemaProbe,
} from "@/lib/supabase/chatConnectionStatus";

interface AdminSupabaseStatusPanelProps {
  serverConnection?: AdminChatConnectionInfo;
  isRemote: boolean;
}

function yesNo(value: boolean, lang: "ar" | "en") {
  return value ? (lang === "ar" ? "نعم" : "Yes") : lang === "ar" ? "لا" : "No";
}

function tableStatusLabel(
  status: SupabaseChatSchemaProbe["sessionsTable"],
  lang: "ar" | "en",
): string {
  const map: Record<string, { ar: string; en: string }> = {
    ok: { ar: "جاهز", en: "OK" },
    missing: { ar: "غير موجود", en: "Missing" },
    rls_blocked: { ar: "RLS يمنع الوصول", en: "RLS blocked" },
    unconfigured: { ar: "غير مهيأ", en: "Not configured" },
    error: { ar: "خطأ", en: "Error" },
  };

  return map[status]?.[lang] ?? status;
}

function realtimeLabel(status: RealtimeProbeStatus | "checking", lang: "ar" | "en") {
  const map: Record<string, { ar: string; en: string }> = {
    checking: { ar: "جاري الفحص...", en: "Checking..." },
    subscribed: { ar: "Realtime نشط", en: "Realtime active" },
    failed: { ar: "Realtime غير نشط", en: "Realtime inactive" },
    timeout: { ar: "Realtime — مهلة انتهت", en: "Realtime timed out" },
    unconfigured: { ar: "غير مهيأ", en: "Not configured" },
  };

  return map[status]?.[lang] ?? status;
}

export function AdminSupabaseStatusPanel({
  serverConnection,
  isRemote,
}: AdminSupabaseStatusPanelProps) {
  const lang = settingsData.defaultLanguage;
  const [forceMock, setForceMock] = useState(() => readForceMockMode());
  const [schemaProbe, setSchemaProbe] = useState<SupabaseChatSchemaProbe | null>(null);
  const [realtimeProbe, setRealtimeProbe] = useState<RealtimeProbeStatus | "checking">("checking");
  const [refreshToken, setRefreshToken] = useState(0);

  const snapshot = useMemo(() => getChatConnectionStatusSnapshot(forceMock), [forceMock]);

  const connection = serverConnection ?? {
    supabaseConfigured: snapshot.supabaseConfigured,
    serviceRoleConfigured: snapshot.serviceRoleConfigured,
    siteUrlConfigured: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
    realtimeFeatureEnabled: snapshot.realtimeFeatureEnabled,
    adminAuthFeatureEnabled: snapshot.adminAuthFeatureEnabled,
    adminAuthConfigured: snapshot.adminAuthConfigured,
  };

  const runChecks = useCallback(async () => {
    if (!connection.supabaseConfigured || forceMock) {
      setSchemaProbe(null);
      setRealtimeProbe("unconfigured");
      return;
    }

    const schema = await probeSupabaseChatSchema();
    setSchemaProbe(schema);
    const realtime = await probeSupabaseRealtime();
    setRealtimeProbe(realtime);
  }, [connection.supabaseConfigured, forceMock]);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      if (!connection.supabaseConfigured || forceMock) {
        if (!cancelled) {
          setSchemaProbe(null);
          setRealtimeProbe("unconfigured");
        }
        return;
      }

      const schema = await probeSupabaseChatSchema();
      if (cancelled) return;
      setSchemaProbe(schema);

      const realtime = await probeSupabaseRealtime();
      if (cancelled) return;
      setRealtimeProbe(realtime);
    })();

    return () => {
      cancelled = true;
    };
  }, [connection.supabaseConfigured, forceMock, refreshToken]);

  useEffect(() => {
    const onModeChange = () => {
      setForceMock(readForceMockMode());
      setRefreshToken((value) => value + 1);
    };

    window.addEventListener("flashpay-chat-mode-change", onModeChange);
    return () => window.removeEventListener("flashpay-chat-mode-change", onModeChange);
  }, []);

  const authLabel =
    connection.adminAuthConfigured && connection.adminAuthFeatureEnabled
      ? lang === "ar"
        ? "مصادقة مهيأة (غير جاهزة للإنتاج)"
        : "Auth configured (not production-ready)"
      : lang === "ar"
        ? "معاينة محلية — بدون مصادقة إنتاج"
        : "Local preview — not production auth";

  const modeLabel =
    snapshot.repositoryMode === "supabase_live_test"
      ? lang === "ar"
        ? "Supabase — اختبار مباشر محلي"
        : "Supabase live local test"
      : snapshot.repositoryMode === "mock_fallback"
        ? lang === "ar"
          ? "Mock fallback"
          : "Mock fallback"
        : lang === "ar"
          ? "غير مهيأ"
          : "Unconfigured";

  const needsManualRealtime =
    connection.supabaseConfigured &&
    schemaProbe &&
    schemaProbe.sessionsTable === "ok" &&
    realtimeProbe !== "subscribed";

  return (
    <section
      aria-label={lang === "ar" ? "حالة اتصال Supabase" : "Supabase connection status"}
      className="rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm shadow-sm"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold text-flash-text">
            {lang === "ar" ? "حالة الاتصال — Live Chat" : "Live Chat Connection Status"}
          </h2>
          <p className="mt-1 text-xs text-flash-muted">
            {lang === "ar"
              ? "لا تُعرض أي قيم سرية هنا."
              : "No secret values are shown here."}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setRealtimeProbe("checking");
            setRefreshToken((value) => value + 1);
            void runChecks();
          }}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-flash-text transition hover:bg-slate-50"
        >
          {lang === "ar" ? "إعادة الفحص" : "Re-check"}
        </button>
      </div>

      <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <StatusItem
          label={lang === "ar" ? "Supabase مهيأ" : "Supabase configured"}
          value={yesNo(connection.supabaseConfigured, lang)}
        />
        <StatusItem
          label={lang === "ar" ? "Realtime" : "Realtime"}
          value={realtimeLabel(realtimeProbe, lang)}
        />
        <StatusItem label={lang === "ar" ? "المصادقة" : "Admin auth"} value={authLabel} />
        <StatusItem
          label={lang === "ar" ? "Service role (server)" : "Service role (server)"}
          value={yesNo(connection.serviceRoleConfigured, lang)}
        />
        <StatusItem
          label={lang === "ar" ? "NEXT_PUBLIC_SITE_URL" : "NEXT_PUBLIC_SITE_URL"}
          value={yesNo(connection.siteUrlConfigured, lang)}
        />
        <StatusItem label={lang === "ar" ? "الوضع الحالي" : "Current mode"} value={modeLabel} />
      </dl>

      {schemaProbe && connection.supabaseConfigured && !forceMock && (
        <div className="mt-4 rounded-lg bg-slate-50 px-3 py-3 text-xs text-flash-muted">
          <p className="font-medium text-flash-text">
            {lang === "ar" ? "فحص الجداول" : "Schema probe"}
          </p>
          <ul className="mt-2 space-y-1">
            <li>
              chat_sessions: {tableStatusLabel(schemaProbe.sessionsTable, lang)}
            </li>
            <li>
              chat_messages: {tableStatusLabel(schemaProbe.messagesTable, lang)}
            </li>
            <li>
              chat_agents: {tableStatusLabel(schemaProbe.agentsTable, lang)}
            </li>
          </ul>
          {schemaProbe.hint && (
            <p className="mt-2 leading-relaxed text-amber-800">{schemaProbe.hint}</p>
          )}
        </div>
      )}

      {needsManualRealtime && (
        <p className="mt-3 text-xs leading-relaxed text-amber-800">
          {lang === "ar"
            ? "Realtime غير نشط محليًا. فعّل جداول chat_sessions و chat_messages في Supabase Realtime، أو استخدم التحديث اليدوي/الاستطلاع في لوحة الإدارة."
            : "Realtime is not active locally. Enable chat_sessions and chat_messages in Supabase Realtime, or use manual refresh/polling in the admin inbox."}
        </p>
      )}

      {connection.supabaseConfigured && (
        <label className="mt-4 flex cursor-pointer items-start gap-2 rounded-lg border border-dashed border-slate-200 px-3 py-3 text-xs">
          <input
            type="checkbox"
            checked={forceMock}
            onChange={(event) => {
              const enabled = event.target.checked;
              writeForceMockMode(enabled);
              setForceMock(enabled);
              setRefreshToken((value) => value + 1);
            }}
            className="mt-0.5"
          />
          <span>
            {lang === "ar"
              ? "استخدام Mock fallback للاختبار (يعطّل Supabase مؤقتًا في هذه المتصفح)"
              : "Use mock fallback for testing (temporarily disables Supabase in this browser)"}
          </span>
        </label>
      )}

      {isRemote && (
        <p className="mt-3 text-xs text-emerald-800">
          {lang === "ar"
            ? "الوضع الحالي: جلسات حقيقية من Supabase."
            : "Current inbox: loading real Supabase sessions."}
        </p>
      )}
    </section>
  );
}

function StatusItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-100 bg-flash-surface px-3 py-2">
      <dt className="text-[11px] font-medium uppercase tracking-wide text-flash-muted">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-flash-text">{value}</dd>
    </div>
  );
}
