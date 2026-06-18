import { settingsData } from "./settingsData";
import type { LegalFooterLink, LegalPageContent, LegalPageKey } from "@/types/legal";

const LAST_UPDATED = "2026-06-17";
const WHATSAPP = settingsData.whatsappNumber;

export const legalFooterLinks: LegalFooterLink[] = [
  { href: "/privacy-policy", label: { ar: "سياسة الخصوصية", en: "Privacy Policy" } },
  { href: "/terms", label: { ar: "الشروط", en: "Terms" } },
  { href: "/risk-disclaimer", label: { ar: "تحذير المخاطر", en: "Risk Disclaimer" } },
  { href: "/security", label: { ar: "الأمان", en: "Security" } },
];

const privacyPolicyPage: LegalPageContent = {
  key: "privacy-policy",
  path: "/privacy-policy",
  title: { ar: "سياسة الخصوصية", en: "Privacy Policy" },
  subtitle: {
    ar: "كيف نتعامل مع المعلومات التي تشاركها مع Flash Pay عبر الموقع والقنوات الرسمية.",
    en: "How Flash Pay handles information you share through the website and official channels.",
  },
  lastUpdated: LAST_UPDATED,
  seoTitle: {
    ar: "سياسة الخصوصية | Flash Pay",
    en: "Privacy Policy | Flash Pay",
  },
  seoDescription: {
    ar: "سياسة خصوصية Flash Pay — استخدام محدود للبيانات، بدون بيع معلومات شخصية.",
    en: "Flash Pay privacy policy — limited data use, no sale of personal information.",
  },
  sections: [
    {
      heading: { ar: "نطاق هذه السياسة", en: "Scope of this policy" },
      paragraphs: [
        {
          ar: "تنطبق هذه السياسة على زيارتك لموقع Flash Pay والتفاعل مع نماذج الطلب والدردشة وقنوات التواصل الرسمية. لا تشكل هذه الصفحة استشارة قانونية.",
          en: "This policy applies to your visit to the Flash Pay website and interactions with request forms, chat, and official contact channels. This page is not legal advice.",
        },
      ],
    },
    {
      heading: { ar: "البيانات التي قد تقدمها", en: "Data you may provide" },
      paragraphs: [
        {
          ar: "قد تشارك معنا — عند اختيارك ذلك — معلومات مثل الاسم، رقم الهاتف، البريد الإلكتروني، الدولة، نوع الطلب، العملة، المبلغ التقريبي، وطريقة الاستلام المفضلة عبر نماذج الموقع أو WhatsApp الرسمي.",
          en: "You may choose to share information such as your name, phone number, email, country, request type, currency, approximate amount, and preferred receiving method through website forms or official WhatsApp.",
        },
        {
          ar: "لا نطلب منك عبر الموقع بيانات مصرفية حساسة أو كلمات مرور. أي تفاصيل مالية إضافية تُناقش عبر القنوات الرسمية فقط وبما يتناسب مع الطلب.",
          en: "We do not ask for sensitive banking credentials or passwords through the website. Additional financial details are discussed only through official channels as relevant to your request.",
        },
      ],
    },
    {
      heading: { ar: "WhatsApp والنماذج", en: "WhatsApp and forms" },
      paragraphs: [
        {
          ar: "عند إرسال طلب عبر مركز الطلبات أو WhatsApp الرسمي، تُستخدم المعلومات لتنظيم تواصلك مع فريق Flash Pay وتأكيد التوفر — وليس لإنشاء التزام تنفيذي على الموقع.",
          en: "When you send a request via the Request Center or official WhatsApp, information is used to organize your communication with the Flash Pay team and confirm availability — not to create a binding execution commitment on the website.",
        },
      ],
    },
    {
      heading: { ar: "معاينة محلية للوحة الإدارة", en: "Local admin preview note" },
      paragraphs: [
        {
          ar: "قد تتضمن نسخ التطوير المحلية معاينة داخلية للوحة إدارية. هذه المعاينة ليست متاحة للجمهور في الإنتاج ولا تُستخدم لجمع بيانات زوار الموقع العام.",
          en: "Local development builds may include an internal admin preview. This preview is not public in production and is not used to collect public visitor data.",
        },
      ],
      isWarning: true,
    },
    {
      heading: { ar: "استخدام محدود للبيانات", en: "Minimal data use" },
      paragraphs: [
        {
          ar: "نستخدم المعلومات لتقديم الدعم، الرد على الاستفسارات، تنظيم الطلبات، وتحسين تجربة الموقع بما يتوافق مع الغرض المعلن. لا نبيع بياناتك الشخصية لأطراف ثالثة لأغراض تسويقية.",
          en: "We use information to provide support, respond to inquiries, organize requests, and improve the website experience for the stated purpose. We do not sell your personal data to third parties for marketing.",
        },
      ],
    },
    {
      heading: { ar: "طلبات الخصوصية", en: "Privacy requests" },
      paragraphs: [
        {
          ar: `للاستفسار عن بياناتك أو طلب تصحيح أو حذف ضمن ما يسمح به القانون المعمول به، تواصل عبر البريد ${settingsData.email} أو WhatsApp الرسمي ${WHATSAPP}. قد نطلب تحققًا من الهوية قبل المعالجة.`,
          en: `To inquire about your data or request correction or deletion where applicable law allows, contact ${settingsData.email} or official WhatsApp ${WHATSAPP}. We may request identity verification before processing.`,
        },
      ],
    },
  ],
};

