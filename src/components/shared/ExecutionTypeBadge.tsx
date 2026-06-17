import type { ExecutionType } from "@/types/common";
import { executionTypesData } from "@/data/executionTypesData";
import { settingsData } from "@/data/settingsData";
import { getLocalized } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface ExecutionTypeBadgeProps {
  executionType: ExecutionType;
  className?: string;
}

export function ExecutionTypeBadge({ executionType, className }: ExecutionTypeBadgeProps) {
  const lang = settingsData.defaultLanguage;
  const definition = executionTypesData.find((item) => item.id === executionType);

  if (!definition) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-flash-primary",
        className,
      )}
      title={getLocalized(definition.wordingHint, lang)}
    >
      {getLocalized(definition.label, lang)}
    </span>
  );
}
