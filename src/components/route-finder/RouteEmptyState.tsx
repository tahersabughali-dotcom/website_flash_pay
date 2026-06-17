import type { LanguageCode } from "@/types/common";
import { EmptyState } from "@/components/shared/EmptyState";
import { RouteCTA } from "@/components/shared/RouteCTA";
import {
  resolveCountryLabel,
  resolveReceivingMethodLabel,
} from "@/lib/dataAccess";
import { formatRouteFinderRequestMessage } from "@/lib/whatsapp";
import type { RouteFinderFormState } from "./RouteFinderPage";

interface RouteEmptyStateProps {
  form: RouteFinderFormState;
  lang: LanguageCode;
}

export function RouteEmptyState({ form, lang }: RouteEmptyStateProps) {
  const whatsappMessage = formatRouteFinderRequestMessage([
    {
      label: "From Country",
      value: form.fromCountrySlug
        ? resolveCountryLabel(form.fromCountrySlug, "en")
        : undefined,
    },
    {
      label: "To Country",
      value: form.toCountrySlug
        ? resolveCountryLabel(form.toCountrySlug, "en")
        : undefined,
    },
    { label: "Currency", value: form.currency || undefined },
    { label: "Amount", value: form.amount || undefined },
    {
      label: "Receiving Method",
      value: form.receivingMethod
        ? resolveReceivingMethodLabel(form.receivingMethod, "en")
        : undefined,
    },
    {
      label: "Notes",
      value: "No matching route found on website. Please advise on availability.",
    },
  ]);

  return (
    <div className="space-y-4">
      <EmptyState
        title={
          lang === "ar"
            ? "لا يوجد مسار مطابق حالياً"
            : "No matching route found"
        }
        description={
          lang === "ar"
            ? "قد يكون المسار متاحاً عبر شبكة الشركاء — اسأل Flash Pay مباشرة."
            : "This route may still be available through our partner network — ask Flash Pay directly."
        }
      />
      <RouteCTA
        title={lang === "ar" ? "اسأل Flash Pay عن هذا المسار" : "Ask Flash Pay about this route"}
        whatsappMessage={whatsappMessage}
      />
    </div>
  );
}
