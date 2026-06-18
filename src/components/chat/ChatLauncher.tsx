import type { LanguageCode } from "@/types/common";
import { chatData } from "@/data/chatData";
import { getLocalized } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface ChatLauncherProps {
  lang: LanguageCode;
  isOpen: boolean;
  onToggle: () => void;
}

export function ChatLauncher({ lang, isOpen, onToggle }: ChatLauncherProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-label={getLocalized(chatData.uiLabels.openChat, lang)}
      className={cn(
        "fixed z-40 flex h-14 w-14 items-center justify-center rounded-full bg-flash-primary text-white shadow-lg ring-2 ring-white transition hover:scale-[1.03] hover:bg-flash-primary-dark hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flash-primary focus-visible:ring-offset-2",
        lang === "ar" ? "left-4 max-sm:left-3" : "right-4 max-sm:right-3",
        "bottom-[calc(5.25rem+env(safe-area-inset-bottom))] max-sm:bottom-[calc(5.5rem+env(safe-area-inset-bottom))]",
      )}
    >
      {isOpen ? (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 11-7.6-14.7 8.38 8.38 0 013.8.9L21 4v7.5z" />
        </svg>
      )}
    </button>
  );
}
