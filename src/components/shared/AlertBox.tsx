import { cn } from "@/lib/utils";

interface AlertBoxProps {
  title?: string;
  content: string;
  variant?: "info" | "warning";
  className?: string;
}

export function AlertBox({
  title,
  content,
  variant = "info",
  className,
}: AlertBoxProps) {
  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3 text-sm shadow-sm",
        variant === "warning"
          ? "border-amber-200 bg-amber-50 text-amber-900"
          : "border-blue-200 bg-blue-50 text-blue-900",
        className,
      )}
    >
      {title && <p className="font-medium">{title}</p>}
      <p className={title ? "mt-1" : undefined}>{content}</p>
    </div>
  );
}
