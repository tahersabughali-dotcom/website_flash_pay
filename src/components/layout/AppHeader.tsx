import Link from "next/link";
import { settingsData } from "@/data/settingsData";
import { getLocalized } from "@/lib/i18n";
import { getVisibleNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { MobileNavigation } from "./MobileNavigation";

export function AppHeader() {
  const lang = settingsData.defaultLanguage;
  const navItems = getVisibleNavigation();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4">
        <BrandLogo asLink />

        <nav className="hidden max-w-2xl flex-1 items-center justify-center gap-1 overflow-x-auto lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.route}
              className={cn(
                "shrink-0 rounded-lg px-2.5 py-2 text-xs text-flash-muted transition hover:bg-flash-primary-light hover:text-flash-primary xl:px-3 xl:text-sm",
              )}
            >
              <span className="inline-flex items-center gap-1.5">
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
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher compact />
          <WhatsAppButton className="!rounded-xl !px-3 !py-2 !text-xs" label="WhatsApp" />
          <Link href="/request" className="flash-btn-primary !px-4 !py-2.5">
            {lang === "ar" ? "ابدأ طلباً" : "Start a Request"}
          </Link>
        </div>

        <MobileNavigation />
      </div>
    </header>
  );
}
