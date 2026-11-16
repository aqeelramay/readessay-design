"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Save,
  Globe,
  FileText,
  Sliders,
  RefreshCw,
} from "lucide-react";
import {
  createService,
  updateService,
  getServiceById,
  type CreateServicePayload,
} from "@/lib/api";
import { ServiceStatusBadge } from "./ServiceStatusBadge";
import {
  CURATED_SERVICE_ICONS,
  ServiceIcon,
} from "./serviceIcons";

interface FAQItem {
  id?: string;
  question: string;
  answer: string;
}

export interface ServiceInitialData extends Partial<CreateServicePayload> {
  id?: string;
  name?: string;
  shortIntro?: string;
  heroTagline?: string;
  heroH1?: string;
  heroSummary?: string;
  displayOrder?: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalSlug?: string;
  };
}

interface MainServiceFormProps {
  service?: ServiceInitialData;
  serviceIdOrSlug?: string;
}

function slugify(text: string): string {
  const cleaned = text
    .toLowerCase()
    .trim()
    .replace(/^\/?(services[\/-])+/i, "")
    .replace(/^\/+|\/+$/g, "");

  return cleaned
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function MainServiceForm({ service, serviceIdOrSlug }: MainServiceFormProps) {
  const router = useRouter();

  // Loading & submission state
  const [isLoading, setIsLoading] = useState(Boolean(serviceIdOrSlug && !service));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  // Track service ID for updates
  const [serviceId, setServiceId] = useState<string | null>(service?.id ?? null);
  const isEditing = Boolean(serviceId || serviceIdOrSlug);

  // Form Fields
  const [icon, setIcon] = useState(service?.icon ?? "BookOpen");
  const [name, setName] = useState(service?.title ?? service?.name ?? "");
  const [slug, setSlug] = useState(service?.slug ?? "");
  const [isSlugCustomized, setIsSlugCustomized] = useState(isEditing);
  const [shortIntro, setShortIntro] = useState(service?.shortDescription ?? service?.shortIntro ?? "");
  const [heroTagline, setHeroTagline] = useState(service?.heroBadge ?? service?.heroTagline ?? "");
  const [heroH1, setHeroH1] = useState(service?.heroTitle ?? service?.heroH1 ?? "");
  const [heroSummary, setHeroSummary] = useState(service?.heroSubtitle ?? service?.heroSummary ?? "");
  const [content, setContent] = useState(service?.content ?? "");
  const [isFeatured, setIsFeatured] = useState<boolean>(service?.isFeatured ?? false);
  const [status, setStatus] = useState<string>(service?.status ?? "PUBLISHED");
  const [displayOrder, setDisplayOrder] = useState<number>(
    service?.sortOrder ?? service?.displayOrder ?? 1
  );
  const [metaTitle, setMetaTitle] = useState(service?.seoTitle ?? service?.seo?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(
    service?.seoDescription ?? service?.seo?.metaDescription ?? ""
  );
  const [canonicalUrl, setCanonicalUrl] = useState(service?.canonicalUrl ?? service?.seo?.canonicalSlug ?? "");

  const [faqs, setFaqs] = useState<FAQItem[]>(
    service?.faqs ?? [
      {
        id: "faq-init-1",
        question: "How do your academic specialists approach complex coursework rubrics?",
        answer: "Specialists analyze the specific university rubric and learning outcomes to construct a fully referenced, syllabus-aligned response.",
      },
    ]
  );

  // Fetch existing service if serviceIdOrSlug is provided
  useEffect(() => {
    if (!serviceIdOrSlug || service) return;

    let isMounted = true;
    getServiceById(serviceIdOrSlug)
      .then((data) => {
        if (!isMounted) return;
        setServiceId(data.id);
        setName(data.title || data.name || "");
        setSlug(data.slug || "");
        setIsSlugCustomized(true);
        setIcon(data.icon || "BookOpen");
        setShortIntro(data.shortDescription || data.shortIntro || "");
        setHeroTagline(data.heroBadge || data.heroTagline || "");
        setHeroH1(data.heroTitle || data.heroH1 || "");
        setHeroSummary(data.heroSubtitle || data.heroSummary || "");
        setContent(data.content || "");
        setIsFeatured(Boolean(data.isFeatured));
        setStatus(data.status || "PUBLISHED");
        setDisplayOrder(data.sortOrder ?? data.displayOrder ?? 1);
        setMetaTitle(data.seoTitle || "");
        setMetaDescription(data.seoDescription || "");
        setCanonicalUrl(data.canonicalUrl || "");
        if (Array.isArray(data.faqs) && data.faqs.length > 0) {
          setFaqs(data.faqs as FAQItem[]);
        }
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        if (!isMounted) return;
        const msg = err instanceof Error ? err.message : "Failed to load service";
        setError(msg);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [serviceIdOrSlug, service]);

  // Auto-slug generation from Name
  function handleNameChange(value: string) {
    setName(value);
    if (!isSlugCustomized) {
      setSlug(slugify(value));
    }
  }

  // FAQ Handlers
  function handleAddFaq() {
    setFaqs((prev) => [
      ...prev,
      {
        id: `faq-${Date.now()}`,
        question: "",
        answer: "",
      },
    ]);
  }

  function handleUpdateFaq(index: number, field: "question" | "answer", value: string) {
    setFaqs((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  function handleRemoveFaq(index: number) {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  }

  // Form submit to NestJS API
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setConfirmation(null);

    if (!name.trim()) {
      setError("Please enter a service name.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const cleanSlug = slugify(slug);
    if (!cleanSlug) {
      setError("Please provide a valid URL slug.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    const payload: CreateServicePayload = {
      title: name.trim(),
      slug: cleanSlug,
      shortDescription: shortIntro.trim() || null,
      heroBadge: heroTagline.trim() || null,
      heroTitle: heroH1.trim() || null,
      heroSubtitle: heroSummary.trim() || null,
      content: content.trim() || "",
      icon: icon || null,
      isFeatured,
      sortOrder: Number(displayOrder) || 0,
      status: status.toUpperCase(),
      seoTitle: metaTitle.trim() || null,
      seoDescription: metaDescription.trim() || null,
      canonicalUrl: canonicalUrl.trim() || null,
      faqs: faqs.filter((f) => f.question.trim() || f.answer.trim()),
    };

    try {
      if (serviceId || serviceIdOrSlug) {
        const idToUpdate = serviceId || serviceIdOrSlug!;
        await updateService(idToUpdate, payload);
        setConfirmation(`Service "${name}" updated successfully.`);
      } else {
        await createService(payload);
        setConfirmation(`Service "${name}" created successfully.`);
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        router.push("/services");
      }, 900);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save service. Please check your connection.";
      setError(msg);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  }

  const activeIconOption = CURATED_SERVICE_ICONS.find((opt) => opt.key === icon);

  if (isLoading) {
    return (
      <div className="bg-surface border border-border rounded-xl p-12 text-center max-w-lg mx-auto">
        <RefreshCw className="w-6 h-6 text-orange animate-spin mx-auto mb-3" />
        <h2 className="text-base font-bold text-text-primary">Loading Service Details...</h2>
        <p className="text-xs text-text-secondary mt-1">Connecting to NestJS API...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border">
        <div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-orange transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to Services</span>
          </Link>
          <h1 className="text-2xl sm:text-[26px] font-bold text-text-primary tracking-tight">
            {isEditing ? `Edit Service: ${name || "Untitled"}` : "Add Service"}
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            {isEditing
              ? "Update top-level service content, hero presentation, and SEO metadata."
              : "Create a new top-level academic service category."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/services"
            className="px-4 py-2 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-canvas transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            form="main-service-form"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-orange hover:bg-orange-hover text-white text-xs font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40 disabled:opacity-75"
          >
            {isSubmitting ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>
              {isSubmitting
                ? "Saving..."
                : isEditing
                ? "Save Changes"
                : "Create Service"}
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
            <span>{confirmation} Redirecting to Services list...</span>
          </div>
          <button
            type="button"
            onClick={() => router.push("/services")}
            className="text-xs font-semibold underline hover:text-emerald-950"
          >
            Return to Services
          </button>
        </div>
      )}

      {/* Error Alert Banner */}
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
      <form id="main-service-form" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Primary Content (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. Basic Information & Hero Section Card */}
            <div className="bg-surface border border-border rounded-xl p-6 shadow-2xs space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <FileText className="w-4 h-4 text-orange" />
                <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                  Basic Information &amp; Hero Section
                </h2>
              </div>

              {/* Service Icon Picker */}
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1.5">
                  Service Icon <span className="text-rose-500">*</span>
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-3.5 rounded-xl border border-border bg-canvas/40">
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-orange/10 border border-orange/20 text-orange flex items-center justify-center shadow-2xs">
                      <ServiceIcon iconKey={icon} className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-text-primary block">
                        {activeIconOption?.label ?? icon}
                      </span>
                      <span className="text-[11px] font-mono text-text-muted block">
                        key: {icon}
                      </span>
                    </div>
                  </div>

                  <div className="hidden sm:block h-10 w-px bg-border" />

                  <div className="flex-1">
                    <span className="text-[11px] text-text-secondary font-medium block mb-2">
                      Choose an icon emblem:
                    </span>
                    <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                      {CURATED_SERVICE_ICONS.map((opt) => {
                        const isSelected = icon === opt.key;
                        return (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => setIcon(opt.key)}
                            title={opt.label}
                            aria-label={`Select ${opt.label} icon`}
                            className={`flex items-center justify-center p-2 rounded-lg border transition-all ${
                              isSelected
                                ? "bg-orange/10 border-orange text-orange ring-2 ring-orange/30 shadow-2xs"
                                : "bg-surface border-border text-text-secondary hover:text-text-primary hover:bg-canvas"
                            }`}
                          >
                            <ServiceIcon iconKey={opt.key} className="w-4 h-4 shrink-0" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Name */}
              <div>
                <label
                  htmlFor="main-name"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Service Title / Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="main-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Assignment Help"
                  className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
                />
              </div>

              {/* URL Slug (Always Top-Level readessay.com/{slug}) */}
              <div>
                <label
                  htmlFor="main-slug"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  URL Slug <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center rounded-lg border border-border bg-canvas overflow-hidden focus-within:ring-2 focus-within:ring-orange/30 focus-within:border-orange transition-all">
                  <span className="px-3 text-xs text-text-muted select-none whitespace-nowrap">
                    readessay.com/
                  </span>
                  <input
                    id="main-slug"
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => {
                      setIsSlugCustomized(true);
                      const cleanVal = e.target.value
                        .replace(/^\/?(services[\/-])+/i, "")
                        .replace(/^\/+/, "");
                      setSlug(cleanVal);
                    }}
                    placeholder="assignment-help"
                    className="w-full bg-surface px-3 py-2.5 text-sm text-text-primary focus:outline-none"
                  />
                </div>
                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-text-muted">
                  <span>Live URL Preview:</span>
                  <span className="font-mono text-orange/90 font-medium">
                    https://readessay.com/{slug || "assignment-help"}
                  </span>
                </div>
              </div>

              {/* Short Intro */}
              <div>
                <label
                  htmlFor="main-short-intro"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Short Intro <span className="text-text-muted font-normal">(Cards &amp; Meta Summary)</span>
                </label>
                <textarea
                  id="main-short-intro"
                  rows={2}
                  value={shortIntro}
                  onChange={(e) => setShortIntro(e.target.value)}
                  placeholder="Structured academic assignment support across core university disciplines and marking rubrics."
                  className="w-full bg-surface border border-border rounded-lg px-3.5 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
                />
              </div>

              {/* Hero Section Fields */}
              <div className="pt-4 border-t border-border space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange" />
                  <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">
                    Hero Presentation
                  </h3>
                </div>

                <div>
                  <label
                    htmlFor="main-hero-tagline"
                    className="block text-xs font-semibold text-text-primary mb-1.5"
                  >
                    Hero Badge / Tagline
                  </label>
                  <input
                    id="main-hero-tagline"
                    type="text"
                    value={heroTagline}
                    onChange={(e) => setHeroTagline(e.target.value)}
                    placeholder="Comprehensive Subject Specializations"
                    className="w-full bg-surface border border-border rounded-lg px-3.5 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="main-hero-h1"
                    className="block text-xs font-semibold text-text-primary mb-1.5"
                  >
                    Hero H1 Headline
                  </label>
                  <input
                    id="main-hero-h1"
                    type="text"
                    value={heroH1}
                    onChange={(e) => setHeroH1(e.target.value)}
                    placeholder="Explore Our Assignment Help Services Across Core Disciplines"
                    className="w-full bg-surface border border-border rounded-lg px-3.5 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="main-hero-summary"
                    className="block text-xs font-semibold text-text-primary mb-1.5"
                  >
                    Hero Paragraph / Summary
                  </label>
                  <textarea
                    id="main-hero-summary"
                    rows={3}
                    value={heroSummary}
                    onChange={(e) => setHeroSummary(e.target.value)}
                    placeholder="Browse our specialized academic solutions tailored for undergraduate, postgraduate, and university-specific curricula."
                    className="w-full bg-surface border border-border rounded-lg px-3.5 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
                  />
                </div>
              </div>

              {/* Rich Body Content */}
              <div className="pt-4 border-t border-border">
                <label
                  htmlFor="main-content"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Editorial Body Narrative / Content
                </label>
                <textarea
                  id="main-content"
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Detailed academic overview, learning outcome alignments, rubric breakdowns, and citation specifications..."
                  className="w-full bg-surface border border-border rounded-lg p-3.5 text-sm text-text-primary font-mono text-xs focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange leading-relaxed"
                />
              </div>
            </div>

            {/* 2. FAQs Section Card */}
            <div className="bg-surface border border-border rounded-xl p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-orange" />
                  <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                    Frequently Asked Questions (FAQs)
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

              <div className="space-y-4">
                {faqs.map((faq, idx) => (
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
                      placeholder="e.g. How do your academic specialists approach complex coursework rubrics?"
                      className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    />

                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) =>
                        handleUpdateFaq(idx, "answer", e.target.value)
                      }
                      placeholder="Detailed answer explaining academic methodology, citation styles, or support guarantees..."
                      className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Settings & SEO (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* 1. Publishing & Visibility Card */}
            <div className="bg-surface border border-border rounded-xl p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <Sliders className="w-4 h-4 text-orange" />
                <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                  Publishing &amp; Visibility
                </h2>
              </div>

              {/* Status */}
              <div>
                <label
                  htmlFor="main-status"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Status
                </label>
                <div className="flex items-center gap-3">
                  <select
                    id="main-status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  >
                    <option value="PUBLISHED">Published (Active)</option>
                    <option value="DRAFT">Draft (Hidden)</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                  <ServiceStatusBadge status={status} />
                </div>
              </div>

              {/* Featured Flag */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-xs font-semibold text-text-primary block">
                    Featured Service
                  </span>
                  <span className="text-[11px] text-text-muted block">
                    Highlight prominently in navigation and hero mega-menus.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 accent-orange rounded cursor-pointer"
                />
              </div>

              {/* Display / Sort Order */}
              <div className="pt-2">
                <label
                  htmlFor="main-display-order"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Display Order
                </label>
                <input
                  id="main-display-order"
                  type="number"
                  min={0}
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(Number(e.target.value) || 0)}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                />
                <span className="text-[11px] text-text-muted mt-1 block">
                  Lower numbers appear first on navigation lists and landing pages.
                </span>
              </div>
            </div>

            {/* 2. SEO & Metadata Card */}
            <div className="bg-surface border border-border rounded-xl p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <Globe className="w-4 h-4 text-orange" />
                <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                  SEO &amp; Metadata
                </h2>
              </div>

              {/* Meta Title */}
              <div>
                <label
                  htmlFor="main-meta-title"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Page Meta Title
                </label>
                <input
                  id="main-meta-title"
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="e.g. Professional Assignment Help — ReadEssay"
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                />
              </div>

              {/* Meta Description */}
              <div>
                <label
                  htmlFor="main-meta-description"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Page Meta Description
                </label>
                <textarea
                  id="main-meta-description"
                  rows={3}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Brief summary for Google search results..."
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                />
              </div>

              {/* Canonical URL */}
              <div>
                <label
                  htmlFor="main-canonical-url"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Canonical URL (Optional)
                </label>
                <input
                  id="main-canonical-url"
                  type="text"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  placeholder="https://readessay.com/assignment-help"
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
