import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Wrench,
  MessageSquareQuote,
  BookOpen,
  GraduationCap,
  ClipboardList,
  FileText,
  File,
  Users,
} from "lucide-react";

export type ModuleAccent =
  | "orange"
  | "blue"
  | "amber"
  | "emerald"
  | "purple"
  | "rose"
  | "teal"
  | "indigo"
  | "cyan";

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  // Mock placeholder metadata for UI shell stage — replace with NestJS API data later
  badge: string;
  description: string;
  action: string;
  accent: ModuleAccent;
  icon: LucideIcon;
}

/**
 * Single source of truth for all 9 navigation items and dashboard module cards.
 * Order strictly matches the ReadEssay Admin Panel design specification:
 * 1. Dashboard (/)
 * 2. Services (/services)
 * 3. Reviews (/reviews)
 * 4. Samples (/samples)
 * 5. Top Experts (/top-experts)
 * 6. Orders (/orders)
 * 7. Blog (/blog)
 * 8. Pages (/pages)
 * 9. Users (/users)
 */
export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/",
    // Mock placeholder metadata for UI shell stage — replace with NestJS API data later
    badge: "Current",
    description:
      "Central administrative hub, operational overview, and workspace launchpad.",
    action: "Active Overview",
    accent: "orange",
    icon: LayoutDashboard,
  },
  {
    id: "services",
    label: "Services",
    href: "/services",
    // Mock placeholder metadata for UI shell stage — replace with NestJS API data later
    badge: "14 Tiers",
    description:
      "Manage essay writing packages, turnaround times, pricing tiers & academic tiers.",
    action: "Configure Services",
    accent: "blue",
    icon: Wrench,
  },
  {
    id: "reviews",
    label: "Reviews",
    href: "/reviews",
    // Mock placeholder metadata for UI shell stage — replace with NestJS API data later
    badge: "4.92 ★ (2.4k)",
    description:
      "Student testimonials, verified ratings, feedback moderation & client sentiment.",
    action: "Moderate Reviews",
    accent: "amber",
    icon: MessageSquareQuote,
  },
  {
    id: "samples",
    label: "Samples",
    href: "/samples",
    // Mock placeholder metadata for UI shell stage — replace with NestJS API data later
    badge: "128 Exemplars",
    description:
      "Academic sample repository, plagiarism-checked exemplars & citations archive.",
    action: "Manage Repository",
    accent: "emerald",
    icon: BookOpen,
  },
  {
    id: "top-experts",
    label: "Top Experts",
    href: "/top-experts",
    // Mock placeholder metadata for UI shell stage — replace with NestJS API data later
    badge: "42 PhD / MA",
    description:
      "Vetted academic writers, credentials verification & workload balancing.",
    action: "View Writer Roster",
    accent: "purple",
    icon: GraduationCap,
  },
  {
    id: "orders",
    label: "Orders",
    href: "/orders",
    // Mock placeholder metadata for UI shell stage — replace with NestJS API data later
    badge: "142 In Queue",
    description:
      "Order fulfillment queue, customer briefs, deadlines & milestone tracking.",
    action: "Manage Order Queue",
    accent: "rose",
    icon: ClipboardList,
  },
  {
    id: "blog",
    label: "Blog",
    href: "/blog",
    // Mock placeholder metadata for UI shell stage — replace with NestJS API data later
    badge: "84 Articles",
    description:
      "Educational articles, admissions guides, research tips & SEO publications.",
    action: "Publish Articles",
    accent: "teal",
    icon: FileText,
  },
  {
    id: "pages",
    label: "Pages",
    href: "/pages",
    // Mock placeholder metadata for UI shell stage — replace with NestJS API data later
    badge: "22 Static Pages",
    description:
      "Static site page builder, policy documents, terms of service & SEO metadata.",
    action: "Edit Site Pages",
    accent: "indigo",
    icon: File,
  },
  {
    id: "users",
    label: "Users",
    href: "/users",
    // Mock placeholder metadata for UI shell stage — replace with NestJS API data later
    badge: "8,430 Users",
    description:
      "Client accounts, staff permissions, writer roles & RBAC access control.",
    action: "Manage Users & Roles",
    accent: "cyan",
    icon: Users,
  },
] as const;

