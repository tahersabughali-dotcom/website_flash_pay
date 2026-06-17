import Link from "next/link";
import { homepageData } from "@/data/homepageData";
import { settingsData } from "@/data/settingsData";
import { isFeatureEnabled } from "@/data/featureFlagsData";
import { DataGrid } from "@/components/shared/DataGrid";
import { EmptyState } from "@/components/shared/EmptyState";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { MarketAssetCard } from "@/components/markets/MarketAssetCard";
import { getHomeMarketPreview } from "@/lib/dataAccess";
import { getLocalized } from "@/lib/i18n";

export function HomeMarketsSection() {
  const lang = settingsData.defaultLanguage;
  const config = homepageData.sections.markets;
  const assets = getHomeMarketPreview(4);

  if (!isFeatureEnabled("showMarkets")) return null;

  return (
    <section className="flash-section">
      <SectionHeader
        title={getLocalized(config.title, lang)}
        subtitle={getLocalized(config.subtitle, lang)}
        action={
          <Link href={config.actionHref!} className="flash-link-action">
            {getLocalized(config.actionLabel!, lang)} →
          </Link>
        }
      />

      {assets.length > 0 ? (
        <DataGrid columns={4}>
          {assets.map((asset) => (
            <MarketAssetCard key={asset.id} asset={asset} lang={lang} />
          ))}
        </DataGrid>
      ) : (
        <EmptyState
          title={lang === "ar" ? "لا توجد أصول معروضة" : "No market assets listed"}
          description={
            lang === "ar"
              ? "أضف أصولاً في marketsData.ts — الأسعار إرشادية فقط."
              : "Add assets in marketsData.ts — prices are indicative only."
          }
        />
      )}
    </section>
  );
}
