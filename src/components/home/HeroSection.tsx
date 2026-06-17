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
        "relative overflow-hidden rounded-3xl bg-gradient-to-br from-flash-primary via-flash-primary to-flash-primary-dark px-6 py-12 text-white shadow-xl sm:px-10 sm:py-14",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -end-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 start-10 h-48 w-48 rounded-full bg-flash-accent/20 blur-3xl"
        aria-hidden
      />

      <div className="relative">
        <p className="text-sm font-medium uppercase tracking-widest text-white/90">
          {getLocalized(hero.eyebrow, lang)}
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          {getLocalized(hero.title, lang)}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/95 sm:text-lg">
          {getLocalized(hero.subtitle, lang)}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={hero.primaryCta.href} className="flash-btn-primary !bg-white !text-flash-primary hover:!bg-white/90">
            {getLocalized(hero.primaryCta.label, lang)}
          </Link>
          <Link href={hero.secondaryCta.href} className="flash-btn-ghost-white border border-white/20">
            {getLocalized(hero.secondaryCta.label, lang)}
          </Link>
          <WhatsAppButton
            variant="primary"
            className="!rounded-xl !bg-[#25D366] hover:!bg-[#1fb855]"
            label="WhatsApp"
          />
        </div>
      </div>
    </section>
  );
}
