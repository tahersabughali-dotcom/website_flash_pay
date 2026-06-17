import Link from "next/link";
import { homepageData } from "@/data/homepageData";
import { settingsData } from "@/data/settingsData";
import { DataGrid } from "@/components/shared/DataGrid";
import { EmptyState } from "@/components/shared/EmptyState";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { getFeaturedServices } from "@/lib/dataAccess";
import { getLocalized } from "@/lib/i18n";

export function HomeServicesSection() {
  const lang = settingsData.defaultLanguage;
  const config = homepageData.sections.services;
  const services = getFeaturedServices(6);

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

      {services.length > 0 ? (
        <DataGrid columns={3}>
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} lang={lang} />
          ))}
        </DataGrid>
      ) : (
        <EmptyState
          title={lang === "ar" ? "لا توجد خدمات مميزة" : "No featured services"}
          description={
            lang === "ar"
              ? "أضف خدمات مميزة في servicesData.ts"
              : "Add featured services in servicesData.ts"
          }
        />
      )}
    </section>
  );
}
