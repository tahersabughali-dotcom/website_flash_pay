import Link from "next/link";
import { homepageData } from "@/data/homepageData";
import { uiLabelsData } from "@/data/pageContentData";
import { settingsData } from "@/data/settingsData";
import { getLocalized } from "@/lib/i18n";
import { getVisibleNavigation } from "@/lib/navigation";
import { PLATFORM_VERSION } from "@/lib/constants";
import { OfficialChannelsBox } from "@/components/trust/OfficialChannelsBox";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { DisclaimerBox } from "@/components/shared/DisclaimerBox";
import { LtrText } from "@/components/shared/LtrText";

export function AppFooter() {
  const lang = settingsData.defaultLanguage;
  const footerItems = getVisibleNavigation({ footer: true });

  return (
    <footer className="mt-auto border-t border-slate-200 bg-gradient-to-b from-flash-surface to-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-9">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
          <div>
            <BrandLogo className="mb-3" variant="footer" />
            <p className="text-base font-semibold text-flash-text">
              {getLocalized(settingsData.platformName, lang)}
            </p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-flash-muted">
              {getLocalized(homepageData.footer.tagline, lang)}
            </p>
            <p className="mt-3 text-xs text-flash-muted">
              {lang === "ar" ? "الإصدار" : "Version"}:{" "}
              <LtrText>{PLATFORM_VERSION}</LtrText>
            </p>

            {footerItems.length > 0 && (
              <nav className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                {footerItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.route}
                    className="text-flash-muted transition hover:text-flash-primary"
                  >
                    {getLocalized(item.title, lang)}
                  </Link>
                ))}
                <Link href="/trust" className="text-flash-muted transition hover:text-flash-primary">
                  {getLocalized(uiLabelsData.trustCenter, lang)}
                </Link>
              </nav>
            )}

            <div className="mt-5 max-w-xl">
              <DisclaimerBox
                content={getLocalized(homepageData.footer.safetyNotice, lang)}
              />
            </div>
          </div>

          <OfficialChannelsBox compact />
        </div>
      </div>
    </footer>
  );
}
