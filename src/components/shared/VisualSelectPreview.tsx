"use client";

import type { LanguageCode } from "@/types/common";
import { FlagIcon } from "@/components/shared/FlagIcon";
import { IconImage } from "@/components/shared/IconImage";
import { LtrText } from "@/components/shared/LtrText";
import { CoverageStatusBadge } from "@/components/shared/CoverageStatusBadge";
import { getCurrencyIconPath, getPaymentIconPath, getReceivingIconPath } from "@/lib/icons";
import { getOperationalIso2 } from "@/lib/countries";
import { getCountryBySlug, resolveCountryLabel, resolvePaymentMethodLabel, resolveReceivingMethodLabel } from "@/lib/dataAccess";
import { getGlobalCurrencyByCode } from "@/lib/currencies";
import { getLocalized } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface VisualSelectPreviewProps {
  fieldName: string;
  value: string;
  lang: LanguageCode;
  className?: string;
}

const previewShell =
  "mt-1.5 flex min-w-0 items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/90 px-2.5 py-1.5 sm:mt-2 sm:gap-2.5 sm:px-3 sm:py-2";

export function VisualSelectPreview({ fieldName, value, lang, className }: VisualSelectPreviewProps) {
  if (!value) return null;

  const isCountryField =
    fieldName === "fromCountry" || fieldName === "toCountry" || fieldName === "country";

  if (isCountryField) {
    const country = getCountryBySlug(value);
    return (
      <div className={cn(previewShell, className)}>
        <FlagIcon
          iso2={getOperationalIso2(value)}
          flagEmoji={country?.flag ?? "🌍"}
          alt={resolveCountryLabel(value, lang)}
          size="sm"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-flash-text">
            {resolveCountryLabel(value, lang)}
          </p>
        </div>
        {country?.status === "active" && (
          <CoverageStatusBadge status="active" lang={lang} className="shrink-0" />
        )}
      </div>
    );
  }

  if (fieldName === "currency") {
    const currency = getGlobalCurrencyByCode(value);
    const label = currency ? getLocalized(currency.name, lang) : value;

    return (
      <div className={cn(previewShell, className)}>
        <IconImage src={getCurrencyIconPath(value)} alt={value} size={22} framed />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <LtrText className="text-sm font-semibold text-flash-text">{value}</LtrText>
            <span className="truncate text-xs text-flash-muted">{label}</span>
          </div>
        </div>
      </div>
    );
  }

  if (fieldName === "paymentMethod") {
    return (
      <div className={cn(previewShell, className)}>
        <IconImage src={getPaymentIconPath(value)} alt={value} size={22} framed />
        <span className="truncate text-sm text-flash-text">
          {resolvePaymentMethodLabel(value, lang)}
        </span>
      </div>
    );
  }

  if (fieldName === "receivingMethod") {
    return (
      <div className={cn(previewShell, className)}>
        <IconImage src={getReceivingIconPath(value)} alt={value} size={22} framed />
        <span className="truncate text-sm text-flash-text">
          {resolveReceivingMethodLabel(value, lang)}
        </span>
      </div>
    );
  }

  return null;
}
