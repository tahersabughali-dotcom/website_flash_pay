import Link from "next/link";
import { settingsData } from "@/data/settingsData";
import { socialLinksData } from "@/data/socialLinksData";
import { ContactValue } from "@/components/shared/ContactValue";
import { getLocalized } from "@/lib/i18n";
import { buildWhatsAppUrlFromSettings } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface ContactChannelsProps {
  className?: string;
}

export function ContactChannels({ className }: ContactChannelsProps) {
  const lang = settingsData.defaultLanguage;
  const activeSocial = socialLinksData.filter((link) => link.status === "active");

  const channels = [
    {
      label: lang === "ar" ? "WhatsApp الرسمي" : "Official WhatsApp",
      value: settingsData.whatsappNumber,
      href: buildWhatsAppUrlFromSettings(
        settingsData.whatsappNumber,
        lang === "ar" ? "مرحباً" : "Hello",
      ),
    },
    {
      label: lang === "ar" ? "الموقع الرسمي" : "Official website",
      value: settingsData.websiteUrl.replace(/^https?:\/\//, ""),
      href: settingsData.websiteUrl,
    },
    {
      label: lang === "ar" ? "البريد الإلكتروني" : "Email",
      value: settingsData.email,
      href: `mailto:${settingsData.email}`,
    },
    {
      label: lang === "ar" ? "أوقات الدعم" : "Support hours",
      value: getLocalized(settingsData.supportHours, lang),
    },
  ];

  return (
    <div className={cn("rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6", className)}>
      <h2 className="text-lg font-semibold text-flash-text">
        {lang === "ar" ? "قنوات التواصل" : "Contact channels"}
      </h2>
      <ul className="mt-4 space-y-3.5">
        {channels.map((channel) => (
          <li key={channel.label}>
            <p className="text-xs font-medium text-flash-muted">{channel.label}</p>
            {channel.href ? (
              <ContactValue value={channel.value} href={channel.href} />
            ) : (
              <p className="mt-1 text-sm text-flash-text">{channel.value}</p>
            )}
          </li>
        ))}
      </ul>

      {activeSocial.length > 0 && (
        <div className="mt-5 border-t border-slate-100 pt-4">
          <p className="text-xs font-medium text-flash-muted">
            {lang === "ar" ? "وسائل التواصل" : "Social links"}
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            {activeSocial.map((link) => (
              <Link
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-flash-primary hover:underline"
              >
                {getLocalized(link.label, lang)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
