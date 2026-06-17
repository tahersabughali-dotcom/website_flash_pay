import Link from "next/link";
import type { LanguageCode } from "@/types/common";
import type { Article } from "@/types/article";
import { formatDate } from "@/lib/formatters";
import { getLocalized } from "@/lib/i18n";
import { ArticleDisclaimer } from "./ArticleDisclaimer";

interface ArticleDetailPageProps {
  article: Article;
  lang: LanguageCode;
}

export function ArticleDetailPage({ article, lang }: ArticleDetailPageProps) {
  const showMarketDisclaimer = article.category === "market_analysis";

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <Link
        href="/academy"
        className="text-sm font-medium text-flash-primary hover:underline"
      >
        {lang === "ar" ? "← العودة إلى Academy" : "← Back to Academy"}
      </Link>

      <header className="mt-6">
        <p className="text-sm text-flash-muted">
          {article.author} · {formatDate(article.publishedAt, lang)}
        </p>
        <h1 className="mt-3 text-3xl font-bold text-flash-text sm:text-4xl">
          {getLocalized(article.title, lang)}
        </h1>
        <p className="mt-4 text-lg text-flash-muted">
          {getLocalized(article.excerpt, lang)}
        </p>
        {article.tags && article.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs text-flash-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {showMarketDisclaimer && (
        <div className="mt-8">
          <ArticleDisclaimer lang={lang} />
        </div>
      )}

      <div className="prose prose-slate mt-8 max-w-none whitespace-pre-line text-flash-text">
        {getLocalized(article.content, lang)}
      </div>
    </article>
  );
}
