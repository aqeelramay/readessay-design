import Link from "next/link";
import { ArrowLeft, Info, Sparkles } from "lucide-react";
import {
  NAVIGATION_ITEMS,
  ACCENT_STYLES,
  type NavigationItem,
} from "@/config/navigation";
import { StatusBadge } from "./StatusBadge";

interface ModulePlaceholderProps {
  moduleId: string;
}

export function ModulePlaceholder({ moduleId }: ModulePlaceholderProps) {
  const item: NavigationItem | undefined = NAVIGATION_ITEMS.find(
    (navItem) => navItem.id === moduleId
  );

  if (!item) {
    return (
      <div className="bg-surface border border-border rounded-xl p-8 text-center">
        <h1 className="text-xl font-bold text-text-primary">Module Not Found</h1>
        <p className="text-sm text-text-secondary mt-2">
          The requested administrative module does not exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-orange text-white text-sm font-medium hover:bg-orange-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const styles = ACCENT_STYLES[item.accent] ?? ACCENT_STYLES.orange;
  const Icon = item.icon;

  return (
    <div className="space-y-6">
      {/* Back to Dashboard Navigation */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-orange transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Main Module Card */}
      <section
        aria-label={`${item.label} Module Header`}
        className="bg-surface border border-border rounded-xl p-6 sm:p-8 shadow-xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Icon Tile */}
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${styles.iconBg} ${styles.iconColor}`}
            >
              <Icon className="w-6 h-6" aria-hidden="true" />
            </div>

            {/* Title & Metadata */}
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-[26px] font-bold text-text-primary tracking-tight">
                  {item.label}
                </h1>
                <StatusBadge accent={item.accent} label={item.badge} />
              </div>
              <p className="text-sm text-text-secondary mt-2 max-w-2xl leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>

          {/* Action Trigger Placeholder */}
          <div className="shrink-0 sm:self-center">
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border text-text-muted text-xs font-medium cursor-not-allowed opacity-75"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{item.action}</span>
            </button>
          </div>
        </div>

        {/* Integration Notice Callout */}
        <div className="mt-8 p-4 rounded-lg bg-canvas border border-border flex items-start gap-3">
          <Info className="w-5 h-5 text-text-secondary shrink-0 mt-0.5" />
          <div className="text-sm text-text-secondary space-y-1">
            <p className="font-medium text-text-primary">
              Workspace Schema Ready
            </p>
            <p className="leading-relaxed">
              Module workspace ready for NestJS API integration in upcoming
              development phases. Endpoints, data grids, and CRUD interfaces will be
              wired here.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

