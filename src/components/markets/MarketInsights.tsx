import Link from "next/link";
import type { LanguageCode } from "@/types/common";
import type { MarketInsightItem } from "@/lib/dataAccess";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { formatDate } from "@/lib/formatters";
import { getLocalized } from "@/lib/i18n";

interface MarketInsightsProps {
  items: MarketInsightItem[];
  lang: LanguageCode;
}

export function MarketInsights({ items, lang }: MarketInsightsProps) {
  if (items.length === 0) return null;

  return (
    <section className="mt-12">
      <SectionHeader
        title={lang === "ar" ? "Flash Pay Insights" : "Flash Pay Insights"}
        subtitle={
          lang === "ar"
            ? "تحليلات معلوماتية — ليست نصيحة استثمارية."
            : "Informational analysis — not investment advice."
        }
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-flash-primary hover:shadow-md"
          >
            <p className="text-xs text-flash-muted">
              {item.author} · {formatDate(item.publishedAt, lang)}
            </p>
            <h3 className="mt-2 font-semibold text-flash-text">
              {getLocalized(item.title, lang)}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-flash-muted">
              {getLocalized(item.excerpt, lang)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
