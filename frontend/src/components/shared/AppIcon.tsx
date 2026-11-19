import React from 'react';
import {
  AlarmCheck,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeDollarSign,
  Banknote,
  BarChart3,
  BookMarked,
  BookOpen,
  Brain,
  Briefcase,
  Building,
  Building2,
  Calculator,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Code,
  Compass,
  Dna,
  Eye,
  Factory,
  FileEdit,
  FileSearch,
  FileSignature,
  FileText,
  FilterX,
  Flag,
  FolderOpen,
  FolderX,
  Gavel,
  Globe,
  GraduationCap,
  Headphones,
  Headset,
  HelpCircle,
  History,
  Home,
  Landmark,
  Laptop,
  LayoutGrid,
  Library,
  LineChart,
  Lock,
  LockOpen,
  Mail,
  Medal,
  Megaphone,
  MessageSquare,
  Network,
  Paperclip,
  Phone,
  PieChart,
  Quote,
  Receipt,
  RotateCw,
  Search,
  SearchX,
  ShieldCheck,
  Sigma,
  Smartphone,
  Sparkles,
  Terminal,
  ThumbsUp,
  Timer,
  TrendingUp,
  Upload,
  Users,
  Wallet,
  X,
  type LucideIcon,
} from 'lucide-react';

/* ==========================================================================
   Crisp Filled SVG Icons (for 100% fidelity where Material Symbols "FILL" 1
   or solid filled visual weight was intended)
   ========================================================================== */

const FilledCheckCircle: React.FC<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }> = ({
  className,
  'aria-hidden': ariaHidden = true,
}) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden={ariaHidden}>
    <path
      fillRule="evenodd"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
      clipRule="evenodd"
    />
  </svg>
);

const FilledVerified: React.FC<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }> = ({
  className,
  'aria-hidden': ariaHidden = true,
}) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden={ariaHidden}>
    <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z" />
  </svg>
);

const FilledVerifiedUser: React.FC<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }> = ({
  className,
  'aria-hidden': ariaHidden = true,
}) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden={ariaHidden}>
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
  </svg>
);

const FilledShield: React.FC<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }> = ({
  className,
  'aria-hidden': ariaHidden = true,
}) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden={ariaHidden}>
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
  </svg>
);

const FilledStar: React.FC<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }> = ({
  className,
  'aria-hidden': ariaHidden = true,
}) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden={ariaHidden}>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const OutlineStar: React.FC<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }> = ({
  className,
  'aria-hidden': ariaHidden = true,
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden={ariaHidden}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const FilledFolderSpecial: React.FC<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }> = ({
  className,
  'aria-hidden': ariaHidden = true,
}) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden={ariaHidden}>
    <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-2.01 9l-2.09-1.52-2.09 1.52.8-2.45-2.09-1.52h2.58l.8-2.45.8 2.45h2.58l-2.09 1.52.8 2.45z" />
  </svg>
);

const FilledFactCheck: React.FC<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }> = ({
  className,
  'aria-hidden': ariaHidden = true,
}) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden={ariaHidden}>
    <path
      fillRule="evenodd"
      d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 16.17l-3.59-3.59L6.83 11.17 9 13.34l6.59-6.59 1.42 1.42L9 16.17zM14 10h5v2h-5v-2zm0 4h5v2h-5v-2z"
      clipRule="evenodd"
    />
  </svg>
);

const FilledShoppingCart: React.FC<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }> = ({
  className,
  'aria-hidden': ariaHidden = true,
}) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden={ariaHidden}>
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

const FilledBolt: React.FC<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }> = ({
  className,
  'aria-hidden': ariaHidden = true,
}) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden={ariaHidden}>
    <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.9 17.55 11 21 11 21z" />
  </svg>
);

