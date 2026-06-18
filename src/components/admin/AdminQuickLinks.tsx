import { AdminDashboardCard } from "./AdminDashboardCard";
import { settingsData } from "@/data/settingsData";

export function AdminQuickLinks() {
  const lang = settingsData.defaultLanguage;

  const links = [
    {
      title: lang === "ar" ? "إدارة الطلبات" : "Request management",
      description:
        lang === "ar"
          ? "متابعة طلبات العملاء المحلية والتجريبية."
          : "Track local and preview customer requests.",
      href: "/admin/requests",
      badge: lang === "ar" ? "محلي" : "Local",
    },
    {
      title: lang === "ar" ? "إدارة الدردشة" : "Chat admin",
      description:
        lang === "ar"
          ? "مراجعة محادثات الزوار وتجربة الدعم المباشر."
          : "Review visitor chats and test live support.",
      href: "/admin/chat",
    },
    {
      title: lang === "ar" ? "إدارة المحتوى" : "Content admin",
      description:
        lang === "ar"
          ? "مركز تجريبي لإدارة خدمات الموقع والدول والعملات والنصوص."
          : "Preview hub for site services, countries, currencies, and copy.",
      href: "/admin/content",
    },
    {
      title: lang === "ar" ? "التغطية العالمية" : "Global coverage",
      description:
        lang === "ar"
          ? "مراجعة الدول والعملات وطرق الدفع والاستلام."
          : "Review countries, currencies, and payment/receiving methods.",
      href: "/admin/coverage",
    },
    {
      title: lang === "ar" ? "إعدادات الموقع" : "Site settings",
      description:
        lang === "ar"
          ? "مراجعة إعدادات العلامة التجارية، WhatsApp، SEO، وميزات الموقع."
          : "Review brand, WhatsApp, SEO, and feature flag settings.",
      href: "/admin/settings",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {links.map((link) => (
        <AdminDashboardCard key={link.href} {...link} />
      ))}
    </div>
  );
}
