import type { LanguageCode } from "@/types/common";
import { executionTypesData } from "@/data/executionTypesData";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { getLocalized } from "@/lib/i18n";

interface ExecutionModelSectionProps {
  lang: LanguageCode;
}

export function ExecutionModelSection({ lang }: ExecutionModelSectionProps) {
  return (
    <section>
      <SectionHeader
        title={lang === "ar" ? "نماذج التنفيذ" : "Execution models"}
        subtitle={
          lang === "ar"
            ? "كيف قد تُقدَّم الخدمات — مباشرة أو عبر الشبكة."
            : "How services may be delivered — direct or through the network."
        }
      />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {executionTypesData.map((type) => (
          <article
            key={type.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h3 className="font-semibold text-flash-text">
              {getLocalized(type.label, lang)}
            </h3>
            <p className="mt-2 text-sm text-flash-muted">
              {getLocalized(type.description, lang)}
            </p>
            <p className="mt-3 text-xs font-medium text-flash-primary">
              {getLocalized(type.wordingHint, lang)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
