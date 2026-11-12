import Link from "next/link";
import { ClipboardList, Download } from "lucide-react";

export function WelcomePanel() {
  return (
    <section
      aria-label="Welcome and operational status"
      className="bg-surface border border-border rounded-xl shadow-xs p-6 sm:p-7"
    >
      {/* Top Status & Metadata Row */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span
            className="w-1.5 h-1.5 rounded-full bg-success"
            aria-hidden="true"
          />
          Systems Nominal
        </span>
        <span className="text-xs text-text-secondary">
          Thu, Nov 12, 2026 • All Queues Synchronized
        </span>
      </div>

      {/* Main Content & Actions Row */}
      <div className="mt-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-[26px] font-bold text-text-primary tracking-tight">
            Welcome to ReadEssay Operations Studio
          </h1>
          <p className="text-sm text-text-secondary max-w-xl mt-1.5 leading-relaxed">
            Centralized administrative hub for managing essays, reviewing submissions,
            moderating client feedback, and directing top academic writers.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/orders"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-orange hover:bg-orange-hover text-white text-sm font-medium shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40"
          >
            <ClipboardList className="w-4 h-4" />
            <span>Open Orders View</span>
          </Link>
          <button
            type="button"
            disabled
            aria-disabled="true"
            title="Audit export will be enabled once backend audit logs are connected"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-surface border border-border text-text-secondary text-sm font-medium opacity-60 cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            <span>Export Audit</span>
          </button>
        </div>
      </div>
    </section>
  );
}

