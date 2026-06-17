import type { LanguageCode } from "@/types/common";
import { WhatsAppButton } from "./WhatsAppButton";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  title: string;
  description: string;
  lang: LanguageCode;
  whatsappMessage?: string;
  className?: string;
}

export function CTASection({
  title,
  description,
  lang,
  whatsappMessage,
  className,
}: CTASectionProps) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-flash-primary/20 bg-gradient-to-br from-flash-primary-light via-white to-flash-primary-light/50 px-6 py-8 text-center shadow-sm sm:px-10",
        className,
      )}
    >
      <h2 className="text-xl font-semibold text-flash-text sm:text-2xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm text-flash-muted sm:text-base">
        {description}
      </p>
      <div className="mt-6 flex justify-center">
        <WhatsAppButton
          message={whatsappMessage}
          label={lang === "ar" ? "تواصل عبر WhatsApp" : "Contact via WhatsApp"}
        />
      </div>
    </section>
  );
}
