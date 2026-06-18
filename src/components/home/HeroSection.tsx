import Link from "next/link";
import { homepageData } from "@/data/homepageData";
import { settingsData } from "@/data/settingsData";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { getLocalized } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { HeroWatermark } from "./HeroWatermark";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const lang = settingsData.defaultLanguage;
  const { hero } = homepageData;

  return (
    <section
      className={cn(
        "flash-hero relative overflow-hidden rounded-3xl px-5 py-11 text-white shadow-xl sm:px-10 sm:py-14 lg:px-12 lg:py-16",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -end-16 -top-16 z-0 h-56 w-56 rounded-full bg-white/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 start-6 z-0 h-48 w-48 rounded-full bg-flash-accent/20 blur-3xl"
        aria-hidden
      />
      <div
        className="flash-hero-pattern pointer-events-none absolute inset-0 z-0 opacity-30"
        aria-hidden
      />

      <HeroWatermark />

      <div className="relative z-10 mx-auto max-w-3xl text-center lg:max-w-4xl">
        <p className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-sm sm:text-sm">
          {getLocalized(hero.eyebrow, lang)}
        </p>
        <h1 className="mt-4 text-[1.75rem] font-extrabold leading-[1.2] tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.18)] sm:mt-5 sm:text-4xl lg:text-[2.75rem]">
          {getLocalized(hero.title, lang)}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-white/88 sm:mt-5 sm:text-lg">
          {getLocalized(hero.subtitle, lang)}
        </p>

        <div className="mt-7 flex flex-col items-stretch justify-center gap-2.5 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
          <Link
            href={hero.primaryCta.href}
            className="flash-btn-primary order-1 min-h-12 w-full !bg-white !px-6 !text-base !font-bold !text-flash-primary shadow-lg ring-2 ring-white/50 hover:!bg-white/95 sm:w-auto sm:min-w-[11.5rem]"
          >
            {getLocalized(hero.primaryCta.label, lang)}
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className="flash-btn-ghost-white order-2 min-h-12 w-full border border-white/40 !font-semibold sm:w-auto sm:min-w-[11.5rem]"
          >
            {getLocalized(hero.secondaryCta.label, lang)}
          </Link>
          <WhatsAppButton
            variant="primary"
            className="order-3 min-h-12 w-full !rounded-xl !bg-[#25D366]/95 !px-5 !text-sm !font-semibold hover:!bg-[#1fb855] sm:w-auto sm:min-w-[11.5rem]"
            label="WhatsApp"
          />
        </div>
      </div>
    </section>
  );
}
