import Link from "next/link";
import type { LanguageCode } from "@/types/common";
import type { GlobalCurrency } from "@/types/currency";
import { IconImage } from "@/components/shared/IconImage";
import { LtrText } from "@/components/shared/LtrText";
import { CoverageStatusBadge } from "@/components/shared/CoverageStatusBadge";
import { getLocalized } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface CurrencyCardProps {
  currency: GlobalCurrency;
  lang: LanguageCode;
  compact?: boolean;
  featured?: boolean;
}

const TYPE_LABELS: Record<
  GlobalCurrency["type"],
  { ar: string; en: string }
> = {
  fiat: { ar: "FIAT", en: "Fiat" },
  crypto: { ar: "Crypto", en: "Crypto" },
  stablecoin: { ar: "Stablecoin", en: "Stablecoin" },
  metal: { ar: "Metal", en: "Metal" },
  internal_reference: { ar: "مرجعي", en: "Reference" },
};

export function CurrencyCard({ currency, lang, compact, featured }: CurrencyCardProps) {
  const isDigital = currency.type === "crypto" || currency.type === "stablecoin";
  const iconSize = compact ? 28 : 32;

  return (
    <article
      className={cn(
        "flash-card flex h-full flex-col",
        featured && "flash-featured-card ring-1 ring-flash-primary/10",
        compact ? "p-3" : "p-4",
      )}
    >
      <div className="flex items-start gap-3">
        <IconImage src={currency.iconImage} alt={currency.code} size={iconSize} framed />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <LtrText className="text-base font-bold tracking-wide text-flash-text">
              {currency.code}
            </LtrText>
            <CoverageStatusBadge status={currency.status} lang={lang} />
            {isDigital && (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 ring-1 ring-slate-200">
                {getLocalized(TYPE_LABELS[currency.type], lang)}
              </span>
            )}
          </div>
          <p className={cn("mt-1 text-flash-muted", compact ? "text-xs" : "text-sm")}>
            {getLocalized(currency.name, lang)}
          </p>
          {!compact && (
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-flash-muted">
              {getLocalized(currency.notes, lang)}
            </p>
          )}
          {isDigital && !compact && (
            <p className="mt-2 text-[11px] leading-relaxed text-amber-900/80">
              {lang === "ar"
                ? "أصل رقمي — ليس توصية استثمارية."
                : "Digital asset — not an investment recommendation."}
            </p>
          )}
        </div>
      </div>
      <div className="mt-auto pt-3">
        <Link href="/request" className="flash-btn-secondary min-h-9 px-3 py-2 text-xs">
          {lang === "ar" ? "اطلب السعر" : "Request rate"}
        </Link>
      </div>
    </article>
  );
}
