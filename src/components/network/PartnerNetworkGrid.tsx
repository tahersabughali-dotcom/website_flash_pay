import type { LanguageCode } from "@/types/common";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { DataGrid } from "@/components/shared/DataGrid";
import { getPartnerNetworkPreview } from "@/lib/dataAccess";
import { PartnerCategoryCard } from "@/components/partners/PartnerCategoryCard";

interface PartnerNetworkGridProps {
  lang: LanguageCode;
}

export function PartnerNetworkGrid({ lang }: PartnerNetworkGridProps) {
  const entries = getPartnerNetworkPreview();

  return (
    <section>
      <SectionHeader
        title={lang === "ar" ? "فئات شبكة الشركاء" : "Partner network categories"}
      />
      <DataGrid columns={2} className="mt-6">
        {entries.map((entry) => (
          <PartnerCategoryCard key={entry.id} entry={entry} lang={lang} />
        ))}
      </DataGrid>
    </section>
  );
}
