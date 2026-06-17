import Link from "next/link";
import type { LanguageCode } from "@/types/common";
import type { Service } from "@/types/service";
import { serviceCategoriesData } from "@/data/serviceCategoriesData";
import { executionTypesData } from "@/data/executionTypesData";
import { PageHero } from "@/components/shared/PageHero";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ExecutionTypeBadge } from "@/components/shared/ExecutionTypeBadge";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";
import { DetailSection } from "@/components/shared/DetailSection";
import { RelatedItemsGrid } from "@/components/shared/RelatedItemsGrid";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { CountryCard } from "@/components/shared/CountryCard";
import { getLocalized } from "@/lib/i18n";
import {
  getRelatedCountriesForService,
  getRelatedServices,
} from "@/lib/dataAccess";
import { ServiceInfoPanel } from "./ServiceInfoPanel";
import { ServiceAvailability } from "./ServiceAvailability";
import { ServiceCTA } from "./ServiceCTA";

interface ServiceDetailPageProps {
  service: Service;
  lang: LanguageCode;
}

export function ServiceDetailPage({ service, lang }: ServiceDetailPageProps) {
  const category = serviceCategoriesData.find((item) => item.id === service.category);
  const execution = executionTypesData.find((item) => item.id === service.executionType);
  const relatedServices = getRelatedServices(service);
  const relatedCountries = getRelatedCountriesForService(service);

  return (
    <div className="flash-page-wrap">
      <Link
        href="/services"
        className="mb-6 inline-block text-sm text-flash-muted hover:text-flash-primary"
      >
        {lang === "ar" ? "← كل الخدمات" : "← All Services"}
      </Link>

      <PageHero
        eyebrow={category ? getLocalized(category.label, lang) : undefined}
        title={getLocalized(service.title, lang)}
        subtitle={getLocalized(service.shortDescription, lang)}
      >
        <div className="flex flex-wrap gap-2">
          <StatusBadge
            status={service.status}
            label={
              service.status === "coming_soon"
                ? lang === "ar"
                  ? "قريباً"
                  : "Coming Soon"
                : lang === "ar"
                  ? "متاح"
                  : "Available"
            }
          />
          <ExecutionTypeBadge executionType={service.executionType} />
        </div>
      </PageHero>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <DetailSection title={lang === "ar" ? "عن الخدمة" : "About this service"}>
            <p className="text-base leading-relaxed text-flash-muted">
              {getLocalized(service.fullDescription, lang)}
            </p>
          </DetailSection>

          {execution && service.executionType !== "direct" && (
            <DisclaimerBox
              title={lang === "ar" ? "ملاحظة التنفيذ" : "Execution notice"}
              content={getLocalized(execution.wordingHint, lang)}
            />
          )}

          <ServiceAvailability service={service} lang={lang} />

          {relatedCountries.length > 0 && (
            <DetailSection
              title={lang === "ar" ? "دول مرتبطة" : "Related countries"}
            >
              <RelatedItemsGrid columns={2}>
                {relatedCountries.map((country) => (
                  <CountryCard key={country.id} country={country} lang={lang} />
                ))}
              </RelatedItemsGrid>
            </DetailSection>
          )}

          {relatedServices.length > 0 && (
            <DetailSection
              title={lang === "ar" ? "خدمات ذات صلة" : "Related services"}
            >
              <RelatedItemsGrid columns={2}>
                {relatedServices.map((item) => (
                  <ServiceCard key={item.id} service={item} lang={lang} />
                ))}
              </RelatedItemsGrid>
            </DetailSection>
          )}
        </div>

        <aside className="space-y-6">
          <ServiceInfoPanel service={service} lang={lang} />
          <ServiceCTA service={service} lang={lang} />
        </aside>
      </div>
    </div>
  );
}
