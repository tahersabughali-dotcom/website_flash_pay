import { settingsData } from "@/data/settingsData";
import { getLocalized } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const TRUST_ITEMS = [
  {
    id: "network",
    icon: "/icons/categories/route.svg",
    label: { ar: "شبكة عالمية", en: "Global network" },
    hint: { ar: "حسب الطلب", en: "On request" },
  },
  {
    id: "transfers",
    icon: "/icons/categories/payment.svg",
    label: { ar: "تحويلات حسب الطلب", en: "Transfers on request" },
    hint: { ar: "يتم التأكيد عبر WhatsApp", en: "Confirmed via WhatsApp" },
  },
  {
    id: "usdt",
    icon: "/icons/categories/currency.svg",
    label: { ar: "USDT", en: "USDT" },
    hint: { ar: "حسب التغطية", en: "By coverage" },
  },
  {
    id: "business",
    icon: "/icons/categories/receiving.svg",
    label: { ar: "حلول الأعمال والتجار", en: "Business solutions" },
    hint: { ar: "حسب الحجم والتوفر", en: "By volume & availability" },
  },
  {
    id: "whatsapp",
    icon: "/icons/categories/security.svg",
    label: { ar: "WhatsApp رسمي", en: "Official WhatsApp" },
    hint: { ar: "القناة الأساسية", en: "Primary channel" },
  },
] as const;

export function HomeTrustStrip() {
  const lang = settingsData.defaultLanguage;

  return (
    <div className="flash-trust-strip">
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-3 shadow-sm ring-1 ring-flash-primary/5 sm:p-4">
        <div className="flash-filter-scroll">
          <ul className="flash-filter-scroll-inner min-w-full gap-2.5 sm:grid sm:grid-cols-2 sm:gap-2.5 lg:grid-cols-5">
            {TRUST_ITEMS.map((item) => (
              <li
                key={item.id}
                className={cn(
                  "flex h-full min-h-[4.5rem] min-w-[10rem] shrink-0 items-center gap-3 rounded-xl bg-flash-surface/60 px-3 py-2.5 sm:min-w-0",
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.icon}
                  alt=""
                  aria-hidden
                  className="h-9 w-9 shrink-0 object-contain"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold leading-snug text-flash-text">
                    {getLocalized(item.label, lang)}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-flash-muted">
                    {getLocalized(item.hint, lang)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
