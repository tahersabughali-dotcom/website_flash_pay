import type { LocalizedString } from "@/types/common";

export interface TrustDocument {
  id: string;
  slug: string;
  title: LocalizedString;
  content: LocalizedString;
  status: "published" | "draft" | "hidden";
  order: number;
}

export const trustData: TrustDocument[] = [
  {
    id: "trust-official-channels",
    slug: "official-contact-channels",
    title: { ar: "قنوات التواصل الرسمية", en: "Official Contact Channels" },
    content: {
      ar: "تواصل فقط عبر أرقام وروابط المنصة الرسمية المنشورة في Trust Center. احذر الحسابات المزيفة.",
      en: "Contact only through official numbers and links published in Trust Center. Beware of fake accounts.",
    },
    status: "published",
    order: 1,
  },
  {
    id: "trust-anti-fraud",
    slug: "anti-fraud-notice",
    title: { ar: "تنبيه ضد الاحتيال", en: "Anti-Fraud Notice" },
    content: {
      ar: "لا ترسل أموالاً لأشخاص يدّعون تمثيل Flash Pay خارج القنوات الرسمية. تحقق دائماً قبل أي تحويل.",
      en: "Do not send money to anyone claiming to represent Flash Pay outside official channels. Always verify before any transfer.",
    },
    status: "published",
    order: 2,
  },
  {
    id: "trust-financial-disclaimer",
    slug: "financial-disclaimer",
    title: { ar: "إخلاء مسؤولية مالية", en: "Financial Disclaimer" },
    content: {
      ar: "المحتوى والأسعار المعروضة لأغراض معلوماتية. لا تُعد نصيحة مالية أو ضماناً لسعر نهائي.",
      en: "Content and displayed rates are informational. They are not financial advice or a guarantee of final pricing.",
    },
    status: "published",
    order: 3,
  },
  {
    id: "trust-risk-warning",
    slug: "risk-warning",
    title: { ar: "تحذير مخاطر", en: "Risk Warning" },
    content: {
      ar: "العملات والUSDT والتحويلات تنطوي على مخاطر. تأكد من فهمك للخدمة قبل المتابعة.",
      en: "Currencies, USDT, and transfers involve risks. Ensure you understand the service before proceeding.",
    },
    status: "published",
    order: 4,
  },
  {
    id: "trust-partner-disclaimer",
    slug: "partner-network-disclaimer",
    title: { ar: "إخلاء مسؤولية شبكة الشركاء", en: "Partner Network Disclaimer" },
    content: {
      ar: "بعض الخدمات تُنسق عبر شركاء. Flash Pay لا تدّعي امتلاك كل ترخيص أو وكالة عالمية مباشرة.",
      en: "Some services are coordinated through partners. Flash Pay does not claim to hold every license or direct global agency.",
    },
    status: "published",
    order: 5,
  },
  {
    id: "trust-no-authorization",
    slug: "no-unsupported-authorization",
    title: { ar: "لا ادعاءات ترخيص غير مدعومة", en: "No Unsupported Authorization Claims" },
    content: {
      ar: "لا ندّعي أننا وكيل Western Union أو MoneyGram أو PayPal أو Wise أو Payoneer أو Stripe مباشر ما لم يُؤكد قانونياً.",
      en: "We do not claim to be a direct Western Union, MoneyGram, PayPal, Wise, Payoneer, or Stripe agent unless legally confirmed.",
    },
    status: "published",
    order: 6,
  },
  {
    id: "trust-privacy",
    slug: "privacy-commitment",
    title: { ar: "التزام الخصوصية", en: "Privacy Commitment" },
    content: {
      ar: "نلتزم بعدم جمع بيانات حساسة غير ضرورية. سياسة الخصوصية الكاملة ستُنشر في Trust Center.",
      en: "We commit to not collecting unnecessary sensitive data. Full privacy policy will be published in Trust Center.",
    },
    status: "published",
    order: 7,
  },
  {
    id: "trust-safe-communication",
    slug: "safe-communication-notice",
    title: { ar: "تواصل آمن", en: "Safe Communication Notice" },
    content: {
      ar: "استخدم WhatsApp والبريد الرسمي فقط. لا تشارك كلمات مرور أو رموز تحقق مع أي طرف.",
      en: "Use official WhatsApp and email only. Do not share passwords or verification codes with anyone.",
    },
    status: "published",
    order: 8,
  },
];
