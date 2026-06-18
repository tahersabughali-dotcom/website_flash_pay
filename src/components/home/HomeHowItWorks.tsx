import { settingsData } from "@/data/settingsData";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { getLocalized } from "@/lib/i18n";

const STEPS = [
  {
    id: "choose",
    icon: "1",
    title: { ar: "اختر الخدمة أو المسار", en: "Choose service or route" },
    desc: {
      ar: "من مركز الطلبات أو مكتشف المسارات.",
      en: "From the request center or route finder.",
    },
  },
  {
    id: "whatsapp",
    icon: "2",
    title: { ar: "أرسل التفاصيل عبر WhatsApp", en: "Send details via WhatsApp" },
    desc: {
      ar: "القناة الرسمية لتأكيد الطلب.",
      en: "Official channel to confirm your request.",
    },
  },
  {
    id: "confirm",
    icon: "3",
    title: {
      ar: "يتم تأكيد التوفر والسعر وطريقة التنفيذ",
      en: "Availability, price & method are confirmed",
    },
    desc: {
      ar: "بعد مراجعة الفريق — ليس تلقائيًا على الموقع.",
      en: "After team review — not automatic on the website.",
    },
  },
  {
    id: "follow",
    icon: "4",
    title: { ar: "تابع مع فريق Flash Pay", en: "Follow up with Flash Pay team" },
    desc: {
      ar: "للاستفسارات والتحديثات عبر القنوات الرسمية.",
      en: "For questions and updates via official channels.",
    },
  },
] as const;

export function HomeHowItWorks() {
  const lang = settingsData.defaultLanguage;

  return (
    <section className="flash-section">
      <SectionHeader
        title={lang === "ar" ? "كيف تتم العملية؟" : "How it works"}
        subtitle={
          lang === "ar"
            ? "مسار واضح — بدون وعود تنفيذ تلقائي على الموقع."
            : "A clear path — no automatic execution promises on the website."
        }
      />

      <div className="relative rounded-2xl border border-slate-200 bg-flash-surface/60 p-4 sm:p-6">
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li
              key={step.id}
              className="relative flex gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm"
            >
              {index < STEPS.length - 1 && (
                <span
                  className="absolute -bottom-4 start-1/2 hidden h-4 w-px bg-slate-200 lg:block"
                  aria-hidden
                />
              )}
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-flash-primary text-sm font-bold text-white shadow-sm"
                aria-hidden
              >
                {step.icon}
              </span>
              <div>
                <h3 className="text-sm font-bold text-flash-text">{getLocalized(step.title, lang)}</h3>
                <p className="mt-1 text-xs leading-relaxed text-flash-muted">
                  {getLocalized(step.desc, lang)}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-950">
          {lang === "ar"
            ? "لا يتم تنفيذ أي عملية أو اعتماد سعر قبل التأكيد عبر القناة الرسمية."
            : "No operation or price is confirmed before official channel confirmation."}
        </p>
      </div>
    </section>
  );
}
