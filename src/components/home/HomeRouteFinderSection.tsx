import Link from "next/link";
import { homepageData } from "@/data/homepageData";
import { settingsData } from "@/data/settingsData";
import { isFeatureEnabled } from "@/data/featureFlagsData";
import { WorldMapAccent } from "@/components/shared/WorldMapAccent";

export function HomeRouteFinderSection() {
  const lang = settingsData.defaultLanguage;
  const config = homepageData.sections.routeFinder;

  if (!isFeatureEnabled("showRouteFinder")) return null;

  return (
    <section className="flash-section">
      <div className="relative overflow-hidden rounded-2xl border border-flash-primary/15 bg-gradient-to-br from-white via-flash-primary-light/50 to-white p-6 shadow-md ring-1 ring-flash-primary/10 sm:p-8">
        <WorldMapAccent className="opacity-50" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/categories/route.svg"
              alt=""
              aria-hidden
              className="hidden h-14 w-14 shrink-0 sm:block"
            />
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wide text-flash-primary">
                Flash Route Finder
              </p>
              <h2 className="mt-1 text-xl font-bold text-flash-text sm:text-2xl">
                {lang === "ar" ? "لا تعرف المسار المناسب؟" : "Not sure which route fits?"}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-flash-muted sm:text-base">
                {lang === "ar"
                  ? "جرّب Flash Route Finder لاختيار الدولة، العملة، وطريقة الاستلام، ثم اطلب التأكيد عبر WhatsApp."
                  : "Try Flash Route Finder to choose country, currency, and receiving method — then request confirmation via WhatsApp."}
              </p>
            </div>
          </div>
          <Link
            href={config.actionHref ?? "/route-finder"}
            className="flash-btn-primary shrink-0 self-start lg:self-center"
          >
            {lang === "ar" ? "اكتشف المسار" : "Discover route"}
          </Link>
        </div>
      </div>
    </section>
  );
}
