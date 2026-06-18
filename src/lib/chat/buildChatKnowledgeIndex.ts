import { articlesData } from "@/data/articlesData";
import { chatAnswerTemplates } from "@/data/chatAnswerTemplates";
import { businessData } from "@/data/businessData";
import { chatData } from "@/data/chatData";
import { chatKnowledgeData } from "@/data/chatKnowledgeData";
import { comingSoonData } from "@/data/comingSoonData";
import { countriesData } from "@/data/countriesData";
import { globalCurrenciesData } from "@/data/globalCurrenciesData";
import { marketAnalysisData } from "@/data/marketsData";
import { partnerNetworkData } from "@/data/partnerNetworkData";
import { paymentMethodsData } from "@/data/paymentMethodsData";
import { receivingMethodsData } from "@/data/receivingMethodsData";
import { requestTypesData } from "@/data/requestTypesData";
import { routeFinderData } from "@/data/routeFinderData";
import { servicesData } from "@/data/servicesData";
import { settingsData } from "@/data/settingsData";
import { trustData } from "@/data/trustData";
import type { ChatKnowledgeIndexEntry } from "@/types/chat";
import type { LanguageCode } from "@/types/common";
import { getLocalized } from "@/lib/i18n";

let cachedIndex: ChatKnowledgeIndexEntry[] | null = null;

function mergeKeywords(
  base: { ar: string[]; en: string[] },
  extra: { ar: string[]; en: string[] },
): { ar: string[]; en: string[] } {
  return {
    ar: [...new Set([...base.ar, ...extra.ar])],
    en: [...new Set([...base.en, ...extra.en])],
  };
}

function legacyKnowledgeEntries(): ChatKnowledgeIndexEntry[] {
  const legacyLinks: Record<string, string[]> = {
    "kb-buy-usdt": ["/request", "/services/buy-usdt"],
    "kb-sell-usdt": ["/request", "/services/sell-usdt"],
    "kb-business": ["/business", "/request"],
    "kb-transfers": ["/request", "/route-finder"],
    "kb-trust": ["/trust", "/contact"],
  };

  return chatData.safeKnowledgeBase.map((entry) => ({
    id: entry.id,
    category: entry.id.includes("usdt")
      ? "usdt"
      : entry.id.includes("market")
        ? "markets"
        : entry.id.includes("trust") || entry.id.includes("contact")
          ? "trust"
          : entry.id.includes("route")
            ? "navigation"
            : entry.id.includes("wallet") || entry.id.includes("trade")
              ? "coming_soon"
              : entry.id.includes("business")
                ? "business"
                : entry.id.includes("partner")
                  ? "partners"
                  : entry.id.includes("countr")
                    ? "countries"
                    : "general",
    title: {
      ar: entry.answer.ar.slice(0, 48),
      en: entry.answer.en.slice(0, 48),
    },
    answer: entry.answer,
    keywords: entry.keywords,
    relatedLinks: legacyLinks[entry.id] ?? ["/request"],
    priority: entry.sensitive ? 3 : 5,
    safetyLevel: entry.sensitive ? "sensitive" : "safe",
    suggestedActions: entry.sensitive ? ["whatsapp"] : ["request", "whatsapp"],
  }));
}

function buildServiceEntries(): ChatKnowledgeIndexEntry[] {
  return servicesData
    .filter((service) => service.status === "active")
    .map((service) => {
      const category =
        service.slug.includes("usdt") || service.tags?.includes("usdt")
          ? "usdt"
          : service.slug.includes("paypal") ||
              service.slug.includes("wise") ||
              service.slug.includes("payoneer") ||
              service.slug.includes("stripe")
            ? "digital_platforms"
            : service.category === "business"
              ? "business"
              : "transfers";

      return {
        id: `dyn-svc-${service.slug}`,
        category,
        title: service.title,
        answer: service.fullDescription ?? service.shortDescription,
        keywords: mergeKeywords(
          {
            ar: [service.slug.replace(/-/g, " "), getLocalized(service.title, "ar")],
            en: [service.slug.replace(/-/g, " "), getLocalized(service.title, "en")],
          },
          {
            ar: service.tags ?? [],
            en: service.tags ?? [],
          },
        ),
        relatedLinks: [service.route, "/request"],
        priority: service.isFeatured ? 8 : 6,
        safetyLevel: "safe" as const,
        suggestedActions:
          category === "business"
            ? (["business", "request", "whatsapp"] as const)
            : (["request", "whatsapp", "services"] as const),
      };
    });
}

