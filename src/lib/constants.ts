/** Platform-wide constants — not business content */
export const PLATFORM_VERSION = "0.1.0-prelaunch";

export const FINANCIAL_DISCLAIMER = {
  ar: "هذا المحتوى لأغراض معلوماتية وتعليمية فقط ولا يُعد نصيحة مالية أو استثمارية أو توصية بالبيع أو الشراء.",
  en: "This content is for informational and educational purposes only and does not constitute financial advice, investment advice, or a recommendation to buy or sell.",
} as const;

export const MARKET_DISCLAIMER = {
  ar: "معلومات السوق لأغراض معلوماتية فقط ولا تُعد نصيحة مالية أو استثمارية.",
  en: "Market information is for informational purposes only and does not constitute financial advice or investment advice.",
} as const;

export const PLATFORM_SAFETY_NOTICE = {
  ar: "لا أسعار مضمونة على الموقع. Flash Pay لا تدّعي وكالة مباشرة لشركات عالمية.",
  en: "No guaranteed rates on the website. Flash Pay does not claim direct agency for global companies.",
} as const;

export const AVAILABILITY_NOTICE = {
  ar: "التوفر يعتمد على الدولة، العملة، المبلغ، وتغطية شبكة الشركاء.",
  en: "Availability depends on country, currency, amount, and partner network coverage.",
} as const;

export const ROUTE_PLACEHOLDER_MESSAGE = {
  ar: "هذا القسم جاهز structurally — سيتم بناء المحتوى في المرحلة التالية.",
  en: "This section is structurally ready — content will be built in the next phase.",
} as const;
