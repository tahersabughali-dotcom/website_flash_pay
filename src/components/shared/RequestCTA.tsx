import Link from "next/link";
import type { LanguageCode } from "@/types/common";
import { uiLabelsData } from "@/data/pageContentData";
import { getLocalized } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface RequestCTAProps {
  lang: LanguageCode;
  title: string;
  description: string;
  className?: string;
}

export function RequestCTA({ lang, title, description, className }: RequestCTAProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div>
        <h3 className="font-semibold text-flash-text">{title}</h3>
        <p className="mt-1 text-sm text-flash-muted">{description}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link href="/request" className="flash-btn-primary">
          {getLocalized(uiLabelsData.startRequest, lang)}
        </Link>
        <Link href="/partners" className="flash-btn-secondary">
          {lang === "ar" ? "كن شريكًا" : "Become a Partner"}
        </Link>
      </div>
    </div>
  );
}