function buildCountryEntries(): ChatKnowledgeIndexEntry[] {
  return countriesData
    .filter((country) => country.status === "active")
    .map((country) => {
      const nameAr = getLocalized(country.name, "ar");
      const nameEn = getLocalized(country.name, "en");
      const servicesList = country.availableServices?.slice(0, 4).join(", ") ?? "";

      return {
        id: `dyn-country-${country.slug}`,
        category: "countries" as const,
        title: { ar: `خدمات ${nameAr}`, en: `Services in ${nameEn}` },
        answer: {
          ar: `${nameAr}: ${getLocalized(country.partnerCoverage ?? country.notes ?? country.seoDescription, "ar")}\nخدمات متاحة (مثال): ${servicesList}.\nراجع ${country.route}`,
          en: `${nameEn}: ${getLocalized(country.partnerCoverage ?? country.notes ?? country.seoDescription, "en")}\nSample services: ${servicesList}.\nSee ${country.route}`,
        },
        keywords: {
          ar: [nameAr, country.slug, ...(country.region ? [getLocalized(country.region, "ar")] : [])],
          en: [nameEn, country.slug, ...(country.region ? [getLocalized(country.region, "en")] : [])],
        },
        relatedLinks: [country.route, "/countries", "/route-finder"],
        priority: country.isFeatured ? 9 : 7,
        safetyLevel: "safe" as const,
        suggestedActions: ["countries", "request", "route_finder", "whatsapp"] as const,
      };
    });
}

function buildBusinessEntries(): ChatKnowledgeIndexEntry[] {
  return businessData
    .filter((item) => item.status === "active")
    .map((item) => ({
      id: `dyn-biz-${item.slug}`,
      category: "business" as const,
      title: item.title,
      answer: item.description,
      keywords: {
        ar: [item.slug.replace(/-/g, " "), getLocalized(item.title, "ar")],
        en: [item.slug.replace(/-/g, " "), getLocalized(item.title, "en")],
      },
      relatedLinks: ["/business", "/request"],
      priority: 7,
      safetyLevel: "safe" as const,
      suggestedActions: ["business", "request", "whatsapp"] as const,
    }));
}

function buildPartnerEntries(): ChatKnowledgeIndexEntry[] {
  return partnerNetworkData
    .filter((entry) => entry.status === "active")
    .map((entry) => ({
      id: `dyn-partner-${entry.slug}`,
      category: "partners" as const,
      title: entry.title,
      answer: entry.description,
      keywords: {
        ar: [entry.slug.replace(/-/g, " "), getLocalized(entry.title, "ar"), entry.type],
        en: [entry.slug.replace(/-/g, " "), getLocalized(entry.title, "en"), entry.type],
      },
      relatedLinks: ["/network", "/partners"],
      priority: 6,
      safetyLevel: "safe" as const,
      suggestedActions: ["contact", "whatsapp"] as const,
    }));
}

function buildTrustEntries(): ChatKnowledgeIndexEntry[] {
  return trustData
    .filter((doc) => doc.status === "published")
    .map((doc) => ({
      id: `dyn-trust-${doc.slug}`,
      category: "trust" as const,
      title: doc.title,
      answer: doc.content,
      keywords: {
        ar: [doc.slug.replace(/-/g, " "), getLocalized(doc.title, "ar")],
        en: [doc.slug.replace(/-/g, " "), getLocalized(doc.title, "en")],
      },
      relatedLinks: ["/trust"],
      priority: 7,
      safetyLevel: "safe" as const,
      suggestedActions: ["trust", "whatsapp"] as const,
    }));
}

function buildMarketsEntry(): ChatKnowledgeIndexEntry[] {
  const disclaimer =
    marketAnalysisData[0]?.content ?? {
      ar: "Flash Markets — معلومات إرشادية فقط. للأسعار التنفيذية اطلب عبر WhatsApp.",
      en: "Flash Markets — indicative information only. Request execution rates via WhatsApp.",
    };

  return [
    {
      id: "dyn-markets-disclaimer",
      category: "markets",
      title: { ar: "Flash Markets", en: "Flash Markets" },
      answer: disclaimer,
      keywords: {
        ar: ["markets", "سوق", "أسعار", "live price"],
        en: ["markets", "market rates", "indicative"],
      },
      relatedLinks: ["/markets"],
      priority: 6,
      safetyLevel: "sensitive",
      suggestedActions: ["markets", "whatsapp"],
    },
  ];
}

function buildComingSoonEntries(): ChatKnowledgeIndexEntry[] {
  return comingSoonData.map((feature) => ({
    id: `dyn-cs-${feature.slug}`,
    category: "coming_soon" as const,
    title: feature.title,
    answer: feature.description,
    keywords: {
      ar: [feature.slug, getLocalized(feature.title, "ar"), "قريبًا"],
      en: [feature.slug, getLocalized(feature.title, "en"), "coming soon"],
    },
    relatedLinks: [feature.route],
    priority: 7,
    safetyLevel: "safe" as const,
    suggestedActions: ["request", "whatsapp"] as const,
  }));
}

