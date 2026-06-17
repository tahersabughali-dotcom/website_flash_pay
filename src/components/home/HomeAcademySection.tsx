import Link from "next/link";
import { homepageData } from "@/data/homepageData";
import { settingsData } from "@/data/settingsData";
import { isFeatureEnabled } from "@/data/featureFlagsData";
import { DataGrid } from "@/components/shared/DataGrid";
import { EmptyState } from "@/components/shared/EmptyState";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ArticleCard } from "@/components/academy/ArticleCard";
import { getFeaturedArticles } from "@/lib/dataAccess";
import { getLocalized } from "@/lib/i18n";

export function HomeAcademySection() {
  const lang = settingsData.defaultLanguage;
  const config = homepageData.sections.academy;
  const articles = getFeaturedArticles(3);

  if (!isFeatureEnabled("showAcademy")) return null;

  return (
    <section className="flash-section">
      <SectionHeader
        title={getLocalized(config.title, lang)}
        subtitle={getLocalized(config.subtitle, lang)}
        action={
          <Link href={config.actionHref!} className="flash-link-action">
            {getLocalized(config.actionLabel!, lang)} →
          </Link>
        }
      />

      {articles.length > 0 ? (
        <DataGrid columns={3}>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} lang={lang} />
          ))}
        </DataGrid>
      ) : (
        <EmptyState
          title={lang === "ar" ? "محتوى Academy قادم قريباً" : "Academy content coming soon"}
          description={
            lang === "ar"
              ? "أضف مقالات منشورة في articlesData.ts"
              : "Add published articles in articlesData.ts"
          }
        />
      )}
    </section>
  );
}
