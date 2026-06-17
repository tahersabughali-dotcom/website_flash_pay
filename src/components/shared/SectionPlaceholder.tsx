import Link from "next/link";
import { settingsData } from "@/data/settingsData";
import { getLocalized } from "@/lib/i18n";
import { getVisibleNavigation } from "@/lib/navigation";
import { StatusBadge } from "@/components/shared/StatusBadge";

interface SectionPlaceholderProps {
  route: string;
  slug?: string;
  showBackLink?: boolean;
}

export function SectionPlaceholder({
  route,
  slug,
  showBackLink = true,
}: SectionPlaceholderProps) {
  const lang = settingsData.defaultLanguage;
  const navItem = getVisibleNavigation().find(
    (item) => item.route === route || (slug && item.slug === slug),
  );

  const title = navItem
    ? getLocalized(navItem.title, lang)
    : route;
  const status = navItem?.status ?? "active";

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      {showBackLink && (
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-flash-muted hover:text-flash-primary"
        >
          {lang === "ar" ? "← الرئيسية" : "← Home"}
        </Link>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold text-flash-text">{title}</h1>
          {status === "coming_soon" && (
            <StatusBadge
              status="coming_soon"
              label={lang === "ar" ? "قريباً" : "Coming Soon"}
            />
          )}
        </div>

        <p className="text-flash-muted">
          {lang === "ar"
            ? "هيكل القسم جاهز. سيتم إضافة المحتوى والتصميم في المرحلة التالية."
            : "Section structure is ready. Content and design will be added in the next phase."}
        </p>

        <p className="mt-4 font-mono text-xs text-slate-400">
          route: {route}
          {slug ? ` · slug: ${slug}` : ""}
        </p>
      </div>
    </div>
  );
}
