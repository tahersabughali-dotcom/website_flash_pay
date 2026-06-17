import type { RequestType, RequestTypeField } from "@/types/request";

const TS = "2026-06-17T00:00:00.000Z";

const field = (
  name: string,
  ar: string,
  en: string,
  type: RequestTypeField["type"] = "text",
  required = false,
): RequestTypeField => ({
  name,
  label: { ar, en },
  type,
  required,
});

const transferFields: RequestTypeField[] = [
  field("fromCountry", "من دولة", "From Country", "select", true),
  field("toCountry", "إلى دولة", "To Country", "select", true),
  field("amount", "المبلغ", "Amount", "number", true),
  field("currency", "العملة", "Currency", "select", true),
  field("paymentMethod", "طريقة الدفع", "Payment Method", "select"),
  field("receivingMethod", "طريقة الاستلام", "Receiving Method", "select"),
  field("customerName", "الاسم", "Customer Name"),
  field("whatsappNumber", "رقم WhatsApp", "WhatsApp Number", "text", true),
  field("notes", "ملاحظات", "Notes", "textarea"),
];

const cryptoFields: RequestTypeField[] = [
  field("fromCountry", "الدولة", "Country", "select", true),
  field("amount", "المبلغ", "Amount", "number", true),
  field("currency", "العملة", "Currency", "select", true),
  field("paymentMethod", "طريقة الدفع", "Payment Method", "select", true),
  field("receivingMethod", "طريقة الاستلام", "Receiving Method", "select", true),
  field("whatsappNumber", "رقم WhatsApp", "WhatsApp Number", "text", true),
  field("notes", "ملاحظات", "Notes", "textarea"),
];

const digitalCashoutFields: RequestTypeField[] = [
  field("fromCountry", "الدولة", "Country", "select", true),
  field("amount", "المبلغ", "Amount", "number", true),
  field("currency", "العملة", "Currency", "select", true),
  field("receivingMethod", "طريقة الاستلام", "Receiving Method", "select", true),
  field("whatsappNumber", "رقم WhatsApp", "WhatsApp Number", "text", true),
  field("notes", "ملاحظات", "Notes", "textarea"),
];

const businessFields: RequestTypeField[] = [
  field("fromCountry", "دولة الشركة", "Company Country", "select", true),
  field("amount", "الحجم الشهري التقريبي", "Approx. Monthly Volume", "text"),
  field("currency", "العملات المطلوبة", "Required Currencies", "text", true),
  field("notes", "تفاصيل الطلب", "Request Details", "textarea", true),
  field("whatsappNumber", "رقم WhatsApp", "WhatsApp Number", "text", true),
];

function requestType(
  partial: Omit<RequestType, "createdAt" | "updatedAt">,
): RequestType {
  return { ...partial, createdAt: TS, updatedAt: TS };
}

