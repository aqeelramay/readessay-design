"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Plus,
  Pencil,
  Trash2,
  Globe,
  FileText,
  CheckCircle2,
  AlertCircle,
  Layers,
  ExternalLink,
} from "lucide-react";
import {
  type SampleSection,
  type SampleStatus,
  type AcademicSample,
  getSamplesForSection,
} from "@/data/mockSamples";
import { SampleStatusBadge } from "./SampleStatusBadge";

interface SampleSectionFormProps {
  section?: SampleSection;
}

export function SampleSectionForm({ section }: SampleSectionFormProps) {
  const isEditing = Boolean(section);

  // Form Fields
  const [heading, setHeading] = useState(section?.heading ?? "");
  const [shortSummary, setShortSummary] = useState(
    section?.shortSummary ?? ""
  );

  const [status, setStatus] = useState<SampleStatus>(
    section?.status ?? "active"
  );
  const [displayOrder, setDisplayOrder] = useState<number>(
    section?.displayOrder ?? 1
  );

  const [metaTitle, setMetaTitle] = useState(section?.seo?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(
    section?.seo?.metaDescription ?? ""
  );

  // Embedded section samples (staged in UI session if editing)
  const [sectionSamples, setSectionSamples] = useState<AcademicSample[]>(() => {
    if (section?.id) {
      return getSamplesForSection(section.id);
    }
    return [];
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleHeadingChange(val: string) {
    setHeading(val);
    if (!metaTitle || metaTitle === `${heading} Samples | ReadEssay`) {
      setMetaTitle(`${val} Samples | ReadEssay`);
    }
  }

  function handleDeleteSample(sampleId: string) {
    setSectionSamples((prev) => prev.filter((s) => s.id !== sampleId));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!heading.trim()) {
      setError("Please provide a discipline section heading.");
      return;
    }
    if (!shortSummary.trim()) {
      setError("Please enter a short summary of this discipline section.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmation(
        isEditing
          ? `Discipline section "${heading}" updated successfully. Changes staged in local UI session.`
          : `Discipline section "${heading}" created successfully. Changes staged in local UI session.`
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 400);
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border">
        <div>
          <Link
            href="/samples"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-orange transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to Sections</span>
          </Link>
          <h1 className="text-2xl sm:text-[26px] font-bold text-text-primary tracking-tight">
            {isEditing
              ? `Edit Discipline Section: ${section?.heading}`
              : "Add Discipline Section"}
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            {isEditing
              ? "Update section summary, view discipline samples, and configure SEO metadata."
              : "Create a new academic discipline section to categorize exemplar documents."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/samples"
            className="px-4 py-2 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-canvas transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            form="sample-section-form"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-orange hover:bg-orange-hover text-white text-xs font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40 disabled:opacity-75"
          >
            <Save className="w-4 h-4" />
            <span>
              {isSubmitting
                ? "Saving..."
                : isEditing
                ? "Save Changes"
                : "Create Section"}
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
            <span className="font-medium">{confirmation}</span>
          </div>
          <button
            type="button"
            onClick={() => setConfirmation(null)}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-semibold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start justify-between gap-3 animate-in fade-in"
        >
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-red-700 hover:text-red-900 text-xs font-semibold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main 2-Column Grid */}
      <form
        id="sample-section-form"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        {/* Left Column (8 cols): Core info & samples list */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Section Information */}
          <div className="bg-surface rounded-xl border border-border p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-border">
              <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center text-orange">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-text-primary">
                  Discipline Information
                </h2>
                <p className="text-xs text-text-secondary">
                  Heading, URL structure, and academic overview summary.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1.5">
                  Section Heading <span className="text-orange">*</span>
                </label>
                <input
                  type="text"
                  value={heading}
                  onChange={(e) => handleHeadingChange(e.target.value)}
                  placeholder="e.g. Accounting & Corporate Finance"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary placeholder:text-text-muted"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1.5">
                  Short Academic Summary <span className="text-orange">*</span>
                </label>
                <textarea
                  rows={4}
                  value={shortSummary}
                  onChange={(e) => setShortSummary(e.target.value)}
                  placeholder="Describe the disciplinary scope, methodologies, frameworks, and academic rigor exhibited in these samples..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary placeholder:text-text-muted resize-y"
                  required
                />
                <p className="text-[11px] text-text-secondary mt-1">
                  Displayed as the lead paragraph on the public discipline section directory.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Section Samples Table (Edit mode only) */}
          {isEditing && (
            <div className="bg-surface rounded-xl border border-border p-6 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center text-orange">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-text-primary">
                      Samples in this Discipline
                    </h2>
                    <p className="text-xs text-text-secondary">
                      {sectionSamples.length} academic exemplar documents
                      associated with this section.
                    </p>
                  </div>
                </div>

                <Link
                  href={`/samples/items/new?section=${section?.id ?? ""}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange hover:bg-orange-hover text-white text-xs font-semibold transition-colors shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Sample</span>
                </Link>
              </div>

              {sectionSamples.length === 0 ? (
                <div className="text-center py-8 px-4 rounded-lg border border-dashed border-border bg-canvas">
                  <p className="text-xs font-medium text-text-secondary mb-3">
                    No academic samples registered under this section yet.
                  </p>
                  <Link
                    href={`/samples/items/new?section=${section?.id ?? ""}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-navy hover:bg-navy-hover text-white text-xs font-semibold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Upload First Sample</span>
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-canvas border-b border-border text-text-secondary font-semibold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-2.5 px-3.5">Sample Title</th>
                        <th className="py-2.5 px-3">Level & Type</th>
                        <th className="py-2.5 px-3">File Attachment</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-surface">
                      {sectionSamples.map((sample) => (
                        <tr
                          key={sample.id}
                          className="hover:bg-canvas/60 transition-colors"
                        >
                          <td className="py-3 px-3.5">
                            <div className="font-semibold text-text-primary line-clamp-1 max-w-[280px]">
                              {sample.title}
                            </div>
                            <div className="text-[11px] text-text-secondary mt-0.5">
                              {sample.pageCount} Pages • {sample.citationStyle}
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-medium text-text-primary">
                              {sample.academicLevel}
                            </span>
                            <div className="text-[11px] text-text-secondary">
                              {sample.documentType}
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <a
                              href={sample.documentFile.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-[11px] font-mono transition-colors"
                              title="View / Download document in new tab"
                            >
                              <span
                                className={`px-1 rounded text-[9px] font-bold ${
                                  sample.documentFile.fileType === "PDF"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                {sample.documentFile.fileType}
                              </span>
                              <span>{sample.documentFile.fileSize}</span>
                            </a>
                          </td>
                          <td className="py-3 px-3">
                            <SampleStatusBadge status={sample.status} />
                          </td>
                          <td className="py-3 px-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <a
                                href={sample.documentFile.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-md text-text-secondary hover:text-navy hover:bg-canvas transition-colors"
                                title="View sample in new tab"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                              <Link
                                href={`/samples/items/${sample.id}/edit`}
                                className="p-1.5 rounded-md text-text-secondary hover:text-navy hover:bg-canvas transition-colors"
                                title="Edit sample"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </Link>
                              <button
                                type="button"
                                onClick={() => handleDeleteSample(sample.id)}
                                className="p-1.5 rounded-md text-text-secondary hover:text-red-600 hover:bg-red-50 transition-colors"
                                title="Delete sample"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column (4 cols): Publishing & SEO */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Publishing & Visibility */}
          <div className="bg-surface rounded-xl border border-border p-6 shadow-xs space-y-5">
            <h2 className="text-base font-bold text-text-primary pb-3 border-b border-border">
              Publishing & Visibility
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-2">
                  Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["active", "draft", "archived"] as SampleStatus[]).map(
                    (s) => {
                      const isSelected = status === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setStatus(s)}
                          className={`py-2 px-3 rounded-lg border text-xs font-semibold capitalize transition-all ${
                            isSelected
                              ? s === "active"
                                ? "border-emerald-600 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600"
                                : s === "draft"
                                ? "border-amber-600 bg-amber-50 text-amber-800 ring-1 ring-amber-600"
                                : "border-slate-500 bg-slate-100 text-slate-800 ring-1 ring-slate-500"
                              : "border-border text-text-secondary hover:bg-canvas"
                          }`}
                        >
                          {s}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1.5">
                  Display Order
                </label>
                <input
                  type="number"
                  min={1}
                  value={displayOrder}
                  onChange={(e) =>
                    setDisplayOrder(parseInt(e.target.value) || 1)
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary"
                />
                <p className="text-[11px] text-text-secondary mt-1">
                  Determines the sort sequence on the public Samples directory.
                </p>
              </div>

              {isEditing && (
                <div className="pt-3 border-t border-border/60 text-xs text-text-secondary space-y-1.5">
                  <div className="flex justify-between">
                    <span>Associated Samples:</span>
                    <span className="font-semibold text-text-primary">
                      {sectionSamples.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last updated:</span>
                    <span className="font-mono text-text-primary">
                      {section?.updatedAt ?? "2026-11-12"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Card 2: SEO & Search Metadata */}
          <div className="bg-surface rounded-xl border border-border p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <Globe className="w-4 h-4 text-orange" />
              <h2 className="text-base font-bold text-text-primary">
                Search Engine Optimization
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-text-primary">
                    Meta Title
                  </label>
                  <span
                    className={`text-[11px] font-mono ${
                      metaTitle.length > 60
                        ? "text-red-500 font-bold"
                        : "text-text-secondary"
                    }`}
                  >
                    {metaTitle.length}/60
                  </span>
                </div>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="e.g. Accounting & Corporate Finance Samples | ReadEssay"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-text-primary">
                    Meta Description
                  </label>
                  <span
                    className={`text-[11px] font-mono ${
                      metaDescription.length > 160
                        ? "text-red-500 font-bold"
                        : "text-text-secondary"
                    }`}
                  >
                    {metaDescription.length}/160
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Exemplar academic accounting and corporate finance research papers..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary resize-y"
                />
              </div>

              {/* SERP Preview Box */}
              <div className="pt-2">
                <span className="block text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-2">
                  Google SERP Preview
                </span>
                <div className="p-3.5 rounded-lg bg-canvas border border-border space-y-1">
                  <div className="text-[11px] text-[#202124] flex items-center gap-1 font-mono">
                    <span>readessay.com</span>
                    <span>›</span>
                    <span className="text-text-secondary">samples</span>
                  </div>
                  <div className="text-xs font-semibold text-[#1a0dab] line-clamp-1 hover:underline cursor-pointer">
                    {metaTitle ||
                      (heading
                        ? `${heading} Samples | ReadEssay`
                        : "Discipline Samples | ReadEssay")}
                  </div>
                  <div className="text-[11px] text-[#4d5156] line-clamp-2 leading-relaxed">
                    {metaDescription ||
                      shortSummary ||
                      "Browse verified university-level exemplar documents, financial analyses, and peer-reviewed academic assignments."}
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
