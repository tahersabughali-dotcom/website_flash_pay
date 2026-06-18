import { articlesData } from "@/data/articlesData";
import { countriesData } from "@/data/countriesData";
import { faqData } from "@/data/faqData";
import { globalCurrenciesData } from "@/data/globalCurrenciesData";
import { globalPaymentMethodsData } from "@/data/globalPaymentMethodsData";
import { globalReceivingMethodsData } from "@/data/globalReceivingMethodsData";
import { homepageData } from "@/data/homepageData";
import { servicesData } from "@/data/servicesData";
import { trustData } from "@/data/trustData";
import type { AdminDashboardAccess } from "@/types/auth";
import { settingsData } from "@/data/settingsData";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminContentPreviewTable } from "./AdminContentPreviewTable";
import { AdminContentSectionCard } from "./AdminContentSectionCard";
import { AdminContentWarning } from "./AdminContentWarning";

interface AdminContentPageProps {
  access: AdminDashboardAccess;
}

const STATUS_READY = "جاهز للعرض";
const STATUS_LATER = "قابل للإدارة لاحقًا";
const STATUS_DB = "يحتاج ربط قاعدة بيانات";
const ACTION_EDIT = "تحرير لاحقًا";
const ACTION_SUPABASE = "ربط Supabase لاحقًا";

export function AdminContentPage({ access }: AdminContentPageProps) {
  const lang = settingsData.defaultLanguage;

  const sections = [
    {
      title: "الخدمات",
      count: servicesData.length,
      description: "بطاقات وصفحات الخدمات المعروضة على الموقع.",
      sourceFile: "src/data/servicesData.ts",
      status: STATUS_READY,
      futureAction: ACTION_EDIT,
    },
    {
      title: "الدول التشغيلية",
      count: countriesData.length,
      description: "دول التشغيل والصفحات التفصيلية.",
      sourceFile: "src/data/countriesData.ts",
      status: STATUS_LATER,
      futureAction: ACTION_SUPABASE,
    },
    {
      title: "العملات",
      count: globalCurrenciesData.length,
      description: "دليل العملات المرجعي.",
      sourceFile: "src/data/globalCurrenciesData.ts",
      status: STATUS_LATER,
      futureAction: ACTION_SUPABASE,
    },
    {
      title: "طرق الدفع",
      count: globalPaymentMethodsData.length,
      description: "طرق الدفع في الدليل العالمي.",
      sourceFile: "src/data/globalPaymentMethodsData.ts",
      status: STATUS_LATER,
      futureAction: ACTION_SUPABASE,
    },
    {
      title: "طرق الاستلام",
      count: globalReceivingMethodsData.length,
      description: "طرق الاستلام في الدليل العالمي.",
      sourceFile: "src/data/globalReceivingMethodsData.ts",
      status: STATUS_LATER,
      futureAction: ACTION_SUPABASE,
    },
    {
      title: "المقالات",
      count: articlesData.length,
      description: "محتوى الأكاديمية والمقالات المنشورة.",
      sourceFile: "src/data/articlesData.ts",
      status: STATUS_LATER,
      futureAction: ACTION_EDIT,
    },
    {
      title: "مركز الثقة",
      count: trustData.length,
      description: "مستندات ومحتوى مركز الثقة.",
      sourceFile: "src/data/trustData.ts",
      status: STATUS_READY,
      futureAction: ACTION_EDIT,
    },
    {
      title: "الصفحة الرئيسية",
      count: Object.keys(homepageData.sections).length,
      description: "أقسام ونصوص الصفحة الرئيسية.",
      sourceFile: "src/data/homepageData.ts",
      status: STATUS_LATER,
      futureAction: ACTION_EDIT,
    },
    {
      title: "الأسئلة الشائعة",
      count: faqData.length,
      description: "أسئلة وأجوبة — جاهزة للإضافة لاحقًا.",
      sourceFile: "src/data/faqData.ts",
      status: faqData.length > 0 ? STATUS_READY : STATUS_DB,
      futureAction: ACTION_SUPABASE,
    },
    {
      title: "إعدادات SEO",
      count: 1,
      description: "عناوين ووصف SEO الافتراضية.",
      sourceFile: "src/data/settingsData.ts",
      status: STATUS_LATER,
      futureAction: ACTION_EDIT,
    },
  ];

  const previewRows = servicesData.slice(0, 6).map((service) => ({
    name: service.slug,
    status: service.status,
    source: "servicesData.ts",
  }));

  return (
    <AdminShell access={access}>
      <div className="space-y-6">
        <AdminContentWarning access={access} />

        <div>
          <h1 className="text-2xl font-bold text-flash-text">
            {lang === "ar" ? "إدارة المحتوى" : "Content management"}
          </h1>
          <p className="mt-2 text-sm text-flash-muted">
            {lang === "ar"
              ? "نظرة عامة على مصادر المحتوى — للمراجعة الداخلية فقط."
              : "Content source overview — internal review only."}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sections.map((section) => (
            <AdminContentSectionCard key={section.title} {...section} />
          ))}
        </div>

        <AdminContentPreviewTable title="معاينة الخدمات (أول 6)" rows={previewRows} />
      </div>
    </AdminShell>
  );
}
