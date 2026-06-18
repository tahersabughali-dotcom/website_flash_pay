import Link from "next/link";
import { homepageData } from "@/data/homepageData";
import { settingsData } from "@/data/settingsData";
import { isFeatureEnabled } from "@/data/featureFlagsData";
import { DataGrid } from "@/components/shared/DataGrid";
import { EmptyState } from "@/components/shared/EmptyState";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { TrustNotice } from "@/components/shared/TrustNotice";
import { getPublishedTrustItems } from "@/lib/dataAccess";
import { getLocalized, getActionArrow } from "@/lib/i18n";

export function HomeTrustSection() {
  const lang = settingsData.defaultLanguage;
  const config = homepageData.sections.trust;
  const trustItems = getPublishedTrustItems(3);

  if (!isFeatureEnabled("showTrustCenter")) return null;

  return (
    <section className="flash-section">
      <SectionHeader
        title={getLocalized(config.title, lang)}
        subtitle={getLocalized(config.subtitle, lang)}
        action={
          <Link href={config.actionHref!} className="flash-link-action">
            {getLocalized(config.actionLabel!, lang)} {getActionArrow(lang)}
          </Link>
        }
      />

      {trustItems.length > 0 ? (
        <DataGrid columns={1}>
          {trustItems.map((item) => (
            <TrustNotice key={item.id} item={item} lang={lang} />
          ))}
        </DataGrid>
      ) : (
        <EmptyState
          title={lang === "ar" ? "لا توجد إشعارات ثقة" : "No trust notices"}
          description={
            lang === "ar"
              ? "أضف محتوى في trustData.ts"
              : "Add content in trustData.ts"
          }
        />
      )}
    </section>
  );
}
