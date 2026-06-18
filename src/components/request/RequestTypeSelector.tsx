"use client";

import type { LanguageCode } from "@/types/common";
import type { RequestType } from "@/types/request";
import { getLocalized } from "@/lib/i18n";
import { getRequestTypeIconGlyph } from "@/lib/requestTypeIcons";
import { cn } from "@/lib/utils";
import { DataGrid } from "@/components/shared/DataGrid";

interface RequestTypeSelectorProps {
  requestTypes: RequestType[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
  lang: LanguageCode;
}

export function RequestTypeSelector({
  requestTypes,
  selectedSlug,
  onSelect,
  lang,
}: RequestTypeSelectorProps) {
  return (
    <DataGrid columns={3}>
      {requestTypes.map((type) => {
        const selected = selectedSlug === type.slug;
        return (
          <button
            key={type.id}
            type="button"
            onClick={() => onSelect(type.slug)}
            className={cn(
              "group rounded-2xl border p-4 text-start shadow-sm transition hover:-translate-y-0.5",
              selected
                ? "border-flash-primary bg-flash-primary-light ring-2 ring-flash-primary/20"
                : "border-slate-200 bg-white hover:border-flash-primary/45 hover:shadow-md",
            )}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-flash-primary-light to-white text-base font-semibold text-flash-primary ring-1 ring-flash-primary/10">
              {getRequestTypeIconGlyph(type.icon)}
            </span>
            <h3 className="mt-3 font-semibold text-flash-text">
              {getLocalized(type.title, lang)}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-flash-muted">
              {getLocalized(type.description, lang)}
            </p>
          </button>
        );
      })}
    </DataGrid>
  );
}
