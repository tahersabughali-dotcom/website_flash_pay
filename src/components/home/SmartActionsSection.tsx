import Link from "next/link";
import { homepageData } from "@/data/homepageData";
import { settingsData } from "@/data/settingsData";
import { isFeatureEnabled } from "@/data/featureFlagsData";
import { DataGrid } from "@/components/shared/DataGrid";
import { EmptyState } from "@/components/shared/EmptyState";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { getHomeQuickActions } from "@/lib/dataAccess";
import { getLocalized, getActionArrow } from "@/lib/i18n";
import { HomeQuickActionCard } from "./HomeQuickActionCard";

const POPULAR_SLUGS = new Set(["buy-usdt", "sell-usdt", "pay-supplier"]);
const PRIMARY_SLUGS = new Set(["send-money", "receive-money", "buy-usdt", "sell-usdt"]);

export function SmartActionsSection() {
  const lang = settingsData.defaultLanguage;
  const config = homepageData.sections.smartActions;
  const requestTypes = getHomeQuickActions();
  const primaryActions = requestTypes.filter((item) => PRIMARY_SLUGS.has(item.slug));
  const otherActions = requestTypes.filter((item) => !PRIMARY_SLUGS.has(item.slug));

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
        <div className="space-y-4">
          <DataGrid columns={4}>
            {primaryActions.map((item) => (
              <HomeQuickActionCard
                key={item.id}
                title={item.title}
                description={item.description}
                lang={lang}
                href={`/request?type=${item.slug}`}
                icon={item.icon}
                primary
                popular={POPULAR_SLUGS.has(item.slug)}
              />
            ))}
          </DataGrid>

          <DataGrid columns={4}>
            {otherActions.map((item) => (
              <HomeQuickActionCard
                key={item.id}
                title={item.title}
                description={item.description}
                lang={lang}
                href={`/request?type=${item.slug}`}
                icon={item.icon}
                popular={POPULAR_SLUGS.has(item.slug)}
              />
            ))}
            <HomeQuickActionCard
              title={{ ar: "تحويل مصر ⇄ تركيا", en: "Egypt ⇄ Turkey Transfer" }}
              description={{
                ar: "مسار شائع — اختر التفاصيل ثم أكّد عبر WhatsApp.",
                en: "Popular corridor — choose details then confirm via WhatsApp.",
              }}
              lang={lang}
              href="/route-finder?from=egypt&to=turkey"
              icon="route"
              popular
            />
          </DataGrid>
        </div>
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
