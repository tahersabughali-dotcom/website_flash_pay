"use client";

import { settingsData } from "@/data/settingsData";
import type { LanguageCode } from "@/types/common";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
  compact?: boolean;
}

const languageLabels: Record<LanguageCode, string> = {
  ar: "AR",
  en: "EN",
};

/**
 * TODO: Full i18n — wire locale switching via URL routing, cookies, or context.
 * Do not change defaultLanguage here until routing is implemented.
 */
export function LanguageSwitcher({ className, compact }: LanguageSwitcherProps) {
  const current = settingsData.defaultLanguage;
  const languages = settingsData.supportedLanguages;

  return (
    <div
      className={cn("inline-flex rounded-xl border border-slate-200 bg-white p-0.5", className)}
      role="group"
      aria-label="Language"
    >
      {languages.map((lang) => {
        const isActive = lang === current;

        return (
          <button
            key={lang}
            type="button"
            disabled={isActive}
            title={
              isActive
                ? undefined
                : lang === "ar"
                  ? "قريباً — تبديل اللغة"
                  : "Coming soon — language switch"
            }
            onClick={(event) => {
              event.preventDefault();
              // TODO: implement locale switch without breaking RTL layout
            }}
            className={cn(
              "rounded-lg px-2.5 py-1.5 text-xs font-semibold transition",
              isActive
                ? "bg-flash-primary text-white"
                : "text-flash-muted hover:bg-flash-primary-light hover:text-flash-primary",
              compact && "px-2 py-1",
            )}
          >
            {languageLabels[lang]}
          </button>
        );
      })}
    </div>
  );
}
