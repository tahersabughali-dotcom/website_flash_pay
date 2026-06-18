import { GLOBAL_COUNTRY_COUNT } from "@/data/globalCountriesData";
import { GLOBAL_CURRENCY_COUNT } from "@/data/globalCurrenciesData";
import { GLOBAL_PAYMENT_METHOD_COUNT } from "@/data/globalPaymentMethodsData";
import { GLOBAL_RECEIVING_METHOD_COUNT } from "@/data/globalReceivingMethodsData";
import { settingsData } from "@/data/settingsData";
import { WorldMapAccent } from "@/components/shared/WorldMapAccent";

const METHOD_COUNT = GLOBAL_PAYMENT_METHOD_COUNT + GLOBAL_RECEIVING_METHOD_COUNT;

export function HomeGlobalStats() {
  const lang = settingsData.defaultLanguage;

  const stats = [
    {
      value: String(GLOBAL_COUNTRY_COUNT),
      label:
        lang === "ar" ? "دولة ومنطقة في الدليل العالمي" : "countries & regions in global directory",
    },
    {
      value: String(GLOBAL_CURRENCY_COUNT),
      label: lang === "ar" ? "عملة مرجعية" : "reference currencies",
    },
    {
      value: `${METHOD_COUNT}+`,
      label: lang === "ar" ? "طريقة دفع واستلام" : "payment & receiving methods",
    },
    {
      value: lang === "ar" ? "حسب الطلب" : "On request",
      label: lang === "ar" ? "يتم تأكيد التوفر حسب الطلب" : "Availability confirmed on request",
    },
  ];

  return (
    <section className="flash-section flash-section-tight">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white via-flash-primary-light/25 to-white px-4 py-5 shadow-sm sm:px-6 sm:py-6">
        <WorldMapAccent className="opacity-50" />
        <div className="relative grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center rounded-xl border border-white/90 bg-white/95 px-3 py-4 text-center shadow-sm"
            >
              <p className="text-3xl font-extrabold tracking-tight text-flash-primary sm:text-[2rem]">
                {stat.value}
              </p>
              <p className="mt-2 max-w-[12rem] text-xs font-medium leading-snug text-flash-text sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <p className="relative mt-4 rounded-xl border border-amber-100 bg-amber-50/80 px-3.5 py-2.5 text-center text-xs leading-relaxed text-amber-950 sm:text-start">
          {lang === "ar"
            ? "الدليل العالمي لا يعني توفر الخدمة بشكل مؤكد — يتم التأكيد حسب الدولة، العملة، المبلغ، وطريقة الاستلام."
            : "The global directory does not mean confirmed service availability — confirmation depends on country, currency, amount, and receiving method."}
        </p>
      </div>
    </section>
  );
}
