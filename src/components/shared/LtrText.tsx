import { cn } from "@/lib/utils";

type LtrTextElement = "span" | "p" | "div" | "time" | "dd" | "dt";

interface LtrTextProps {
  children: React.ReactNode;
  className?: string;
  as?: LtrTextElement;
}

/** Keeps phone numbers, emails, URLs, pairs, and dates readable in RTL layouts. */
export function LtrText({ children, className, as: Tag = "span" }: LtrTextProps) {
  return (
    <Tag dir="ltr" className={cn("flash-ltr", className)}>
      {children}
    </Tag>
  );
}

interface PhoneNumberTextProps {
  children: string;
  className?: string;
}

export function PhoneNumberText({ children, className }: PhoneNumberTextProps) {
  return <LtrText className={className}>{children}</LtrText>;
}
