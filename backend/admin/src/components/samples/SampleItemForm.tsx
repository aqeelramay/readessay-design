"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Save,
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  X,
  RefreshCw,
  Layers,
  ExternalLink,
} from "lucide-react";
import {
  type AcademicSample,
  type AcademicSampleFile,
  type SampleStatus,
  INITIAL_SAMPLE_SECTIONS,
} from "@/data/mockSamples";

interface SampleItemFormProps {
  sample?: AcademicSample;
}

const ACADEMIC_LEVELS = [
  "Undergraduate",
  "Masters Degree",
  "MBA / Masters",
  "Masters / PhD",
  "LLM / Masters",
  "PhD / Doctoral",
  "Executive Education",
];

const DOCUMENT_TYPES = [
  "Financial Analysis Q&A",
  "Case Study",
  "Research Report",
  "Strategic Plan",
  "Empirical Paper",
  "Legal Analysis",
  "Statistical Lab",
  "Technical Paper",
  "Clinical Case Study",
  "Literature Review",
  "Thesis Prospectus",
  "Policy Brief",
  "Comparative Essay",
];

const CITATION_STYLES = [
  "APA 7th Edition",
  "Harvard Format",
  "Chicago 17th",
  "MLA 9th Edition",
  "OSCOLA (Oxford)",
  "Bluebook 21st",
  "IEEE Standard",
  "Vancouver",
];

