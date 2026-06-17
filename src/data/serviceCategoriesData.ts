import type { LocalizedString } from "@/types/common";
import type { ServiceCategory } from "@/types/service";

export const serviceCategoriesData: {
  id: ServiceCategory | "all";
  label: LocalizedString;
}[] = [
  { id: "all", label: { ar: "الكل", en: "All" } },
  { id: "individual", label: { ar: "أفراد", en: "Individual" } },
  { id: "business", label: { ar: "تجاري", en: "Business" } },
  { id: "crypto", label: { ar: "USDT / Crypto", en: "USDT / Crypto" } },
  { id: "digital_platform", label: { ar: "منصات رقمية", en: "Digital Platforms" } },
  { id: "country", label: { ar: "دول", en: "Country" } },
  { id: "partner_network", label: { ar: "شبكة الشركاء", en: "Partner Network" } },
  { id: "future", label: { ar: "مستقبلي", en: "Future" } },
];
