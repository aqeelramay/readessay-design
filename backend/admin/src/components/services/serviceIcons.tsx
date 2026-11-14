import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  GraduationCap,
  FileText,
  ClipboardList,
  Microscope,
  CheckCircle2,
  Briefcase,
  Award,
  Layers,
  PenTool,
  Calculator,
  TrendingUp,
  Search,
  ShieldCheck,
  Compass,
  Code,
  Scale,
  Binary,
  HeartPulse,
} from "lucide-react";

export interface ServiceIconOption {
  key: string;
  label: string;
  icon: LucideIcon;
}

export const CURATED_SERVICE_ICONS: readonly ServiceIconOption[] = [
  { key: "BookOpen", label: "Book Open", icon: BookOpen },
  { key: "GraduationCap", label: "Graduation Cap", icon: GraduationCap },
  { key: "FileText", label: "File Text", icon: FileText },
  { key: "ClipboardList", label: "Clipboard List", icon: ClipboardList },
  { key: "Microscope", label: "Microscope", icon: Microscope },
  { key: "CheckCircle2", label: "Check Circle", icon: CheckCircle2 },
  { key: "Briefcase", label: "Briefcase", icon: Briefcase },
  { key: "Award", label: "Award", icon: Award },
  { key: "Layers", label: "Layers", icon: Layers },
  { key: "PenTool", label: "Pen Tool", icon: PenTool },
];

export const CURATED_CARD_ICONS: readonly ServiceIconOption[] = [
  { key: "Calculator", label: "Calculator", icon: Calculator },
  { key: "FileText", label: "File Text", icon: FileText },
  { key: "TrendingUp", label: "Trending Up", icon: TrendingUp },
  { key: "Search", label: "Search", icon: Search },
  { key: "CheckCircle2", label: "Check Circle", icon: CheckCircle2 },
  { key: "ShieldCheck", label: "Shield Check", icon: ShieldCheck },
  { key: "BookOpen", label: "Book Open", icon: BookOpen },
  { key: "Award", label: "Award", icon: Award },
  { key: "GraduationCap", label: "Graduation Cap", icon: GraduationCap },
  { key: "Briefcase", label: "Briefcase", icon: Briefcase },
  { key: "Compass", label: "Compass", icon: Compass },
  { key: "Code", label: "Code", icon: Code },
  { key: "Scale", label: "Scale (Law)", icon: Scale },
  { key: "Binary", label: "Binary Data", icon: Binary },
  { key: "HeartPulse", label: "Healthcare", icon: HeartPulse },
  { key: "Microscope", label: "Microscope", icon: Microscope },
];

export function ServiceIcon({
  iconKey,
  className,
}: {
  iconKey?: string;
  className?: string;
}) {
  switch (iconKey) {
    case "BookOpen":
      return <BookOpen className={className} />;
    case "GraduationCap":
      return <GraduationCap className={className} />;
    case "FileText":
      return <FileText className={className} />;
    case "ClipboardList":
      return <ClipboardList className={className} />;
    case "Microscope":
      return <Microscope className={className} />;
    case "CheckCircle2":
      return <CheckCircle2 className={className} />;
    case "Briefcase":
      return <Briefcase className={className} />;
    case "Award":
      return <Award className={className} />;
    case "Layers":
      return <Layers className={className} />;
    case "PenTool":
      return <PenTool className={className} />;
    case "Calculator":
      return <Calculator className={className} />;
    case "TrendingUp":
      return <TrendingUp className={className} />;
    case "Search":
      return <Search className={className} />;
    case "ShieldCheck":
      return <ShieldCheck className={className} />;
    case "Compass":
      return <Compass className={className} />;
    case "Code":
      return <Code className={className} />;
    case "Scale":
      return <Scale className={className} />;
    case "Binary":
      return <Binary className={className} />;
    case "HeartPulse":
      return <HeartPulse className={className} />;
    default:
      return <BookOpen className={className} />;
  }
}