function buildRouteEntries(): ChatKnowledgeIndexEntry[] {
  return routeFinderData
    .filter((route) => route.status === "active")
    .slice(0, 8)
    .map((route) => ({
      id: `dyn-route-${route.slug}`,
      category: "transfers" as const,
      title: {
        ar: `مسار ${route.fromCountrySlug} → ${route.toCountrySlug}`,
        en: `Route ${route.fromCountrySlug} → ${route.toCountrySlug}`,
      },
      answer: route.notes ?? {
        ar: "مسار متاح — اطلب السعر عبر WhatsApp.",
        en: "Available route — request price via WhatsApp.",
      },
      keywords: {
        ar: [route.fromCountrySlug, route.toCountrySlug, route.slug.replace(/-/g, " "), "مسار", "حوالة"],
        en: [route.fromCountrySlug, route.toCountrySlug, route.slug, "route", "transfer"],
      },
      relatedLinks: ["/route-finder", "/request"],
      priority: 7,
      safetyLevel: "safe" as const,
      suggestedActions: ["route_finder", "whatsapp", "request"] as const,
    }));
}

function buildRequestTypeEntries(): ChatKnowledgeIndexEntry[] {
  return requestTypesData
    .filter((type) => type.status === "active")
    .slice(0, 12)
    .map((type) => ({
      id: `dyn-req-${type.slug}`,
      category: "general" as const,
      title: type.title,
      answer: type.description,
      keywords: {
        ar: [type.slug.replace(/-/g, " "), getLocalized(type.title, "ar")],
        en: [type.slug.replace(/-/g, " "), getLocalized(type.title, "en")],
      },
      relatedLinks: ["/request"],
      priority: 5,
      safetyLevel: "safe" as const,
      suggestedActions: ["request", "whatsapp"] as const,
    }));
}

function buildPaymentMethodEntries(): ChatKnowledgeIndexEntry[] {
  return paymentMethodsData
    .filter((method) => method.status === "active")
    .map((method) => ({
      id: `dyn-pm-${method.slug}`,
      category: "payment_methods" as const,
      title: method.title,
      answer: {
        ar: `${getLocalized(method.title, "ar")} — متاح حسب الدولة والخدمة. راجع /request أو WhatsApp.`,
        en: `${getLocalized(method.title, "en")} — available by country and service. See /request or WhatsApp.`,
      },
      keywords: {
        ar: [method.slug.replace(/-/g, " "), getLocalized(method.title, "ar")],
        en: [method.slug.replace(/-/g, " "), getLocalized(method.title, "en")],
      },
      relatedLinks: ["/request", "/services", "/payment-methods"],
      priority: 5,
      safetyLevel: "safe" as const,
      suggestedActions: ["request", "countries"] as const,
    }));
}

function buildReceivingMethodEntries(): ChatKnowledgeIndexEntry[] {
  return receivingMethodsData
    .filter((method) => method.status === "active")
    .map((method) => ({
      id: `dyn-rm-${method.slug}`,
      category: "transfers" as const,
      title: method.title,
      answer: {
        ar: `${getLocalized(method.title, "ar")} — طريقة استلام حسب الدولة والتوفر.`,
        en: `${getLocalized(method.title, "en")} — receiving method by country and availability.`,
      },
      keywords: {
        ar: [method.slug.replace(/-/g, " "), getLocalized(method.title, "ar")],
        en: [method.slug.replace(/-/g, " "), getLocalized(method.title, "en")],
      },
      relatedLinks: ["/request", "/countries", "/payment-methods"],
      priority: 5,
      safetyLevel: "safe" as const,
      suggestedActions: ["request", "countries"] as const,
    }));
}

function buildCurrencyEntries(): ChatKnowledgeIndexEntry[] {
  return globalCurrenciesData.slice(0, 40).map((currency) => ({
    id: `dyn-currency-${currency.code.toLowerCase()}`,
    category: "markets" as const,
    title: currency.name,
    answer: {
      ar: `${currency.code} — ${getLocalized(currency.notes, "ar")} راجع /currencies.`,
      en: `${currency.code} — ${getLocalized(currency.notes, "en")} See /currencies.`,
    },
    keywords: {
      ar: [currency.code.toLowerCase(), getLocalized(currency.name, "ar"), "عملة"],
      en: [currency.code.toLowerCase(), getLocalized(currency.name, "en"), "currency"],
    },
    relatedLinks: ["/currencies", "/request"],
    priority: currency.isFeatured ? 7 : 4,
    safetyLevel: "safe" as const,
    suggestedActions: ["whatsapp", "request"] as const,
  }));
}

