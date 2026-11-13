import type { BlogStatus } from "@/data/mockBlog";

interface BlogStatusBadgeProps {
  status: BlogStatus;
  className?: string;
}

const STATUS_CONFIG: Record<
  BlogStatus,
  { label: string; dot: string; styles: string }
> = {
  published: {
    label: "Published",
    dot: "bg-emerald-500",
    styles: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  draft: {
    label: "Draft",
    dot: "bg-amber-500",
    styles: "bg-amber-50 text-amber-800 border-amber-200",
  },
  archived: {
    label: "Archived",
    dot: "bg-slate-400",
    styles: "bg-slate-100 text-slate-700 border-slate-200",
  },
};

export function BlogStatusBadge({ status, className = "" }: BlogStatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.draft;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border shrink-0 ${config.styles} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`w-1.5 h-1.5 rounded-full ${config.dot}`}
      />
      <span>{config.label}</span>
    </span>
  );
}

