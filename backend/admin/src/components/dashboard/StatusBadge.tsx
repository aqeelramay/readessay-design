import { ACCENT_STYLES, type ModuleAccent } from "@/config/navigation";

interface StatusBadgeProps {
  accent: ModuleAccent;
  label: string;
  className?: string;
}

export function StatusBadge({ accent, label, className = "" }: StatusBadgeProps) {
  const styles = ACCENT_STYLES[accent] ?? ACCENT_STYLES.orange;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border shrink-0 ${styles.badgeBg} ${styles.badgeText} ${styles.badgeBorder} ${className}`}
    >
      {label}
    </span>
  );
}

