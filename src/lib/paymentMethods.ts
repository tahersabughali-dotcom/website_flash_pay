import { globalPaymentMethodsData } from "@/data/globalPaymentMethodsData";
import { globalReceivingMethodsData } from "@/data/globalReceivingMethodsData";
import type { LanguageCode } from "@/types/common";
import type { GlobalCoverageStatus } from "@/types/globalCountry";
import type {
  GlobalPaymentMethod,
  GlobalReceivingMethod,
  PaymentMethodCategory,
} from "@/types/payment";
import { getLocalized } from "@/lib/i18n";

export function getAllGlobalPaymentMethods(): GlobalPaymentMethod[] {
  return [...globalPaymentMethodsData].sort((a, b) => a.order - b.order);
}

export function getAllGlobalReceivingMethods(): GlobalReceivingMethod[] {
  return [...globalReceivingMethodsData].sort((a, b) => a.order - b.order);
}

export function getGlobalPaymentMethodBySlug(slug: string): GlobalPaymentMethod | undefined {
  return globalPaymentMethodsData.find((m) => m.slug === slug);
}

export function getGlobalReceivingMethodBySlug(slug: string): GlobalReceivingMethod | undefined {
  return globalReceivingMethodsData.find((m) => m.slug === slug);
}

export function filterGlobalPaymentMethods(options: {
  category?: PaymentMethodCategory | "all";
  status?: GlobalCoverageStatus | "all";
  search?: string;
  lang?: LanguageCode;
}): GlobalPaymentMethod[] {
  const lang = options.lang ?? "ar";
  const query = options.search?.trim().toLowerCase() ?? "";

  return getAllGlobalPaymentMethods().filter((method) => {
    if (options.category && options.category !== "all" && method.category !== options.category) {
      return false;
    }
    if (options.status && options.status !== "all" && method.status !== options.status) return false;
    if (!query) return true;
    const title = getLocalized(method.title, lang).toLowerCase();
    const desc = getLocalized(method.description, lang).toLowerCase();
    return title.includes(query) || desc.includes(query) || method.slug.includes(query);
  });
}

export function filterGlobalReceivingMethods(options: {
  category?: PaymentMethodCategory | "all";
  status?: GlobalCoverageStatus | "all";
  search?: string;
  lang?: LanguageCode;
}): GlobalReceivingMethod[] {
  const lang = options.lang ?? "ar";
  const query = options.search?.trim().toLowerCase() ?? "";

  return getAllGlobalReceivingMethods().filter((method) => {
    if (options.category && options.category !== "all" && method.category !== options.category) {
      return false;
    }
    if (options.status && options.status !== "all" && method.status !== options.status) return false;
    if (!query) return true;
    const title = getLocalized(method.title, lang).toLowerCase();
    return title.includes(query) || method.slug.includes(query);
  });
}

export {
  GLOBAL_PAYMENT_METHOD_COUNT,
} from "@/data/globalPaymentMethodsData";
export {
  GLOBAL_RECEIVING_METHOD_COUNT,
} from "@/data/globalReceivingMethodsData";
