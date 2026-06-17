import type { TrustDocument } from "@/data/trustData";
import type { LanguageCode } from "@/types/common";
import { TrustNotice } from "@/components/shared/TrustNotice";
import { DataGrid } from "@/components/shared/DataGrid";

interface TrustGridProps {
  items: TrustDocument[];
  lang: LanguageCode;
}

export function TrustGrid({ items, lang }: TrustGridProps) {
  return (
    <DataGrid columns={1}>
      {items.map((item) => (
        <TrustNotice key={item.id} item={item} lang={lang} />
      ))}
    </DataGrid>
  );
}
