import Link from "next/link";
import type { LanguageCode } from "@/types/common";
import type { Service } from "@/types/service";
import { getLocalized } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";

const iconMap: Record<string, string> = {
  globe: "🌍",
  cash: "💵",
  bank: "🏦",
  wallet: "👛",
  crypto: "₮",
  exchange: "↔️",
  paypal: "P",
  wise: "W",
  payoneer: "Po",
  stripe: "S",
  business: "💼",
  china: "🇨🇳",
  turkey: "🇹🇷",
  network: "🔗",
  chart: "📈",
};

interface ServiceCardProps {
  service: Service;
  lang: LanguageCode;
  className?: string;
}

export function ServiceCard({ service, lang, className }: ServiceCardProps) {
  const icon = service.icon ? iconMap[service.icon] ?? "•" : "•";

  return (
    <Link
      href={service.route}
      className={cn(
        "group flex h-full flex-col flash-card-interactive p-5",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-flash-primary-light text-lg">
          {icon}
        </span>
        {service.status === "coming_soon" && (
          <StatusBadge
            status="coming_soon"
            label={lang === "ar" ? "قريباً" : "Soon"}
          />
        )}
      </div>
      <h3 className="mt-4 font-semibold text-flash-text group-hover:text-flash-primary">
        {getLocalized(service.title, lang)}
      </h3>
      <p className="mt-2 line-clamp-2 flex-1 text-sm text-flash-muted">
        {getLocalized(service.shortDescription, lang)}
      </p>
    </Link>
  );
}
