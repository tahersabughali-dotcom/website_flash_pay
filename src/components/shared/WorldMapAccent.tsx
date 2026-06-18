import { cn } from "@/lib/utils";

interface WorldMapAccentProps {
  className?: string;
}

/** Lightweight dotted world-route accent — decorative only */
export function WorldMapAccent({ className }: WorldMapAccentProps) {
  return (
    <div
      className={cn("flash-world-accent pointer-events-none absolute inset-0", className)}
      aria-hidden
    />
  );
}
