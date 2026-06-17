"use client";

import type { LanguageCode } from "@/types/common";
import type { ServiceCategory } from "@/types/service";
import { uiLabelsData } from "@/data/pageContentData";
import { FilterTabs } from "@/components/shared/FilterTabs";
import { FormField } from "@/components/shared/FormField";
import { SearchInput } from "@/components/shared/FormInputs";
import { getLocalized } from "@/lib/i18n";

interface ServicesFilterProps {
  categories: { id: ServiceCategory | "all"; label: string }[];
  category: ServiceCategory | "all";
  onCategoryChange: (value: ServiceCategory | "all") => void;
  search: string;
  onSearchChange: (value: string) => void;
  lang: LanguageCode;
}

export function ServicesFilter({
  categories,
  category,
  onCategoryChange,
  search,
  onSearchChange,
  lang,
}: ServicesFilterProps) {
  return (
    <div className="flash-card space-y-5 p-5">
      <FormField
        label={getLocalized(uiLabelsData.search, lang)}
        htmlFor="services-search"
      >
        <SearchInput
          id="services-search"
          value={search}
          onValueChange={onSearchChange}
          placeholder={getLocalized(uiLabelsData.searchServices, lang)}
        />
      </FormField>

      <div>
        <p className="mb-3 text-sm font-medium text-flash-text">
          {getLocalized(uiLabelsData.category, lang)}
        </p>
        <FilterTabs
          items={categories}
          value={category}
          onChange={onCategoryChange}
          scrollable
        />
      </div>
    </div>
  );
}
