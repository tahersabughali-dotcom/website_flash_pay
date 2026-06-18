import Link from "next/link";
import { homepageData } from "@/data/homepageData";
import { settingsData } from "@/data/settingsData";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { getLocalized } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const lang = settingsData.defaultLanguage;
  const { hero } = homepageData;

  return (
    <section
      className={cn(
        "flash-hero relative overflow-hidden rounded-3xl px-6 py-14 text-white shadow-xl sm:px-10 sm:py-16 lg:px-14 lg:py-20",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -end-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 start-8 h-56 w-56 rounded-full bg-flash-accent/25 blur-3xl"
        aria-hidden
      />
      <div
        className="flash-hero-pattern pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl text-center lg:max-w-5xl">
        <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/95 backdrop-blur-sm sm:text-sm">
          {getLocalized(hero.eyebrow, lang)}
        </p>
        <h1 className="mt-5 text-3xl font-bold leading-[1.15] sm:text-4xl lg:mt-6 lg:text-5xl xl:text-[3.25rem]">
          {getLocalized(hero.title, lang)}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:mt-6 sm:text-lg lg:max-w-3xl">
          {getLocalized(hero.subtitle, lang)}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:mt-10">
          <Link
            href={hero.primaryCta.href}
            className="flash-btn-primary min-w-[10rem] !bg-white !text-flash-primary hover:!bg-white/90"
          >
            {getLocalized(hero.primaryCta.label, lang)}
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className="flash-btn-ghost-white min-w-[10rem] border border-white/25"
          >
            {getLocalized(hero.secondaryCta.label, lang)}
          </Link>
          <WhatsAppButton
            variant="primary"
            className="min-w-[10rem] !rounded-xl !bg-[#25D366] hover:!bg-[#1fb855]"
            label="WhatsApp"
          />
        </div>
      </div>
    </section>
  );
}
