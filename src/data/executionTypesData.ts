import type { ExecutionTypeDefinition } from "@/types/execution";

export const executionTypesData: ExecutionTypeDefinition[] = [
  {
    id: "direct",
    label: { ar: "مباشر", en: "Direct" },
    description: {
      ar: "تنفيذ مباشر عبر Flash Pay",
      en: "Executed directly by Flash Pay",
    },
    wordingHint: {
      ar: "خدمة مباشرة من Flash Pay",
      en: "Direct Flash Pay service",
    },
  },
  {
    id: "partner",
    label: { ar: "شريك", en: "Partner" },
    description: {
      ar: "تنفيذ عبر مكتب شريك",
      en: "Executed through a partner office",
    },
    wordingHint: {
      ar: "عبر شبكة شركائنا",
      en: "Through our partner network",
    },
  },
  {
    id: "authorized_partner",
    label: { ar: "شريك معتمد", en: "Authorized Partner" },
    description: {
      ar: "عبر مكتب شريك معتمد حيثما توفر",
      en: "Through an authorized partner office where available",
    },
    wordingHint: {
      ar: "عبر مكاتب شركاء معتمدة حيثما توفرت",
      en: "Through authorized partner offices where available",
    },
  },
  {
    id: "referral",
    label: { ar: "إحالة", en: "Referral" },
    description: {
      ar: "إحالة أو توجيه إلى شريك موثوق",
      en: "Referral or guidance to a trusted partner",
    },
    wordingHint: {
      ar: "نساعدك في الوصول إلى نقاط خدمة موثوقة",
      en: "We help you access trusted service points",
    },
  },
  {
    id: "coordination",
    label: { ar: "تنسيق", en: "Coordination" },
    description: {
      ar: "تنسيق الخدمة عبر الشبكة",
      en: "Service coordination through the network",
    },
    wordingHint: {
      ar: "ننسق الخدمة عبر شركاء محليين ودوليين",
      en: "We coordinate services through local and international partners",
    },
  },
  {
    id: "liquidity_partner",
    label: { ar: "شريك سيولة", en: "Liquidity Partner" },
    description: {
      ar: "تعتمد على شركاء السيولة",
      en: "Depends on liquidity partners",
    },
    wordingHint: {
      ar: "التوفر يعتمد على شركاء السيولة",
      en: "Availability depends on liquidity partners",
    },
  },
  {
    id: "local_office_partner",
    label: { ar: "مكتب محلي", en: "Local Office" },
    description: {
      ar: "تنفيذ عبر مكتب شريك محلي",
      en: "Local partner office execution",
    },
    wordingHint: {
      ar: "عبر مكاتب شركاء محلية",
      en: "Through local partner offices",
    },
  },
  {
    id: "coming_soon",
    label: { ar: "قريباً", en: "Coming Soon" },
    description: {
      ar: "خدمة مستقبلية قيد التطوير",
      en: "Future service under development",
    },
    wordingHint: {
      ar: "قريباً — قيد التطوير",
      en: "Coming soon — under development",
    },
  },
];
