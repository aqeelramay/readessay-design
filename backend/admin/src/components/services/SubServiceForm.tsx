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
} from "lucide-react";
import type {
  MainService,
  SubService,
  ServiceStatus,
  FAQItem,
} from "@/data/mockServices";
import { ServiceStatusBadge } from "./ServiceStatusBadge";

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

  // Form Fields
  const [parentId, setParentId] = useState(initialParentId);
  const [name, setName] = useState(subService?.name ?? "");
  const [slug, setSlug] = useState(subService?.slug ?? "");
  const [isSlugCustomized, setIsSlugCustomized] = useState(isEditing);
  const [heroTitle, setHeroTitle] = useState(subService?.heroTitle ?? "");
  const [shortDescription, setShortDescription] = useState(
    subService?.shortDescription ?? ""
  );
  const [overviewContent, setOverviewContent] = useState(
    subService?.overviewContent ?? ""
  );
  const [highlights, setHighlights] = useState<string[]>(
    subService?.highlights ?? [
      "Rigorous discipline-specific methodological guidance and analytical problem solving",
      "Full adherence to university assessment rubrics and pedagogical frameworks",
      "Comprehensive formatting and standard citation style compliance",
    ]
  );
  const [faqs, setFaqs] = useState<FAQItem[]>(
    subService?.faqs ?? [
      {
        id: "faq-sub-1",
        question: "How do your specialists handle complex discipline rubrics?",
        answer:
          "Specialists analyze specific coursework rubrics, syllabus outlines, and lecture notes to craft customized solutions.",
      },
    ]
  );
  const [status, setStatus] = useState<ServiceStatus>(
    subService?.status ?? "active"
  );
  const [displayOrder, setDisplayOrder] = useState<number>(
    subService?.displayOrder ?? 1
  );
  const [metaTitle, setMetaTitle] = useState(subService?.seo?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(
    subService?.seo?.metaDescription ?? ""
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

  // Highlights handlers
  function handleAddHighlight() {
    setHighlights((prev) => [...prev, ""]);
  }

  function handleUpdateHighlight(index: number, value: string) {
    setHighlights((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function handleRemoveHighlight(index: number) {
    setHighlights((prev) => prev.filter((_, i) => i !== index));
  }

  function handleMoveHighlight(index: number, direction: "up" | "down") {
    setHighlights((prev) => {
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
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

  // Submit handler
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setConfirmation(null);

    if (!parentId) {
      setError("Please select a parent main service category.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

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

  const selectedParent = mainServices.find((p) => p.id === parentId);

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
              ? "Update specialized academic sub-service content, curriculum highlights, and parent assignment."
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
                  ? "Save Changes"
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
          {/* Left Column: Primary Content (8 Cols)                   */}
          {/* ======================================================== */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. Basic Information Card */}
            <div className="bg-surface border border-border rounded-xl p-6 shadow-2xs space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <FileText className="w-4 h-4 text-orange" />
                <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                  Basic Information &amp; Editorial Content
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

              {/* Hero Headline */}
              <div>
                <label
                  htmlFor="sub-hero"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Hero Headline
                </label>
                <input
                  id="sub-hero"
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  placeholder="e.g. Professional Accounting & Financial Reporting Assignment Help"
                  className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
                />
              </div>

              {/* Short Summary */}
              <div>
                <label
                  htmlFor="sub-short-desc"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Short Summary / Listing Abstract
                </label>
                <textarea
                  id="sub-short-desc"
                  rows={2}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Concise 1-2 sentence overview for tables, cards, and previews..."
                  className="w-full bg-surface border border-border rounded-lg px-3.5 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
                />
              </div>

              {/* Overview Content */}
              <div>
                <label
                  htmlFor="sub-overview"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Detailed Page Content (Markdown / Text)
                </label>
                <textarea
                  id="sub-overview"
                  rows={7}
                  value={overviewContent}
                  onChange={(e) => setOverviewContent(e.target.value)}
                  placeholder="In-depth academic description, curriculum scope, assessment criteria..."
                  className="w-full bg-surface border border-border rounded-lg p-3.5 text-sm text-text-primary placeholder:text-text-muted font-sans leading-relaxed focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
                />
              </div>
            </div>

            {/* 2. Key Highlights / Benefits Card */}
            <div className="bg-surface border border-border rounded-xl p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange" />
                  <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                    Key Features &amp; Academic Highlights
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleAddHighlight}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:text-orange hover:border-orange/40 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Highlight</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {highlights.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-lg border border-border bg-canvas/40"
                  >
                    <span className="w-5 text-center text-xs font-mono text-text-muted">
                      {idx + 1}.
                    </span>
                    <input
                      type="text"
                      value={bullet}
                      onChange={(e) => handleUpdateHighlight(idx, e.target.value)}
                      placeholder="e.g. Balance sheet reconciliation and cash flow statement calculations"
                      className="flex-1 bg-surface border border-border rounded-md px-3 py-1.5 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    />

                    {/* Reorder Buttons */}
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveHighlight(idx, "up")}
                      aria-label="Move bullet up"
                      className="p-1 text-text-muted hover:text-text-primary disabled:opacity-30 disabled:hover:text-text-muted"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === highlights.length - 1}
                      onClick={() => handleMoveHighlight(idx, "down")}
                      aria-label="Move bullet down"
                      className="p-1 text-text-muted hover:text-text-primary disabled:opacity-30 disabled:hover:text-text-muted"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveHighlight(idx)}
                      aria-label="Remove bullet"
                      className="p-1 text-text-muted hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Page FAQs Card */}
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
                      onChange={(e) => handleUpdateFaq(idx, "question", e.target.value)}
                      placeholder="e.g. Do you include Excel spreadsheets with calculation formulas?"
                      className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                    />

                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => handleUpdateFaq(idx, "answer", e.target.value)}
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
                <FolderTree className="w-4 h-4 text-orange" />
                <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                  Hierarchy &amp; Publishing
                </h2>
              </div>

              {/* Parent Service Selector */}
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
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
                >
                  <option value="" disabled>
                    Select Parent Category
                  </option>
                  {mainServices.map((parent) => (
                    <option key={parent.id} value={parent.id}>
                      {parent.name}
                    </option>
                  ))}
                </select>
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
                  onChange={(e) => setDisplayOrder(parseInt(e.target.value, 10) || 1)}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                />
              </div>

              {/* Metadata */}
              <div className="pt-3 border-t border-border text-xs text-text-muted space-y-1">
                <p>
                  Parent:{" "}
                  <span className="font-semibold text-text-secondary">
                    {selectedParent?.name ?? "Unassigned"}
                  </span>
                </p>
                <p>
                  Last Updated:{" "}
                  <span className="font-mono text-text-secondary">
                    {subService?.updatedAt || "Not yet saved"}
                  </span>
                </p>
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
                    htmlFor="meta-title-sub"
                    className="block text-xs font-semibold text-text-primary"
                  >
                    Meta Title
                  </label>
                  <span
                    className={`text-[10px] font-mono ${metaTitle.length > 60
                      ? "text-amber-600 font-bold"
                      : "text-text-muted"
                      }`}
                  >
                    {metaTitle.length}/60
                  </span>
                </div>
                <input
                  id="meta-title-sub"
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder={`${name || "Accounting Help"} | ReadEssay`}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                />
              </div>

              {/* Meta Description */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="meta-desc-sub"
                    className="block text-xs font-semibold text-text-primary"
                  >
                    Meta Description
                  </label>
                  <span
                    className={`text-[10px] font-mono ${metaDescription.length > 160
                      ? "text-amber-600 font-bold"
                      : "text-text-muted"
                      }`}
                  >
                    {metaDescription.length}/160
                  </span>
                </div>
                <textarea
                  id="meta-desc-sub"
                  rows={3}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Discipline-specific assistance description for Google SERP results..."
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
                    <span className="text-[#202124]">{slug || "sub-service-slug"}</span>
                  </div>

                  {/* Google Title */}
                  <div className="text-sm text-[#1a0dab] font-medium leading-snug truncate hover:underline cursor-pointer">
                    {metaTitle || `${name || "Sub-Service Name"} | ReadEssay`}
                  </div>

                  {/* Google Snippet */}
                  <div className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                    {metaDescription ||
                      shortDescription ||
                      "Expert academic assistance and research guidance from vetted subject-matter specialists."}
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
