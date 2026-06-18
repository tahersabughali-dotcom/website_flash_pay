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
        eyebrow={lang === "ar" ? "تواصل معنا" : "Contact"}
        title={lang === "ar" ? "تواصل رسمي مع Flash Pay" : "Official Flash Pay contact"}
        subtitle={
          lang === "ar"
            ? "استخدم القنوات الرسمية فقط — واحذر الحسابات المزيفة."
            : "Use official channels only — beware of fake accounts."
        }
      >
        <WhatsAppButton
          label={lang === "ar" ? "WhatsApp الرسمي" : "Official WhatsApp"}
        />
      </PageHero>

      <div className="mt-6">
        <ContactTrustNotice lang={lang} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr] lg:gap-8">
        <ContactChannels />
        <ContactForm lang={lang} />
      </div>
    </div>
  );
}
