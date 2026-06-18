"use client";

import { useState } from "react";
import { settingsData } from "@/data/settingsData";
import { isAdminAuthFeatureEnabled } from "@/lib/auth/adminAccessConfig";
import {
  ADMIN_LOGIN_NOT_ENABLED,
  ADMIN_LOGIN_SUPABASE_MISSING,
} from "@/lib/auth/adminAuthNotes";
import { isSupabaseConfigured } from "@/lib/supabase/isConfigured";
import { useAdminAuthSession } from "@/lib/auth/useAdminAuthSession";

export function AdminLoginForm() {
  const lang = settingsData.defaultLanguage;
  const authFeatureEnabled = isAdminAuthFeatureEnabled();
  const supabaseReady = isSupabaseConfigured();
  const { signInWithMagicLink } = useAdminAuthSession();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!authFeatureEnabled) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950"
      >
        {ADMIN_LOGIN_NOT_ENABLED[lang]}
      </div>
    );
  }

  if (!supabaseReady) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950"
      >
        {ADMIN_LOGIN_SUPABASE_MISSING[lang]}
      </div>
    );
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const result = await signInWithMagicLink(email);

    setStatus(
      result.ok
        ? lang === "ar"
          ? "تم إرسال رابط الدخول إلى بريدك. افتح الرابط للمتابعة."
          : result.message
        : result.message,
    );
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="admin-email" className="mb-2 block text-sm font-medium text-flash-text">
          {lang === "ar" ? "البريد الإلكتروني" : "Email"}
        </label>
        <input
          id="admin-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@example.com"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-flash-primary focus:ring-2 focus:ring-flash-primary/20"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !email.trim()}
        className="flash-btn-primary w-full justify-center !py-2.5 disabled:opacity-50"
      >
        {isSubmitting
          ? lang === "ar"
            ? "جاري الإرسال..."
            : "Sending..."
          : lang === "ar"
            ? "إرسال رابط الدخول"
            : "Send magic link"}
      </button>

      {status && (
        <p className="rounded-lg bg-flash-surface px-3 py-2 text-sm text-flash-muted">{status}</p>
      )}

      <p className="text-xs leading-relaxed text-flash-muted">
        {lang === "ar"
          ? "يجب أن يكون البريد مضافًا في ADMIN_ALLOWED_EMAILS على الخادم فقط. لا تُعرض القيم هنا."
          : "Email must be listed in server-side ADMIN_ALLOWED_EMAILS only. Values are never shown here."}
      </p>
    </form>
  );
}