const FallbackIcon: React.FC<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }> = ({
  className,
  'aria-hidden': ariaHidden = true,
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden={ariaHidden}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

/* ==========================================================================
   Class Name Normalizer
   Strips material-symbols classes and maps text-[...px] / text-sm to
   corresponding Tailwind w-... h-... and shrink-0 dimensions.
   ========================================================================== */

function normalizeClasses(className: string = ''): string {
  // Strip out any legacy font classes
  let cleaned = className
    .replace(/\bmaterial-symbols(?:-outlined)?\b/g, '')
    .trim();

  // Check if width & height are already defined
  const hasWidth = /\bw-(?:\d+|\[[^\]]+\]|auto|full)\b/.test(cleaned);
  const hasHeight = /\bh-(?:\d+|\[[^\]]+\]|auto|full)\b/.test(cleaned);

  if (!hasWidth || !hasHeight) {
    // Map text-[...px] or font size classes to w & h
    const pxMatch = cleaned.match(/\btext-\[(\d+)px\]\b/);
    if (pxMatch) {
      const px = parseInt(pxMatch[1], 10);
      cleaned = cleaned.replace(/\btext-\[\d+px\]\b/g, '');
      let sizeClass = `w-[${px}px] h-[${px}px]`;
      if (px === 12) sizeClass = 'w-3 h-3';
      else if (px === 14) sizeClass = 'w-3.5 h-3.5';
      else if (px === 16) sizeClass = 'w-4 h-4';
      else if (px === 18) sizeClass = 'w-[18px] h-[18px]';
      else if (px === 20) sizeClass = 'w-5 h-5';
      else if (px === 22) sizeClass = 'w-[22px] h-[22px]';
      else if (px === 24) sizeClass = 'w-6 h-6';
      else if (px === 28) sizeClass = 'w-7 h-7';
      else if (px === 32) sizeClass = 'w-8 h-8';
      else if (px === 36) sizeClass = 'w-9 h-9';
      cleaned = `${sizeClass} ${cleaned}`;
    } else if (/\btext-xs\b/.test(cleaned)) {
      cleaned = `w-3 h-3 ${cleaned.replace(/\btext-xs\b/g, '')}`;
    } else if (/\btext-sm\b/.test(cleaned)) {
      cleaned = `w-4 h-4 ${cleaned.replace(/\btext-sm\b/g, '')}`;
    } else if (/\btext-base\b/.test(cleaned)) {
      cleaned = `w-4 h-4 ${cleaned.replace(/\btext-base\b/g, '')}`;
    } else if (/\btext-lg\b/.test(cleaned)) {
      cleaned = `w-5 h-5 ${cleaned.replace(/\btext-lg\b/g, '')}`;
    } else if (/\btext-xl\b/.test(cleaned)) {
      cleaned = `w-5 h-5 ${cleaned.replace(/\btext-xl\b/g, '')}`;
    } else if (/\btext-2xl\b/.test(cleaned)) {
      cleaned = `w-6 h-6 ${cleaned.replace(/\btext-2xl\b/g, '')}`;
    } else if (/\btext-3xl\b/.test(cleaned)) {
      cleaned = `w-7 h-7 ${cleaned.replace(/\btext-3xl\b/g, '')}`;
    } else {
      // Default fallback size
      cleaned = `w-5 h-5 ${cleaned}`;
    }
  }

  if (!/\bshrink-0\b/.test(cleaned)) {
    cleaned = `shrink-0 ${cleaned}`;
  }

  return cleaned.replace(/\s+/g, ' ').trim();
}

/* ==========================================================================
   Lucide Icon Mapping Dictionary
   ========================================================================== */

