import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  ACCENT_STYLES,
  resolveNavigationBadge,
  type NavigationItem,
} from "@/config/navigation";
import type { DashboardStatsResponse } from "@/lib/api";

interface ModuleCardProps {
  item: NavigationItem;
  stats?: DashboardStatsResponse | null;
}

export function ModuleCard({ item, stats }: ModuleCardProps) {
  const styles = ACCENT_STYLES[item.accent] ?? ACCENT_STYLES.orange;
  const Icon = item.icon;
  const isDashboard = item.id === "dashboard";
  const badgeText = resolveNavigationBadge(item, stats);

  return (
    <Link
      href={item.href}
      className={`group flex flex-col justify-between h-full bg-surface border border-border rounded-xl p-6 shadow-2xs transition-all duration-150 hover:shadow-sm ${styles.hoverBorder}`}
    >
      <div>
        {/* Top row: Icon on left, status badge on right */}
        <div className="flex items-center justify-between gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${styles.iconBg} ${styles.iconColor}`}
          >
            <Icon className="w-5 h-5" aria-hidden="true" />
          </div>
          {badgeText && (
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${styles.badgeBg} ${styles.badgeText} ${styles.badgeBorder}`}
            >
              {badgeText}
            </span>
          )}
        </div>

        {/* Content row: Title & description */}
        <div className="mt-5">
          <h3 className="text-base font-semibold text-text-primary tracking-tight">
            {item.label}
          </h3>
          <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Bottom action row */}
      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-sm font-medium">
        <span
          className={
            isDashboard
              ? "text-orange"
              : "text-text-primary group-hover:text-orange transition-colors"
          }
        >
          {item.action}
        </span>
        <ArrowRight
          className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 shrink-0 ${isDashboard
            ? "text-orange"
            : "text-text-muted group-hover:text-orange transition-colors"
            }`}
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}

