"use client";

import type { LanguageCode } from "@/types/common";
import type { AcademyCategory } from "@/types/article";
import { academyCategoriesData } from "@/data/marketCategoriesData";
import { uiLabelsData } from "@/data/pageContentData";
import { FilterTabs } from "@/components/shared/FilterTabs";
import { SearchInput } from "@/components/shared/FormInputs";
import { getLocalized } from "@/lib/i18n";

interface ArticleFilterProps {
  category: AcademyCategory | "all";
  onCategoryChange: (category: AcademyCategory | "all") => void;
  search: string;
  onSearchChange: (search: string) => void;
  lang: LanguageCode;
}

export function ArticleFilter({
  category,
  onCategoryChange,
  search,
  onSearchChange,
  lang,
}: ArticleFilterProps) {
  const categories = academyCategoriesData.map((item) => ({
    id: item.id,
    label: getLocalized(item.label, lang),
  }));

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <FilterTabs
        items={categories}
        value={category}
        onChange={(id) => onCategoryChange(id as AcademyCategory | "all")}
        scrollable
      />
      <div className="relative w-full sm:max-w-xs">
        <SearchInput
          value={search}
          onValueChange={onSearchChange}
          placeholder={getLocalized(uiLabelsData.searchPlaceholder, lang)}
          aria-label={getLocalized(uiLabelsData.searchArticles, lang)}
        />
      </div>
    </div>
  );
}