const termsPage: LegalPageContent = {
  key: "terms",
  path: "/terms",
  title: { ar: "الشروط والأحكام", en: "Terms & Conditions" },
  subtitle: {
    ar: "شروط استخدام موقع Flash Pay — معلومات إرشادية وتأكيد عبر القنوات الرسمية.",
    en: "Flash Pay website terms — indicative information and confirmation through official channels.",
  },
  lastUpdated: LAST_UPDATED,
  seoTitle: {
    ar: "الشروط والأحكام | Flash Pay",
    en: "Terms & Conditions | Flash Pay",
  },
  seoDescription: {
    ar: "شروط استخدام موقع Flash Pay — لا التزام تنفيذي على الموقع، التأكيد عبر WhatsApp.",
    en: "Flash Pay website terms — no binding execution on the site; confirmation via WhatsApp.",
  },
  sections: [
    {
      heading: { ar: "الغرض من الموقع", en: "Purpose of the website" },
      paragraphs: [
        {
          ar: "يوفر موقع Flash Pay معلومات عن الخدمات، التغطية، الأسواق، والموارد التعليمية. المحتوى إرشادي وقد يتغير دون إشعار مسبق. لا يُعد هذا الموقع عرضًا ملزمًا أو عقدًا.",
          en: "The Flash Pay website provides information about services, coverage, markets, and educational resources. Content is indicative and may change without prior notice. The website is not a binding offer or contract.",
        },
      ],
    },
    {
      heading: { ar: "الخدمات تخضع للتأكيد", en: "Services subject to confirmation" },
      paragraphs: [
        {
          ar: "أي خدمة أو مسار مالي يُعرض على الموقع يخضع للتأكيد النهائي عبر WhatsApp الرسمي أو القناة المعتمدة من Flash Pay. يتم تأكيد السعر عبر WhatsApp — وليس عبر عرض تلقائي على الموقع.",
          en: "Any service or financial route shown on the website is subject to final confirmation via official WhatsApp or the channel approved by Flash Pay. Pricing is confirmed via WhatsApp — not through an automatic quote on the website.",
        },
      ],
    },
    {
      heading: { ar: "التوفر", en: "Availability" },
      paragraphs: [
        {
          ar: "التوفر حسب الدولة والعملة والمبلغ وطريقة الاستلام وشبكة الشركاء حيثما يتوفر ذلك. قد لا تكون بعض الخدمات متاحة في منطقتك أو لحجم معين من العمليات.",
          en: "Availability depends on country, currency, amount, receiving method, and the partner network where applicable. Some services may not be available in your region or for a given transaction size.",
        },
      ],
    },
    {
      heading: { ar: "لا ضمان تنفيذ", en: "No guaranteed execution" },
      paragraphs: [
        {
          ar: "لا يضمن الموقع إتمام أي تحويل أو عملية في وقت محدد. الأطراف الزمنية والرسوم والعمولات تُناقش وتُؤكَّد عبر القنوات الرسمية فقط.",
          en: "The website does not guarantee completion of any transfer or transaction within a specific timeframe. Timelines, fees, and commissions are discussed and confirmed only through official channels.",
        },
      ],
      isWarning: true,
    },
    {
      heading: { ar: "طبيعة Flash Pay", en: "Nature of Flash Pay" },
      paragraphs: [
        {
          ar: "Flash Pay منصة مالية عالمية تعمل عبر خدمات مباشرة وتنسيق عبر شبكة الشركاء حيثما يتوفر ذلك. لا ندّعي أننا بنك مرخّص أو وكالة رسمية حكومية. أي علاقة مع جهات خارجية تُوضَّح عند التأكيد.",
          en: "Flash Pay is a global financial platform operating through direct services and coordination via the partner network where available. We do not claim to be a licensed bank or a government official agency. Any relationship with external parties is clarified upon confirmation.",
        },
      ],
    },
    {
      heading: { ar: "تأكيد WhatsApp مطلوب", en: "WhatsApp confirmation required" },
      paragraphs: [
        {
          ar: `قبل أي إجراء مالي، تحقق من التواصل عبر WhatsApp الرسمي ${WHATSAPP} أو صفحة مركز الثقة. لا ترسل أموالًا بناءً على رسائل من أرقام غير معروفة.`,
          en: `Before any financial action, verify communication via official WhatsApp ${WHATSAPP} or the Trust Center page. Do not send funds based on messages from unknown numbers.`,
        },
      ],
    },
  ],
};

