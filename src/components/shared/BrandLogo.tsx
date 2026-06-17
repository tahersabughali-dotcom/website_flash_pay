"use client";

import Link from "next/link";
import { useState } from "react";
import { settingsData } from "@/data/settingsData";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  asLink?: boolean;
}

export function BrandLogo({
  className,
  imageClassName,
  textClassName,
  asLink = false,
}: BrandLogoProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(settingsData.logo) && !imageFailed;

  const content = showImage ? (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={settingsData.logo}
        alt={settingsData.brandName}
        onError={() => setImageFailed(true)}
        className={cn("h-10 w-auto max-w-[160px] object-contain", imageClassName)}
      />
      <span className="sr-only">{settingsData.brandName}</span>
    </>
  ) : (
    <span
      className={cn(
        "truncate text-base font-semibold text-flash-primary sm:text-lg",
        textClassName,
      )}
    >
      {settingsData.brandName}
    </span>
  );

  const wrapperClass = cn("flex min-w-0 shrink-0 items-center", className);

  if (asLink) {
    return (
      <Link href="/" className={wrapperClass}>
        {content}
      </Link>
    );
  }

  return <div className={wrapperClass}>{content}</div>;
}
