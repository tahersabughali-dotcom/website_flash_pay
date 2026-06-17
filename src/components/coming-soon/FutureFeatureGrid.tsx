import type { LanguageCode } from "@/types/common";
import type { ComingSoonConcept } from "@/data/comingSoonData";
import { DataGrid } from "@/components/shared/DataGrid";
import { getLocalized } from "@/lib/i18n";

interface FutureFeatureGridProps {
  concepts: ComingSoonConcept[];
  lang: LanguageCode;
}

export function FutureFeatureGrid({ concepts, lang }: FutureFeatureGridProps) {
  if (concepts.length === 0) return null;

  return (
    <DataGrid columns={3}>
      {concepts.map((concept) => (
        <article
          key={concept.id}
          className="flash-card border-dashed border-slate-300 bg-slate-50/80 p-5"
        >
          <h3 className="font-semibold text-flash-text">
            {getLocalized(concept.title, lang)}
          </h3>
          <p className="mt-2 text-sm text-flash-muted">
            {getLocalized(concept.description, lang)}
          </p>
        </article>
      ))}
    </DataGrid>
  );
}
