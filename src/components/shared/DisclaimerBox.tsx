import { cn } from "@/lib/utils";

interface DisclaimerBoxProps {
  title?: string;
  content: string;
  className?: string;
}

export function DisclaimerBox({ title, content, className }: DisclaimerBoxProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-sm",
        className,
      )}
    >
      {title && <p className="font-medium">{title}</p>}
      <p className={title ? "mt-1" : undefined}>{content}</p>
    </div>
  );
}
