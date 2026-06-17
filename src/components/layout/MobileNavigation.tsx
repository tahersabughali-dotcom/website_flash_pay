"use client";

import Link from "next/link";
import { useState } from "react";
import { settingsData } from "@/data/settingsData";
import { getLocalized } from "@/lib/i18n";
import { getVisibleNavigation } from "@/lib/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const lang = settingsData.defaultLanguage;
  const navItems = getVisibleNavigation();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-flash-text shadow-sm"
        aria-expanded={open}
        aria-label={lang === "ar" ? "القائمة" : "Menu"}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? (
            <path d="M6 6l12 12M18 6 6 18" />
          ) : (
            <>
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
            aria-label={lang === "ar" ? "إغلاق" : "Close"}
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-x-0 top-full z-50 max-h-[85vh] overflow-y-auto border-b border-slate-200 bg-white shadow-xl">
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="text-xs font-medium uppercase tracking-wide text-flash-muted">
                  {lang === "ar" ? "القائمة" : "Menu"}
                </span>
                <LanguageSwitcher compact />
              </div>

              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.route}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-sm text-flash-text transition hover:bg-flash-primary-light"
                >
                  <span>{getLocalized(item.title, lang)}</span>
                  {item.status === "coming_soon" && (
                    <StatusBadge
                      status="coming_soon"
                      label={lang === "ar" ? "قريباً" : "Soon"}
                    />
                  )}
                </Link>
              ))}

              <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4">
                <Link
                  href="/request"
                  onClick={() => setOpen(false)}
                  className="flash-btn-primary w-full text-center"
                >
                  {lang === "ar" ? "ابدأ طلباً" : "Start a Request"}
                </Link>
                <WhatsAppButton className="w-full justify-center !rounded-xl" />
              </div>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