function buildArticleEntries(): ChatKnowledgeIndexEntry[] {
  return articlesData
    .filter((article) => article.status === "published")
    .slice(0, 10)
    .map((article) => ({
      id: `dyn-article-${article.slug}`,
      category: "navigation" as const,
      title: article.title,
      answer: article.excerpt,
      keywords: {
        ar: [article.slug.replace(/-/g, " "), getLocalized(article.title, "ar")],
        en: [article.slug.replace(/-/g, " "), getLocalized(article.title, "en")],
      },
      relatedLinks: [`/academy/${article.slug}`, "/academy"],
      priority: 4,
      safetyLevel: "safe" as const,
      suggestedActions: ["academy"] as const,
    }));
}

function buildSettingsEntry(): ChatKnowledgeIndexEntry[] {
  return [
    {
      id: "dyn-settings-official",
      category: "trust",
      title: { ar: "Flash Pay الرسمية", en: "Official Flash Pay" },
      answer: {
        ar: `الموقع الرسمي: ${settingsData.websiteUrl}\nWhatsApp الرسمي: ${settingsData.whatsappNumber}\nتحقق دائمًا من مركز الثقة قبل أي تحويل.`,
        en: `Official website: ${settingsData.websiteUrl}\nOfficial WhatsApp: ${settingsData.whatsappNumber}\nAlways verify via Trust Center before any transfer.`,
      },
      keywords: {
        ar: ["flash pay", "رسمي", "موقع", settingsData.websiteUrl],
        en: ["flash pay", "official", "website"],
      },
      relatedLinks: ["/trust", "/contact"],
      priority: 10,
      safetyLevel: "safe",
      suggestedActions: ["trust", "contact", "whatsapp"],
    },
  ];
}

/** Build searchable knowledge index from website data + curated entries */
export function buildChatKnowledgeIndex(): ChatKnowledgeIndexEntry[] {
  if (cachedIndex) return cachedIndex;

  const merged = new Map<string, ChatKnowledgeIndexEntry>();

  const allEntries = [
    ...chatKnowledgeData,
    ...legacyKnowledgeEntries(),
    ...buildServiceEntries(),
    ...buildCountryEntries(),
    ...buildBusinessEntries(),
    ...buildPartnerEntries(),
    ...buildTrustEntries(),
    ...buildMarketsEntry(),
    ...buildComingSoonEntries(),
    ...buildRouteEntries(),
    ...buildRequestTypeEntries(),
    ...buildPaymentMethodEntries(),
    ...buildReceivingMethodEntries(),
    ...buildCurrencyEntries(),
    ...buildArticleEntries(),
    ...buildSettingsEntry(),
  ];

  for (const entry of allEntries) {
    const existing = merged.get(entry.id);
    if (!existing || entry.priority > existing.priority) {
      merged.set(entry.id, entry);
    }
  }

  cachedIndex = [...merged.values()].sort((a, b) => b.priority - a.priority);
  return cachedIndex;
}

export function getKnowledgeEntryById(id: string): ChatKnowledgeIndexEntry | undefined {
  return buildChatKnowledgeIndex().find((entry) => entry.id === id);
}

export function searchKnowledgeIndex(
  text: string,
  lang: LanguageCode,
  preferredIds?: string[],
): ChatKnowledgeIndexEntry | null {
  const normalized = text.trim().toLowerCase();
  if (!normalized) return null;

  let best: ChatKnowledgeIndexEntry | null = null;
  let bestScore = 0;

  for (const entry of buildChatKnowledgeIndex()) {
    let score = 0;
    const keywords = [...entry.keywords.ar, ...entry.keywords.en];

    for (const keyword of keywords) {
      const key = keyword.toLowerCase();
      if (key.length < 2) continue;
      if (normalized.includes(key)) {
        score += key.length > 4 ? 3 : 2;
      }
    }

    score += entry.priority * 0.1;

    if (preferredIds?.includes(entry.id)) {
      score += 5;
    }

    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore >= 2 ? best : null;
}

export function formatKnowledgeAnswer(
  entry: ChatKnowledgeIndexEntry,
  lang: LanguageCode,
): string {
  const parts: string[] = [];
  parts.push(getLocalized(entry.answer, lang));

  const needed = entry.neededInfo ? getLocalized(entry.neededInfo, lang) : null;
  if (needed) {
    parts.push("");
    parts.push(needed);
  }

  if (entry.relatedLinks.length > 0) {
    parts.push("");
    parts.push(
      lang === "ar"
        ? `روابط مفيدة: ${entry.relatedLinks.join(" · ")}`
        : `Helpful links: ${entry.relatedLinks.join(" · ")}`,
    );
  }

  if (entry.suggestedActions?.includes("whatsapp")) {
    parts.push("");
    parts.push(getLocalized(chatAnswerTemplates.whatsappOfficial, lang));
  }

  return parts.join("\n");
}

/** Reset cache — useful in tests */
export function resetChatKnowledgeIndexCache(): void {
  cachedIndex = null;
}
