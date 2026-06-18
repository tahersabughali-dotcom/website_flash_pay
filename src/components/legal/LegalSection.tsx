import type { LanguageCode } from "@/types/common";
import type { LegalSection as LegalSectionType } from "@/types/legal";
import { getLocalized } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface LegalSectionProps {
  section: LegalSectionType;
  lang: LanguageCode;
}

export function LegalSection({ section, lang }: LegalSectionProps) {
  const heading = getLocalized(section.heading, lang);

  return (
    <section
      className={cn(
        "rounded-2xl border bg-white p-5 shadow-sm sm:p-6",
        section.isWarning
          ? "border-amber-200 bg-gradient-to-br from-amber-50/80 to-white"
          : "border-slate-200",
      )}
    >
      <h2 className="text-lg font-bold text-flash-text sm:text-xl">{heading}</h2>
      <div className="mt-3 space-y-3">
        {section.paragraphs.map((paragraph, index) => (
          <p
            key={`${heading}-${index}`}
            className="text-sm leading-relaxed text-flash-muted sm:text-base"
          >
            {getLocalized(paragraph, lang)}
          </p>
        ))}
      </div>
    </section>
  );
}
