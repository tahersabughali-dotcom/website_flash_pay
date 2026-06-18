"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { pageContentData } from "@/data/pageContentData";
import { settingsData } from "@/data/settingsData";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { getAllRequestTypes, getRequestTypeBySlug } from "@/lib/dataAccess";
import { PLATFORM_SAFETY_NOTICE } from "@/lib/constants";
import { getLocalized } from "@/lib/i18n";
import { DynamicRequestForm } from "./DynamicRequestForm";
import { RequestTypeSelector } from "./RequestTypeSelector";

export function RequestCenterForm() {
  const lang = settingsData.defaultLanguage;
  const content = pageContentData.request;
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedSlug = searchParams.get("type") ?? "";

  const requestTypes = useMemo(() => getAllRequestTypes(), []);

  const selectedType = selectedSlug ? getRequestTypeBySlug(selectedSlug) : undefined;

  const handleSelect = (slug: string) => {
    router.replace(`/request?type=${slug}`, { scroll: false });
  };

  return (
    <>
      <section className="mt-8">
        <SectionHeader
          title={getLocalized(content.step1.title, lang)}
          subtitle={getLocalized(content.step1.subtitle, lang)}
        />
        <RequestTypeSelector
          requestTypes={requestTypes}
          selectedSlug={selectedSlug}
          onSelect={handleSelect}
          lang={lang}
        />
      </section>

      {selectedType ? (
        <section className="mt-8">
          <SectionHeader
            title={getLocalized(content.step2.title, lang)}
            subtitle={getLocalized(selectedType.description, lang)}
          />
          <DynamicRequestForm requestType={selectedType} lang={lang} />
        </section>
      ) : (
        <p className="mt-8 flash-card p-6 text-sm text-flash-muted">
          {getLocalized(content.selectPrompt, lang)}
        </p>
      )}

      <p className="mt-8 text-center text-xs text-flash-muted">
        {getLocalized(PLATFORM_SAFETY_NOTICE, lang)}
      </p>
    </>
  );
}
