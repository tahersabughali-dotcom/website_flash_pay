import Link from "next/link";
import type { LegalPageContent } from "@/types/legal";
import { settingsData } from "@/data/settingsData";
import { getActionArrow, getLocalized, getTextDirection } from "@/lib/i18n";
import { PageHero } from "@/components/shared/PageHero";
import { LegalSection } from "./LegalSection";

interface LegalPageProps {
  content: LegalPageContent;
}

export function LegalPage({ content }: LegalPageProps) {
  const lang = settingsData.defaultLanguage;
  const dir = getTextDirection(lang);
  const title = getLocalized(content.title, lang);
  const subtitle = getLocalized(content.subtitle, lang);

  const formattedDate = new Intl.DateTimeFormat(lang === "ar" ? "ar" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(content.lastUpdated));

  return (
    <div dir={dir} className="flash-page-wrap">
      <PageHero eyebrow="Flash Pay" title={title} subtitle={subtitle} />

      <p className="mt-6 text-sm text-flash-muted">
        {lang === "ar" ? "آخر تحديث:" : "Last updated:"}{" "}
        <time dateTime={content.lastUpdated}>{formattedDate}</time>
      </p>

      <div className="mt-8 space-y-5">
        {content.sections.map((section) => (
          <LegalSection key={getLocalized(section.heading, lang)} section={section} lang={lang} />
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-flash-primary/20 bg-gradient-to-br from-flash-primary-light/50 to-white p-5 sm:p-6">
        <h2 className="text-base font-bold text-flash-text">
          {lang === "ar" ? "هل تحتاج مساعدة؟" : "Need help?"}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-flash-muted">
          {lang === "ar"
            ? "للاستفسارات العامة أو التحقق من القنوات الرسمية، استخدم صفحات التواصل ومركز الثقة."
            : "For general inquiries or to verify official channels, use the contact and Trust Center pages."}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/contact" className="flash-btn-primary text-sm">
            {lang === "ar" ? "تواصل معنا" : "Contact us"}
          </Link>
          <Link
            href="/trust"
            className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-flash-primary transition hover:border-flash-primary/30"
          >
            {lang === "ar"
              ? `مركز الثقة ${getActionArrow(lang)}`
              : `Trust Center ${getActionArrow(lang)}`}
          </Link>
        </div>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-flash-muted">
        {lang === "ar"
          ? "هذه الصفحة لأغراض توضيحية ولا تشكل استشارة قانونية أو مالية."
          : "This page is for clarification purposes and does not constitute legal or financial advice."}
      </p>
    </div>
  );
}
