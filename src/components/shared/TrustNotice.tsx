import type { LanguageCode } from "@/types/common";
import type { TrustDocument } from "@/data/trustData";
import { getLocalized } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface TrustNoticeProps {
  item: TrustDocument;
  lang: LanguageCode;
  className?: string;
}

export function TrustNotice({ item, lang, className }: TrustNoticeProps) {
  return (
    <div
      className={cn(
        "flash-card p-4",
        className,
      )}
    >
      <h3 className="font-medium text-flash-text">{getLocalized(item.title, lang)}</h3>
      <p className="mt-2 text-sm leading-relaxed text-flash-muted">
        {getLocalized(item.content, lang)}
      </p>
    </div>
  );
}
