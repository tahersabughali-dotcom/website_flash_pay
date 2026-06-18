/**
 * Hero watermark — inline SVG only (logo-mark.png has opaque white canvas).
 * Light white mark, no wrapper background, opacity on SVG paths only.
 */
export function HeroWatermark() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      <div className="absolute top-1/2 start-[4%] -translate-y-1/2 sm:start-[6%] lg:start-[8%]">
        <svg
          viewBox="0 0 200 180"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[min(58vw,260px)] w-[min(58vw,260px)] sm:h-[min(50vw,280px)] sm:w-[min(50vw,280px)] lg:h-[min(42vw,300px)] lg:w-[min(42vw,300px)]"
          fill="none"
          role="presentation"
        >
          <g fill="#ffffff" fillOpacity="0.1">
            <path d="M36 24v132h22V98h50V78H58V44h72V24H36z" />
            <path d="M32 68L18 80l14 12V68z" fillOpacity="0.06" />
            <path d="M118 24v132h20V86c0-18 14-28 34-28V56c-26 0-38 10-42 26V24h-12z" />
            <path d="M142 24h22l28 66-28 66h-22l-24-54 24-54z" fillOpacity="0.05" />
          </g>
        </svg>
      </div>
    </div>
  );
}
