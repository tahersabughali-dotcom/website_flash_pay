import Link from "next/link";
import { settingsData } from "@/data/settingsData";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { DataGrid } from "@/components/shared/DataGrid";
import { ServiceCard } from "@/components/shared/ServiceCard";
import {
  getActiveBusinessOfferingsFull,
  getBusinessServices,
} from "@/lib/dataAccess";
import { BusinessOfferCard } from "./BusinessOfferCard";
import { BusinessRequestForm } from "./BusinessRequestForm";
import { BusinessTrustPanel } from "./BusinessTrustPanel";

export function BusinessPage() {
  const lang = settingsData.defaultLanguage;
  const offerings = getActiveBusinessOfferingsFull();
  const services = getBusinessServices();

  return (
    <div className="flash-page-wrap">
      <PageHero
        eyebrow={lang === "ar" ? "Flash Business Class" : "Flash Business Class"}
        title={
          lang === "ar"
            ? "حلول premium للتجار والشركات"
            : "Premium solutions for traders and companies"
        }
        subtitle={
          lang === "ar"
            ? "للتجار، الشركات، المستوردين، المصدرين، والعملاء ذوي الأحجام الكبيرة."
            : "For traders, companies, importers, exporters, and high-volume clients."
        }
      >
        <Link
          href="/request"
          className="inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-flash-primary"
        >
          {lang === "ar" ? "ابدأ طلباً" : "Start a Request"}
        </Link>
      </PageHero>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          <section>
            <SectionHeader
              title={lang === "ar" ? "عروض Business Class" : "Business Class offerings"}
            />
            <DataGrid columns={2} className="mt-6">
              {offerings.map((offering) => (
                <BusinessOfferCard key={offering.id} offering={offering} lang={lang} />
              ))}
            </DataGrid>
          </section>

          <section>
            <SectionHeader
              title={lang === "ar" ? "خدمات مرتبطة" : "Related services"}
              subtitle={
                lang === "ar"
                  ? "التوفر يعتمد على الدولة والعملة وشبكة الشركاء."
                  : "Availability depends on country, currency, and partner coverage."
              }
            />
            <DataGrid columns={3} className="mt-6">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} lang={lang} />
              ))}
            </DataGrid>
          </section>

          <BusinessRequestForm lang={lang} />
        </div>

        <aside>
          <BusinessTrustPanel lang={lang} />
        </aside>
      </div>
    </div>
  );
}
