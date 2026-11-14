"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  CheckCircle2,
  Filter,
  BookOpen,
  ArrowRight,
  FolderOpen,
} from "lucide-react";
import {
  INITIAL_SAMPLE_SECTIONS,
  INITIAL_ACADEMIC_SAMPLES,
  type SampleSection,
} from "@/data/mockSamples";
import { SampleStatusBadge } from "./SampleStatusBadge";
import { DeleteConfirmModal } from "@/components/services/DeleteConfirmModal";

export function SampleSectionsView() {
  const [sections, setSections] = useState<SampleSection[]>(
    INITIAL_SAMPLE_SECTIONS
  );
  const [samples, setSamples] = useState(INITIAL_ACADEMIC_SAMPLES);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [deletingSection, setDeletingSection] = useState<SampleSection | null>(
    null
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }

  function getSampleCount(sectionId: string): number {
    return samples.filter((s) => s.sectionId === sectionId).length;
  }

  const filteredSections = useMemo(() => {
    return sections
      .filter((sec) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          sec.heading.toLowerCase().includes(query) ||
          sec.shortSummary.toLowerCase().includes(query);

        const matchesStatus =
          statusFilter === "all" || sec.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [sections, searchQuery, statusFilter]);

  function handleConfirmDelete() {
    if (!deletingSection) return;

    const heading = deletingSection.heading;
    const secId = deletingSection.id;

    setSections((prev) => prev.filter((s) => s.id !== secId));
    setSamples((prev) => prev.filter((s) => s.sectionId !== secId));
    setDeletingSection(null);
    showToast(`Deleted section "${heading}".`);
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-text-primary tracking-tight">
              Sample Sections
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <BookOpen className="w-3 h-3 text-emerald-600" />
              <span>7 Disciplines</span>
            </span>
          </div>
          <p className="text-sm text-text-secondary mt-1">
            Manage academic discipline sections and their downloadable sample repositories.
          </p>
        </div>

        <Link
          href="/samples/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-orange hover:bg-orange-hover text-white text-sm font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Section</span>
        </Link>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div
          role="status"
          className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between gap-3 animate-in fade-in"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-xs text-emerald-700 hover:text-emerald-950 font-semibold px-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-surface border border-border rounded-xl p-4 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sections by heading or summary..."
            className="w-full bg-surface border border-border rounded-lg pl-9 pr-3.5 py-2 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
          />
        </div>

        {/* Status Filter & Count Badge */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
            <Filter className="w-3.5 h-3.5 text-text-muted" />
            <span>Status:</span>
          </div>

          <div className="inline-flex rounded-lg border border-border bg-canvas p-0.5">
            {[
              { id: "all", label: "All" },
              { id: "active", label: "Active" },
              { id: "draft", label: "Draft" },
              { id: "archived", label: "Archived" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  statusFilter === tab.id
                    ? "bg-surface text-text-primary font-semibold shadow-2xs"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-xs font-medium text-text-muted px-2.5 py-1 bg-canvas rounded-lg border border-border">
            {filteredSections.length}{" "}
            {filteredSections.length === 1 ? "Section" : "Sections"}
          </span>
        </div>
      </div>

      {/* Structured SaaS Data Table */}
      <div className="bg-surface border border-border rounded-xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-canvas border-b border-border text-[11px] font-bold text-text-secondary uppercase tracking-wider select-none">
                <th scope="col" className="px-5 py-3.5">
                  Discipline Section
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Short Summary
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Samples
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Status
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Updated
                </th>
                <th scope="col" className="px-5 py-3.5 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-xs sm:text-sm text-text-primary">
              {filteredSections.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-text-secondary"
                  >
                    <FolderOpen className="w-8 h-8 text-text-muted mx-auto mb-2 opacity-50" />
                    <p className="font-medium text-text-primary">
                      No sample sections found
                    </p>
                    <p className="text-xs text-text-muted mt-1">
                      Try clearing search filters or add a new discipline section.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredSections.map((sec) => {
                  const count = getSampleCount(sec.id);
                  return (
                    <tr
                      key={sec.id}
                      className="hover:bg-canvas/50 transition-colors group"
                    >
                      {/* Heading */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <div>
                            <Link
                              href={`/samples/${sec.id}/edit`}
                              className="font-bold text-text-primary hover:text-orange transition-colors block"
                            >
                              {sec.heading}
                            </Link>
                          </div>
                        </div>
                      </td>

                      {/* Summary */}
                      <td className="px-5 py-4">
                        <p className="text-xs text-text-secondary line-clamp-2 max-w-md leading-relaxed">
                          {sec.shortSummary}
                        </p>
                      </td>

                      {/* Samples Count Pill */}
                      <td className="px-5 py-4">
                        <Link
                          href={`/samples/${sec.id}/edit`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                          title="View and manage samples in this section"
                        >
                          <span>
                            {count} {count === 1 ? "Sample" : "Samples"}
                          </span>
                          <ArrowRight className="w-3 h-3 text-emerald-600" />
                        </Link>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <SampleStatusBadge status={sec.status} />
                      </td>

                      {/* Updated Date */}
                      <td className="px-5 py-4">
                        <span className="text-xs font-mono text-text-secondary">
                          {sec.updatedAt}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 opacity-90 group-hover:opacity-100">
                          <Link
                            href={`/samples/${sec.id}/edit`}
                            aria-label={`Edit ${sec.heading}`}
                            className="p-1.5 text-text-secondary hover:text-orange hover:bg-canvas rounded-md transition-colors"
                            title="Edit Section"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => setDeletingSection(sec)}
                            aria-label={`Delete ${sec.heading}`}
                            className="p-1.5 text-text-secondary hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                            title="Delete Section"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingSection)}
        title="Delete Discipline Section"
        itemName={deletingSection?.heading ?? ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingSection(null)}
      />
    </div>
  );
}

