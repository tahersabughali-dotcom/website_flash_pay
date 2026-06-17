import Link from "next/link";
import { homepageData } from "@/data/homepageData";
import { settingsData } from "@/data/settingsData";
import { isFeatureEnabled } from "@/data/featureFlagsData";
import { DataGrid } from "@/components/shared/DataGrid";
import { EmptyState } from "@/components/shared/EmptyState";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { BusinessOfferCard } from "@/components/business/BusinessOfferCard";
import { getActiveBusinessOfferings } from "@/lib/dataAccess";
import { getLocalized } from "@/lib/i18n";

export function HomeBusinessSection() {
  const lang = settingsData.defaultLanguage;
  const config = homepageData.sections.business;
  const offerings = getActiveBusinessOfferings(4);

  if (!isFeatureEnabled("showBusiness")) return null;

  return (
    <section className="flash-section">
      <div className="rounded-3xl border border-flash-primary/15 bg-gradient-to-br from-flash-primary-light/60 to-white p-6 sm:p-8">
        <SectionHeader
          title={getLocalized(config.title, lang)}
          subtitle={getLocalized(config.subtitle, lang)}
          action={
            <Link href={config.actionHref!} className="flash-link-action">
              {getLocalized(config.actionLabel!, lang)} →
            </Link>
          }
        />

        {offerings.length > 0 ? (
          <DataGrid columns={2}>
            {offerings.map((offering) => (
              <BusinessOfferCard key={offering.id} offering={offering} lang={lang} />
            ))}
          </DataGrid>
        ) : (
          <EmptyState
            title={lang === "ar" ? "لا توجد عروض Business" : "No business offerings"}
            description={
              lang === "ar"
                ? "أضف عروضاً في businessData.ts"
                : "Add offerings in businessData.ts"
            }
          />
        )}
      </div>
    </section>
  );
}
