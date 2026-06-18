import type { LanguageCode } from "@/types/common";
import type { MarketItem } from "@/types/market";
import { marketCardLabels, marketPriceModeLabels, uiLabelsData } from "@/data/pageContentData";
import { settingsData } from "@/data/settingsData";
import { LtrText } from "@/components/shared/LtrText";
import { formatDate, formatNumber, formatPercent } from "@/lib/formatters";
import { getLocalized } from "@/lib/i18n";
import { formatCurrencyPairLine } from "@/lib/currencySymbols";
import { buildWhatsAppUrlFromSettings, formatMarketPriceInquiryMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface MarketAssetCardProps {
  asset: MarketItem;
  lang: LanguageCode;
  className?: string;
}

const priceModeLabels = marketPriceModeLabels;

export function MarketAssetCard({ asset, lang, className }: MarketAssetCardProps) {
  const whatsappMessage = formatMarketPriceInquiryMessage(asset.symbol, [
    { label: "Request", value: "Price inquiry" },
  ]);
  const whatsappUrl = buildWhatsAppUrlFromSettings(settingsData.whatsappNumber, whatsappMessage);

  const hasPrice = asset.price !== null;
  const changePositive = (asset.change ?? 0) > 0;
  const changeNegative = (asset.change ?? 0) < 0;

  return (
    <article className={cn("flex h-full flex-col flash-card p-4 sm:p-5", className)}>
      <span className="self-start rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold text-amber-900 ring-1 ring-amber-100">
        {getLocalized(uiLabelsData.indicativeOnly, lang)}
      </span>

      <LtrText className="mt-4 block text-xl font-extrabold tracking-tight text-flash-text sm:text-2xl">
        {formatCurrencyPairLine(asset.symbol)}
      </LtrText>

      <p className="mt-1.5 text-sm font-medium text-flash-muted">
        {getLocalized(asset.name, lang)}
      </p>

      <div className="mt-4 flex-1">
        {hasPrice ? (
          <div className="rounded-xl bg-slate-50 px-3 py-3">
            <LtrText className="text-2xl font-bold text-flash-text">
              {formatNumber(asset.price as number, lang)}
            </LtrText>
            {asset.change !== null && asset.changePercent !== null && (
              <LtrText
                className={cn(
                  "mt-1 text-sm font-medium",
                  changePositive && "text-emerald-600",
                  changeNegative && "text-red-600",
                  !changePositive && !changeNegative && "text-flash-muted",
                )}
              >
                {formatNumber(asset.change, lang)} ({formatPercent(asset.changePercent, lang)})
              </LtrText>
            )}
          </div>
        ) : (
          <p className="rounded-xl bg-flash-primary-light/50 px-3 py-3 text-sm font-semibold leading-snug text-flash-primary">
            {getLocalized(marketCardLabels.requestPriceViaWhatsApp, lang)}
          </p>
        )}
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-flash-muted">
        {lang === "ar" ? "آخر تحديث:" : "Last updated:"}{" "}
        <LtrText className="font-medium text-flash-text">{formatDate(asset.updatedAt, lang)}</LtrText>
        <span className="mx-1.5 text-slate-300">·</span>
        {lang === "ar" ? "الوضع:" : "Mode:"}{" "}
        <span className="font-medium text-flash-text">
          {priceModeLabels[asset.priceMode][lang]}
        </span>
      </p>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flash-btn-secondary mt-4 !w-full !py-2.5 !text-xs"
      >
        {getLocalized(marketCardLabels.requestExecutionPrice, lang)}
      </a>
    </article>
  );
}
