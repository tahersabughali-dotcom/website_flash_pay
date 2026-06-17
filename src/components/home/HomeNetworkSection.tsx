import Link from "next/link";
import { homepageData } from "@/data/homepageData";
import { settingsData } from "@/data/settingsData";
import { isFeatureEnabled } from "@/data/featureFlagsData";
import { DataGrid } from "@/components/shared/DataGrid";
import { EmptyState } from "@/components/shared/EmptyState";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { getPartnerNetworkPreview } from "@/lib/dataAccess";
import { getLocalized } from "@/lib/i18n";

export function HomeNetworkSection() {
  const lang = settingsData.defaultLanguage;
  const config = homepageData.sections.network;
  const partners = getPartnerNetworkPreview(4);

  if (!isFeatureEnabled("showPartnerNetwork")) return null;

  return (
    <section className="flash-section">
      <SectionHeader
        title={getLocalized(config.title, lang)}
        subtitle={getLocalized(config.subtitle, lang)}
        action={
          <div className="flex flex-wrap gap-3">
            <Link href={config.actionHref!} className="flash-link-action">
              {getLocalized(config.actionLabel!, lang)} →
            </Link>
            {config.secondaryActionHref && config.secondaryActionLabel && (
              <Link href={config.secondaryActionHref} className="flash-link-action">
                {getLocalized(config.secondaryActionLabel, lang)} →
              </Link>
            )}
          </div>
        }
      />

      {partners.length > 0 ? (
        <DataGrid columns={2}>
          {partners.map((partner) => (
            <FeatureCard
              key={partner.id}
              title={partner.title}
              description={partner.description}
              lang={lang}
              href="/network"
            />
          ))}
        </DataGrid>
      ) : (
        <EmptyState
          title={lang === "ar" ? "لا توجد فئات شركاء" : "No partner categories"}
          description={
            lang === "ar"
              ? "أضف شركاء في partnerNetworkData.ts"
              : "Add partners in partnerNetworkData.ts"
          }
        />
      )}
    </section>
  );
}
