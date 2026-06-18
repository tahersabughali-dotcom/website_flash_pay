"use client";

import { useMemo, useState } from "react";
import { useVisitorChat } from "@/lib/chat/useVisitorChat";
import { getTextDirection } from "@/lib/i18n";
import { ChatLauncher } from "./ChatLauncher";
import { ChatWindow } from "./ChatWindow";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const chat = useVisitorChat(isOpen);
  const dir = getTextDirection(chat.lang);

  const launcherSideClass = useMemo(
    () => (chat.lang === "ar" ? "left-6" : "right-6"),
    [chat.lang],
  );

  return (
    <div dir={dir} className="pointer-events-none fixed inset-0 z-40">
      <div
        className={`pointer-events-auto fixed bottom-[calc(7.25rem+env(safe-area-inset-bottom))] max-sm:bottom-[calc(7.75rem+env(safe-area-inset-bottom))] ${launcherSideClass} flex flex-col items-end gap-3`}
      >
        {isOpen && chat.isReady && (
          <ChatWindow
            lang={chat.lang}
            messages={chat.messages}
            status={chat.status}
            isTyping={chat.isTyping}
            onClose={() => setIsOpen(false)}
            onSend={chat.handleSend}
            onQuickSelect={chat.handleQuickSelect}
            onRequestHuman={chat.requestHumanHandoff}
          />
        )}
      </div>

      <div className="pointer-events-auto">
        <ChatLauncher lang={chat.lang} isOpen={isOpen} onToggle={() => setIsOpen((prev) => !prev)} />
      </div>
    </div>
  );
}
