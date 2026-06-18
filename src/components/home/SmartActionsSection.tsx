import Link from "next/link";
import { homepageData } from "@/data/homepageData";
import { settingsData } from "@/data/settingsData";
import { isFeatureEnabled } from "@/data/featureFlagsData";
import { DataGrid } from "@/components/shared/DataGrid";
import { EmptyState } from "@/components/shared/EmptyState";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { getHomeRequestTypes } from "@/lib/dataAccess";
import { getLocalized, getActionArrow } from "@/lib/i18n";

export function SmartActionsSection() {
  const lang = settingsData.defaultLanguage;
  const config = homepageData.sections.smartActions;
  const requestTypes = getHomeRequestTypes(8);

  if (!isFeatureEnabled("showSmartRequestCenter")) return null;

  return (
    <section className="flash-section">
      <SectionHeader
        title={getLocalized(config.title, lang)}
        subtitle={getLocalized(config.subtitle, lang)}
        action={
          config.actionHref && config.actionLabel ? (
            <Link href={config.actionHref} className="flash-link-action">
              {getLocalized(config.actionLabel, lang)} {getActionArrow(lang)}
            </Link>
          ) : undefined
        }
      />

      {requestTypes.length > 0 ? (
        <DataGrid columns={4}>
          {requestTypes.map((item) => (
            <FeatureCard
              key={item.id}
              title={item.title}
              description={item.description}
              lang={lang}
              href={`/request?type=${item.slug}`}
              icon={item.icon}
            />
          ))}
        </DataGrid>
      ) : (
        <EmptyState
          title={lang === "ar" ? "لا توجد إجراءات متاحة" : "No actions available"}
          description={
            lang === "ar"
              ? "ستظهر الإجراءات عند إضافتها في البيانات."
              : "Actions will appear when added to the data."
          }
        />
      )}
    </section>
  );
}
