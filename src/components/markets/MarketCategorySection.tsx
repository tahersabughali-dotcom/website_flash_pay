import type { LanguageCode } from "@/types/common";
import type { MarketCategory, MarketItem } from "@/types/market";
import { marketCategoriesData } from "@/data/marketCategoriesData";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { DataGrid } from "@/components/shared/DataGrid";
import { getLocalized } from "@/lib/i18n";
import { MarketAssetCard } from "./MarketAssetCard";

interface MarketCategorySectionProps {
  category: MarketCategory;
  assets: MarketItem[];
  lang: LanguageCode;
}

export function MarketCategorySection({
  category,
  assets,
  lang,
}: MarketCategorySectionProps) {
  if (assets.length === 0) return null;

  const categoryMeta = marketCategoriesData.find((item) => item.id === category);

  return (
    <section className="mt-10">
      <SectionHeader
        title={categoryMeta ? getLocalized(categoryMeta.label, lang) : category}
        subtitle={
          lang === "ar"
            ? `${assets.length} أصل — معلومات إرشادية`
            : `${assets.length} asset${assets.length === 1 ? "" : "s"} — indicative information`
        }
      />
      <DataGrid columns={3} className="mt-6">
        {assets.map((asset) => (
          <MarketAssetCard key={asset.id} asset={asset} lang={lang} />
        ))}
      </DataGrid>
    </section>
  );
}
