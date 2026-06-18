import type { LanguageCode } from "@/types/common";
import type { MarketItem } from "@/types/market";
import { marketCardLabels, marketPriceModeLabels, uiLabelsData } from "@/data/pageContentData";
import { settingsData } from "@/data/settingsData";
import { LtrText } from "@/components/shared/LtrText";
import { formatDate, formatNumber, formatPercent } from "@/lib/formatters";
import { getLocalized } from "@/lib/i18n";
import { resolveMarketSourceLabel } from "@/lib/dataAccess";
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
    { label: "Request", value: "Execution price inquiry" },
  ]);
  const whatsappUrl = buildWhatsAppUrlFromSettings(settingsData.whatsappNumber, whatsappMessage);

  const hasPrice = asset.price !== null;
  const changePositive = (asset.change ?? 0) > 0;
  const changeNegative = (asset.change ?? 0) < 0;

  return (
    <article className={cn("flex h-full flex-col flash-card p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <LtrText className="text-xs font-semibold tracking-wide text-flash-muted">
            {asset.symbol}
          </LtrText>
          <h3 className="mt-1 font-semibold text-flash-text">
            {getLocalized(asset.name, lang)}
          </h3>
        </div>
        <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
          {getLocalized(uiLabelsData.indicativeOnly, lang)}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <LtrText className="text-2xl font-bold text-flash-text">
          {hasPrice ? formatNumber(asset.price as number, lang) : "—"}
        </LtrText>
        {!hasPrice && (
          <p className="text-xs text-flash-muted">
            {getLocalized(marketCardLabels.requestPriceViaWhatsApp, lang)}
          </p>
        )}
        {hasPrice && asset.change !== null && asset.changePercent !== null && (
          <LtrText
            className={cn(
              "text-sm font-medium",
              changePositive && "text-emerald-600",
              changeNegative && "text-red-600",
              !changePositive && !changeNegative && "text-flash-muted",
            )}
          >
            {formatNumber(asset.change, lang)} ({formatPercent(asset.changePercent, lang)})
          </LtrText>
        )}
      </div>

      <dl className="mt-4 space-y-2 text-xs text-flash-muted">
        <div className="flex justify-between gap-2">
          <dt>{getLocalized(marketCardLabels.source, lang)}</dt>
          <dd className="font-medium text-flash-text">
            {resolveMarketSourceLabel(asset.source, lang)}
          </dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt>{getLocalized(marketCardLabels.lastUpdated, lang)}</dt>
          <dd>
            <LtrText className="font-medium text-flash-text">
              {formatDate(asset.updatedAt, lang)}
            </LtrText>
          </dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt>{getLocalized(marketCardLabels.priceMode, lang)}</dt>
          <dd className="font-medium text-amber-800">
            {priceModeLabels[asset.priceMode][lang]}
          </dd>
        </div>
        {asset.isLive === false && (
          <div className="rounded-lg bg-amber-50 px-2 py-1 text-amber-900">
            {getLocalized(marketCardLabels.notLivePrice, lang)}
          </div>
        )}
      </dl>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto pt-5 text-sm font-semibold text-flash-primary hover:underline"
      >
        {getLocalized(marketCardLabels.requestExecutionPrice, lang)}
      </a>
    </article>
  );
}
