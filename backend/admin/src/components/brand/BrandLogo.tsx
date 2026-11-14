interface BrandLogoProps {
  surface?: "dark" | "light";
  compact?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  showText?: boolean;
}

export function BrandLogo({
  surface = "dark",
  compact = false,
  size = "md",
  className = "",
  showText = true,
}: BrandLogoProps) {
  const isDark = surface === "dark";

  // Size variations
  const sizeMap = {
    sm: {
      emblem: "w-7 h-7",
      title: "text-sm sm:text-base",
      tagline: "text-[9px]",
      gap: "gap-2 sm:gap-2.5",
    },
    md: {
      emblem: "w-8 h-8",
      title: "text-base sm:text-lg",
      tagline: "text-[10px]",
      gap: "gap-2.5",
    },
    lg: {
      emblem: "w-10 h-10",
      title: "text-xl sm:text-2xl",
      tagline: "text-xs",
      gap: "gap-3",
    },
  };

  const currentSize = sizeMap[size] ?? sizeMap.md;

  return (
    <div
      className={`inline-flex items-center select-none ${currentSize.gap} ${className}`}
    >
      {/* Official ReadEssay Emblem — Dark circular badge with orange head & sweeping stylized R */}
      <div
        className={`${currentSize.emblem} rounded-full shrink-0 relative overflow-hidden`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Dark circular badge container (#1D2B39 / #222222) with contrast ring */}
          <circle
            cx="20"
            cy="20"
            r="19"
            fill="#1D2B39"
            stroke={
              isDark ? "rgba(255, 255, 255, 0.16)" : "rgba(36, 52, 69, 0.15)"
            }
            strokeWidth="1.2"
          />

          {/* Signature Orange Head (#FF641A) */}
          <circle cx="15.5" cy="13.5" r="3.4" fill="#FF641A" />

          {/* Sweeping Stylized 'R' Curves (#FF641A) */}
          <path
            d="M 12 18.5 C 12 18.5 13.5 18 16 18 C 19.5 18 22.8 19.2 23 22.5 C 23.2 25.5 20.2 26.8 17 26.8 C 15 26.8 13.5 26.5 12 26"
            stroke="#FF641A"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 18.5 26.5 C 20.5 28.5 23 31.5 26.5 32"
            stroke="#FF641A"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 21.5 13 C 25.5 14 27.5 17 26.5 20.5"
            stroke="#FF641A"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typography: Wordmark + Optional Subtitle */}
      {showText && (
        <div className="flex flex-col text-left">
          <span
            className={`font-bold tracking-tight font-sans ${currentSize.title} ${
              isDark ? "text-white" : "text-[#243445]"
            }`}
          >
            ReadEssay
          </span>

          {!compact && (
            <span
              className={`font-semibold tracking-wider uppercase ${currentSize.tagline} ${
                isDark ? "text-slate-300" : "text-slate-500"
              }`}
            >
              Academic Writing
            </span>
          )}
        </div>
      )}
    </div>
  );
}
