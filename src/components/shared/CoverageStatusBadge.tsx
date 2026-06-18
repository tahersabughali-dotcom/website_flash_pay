import type { LanguageCode } from "@/types/common";
import type { GlobalCoverageStatus } from "@/types/globalCountry";
import { getLocalized } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LABELS: Record<GlobalCoverageStatus, { ar: string; en: string }> = {
  active: { ar: "متاح", en: "Active" },
  supported: { ar: "مدعوم", en: "Supported" },
  available_by_request: { ar: "حسب الطلب", en: "By request" },
  limited: { ar: "محدود", en: "Limited" },
  partner_network: { ar: "عبر شبكة الشركاء", en: "Partner network" },
  coming_soon: { ar: "قريبًا", en: "Coming soon" },
  not_available: { ar: "غير متاح حاليًا", en: "Not available" },
};

const TONE: Record<GlobalCoverageStatus, string> = {
  active: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  supported: "bg-blue-50 text-blue-800 ring-blue-200",
  available_by_request: "bg-amber-50 text-amber-900 ring-amber-200",
  limited: "bg-orange-50 text-orange-900 ring-orange-200",
  partner_network: "bg-indigo-50 text-indigo-900 ring-indigo-200",
  coming_soon: "bg-slate-100 text-slate-700 ring-slate-200",
  not_available: "bg-red-50 text-red-800 ring-red-200",
};

interface CoverageStatusBadgeProps {
  status: GlobalCoverageStatus;
  lang: LanguageCode;
  className?: string;
}

export function CoverageStatusBadge({ status, lang, className }: CoverageStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1",
        TONE[status],
        className,
      )}
    >
      {getLocalized(LABELS[status], lang)}
    </span>
  );
}

/** Alias for payment/receiving method cards */
export const AvailabilityBadge = CoverageStatusBadge;
