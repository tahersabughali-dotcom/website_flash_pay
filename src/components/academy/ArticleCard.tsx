import Link from "next/link";
import type { LanguageCode } from "@/types/common";
import type { Article } from "@/types/article";
import { formatDate } from "@/lib/formatters";
import { getLocalized } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  lang: LanguageCode;
  className?: string;
}

export function ArticleCard({ article, lang, className }: ArticleCardProps) {
  return (
    <Link
      href={`/academy/${article.slug}`}
      className={cn(
        "group flex h-full flex-col flash-card-interactive p-5",
        className,
      )}
    >
      {article.isFeatured && (
        <span className="mb-3 inline-flex w-fit rounded-full bg-flash-primary-light px-2.5 py-0.5 text-xs font-medium text-flash-primary">
          {lang === "ar" ? "مميز" : "Featured"}
        </span>
      )}
      <p className="text-xs text-flash-muted">
        {article.author} · {formatDate(article.publishedAt, lang)}
      </p>
      <h3 className="mt-2 font-semibold text-flash-text group-hover:text-flash-primary">
        {getLocalized(article.title, lang)}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm text-flash-muted">
        {getLocalized(article.excerpt, lang)}
      </p>
    </Link>
  );
}
