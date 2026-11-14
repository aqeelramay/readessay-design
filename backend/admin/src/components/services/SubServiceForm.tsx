"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Save,
  Globe,
  FileText,
  FolderTree,
  Video,
  Layers,
  GraduationCap,
  ShieldCheck,
  UserCheck,
  Star,
  ExternalLink,
} from "lucide-react";
import type {
  MainService,
  SubService,
  ServiceStatus,
  AccentColor,
  SolutionCard,
  AcademicLevel,
  AccountabilityPillar,
  FeaturedExpert,
  FAQItem,
} from "@/data/mockServices";
import { ServiceStatusBadge } from "./ServiceStatusBadge";
import { CURATED_CARD_ICONS, ServiceIcon } from "./serviceIcons";
import { parseYouTubeVideoId } from "./youtubeUtils";

interface SubServiceFormProps {
  subService?: SubService;
  mainServices: MainService[];
  defaultParentSlug?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const ACCENT_STYLES: Record<
  AccentColor,
  { label: string; badge: string; border: string; bg: string; text: string }
> = {
  orange: {
    label: "Orange",
    badge: "bg-orange/10 text-orange border-orange/20",
    border: "border-orange/40",
    bg: "bg-orange/5",
    text: "text-orange",
  },
  green: {
    label: "Green",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    border: "border-emerald-300",
    bg: "bg-emerald-50/40",
    text: "text-emerald-700",
  },
  navy: {
    label: "Navy",
    badge: "bg-slate-100 text-slate-800 border-slate-300",
    border: "border-slate-300",
    bg: "bg-slate-50",
    text: "text-navy",
  },
};

export function SubServiceForm({
  subService,
  mainServices,
  defaultParentSlug,
}: SubServiceFormProps) {
  const router = useRouter();
  const isEditing = Boolean(subService);

  // Derive initial parent ID
  const initialParentId =
    subService?.parentId ||
    (defaultParentSlug
      ? mainServices.find((m) => m.slug === defaultParentSlug)?.id
      : mainServices[0]?.id) ||
    "";

  // Hierarchy & Core
  const [parentId, setParentId] = useState(initialParentId);
  const [name, setName] = useState(subService?.name ?? "");
  const [slug, setSlug] = useState(subService?.slug ?? "");
  const [isSlugCustomized, setIsSlugCustomized] = useState(isEditing);
  const [shortIntro, setShortIntro] = useState(subService?.shortIntro ?? "");
  const [status, setStatus] = useState<ServiceStatus>(
    subService?.status ?? "active"
  );
  const [displayOrder, setDisplayOrder] = useState<number>(
    subService?.displayOrder ?? 1
  );

  // Hero Section
  const [heroTagline, setHeroTagline] = useState(
    subService?.heroTagline ?? "Professional Academic Financial Guidance"
  );
  const [heroH1, setHeroH1] = useState(
    subService?.heroH1 ??
      "Professional Accounting & Financial Reporting Assignment Help for University Students"
  );
  const [heroSummary, setHeroSummary] = useState(
    subService?.heroSummary ??
      "Master complex balance sheets, ledger reconciliations, cash-flow statements, and IFRS/GAAP standards with step-by-step analytical breakdowns."
  );

  // Specialized Assistance & Video
  const [saTagline, setSaTagline] = useState(
    subService?.specializedAssistance?.tagline ??
      "Methodological Rigor & Technical Precision"
  );
  const [saHeading, setSaHeading] = useState(
    subService?.specializedAssistance?.heading ??
      "Specialized Accounting Assistance Built Upon Exact Institutional Rubrics"
  );
  const [saBodyParagraphs, setSaBodyParagraphs] = useState(
    subService?.specializedAssistance?.bodyParagraphs ??
      "Navigating advanced university accounting coursework requires balancing conceptual standards with granular numerical accuracy. Our specialized accounting educators assist undergraduate and postgraduate scholars through complex financial statements, corporate taxation calculations, managerial cost allocations, and statutory auditing case studies.\n\nEvery assignment solution includes complete double-entry ledger trails, formula-annotated calculation tables, and contextual business analysis memos that explain the strategic implications behind every number."
  );
  const [saCtaLabel, setSaCtaLabel] = useState(
    subService?.specializedAssistance?.ctaLabel ?? "Explore Accounting Solutions"
  );
  const [saCtaUrl, setSaCtaUrl] = useState(
    subService?.specializedAssistance?.ctaUrl ??
      "/services/sub-services/accounting-assignment-help"
  );
  const [saYoutubeUrl, setSaYoutubeUrl] = useState(
    subService?.specializedAssistance?.youtubeUrl ??
      "https://www.youtube.com/embed/OaqUwnjm9Xo"
  );

  // Detailed Solutions (Repeatable Cards)
  const [dsTagline, setDsTagline] = useState(
    subService?.detailedSolutions?.tagline ?? "Core Disciplinary Breakdown"
  );
  const [dsHeading, setDsHeading] = useState(
    subService?.detailedSolutions?.heading ??
      "Targeted Accounting Problem-Solving Across 5 Core Fields"
  );
  const [dsIntro, setDsIntro] = useState(
    subService?.detailedSolutions?.intro ??
      "From entry-level journal vouchers to advanced corporate valuations, our specialists handle every accounting sub-discipline with verified calculation accuracy."
  );
  const [dsCards, setDsCards] = useState<SolutionCard[]>(
    subService?.detailedSolutions?.cards ?? [
      {
        id: "sol-1",
        icon: "Calculator",
        accent: "orange",
        title: "Cost & Management Systems",
        description:
          "Activity-Based Costing (ABC), standard cost variance analysis, CVP break-even computations, and budgeting models.",
      },
      {
        id: "sol-2",
        icon: "FileText",
        accent: "green",
        title: "Corporate & International Taxation",
        description:
          "Statutory tax return simulations, capital allowances, deferred tax liabilities, and multinational transfer pricing computations.",
      },
      {
        id: "sol-3",
        icon: "TrendingUp",
        accent: "navy",
        title: "Financial Accounting & Reporting",
        description:
          "IFRS & GAAP compliance, consolidated group accounts, cash-flow statements, and comprehensive ratio analyses.",
      },
    ]
  );

  // Respective Academic Fields (3-column academic levels)
  const [afTagline, setAfTagline] = useState(
    subService?.academicFields?.tagline ?? "Universal Curriculum Coverage"
  );
  const [afHeading, setAfHeading] = useState(
    subService?.academicFields?.heading ??
      "Structured Accounting Guidance by Academic Level"
  );
  const [afIntro, setAfIntro] = useState(
    subService?.academicFields?.intro ??
      "Our assistance adapts strictly to the expectations, marking criteria, and academic rigor demanded by each qualification tier."
  );
  const [afLevels, setAfLevels] = useState<AcademicLevel[]>(
    subService?.academicFields?.levels ?? [
      {
        id: "lvl-1",
        badge: "School",
        title: "High & Public Held Schools",
        description:
          "Foundational bookkeeping, introductory debit/credit ledgers, basic profit-and-loss sheets, and introductory business studies coursework.",
        highlighted: false,
      },
      {
        id: "lvl-2",
        badge: "Colleges",
        title: "Graded Colleges & Universities",
        description:
          "Intermediate financial accounting, cost allocations, corporate tax filings, working capital management, and semester-long accounting group projects.",
        highlighted: true,
      },
      {
        id: "lvl-3",
        badge: "Post-Grad & PhD",
        title: "Post-Graduates & Ph.D. Programs",
        description:
          "Advanced econometric accounting models, capital markets research, empirical IFRS impact assessments, and doctoral thesis methodologies.",
        highlighted: false,
      },
    ]
  );

  // Task Helpers Accountability & Featured Experts
  const [accTagline, setAccTagline] = useState(
    subService?.accountabilitySection?.tagline ?? "Verifiable Quality Standards"
  );
  const [accHeading, setAccHeading] = useState(
    subService?.accountabilitySection?.heading ??
      "Accountability, Quality Safeguards & Featured Accounting Specialists"
  );
  const [accIntro, setAccIntro] = useState(
    subService?.accountabilitySection?.intro ??
      "Every deliverable is scrutinized against rigorous accuracy protocols and authored by credentialed accounting practitioners."
  );
  const [accPillars, setAccPillars] = useState<AccountabilityPillar[]>(
    subService?.accountabilitySection?.pillars ?? [
      {
        id: "pil-1",
        icon: "ShieldCheck",
        accent: "orange",
        title: "100% Numerical Accuracy Guarantee",
        description:
          "All balance sheets, ledger entries, and tax computations undergo double verification with formula-checked workpapers.",
      },
      {
        id: "pil-2",
        icon: "BookOpen",
        accent: "green",
        title: "Full Institutional Standard Alignment",
        description:
          "Strict adherence to IFRS, US GAAP, AASB, and UK FRS 102 accounting frameworks as specified by your course brief.",
      },
      {
        id: "pil-3",
        icon: "Award",
        accent: "navy",
        title: "Original Scholarship & Academic Integrity",
        description:
          "Every narrative memorandum and critical evaluation is custom-authored from scratch with full bibliographic transparency.",
      },
    ]
  );
  const [accFeaturedExperts, setAccFeaturedExperts] = useState<
    FeaturedExpert[]
  >(
    subService?.accountabilitySection?.featuredExperts ?? [
      {
        id: "exp-1",
        name: "Dr. Alan Crawford, Ph.D., CPA",
        credentials: "Ph.D. in Accounting (LSE), Certified Public Accountant",
        experienceLine:
          "14+ years academic mentoring • Specialization in IFRS Consolidation & Financial Instruments",
        rating: "4.98",
        papersDelivered: "840+ Accounting Papers Delivered",
        verified: true,
      },
      {
        id: "exp-2",
        name: "Prof. Maya Chen, M.Acc, ACCA Fellow",
        credentials: "Master of Accountancy (Melbourne), FCCA",
        experienceLine:
          "11+ years university lecturing • Specialization in Corporate Tax Strategy & Forensic Auditing",
        rating: "4.96",
        papersDelivered: "620+ Accounting Papers Delivered",
        verified: true,
      },
    ]
  );

  // Page FAQs Section
  const [faqTagline, setFaqTagline] = useState(
    subService?.faqSection?.tagline ?? "Client Inquiries"
  );
  const [faqHeading, setFaqHeading] = useState(
    subService?.faqSection?.heading ??
      "Frequently Asked Questions About Accounting Support"
  );
  const [faqIntro, setFaqIntro] = useState(
    subService?.faqSection?.intro ??
      "Clear answers on spreadsheet deliveries, formula annotations, deadline management, and accounting standards."
  );
  const [faqItems, setFaqItems] = useState<FAQItem[]>(
    subService?.faqSection?.items ?? [
      {
        id: "faq-1",
        question:
          "Do your accounting deliverables include working Excel spreadsheets with live formulas?",
        answer:
          "Yes. Every quantitative accounting assignment includes an unencrypted, fully formula-annotated Microsoft Excel spreadsheet alongside the formal academic paper or executive report.",
      },
      {
        id: "faq-2",
        question:
          "Can your accounting team work with regional frameworks like US GAAP or UK FRS 102?",
        answer:
          "Yes. Our team includes CPAs and ACCA-qualified academics experienced in US GAAP, IFRS, UK FRS 102, and Australian Accounting Standards (AASB).",
      },
    ]
  );

  // SEO
  const [metaTitle, setMetaTitle] = useState(subService?.seo?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(
    subService?.seo?.metaDescription ?? ""
  );

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Derive parent service object
  const selectedParent = mainServices.find((m) => m.id === parentId);

  function handleNameChange(value: string) {
    setName(value);
    if (!isSlugCustomized) {
      setSlug(slugify(value));
    }
  }

  // Solution Cards Handlers
  function handleAddSolutionCard() {
    setDsCards((prev) => [
      ...prev,
      {
        id: `sol-${Date.now()}`,
        icon: "FileText",
        accent: "orange",
        title: "",
        description: "",
      },
    ]);
  }

  function handleUpdateSolutionCard<K extends keyof SolutionCard>(
    index: number,
    field: K,
    value: SolutionCard[K]
  ) {
    setDsCards((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  }

  function handleRemoveSolutionCard(index: number) {
    setDsCards((prev) => prev.filter((_, i) => i !== index));
  }

  function handleMoveSolutionCard(index: number, direction: "up" | "down") {
    setDsCards((prev) => {
      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= prev.length) return prev;
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[target];
      copy[target] = temp;
      return copy;
    });
  }

  // Academic Levels Handlers
  function handleAddAcademicLevel() {
    setAfLevels((prev) => [
      ...prev,
      {
        id: `lvl-${Date.now()}`,
        badge: "Tier",
        title: "",
        description: "",
        highlighted: false,
      },
    ]);
  }

  function handleUpdateAcademicLevel<K extends keyof AcademicLevel>(
    index: number,
    field: K,
    value: AcademicLevel[K]
  ) {
    setAfLevels((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  }

  function handleRemoveAcademicLevel(index: number) {
    setAfLevels((prev) => prev.filter((_, i) => i !== index));
  }

  // Accountability Pillars Handlers
  function handleAddPillar() {
    setAccPillars((prev) => [
      ...prev,
      {
        id: `pil-${Date.now()}`,
        icon: "ShieldCheck",
        accent: "green",
        title: "",
        description: "",
      },
    ]);
  }

  function handleUpdatePillar<K extends keyof AccountabilityPillar>(
    index: number,
    field: K,
    value: AccountabilityPillar[K]
  ) {
    setAccPillars((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  }

  function handleRemovePillar(index: number) {
    setAccPillars((prev) => prev.filter((_, i) => i !== index));
  }

  // Featured Experts Handlers
  function handleAddExpert() {
    setAccFeaturedExperts((prev) => [
      ...prev,
      {
        id: `exp-${Date.now()}`,
        name: "",
        credentials: "",
        experienceLine: "",
        rating: "4.98",
        papersDelivered: "100+ Papers Delivered",
        verified: true,
      },
    ]);
  }

  function handleUpdateExpert<K extends keyof FeaturedExpert>(
    index: number,
    field: K,
    value: FeaturedExpert[K]
  ) {
    setAccFeaturedExperts((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  }

  function handleRemoveExpert(index: number) {
    setAccFeaturedExperts((prev) => prev.filter((_, i) => i !== index));
  }

  // FAQ Handlers
  function handleAddFaq() {
    setFaqItems((prev) => [
      ...prev,
      {
        id: `faq-${Date.now()}`,
        question: "",
        answer: "",
      },
    ]);
  }

  function handleUpdateFaq(
    index: number,
    field: "question" | "answer",
    value: string
  ) {
    setFaqItems((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  }

  function handleRemoveFaq(index: number) {
    setFaqItems((prev) => prev.filter((_, i) => i !== index));
  }

  // Form Submit
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setConfirmation(null);

    if (!name.trim()) {
      setError("Please enter a sub-service name.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const cleanSlug = slugify(slug);
    if (!cleanSlug) {
      setError("Please provide a valid URL slug.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (!parentId) {
      setError("Please assign a parent main service category.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmation(
        isEditing
          ? `Sub-service "${name}" updated successfully. Changes staged in local UI session.`
          : `Sub-service "${name}" created successfully. Changes staged in local UI session.`
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 450);
  }

  // YouTube parser
  const youtubeVideoId = parseYouTubeVideoId(saYoutubeUrl);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border">
        <div>
          <Link
            href={
              selectedParent
                ? `/services/sub-services?parent=${selectedParent.slug}`
                : "/services/sub-services"
            }
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-orange transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to Sub-Services</span>
          </Link>
          <h1 className="text-2xl sm:text-[26px] font-bold text-text-primary tracking-tight">
            {subService
              ? `Edit Sub-Service: ${subService.name}`
              : "Add Sub-Service"}
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            {isEditing
              ? "Update specialized academic sub-service content, sections, and parent assignment."
              : "Create a specialized academic sub-service assigned to a parent service category."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/services/sub-services"
            className="px-4 py-2 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-canvas transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            form="sub-service-form"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-orange hover:bg-orange-hover text-white text-xs font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40 disabled:opacity-75"
          >
            <Save className="w-4 h-4" />
            <span>
              {isSubmitting
                ? "Saving..."
                : isEditing
                ? "Save Sub-Service"
                : "Create Sub-Service"}
            </span>
          </button>
        </div>
      </div>

      {/* Confirmation Banner */}
      {confirmation && (
        <div
          role="status"
          className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start justify-between gap-3 animate-in fade-in"
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{confirmation}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.push("/services/sub-services")}
              className="text-xs font-semibold underline hover:text-emerald-950"
            >
              Return to Sub-Services
            </button>
            <button
              type="button"
              onClick={() => setConfirmation(null)}
              className="text-xs text-emerald-700 hover:text-emerald-950 px-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2.5 animate-in fade-in"
        >
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Workspace */}
      <form id="sub-service-form" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ======================================================== */}
          {/* Left Column: 6 Rich Section Cards (8 Cols)              */}
          {/* ======================================================== */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. Basic Information & Hero Section Card */}
            <div className="bg-surface border border-border rounded-xl p-6 shadow-2xs space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <FileText className="w-4 h-4 text-orange" />
                <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                  1. Basic Information &amp; Hero Section
                </h2>
              </div>

              {/* Sub-Service Name */}
              <div>
                <label
                  htmlFor="sub-name"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Sub-Service Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="sub-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Accounting Assignment Help"
                  className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
                />
              </div>

              {/* URL Slug */}
              <div>
                <label
                  htmlFor="sub-slug"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  URL Slug <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center rounded-lg border border-border bg-canvas overflow-hidden focus-within:ring-2 focus-within:ring-orange/30 focus-within:border-orange transition-all">
                  <span className="px-3 text-xs text-text-muted select-none whitespace-nowrap">
                    readessay.com/services/
                    {selectedParent ? `${selectedParent.slug}/` : ""}
                  </span>
                  <input
                    id="sub-slug"
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => {
                      setIsSlugCustomized(true);
                      setSlug(e.target.value);
                    }}
                    placeholder="accounting-assignment-help"
                    className="w-full bg-surface px-3 py-2.5 text-sm text-text-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Short Intro */}
              <div>
                <label
                  htmlFor="sub-short-intro"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Short Intro <span className="text-text-muted font-normal">(Cards &amp; Overview)</span>
                </label>
                <textarea
                  id="sub-short-intro"
                  rows={2}
                  value={shortIntro}
                  onChange={(e) => setShortIntro(e.target.value)}
                  placeholder="Professional university accounting assignment assistance across managerial accounting..."
                  className="w-full bg-surface border border-border rounded-lg px-3.5 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
                />
              </div>

              {/* Hero Section Sub-Group Divider */}
              <div className="pt-4 border-t border-border space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange" />
                  <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">
                    Hero Section
                  </h3>
                </div>

                {/* Hero Tagline */}
                <div>
                  <label
                    htmlFor="sub-hero-tagline"
                    className="block text-xs font-semibold text-text-primary mb-1.5"
                  >
                    Hero Tagline
                  </label>
                  <input
                    id="sub-hero-tagline"
                    type="text"
                    value={heroTagline}
                    onChange={(e) => setHeroTagline(e.target.value)}
                    placeholder="e.g. Professional Academic Financial Guidance"
                    className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
                  />
                </div>

                {/* H1 Headline */}
                <div>
                  <label
                    htmlFor="sub-hero-h1"
                    className="block text-xs font-semibold text-text-primary mb-1.5"
                  >
                    H1 Headline
                  </label>
                  <input
                    id="sub-hero-h1"
                    type="text"
                    value={heroH1}
                    onChange={(e) => setHeroH1(e.target.value)}
                    placeholder="e.g. Professional Accounting & Financial Reporting Assignment Help for University Students"
                    className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
                  />
                </div>

                {/* Hero Short Summary */}
                <div>
                  <label
                    htmlFor="sub-hero-summary"
                    className="block text-xs font-semibold text-text-primary mb-1.5"
                  >
                    Hero Short Summary
                  </label>
                  <textarea
                    id="sub-hero-summary"
                    rows={3}
                    value={heroSummary}
                    onChange={(e) => setHeroSummary(e.target.value)}
                    placeholder="Master complex balance sheets, ledger reconciliations, cash-flow statements..."
                    className="w-full bg-surface border border-border rounded-lg px-3.5 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
                  />
                </div>
              </div>
            </div>

            {/* 2. Specialized Assistance & Video Section Card */}
            <div className="bg-surface border border-border rounded-xl p-6 shadow-2xs space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <Video className="w-4 h-4 text-orange" />
                <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                  2. Specialized Assistance &amp; Video Overview
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="sa-tagline"
                    className="block text-xs font-semibold text-text-primary mb-1.5"
                  >
                    Section Tagline
                  </label>
                  <input
                    id="sa-tagline"
                    type="text"
                    value={saTagline}
                    onChange={(e) => setSaTagline(e.target.value)}
                    placeholder="e.g. Methodological Rigor & Technical Precision"
                    className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sa-heading"
                    className="block text-xs font-semibold text-text-primary mb-1.5"
                  >
                    Section Heading
                  </label>
                  <input
                    id="sa-heading"
                    type="text"
                    value={saHeading}
                    onChange={(e) => setSaHeading(e.target.value)}
                    placeholder="e.g. Specialized Accounting Assistance Built Upon Exact Institutional Rubrics"
                    className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  />
                </div>
              </div>

              {/* Editorial Body Paragraphs */}
              <div>
                <label
                  htmlFor="sa-body"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Editorial Body Narrative (Multi-Paragraph)
                </label>
                <textarea
                  id="sa-body"
                  rows={5}
                  value={saBodyParagraphs}
                  onChange={(e) => setSaBodyParagraphs(e.target.value)}
                  placeholder="Navigating advanced university accounting coursework requires balancing conceptual standards..."
                  className="w-full bg-surface border border-border rounded-lg p-3.5 text-sm text-text-primary leading-relaxed focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange font-sans"
                />
              </div>

              {/* CTA Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="sa-cta-label"
                    className="block text-xs font-semibold text-text-primary mb-1.5"
                  >
                    CTA Button Label
                  </label>
                  <input
                    id="sa-cta-label"
                    type="text"
                    value={saCtaLabel}
                    onChange={(e) => setSaCtaLabel(e.target.value)}
                    placeholder="e.g. Explore Accounting Solutions"
                    className="w-full bg-surface border border-border rounded-lg px-3.5 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sa-cta-url"
                    className="block text-xs font-semibold text-text-primary mb-1.5"
                  >
                    CTA Button URL
                  </label>
                  <input
                    id="sa-cta-url"
                    type="text"
                    value={saCtaUrl}
                    onChange={(e) => setSaCtaUrl(e.target.value)}
                    placeholder="e.g. /services/sub-services/accounting-assignment-help"
                    className="w-full bg-surface border border-border rounded-lg px-3.5 py-2 text-sm text-text-primary font-mono text-xs focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  />
                </div>
              </div>

              {/* YouTube Video Section with Live Preview */}
              <div className="pt-3 border-t border-border space-y-3">
                <label
                  htmlFor="sa-youtube"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  YouTube Video URL / Embed Link
                </label>
                <input
                  id="sa-youtube"
                  type="text"
                  value={saYoutubeUrl}
                  onChange={(e) => setSaYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=OaqUwnjm9Xo or https://youtu.be/OaqUwnjm9Xo"
                  className="w-full bg-surface border border-border rounded-lg px-3.5 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                />

                {/* Inline YouTube Preview */}
                {youtubeVideoId ? (
                  <div className="rounded-xl border border-border bg-slate-950 overflow-hidden shadow-2xs">
                    <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900 border-b border-white/10 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Valid YouTube Embed (ID: {youtubeVideoId})</span>
                      </div>
                      <a
                        href={`https://www.youtube.com/watch?v=${youtubeVideoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white underline"
                      >
                        <span>Open on YouTube</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="aspect-video w-full bg-black">
                      <iframe
                        src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                        title="YouTube video player preview"
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-lg border border-dashed border-border bg-canvas/60 text-xs text-text-muted flex items-center gap-2">
                    <Video className="w-4 h-4 text-text-muted shrink-0" />
                    <span>
                      Enter a valid YouTube URL (e.g., youtube.com/watch?v=... or youtu.be/...) to see the live inline preview.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* 3. Detailed Solutions (Sub-Discipline Cards) */}
            <div className="bg-surface border border-border rounded-xl p-6 shadow-2xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-orange" />
                  <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                    3. Detailed Solutions (Sub-Discipline Cards)
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleAddSolutionCard}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:text-orange hover:border-orange/40 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Solution Card</span>
                </button>
              </div>

              {/* Section Header Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    Section Tagline
                  </label>
                  <input
                    type="text"
                    value={dsTagline}
                    onChange={(e) => setDsTagline(e.target.value)}
                    placeholder="e.g. Core Disciplinary Breakdown"
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={dsHeading}
                    onChange={(e) => setDsHeading(e.target.value)}
                    placeholder="e.g. Targeted Accounting Problem-Solving Across 5 Core Fields"
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Section Intro Paragraph
                </label>
                <textarea
                  rows={2}
                  value={dsIntro}
                  onChange={(e) => setDsIntro(e.target.value)}
                  placeholder="Introductory text describing the sub-discipline solutions..."
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30"
                />
              </div>

              {/* Cards List */}
              <div className="space-y-4 pt-2">
                <span className="block text-xs font-bold text-text-secondary uppercase">
                  Cards List ({dsCards.length} Cards)
                </span>
                {dsCards.map((card, idx) => {
                  const style = ACCENT_STYLES[card.accent] || ACCENT_STYLES.orange;
                  return (
                    <div
                      key={card.id || idx}
                      className="p-4 rounded-xl border border-border bg-canvas/30 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-text-secondary">
                            Card #{idx + 1}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${style.badge}`}
                          >
                            {style.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoveSolutionCard(idx, "up")}
                            title="Move Up"
                            className="p-1 text-text-muted hover:text-text-primary disabled:opacity-30"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === dsCards.length - 1}
                            onClick={() => handleMoveSolutionCard(idx, "down")}
                            title="Move Down"
                            className="p-1 text-text-muted hover:text-text-primary disabled:opacity-30"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveSolutionCard(idx)}
                            title="Delete Card"
                            className="p-1 text-text-muted hover:text-rose-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Icon & Accent Selector */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                        <div>
                          <label className="block text-[11px] font-semibold text-text-muted mb-1">
                            Card Icon
                          </label>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center shrink-0">
                              <ServiceIcon iconKey={card.icon} className="w-4 h-4 text-orange" />
                            </div>
                            <select
                              value={card.icon}
                              onChange={(e) =>
                                handleUpdateSolutionCard(idx, "icon", e.target.value)
                              }
                              className="flex-1 bg-surface border border-border rounded-lg px-2.5 py-1.5 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30"
                            >
                              {CURATED_CARD_ICONS.map((opt) => (
                                <option key={opt.key} value={opt.key}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-text-muted mb-1">
                            Accent Color
                          </label>
                          <div className="flex items-center gap-1.5">
                            {(["orange", "green", "navy"] as AccentColor[]).map(
                              (acc) => {
                                const accOpt = ACCENT_STYLES[acc];
                                const isSelected = card.accent === acc;
                                return (
                                  <button
                                    key={acc}
                                    type="button"
                                    onClick={() =>
                                      handleUpdateSolutionCard(idx, "accent", acc)
                                    }
                                    className={`flex-1 py-1 px-2 rounded-md text-xs font-semibold border transition-all ${
                                      isSelected
                                        ? `${accOpt.badge} ring-2 ring-orange/30 shadow-2xs`
                                        : "bg-surface border-border text-text-muted hover:text-text-primary"
                                    }`}
                                  >
                                    {accOpt.label}
                                  </button>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div>
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) =>
                            handleUpdateSolutionCard(idx, "title", e.target.value)
                          }
                          placeholder="e.g. Cost & Management Systems"
                          className="w-full bg-surface border border-border rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30"
                        />
                      </div>

                      <div>
                        <textarea
                          rows={2}
                          value={card.description}
                          onChange={(e) =>
                            handleUpdateSolutionCard(idx, "description", e.target.value)
                          }
                          placeholder="Activity-Based Costing (ABC), standard cost variance analysis..."
                          className="w-full bg-surface border border-border rounded-lg px-3 py-1.5 text-xs sm:text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-orange/30"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Respective Academic Fields (Level Guidance Cards) */}
            <div className="bg-surface border border-border rounded-xl p-6 shadow-2xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-orange" />
                  <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                    4. Respective Academic Fields (Level Guidance Cards)
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleAddAcademicLevel}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:text-orange hover:border-orange/40 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Level Card</span>
                </button>
              </div>

              {/* Section Header Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    Section Tagline
                  </label>
                  <input
                    type="text"
                    value={afTagline}
                    onChange={(e) => setAfTagline(e.target.value)}
                    placeholder="e.g. Universal Curriculum Coverage"
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={afHeading}
                    onChange={(e) => setAfHeading(e.target.value)}
                    placeholder="e.g. Structured Accounting Guidance by Academic Level"
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Section Intro Paragraph
                </label>
                <textarea
                  rows={2}
                  value={afIntro}
                  onChange={(e) => setAfIntro(e.target.value)}
                  placeholder="Introductory text describing curriculum adaptation across academic tiers..."
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30"
                />
              </div>

              {/* Level Cards */}
              <div className="space-y-4 pt-2">
                <span className="block text-xs font-bold text-text-secondary uppercase">
                  Academic Level Tiers ({afLevels.length} Levels)
                </span>
                {afLevels.map((lvl, idx) => (
                  <div
                    key={lvl.id || idx}
                    className={`p-4 rounded-xl border transition-all space-y-3 ${
                      lvl.highlighted
                        ? "bg-orange/5 border-orange/40 ring-1 ring-orange/30"
                        : "bg-canvas/30 border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-text-secondary">
                          Tier #{idx + 1}
                        </span>
                        {lvl.highlighted && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-orange text-white">
                            <Star className="w-3 h-3 fill-white" />
                            <span>Featured Tier</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <label className="inline-flex items-center gap-1.5 text-xs text-text-secondary cursor-pointer">
                          <input
                            type="checkbox"
                            checked={Boolean(lvl.highlighted)}
                            onChange={(e) =>
                              handleUpdateAcademicLevel(
                                idx,
                                "highlighted",
                                e.target.checked
                              )
                            }
                            className="rounded border-border text-orange focus:ring-orange/30"
                          />
                          <span>Highlight as Featured</span>
                        </label>

                        <button
                          type="button"
                          onClick={() => handleRemoveAcademicLevel(idx)}
                          title="Delete Level"
                          className="p-1 text-text-muted hover:text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-text-muted mb-1">
                          Badge Label
                        </label>
                        <input
                          type="text"
                          value={lvl.badge}
                          onChange={(e) =>
                            handleUpdateAcademicLevel(idx, "badge", e.target.value)
                          }
                          placeholder="e.g. School, Colleges, Post-Grad & PhD"
                          className="w-full bg-surface border border-border rounded-lg px-3 py-1.5 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-text-muted mb-1">
                          Card Title
                        </label>
                        <input
                          type="text"
                          value={lvl.title}
                          onChange={(e) =>
                            handleUpdateAcademicLevel(idx, "title", e.target.value)
                          }
                          placeholder="e.g. Graded Colleges & Universities"
                          className="w-full bg-surface border border-border rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-text-muted mb-1">
                        Card Description
                      </label>
                      <textarea
                        rows={2}
                        value={lvl.description}
                        onChange={(e) =>
                          handleUpdateAcademicLevel(
                            idx,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Intermediate financial accounting, cost allocations, corporate tax filings..."
                        className="w-full bg-surface border border-border rounded-lg px-3 py-1.5 text-xs sm:text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-orange/30"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Task Helpers Accountability & Featured Experts */}
            <div className="bg-surface border border-border rounded-xl p-6 shadow-2xs space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <ShieldCheck className="w-4 h-4 text-orange" />
                <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                  5. Task Helpers Accountability &amp; Featured Experts
                </h2>
              </div>

              {/* Section Header Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    Section Tagline
                  </label>
                  <input
                    type="text"
                    value={accTagline}
                    onChange={(e) => setAccTagline(e.target.value)}
                    placeholder="e.g. Verifiable Quality Standards"
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={accHeading}
                    onChange={(e) => setAccHeading(e.target.value)}
                    placeholder="e.g. Accountability, Quality Safeguards & Featured Accounting Specialists"
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Section Intro Paragraph
                </label>
                <textarea
                  rows={2}
                  value={accIntro}
                  onChange={(e) => setAccIntro(e.target.value)}
                  placeholder="Every deliverable is scrutinized against rigorous accuracy protocols..."
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30"
                />
              </div>

              {/* Sub-Group A: Accountability Pillars */}
              <div className="pt-3 border-t border-border space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-text-primary uppercase tracking-wider">
                    Pillars of Accountability ({accPillars.length} Pillars)
                  </span>
                  <button
                    type="button"
                    onClick={handleAddPillar}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:text-orange transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Pillar</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {accPillars.map((pil, idx) => (
                    <div
                      key={pil.id || idx}
                      className="p-3.5 rounded-xl border border-border bg-canvas/30 space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
                        <span className="text-xs font-bold text-text-secondary">
                          Pillar #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemovePillar(idx)}
                          className="p-1 text-text-muted hover:text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                        <div>
                          <label className="block text-[11px] font-semibold text-text-muted mb-1">
                            Icon
                          </label>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center shrink-0">
                              <ServiceIcon iconKey={pil.icon} className="w-4 h-4 text-orange" />
                            </div>
                            <select
                              value={pil.icon}
                              onChange={(e) =>
                                handleUpdatePillar(idx, "icon", e.target.value)
                              }
                              className="flex-1 bg-surface border border-border rounded-lg px-2.5 py-1.5 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30"
                            >
                              {CURATED_CARD_ICONS.map((opt) => (
                                <option key={opt.key} value={opt.key}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-text-muted mb-1">
                            Accent Color
                          </label>
                          <div className="flex items-center gap-1.5">
                            {(["orange", "green", "navy"] as AccentColor[]).map(
                              (acc) => {
                                const accOpt = ACCENT_STYLES[acc];
                                const isSelected = pil.accent === acc;
                                return (
                                  <button
                                    key={acc}
                                    type="button"
                                    onClick={() =>
                                      handleUpdatePillar(idx, "accent", acc)
                                    }
                                    className={`flex-1 py-1 px-2 rounded-md text-xs font-semibold border transition-all ${
                                      isSelected
                                        ? `${accOpt.badge} ring-2 ring-orange/30 shadow-2xs`
                                        : "bg-surface border-border text-text-muted hover:text-text-primary"
                                    }`}
                                  >
                                    {accOpt.label}
                                  </button>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <input
                          type="text"
                          value={pil.title}
                          onChange={(e) =>
                            handleUpdatePillar(idx, "title", e.target.value)
                          }
                          placeholder="e.g. 100% Numerical Accuracy Guarantee"
                          className="w-full bg-surface border border-border rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30"
                        />
                      </div>

                      <div>
                        <textarea
                          rows={2}
                          value={pil.description}
                          onChange={(e) =>
                            handleUpdatePillar(idx, "description", e.target.value)
                          }
                          placeholder="All balance sheets, ledger entries, and tax computations undergo double verification..."
                          className="w-full bg-surface border border-border rounded-lg px-3 py-1.5 text-xs sm:text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-orange/30"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-Group B: Featured Specialist Profiles */}
              <div className="pt-3 border-t border-border space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-orange" />
                    <span className="text-xs font-bold text-text-primary uppercase tracking-wider">
                      Featured Specialist Profiles ({accFeaturedExperts.length} Experts)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddExpert}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:text-orange transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Specialist Profile</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {accFeaturedExperts.map((exp, idx) => (
                    <div
                      key={exp.id || idx}
                      className="p-3.5 rounded-xl border border-border bg-canvas/30 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-text-secondary">
                            Specialist #{idx + 1}
                          </span>
                          {exp.verified && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                              <CheckCircle2 className="w-3 h-3 text-blue-600" />
                              <span>Verified Specialist</span>
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <label className="inline-flex items-center gap-1.5 text-xs text-text-secondary cursor-pointer">
                            <input
                              type="checkbox"
                              checked={exp.verified}
                              onChange={(e) =>
                                handleUpdateExpert(idx, "verified", e.target.checked)
                              }
                              className="rounded border-border text-orange focus:ring-orange/30"
                            />
                            <span>Verified Badge</span>
                          </label>

                          <button
                            type="button"
                            onClick={() => handleRemoveExpert(idx)}
                            className="p-1 text-text-muted hover:text-rose-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-text-muted mb-1">
                            Full Name &amp; Credentials
                          </label>
                          <input
                            type="text"
                            value={exp.name}
                            onChange={(e) =>
                              handleUpdateExpert(idx, "name", e.target.value)
                            }
                            placeholder="e.g. Dr. Alan Crawford, Ph.D., CPA"
                            className="w-full bg-surface border border-border rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-text-muted mb-1">
                            Academic Degrees / Certifications
                          </label>
                          <input
                            type="text"
                            value={exp.credentials}
                            onChange={(e) =>
                              handleUpdateExpert(idx, "credentials", e.target.value)
                            }
                            placeholder="e.g. Ph.D. in Accounting (LSE), CPA"
                            className="w-full bg-surface border border-border rounded-lg px-3 py-1.5 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-text-muted mb-1">
                          Experience &amp; Specialty Line
                        </label>
                        <input
                          type="text"
                          value={exp.experienceLine}
                          onChange={(e) =>
                            handleUpdateExpert(idx, "experienceLine", e.target.value)
                          }
                          placeholder="e.g. 14+ years academic mentoring • IFRS Specialist"
                          className="w-full bg-surface border border-border rounded-lg px-3 py-1.5 text-xs sm:text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-orange/30"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-text-muted mb-1">
                            Star Rating (e.g. 4.98)
                          </label>
                          <input
                            type="text"
                            value={exp.rating}
                            onChange={(e) =>
                              handleUpdateExpert(idx, "rating", e.target.value)
                            }
                            placeholder="4.98"
                            className="w-full bg-surface border border-border rounded-lg px-3 py-1.5 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-text-muted mb-1">
                            Papers Delivered Label
                          </label>
                          <input
                            type="text"
                            value={exp.papersDelivered}
                            onChange={(e) =>
                              handleUpdateExpert(
                                idx,
                                "papersDelivered",
                                e.target.value
                              )
                            }
                            placeholder="e.g. 840+ Accounting Papers Delivered"
                            className="w-full bg-surface border border-border rounded-lg px-3 py-1.5 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 6. Page FAQs Section Card */}
            <div className="bg-surface border border-border rounded-xl p-6 shadow-2xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-orange" />
                  <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                    6. Frequently Asked Questions (FAQs)
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleAddFaq}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:text-orange hover:border-orange/40 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add FAQ</span>
                </button>
              </div>

              {/* Section Header Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    Section Tagline
                  </label>
                  <input
                    type="text"
                    value={faqTagline}
                    onChange={(e) => setFaqTagline(e.target.value)}
                    placeholder="e.g. Client Inquiries"
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={faqHeading}
                    onChange={(e) => setFaqHeading(e.target.value)}
                    placeholder="e.g. Frequently Asked Questions About Accounting Support"
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Section Intro Paragraph
                </label>
                <textarea
                  rows={2}
                  value={faqIntro}
                  onChange={(e) => setFaqIntro(e.target.value)}
                  placeholder="Clear answers on spreadsheet deliveries, formula annotations..."
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30"
                />
              </div>

              {/* FAQ Items */}
              <div className="space-y-4 pt-2">
                {faqItems.map((faq, idx) => (
                  <div
                    key={faq.id || idx}
                    className="p-4 rounded-xl border border-border bg-canvas/30 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-text-secondary uppercase">
                        Question #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFaq(idx)}
                        aria-label="Delete question"
                        className="p-1 text-text-muted hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) =>
                        handleUpdateFaq(idx, "question", e.target.value)
                      }
                      placeholder="e.g. Do your accounting deliverables include working Excel spreadsheets?"
                      className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    />

                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) =>
                        handleUpdateFaq(idx, "answer", e.target.value)
                      }
                      placeholder="Detailed answer explaining academic methodology, spreadsheet deliverables, or guarantees..."
                      className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* Right Column: Hierarchy & SEO (4 Cols)                   */}
          {/* ======================================================== */}
          <div className="lg:col-span-4 space-y-6">
            {/* 1. Publishing & Hierarchy Card */}
            <div className="bg-surface border border-border rounded-xl p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <FolderTree className="w-4 h-4 text-orange" />
                <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                  Publishing &amp; Hierarchy
                </h2>
              </div>

              {/* Parent Main Service Selection */}
              <div>
                <label
                  htmlFor="sub-parent"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Parent Main Service <span className="text-rose-500">*</span>
                </label>
                <select
                  id="sub-parent"
                  required
                  value={parentId}
                  onChange={(e) => setParentId(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange font-medium"
                >
                  <option value="" disabled>
                    Select Parent Service...
                  </option>
                  {mainServices.map((parent) => (
                    <option key={parent.id} value={parent.id}>
                      {parent.name}
                    </option>
                  ))}
                </select>
                {selectedParent && (
                  <p className="text-[11px] text-text-muted mt-1.5">
                    Assigned under:{" "}
                    <strong className="text-navy">{selectedParent.name}</strong>
                  </p>
                )}
              </div>

              {/* Status */}
              <div>
                <label
                  htmlFor="sub-status"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Status
                </label>
                <div className="flex items-center gap-3">
                  <select
                    id="sub-status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ServiceStatus)}
                    className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  >
                    <option value="active">Active (Published)</option>
                    <option value="draft">Draft (Hidden)</option>
                    <option value="archived">Archived</option>
                  </select>
                  <ServiceStatusBadge status={status} />
                </div>
              </div>

              {/* Display Order */}
              <div>
                <label
                  htmlFor="sub-order"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Display Order
                </label>
                <input
                  id="sub-order"
                  type="number"
                  min={1}
                  max={99}
                  value={displayOrder}
                  onChange={(e) =>
                    setDisplayOrder(parseInt(e.target.value, 10) || 1)
                  }
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                />
              </div>

              {/* Metadata */}
              <div className="pt-3 border-t border-border text-xs text-text-muted space-y-1">
                <p>
                  Last Updated:{" "}
                  <span className="font-mono text-text-secondary">
                    {subService?.updatedAt || "Not yet saved"}
                  </span>
                </p>
                <p>Category Type: Academic Sub-Service</p>
              </div>
            </div>

            {/* 2. SEO & Search Metadata Card */}
            <div className="bg-surface border border-border rounded-xl p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <Globe className="w-4 h-4 text-orange" />
                <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                  SEO &amp; Search Snippet
                </h2>
              </div>

              {/* Meta Title */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="meta-title"
                    className="block text-xs font-semibold text-text-primary"
                  >
                    Meta Title
                  </label>
                  <span
                    className={`text-[10px] font-mono ${
                      metaTitle.length > 60
                        ? "text-amber-600 font-bold"
                        : "text-text-muted"
                    }`}
                  >
                    {metaTitle.length}/60
                  </span>
                </div>
                <input
                  id="meta-title"
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder={`${name || "Sub-Service"} | ReadEssay`}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                />
              </div>

              {/* Meta Description */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="meta-desc"
                    className="block text-xs font-semibold text-text-primary"
                  >
                    Meta Description
                  </label>
                  <span
                    className={`text-[10px] font-mono ${
                      metaDescription.length > 160
                        ? "text-amber-600 font-bold"
                        : "text-text-muted"
                    }`}
                  >
                    {metaDescription.length}/160
                  </span>
                </div>
                <textarea
                  id="meta-desc"
                  rows={3}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Sub-service description for Google SERP results..."
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                />
              </div>

              {/* Live Google Search Snippet Preview */}
              <div className="pt-3 border-t border-border">
                <span className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">
                  Live Search Engine Preview
                </span>
                <div className="p-3.5 rounded-lg border border-border bg-[#F8F9FA] space-y-1 font-sans">
                  {/* Google Breadcrumb */}
                  <div className="text-[11px] text-[#202124] flex items-center gap-1.5 truncate">
                    <span className="text-[#5f6368]">readessay.com</span>
                    <span className="text-[#5f6368]">&gt;</span>
                    <span className="text-[#5f6368]">services</span>
                    <span className="text-[#5f6368]">&gt;</span>
                    <span className="text-[#5f6368]">
                      {selectedParent?.slug || "category"}
                    </span>
                    <span className="text-[#5f6368]">&gt;</span>
                    <span className="text-[#202124]">
                      {slug || "sub-service"}
                    </span>
                  </div>

                  {/* Google Title */}
                  <div className="text-sm text-[#1a0dab] font-medium leading-snug truncate hover:underline cursor-pointer">
                    {metaTitle || `${name || "Sub-Service"} | ReadEssay`}
                  </div>

                  {/* Google Snippet */}
                  <div className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                    {metaDescription ||
                      shortIntro ||
                      "Explore specialized academic writing and research assistance from vetted university specialists."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
