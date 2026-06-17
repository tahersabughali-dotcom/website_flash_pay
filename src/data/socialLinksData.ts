import { settingsData } from "./settingsData";
import type { LocalizedString } from "@/types/common";

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  label: LocalizedString;
  status: "active" | "hidden";
  order: number;
}

/** Social links — URLs mirror settingsData; hidden when URL empty or invalid */
const whatsappDigits = settingsData.whatsappNumber.replace(/\D/g, "");
const hasWhatsApp = whatsappDigits.length >= 8;

export const socialLinksData: SocialLink[] = [
  {
    id: "social-whatsapp",
    platform: "whatsapp",
    url: `https://wa.me/${whatsappDigits || "0"}`,
    label: { ar: "WhatsApp", en: "WhatsApp" },
    status: hasWhatsApp ? "active" : "hidden",
    order: 1,
  },
  {
    id: "social-facebook",
    platform: "facebook",
    url: settingsData.facebookUrl || "#",
    label: { ar: "Facebook", en: "Facebook" },
    status: settingsData.facebookUrl ? "active" : "hidden",
    order: 2,
  },
  {
    id: "social-instagram",
    platform: "instagram",
    url: settingsData.instagramUrl || "#",
    label: { ar: "Instagram", en: "Instagram" },
    status: settingsData.instagramUrl ? "active" : "hidden",
    order: 3,
  },
  {
    id: "social-telegram",
    platform: "telegram",
    url: settingsData.telegramUrl || "#",
    label: { ar: "Telegram", en: "Telegram" },
    status: settingsData.telegramUrl ? "active" : "hidden",
    order: 4,
  },
  {
    id: "social-email",
    platform: "email",
    url: `mailto:${settingsData.email}`,
    label: { ar: "البريد الإلكتروني", en: "Email" },
    status: "active",
    order: 5,
  },
];
