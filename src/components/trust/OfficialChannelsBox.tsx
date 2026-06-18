import Link from "next/link";
import { settingsData } from "@/data/settingsData";
import { socialLinksData } from "@/data/socialLinksData";
import { ContactValue } from "@/components/shared/ContactValue";
import { getLocalized } from "@/lib/i18n";
import { buildWhatsAppUrlFromSettings } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface OfficialChannelsBoxProps {
  className?: string;
  compact?: boolean;
}

export function OfficialChannelsBox({ className, compact }: OfficialChannelsBoxProps) {
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
      label: lang === "ar" ? "البريد الرسمي" : "Official email",
      value: settingsData.email,
      href: `mailto:${settingsData.email}`,
    },
  ];

  return (
    <div
      className={cn(
        "rounded-2xl border border-flash-primary/15 bg-flash-primary-light/80",
        compact ? "p-4 sm:p-5" : "p-5 sm:p-6",
        className,
      )}
    >
      <h3 className="text-base font-semibold text-flash-text sm:text-lg">
        {lang === "ar" ? "القنوات الرسمية" : "Official channels"}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-flash-muted">
        {lang === "ar"
          ? "تواصل فقط عبر هذه القنوات. احذر الحسابات المزيفة."
          : "Contact only through these channels. Beware of fake accounts."}
      </p>

      <ul className="mt-4 space-y-2">
        {channels.map((channel) => (
          <li key={channel.label} className="rounded-xl bg-white px-3 py-2.5 sm:px-4 sm:py-3">
            <p className="text-xs font-medium text-flash-muted">{channel.label}</p>
            <ContactValue value={channel.value} href={channel.href} />
          </li>
        ))}
      </ul>

      {activeSocial.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2.5">
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
