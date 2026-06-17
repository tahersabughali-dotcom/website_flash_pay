import { homepageData } from "@/data/homepageData";
import { settingsData } from "@/data/settingsData";
import { isFeatureEnabled } from "@/data/featureFlagsData";
import { DataGrid } from "@/components/shared/DataGrid";
import { EmptyState } from "@/components/shared/EmptyState";
import { ComingSoonCard } from "@/components/shared/ComingSoonCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { getComingSoonFeatures } from "@/lib/dataAccess";
import { getLocalized } from "@/lib/i18n";

export function HomeFutureSection() {
  const lang = settingsData.defaultLanguage;
  const config = homepageData.sections.future;
  const comingSoon = getComingSoonFeatures(5);

  if (!isFeatureEnabled("showComingSoon")) return null;

  return (
    <section className="flash-section">
      <SectionHeader
        title={getLocalized(config.title, lang)}
        subtitle={getLocalized(config.subtitle, lang)}
      />

      {comingSoon.length > 0 ? (
        <DataGrid columns={4}>
          {comingSoon.map((feature) => (
            <ComingSoonCard key={feature.id} feature={feature} lang={lang} />
          ))}
        </DataGrid>
      ) : (
        <EmptyState
          title={lang === "ar" ? "لا توجد ميزات قادمة" : "No upcoming features"}
          description={
            lang === "ar"
              ? "أضف ميزات في comingSoonData.ts"
              : "Add features in comingSoonData.ts"
          }
        />
      )}
    </section>
  );
}
