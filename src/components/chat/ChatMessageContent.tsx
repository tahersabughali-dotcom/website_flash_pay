import type { ReactNode } from "react";
import Link from "next/link";
import { LtrText } from "@/components/shared/LtrText";
import { cn } from "@/lib/utils";

const ROUTE_PATTERN = /(\/(?:[\w-]+\/?)+)/g;
const LTR_TOKEN_PATTERN =
  /\b(?:USDT|TRC20|ERC20|BEP20|WhatsApp|PayPal|Wise|Payoneer|Stripe|Flash Pay)\b|https?:\/\/[^\s]+|\+?\d[\d\s-]{7,}\d/g;

interface ChatMessageContentProps {
  content: string;
  className?: string;
}

function renderInlineSegment(segment: string, keyPrefix: string) {
  if (!segment) return null;

  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let matchIndex = 0;

  for (const match of segment.matchAll(LTR_TOKEN_PATTERN)) {
    const token = match[0];
    const start = match.index ?? 0;

    if (start > lastIndex) {
      parts.push(segment.slice(lastIndex, start));
    }

    parts.push(
      <LtrText key={`${keyPrefix}-ltr-${matchIndex}`} className="inline font-medium">
        {token}
      </LtrText>,
    );

    lastIndex = start + token.length;
    matchIndex += 1;
  }

  if (lastIndex < segment.length) {
    parts.push(segment.slice(lastIndex));
  }

  return parts.length > 0 ? parts : segment;
}

function renderLineWithLinks(line: string, key: string) {
  const segments: ReactNode[] = [];
  let lastIndex = 0;
  let linkIndex = 0;

  for (const match of line.matchAll(ROUTE_PATTERN)) {
    const route = match[0];
    const start = match.index ?? 0;

    if (start > lastIndex) {
      segments.push(
        <span key={`${key}-text-${linkIndex}`}>{renderInlineSegment(line.slice(lastIndex, start), `${key}-${linkIndex}`)}</span>,
      );
    }

    segments.push(
      <Link
        key={`${key}-route-${linkIndex}`}
        href={route}
        className="mx-0.5 inline-flex items-center rounded-md bg-flash-primary/10 px-1.5 py-0.5 text-xs font-semibold text-flash-primary underline-offset-2 hover:underline"
      >
        <LtrText>{route}</LtrText>
      </Link>,
    );

    lastIndex = start + route.length;
    linkIndex += 1;
  }

  if (lastIndex < line.length) {
    segments.push(
      <span key={`${key}-tail`}>{renderInlineSegment(line.slice(lastIndex), `${key}-tail`)}</span>,
    );
  }

  return segments.length > 0 ? segments : renderInlineSegment(line, key);
}

function isBulletLine(line: string): boolean {
  return /^(\u2022|•|-|\d+[.)])\s+/.test(line.trim());
}

function stripBulletPrefix(line: string): string {
  return line.trim().replace(/^(\u2022|•|-|\d+[.)])\s+/, "");
}

export function ChatMessageContent({ content, className }: ChatMessageContentProps) {
  const lines = content.split("\n").filter((line, index, all) => line.length > 0 || all[index + 1]?.length > 0);

  return (
    <div className={cn("space-y-2 text-sm leading-relaxed [overflow-wrap:anywhere]", className)}>
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={`gap-${index}`} className="h-1" aria-hidden="true" />;
        }

        if (isBulletLine(trimmed)) {
          return (
            <div key={`bullet-${index}`} className="flex gap-2 ps-0.5">
              <span className="mt-0.5 shrink-0 text-flash-primary" aria-hidden="true">
                •
              </span>
              <span className="min-w-0 flex-1">{renderLineWithLinks(stripBulletPrefix(trimmed), `line-${index}`)}</span>
            </div>
          );
        }

        return (
          <p key={`line-${index}`} className="min-w-0">
            {renderLineWithLinks(trimmed, `line-${index}`)}
          </p>
        );
      })}
    </div>
  );
}
