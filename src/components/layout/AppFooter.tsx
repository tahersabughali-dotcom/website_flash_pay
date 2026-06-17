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

export function AppFooter() {
  const lang = settingsData.defaultLanguage;
  const footerItems = getVisibleNavigation({ footer: true });

  return (
    <footer className="mt-auto border-t border-slate-200 bg-gradient-to-b from-flash-surface to-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <BrandLogo className="mb-3" />
            <p className="text-base font-semibold text-flash-text">
              {getLocalized(settingsData.platformName, lang)}
            </p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-flash-muted">
              {lang === "ar"
                ? "منصة مالية عالمية — خدمات عبر شبكة شركاء موثوقة."
                : "Global financial platform — services through a trusted partner network."}
            </p>
            <p className="mt-3 text-xs text-flash-muted">
              {lang === "ar" ? "الإصدار" : "Version"}: {PLATFORM_VERSION}
            </p>

            {footerItems.length > 0 && (
              <nav className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm">
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

            <div className="mt-6 max-w-xl">
              <DisclaimerBox
                content={getLocalized(homepageData.footer.safetyNotice, lang)}
              />
            </div>
          </div>

          <OfficialChannelsBox />
        </div>
      </div>
    </footer>
  );
}
