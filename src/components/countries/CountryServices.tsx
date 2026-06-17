import type { LanguageCode } from "@/types/common";
import type { Country } from "@/types/country";
import { DetailSection } from "@/components/shared/DetailSection";
import { RelatedItemsGrid } from "@/components/shared/RelatedItemsGrid";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { getServicesBySlugs } from "@/lib/dataAccess";

interface CountryServicesProps {
  country: Country;
  lang: LanguageCode;
}

export function CountryServices({ country, lang }: CountryServicesProps) {
  const services = getServicesBySlugs(country.availableServices);

  return (
    <DetailSection title={lang === "ar" ? "الخدمات المتاحة" : "Available services"}>
      {services.length > 0 ? (
        <RelatedItemsGrid columns={2}>
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} lang={lang} />
          ))}
        </RelatedItemsGrid>
      ) : (
        <EmptyState
          title={lang === "ar" ? "لا توجد خدمات معروضة" : "No listed services"}
          description={
            lang === "ar"
              ? "تواصل معنا للاستفسار عن التوفر."
              : "Contact us to inquire about availability."
          }
        />
      )}
    </DetailSection>
  );
}
