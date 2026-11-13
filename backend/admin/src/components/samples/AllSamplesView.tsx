"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  CheckCircle2,
  FileText,
  Layers,
  ExternalLink,
} from "lucide-react";
import {
  INITIAL_ACADEMIC_SAMPLES,
  INITIAL_SAMPLE_SECTIONS,
  type AcademicSample,
  type SampleSection,
} from "@/data/mockSamples";
import { SampleStatusBadge } from "./SampleStatusBadge";
import { DeleteConfirmModal } from "@/components/services/DeleteConfirmModal";

export function AllSamplesView() {
  const [samples, setSamples] = useState<AcademicSample[]>(
    INITIAL_ACADEMIC_SAMPLES
  );
  const [sections] = useState<SampleSection[]>(INITIAL_SAMPLE_SECTIONS);

  const [searchQuery, setSearchQuery] = useState("");
  const [disciplineFilter, setDisciplineFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [deletingSample, setDeletingSample] = useState<AcademicSample | null>(
    null
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }

  function getSectionHeading(sectionId: string): string {
    const sec = sections.find((s) => s.id === sectionId);
    return sec?.heading ?? "General";
  }

  const filteredSamples = useMemo(() => {
    return samples
      .filter((sample) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          sample.title.toLowerCase().includes(query) ||
          sample.academicLevel.toLowerCase().includes(query) ||
          sample.documentType.toLowerCase().includes(query) ||
          sample.citationStyle.toLowerCase().includes(query) ||
          sample.customMetaLabel.toLowerCase().includes(query) ||
          sample.customMetaValue.toLowerCase().includes(query) ||
          sample.documentFile.fileName.toLowerCase().includes(query);

        const matchesDiscipline =
          disciplineFilter === "all" || sample.sectionId === disciplineFilter;

        const matchesStatus =
          statusFilter === "all" || sample.status === statusFilter;

        return matchesSearch && matchesDiscipline && matchesStatus;
      })
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [samples, searchQuery, disciplineFilter, statusFilter]);

  function handleDeleteConfirm() {
    if (!deletingSample) return;
    const title = deletingSample.title;
    setSamples((prev) => prev.filter((s) => s.id !== deletingSample.id));
    setDeletingSample(null);
    showToast(`Sample "${title}" deleted successfully.`);
  }

  // Summary Metrics
  const totalSamplesCount = samples.length;
  const activeSamplesCount = samples.filter((s) => s.status === "active").length;
  const totalPagesCount = samples.reduce((acc, s) => acc + s.pageCount, 0);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-navy text-white text-xs font-semibold rounded-xl shadow-lg border border-navy-hover animate-in fade-in slide-in-from-bottom-3"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[26px] font-bold text-text-primary tracking-tight">
            All Academic Samples
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Manage peer-reviewed academic exemplars, document attachments, and
            citation metadata across all discipline sections.
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/samples"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border bg-surface text-text-secondary hover:text-text-primary hover:bg-canvas text-xs font-semibold transition-colors"
          >
            <Layers className="w-4 h-4 text-orange" />
            <span>Discipline Sections</span>
          </Link>
          <Link
            href="/samples/items/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange hover:bg-orange-hover text-white text-xs font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40"
          >
            <Plus className="w-4 h-4" />
            <span>Add Sample</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-xl p-4 shadow-xs">
          <div className="text-xs text-text-secondary font-medium">
            Total Samples
          </div>
          <div className="text-2xl font-bold text-text-primary mt-1">
            {totalSamplesCount}
          </div>
          <div className="text-[11px] text-text-muted mt-1">
            Across {sections.length} disciplines
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 shadow-xs">
          <div className="text-xs text-text-secondary font-medium">
            Active Samples
          </div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">
            {activeSamplesCount}
          </div>
          <div className="text-[11px] text-text-muted mt-1">
            Published in library
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 shadow-xs">
          <div className="text-xs text-text-secondary font-medium">
            Total Pages Archived
          </div>
          <div className="text-2xl font-bold text-navy mt-1">
            {totalPagesCount}
          </div>
          <div className="text-[11px] text-text-muted mt-1">
            Indexed academic content
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 shadow-xs">
          <div className="text-xs text-text-secondary font-medium">
            Discipline Sections
          </div>
          <div className="text-2xl font-bold text-orange mt-1">
            {sections.length}
          </div>
          <div className="text-[11px] text-text-muted mt-1">
            Academic domains covered
          </div>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-surface border border-border rounded-xl p-4 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-canvas rounded-lg border border-border/80 self-start sm:self-auto overflow-x-auto">
            {(["all", "active", "draft", "archived"] as const).map((tab) => {
              const count =
                tab === "all"
                  ? samples.length
                  : samples.filter((s) => s.status === tab).length;
              const isActive = statusFilter === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setStatusFilter(tab)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all capitalize whitespace-nowrap ${
                    isActive
                      ? "bg-surface text-navy shadow-xs border border-border"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive
                        ? "bg-navy/10 text-navy"
                        : "bg-slate-200/60 text-text-secondary"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Discipline Dropdown Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-text-secondary whitespace-nowrap">
              Discipline:
            </span>
            <select
              value={disciplineFilter}
              onChange={(e) => setDisciplineFilter(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary font-medium"
            >
              <option value="all">All Disciplines ({samples.length})</option>
              {sections.map((sec) => {
                const count = samples.filter(
                  (s) => s.sectionId === sec.id
                ).length;
                return (
                  <option key={sec.id} value={sec.id}>
                    {sec.heading} ({count})
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, level, citation style, document type, file name, or custom metadata..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary placeholder:text-text-muted"
          />
        </div>
      </div>

      {/* SaaS Data Table */}
      <div className="bg-surface border border-border rounded-xl shadow-xs overflow-hidden">
        {filteredSamples.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center text-orange mx-auto mb-3">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-text-primary">
              No academic samples found
            </h2>
            <p className="text-xs text-text-secondary mt-1 max-w-sm mx-auto">
              No sample records match your current filter criteria. Try
              adjusting search query or discipline selection.
            </p>
            {(searchQuery ||
              disciplineFilter !== "all" ||
              statusFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setDisciplineFilter("all");
                  setStatusFilter("all");
                }}
                className="mt-4 px-3.5 py-1.5 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-canvas transition-colors"
              >
                Reset All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-canvas border-b border-border text-text-secondary font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Sample Title</th>
                  <th className="py-3 px-4">Discipline Section</th>
                  <th className="py-3 px-3">Pages</th>
                  <th className="py-3 px-4">Academic Level & Citation</th>
                  <th className="py-3 px-4">Document File</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-surface">
                {filteredSamples.map((sample) => {
                  const sectionHeading = getSectionHeading(sample.sectionId);

                  return (
                    <tr
                      key={sample.id}
                      className="hover:bg-canvas/60 transition-colors"
                    >
                      {/* Sample Title */}
                      <td className="py-3 px-4">
                        <Link
                          href={`/samples/items/${sample.id}/edit`}
                          className="font-semibold text-text-primary hover:text-orange transition-colors line-clamp-1 max-w-xs block"
                        >
                          {sample.title}
                        </Link>
                        <div className="text-[11px] text-text-secondary mt-0.5 flex items-center gap-1.5">
                          <span className="font-medium text-navy">
                            {sample.customMetaLabel}:
                          </span>
                          <span>{sample.customMetaValue}</span>
                        </div>
                      </td>

                      {/* Discipline Section */}
                      <td className="py-3 px-4">
                        <Link
                          href={`/samples/${sample.sectionId}/edit`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-canvas border border-border text-[11px] font-semibold text-text-secondary hover:text-navy hover:border-navy transition-colors max-w-[200px] truncate"
                        >
                          <span className="truncate">{sectionHeading}</span>
                        </Link>
                      </td>

                      {/* Pages */}
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-semibold whitespace-nowrap">
                          {sample.pageCount} Pages
                        </span>
                      </td>

                      {/* Level & Citation */}
                      <td className="py-3 px-4">
                        <div className="font-medium text-text-primary">
                          {sample.academicLevel}
                        </div>
                        <div className="text-[11px] text-text-secondary mt-0.5">
                          {sample.documentType} • {sample.citationStyle}
                        </div>
                      </td>

                      {/* Document File */}
                      <td className="py-3 px-4">
                        <a
                          href={sample.documentFile.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 group/file"
                          title="View / Download document in new tab"
                        >
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold font-mono transition-transform group-hover/file:scale-105 ${
                              sample.documentFile.fileType === "PDF"
                                ? "bg-red-100 text-red-700 border border-red-200"
                                : "bg-blue-100 text-blue-700 border border-blue-200"
                            }`}
                          >
                            {sample.documentFile.fileType}
                          </span>
                          <div className="min-w-0">
                            <span className="font-mono text-[11px] text-text-primary group-hover/file:text-orange group-hover/file:underline block truncate max-w-[150px] transition-colors">
                              {sample.documentFile.fileName}
                            </span>
                            <span className="text-[10px] text-text-muted">
                              {sample.documentFile.fileSize}
                            </span>
                          </div>
                        </a>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3">
                        <SampleStatusBadge status={sample.status} />
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
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
                            title="Edit Sample"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => setDeletingSample(sample)}
                            className="p-1.5 rounded-md text-text-secondary hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Sample"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingSample && (
        <DeleteConfirmModal
          isOpen={Boolean(deletingSample)}
          title="Delete Academic Sample"
          itemName={deletingSample.title}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingSample(null)}
        />
      )}
    </div>
  );
}
