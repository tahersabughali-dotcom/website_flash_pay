import Link from "next/link";
import { settingsData } from "@/data/settingsData";
import { homepageData } from "@/data/homepageData";
import { uiLabelsData } from "@/data/pageContentData";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { getPublishedTrustItems } from "@/lib/dataAccess";
import { getActionArrow, getLocalized } from "@/lib/i18n";
import { OfficialChannelsBox } from "./OfficialChannelsBox";
import { TrustGrid } from "./TrustGrid";
import { DisclaimerSection } from "./DisclaimerSection";

export function TrustCenterPage() {
  const lang = settingsData.defaultLanguage;
  const trustItems = getPublishedTrustItems();
  const trustTitle = getLocalized(uiLabelsData.trustCenter, lang);

  return (
    <div className="flash-page-wrap">
      <PageHero
        eyebrow={trustTitle}
        title={trustTitle}
        subtitle={
          lang === "ar"
            ? "الأمان، الشفافية، القنوات الرسمية، وإخلاء المسؤولية."
            : "Safety, transparency, official channels, and disclaimers."
        }
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
        <div className="space-y-6">
          <SectionHeader
            title={lang === "ar" ? "إشعارات الثقة" : "Trust notices"}
            subtitle={
              lang === "ar"
                ? "اقرأ هذه الإشعارات قبل استخدام أي خدمة."
                : "Read these notices before using any service."
            }
          />
          <TrustGrid items={trustItems} lang={lang} />
          <DisclaimerSection lang={lang} />
        </div>

        <aside className="space-y-5">
          <OfficialChannelsBox compact />
          <div className="flash-card p-5 text-sm text-flash-muted">
            <p>{getLocalized(homepageData.footer.safetyNotice, lang)}</p>
            <Link
              href="/security"
              className="mt-4 inline-flex font-medium text-flash-primary hover:underline"
            >
              {lang === "ar"
                ? `إرشادات الأمان ${getActionArrow(lang)}`
                : `Security guidance ${getActionArrow(lang)}`}
            </Link>
            <Link
              href="/request"
              className="mt-3 inline-flex font-medium text-flash-primary hover:underline"
            >
              {lang === "ar"
                ? `تواصل عبر مركز الطلبات ${getActionArrow(lang)}`
                : `Contact via Request Center ${getActionArrow(lang)}`}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
