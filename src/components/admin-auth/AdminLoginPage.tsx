"use client";

import Image from "next/image";
import Link from "next/link";
import { settingsData } from "@/data/settingsData";
import { getTextDirection } from "@/lib/i18n";
import { ADMIN_SECURITY_WARNING } from "@/lib/auth/adminAuthNotes";
import { AdminAuthNotice } from "./AdminAuthNotice";
import { AdminLoginForm } from "./AdminLoginForm";

const LOGO_MARK = "/images/logo-mark.png";

export function AdminLoginPage() {
  const lang = settingsData.defaultLanguage;
  const dir = getTextDirection(lang);

  return (
    <div dir={dir} className="min-h-screen bg-gradient-to-br from-white via-flash-primary-light/40 to-white">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md sm:p-8">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 shrink-0">
              <Image src={LOGO_MARK} alt="" width={44} height={44} className="object-contain" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-flash-primary">
                Flash Pay Admin
              </p>
              <p className="text-sm text-flash-muted">
                {lang === "ar" ? "دخول الفريق الداخلي" : "Internal team access"}
              </p>
            </div>
          </div>

          <h1 className="mt-5 text-2xl font-bold text-flash-text">
            {lang === "ar" ? "تسجيل الدخول" : "Sign in"}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-flash-muted">
            {lang === "ar"
              ? "الوصول إلى لوحة التحكم، الطلبات، الدردشة، والمحتوى."
              : "Access the dashboard, requests, chat, and content admin."}
          </p>

          <div
            role="alert"
            className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-950"
          >
            {ADMIN_SECURITY_WARNING[lang]}
          </div>

          <div className="mt-6 space-y-6">
            <AdminAuthNotice />
            <AdminLoginForm />
          </div>

          <Link
            href="/"
            className="mt-6 inline-block text-sm font-medium text-flash-primary hover:underline"
          >
            {lang === "ar" ? "← العودة إلى الموقع" : "← Back to website"}
          </Link>
        </div>
      </div>
    </div>
  );
}
