import Link from "next/link";
import type { LanguageCode } from "@/types/common";
import type { Service } from "@/types/service";
import { getLocalized } from "@/lib/i18n";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { CTASection } from "@/components/shared/CTASection";

interface ServiceDetailPlaceholderProps {
  service: Service;
  lang: LanguageCode;
}

export function ServiceDetailPlaceholder({ service, lang }: ServiceDetailPlaceholderProps) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-12">
      <Link
        href="/services"
        className="mb-6 inline-block text-sm text-flash-muted hover:text-flash-primary"
      >
        {lang === "ar" ? "← كل الخدمات" : "← All Services"}
      </Link>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold text-flash-text">
            {getLocalized(service.title, lang)}
          </h1>
          {service.status === "coming_soon" && (
            <StatusBadge
              status="coming_soon"
              label={lang === "ar" ? "قريباً" : "Coming Soon"}
            />
          )}
        </div>

        <p className="mt-4 text-flash-muted">
          {getLocalized(service.fullDescription, lang)}
        </p>

        <div className="mt-6 rounded-xl bg-flash-surface p-4 text-sm text-flash-muted">
          {lang === "ar"
            ? "صفحة تفاصيل الخدمة الكاملة ستُبنى في مرحلة لاحقة. استخدم مركز الطلبات الآن."
            : "Full service detail page will be built in a later phase. Use the Request Center now."}
        </div>

        <Link
          href="/request"
          className="mt-6 inline-flex rounded-xl bg-flash-primary px-5 py-3 text-sm font-semibold text-white"
        >
          {lang === "ar" ? "ابدأ طلباً" : "Start a Request"}
        </Link>
      </div>

      <div className="mt-10">
        <CTASection
          title={lang === "ar" ? "اطلب السعر عبر WhatsApp" : "Request price via WhatsApp"}
          description={
            lang === "ar"
              ? "لا أسعار مضمونة على الموقع."
              : "No guaranteed rates on the website."
          }
          lang={lang}
        />
      </div>
    </div>
  );
}
