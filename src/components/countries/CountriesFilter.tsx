"use client";

import type { LanguageCode } from "@/types/common";
import { uiLabelsData } from "@/data/pageContentData";
import { FilterTabs } from "@/components/shared/FilterTabs";
import { FormField } from "@/components/shared/FormField";
import { SearchInput } from "@/components/shared/FormInputs";
import { getLocalized } from "@/lib/i18n";

interface CountriesFilterProps {
  regions: { id: string; label: string }[];
  region: string;
  onRegionChange: (value: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  lang: LanguageCode;
}

export function CountriesFilter({
  regions,
  region,
  onRegionChange,
  search,
  onSearchChange,
  lang,
}: CountriesFilterProps) {
  return (
    <div className="flash-card space-y-5 p-5">
      <FormField
        label={getLocalized(uiLabelsData.search, lang)}
        htmlFor="countries-search"
      >
        <SearchInput
          id="countries-search"
          value={search}
          onValueChange={onSearchChange}
          placeholder={
            lang === "ar"
              ? "ابحث بالدولة، العملة، أو الخدمة..."
              : "Search by country, currency, or service..."
          }
        />
      </FormField>

      <div>
        <p className="mb-3 text-sm font-medium text-flash-text">
          {lang === "ar" ? "المنطقة" : "Region"}
        </p>
        <FilterTabs
          items={regions}
          value={region}
          onChange={onRegionChange}
          scrollable
        />
      </div>
    </div>
  );
}
