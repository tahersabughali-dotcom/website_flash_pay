import Link from "next/link";
import type { LanguageCode } from "@/types/common";
import type { ComingSoonFeature } from "@/data/comingSoonData";
import { getLocalized } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";

interface ComingSoonCardProps {
  feature: ComingSoonFeature;
  lang: LanguageCode;
  className?: string;
}

export function ComingSoonCard({ feature, lang, className }: ComingSoonCardProps) {
  return (
    <Link
      href={feature.route}
      className={cn(
        "flex h-full flex-col rounded-2xl border border-dashed border-slate-300 bg-slate-50/90 p-5 transition hover:border-flash-primary/50 hover:bg-white hover:shadow-sm",
        className,
      )}
    >
      <StatusBadge
        status="coming_soon"
        label={lang === "ar" ? "قريباً" : "Coming Soon"}
        className="self-start"
      />
      <h3 className="mt-3 font-semibold text-flash-text">
        {getLocalized(feature.title, lang)}
      </h3>
      <p className="mt-2 flex-1 text-sm text-flash-muted">
        {getLocalized(feature.description, lang)}
      </p>
    </Link>
  );
}