const riskDisclaimerPage: LegalPageContent = {
  key: "risk-disclaimer",
  path: "/risk-disclaimer",
  title: { ar: "تحذير المخاطر", en: "Risk Disclaimer" },
  subtitle: {
    ar: "معلومات إرشادية فقط — ليس نصيحة مالية أو قانونية.",
    en: "Indicative information only — not financial or legal advice.",
  },
  lastUpdated: LAST_UPDATED,
  seoTitle: {
    ar: "تحذير المخاطر | Flash Pay",
    en: "Risk Disclaimer | Flash Pay",
  },
  seoDescription: {
    ar: "تحذير مخاطر Flash Pay — أسعار متغيرة، مخاطر USDT، أسواق إرشادية، محفظة وتداول قريبًا.",
    en: "Flash Pay risk disclaimer — changing rates, USDT risks, indicative markets, wallet and trade coming soon.",
  },
  sections: [
    {
      heading: { ar: "أسعار العملات", en: "Currency rates" },
      paragraphs: [
        {
          ar: "أسعار الصرف والعمولات المعروضة على الموقع أو في الدردشة قد تتغير في أي وقت. لا يُعتبر أي سعر ملزمًا حتى يتم تأكيده عبر القناة الرسمية.",
          en: "Exchange rates and commissions shown on the website or in chat may change at any time. No price is binding until confirmed through the official channel.",
        },
      ],
      isWarning: true,
    },
    {
      heading: { ar: "مخاطر USDT والعملات الرقمية", en: "USDT and crypto risks" },
      paragraphs: [
        {
          ar: "العملات الرقمية والأصول المستقرة مثل USDT تنطوي على مخاطر تقنية وتنظيمية وتقلب سعري. تحقق من الشبكة والعنوان قبل أي إرسال. Flash Pay لا يضمن استرداد الأموال المرسلة إلى عنوان خاطئ.",
          en: "Digital currencies and stable assets such as USDT involve technical, regulatory, and price volatility risks. Verify the network and address before sending. Flash Pay does not guarantee recovery of funds sent to an incorrect address.",
        },
      ],
    },
    {
      heading: { ar: "Flash Markets", en: "Flash Markets" },
      paragraphs: [
        {
          ar: "لوحة Flash Markets للمعلومات الإرشادية فقط. لا تُستخدم لاتخاذ قرارات استثمارية ولا تُمثّل عرض تداول فعّال.",
          en: "The Flash Markets dashboard is for indicative information only. It is not for investment decisions and does not represent an active trading offer.",
        },
      ],
    },
    {
      heading: { ar: "ليس نصيحة مالية", en: "Not financial advice" },
      paragraphs: [
        {
          ar: "محتوى الموقع والأكاديمية والدردشة لأغراض توعوية وإرشادية. استشر مستشارًا ماليًا أو قانونيًا مستقلاً قبل قراراتك المالية.",
          en: "Website, Academy, and chat content are for awareness and guidance. Consult an independent financial or legal adviser before making financial decisions.",
        },
      ],
    },
    {
      heading: { ar: "Flash Wallet و Flash Trade", en: "Flash Wallet and Flash Trade" },
      paragraphs: [
        {
          ar: "Flash Wallet و Flash Trade قيد التطوير / قريبًا. لا توجد أرصدة فعّالة أو تداول متاح عبر الموقع حاليًا. أي إعلان مستقبلي يخضع للتأكيد والامتثال التنظيمي.",
          en: "Flash Wallet and Flash Trade are under development / coming soon. There are no active balances or trading available through the website currently. Any future announcement is subject to confirmation and regulatory compliance.",
        },
      ],
      isWarning: true,
    },
    {
      heading: { ar: "لا التزام حتى التأكيد الرسمي", en: "No commitment until official confirmation" },
      paragraphs: [
        {
          ar: "أي رقم أو مسار أو خدمة على الموقع يبقى غير ملزم حتى يؤكده فريق Flash Pay عبر WhatsApp الرسمي أو القناة المعتمدة.",
          en: "Any figure, route, or service on the website remains non-binding until confirmed by the Flash Pay team via official WhatsApp or the approved channel.",
        },
      ],
    },
  ],
};

