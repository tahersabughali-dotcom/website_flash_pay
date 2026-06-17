import Link from "next/link";
import { settingsData } from "@/data/settingsData";
import { socialLinksData } from "@/data/socialLinksData";
import { getLocalized } from "@/lib/i18n";
import { buildWhatsAppUrlFromSettings } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface OfficialChannelsBoxProps {
  className?: string;
}

export function OfficialChannelsBox({ className }: OfficialChannelsBoxProps) {
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
      label: lang === "ar" ? "البريد الرسمي" : "Official email",
      value: settingsData.email,
      href: `mailto:${settingsData.email}`,
    },
  ];

  return (
    <div
      className={cn(
        "rounded-2xl border border-flash-primary/20 bg-flash-primary-light p-6",
        className,
      )}
    >
      <h3 className="text-lg font-semibold text-flash-text">
        {lang === "ar" ? "القنوات الرسمية" : "Official channels"}
      </h3>
      <p className="mt-2 text-sm text-flash-muted">
        {lang === "ar"
          ? "تواصل فقط عبر هذه القنوات. احذر الحسابات المزيفة."
          : "Contact only through these channels. Beware of fake accounts."}
      </p>

      <ul className="mt-5 space-y-3">
        {channels.map((channel) => (
          <li key={channel.label} className="rounded-xl bg-white px-4 py-3">
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
        <div className="mt-5 flex flex-wrap gap-3">
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
      )}
    </div>
  );
}