export function SampleItemForm({ sample }: SampleItemFormProps) {
  const searchParams = useSearchParams();
  const isEditing = Boolean(sample);

  // Pre-select section if passed via query param e.g. /samples/items/new?section=sec-1
  const querySectionId = searchParams.get("section");
  const initialSectionId = (() => {
    if (sample?.sectionId) return sample.sectionId;
    if (querySectionId) return querySectionId;
    return INITIAL_SAMPLE_SECTIONS[0]?.id ?? "sec-1";
  })();

  // Form Fields
  const [title, setTitle] = useState(sample?.title ?? "");
  const [sectionId, setSectionId] = useState(initialSectionId);
  const [pageCount, setPageCount] = useState<number>(sample?.pageCount ?? 5);

  // 4-Slot Metadata Grid
  const [academicLevel, setAcademicLevel] = useState(
    sample?.academicLevel ?? "Masters Degree"
  );
  const [documentType, setDocumentType] = useState(
    sample?.documentType ?? "Research Report"
  );
  const [citationStyle, setCitationStyle] = useState(
    sample?.citationStyle ?? "APA 7th Edition"
  );
  const [customMetaLabel, setCustomMetaLabel] = useState(
    sample?.customMetaLabel ?? "Framework"
  );
  const [customMetaValue, setCustomMetaValue] = useState(
    sample?.customMetaValue ?? "Empirical Analysis"
  );

  // Document File Attachment (strictly PDF or DOCX)
  const [documentFile, setDocumentFile] = useState<AcademicSampleFile | null>(
    sample?.documentFile ?? {
      fileName: "Exemplar_Academic_Paper.pdf",
      fileType: "PDF",
      fileSize: "1.8 MB",
      fileUrl: "/samples/exemplars/Exemplar_Academic_Paper.pdf",
    }
  );

  const [status, setStatus] = useState<SampleStatus>(
    sample?.status ?? "active"
  );
  const [displayOrder, setDisplayOrder] = useState<number>(
    sample?.displayOrder ?? 1
  );

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSimulatedFileUpload(type: "PDF" | "DOCX") {
    const ext = type === "PDF" ? "pdf" : "docx";
    const cleanTitle = title
      ? title.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 30)
      : "Academic_Sample_Document";
    const mockName = `${cleanTitle}.${ext}`;

    setDocumentFile({
      fileName: mockName,
      fileType: type,
      fileSize: type === "PDF" ? "1.8 MB" : "850 KB",
      fileUrl: `/samples/uploads/${mockName}`,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Please provide a sample title.");
      return;
    }
    if (!sectionId) {
      setError("Please select an academic discipline section.");
      return;
    }
    if (!documentFile) {
      setError(
        "Please attach an academic sample document file (.pdf or .docx)."
      );
      return;
    }
    if (!customMetaLabel.trim() || !customMetaValue.trim()) {
      setError(
        "Please fill in both custom metadata slot label and value."
      );
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmation(
        isEditing
          ? `Sample "${title}" updated successfully. Changes staged in local UI session.`
          : `Sample "${title}" created successfully. Changes staged in local UI session.`
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
            href="/samples/items"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-orange transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to All Samples</span>
          </Link>
          <h1 className="text-2xl sm:text-[26px] font-bold text-text-primary tracking-tight">
            {isEditing
              ? `Edit Academic Sample: ${sample?.title}`
              : "Add Academic Sample"}
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            {isEditing
              ? "Update sample metadata, citations, and attached exemplar document."
              : "Upload a verified academic exemplar and configure discipline metadata."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/samples/items"
            className="px-4 py-2 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-canvas transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            form="sample-item-form"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-orange hover:bg-orange-hover text-white text-xs font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40 disabled:opacity-75"
          >
            <Save className="w-4 h-4" />
            <span>
              {isSubmitting
                ? "Saving..."
                : isEditing
                ? "Save Changes"
                : "Create Sample"}
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
        id="sample-item-form"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        {/* Left Column (8 cols): Core info, 4-slot grid, file upload */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Sample Details & Metadata */}
          <div className="bg-surface rounded-xl border border-border p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-border">
              <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center text-orange">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-text-primary">
                  Academic Sample Details
                </h2>
                <p className="text-xs text-text-secondary">
                  Paper title, page volume, and 4-slot academic metadata grid.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1.5">
                  Sample Title <span className="text-orange">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Mergers & Acquisitions Valuation Model and LBO Debt Structure"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary placeholder:text-text-muted"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1.5">
                  Page Count <span className="text-orange">*</span>
                </label>
                <input
                  type="number"
                  min={1}
                  max={500}
                  value={pageCount}
                  onChange={(e) =>
                    setPageCount(parseInt(e.target.value) || 1)
                  }
                  className="w-full sm:w-48 px-3.5 py-2 text-sm rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary"
                  required
                />
                <p className="text-[11px] text-text-secondary mt-1">
                  Total exemplar page length shown to students and researchers.
                </p>
              </div>

              {/* 4-Slot Academic Metadata Grid */}
              <div className="pt-2">
                <div className="text-xs font-bold text-text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span>Standard 4-Slot Academic Metadata</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-canvas border border-border">
                  {/* Slot 1: Academic Level */}
                  <div>
                    <label className="block text-xs font-semibold text-text-primary mb-1.5">
                      Slot 1: Academic Level <span className="text-orange">*</span>
                    </label>
                    <select
                      value={academicLevel}
                      onChange={(e) => setAcademicLevel(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary"
                    >
                      {ACADEMIC_LEVELS.map((lvl) => (
                        <option key={lvl} value={lvl}>
                          {lvl}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Slot 2: Document Type */}
                  <div>
                    <label className="block text-xs font-semibold text-text-primary mb-1.5">
                      Slot 2: Document Type <span className="text-orange">*</span>
                    </label>
                    <input
                      type="text"
                      list="doc-types-list"
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value)}
                      placeholder="e.g. Case Study, Empirical Paper..."
                      className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary"
                      required
                    />
                    <datalist id="doc-types-list">
                      {DOCUMENT_TYPES.map((dt) => (
                        <option key={dt} value={dt} />
                      ))}
                    </datalist>
                  </div>

                  {/* Slot 3: Citation Style */}
                  <div>
                    <label className="block text-xs font-semibold text-text-primary mb-1.5">
                      Slot 3: Citation Style <span className="text-orange">*</span>
                    </label>
                    <select
                      value={citationStyle}
                      onChange={(e) => setCitationStyle(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary"
                    >
                      {CITATION_STYLES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Slot 4: Discipline-Specific Label & Value Pair */}
                  <div>
                    <label className="block text-xs font-semibold text-text-primary mb-1.5">
                      Slot 4: Custom Discipline Slot <span className="text-orange">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={customMetaLabel}
                        onChange={(e) => setCustomMetaLabel(e.target.value)}
                        placeholder="Label (e.g. Software)"
                        className="w-full px-2.5 py-2 text-xs rounded-lg border border-border bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary placeholder:text-text-muted"
                        required
                      />
                      <input
                        type="text"
                        value={customMetaValue}
                        onChange={(e) => setCustomMetaValue(e.target.value)}
                        placeholder="Value (e.g. Excel • Solver)"
                        className="w-full px-2.5 py-2 text-xs rounded-lg border border-border bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary placeholder:text-text-muted"
                        required
                      />
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-text-secondary mt-1.5">
                  Slot 4 provides discipline-specific context (e.g. Audit Scope,
                  Statistical Pack, Framework, Jurisdiction, Notation).
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Downloadable Document File Attachment */}
          <div className="bg-surface rounded-xl border border-border p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-border">
              <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center text-orange">
                <UploadCloud className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-text-primary">
                  Downloadable Document Attachment
                </h2>
                <p className="text-xs text-text-secondary">
                  PDF or DOCX document file. ReadEssay samples are distributed as
                  downloadable academic files.
                </p>
              </div>
            </div>

            {/* Existing File Card or Upload Area */}
            {documentFile ? (
              <div className="p-4 rounded-xl border border-border bg-canvas/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold font-mono ${
                      documentFile.fileType === "PDF"
                        ? "bg-red-100 text-red-700 border border-red-200"
                        : "bg-blue-100 text-blue-700 border border-blue-200"
                    }`}
                  >
                    {documentFile.fileType}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-text-primary font-mono truncate max-w-xs sm:max-w-md">
                      {documentFile.fileName}
                    </div>
                    <div className="text-[11px] text-text-secondary flex items-center gap-2 mt-0.5">
                      <span>Size: {documentFile.fileSize}</span>
                      <span>•</span>
                      <span className="text-emerald-600 font-medium flex items-center gap-1">
                        <FileCheck className="w-3 h-3" /> Ready for download
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={documentFile.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-text-secondary hover:text-navy text-xs font-semibold transition-colors"
                    title="Open document in new tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Document</span>
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      handleSimulatedFileUpload(
                        documentFile.fileType === "PDF" ? "DOCX" : "PDF"
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-text-secondary hover:text-navy text-xs font-semibold transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>
                      Switch to {documentFile.fileType === "PDF" ? "DOCX" : "PDF"}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDocumentFile(null)}
                    className="p-1.5 rounded-lg border border-border bg-surface text-text-secondary hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-xl border-2 border-dashed border-border bg-canvas text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center text-orange mx-auto">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-text-primary">
                    Upload Academic Document File
                  </p>
                  <p className="text-[11px] text-text-secondary mt-0.5">
                    Drag and drop or select a document file (.pdf or .docx, up to
                    25MB)
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleSimulatedFileUpload("PDF")}
                    className="px-3.5 py-1.5 rounded-lg bg-navy hover:bg-navy-hover text-white text-xs font-semibold transition-colors"
                  >
                    Attach Mock PDF (.pdf)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSimulatedFileUpload("DOCX")}
                    className="px-3.5 py-1.5 rounded-lg border border-border bg-surface text-text-primary hover:bg-canvas text-xs font-semibold transition-colors"
                  >
                    Attach Mock DOCX (.docx)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (4 cols): Section selector, status, display order */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Discipline & Hierarchy */}
          <div className="bg-surface rounded-xl border border-border p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <Layers className="w-4 h-4 text-orange" />
              <h2 className="text-base font-bold text-text-primary">
                Discipline Hierarchy
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1.5">
                  Discipline Section <span className="text-orange">*</span>
                </label>
                <select
                  value={sectionId}
                  onChange={(e) => setSectionId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary font-medium"
                  required
                >
                  {INITIAL_SAMPLE_SECTIONS.map((sec) => (
                    <option key={sec.id} value={sec.id}>
                      {sec.heading}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-text-secondary mt-1">
                  The parent category this sample belongs to.
                </p>
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
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary"
                />
                <p className="text-[11px] text-text-secondary mt-1">
                  Sort priority inside the discipline sample listing.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Publishing Status */}
          <div className="bg-surface rounded-xl border border-border p-6 shadow-xs space-y-5">
            <h2 className="text-base font-bold text-text-primary pb-3 border-b border-border">
              Publishing Status
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-2">
                  Sample Visibility
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

              {isEditing && (
                <div className="pt-3 border-t border-border/60 text-xs text-text-secondary space-y-1.5">
                  <div className="flex justify-between">
                    <span>Sample ID:</span>
                    <span className="font-mono text-text-primary">
                      {sample?.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last updated:</span>
                    <span className="font-mono text-text-primary">
                      {sample?.updatedAt ?? "2026-11-12"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
