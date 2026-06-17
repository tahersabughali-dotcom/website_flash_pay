import type { LanguageCode } from "@/types/common";
import type { PartnerNetworkEntry } from "@/types/partner";
import { getLocalized } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface PartnerCategoryCardProps {
  entry: PartnerNetworkEntry;
  lang: LanguageCode;
  className?: string;
}

export function PartnerCategoryCard({ entry, lang, className }: PartnerCategoryCardProps) {
  return (
    <article
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm",
        className,
      )}
    >
      <h3 className="font-semibold text-flash-text">
        {getLocalized(entry.title, lang)}
      </h3>
      <p className="mt-2 text-sm text-flash-muted">
        {getLocalized(entry.description, lang)}
      </p>
    </article>
  );
}
