import { homepageData } from "@/data/homepageData";
import { settingsData } from "@/data/settingsData";
import { CTASection } from "@/components/shared/CTASection";
import { HeroSection } from "./HeroSection";
import { HomeAcademySection } from "./HomeAcademySection";
import { HomeBusinessSection } from "./HomeBusinessSection";
import { HomeCountriesSection } from "./HomeCountriesSection";
import { HomeFutureSection } from "./HomeFutureSection";
import { HomeMarketsSection } from "./HomeMarketsSection";
import { HomeNetworkSection } from "./HomeNetworkSection";
import { HomeRouteFinderSection } from "./HomeRouteFinderSection";
import { HomeServicesSection } from "./HomeServicesSection";
import { HomeTrustSection } from "./HomeTrustSection";
import { SmartActionsSection } from "./SmartActionsSection";
import { getLocalized } from "@/lib/i18n";

export function FoundationHome() {
  const lang = settingsData.defaultLanguage;
  const bottomCta = homepageData.sections.bottomCta;

  return (
    <div className="flash-page-wrap">
      <HeroSection />
      <SmartActionsSection />
      <HomeServicesSection />
      <HomeRouteFinderSection />
      <HomeMarketsSection />
      <HomeBusinessSection />
      <HomeNetworkSection />
      <HomeCountriesSection />
      <HomeAcademySection />
      <HomeTrustSection />
      <HomeFutureSection />

      <div className="flash-section">
        <CTASection
          title={getLocalized(bottomCta.title, lang)}
          description={getLocalized(bottomCta.subtitle, lang)}
          lang={lang}
        />
      </div>
    </div>
  );
}
