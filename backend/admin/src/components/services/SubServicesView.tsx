"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  FileText,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  X,
  ExternalLink,
} from "lucide-react";
import {
  getSubServices,
  getParentServices,
  deleteSubService,
  updateSubService,
  type SubServiceItem,
  type ParentServiceOption,
} from "@/lib/api";
import { ServiceStatusBadge } from "./ServiceStatusBadge";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

export function SubServicesView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read parent slug from URL if present (single source of truth)
  const parentSlugParam = searchParams.get("parent");

  // State
  const [mainServices, setMainServices] = useState<ParentServiceOption[]>([]);
  const [subServices, setSubServices] = useState<SubServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);

  // Modal state
  const [deletingSubService, setDeletingSubService] = useState<SubServiceItem | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  }

  function showError(msg: string) {
    setErrorMessage(msg);
    setTimeout(() => {
      setErrorMessage(null);
    }, 6000);
  }

  // Fetch Parent services for dropdown
  useEffect(() => {
    getParentServices()
      .then((data) => setMainServices(data))
      .catch((err) => console.error("Failed to load parents:", err));
  }, []);

  // Derive active parent directly from URL query param
  const activeParentService = useMemo(() => {
    if (!parentSlugParam) return null;
    return mainServices.find((s) => s.slug === parentSlugParam) ?? null;
  }, [parentSlugParam, mainServices]);

  const selectedParentId = activeParentService ? activeParentService.id : "all";

  // Load sub-services from API
  const loadSubServices = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const res = await getSubServices({
        serviceId: selectedParentId !== "all" ? selectedParentId : undefined,
        search: searchQuery.trim() || undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
        limit: 100,
      });

      setSubServices(res.data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load sub-services";
      setLoadError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [selectedParentId, searchQuery, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadSubServices();
    }, 250);
    return () => clearTimeout(timer);
  }, [loadSubServices]);

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

  // Quick Status Toggle Handler
  async function handleStatusChange(sub: SubServiceItem, newStatus: string) {
    setUpdatingStatusId(sub.id);
    try {
      await updateSubService(sub.id, { status: newStatus });
      setSubServices((prev) =>
        prev.map((s) =>
          s.id === sub.id ? { ...s, status: newStatus as SubServiceItem["status"] } : s
        )
      );
      showToast(`Status updated to "${newStatus}" for "${sub.title || sub.name}".`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update status";
      showError(msg);
    } finally {
      setUpdatingStatusId(null);
    }
  }

  // Delete Handler
  async function handleConfirmDelete() {
    if (!deletingSubService) return;
    const target = deletingSubService;

    try {
      await deleteSubService(target.id);
      setDeletingSubService(null);
      showToast(`Deleted sub-service "${target.title || target.name}".`);
      await loadSubServices();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete sub-service";
      showError(msg);
      setDeletingSubService(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">
            Sub-Services Catalog
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Manage granular academic sub-services nested under parent categories.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => loadSubServices()}
            title="Refresh Sub-Services"
            className="p-2.5 rounded-lg border border-border bg-surface text-text-secondary hover:text-text-primary hover:bg-canvas transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-orange" : ""}`} />
          </button>
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
      </div>

      {/* Global Error Banner */}
      {loadError && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start justify-between gap-3 animate-in fade-in"
        >
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{loadError}</span>
          </div>
          <button
            type="button"
            onClick={() => loadSubServices()}
            className="underline font-semibold hover:text-rose-950 shrink-0"
          >
            Retry
          </button>
        </div>
      )}

      {/* Active Parent Filter Banner */}
      {activeParentService && (
        <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
            <span className="text-slate-700">
              Filtered by Parent Service:{" "}
              <strong className="text-navy font-semibold">
                {activeParentService.title || activeParentService.name}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            <select
              aria-label="Switch active parent filter"
              value={selectedParentId}
              onChange={(e) => handleParentChange(e.target.value)}
              className="bg-surface border border-blue-200 text-text-primary text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange/30"
            >
              <option value="all">All Parent Services</option>
              {mainServices.map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.title || parent.name}
                </option>
              ))}
            </select>

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
            <span className="text-text-secondary whitespace-nowrap">Parent Service:</span>
            <select
              aria-label="Filter by Parent Service"
              value={selectedParentId}
              onChange={(e) => handleParentChange(e.target.value)}
              className="bg-surface border border-border rounded-lg px-2.5 py-1.5 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
            >
              <option value="all">All Parent Services</option>
              {mainServices.map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.title || parent.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter Tabs */}
          <div className="inline-flex rounded-lg border border-border bg-canvas p-0.5">
            {[
              { id: "all", label: "All" },
              { id: "PUBLISHED", label: "Published" },
              { id: "DRAFT", label: "Draft" },
              { id: "ARCHIVED", label: "Archived" },
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
            {subServices.length} {subServices.length === 1 ? "Sub-Service" : "Sub-Services"}
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
                  Sub-Service Title &amp; Public URL
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
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-text-secondary">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="w-5 h-5 text-orange animate-spin" />
                      <p className="text-xs text-text-muted">Loading sub-services...</p>
                    </div>
                  </td>
                </tr>
              ) : subServices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-text-secondary">
                    <p className="font-medium text-text-primary">No sub-services found</p>
                    <p className="text-xs text-text-muted mt-1">
                      Try selecting another parent service category or clear search terms.
                    </p>
                  </td>
                </tr>
              ) : (
                subServices.map((sub) => {
                  const parentName = sub.service?.title || sub.parent?.title || "Parent Service";
                  const parentSlug = sub.service?.slug || sub.parent?.slug || "";
                  const displayPath = sub.fullPath || `/${parentSlug}/${sub.slug}`;
                  const displayUrl = sub.fullUrl || `https://readessay.com${displayPath}`;

                  return (
                    <tr
                      key={sub.id}
                      className="hover:bg-canvas/60 transition-colors group"
                    >
                      {/* Display Order */}
                      <td className="px-5 py-4 text-xs font-mono text-text-muted">
                        #{sub.sortOrder ?? sub.displayOrder ?? 0}
                      </td>

                      {/* Name & URL */}
                      <td className="px-5 py-4 max-w-sm">
                        <div className="font-semibold text-text-primary group-hover:text-orange transition-colors">
                          {sub.title || sub.name}
                        </div>
                        <div className="text-xs font-mono text-text-muted mt-0.5 flex items-center gap-1.5 truncate">
                          <span className="text-orange/80">{displayPath}</span>
                          <a
                            href={displayUrl}
                            target="_blank"
                            rel="noreferrer"
                            title="Open Live Customer-Facing URL"
                            className="text-text-muted hover:text-text-primary"
                          >
                            <ExternalLink className="w-3 h-3 inline" />
                          </a>
                        </div>
                      </td>

                      {/* Parent Service Pill */}
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => (sub.serviceId || sub.parentId) && handleParentChange(sub.serviceId || sub.parentId)}
                          title={`Filter by ${parentName}`}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors text-left"
                        >
                          <span className="truncate max-w-[150px]">{parentName}</span>
                        </button>
                      </td>

                      {/* Summary */}
                      <td className="px-5 py-4 max-w-xs">
                        <p className="text-xs text-text-secondary truncate" title={sub.shortDescription ?? sub.shortIntro ?? ""}>
                          {sub.shortDescription ?? sub.shortIntro ?? "—"}
                        </p>
                      </td>

                      {/* Status & Quick Toggle */}
                      <td className="px-5 py-4">
                        <div className="inline-flex items-center gap-2">
                          <ServiceStatusBadge status={sub.status} />
                          <select
                            value={sub.status}
                            disabled={updatingStatusId === sub.id}
                            onChange={(e) => handleStatusChange(sub, e.target.value)}
                            title="Quick Change Status"
                            aria-label={`Change status for ${sub.title || sub.name}`}
                            className="bg-transparent border border-border text-[11px] text-text-secondary rounded px-1 py-0.5 hover:border-orange focus:outline-none focus:ring-1 focus:ring-orange cursor-pointer"
                          >
                            <option value="PUBLISHED">Published</option>
                            <option value="DRAFT">Draft</option>
                            <option value="ARCHIVED">Archived</option>
                          </select>
                        </div>
                      </td>

                      {/* Updated Date */}
                      <td className="px-5 py-4 text-xs text-text-secondary whitespace-nowrap">
                        {sub.updatedAt ? new Date(sub.updatedAt).toLocaleDateString() : "—"}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="inline-flex items-center justify-end gap-1.5">
                          {/* View details action */}
                          <Link
                            href={`/services/sub-services/${sub.slug}`}
                            aria-label={`View details for ${sub.title || sub.name}`}
                            title="View Sub-Service Details"
                            className="p-1.5 rounded-lg text-text-secondary hover:text-orange hover:bg-orange/10 transition-colors"
                          >
                            <FileText className="w-4 h-4" />
                          </Link>

                          {/* Edit button */}
                          <Link
                            href={`/services/sub-services/${sub.id}/edit`}
                            aria-label={`Edit ${sub.title || sub.name}`}
                            title="Edit Sub-Service"
                            className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-canvas transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>

                          {/* Delete button */}
                          <button
                            type="button"
                            aria-label={`Delete ${sub.title || sub.name}`}
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
        itemName={deletingSubService?.title ?? deletingSubService?.name ?? ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingSubService(null)}
      />

      {/* Toast Notification Notice */}
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

      {/* Error Toast Notification Notice */}
      {errorMessage && (
        <div
          role="alert"
          aria-live="assertive"
          className="fixed bottom-6 right-6 max-w-md flex items-center gap-3 p-3.5 rounded-xl bg-rose-900 border border-rose-700 shadow-2xl text-white text-xs z-50 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <AlertCircle className="w-4 h-4 text-rose-300 shrink-0" />
          <span className="flex-1 text-rose-100">{errorMessage}</span>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-rose-300 hover:text-white text-xs font-semibold px-1"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
