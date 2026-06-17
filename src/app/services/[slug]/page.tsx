import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";
import { NotFoundState } from "@/components/shared/NotFoundState";
import { settingsData } from "@/data/settingsData";
import { getServiceBySlug } from "@/lib/dataAccess";
import { buildPageMetadata, buildServiceMetadata } from "@/lib/seo";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return buildPageMetadata(settingsData, {
      title: { ar: "خدمة غير موجودة", en: "Service not found" },
      description: settingsData.seoDefaults.description,
      path: `/services/${slug}`,
    });
  }

  return buildServiceMetadata(service, settingsData);
}

export default async function ServiceDetailRoutePage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const lang = settingsData.defaultLanguage;

  if (!service) {
    return (
      <div className="px-4 py-16">
        <NotFoundState
          title={lang === "ar" ? "الخدمة غير موجودة" : "Service not found"}
          description={
            lang === "ar"
              ? "قد تكون هذه الخدمة مخفية أو غير متاحة."
              : "This service may be hidden or unavailable."
          }
          backHref="/services"
          backLabel={lang === "ar" ? "العودة للخدمات" : "Back to services"}
        />
      </div>
    );
  }

  return <ServiceDetailPage service={service} lang={lang} />;
}
