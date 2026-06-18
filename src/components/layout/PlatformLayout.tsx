import { AppFooter, AppHeader } from "@/components/layout/AppShell";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { isChatWidgetEnabled } from "@/lib/chat/chatUtils";

interface PlatformLayoutProps {
  children: React.ReactNode;
}

export function PlatformLayout({ children }: PlatformLayoutProps) {
  return (
    <>
      <AppHeader />
      <main className="min-w-0 flex-1 overflow-x-clip">{children}</main>
      <AppFooter />
      <WhatsAppButton variant="floating" />
      {isChatWidgetEnabled() && <ChatWidget />}
    </>
  );
}
