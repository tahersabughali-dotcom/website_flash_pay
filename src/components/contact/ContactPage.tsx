import { settingsData } from "@/data/settingsData";
import { PageHero } from "@/components/shared/PageHero";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { ContactChannels } from "./ContactChannels";
import { ContactForm } from "./ContactForm";
import { ContactTrustNotice } from "./ContactTrustNotice";

export function ContactPage() {
  const lang = settingsData.defaultLanguage;

  return (
    <div className="flash-page-wrap">
      <PageHero
        eyebrow={lang === "ar" ? "Contact" : "Contact"}
        title={lang === "ar" ? "تواصل رسمي مع Flash Pay" : "Official Flash Pay contact"}
        subtitle={
          lang === "ar"
            ? "استخدم القنوات الرسمية فقط — احذر الحسابات المزيفة."
            : "Use official channels only — beware of fake accounts."
        }
      >
        <WhatsAppButton
          label={lang === "ar" ? "WhatsApp الرسمي" : "Official WhatsApp"}
        />
      </PageHero>

      <div className="mt-8">
        <ContactTrustNotice lang={lang} />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[360px_1fr]">
        <ContactChannels />
        <ContactForm lang={lang} />
      </div>
    </div>
  );
}
