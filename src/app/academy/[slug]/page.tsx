import type { Metadata } from "next";
import { ArticleDetailPage } from "@/components/academy/ArticleDetailPage";
import { NotFoundState } from "@/components/shared/NotFoundState";
import { settingsData } from "@/data/settingsData";
import { getArticleBySlug, getPublishedArticleBySlug } from "@/lib/dataAccess";
import { buildArticleMetadata, buildPageMetadata } from "@/lib/seo";

interface AcademyArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: AcademyArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getPublishedArticleBySlug(slug);

  if (!article) {
    return buildPageMetadata(settingsData, {
      title: { ar: "المقال غير موجود", en: "Article not found" },
      description: settingsData.seoDefaults.description,
      path: `/academy/${slug}`,
    });
  }

  return buildArticleMetadata(article, settingsData);
}

export default async function AcademyArticleRoutePage({ params }: AcademyArticlePageProps) {
  const { slug } = await params;
  const lang = settingsData.defaultLanguage;
  const article = getArticleBySlug(slug);

  if (!article || article.status !== "published") {
    return (
      <div className="px-4 py-16">
        <NotFoundState
          title={lang === "ar" ? "المقال غير موجود" : "Article not found"}
          description={
            lang === "ar"
              ? "قد يكون هذا المقال مسودة أو مخفياً أو غير متاح."
              : "This article may be a draft, hidden, or unavailable."
          }
          backHref="/academy"
          backLabel={lang === "ar" ? "العودة إلى Academy" : "Back to Academy"}
        />
      </div>
    );
  }

  return <ArticleDetailPage article={article} lang={lang} />;
}
