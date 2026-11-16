"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  FolderOpen,
  Pencil,
  Trash2,
  CheckCircle2,
  ArrowRight,
  Filter,
  AlertCircle,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import {
  getServices,
  updateService,
  deleteService,
  type ServiceItem,
} from "@/lib/api";
import { ServiceStatusBadge } from "./ServiceStatusBadge";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { ServiceIcon } from "./serviceIcons";

export function ServicesView() {
  // Live Data State
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Search and Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Action / Modal state
  const [deletingService, setDeletingService] = useState<ServiceItem | null>(null);
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);

  // Feedback notifications
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

  // Fetch Services from NestJS API
  const loadServices = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const res = await getServices({
        search: searchQuery.trim() || undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
        limit: 100,
      });

      setServices(res.data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load services";
      setLoadError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, statusFilter]);

  // Debounced load on search / filter changes
  useEffect(() => {
    const timer = setTimeout(() => {
      loadServices();
    }, 250);
    return () => clearTimeout(timer);
  }, [loadServices]);

  // Quick Status Toggle Handler
  async function handleStatusChange(service: ServiceItem, newStatus: string) {
    setUpdatingStatusId(service.id);
    try {
      await updateService(service.id, { status: newStatus });
      setServices((prev) =>
        prev.map((s) =>
          s.id === service.id ? { ...s, status: newStatus as ServiceItem["status"] } : s
        )
      );
      showToast(`Status updated to "${newStatus}" for "${service.title || service.name}".`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update status";
      showError(msg);
    } finally {
      setUpdatingStatusId(null);
    }
  }

  // Handle Delete with backend error catching
  async function handleConfirmDelete() {
    if (!deletingService) return;
    const target = deletingService;

    try {
      await deleteService(target.id);
      setDeletingService(null);
      showToast(`Deleted service "${target.title || target.name}".`);
      await loadServices();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete service";
      showError(msg);
      setDeletingService(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">
            Services Catalog
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Manage top-level academic categories synced with the PostgreSQL API.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => loadServices()}
            title="Refresh Services"
            className="p-2.5 rounded-lg border border-border bg-surface text-text-secondary hover:text-text-primary hover:bg-canvas transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-orange" : ""}`} />
          </button>
          <Link
            href="/services/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-orange hover:bg-orange-hover text-white text-sm font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Service</span>
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
            onClick={() => loadServices()}
            className="underline font-semibold hover:text-rose-950 shrink-0"
          >
            Retry
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
            placeholder="Search services by title, slug, or summary..."
            className="w-full bg-surface border border-border rounded-lg pl-9 pr-3.5 py-2 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
          />
        </div>

        {/* Status Filter Tabs & Count */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-text-secondary pl-2">
            <Filter className="w-3.5 h-3.5 text-text-muted" />
            <span>Status:</span>
          </div>
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
            {services.length} {services.length === 1 ? "Service" : "Services"}
          </span>
        </div>
      </div>

      {/* Structured Services Table */}
      <div className="bg-surface border border-border rounded-xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-canvas border-b border-border text-[11px] font-bold text-text-secondary uppercase tracking-wider select-none">
                <th scope="col" className="px-5 py-3.5">
                  Order
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Service Title &amp; Public URL
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Sub-Services
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
                  <td colSpan={6} className="px-6 py-12 text-center text-text-secondary">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="w-5 h-5 text-orange animate-spin" />
                      <p className="text-xs text-text-muted">Loading services from API...</p>
                    </div>
                  </td>
                </tr>
              ) : services.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-text-secondary">
                    <p className="font-medium text-text-primary">No services found</p>
                    <p className="text-xs text-text-muted mt-1">
                      Try clearing search filters or click &ldquo;+ Add Service&rdquo; to create one.
                    </p>
                  </td>
                </tr>
              ) : (
                services.map((service) => {
                  const subCount = service._count?.subServices ?? service._count?.children ?? 0;
                  const displayPath = `/${service.slug}`;
                  const displayUrl = `https://readessay.com${displayPath}`;

                  return (
                    <tr
                      key={service.id}
                      className="hover:bg-canvas/60 transition-colors group"
                    >
                      {/* Order */}
                      <td className="px-5 py-4 text-xs font-mono text-text-muted">
                        #{service.sortOrder ?? service.displayOrder ?? 0}
                      </td>

                      {/* Title & Live URL */}
                      <td className="px-5 py-4 max-w-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-orange/10 border border-orange/20 text-orange flex items-center justify-center shrink-0">
                            <ServiceIcon iconKey={service.icon || undefined} className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-text-primary group-hover:text-orange transition-colors truncate">
                              {service.title || service.name}
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
                          </div>
                        </div>
                      </td>

                      {/* Sub-Services Count Badge */}
                      <td className="px-5 py-4">
                        <Link
                          href={`/services/sub-services?parent=${service.slug}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
                        >
                          <span>{subCount} Sub-Services</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>

                      {/* Status & Quick Toggle */}
                      <td className="px-5 py-4">
                        <div className="inline-flex items-center gap-2">
                          <ServiceStatusBadge status={service.status} />
                          <select
                            value={service.status}
                            disabled={updatingStatusId === service.id}
                            onChange={(e) => handleStatusChange(service, e.target.value)}
                            title="Quick Change Status"
                            aria-label={`Change status for ${service.title || service.name}`}
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
                        {service.updatedAt ? new Date(service.updatedAt).toLocaleDateString() : "—"}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="inline-flex items-center justify-end gap-1.5">
                          {/* Drilldown to sub-services */}
                          <Link
                            href={`/services/sub-services?parent=${service.slug}`}
                            aria-label={`View sub-services for ${service.title}`}
                            title="View Sub-Services"
                            className="p-1.5 rounded-lg text-text-secondary hover:text-orange hover:bg-orange/10 transition-colors"
                          >
                            <FolderOpen className="w-4 h-4" />
                          </Link>

                          {/* Edit Link */}
                          <Link
                            href={`/services/${service.id}/edit`}
                            aria-label={`Edit ${service.title}`}
                            title="Edit Service"
                            className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-canvas transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>

                          {/* Delete Button */}
                          <button
                            type="button"
                            aria-label={`Delete ${service.title}`}
                            title="Delete Service"
                            onClick={() => setDeletingService(service)}
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
        isOpen={Boolean(deletingService)}
        title="Delete Service"
        itemName={deletingService?.title ?? deletingService?.name ?? ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingService(null)}
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