export const requestTypesData: RequestType[] = [
  requestType({
    id: "req-send-money",
    slug: "send-money",
    title: { ar: "إرسال أموال", en: "Send Money" },
    description: {
      ar: "طلب إرسال تحويل إلى دولة أخرى.",
      en: "Request a transfer to another country.",
    },
    icon: "send",
    status: "active",
    order: 1,
    fields: transferFields,
  }),
  requestType({
    id: "req-receive-money",
    slug: "receive-money",
    title: { ar: "استلام أموال", en: "Receive Money" },
    description: {
      ar: "طلب استلام تحويل أو نقد.",
      en: "Request to receive a transfer or cash.",
    },
    icon: "receive",
    status: "active",
    order: 2,
    fields: transferFields,
  }),
  requestType({
    id: "req-buy-usdt",
    slug: "buy-usdt",
    title: { ar: "شراء USDT", en: "Buy USDT" },
    description: { ar: "طلب شراء USDT.", en: "Request to buy USDT." },
    icon: "crypto",
    status: "active",
    order: 3,
    fields: cryptoFields,
  }),
  requestType({
    id: "req-sell-usdt",
    slug: "sell-usdt",
    title: { ar: "بيع USDT", en: "Sell USDT" },
    description: { ar: "طلب بيع USDT.", en: "Request to sell USDT." },
    icon: "crypto",
    status: "active",
    order: 4,
    fields: cryptoFields,
  }),
  requestType({
    id: "req-usdt-to-cash",
    slug: "usdt-to-cash",
    title: { ar: "USDT إلى نقد", en: "USDT to Cash" },
    description: { ar: "تحويل USDT إلى نقد.", en: "Convert USDT to cash." },
    icon: "exchange",
    status: "active",
    order: 5,
    fields: cryptoFields,
  }),
  requestType({
    id: "req-cash-to-usdt",
    slug: "cash-to-usdt",
    title: { ar: "نقد إلى USDT", en: "Cash to USDT" },
    description: { ar: "شراء USDT بالنقد.", en: "Buy USDT with cash." },
    icon: "exchange",
    status: "active",
    order: 6,
    fields: cryptoFields,
  }),
  requestType({
    id: "req-paypal-cashout",
    slug: "paypal-cash-out",
    title: { ar: "سحب PayPal", en: "PayPal Cash-Out" },
    description: {
      ar: "تنسيق سحب PayPal — ليس وكالة مباشرة.",
      en: "PayPal cash-out coordination — not direct agency.",
    },
    icon: "paypal",
    status: "active",
    order: 7,
    fields: digitalCashoutFields,
  }),
  requestType({
    id: "req-wise-cashout",
    slug: "wise-cash-out",
    title: { ar: "سحب Wise", en: "Wise Cash-Out" },
    description: { ar: "تنسيق سحب Wise.", en: "Wise cash-out coordination." },
    icon: "wise",
    status: "active",
    order: 8,
    fields: digitalCashoutFields,
  }),
  requestType({
    id: "req-payoneer-cashout",
    slug: "payoneer-cash-out",
    title: { ar: "سحب Payoneer", en: "Payoneer Cash-Out" },
    description: { ar: "تنسيق سحب Payoneer.", en: "Payoneer cash-out coordination." },
    icon: "payoneer",
    status: "active",
    order: 9,
    fields: digitalCashoutFields,
  }),
  requestType({
    id: "req-pay-supplier",
    slug: "pay-supplier",
    title: { ar: "دفع مورد", en: "Pay Supplier" },
    description: { ar: "دفع مورد في الخارج.", en: "Pay an overseas supplier." },
    icon: "business",
    status: "active",
    order: 10,
    fields: businessFields,
  }),
  requestType({
    id: "req-business-transfer",
    slug: "business-transfer",
    title: { ar: "تحويل تجاري", en: "Business Transfer" },
    description: { ar: "تحويل تجاري بحجم كبير.", en: "High-volume business transfer." },
    icon: "business",
    status: "active",
    order: 11,
    fields: businessFields,
  }),
  requestType({
    id: "req-bulk-rate",
    slug: "bulk-rate-request",
    title: { ar: "طلب سعر بالجملة", en: "Bulk Rate Request" },
    description: { ar: "طلب سعر خاص لحجم كبير.", en: "Request a special bulk rate." },
    icon: "rates",
    status: "active",
    order: 12,
    fields: [
      field("currency", "العملة", "Currency", "select", true),
      field("amount", "الحجم", "Volume", "text", true),
      field("whatsappNumber", "رقم WhatsApp", "WhatsApp Number", "text", true),
      field("notes", "ملاحظات", "Notes", "textarea"),
    ],
  }),
  requestType({
    id: "req-partner",
    slug: "partner-request",
    title: { ar: "طلب شراكة", en: "Partner Request" },
    description: { ar: "انضم كمكتب شريك.", en: "Apply as a partner office." },
    icon: "partner",
    status: "active",
    order: 13,
    fields: [
      field("fromCountry", "الدولة", "Country", "select", true),
      field("customerName", "اسم المكتب / الشركة", "Office / Company Name", "text", true),
      field("whatsappNumber", "رقم WhatsApp", "WhatsApp Number", "text", true),
      field("notes", "تفاصيل", "Details", "textarea", true),
    ],
  }),
  requestType({
    id: "req-market-price",
    slug: "market-price-inquiry",
    title: { ar: "استفسار سعر سوق", en: "Market Price Inquiry" },
    description: {
      ar: "سؤال عن سعر — ليس نصيحة استثمارية.",
      en: "Price inquiry — not investment advice.",
    },
    icon: "market",
    status: "active",
    order: 14,
    fields: [
      field("currency", "الأصل / العملة", "Asset / Currency", "text", true),
      field("notes", "سؤالك", "Your Question", "textarea", true),
      field("whatsappNumber", "رقم WhatsApp", "WhatsApp Number", "text", true),
    ],
  }),
];