const securityPage: LegalPageContent = {
  key: "security",
  path: "/security",
  title: { ar: "الأمان", en: "Security" },
  subtitle: {
    ar: "كيف تحمي نفسك عند التواصل مع Flash Pay وتتجنب الانتحال.",
    en: "How to protect yourself when contacting Flash Pay and avoid impersonation.",
  },
  lastUpdated: LAST_UPDATED,
  seoTitle: {
    ar: "الأمان | Flash Pay",
    en: "Security | Flash Pay",
  },
  seoDescription: {
    ar: "إرشادات أمان Flash Pay — تحقق من WhatsApp الرسمي وتجنب الانتحال.",
    en: "Flash Pay security guidance — verify official WhatsApp and avoid impersonation.",
  },
  sections: [
    {
      heading: { ar: "WhatsApp الرسمي", en: "Official WhatsApp" },
      paragraphs: [
        {
          ar: `رقم WhatsApp الرسمي لـ Flash Pay هو ${WHATSAPP}. استخدمه فقط عند بدء طلب أو تأكيد سعر. تحقق من الرقم في صفحة مركز الثقة (/trust) قبل أي تواصل مالي.`,
          en: `The official Flash Pay WhatsApp number is ${WHATSAPP}. Use it only when starting a request or confirming a price. Verify the number on the Trust Center page (/trust) before any financial communication.`,
        },
      ],
    },
    {
      heading: { ar: "تحقق من قناة التواصل", en: "Verify the communication channel" },
      paragraphs: [
        {
          ar: "لا تعتمد على روابط أو أرقام وردت في مجموعات غير رسمية أو رسائل غير مطلوبة. ارجع دائمًا إلى الموقع الرسمي أو مركز الثقة للتحقق.",
          en: "Do not rely on links or numbers from unofficial groups or unsolicited messages. Always return to the official website or Trust Center to verify.",
        },
      ],
      isWarning: true,
    },
    {
      heading: { ar: "لا ترسل أموالًا لأرقام مجهولة", en: "Do not send money to unknown numbers" },
      paragraphs: [
        {
          ar: "Flash Pay لن يطلب منك تحويل أموال إلى حساب أو رقم لم يُؤكَّد مسبقًا عبر القناة الرسمية. أي طلب عاجل أو تهديد يستحق التحقق المستقل.",
          en: "Flash Pay will not ask you to transfer funds to an account or number not previously confirmed through the official channel. Any urgent request or threat warrants independent verification.",
        },
      ],
    },
    {
      heading: { ar: "احذر الانتحال", en: "Beware of impersonation" },
      paragraphs: [
        {
          ar: "قد ينتحل أطراف ثالثة هوية Flash Pay عبر WhatsApp أو البريد. قارن الاسم، الصورة، والرقم مع ما هو منشور في مركز الثقة. لا تشارك رموز التحقق أو كلمات المرور.",
          en: "Third parties may impersonate Flash Pay via WhatsApp or email. Compare name, profile, and number with what is published in the Trust Center. Do not share verification codes or passwords.",
        },
      ],
      isWarning: true,
    },
    {
      heading: { ar: "استخدم صفحة الثقة", en: "Use the Trust page" },
      paragraphs: [
        {
          ar: "صفحة /trust تجمع القنوات الرسمية وإشعارات الأمان وإخلاء المسؤولية. راجعها قبل أي عملية مالية.",
          en: "The /trust page collects official channels, safety notices, and disclaimers. Review it before any financial operation.",
        },
      ],
    },
    {
      heading: { ar: "الإبلاغ عن تواصل مشبوه", en: "Report suspicious contact" },
      paragraphs: [
        {
          ar: `إذا تلقيت رسالة مشبوهة باسم Flash Pay، أبلغنا عبر ${settingsData.email} أو WhatsApp الرسمي ${WHATSAPP} مع لقطة شاشة للرقم أو الرسالة (دون مشاركة بيانات حساسة).`,
          en: `If you receive a suspicious message claiming to be Flash Pay, report it via ${settingsData.email} or official WhatsApp ${WHATSAPP} with a screenshot of the number or message (without sharing sensitive data).`,
        },
      ],
    },
  ],
};

export const legalPagesData: Record<LegalPageKey, LegalPageContent> = {
  "privacy-policy": privacyPolicyPage,
  terms: termsPage,
  "risk-disclaimer": riskDisclaimerPage,
  security: securityPage,
};

export function getLegalPage(key: LegalPageKey): LegalPageContent {
  return legalPagesData[key];
}

export function getAllLegalPages(): LegalPageContent[] {
  return Object.values(legalPagesData);
}
