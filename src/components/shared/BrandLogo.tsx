"use client";

import Link from "next/link";
import { useState } from "react";
import { settingsData } from "@/data/settingsData";
import { cn } from "@/lib/utils";

const HEADER_LOGO_SRC = "/images/logo-header.png";
const HEADER_MARK_SRC = "/images/logo-mark.png";

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  asLink?: boolean;
  /** header → mark + text; footer/default → settingsData.logo */
  variant?: "header" | "footer" | "default";
}

function defaultImageClass(variant: BrandLogoProps["variant"]): string {
  if (variant === "header") {
    return "h-[38px] w-auto max-w-[190px] object-contain sm:h-[40px] lg:h-[44px]";
  }
  return "h-10 w-auto max-w-[180px] object-contain sm:h-11";
}

function HeaderBrandMark({
  imageClassName,
  textClassName,
}: {
  imageClassName?: string;
  textClassName?: string;
}) {
  const [markFailed, setMarkFailed] = useState(false);
  const [headerLogoFailed, setHeaderLogoFailed] = useState(false);

  if (!markFailed) {
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HEADER_MARK_SRC}
          alt=""
          aria-hidden
          onError={() => setMarkFailed(true)}
          className={cn(
            "h-[34px] w-auto max-w-[52px] shrink-0 object-contain sm:h-[38px] lg:h-[42px]",
            imageClassName,
          )}
        />
        <span
          className={cn(
            "truncate text-base font-bold tracking-tight text-flash-primary sm:text-lg lg:text-xl",
            textClassName,
          )}
        >
          {settingsData.brandName}
        </span>
      </>
    );
  }

  if (!headerLogoFailed) {
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HEADER_LOGO_SRC}
          alt={settingsData.brandName}
          onError={() => setHeaderLogoFailed(true)}
          className={cn(defaultImageClass("header"), imageClassName)}
        />
        <span className="sr-only">{settingsData.brandName}</span>
      </>
    );
  }

  return (
    <span
      className={cn(
        "truncate text-base font-bold text-flash-primary sm:text-lg lg:text-xl",
        textClassName,
      )}
    >
      {settingsData.brandName}
    </span>
  );
}

export function BrandLogo({
  className,
  imageClassName,
  textClassName,
  asLink = false,
  variant = "default",
}: BrandLogoProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const logoSrc = settingsData.logo;
  const showFooterImage = Boolean(logoSrc) && !imageFailed;

  const content =
    variant === "header" ? (
      <HeaderBrandMark imageClassName={imageClassName} textClassName={textClassName} />
    ) : showFooterImage ? (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt={settingsData.brandName}
          onError={() => setImageFailed(true)}
          className={cn(defaultImageClass(variant), imageClassName)}
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

  const wrapperClass = cn("flex min-w-0 shrink-0 items-center gap-2.5", className);

  if (asLink) {
    return (
      <Link href="/" className={wrapperClass}>
        {content}
      </Link>
    );
  }

  return <div className={wrapperClass}>{content}</div>;
}