/**
 * Visual styling tokens mapped to each module accent color.
 * Used across the dashboard module cards, icon containers, and badges.
 * The orange accent uses a neutral cool-grey pill so the "Current" badge
 * on the Dashboard card remains subtle slate while icon and actions stay orange.
 */
export const ACCENT_STYLES: Record<
  ModuleAccent,
  {
    iconBg: string;
    iconColor: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    hoverBorder: string;
  }
> = {
  orange: {
    iconBg: "bg-orange-500/10 dark:bg-orange-500/20",
    iconColor: "text-orange-600 dark:text-orange-400",
    badgeBg: "bg-slate-100",
    badgeText: "text-slate-600",
    badgeBorder: "border-slate-200",
    hoverBorder: "hover:border-orange-500/40",
  },
  blue: {
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    badgeBg: "bg-blue-50 dark:bg-blue-950/40",
    badgeText: "text-blue-700 dark:text-blue-300",
    badgeBorder: "border-blue-200 dark:border-blue-800/40",
    hoverBorder: "hover:border-blue-500/40",
  },
  amber: {
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
    iconColor: "text-amber-600 dark:text-amber-400",
    badgeBg: "bg-amber-50 dark:bg-amber-950/40",
    badgeText: "text-amber-700 dark:text-amber-300",
    badgeBorder: "border-amber-200 dark:border-amber-800/40",
    hoverBorder: "hover:border-amber-500/40",
  },
  emerald: {
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/40",
    badgeText: "text-emerald-700 dark:text-emerald-300",
    badgeBorder: "border-emerald-200 dark:border-emerald-800/40",
    hoverBorder: "hover:border-emerald-500/40",
  },
  purple: {
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20",
    iconColor: "text-purple-600 dark:text-purple-400",
    badgeBg: "bg-purple-50 dark:bg-purple-950/40",
    badgeText: "text-purple-700 dark:text-purple-300",
    badgeBorder: "border-purple-200 dark:border-purple-800/40",
    hoverBorder: "hover:border-purple-500/40",
  },
  rose: {
    iconBg: "bg-rose-500/10 dark:bg-rose-500/20",
    iconColor: "text-rose-600 dark:text-rose-400",
    badgeBg: "bg-rose-50 dark:bg-rose-950/40",
    badgeText: "text-rose-700 dark:text-rose-300",
    badgeBorder: "border-rose-200 dark:border-rose-800/40",
    hoverBorder: "hover:border-rose-500/40",
  },
  teal: {
    iconBg: "bg-teal-500/10 dark:bg-teal-500/20",
    iconColor: "text-teal-600 dark:text-teal-400",
    badgeBg: "bg-teal-50 dark:bg-teal-950/40",
    badgeText: "text-teal-700 dark:text-teal-300",
    badgeBorder: "border-teal-200 dark:border-teal-800/40",
    hoverBorder: "hover:border-teal-500/40",
  },
  indigo: {
    iconBg: "bg-indigo-500/10 dark:bg-indigo-500/20",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    badgeBg: "bg-indigo-50 dark:bg-indigo-950/40",
    badgeText: "text-indigo-700 dark:text-indigo-300",
    badgeBorder: "border-indigo-200 dark:border-indigo-800/40",
    hoverBorder: "hover:border-indigo-500/40",
  },
  cyan: {
    iconBg: "bg-cyan-500/10 dark:bg-cyan-500/20",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    badgeBg: "bg-cyan-50 dark:bg-cyan-950/40",
    badgeText: "text-cyan-700 dark:text-cyan-300",
    badgeBorder: "border-cyan-200 dark:border-cyan-800/40",
    hoverBorder: "hover:border-cyan-500/40",
  },
};
