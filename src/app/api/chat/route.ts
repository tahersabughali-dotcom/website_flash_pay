import { NextResponse } from "next/server";
import { settingsData } from "@/data/settingsData";
import { isChatAiFeatureEnabled } from "@/lib/auth/adminAccessConfig";
import {
  CHAT_SYSTEM_INSTRUCTION,
  generateLocalChatResponse,
} from "@/lib/chat/localChatEngine";

interface ChatRequestBody {
  message?: string;
  lang?: string;
}

const MAX_CHAT_MESSAGE_LENGTH = 1000;

async function callOpenAiChat(message: string, lang: "ar" | "en"): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) return null;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini",
        temperature: 0.3,
        max_tokens: 400,
        messages: [
          { role: "system", content: CHAT_SYSTEM_INSTRUCTION },
          {
            role: "system",
            content: `Official WhatsApp (for reference only, do not invent numbers): ${settingsData.whatsappNumber}. Website: ${settingsData.websiteUrl}. Default language: ${lang}.`,
          },
          { role: "user", content: message },
        ],
      }),
    });

    if (!response.ok) return null;

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    return data.choices?.[0]?.message?.content?.trim() || null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  let lang: "ar" | "en" = "ar";

  try {
    const body = (await request.json()) as ChatRequestBody;
    const message = String(body.message ?? "").trim();
    lang = body.lang === "en" ? "en" : "ar";

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (message.length > MAX_CHAT_MESSAGE_LENGTH) {
      return NextResponse.json({ error: "Message is too long" }, { status: 400 });
    }

    const localResult = generateLocalChatResponse(message, { lang });

    if (localResult.source === "guardrail" || localResult.triggersHandoff) {
      return NextResponse.json({
        reply: localResult.reply,
        source: localResult.source,
        triggersHandoff: localResult.triggersHandoff ?? false,
      });
    }

    const aiReply = isChatAiFeatureEnabled() ? await callOpenAiChat(message, lang) : null;
    if (aiReply) {
      return NextResponse.json({
        reply: aiReply,
        source: "ai",
        triggersHandoff: localResult.triggersHandoff ?? false,
      });
    }

    return NextResponse.json({
      reply: localResult.reply,
      source: localResult.source,
      triggersHandoff: localResult.triggersHandoff ?? false,
    });
  } catch {
    const fallback = generateLocalChatResponse("", { lang });

    return NextResponse.json({
      reply: fallback.reply,
      source: "fallback",
    });
  }
}
