import type { LanguageCode } from "@/types/common";
import { getGlobalCurrencyByCode } from "@/lib/currencies";
import { getCurrencySymbol } from "@/lib/currencySymbols";
import { getLocalized } from "@/lib/i18n";
import { LtrText } from "./LtrText";
import { cn } from "@/lib/utils";

interface CurrencyBadgeProps {
  code: string;
  lang: LanguageCode;
  showName?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function CurrencyBadge({
  code,
  lang,
  showName = false,
  size = "md",
  className,
}: CurrencyBadgeProps) {
  const normalized = code.trim().toUpperCase();
  const currency = getGlobalCurrencyByCode(normalized);
  const symbol = getCurrencySymbol(normalized);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/80",
        size === "sm" ? "px-2 py-1" : "px-2.5 py-1.5",
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-lg bg-white font-bold text-flash-primary shadow-sm ring-1 ring-flash-primary/10",
          size === "sm" ? "h-7 w-7 text-sm" : "h-8 w-8 text-base",
        )}
        aria-hidden
      >
        <LtrText>{symbol}</LtrText>
      </span>
      <div className="min-w-0">
        <LtrText className="block text-xs font-bold text-flash-text">{normalized}</LtrText>
        {showName && currency && (
          <p className="truncate text-[10px] text-flash-muted">{getLocalized(currency.name, lang)}</p>
        )}
      </div>
    </div>
  );
}
