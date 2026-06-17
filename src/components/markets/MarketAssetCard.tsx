import type { LanguageCode } from "@/types/common";
import type { MarketItem } from "@/types/market";
import { marketPriceModeLabels, uiLabelsData } from "@/data/pageContentData";
import { settingsData } from "@/data/settingsData";
import { formatDate, formatNumber, formatPercent } from "@/lib/formatters";
import { getLocalized } from "@/lib/i18n";
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
    <article
      className={cn(
        "flex h-full flex-col flash-card p-5",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-flash-muted">
            {asset.symbol}
          </p>
          <h3 className="mt-1 font-semibold text-flash-text">
            {getLocalized(asset.name, lang)}
          </h3>
        </div>
        <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
          {getLocalized(uiLabelsData.indicativeOnly, lang)}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-2xl font-bold text-flash-text">
          {hasPrice ? formatNumber(asset.price as number, lang) : "—"}
        </p>
        {!hasPrice && (
          <p className="text-xs text-flash-muted">
            {lang === "ar" ? "اطلب سعراً حياً عبر WhatsApp" : "Request live price via WhatsApp"}
          </p>
        )}
        {hasPrice && asset.change !== null && asset.changePercent !== null && (
          <p
            className={cn(
              "text-sm font-medium",
              changePositive && "text-emerald-600",
              changeNegative && "text-red-600",
              !changePositive && !changeNegative && "text-flash-muted",
            )}
          >
            {formatNumber(asset.change, lang)} ({formatPercent(asset.changePercent, lang)})
          </p>
        )}
      </div>

      <dl className="mt-4 space-y-2 text-xs text-flash-muted">
        <div className="flex justify-between gap-2">
          <dt>{lang === "ar" ? "المصدر" : "Source"}</dt>
          <dd className="text-right text-flash-text">{asset.source}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt>{lang === "ar" ? "آخر تحديث" : "Updated"}</dt>
          <dd className="text-right text-flash-text">{formatDate(asset.updatedAt, lang)}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt>{lang === "ar" ? "وضع السعر" : "Price mode"}</dt>
          <dd className="text-right font-medium text-amber-800">
            {priceModeLabels[asset.priceMode][lang]}
          </dd>
        </div>
        {asset.isLive === false && (
          <div className="rounded-lg bg-amber-50 px-2 py-1 text-amber-900">
            {lang === "ar" ? "ليس سعراً مباشراً أو لحظياً" : "Not a live or real-time price"}
          </div>
        )}
      </dl>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto pt-5 text-sm font-semibold text-flash-primary hover:underline"
      >
        {lang === "ar" ? "اطلب سعر تنفيذ عبر WhatsApp" : "Request execution price via WhatsApp"}
      </a>
    </article>
  );
}
