import type { AdminChatSession, ChatMessage } from "@/types/chat";

const TS_BASE = "2026-06-17T10:00:00.000Z";

function msg(
  id: string,
  sender: ChatMessage["sender"],
  content: string,
  offsetMinutes: number,
): ChatMessage {
  const createdAt = new Date(new Date(TS_BASE).getTime() + offsetMinutes * 60_000).toISOString();
  return { id, sender, content, createdAt };
}

/**
 * Mock admin inbox sessions — local preview only.
 * TODO: replace with Supabase chat_sessions + chat_messages.
 */
export const mockChatSessionsData: AdminChatSession[] = [
  {
    id: "session-usdt-buy",
    visitorName: "زائر #1042",
    visitorContact: "visitor-1042@preview.local",
    country: "مصر",
    status: "bot",
    priority: "normal",
    createdAt: "2026-06-17T09:12:00.000Z",
    updatedAt: "2026-06-17T09:18:00.000Z",
    lastMessage: "كيف أشتري USDT؟",
    internalNotes: [],
    messages: [
      msg("m1", "visitor", "مرحباً", 0),
      msg("m2", "bot", "أهلًا بك في Flash Pay. كيف يمكننا مساعدتك اليوم؟", 1),
      msg("m3", "visitor", "كيف أشتري USDT؟", 8),
      msg(
        "m4",
        "bot",
        "لشراء USDT، اختر «شراء USDT» في مركز الطلبات أو راسلنا عبر WhatsApp الرسمي. السعر النهائي يُؤكَّد حسب السوق والتوفر.",
        9,
      ),
    ],
  },
  {
    id: "session-eg-tr-transfer",
    visitorName: "زائر #1048",
    country: "مصر → تركيا",
    status: "waiting_for_human",
    priority: "high",
    createdAt: "2026-06-17T09:30:00.000Z",
    updatedAt: "2026-06-17T09:42:00.000Z",
    lastMessage: "أريد إرسال حوالة من مصر إلى تركيا",
    internalNotes: ["يفضّل التأكد من العملة TRY قبل الرد."],
    messages: [
      msg("m5", "visitor", "أريد إرسال حوالة من مصر إلى تركيا", 0),
      msg(
        "m6",
        "bot",
        "يمكنك طلب إرسال حوالة عبر مركز الطلبات أو WhatsApp الرسمي. حدّد المبلغ وطريقة الاستلام.",
        1,
      ),
      msg("m7", "visitor", "ما هي العملة المتاحة؟", 10),
      msg(
        "m8",
        "system",
        "تم تحويل طلبك إلى فريق الدعم. إذا كان الفريق متاحًا سيتم الرد عليك هنا.",
        12,
      ),
    ],
  },
  {
    id: "session-business",
    visitorName: "زائر #1051",
    visitorContact: "+preview-business",
    country: "الإمارات",
    status: "human",
    priority: "high",
    createdAt: "2026-06-17T08:50:00.000Z",
    updatedAt: "2026-06-17T09:05:00.000Z",
    lastMessage: "نحتاج تحويل تجاري شهري للموردين",
    internalNotes: ["حجم شهري تقريبي — يحتاج تأكيد عبر WhatsApp."],
    messages: [
      msg("m9", "visitor", "نحتاج تحويل تجاري شهري للموردين", 0),
      msg("m10", "bot", "Flash Business Class يقدّم حلولًا للتجار والشركات حسب الدولة والحجم.", 1),
      msg(
        "m11",
        "human",
        "شكرًا لتواصلك. يرجى إرسال الدولة، العملات، والحجم الشهري التقريبي عبر WhatsApp الرسمي لتأكيد التوفر.",
        15,
      ),
    ],
  },
  {
    id: "session-human-request",
    visitorName: "زائر #1055",
    country: "الأردن",
    status: "closed",
    priority: "normal",
    createdAt: "2026-06-17T07:40:00.000Z",
    updatedAt: "2026-06-17T08:10:00.000Z",
    lastMessage: "أريد التحدث مع موظف",
    internalNotes: ["أُغلقت بعد توجيه الزائر إلى WhatsApp."],
    messages: [
      msg("m12", "visitor", "أريد التحدث مع موظف", 0),
      msg(
        "m13",
        "system",
        "تم تحويل طلبك إلى فريق الدعم. للحصول على رد أسرع يمكنك استخدام WhatsApp.",
        1,
      ),
      msg(
        "m14",
        "human",
        "مرحبًا، يمكننا مساعدتك عبر WhatsApp الرسمي. تم إغلاق هذه المحادثة التجريبية.",
        30,
      ),
    ],
  },
];

export function cloneMockChatSessions(): AdminChatSession[] {
  return mockChatSessionsData.map((session) => ({
    ...session,
    messages: [...session.messages],
    internalNotes: [...session.internalNotes],
  }));
}
