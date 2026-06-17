import Link from "next/link";
import { settingsData } from "@/data/settingsData";
import { NotFoundState } from "@/components/shared/NotFoundState";
import { RequestCTA } from "@/components/shared/RequestCTA";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { getComingSoonBySlug } from "@/lib/dataAccess";
import { getLocalized } from "@/lib/i18n";
import { FutureDisclaimer } from "./FutureDisclaimer";
import { FutureFeatureGrid } from "./FutureFeatureGrid";

interface ComingSoonPageProps {
  slug: string;
}

export function ComingSoonPage({ slug }: ComingSoonPageProps) {
  const lang = settingsData.defaultLanguage;
  const feature = getComingSoonBySlug(slug);

  if (!feature) {
    return (
      <div className="flash-page-wrap py-16">
        <NotFoundState
          title={lang === "ar" ? "الميزة غير موجودة" : "Feature not found"}
          description={
            lang === "ar"
              ? "قد تكون هذه الميزة مخفية أو غير متاحة."
              : "This feature may be hidden or unavailable."
          }
          backHref="/"
          backLabel={lang === "ar" ? "العودة للرئيسية" : "Back to Home"}
        />
      </div>
    );
  }

  return (
    <div className="flash-page-wrap">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 via-white to-flash-primary-light/50 px-6 py-12 sm:px-10 sm:py-14">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge
            status="coming_soon"
            label={lang === "ar" ? "قريباً" : "Coming Soon"}
          />
          {feature.underDevelopmentLabel && (
            <StatusBadge
              status="beta"
              label={getLocalized(feature.underDevelopmentLabel, lang)}
            />
          )}
        </div>

        <h1 className="mt-4 text-3xl font-bold text-flash-text sm:text-4xl">
          {getLocalized(feature.title, lang)}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-flash-muted sm:text-lg">
          {getLocalized(feature.description, lang)}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/request" className="flash-btn-primary">
            {lang === "ar" ? "ابدأ طلباً حالياً" : "Start a Request Now"}
          </Link>
          <Link href="/contact" className="flash-btn-secondary">
            {lang === "ar" ? "تواصل معنا" : "Contact Us"}
          </Link>
        </div>
      </section>

      <div className="mt-8">
        <FutureDisclaimer lang={lang} regulatoryNote={feature.regulatoryNote} />
      </div>

      {feature.concepts && feature.concepts.length > 0 && (
        <section className="flash-section">
          <SectionHeader
            title={
              lang === "ar" ? "مفاهيم مستقبلية محتملة" : "Possible future concepts"
            }
            subtitle={
              lang === "ar"
                ? "للتخطيط فقط — ليست وعوداً بميزات فعّالة."
                : "For planning only — not promises of active features."
            }
          />
          <FutureFeatureGrid concepts={feature.concepts} lang={lang} />
        </section>
      )}

      <RequestCTA
        className="flash-section"
        lang={lang}
        title={
          lang === "ar"
            ? "هل تحتاج خدمة متاحة الآن؟"
            : "Need an available service now?"
        }
        description={
          lang === "ar"
            ? "استخدم مركز الطلبات أو تواصل عبر WhatsApp الرسمي."
            : "Use the Request Center or contact us via official WhatsApp."
        }
      />
    </div>
  );
}
