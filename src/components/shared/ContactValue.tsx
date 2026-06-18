import { LtrText } from "@/components/shared/LtrText";
import { cn } from "@/lib/utils";

interface ContactValueProps {
  value: string;
  href?: string;
  className?: string;
  linkClassName?: string;
}

/** Official contact values (phone, email, URL) — always LTR in Arabic pages. */
export function ContactValue({
  value,
  href,
  className,
  linkClassName,
}: ContactValueProps) {
  const text = (
    <LtrText className={cn("text-sm font-medium", className)}>{value}</LtrText>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={cn(
          "mt-1 block text-flash-primary hover:underline",
          linkClassName,
        )}
      >
        {text}
      </a>
    );
  }

  return <div className="mt-1">{text}</div>;
}
