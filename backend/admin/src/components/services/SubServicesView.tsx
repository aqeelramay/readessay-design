"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  FileText,
  CheckCircle2,
  X,
} from "lucide-react";
import {
  INITIAL_MAIN_SERVICES,
  INITIAL_SUB_SERVICES,
  type MainService,
  type SubService,
} from "@/data/mockServices";
import { ServiceStatusBadge } from "./ServiceStatusBadge";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

export function SubServicesView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read parent slug from URL if present (single source of truth)
  const parentSlugParam = searchParams.get("parent");

  // State
  const [mainServices] = useState<MainService[]>(INITIAL_MAIN_SERVICES);
  const [subServices, setSubServices] = useState<SubService[]>(INITIAL_SUB_SERVICES);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Modal state
  const [deletingSubService, setDeletingSubService] = useState<SubService | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }

  // Derive active parent directly from URL query param
  const activeParentService = useMemo(() => {
    if (!parentSlugParam) return null;
    return mainServices.find((s) => s.slug === parentSlugParam) ?? null;
  }, [parentSlugParam, mainServices]);

  const selectedParentId = activeParentService ? activeParentService.id : "all";

  // Handle parent switcher change
  function handleParentChange(parentId: string) {
    if (parentId === "all") {
      router.push("/services/sub-services");
    } else {
      const parent = mainServices.find((s) => s.id === parentId);
      if (parent) {
        router.push(`/services/sub-services?parent=${parent.slug}`);
      }
    }
  }

  // Filtered sub-services
  const filteredSubServices = useMemo(() => {
    return subServices
      .filter((sub) => {
        const matchesParent =
          selectedParentId === "all" || sub.parentId === selectedParentId;

        const matchesStatus =
          statusFilter === "all" || sub.status === statusFilter;

        const matchesSearch =
          sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sub.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sub.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesParent && matchesStatus && matchesSearch;
      })
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [subServices, selectedParentId, statusFilter, searchQuery]);

  // Helper to get parent name for a sub-service
  function getParentName(parentId: string): string {
    return mainServices.find((s) => s.id === parentId)?.name ?? "Parent Category";
  }

  // Handle Delete
  function handleConfirmDelete() {
    if (!deletingSubService) return;

    const name = deletingSubService.name;
    const id = deletingSubService.id;

    setSubServices((prev) => prev.filter((sub) => sub.id !== id));
    setDeletingSubService(null);
    showToast(`Deleted sub-service "${name}".`);
  }

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">
            Sub-Services
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Manage specialized academic writing sub-services and parent category assignments.
          </p>
        </div>

        <Link
          href={
            activeParentService
              ? `/services/sub-services/new?parent=${activeParentService.slug}`
              : "/services/sub-services/new"
          }
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-orange hover:bg-orange-hover text-white text-sm font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Sub-Service</span>
        </Link>
      </div>

      {/* Contextual Filter Banner when Parent is Active */}
      {activeParentService && (
        <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
            <span className="text-slate-700">
              Filtered by Main Service:{" "}
              <strong className="text-navy font-bold">
                {activeParentService.name}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            {/* Quick parent switcher */}
            <select
              aria-label="Switch active parent filter"
              value={selectedParentId}
              onChange={(e) => handleParentChange(e.target.value)}
              className="bg-surface border border-blue-200 text-text-primary text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange/30"
            >
              <option value="all">All Main Services</option>
              {mainServices.map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.name}
                </option>
              ))}
            </select>

            {/* Clear filter button */}
            <button
              type="button"
              onClick={() => handleParentChange("all")}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-semibold transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" />
              <span>Show All</span>
            </button>
          </div>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-surface border border-border rounded-xl p-4 shadow-2xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sub-services by name or slug..."
            className="w-full bg-surface border border-border rounded-lg pl-9 pr-3.5 py-2 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
          />
        </div>

        {/* Dropdowns & Tabs */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Main Service Dropdown Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-text-secondary whitespace-nowrap">Main Service:</span>
            <select
              value={selectedParentId}
              onChange={(e) => handleParentChange(e.target.value)}
              className="bg-surface border border-border rounded-lg px-2.5 py-1.5 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
            >
              <option value="all">All Main Services</option>
              {mainServices.map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter Tabs */}
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
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  statusFilter === tab.id
                    ? "bg-surface text-text-primary font-semibold shadow-2xs"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Count Badge */}
          <span className="text-xs font-medium text-text-muted px-2.5 py-1 bg-canvas rounded-lg border border-border shrink-0">
            {filteredSubServices.length} {filteredSubServices.length === 1 ? "Sub-Service" : "Sub-Services"}
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
                  Order
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Sub-Service Name &amp; Slug
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Parent Service
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Summary
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
              {filteredSubServices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-text-secondary">
                    <p className="font-medium text-text-primary">No sub-services found</p>
                    <p className="text-xs text-text-muted mt-1">
                      Try selecting another parent service category or clear search terms.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredSubServices.map((sub) => {
                  const parentName = getParentName(sub.parentId);

                  return (
                    <tr
                      key={sub.id}
                      className="hover:bg-canvas/60 transition-colors group"
                    >
                      {/* Display Order */}
                      <td className="px-5 py-4 text-xs font-mono text-text-muted">
                        #{sub.displayOrder}
                      </td>

                      {/* Name & Slug */}
                      <td className="px-5 py-4">
                        <div className="font-semibold text-text-primary group-hover:text-orange transition-colors">
                          {sub.name}
                        </div>
                        <div className="text-xs font-mono text-text-muted mt-0.5">
                          /services/{sub.slug}
                        </div>
                      </td>

                      {/* Parent Service Pill */}
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => handleParentChange(sub.parentId)}
                          title={`Filter by ${parentName}`}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors text-left"
                        >
                          <span className="truncate max-w-[150px]">{parentName}</span>
                        </button>
                      </td>

                      {/* Summary */}
                      <td className="px-5 py-4 max-w-xs">
                        <p className="text-xs text-text-secondary truncate" title={sub.shortDescription}>
                          {sub.shortDescription}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <ServiceStatusBadge status={sub.status} />
                      </td>

                      {/* Updated Date */}
                      <td className="px-5 py-4 text-xs text-text-secondary whitespace-nowrap">
                        {sub.updatedAt}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="inline-flex items-center justify-end gap-1.5">
                          {/* View details action */}
                          <Link
                            href={`/services/sub-services/${sub.slug}`}
                            aria-label={`View details for ${sub.name}`}
                            title="View Sub-Service Details"
                            className="p-1.5 rounded-lg text-text-secondary hover:text-orange hover:bg-orange/10 transition-colors"
                          >
                            <FileText className="w-4 h-4" />
                          </Link>

                          {/* Edit button */}
                          <Link
                            href={`/services/sub-services/${sub.slug}/edit`}
                            aria-label={`Edit ${sub.name}`}
                            title="Edit Sub-Service"
                            className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-canvas transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>

                          {/* Delete button */}
                          <button
                            type="button"
                            aria-label={`Delete ${sub.name}`}
                            title="Delete Sub-Service"
                            onClick={() => setDeletingSubService(sub)}
                            className="p-1.5 rounded-lg text-text-secondary hover:text-rose-600 hover:bg-rose-50 transition-colors"
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
        isOpen={Boolean(deletingSubService)}
        title="Delete Sub-Service"
        itemName={deletingSubService?.name ?? ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingSubService(null)}
      />

      {/* Toast Feedback */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 max-w-sm flex items-center gap-3 p-3.5 rounded-xl bg-navy-dark border border-white/15 shadow-2xl text-white text-xs z-50 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="flex-1 text-slate-200">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white text-xs font-semibold px-1"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
