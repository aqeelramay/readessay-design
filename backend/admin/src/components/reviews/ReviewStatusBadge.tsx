export type ReviewStatusType = 'PUBLISHED' | 'PENDING' | 'HIDDEN' | 'active' | 'draft' | 'archived';

interface ReviewStatusBadgeProps {
  status: ReviewStatusType | string;
  className?: string;
}

export function ReviewStatusBadge({
  status,
  className = "",
}: ReviewStatusBadgeProps) {
  const norm = (status || "").toUpperCase();

  let config: { label: string; styles: string; dot: string };

  if (norm === "PUBLISHED" || norm === "ACTIVE") {
    config = {
      label: "Published",
      styles: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
    };
  } else if (norm === "PENDING" || norm === "DRAFT") {
    config = {
      label: "Pending",
      styles: "bg-amber-50 text-amber-700 border-amber-200",
      dot: "bg-amber-500",
    };
  } else if (norm === "HIDDEN" || norm === "ARCHIVED") {
    config = {
      label: "Hidden",
      styles: "bg-slate-100 text-slate-600 border-slate-200",
      dot: "bg-slate-400",
    };
  } else {
    config = {
      label: status,
      styles: "bg-slate-100 text-slate-600 border-slate-200",
      dot: "bg-slate-400",
    };
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border shrink-0 ${config.styles} ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${config.dot}`}
        aria-hidden="true"
      />
      <span>{config.label}</span>
    </span>
  );
}