const LUCIDE_ICON_MAP: Record<string, LucideIcon> = {
  account_balance: Landmark,
  account_balance_wallet: Wallet,
  alarm_on: AlarmCheck,
  analytics: BarChart3,
  apartment: Building,
  apps: LayoutGrid,
  arrow_back: ArrowLeft,
  arrow_forward: ArrowRight,
  arrow_outward: ArrowUpRight,
  assignment_turned_in: ClipboardCheck,
  attachment: Paperclip,
  auto_stories: BookOpen,
  bar_chart: BarChart3,
  biotech: Dna,
  business_center: Briefcase,
  calculate: Calculator,
  call: Phone,
  campaign: Megaphone,
  celebration: Sparkles,
  chat: MessageSquare,
  check: Check,
  chevron_right: ChevronRight,
  close: X,
  code: Code,
  corporate_fare: Building2,
  description: FileText,
  edit_document: FileEdit,
  edit_note: FileEdit,
  error: AlertCircle,
  expand_more: ChevronDown,
  explore: Compass,
  eye_tracking: Eye,
  filter_alt_off: FilterX,
  find_in_page: FileSearch,
  flag: Flag,
  folder_off: FolderX,
  folder_open: FolderOpen,
  format_quote: Quote,
  functions: Sigma,
  gavel: Gavel,
  groups: Users,
  headset_mic: Headphones,
  history: History,
  history_edu: BookMarked,
  home: Home,
  hotel_class: Award,
  hub: Network,
  language: Globe,
  laptop_chromebook: Laptop,
  local_library: Library,
  lock: Lock,
  lock_open: LockOpen,
  mail: Mail,
  menu_book: BookOpen,
  military_tech: Medal,
  payments: Banknote,
  phone_iphone: Smartphone,
  pie_chart: PieChart,
  precision_manufacturing: Factory,
  price_check: BadgeDollarSign,
  psychology: Brain,
  public: Globe,
  published_with_changes: FileSignature,
  query_stats: LineChart,
  quiz: HelpCircle,
  receipt_long: Receipt,
  refresh: RotateCw,
  schedule: Clock,
  school: GraduationCap,
  search: Search,
  search_off: SearchX,
  security: ShieldCheck,
  shield_lock: ShieldCheck,
  support_agent: Headset,
  task_alt: CheckCircle2,
  terminal: Terminal,
  thumb_up: ThumbsUp,
  timer: Timer,
  trending_up: TrendingUp,
  upload_file: Upload,
  visibility: Eye,
  workspace_premium: Award,
};

/* ==========================================================================
   Public AppIcon Component
   ========================================================================== */

export interface AppIconProps {
  name: string;
  className?: string;
  filled?: boolean;
  style?: React.CSSProperties;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export default function AppIcon({
  name,
  className = '',
  filled,
  style,
  'aria-hidden': ariaHidden = true,
}: AppIconProps) {
  const normName = (name || '').trim().toLowerCase().replace(/-/g, '_');
  const finalClass = normalizeClasses(className);

  // 1. Custom crisp filled SVG overrides
  if (normName === 'check_circle' || (normName === 'check' && filled)) {
    return <FilledCheckCircle className={finalClass} aria-hidden={ariaHidden} />;
  }

  if (normName === 'verified') {
    return <FilledVerified className={finalClass} aria-hidden={ariaHidden} />;
  }

  if (normName === 'verified_user') {
    return <FilledVerifiedUser className={finalClass} aria-hidden={ariaHidden} />;
  }

  if (normName === 'shield') {
    return <FilledShield className={finalClass} aria-hidden={ariaHidden} />;
  }

  if (normName === 'folder_special') {
    return <FilledFolderSpecial className={finalClass} aria-hidden={ariaHidden} />;
  }

  if (normName === 'fact_check') {
    return <FilledFactCheck className={finalClass} aria-hidden={ariaHidden} />;
  }

  if (normName === 'shopping_cart') {
    return <FilledShoppingCart className={finalClass} aria-hidden={ariaHidden} />;
  }

  if (normName === 'bolt') {
    return <FilledBolt className={finalClass} aria-hidden={ariaHidden} />;
  }

  if (normName === 'star' || normName === 'grade') {
    if (filled === false) {
      return <OutlineStar className={finalClass} aria-hidden={ariaHidden} />;
    }
    return <FilledStar className={finalClass} aria-hidden={ariaHidden} />;
  }

  // 2. Lucide mapped icons
  const LucideComp = LUCIDE_ICON_MAP[normName];
  if (LucideComp) {
    return <LucideComp className={finalClass} style={style} aria-hidden={ariaHidden} />;
  }

  // 3. Fallback inline SVG (zero raw text, zero FOIT/FOUT)
  return <FallbackIcon className={finalClass} aria-hidden={ariaHidden} />;
}
