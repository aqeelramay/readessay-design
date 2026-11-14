"use client";

import { useState } from "react";
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
} from "lucide-react";
import type { MainService, ServiceStatus, FAQItem } from "@/data/mockServices";
import { ServiceStatusBadge } from "./ServiceStatusBadge";
import {
  CURATED_SERVICE_ICONS,
  ServiceIcon,
} from "./serviceIcons";

interface MainServiceFormProps {
  service?: MainService;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function MainServiceForm({ service }: MainServiceFormProps) {
  const router = useRouter();
  const isEditing = Boolean(service);

  // Form Fields
  const [icon, setIcon] = useState(service?.icon ?? "BookOpen");
  const [name, setName] = useState(service?.name ?? "");
  const [slug, setSlug] = useState(service?.slug ?? "");
  const [isSlugCustomized, setIsSlugCustomized] = useState(isEditing);
  const [shortIntro, setShortIntro] = useState(service?.shortIntro ?? "");
  const [heroTagline, setHeroTagline] = useState(service?.heroTagline ?? "");
  const [heroH1, setHeroH1] = useState(service?.heroH1 ?? "");
  const [heroSummary, setHeroSummary] = useState(service?.heroSummary ?? "");

  const [faqs, setFaqs] = useState<FAQItem[]>(
    service?.faqs ?? [
      {
        id: "faq-init-1",
        question:
          "How do your academic specialists approach complex coursework rubrics?",
        answer:
          "Specialists analyze the specific university rubric and learning outcomes to construct a fully referenced, syllabus-aligned response.",
      },
    ]
  );
  const [status, setStatus] = useState<ServiceStatus>(
    service?.status ?? "active"
  );
  const [displayOrder, setDisplayOrder] = useState<number>(
    service?.displayOrder ?? 1
  );
  const [metaTitle, setMetaTitle] = useState(service?.seo?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(
    service?.seo?.metaDescription ?? ""
  );

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleNameChange(value: string) {
    setName(value);
    if (!isSlugCustomized) {
      setSlug(slugify(value));
    }
  }

  // FAQ handlers
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

  function handleUpdateFaq(
    index: number,
    field: "question" | "answer",
    value: string
  ) {
    setFaqs((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  function handleRemoveFaq(index: number) {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  }

  // Form submit
  function handleSubmit(e: React.FormEvent) {
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
    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmation(
        isEditing
          ? `Service "${name}" updated successfully. Changes staged in local UI session.`
          : `Service "${name}" created successfully. Changes staged in local UI session.`
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 450);
  }

  const activeIconOption = CURATED_SERVICE_ICONS.find((opt) => opt.key === icon);

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
            {service ? `Edit Main Service: ${service.name}` : "Add Main Service"}
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            {isEditing
              ? "Update core academic category content, hero presentation, and search metadata."
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
            <Save className="w-4 h-4" />
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
            <span>{confirmation}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.push("/services")}
              className="text-xs font-semibold underline hover:text-emerald-950"
            >
              Return to Services
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
      <form id="main-service-form" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ======================================================== */}
          {/* Left Column: Primary Content (8 Cols)                   */}
          {/* ======================================================== */}
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
                  {/* Live Icon Badge Preview */}
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

                  {/* Icon Selector Grid */}
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
                  Service Name <span className="text-rose-500">*</span>
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

              {/* URL Slug */}
              <div>
                <label
                  htmlFor="main-slug"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  URL Slug <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center rounded-lg border border-border bg-canvas overflow-hidden focus-within:ring-2 focus-within:ring-orange/30 focus-within:border-orange transition-all">
                  <span className="px-3 text-xs text-text-muted select-none whitespace-nowrap">
                    readessay.com/services/
                  </span>
                  <input
                    id="main-slug"
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => {
                      setIsSlugCustomized(true);
                      setSlug(e.target.value);
                    }}
                    placeholder="assignment-help"
                    className="w-full bg-surface px-3 py-2.5 text-sm text-text-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Short Intro */}
              <div>
                <label
                  htmlFor="main-short-intro"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Short Intro <span className="text-text-muted font-normal">(Cards &amp; Overview)</span>
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
                    htmlFor="main-hero-tagline"
                    className="block text-xs font-semibold text-text-primary mb-1.5"
                  >
                    Hero Tagline
                  </label>
                  <input
                    id="main-hero-tagline"
                    type="text"
                    value={heroTagline}
                    onChange={(e) => setHeroTagline(e.target.value)}
                    placeholder="e.g., Comprehensive Subject Specializations"
                    className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
                  />
                </div>

                {/* H1 Headline */}
                <div>
                  <label
                    htmlFor="main-hero-h1"
                    className="block text-xs font-semibold text-text-primary mb-1.5"
                  >
                    H1 Headline
                  </label>
                  <input
                    id="main-hero-h1"
                    type="text"
                    value={heroH1}
                    onChange={(e) => setHeroH1(e.target.value)}
                    placeholder="e.g., Explore Our Assignment Help Services Across 26 Core Disciplines & Universities"
                    className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
                  />
                </div>

                {/* Short Summary */}
                <div>
                  <label
                    htmlFor="main-hero-summary"
                    className="block text-xs font-semibold text-text-primary mb-1.5"
                  >
                    Short Summary
                  </label>
                  <textarea
                    id="main-hero-summary"
                    rows={3}
                    value={heroSummary}
                    onChange={(e) => setHeroSummary(e.target.value)}
                    placeholder="e.g., Browse our specialized assignment solutions tailored for undergraduate, postgraduate, and university-specific curricula."
                    className="w-full bg-surface border border-border rounded-lg px-3.5 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
                  />
                </div>
              </div>
            </div>

            {/* 2. Page FAQs Card */}
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

          {/* ======================================================== */}
          {/* Right Column: Settings & SEO (4 Cols)                    */}
          {/* ======================================================== */}
          <div className="lg:col-span-4 space-y-6">
            {/* 1. Publishing & Hierarchy Card */}
            <div className="bg-surface border border-border rounded-xl p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <Sliders className="w-4 h-4 text-orange" />
                <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                  Publishing Settings
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
                  htmlFor="main-order"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Display Order
                </label>
                <input
                  id="main-order"
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
                    {service?.updatedAt || "Not yet saved"}
                  </span>
                </p>
                <p>Category Type: Top-Level Parent Service</p>
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
                  placeholder={`${name || "Assignment Help"} | ReadEssay`}
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
                  placeholder="Academic assistance description for Google SERP results..."
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
                    <span className="text-[#202124]">{slug || "service-slug"}</span>
                  </div>

                  {/* Google Title */}
                  <div className="text-sm text-[#1a0dab] font-medium leading-snug truncate hover:underline cursor-pointer">
                    {metaTitle || `${name || "Service Name"} | ReadEssay`}
                  </div>

                  {/* Google Snippet */}
                  <div className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                    {metaDescription ||
                      shortIntro ||
                      "Explore expert academic writing and research assistance from vetted university specialists."}
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
