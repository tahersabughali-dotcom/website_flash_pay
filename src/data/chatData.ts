import type { ChatData } from "@/types/chat";

/**
 * Flash Pay chat widget content — edit here only.
 * WhatsApp number must come from settingsData at runtime, not here.
 */
export const chatData: ChatData = {
  widgetTitle: {
    ar: "Flash Assistant",
    en: "Flash Assistant",
  },
  widgetSubtitle: {
    ar: "اسألني عن الدول، العملات، USDT، أو طرق الدفع",
    en: "Ask about countries, currencies, USDT, or payment methods",
  },
  welcomeMessage: {
    ar: "أهلًا بك في Flash Pay. كيف يمكننا مساعدتك اليوم؟",
    en: "Welcome to Flash Pay. How can we help you today?",
  },
  offlineMessage: {
    ar: "إذا لم يكن أحد متاحًا الآن، يمكنك ترك رسالتك أو التواصل عبر WhatsApp.",
    en: "If no agent is available now, you can leave your message or contact us on WhatsApp.",
  },
  humanHandoffMessage: {
    ar: "تم تحويل طلبك إلى فريق الدعم. إذا كان الفريق متاحًا سيتم الرد عليك هنا. وللحصول على رد أسرع يمكنك استخدام WhatsApp.",
    en: "Your request has been forwarded to the support team. If the team is available, they will reply here. For a faster response, you can use WhatsApp.",
  },
  quickCategories: [
    {
      id: "cat-transfers",
      label: { ar: "تحويلات مالية", en: "Money transfers" },
      questions: [
        {
          id: "qq-send-money",
          label: { ar: "كيف أرسل حوالة؟", en: "How do I send a transfer?" },
          knowledgeId: "static-send-transfer",
        },
        {
          id: "qq-receive-money",
          label: { ar: "كيف أستلم حوالة؟", en: "How do I receive a transfer?" },
          knowledgeId: "static-receive-transfer",
        },
        {
          id: "qq-receiving-methods",
          label: { ar: "ما طرق الاستلام؟", en: "What receiving methods?" },
          knowledgeId: "static-receiving-methods",
        },
        {
          id: "qq-countries",
          label: { ar: "ما الدول المتاحة؟", en: "Which countries are available?" },
          knowledgeId: "static-countries-overview",
        },
      ],
    },
    {
      id: "cat-usdt",
      label: { ar: "USDT", en: "USDT" },
      questions: [
        {
          id: "qq-buy-usdt",
          label: { ar: "كيف أشتري USDT؟", en: "How do I buy USDT?" },
          knowledgeId: "static-buy-usdt",
        },
        {
          id: "qq-sell-usdt",
          label: { ar: "كيف أبيع USDT؟", en: "How do I sell USDT?" },
          knowledgeId: "static-sell-usdt",
        },
        {
          id: "qq-usdt-networks",
          label: { ar: "ما الفرق بين TRC20 و ERC20؟", en: "TRC20 vs ERC20?" },
          knowledgeId: "static-usdt-networks",
        },
        {
          id: "qq-fixed-rate",
          label: { ar: "هل السعر ثابت؟", en: "Is the rate fixed?" },
          knowledgeId: "dyn-markets-disclaimer",
        },
      ],
    },
    {
      id: "cat-payment",
      label: { ar: "طرق الدفع", en: "Payment methods" },
      questions: [
        {
          id: "qq-payment-methods",
          label: { ar: "ما طرق الدفع؟", en: "What payment methods?" },
          knowledgeId: "static-payment-methods",
        },
        {
          id: "qq-wise",
          label: { ar: "هل عندكم Wise؟", en: "Do you support Wise?" },
          knowledgeId: "dyn-svc-wise-cash-out",
        },
        {
          id: "qq-paypal",
          label: { ar: "هل عندكم PayPal؟", en: "Do you support PayPal?" },
          knowledgeId: "dyn-svc-paypal-cash-out",
        },
      ],
    },
    {
      id: "cat-business",
      label: { ar: "التجار والشركات", en: "Business" },
      questions: [
        {
          id: "qq-china-supplier",
          label: { ar: "أريد دفع مورد في الصين", en: "Pay a supplier in China" },
          knowledgeId: "static-business-supplier",
        },
        {
          id: "qq-business-transfer",
          label: { ar: "أريد تحويل تجاري", en: "Business transfer" },
          knowledgeId: "dyn-biz-business-transfers",
        },
        {
          id: "qq-bulk-rate",
          label: { ar: "أريد سعر جملة", en: "Bulk rate request" },
          knowledgeId: "static-business-bulk",
        },
      ],
    },
    {
      id: "cat-rates",
      label: { ar: "السعر والعمولة", en: "Rates & fees" },
      questions: [
        {
          id: "qq-today-price",
          label: { ar: "أريد سعر اليوم", en: "I want today's rate" },
          knowledgeId: "dyn-markets-disclaimer",
        },
        {
          id: "qq-commission",
          label: { ar: "كم العمولة؟", en: "What is the fee?" },
          knowledgeId: "dyn-markets-disclaimer",
        },
        {
          id: "qq-markets",
          label: { ar: "ما هي Flash Markets؟", en: "What is Flash Markets?" },
          knowledgeId: "static-markets-info",
        },
      ],
    },
    {
      id: "cat-trust",
      label: { ar: "الأمان والثقة", en: "Trust & safety" },
      questions: [
        {
          id: "qq-whatsapp",
          label: { ar: "ما رقم WhatsApp الرسمي؟", en: "Official WhatsApp number?" },
          knowledgeId: "static-trust-whatsapp",
        },
        {
          id: "qq-trust",
          label: { ar: "كيف أتأكد من الأمان؟", en: "How do I stay safe?" },
          knowledgeId: "static-trust-safety",
        },
        {
          id: "qq-start",
          label: { ar: "أين أبدأ الطلب؟", en: "Where do I start?" },
          knowledgeId: "static-nav-start",
        },
      ],
    },
    {
      id: "cat-human",
      label: { ar: "تحدث مع موظف", en: "Talk to agent" },
      questions: [
        {
          id: "qq-human",
          label: { ar: "أريد التحدث مع موظف", en: "I want to talk to an agent" },
          triggersHandoff: true,
        },
      ],
    },
  ],
  quickQuestions: [],
  safeKnowledgeBase: [
    {
      id: "kb-transfers",
      keywords: {
        ar: ["حوالة", "تحويل", "ارسل", "أرسل", "إرسال", "money transfer", "send money"],
        en: ["transfer", "send money", "remittance", "wire"],
      },
      answer: {
        ar: "يمكنك طلب إرسال حوالة عبر مركز الطلبات الذكي أو WhatsApp الرسمي. حدّد الدولة، المبلغ، وطريقة الاستلام — وسيتم تأكيد السعر والتوفر مباشرة.",
        en: "You can request a transfer via the Smart Request Center or official WhatsApp. Share country, amount, and receiving method — price and availability are confirmed directly.",
      },
    },
    {
      id: "kb-buy-usdt",
      keywords: {
        ar: ["شراء usdt", "buy usdt", "تتر", "تيذر"],
        en: ["buy usdt", "purchase usdt", "usdt buy"],
      },
      answer: {
        ar: "لشراء USDT، اختر «شراء USDT» في مركز الطلبات أو راسلنا عبر WhatsApp الرسمي. السعر النهائي يُؤكَّد حسب السوق والتوفر — وليس مضمونًا على الموقع.",
        en: "To buy USDT, choose Buy USDT in the Request Center or message us on official WhatsApp. Final price is confirmed based on market and availability — not guaranteed on the website.",
      },
    },
    {
      id: "kb-sell-usdt",
      keywords: {
        ar: ["بيع usdt", "أبيع", "بيع", "sell usdt"],
        en: ["sell usdt", "usdt sell", "cash out usdt"],
      },
      answer: {
        ar: "لبيع USDT، اختر «بيع USDT» في مركز الطلبات أو WhatsApp الرسمي. التفاصيل والسعر تُؤكَّد حسب الدولة وطريقة الاستلام.",
        en: "To sell USDT, choose Sell USDT in the Request Center or official WhatsApp. Details and price are confirmed by country and receiving method.",
      },
    },
    {
      id: "kb-cash-delivery",
      keywords: {
        ar: ["نقد", "cash", "استلام نقد", "cash delivery"],
        en: ["cash delivery", "cash pickup", "receive cash"],
      },
      answer: {
        ar: "خدمات الاستلام النقدي تُنسَّق عبر شبكة شركاء Flash Pay حسب الدولة والتوفر. أرسل طلبك عبر WhatsApp أو مركز الطلبات.",
        en: "Cash delivery is coordinated through the Flash Pay partner network by country and availability. Send a request via WhatsApp or the Request Center.",
      },
    },
    {
      id: "kb-business",
      keywords: {
        ar: ["تجاري", "business", "شركة", "مورد", "supplier"],
        en: ["business", "company", "supplier", "b2b", "merchant"],
      },
      answer: {
        ar: "Flash Business Class يقدّم حلولًا للتجار والشركات حسب الدولة والحجم. التوفر يعتمد على شبكة الشركاء — تواصل عبر صفحة الأعمال أو WhatsApp.",
        en: "Flash Business Class offers solutions for traders and companies by country and volume. Availability depends on the partner network — contact via the Business page or WhatsApp.",
      },
    },
    {
      id: "kb-partners",
      keywords: {
        ar: ["شريك", "شراكة", "partner", "مكتب"],
        en: ["partner", "partnership", "office", "network"],
      },
      answer: {
        ar: "شبكة Flash Pay تضم مكاتب شريكة ونقاط خدمة. لطلب شراكة، زر صفحة الشركاء أو أرسل طلبًا عبر WhatsApp.",
        en: "Flash Pay Network includes partner offices and service points. To apply as a partner, visit the Partners page or send a request via WhatsApp.",
      },
    },
    {
      id: "kb-route-finder",
      keywords: {
        ar: ["مسار", "route", "مكتشف", "route finder", "من دولة"],
        en: ["route finder", "route", "corridor", "from country"],
      },
      answer: {
        ar: "استخدم «مكتشف المسارات» لاستكشاف مسارات متاحة بين الدول، ثم اطلب السعر عبر WhatsApp. لا أسعار مضمونة على الموقع.",
        en: "Use Route Finder to explore available corridors between countries, then request a price via WhatsApp. No guaranteed rates on the website.",
      },
    },
    {
      id: "kb-countries",
      keywords: {
        ar: ["دول", "دولة", "countries", "country", "تغطية"],
        en: ["countries", "country", "coverage", "available countries"],
      },
      answer: {
        ar: "تغطية الدول والخدمات متاحة في صفحة «الدول». التوفر يختلف حسب الشريك والعملة — راجع الصفحة أو اسأل عبر WhatsApp.",
        en: "Country coverage and services are listed on the Countries page. Availability varies by partner and currency — check the page or ask via WhatsApp.",
      },
    },
    {
      id: "kb-markets",
      keywords: {
        ar: ["سعر", "أسعار", "سوق", "markets", "usd", "egp", "usdt rate"],
        en: ["price", "rate", "markets", "exchange rate", "today rate"],
      },
      sensitive: true,
      answer: {
        ar: "لوحة الأسواق تعرض معلوماتًا إرشادية فقط — ليست أسعارًا تنفيذية أو لحظية.",
        en: "The Markets dashboard shows indicative information only — not execution or real-time prices.",
      },
    },
    {
      id: "kb-wallet-trade",
      keywords: {
        ar: ["wallet", "trade", "محفظة", "تداول", "flash wallet", "flash trade"],
        en: ["wallet", "trade", "trading", "flash wallet", "flash trade"],
      },
      answer: {
        ar: "Flash Wallet و Flash Trade قيد التطوير (قريبًا) — ليست خدمات فعّالة حاليًا. للخدمات الحالية استخدم مركز الطلبات أو WhatsApp.",
        en: "Flash Wallet and Flash Trade are coming soon — not active services yet. For current services use the Request Center or WhatsApp.",
      },
    },
    {
      id: "kb-contact",
      keywords: {
        ar: ["whatsapp", "واتساب", "تواصل", "contact", "رقم", "phone"],
        en: ["whatsapp", "contact", "phone", "number", "support"],
      },
      answer: {
        ar: "تواصل فقط عبر WhatsApp الرسمي المنشور في مركز الثقة وصفحة التواصل. احذر الحسابات المزيفة.",
        en: "Contact only through official WhatsApp published in Trust Center and Contact page. Beware of fake accounts.",
      },
    },
    {
      id: "kb-trust",
      keywords: {
        ar: ["ثقة", "trust", "أمان", "احتيال", "رسمي"],
        en: ["trust", "safety", "scam", "official", "fraud"],
      },
      answer: {
        ar: "Flash Pay لا تدّعي وكالة مباشرة لشركات عالمية ما لم يُؤكَّد ذلك قانونيًا. راجع «مركز الثقة» للقنوات الرسمية والتنبيهات.",
        en: "Flash Pay does not claim direct agency for global companies unless legally confirmed. See Trust Center for official channels and notices.",
      },
    },
  ],
  uiLabels: {
    placeholder: {
      ar: "اكتب رسالتك...",
      en: "Type your message...",
    },
    send: { ar: "إرسال", en: "Send" },
    talkToHuman: { ar: "التحدث مع موظف", en: "Talk to an agent" },
    openWhatsApp: { ar: "فتح WhatsApp", en: "Open WhatsApp" },
    close: { ar: "إغلاق", en: "Close" },
    openChat: { ar: "فتح المحادثة", en: "Open chat" },
    typing: { ar: "جاري الكتابة...", en: "Typing..." },
    liveHumanSoon: {
      ar: "الرد البشري المباشر من لوحة التحكم سيُفعَّل لاحقًا. حاليًا يمكنك متابعة المحادثة أو التواصل عبر WhatsApp.",
      en: "Live human replies from the admin panel will be enabled later. For now, continue here or contact us via WhatsApp.",
    },
    handoffTransferred: {
      ar: "تم تحويل طلبك إلى فريق الدعم. إذا كان الفريق متاحًا سيتم الرد عليك هنا. وللحصول على رد أسرع يمكنك استخدام WhatsApp.",
      en: "Your request has been forwarded to the support team. If the team is available, they will reply here. For a faster response, you can use WhatsApp.",
    },
    directReplySoonNote: {
      ar: "الرد المباشر داخل الموقع سيتم تفعيله قريبًا.",
      en: "Direct in-site replies will be enabled soon.",
    },
    defaultFallback: {
      ar: "سأحاول مساعدتك. للحصول على إجابة دقيقة، يمكنك إرسال طلب عبر مركز الطلبات أو التواصل عبر WhatsApp.",
      en: "I'll try to help. For an accurate answer, send a request via the Request Center or contact us on WhatsApp.",
    },
    sensitiveFallback: {
      ar: "السعر والعمولة يتم تأكيدهما عبر WhatsApp حسب الدولة، العملة، المبلغ، وطريقة الاستلام. يمكنك إرسال تفاصيل طلبك للحصول على السعر المناسب.",
      en: "Price and fees are confirmed via WhatsApp based on country, currency, amount, and receiving method. Send your request details for an accurate quote.",
    },
  },
};

chatData.quickQuestions = chatData.quickCategories.flatMap((category) => category.questions);
