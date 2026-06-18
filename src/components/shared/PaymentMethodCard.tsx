import Link from "next/link";
import type { LanguageCode } from "@/types/common";
import type { GlobalCoverageStatus } from "@/types/globalCountry";
import { IconImage } from "@/components/shared/IconImage";
import { CoverageStatusBadge } from "@/components/shared/CoverageStatusBadge";
import { getLocalized } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface PaymentMethodCardProps {
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  iconImage: string;
  status: GlobalCoverageStatus;
  lang: LanguageCode;
  href?: string;
  ctaLabel?: string;
  requiresConfirmation?: boolean;
  className?: string;
  compact?: boolean;
}

export function PaymentMethodCard({
  title,
  description,
  iconImage,
  status,
  lang,
  href = "/request",
  ctaLabel,
  requiresConfirmation,
  className,
  compact,
}: PaymentMethodCardProps) {
  const label = ctaLabel ?? (lang === "ar" ? "ابدأ طلبًا" : "Start request");

  return (
    <article className={cn("flash-card flex h-full flex-col", compact ? "p-3" : "p-4", className)}>
      <div className="flex items-start gap-3">
        <IconImage
          src={iconImage}
          alt={getLocalized(title, lang)}
          size={compact ? 30 : 34}
          framed
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start gap-x-2 gap-y-1">
            <h3
              className={cn(
                "min-w-0 flex-1 font-semibold leading-snug text-flash-text",
                compact && "text-sm",
              )}
            >
              {getLocalized(title, lang)}
            </h3>
            <CoverageStatusBadge status={status} lang={lang} className="shrink-0" />
          </div>
          <p
            className={cn(
              "mt-2 leading-relaxed text-flash-muted",
              compact ? "line-clamp-2 text-xs" : "text-sm",
            )}
          >
            {getLocalized(description, lang)}
          </p>
          {requiresConfirmation && (
            <p className="mt-2 inline-flex rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-900 ring-1 ring-amber-200">
              {lang === "ar" ? "يتطلب التأكيد" : "Requires confirmation"}
            </p>
          )}
        </div>
      </div>
      <div className="mt-auto pt-3">
        <Link href={href} className="flash-btn-secondary min-h-9 px-3 py-2 text-xs">
          {label}
        </Link>
      </div>
    </article>
  );
}
