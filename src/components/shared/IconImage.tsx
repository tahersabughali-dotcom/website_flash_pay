"use client";

import Image from "next/image";
import { useState } from "react";
import { FALLBACK_ICON } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface IconImageProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  framed?: boolean;
}

export function IconImage({ src, alt, size = 32, className, framed = false }: IconImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src || FALLBACK_ICON);

  const image = (
    <Image
      src={currentSrc}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      className={cn("shrink-0 object-contain", className)}
      onError={() => {
        if (currentSrc !== FALLBACK_ICON) setCurrentSrc(FALLBACK_ICON);
      }}
    />
  );

  if (!framed) return image;

  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-lg bg-slate-50 ring-1 ring-slate-100"
      style={{ width: size + 8, height: size + 8 }}
    >
      {image}
    </span>
  );
}
