import type { LanguageCode } from "@/types/common";
import type { BusinessOffering } from "@/data/businessData";
import { getLocalized } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface BusinessOfferCardProps {
  offering: BusinessOffering;
  lang: LanguageCode;
  className?: string;
}

export function BusinessOfferCard({ offering, lang, className }: BusinessOfferCardProps) {
  return (
    <article
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm",
        className,
      )}
    >
      <h3 className="font-semibold text-flash-text">
        {getLocalized(offering.title, lang)}
      </h3>
      <p className="mt-2 text-sm text-flash-muted">
        {getLocalized(offering.description, lang)}
      </p>
    </article>
  );
}
