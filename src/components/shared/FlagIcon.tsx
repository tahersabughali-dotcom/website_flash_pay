"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FlagIconProps {
  iso2?: string;
  flagImageUrl?: string;
  flagEmoji?: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE = {
  sm: { box: "h-6 w-8 min-w-8", emoji: "text-lg" },
  md: { box: "h-8 w-11 min-w-11", emoji: "text-2xl" },
  lg: { box: "h-10 w-14 min-w-14", emoji: "text-3xl" },
};

export function FlagIcon({
  iso2,
  flagImageUrl,
  flagEmoji,
  alt,
  size = "md",
  className,
}: FlagIconProps) {
  const [failed, setFailed] = useState(false);
  const src = flagImageUrl ?? (iso2 ? `https://flagcdn.com/w80/${iso2.toLowerCase()}.png` : undefined);
  const dimensions = SIZE[size];

  if (src && !failed) {
    return (
      <Image
        src={src}
        alt={alt}
        width={44}
        height={32}
        loading="lazy"
        className={cn(
          "shrink-0 rounded object-cover ring-1 ring-slate-200",
          dimensions.box,
          className,
        )}
        onError={() => setFailed(true)}
      />
    );
  }

  if (flagEmoji) {
    return (
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center leading-none",
          dimensions.emoji,
          className,
        )}
        aria-hidden="true"
      >
        {flagEmoji}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded bg-slate-100 text-slate-500 ring-1 ring-slate-200",
        dimensions.box,
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
      </svg>
    </span>
  );
}
