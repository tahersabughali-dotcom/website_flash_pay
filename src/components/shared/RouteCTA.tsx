import Link from "next/link";
import { settingsData } from "@/data/settingsData";
import { WhatsAppButton } from "./WhatsAppButton";
import { cn } from "@/lib/utils";

interface RouteCTAProps {
  title: string;
  description?: string;
  whatsappMessage: string;
  className?: string;
}

export function RouteCTA({
  title,
  whatsappMessage,
  className,
}: RouteCTAProps) {
  const lang = settingsData.defaultLanguage;

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <WhatsAppButton message={whatsappMessage} label={title} />
      <Link
        href="/request"
        className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-flash-muted transition hover:border-flash-primary hover:text-flash-primary"
      >
        {lang === "ar" ? "مركز الطلبات" : "Request Center"}
      </Link>
    </div>
  );
}
