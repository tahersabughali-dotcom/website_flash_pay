import Link from "next/link";
import { uiLabelsData } from "@/data/pageContentData";
import { settingsData } from "@/data/settingsData";
import { getLocalized } from "@/lib/i18n";
import { getDesktopHeaderNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { MobileNavigation } from "./MobileNavigation";

export function AppHeader() {
  const lang = settingsData.defaultLanguage;
  const desktopNavItems = getDesktopHeaderNavigation();

  return (
    <header className="sticky top-0 z-50 overflow-x-clip border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="relative mx-auto flex max-w-7xl items-center gap-2 px-4 py-2.5 sm:gap-3 lg:grid lg:grid-cols-[minmax(0,auto)_minmax(0,1fr)_minmax(0,auto)] lg:items-center lg:gap-4 lg:px-6 lg:py-3">
        <BrandLogo asLink variant="header" className="lg:justify-self-start" />

        <nav
          className="hidden min-w-0 lg:block lg:justify-self-center"
          aria-label={lang === "ar" ? "التنقل الرئيسي" : "Main navigation"}
        >
          <ul className="flex flex-wrap items-center justify-center gap-x-0.5 gap-y-1 xl:gap-x-1">
            {desktopNavItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.route}
                  className={cn(
                    "inline-flex items-center rounded-lg px-2 py-2 text-[11px] font-medium text-flash-muted transition hover:bg-flash-primary-light hover:text-flash-primary xl:px-2.5 xl:text-xs",
                  )}
                >
                  <span className="inline-flex items-center gap-1 whitespace-nowrap">
                    {getLocalized(item.title, lang)}
                    {item.status === "coming_soon" && (
                      <StatusBadge
                        status="coming_soon"
                        label={lang === "ar" ? "قريباً" : "Soon"}
                        className="scale-90"
                      />
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-auto flex shrink-0 items-center gap-1.5 lg:ms-0 lg:justify-self-end lg:gap-2">
          <div className="hidden items-center gap-1.5 lg:flex xl:gap-2">
            <LanguageSwitcher compact />
            <WhatsAppButton className="!rounded-xl !px-3 !py-2 !text-xs" label="WhatsApp" />
            <Link href="/request" className="flash-btn-primary whitespace-nowrap !px-3.5 !py-2.5 !text-xs xl:!px-4">
              {getLocalized(uiLabelsData.startRequest, lang)}
            </Link>
          </div>
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
