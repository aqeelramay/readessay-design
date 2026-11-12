import type { ServiceStatus } from "@/data/mockServices";

interface ServiceStatusBadgeProps {
  status: ServiceStatus;
  className?: string;
}

export function ServiceStatusBadge({
  status,
  className = "",
}: ServiceStatusBadgeProps) {
  const config = {
    active: {
      label: "Active",
      styles: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
    },
    draft: {
      label: "Draft",
      styles: "bg-amber-50 text-amber-700 border-amber-200",
      dot: "bg-amber-500",
    },
    archived: {
      label: "Archived",
      styles: "bg-slate-100 text-slate-600 border-slate-200",
      dot: "bg-slate-400",
    },
  }[status] ?? {
    label: status,
    styles: "bg-slate-100 text-slate-600 border-slate-200",
    dot: "bg-slate-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border shrink-0 ${config.styles} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} aria-hidden="true" />
      <span>{config.label}</span>
    </span>
  );
}

