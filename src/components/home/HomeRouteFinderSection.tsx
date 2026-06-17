import Link from "next/link";
import { homepageData } from "@/data/homepageData";
import { settingsData } from "@/data/settingsData";
import { isFeatureEnabled } from "@/data/featureFlagsData";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { getLocalized } from "@/lib/i18n";

export function HomeRouteFinderSection() {
  const lang = settingsData.defaultLanguage;
  const config = homepageData.sections.routeFinder;

  if (!isFeatureEnabled("showRouteFinder")) return null;

  return (
    <section className="flash-section">
      <div className="flash-card overflow-hidden bg-gradient-to-br from-white to-flash-primary-light/40 p-6 sm:p-8">
        <SectionHeader
          title={getLocalized(config.title, lang)}
          subtitle={getLocalized(config.subtitle, lang)}
          action={
            <Link href={config.actionHref!} className="flash-btn-primary shrink-0">
              {getLocalized(config.actionLabel!, lang)}
            </Link>
          }
        />
      </div>
    </section>
  );
}
