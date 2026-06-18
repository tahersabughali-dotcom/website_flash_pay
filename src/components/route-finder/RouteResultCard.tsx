import type { LanguageCode } from "@/types/common";
import type { RouteDefinition } from "@/types/route";
import { settingsData } from "@/data/settingsData";
import { ExecutionTypeBadge } from "@/components/shared/ExecutionTypeBadge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { RouteCTA } from "@/components/shared/RouteCTA";
import {
  getServicesBySlugs,
  resolveCountryLabel,
  resolvePaymentMethodLabel,
  resolveReceivingMethodLabel,
} from "@/lib/dataAccess";
import { getLocalized } from "@/lib/i18n";
import { getExecutionTypeDefinition } from "@/lib/routeFinder";
import {
  formatRouteFinderRequestMessage,
  buildWhatsAppUrlFromSettings,
} from "@/lib/whatsapp";
import type { RouteFinderFormState } from "./RouteFinderInteractive";

interface RouteResultCardProps {
  route: RouteDefinition;
  form: RouteFinderFormState;
  lang: LanguageCode;
}

export function RouteResultCard({ route, form, lang }: RouteResultCardProps) {
  const services = getServicesBySlugs(route.availableServiceSlugs);
  const execution = getExecutionTypeDefinition(route.executionType);

  const whatsappMessage = formatRouteFinderRequestMessage([
    { label: "From Country", value: resolveCountryLabel(route.fromCountrySlug, "en") },
    { label: "To Country", value: resolveCountryLabel(route.toCountrySlug, "en") },
    { label: "Currency", value: form.currency || undefined },
    { label: "Amount", value: form.amount || undefined },
    {
      label: "Receiving Method",
      value: form.receivingMethod
        ? resolveReceivingMethodLabel(form.receivingMethod, "en")
        : undefined,
    },
    {
      label: "Route",
      value: `${resolveCountryLabel(route.fromCountrySlug, "en")} → ${resolveCountryLabel(route.toCountrySlug, "en")}`,
    },
    {
      label: "Services",
      value: services.map((s) => getLocalized(s.title, "en")).join(", "),
    },
    { label: "Notes", value: route.notes ? getLocalized(route.notes, "en") : undefined },
  ]);

  const whatsappUrl = buildWhatsAppUrlFromSettings(
    settingsData.whatsappNumber,
    whatsappMessage,
  );

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-flash-text">
            {resolveCountryLabel(route.fromCountrySlug, lang)} →{" "}
            {resolveCountryLabel(route.toCountrySlug, lang)}
          </h3>
          <p className="mt-1 text-sm text-flash-muted">
            {execution
              ? getLocalized(execution.wordingHint, lang)
              : lang === "ar"
                ? "تنسيق عبر شبكة الشركاء"
                : "Coordination through partner network"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge
            status={route.status}
            label={lang === "ar" ? "متاح" : "Available"}
          />
          <ExecutionTypeBadge executionType={route.executionType} />
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <InfoBlock
          title={lang === "ar" ? "الخدمات" : "Services"}
          items={services.map((s) => getLocalized(s.title, lang))}
        />
        <InfoBlock title={lang === "ar" ? "العملات" : "Currencies"} items={route.currencies} />
        <InfoBlock
          title={lang === "ar" ? "طرق الدفع" : "Payment methods"}
          items={route.paymentMethods.map((m) => resolvePaymentMethodLabel(m, lang))}
        />
        <InfoBlock
          title={lang === "ar" ? "طرق الاستلام" : "Receiving methods"}
          items={route.receivingMethods.map((m) => resolveReceivingMethodLabel(m, lang))}
        />
      </div>

      {route.notes && (
        <p className="mt-4 rounded-xl bg-flash-surface px-4 py-3 text-sm text-flash-muted">
          {getLocalized(route.notes, lang)}
        </p>
      )}

      <div className="mt-5">
        <RouteCTA
          title={lang === "ar" ? "اطلب السعر عبر WhatsApp" : "Request price via WhatsApp"}
          whatsappMessage={whatsappMessage}
        />
        <a href={whatsappUrl} className="sr-only">
          WhatsApp
        </a>
      </div>
    </article>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-flash-muted">{title}</p>
      <p className="mt-2 text-sm text-flash-text">{items.join(" · ") || "—"}</p>
    </div>
  );
}
