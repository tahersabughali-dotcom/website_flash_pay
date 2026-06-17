"use client";

import { useMemo, useState } from "react";
import { settingsData } from "@/data/settingsData";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { DataGrid } from "@/components/shared/DataGrid";
import { EmptyState } from "@/components/shared/EmptyState";
import { getPublishedArticles } from "@/lib/dataAccess";
import type { AcademyCategory } from "@/types/article";
import { ArticleCard } from "./ArticleCard";
import { ArticleFilter } from "./ArticleFilter";

export function AcademyPage() {
  const lang = settingsData.defaultLanguage;
  const [category, setCategory] = useState<AcademyCategory | "all">("all");
  const [search, setSearch] = useState("");

  const articles = useMemo(
    () => getPublishedArticles({ category, search, lang }),
    [category, search, lang],
  );

  return (
    <div className="flash-page-wrap">
      <PageHero
        eyebrow={lang === "ar" ? "Flash Academy" : "Flash Academy"}
        title={lang === "ar" ? "محتوى تعليمي موثوق" : "Trusted educational content"}
        subtitle={
          lang === "ar"
            ? "USDT، التحويلات، الأمان، وأساسيات التداول — لأغراض تعليمية فقط."
            : "USDT, transfers, safety, and trading basics — for educational purposes only."
        }
      />

      <section className="mt-10">
        <ArticleFilter
          category={category}
          onCategoryChange={setCategory}
          search={search}
          onSearchChange={setSearch}
          lang={lang}
        />
      </section>

      <section className="mt-8">
        <SectionHeader
          title={
            lang === "ar"
              ? `${articles.length} مقال`
              : `${articles.length} article${articles.length === 1 ? "" : "s"}`
          }
        />

        {articles.length > 0 ? (
          <DataGrid columns={3} className="mt-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} lang={lang} />
            ))}
          </DataGrid>
        ) : (
          <EmptyState
            title={lang === "ar" ? "المحتوى قادم قريباً" : "Academy content coming soon"}
            description={
              lang === "ar"
                ? "نعمل على إضافة مقالات تعليمية جديدة."
                : "We are preparing new educational articles."
            }
          />
        )}
      </section>
    </div>
  );
}
