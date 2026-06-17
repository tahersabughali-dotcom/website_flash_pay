import Link from "next/link";
import { settingsData } from "@/data/settingsData";
import { socialLinksData } from "@/data/socialLinksData";
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
      value: settingsData.websiteUrl,
      href: settingsData.websiteUrl,
    },
    {
      label: lang === "ar" ? "البريد الإلكتروني" : "Email",
      value: settingsData.email,
      href: `mailto:${settingsData.email}`,
    },
  ];

  return (
    <div className={cn("rounded-2xl border border-slate-200 bg-white p-6 shadow-sm", className)}>
      <h2 className="text-lg font-semibold text-flash-text">
        {lang === "ar" ? "قنوات التواصل" : "Contact channels"}
      </h2>
      <ul className="mt-5 space-y-4">
        {channels.map((channel) => (
          <li key={channel.label}>
            <p className="text-xs font-medium uppercase tracking-wide text-flash-muted">
              {channel.label}
            </p>
            <a
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="mt-1 block text-sm font-medium text-flash-primary hover:underline"
            >
              {channel.value}
            </a>
          </li>
        ))}
      </ul>

      {activeSocial.length > 0 && (
        <div className="mt-6 border-t border-slate-100 pt-5">
          <p className="text-xs font-medium uppercase tracking-wide text-flash-muted">
            {lang === "ar" ? "وسائل التواصل" : "Social links"}
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
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
