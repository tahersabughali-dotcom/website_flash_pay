"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { settingsData } from "@/data/settingsData";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: { ar: "لوحة التحكم", en: "Dashboard" }, exact: true },
  { href: "/admin/requests", label: { ar: "الطلبات", en: "Requests" } },
  { href: "/admin/chat", label: { ar: "الدردشة", en: "Chat" } },
  { href: "/admin/content", label: { ar: "المحتوى", en: "Content" } },
  { href: "/admin/coverage", label: { ar: "التغطية العالمية", en: "Coverage" } },
  { href: "/admin/settings", label: { ar: "الإعدادات", en: "Settings" } },
] as const;

export function AdminSidebar() {
  const lang = settingsData.defaultLanguage;
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden w-56 shrink-0 border-e border-slate-200 bg-white lg:block">
        <div className="sticky top-0 flex h-screen flex-col px-3 py-5">
          <p className="px-2 text-xs font-semibold uppercase tracking-wide text-flash-primary">
            Flash Pay Admin
          </p>
          <nav className="mt-5 flex flex-1 flex-col gap-1" aria-label={lang === "ar" ? "قائمة المشرف" : "Admin menu"}>
            {NAV_ITEMS.map((item) => {
              const active =
                "exact" in item && item.exact
                  ? pathname === item.href
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                    active
                      ? "bg-flash-primary text-white shadow-sm"
                      : "text-flash-muted hover:bg-flash-primary-light hover:text-flash-primary",
                  )}
                >
                  {item.label[lang]}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/"
            className="mt-4 rounded-xl border border-slate-200 px-3 py-2.5 text-center text-sm font-semibold text-flash-primary transition hover:bg-flash-primary-light"
          >
            {lang === "ar" ? "العودة للموقع" : "Back to site"}
          </Link>
        </div>
      </aside>

      <div className="border-b border-slate-200 bg-white px-3 py-2 lg:hidden">
        <div className="flash-filter-scroll">
          <div className="flash-filter-scroll-inner gap-2">
            {NAV_ITEMS.map((item) => {
              const active =
                "exact" in item && item.exact
                  ? pathname === item.href
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition",
                    active
                      ? "bg-flash-primary text-white"
                      : "bg-slate-100 text-flash-muted",
                  )}
                >
                  {item.label[lang]}
                </Link>
              );
            })}
            <Link
              href="/"
              className="shrink-0 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-flash-primary"
            >
              {lang === "ar" ? "الموقع" : "Site"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
