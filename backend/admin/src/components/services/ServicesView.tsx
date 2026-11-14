"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  FolderOpen,
  Pencil,
  Trash2,
  CheckCircle2,
  ArrowRight,
  Filter,
} from "lucide-react";
import {
  INITIAL_MAIN_SERVICES,
  INITIAL_SUB_SERVICES,
  type MainService,
} from "@/data/mockServices";
import { ServiceStatusBadge } from "./ServiceStatusBadge";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { ServiceIcon } from "./serviceIcons";

export function ServicesView() {
  const router = useRouter();

  // Services state initialized with mock data
  const [services, setServices] = useState<MainService[]>(INITIAL_MAIN_SERVICES);
  const [subServices, setSubServices] = useState(INITIAL_SUB_SERVICES);

  // Search and Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Modal state
  const [deletingService, setDeletingService] = useState<MainService | null>(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }

  // Count sub-services for a main service
  function getSubServiceCount(serviceId: string): number {
    return subServices.filter((sub) => sub.parentId === serviceId).length;
  }

  // Filtered Services list
  const filteredServices = useMemo(() => {
    return services
      .filter((service) => {
        const matchesSearch =
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.shortIntro.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
          statusFilter === "all" || service.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [services, searchQuery, statusFilter]);

  // Handle Delete
  function handleConfirmDelete() {
    if (!deletingService) return;

    const serviceName = deletingService.name;
    const serviceId = deletingService.id;

    setServices((prev) => prev.filter((s) => s.id !== serviceId));
    // Also remove associated sub-services in local state
    setSubServices((prev) => prev.filter((sub) => sub.parentId !== serviceId));

    setDeletingService(null);
    showToast(`Deleted service category "${serviceName}".`);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">
            Services
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Manage top-level academic service categories and their sub-service hierarchies.
          </p>
        </div>

        <Link
          href="/services/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-orange hover:bg-orange-hover text-white text-sm font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Service</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-surface border border-border rounded-xl p-4 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services by name or slug..."
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
            {filteredServices.length} {filteredServices.length === 1 ? "Service" : "Services"}
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
                  Service Name &amp; Slug
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Summary
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
              {filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-text-secondary">
                    <p className="font-medium text-text-primary">No services found</p>
                    <p className="text-xs text-text-muted mt-1">
                      Try clearing search filters or add a new service category.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredServices.map((service) => {
                  const subCount = getSubServiceCount(service.id);
                  return (
                    <tr
                      key={service.id}
                      className="hover:bg-canvas/60 transition-colors group cursor-pointer"
                      onClick={() =>
                        router.push(`/services/sub-services?parent=${service.slug}`)
                      }
                    >
                      {/* Display Order */}
                      <td className="px-5 py-4 text-xs font-mono text-text-muted">
                        #{service.displayOrder}
                      </td>

                      {/* Name & Slug */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-orange/10 border border-orange/20 text-orange flex items-center justify-center shrink-0">
                            <ServiceIcon iconKey={service.icon} className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-text-primary group-hover:text-orange transition-colors">
                              {service.name}
                            </div>
                            <div className="text-xs font-mono text-text-muted mt-0.5">
                              /services/{service.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Summary */}
                      <td className="px-5 py-4 max-w-xs">
                        <p className="text-xs text-text-secondary truncate" title={service.shortIntro}>
                          {service.shortIntro}
                        </p>
                      </td>

                      {/* Sub-Services Count Badge */}
                      <td
                        className="px-5 py-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/services/sub-services?parent=${service.slug}`);
                        }}
                      >
                        <Link
                          href={`/services/sub-services?parent=${service.slug}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
                        >
                          <span>{subCount} Sub-Services</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <ServiceStatusBadge status={service.status} />
                      </td>

                      {/* Updated Date */}
                      <td className="px-5 py-4 text-xs text-text-secondary whitespace-nowrap">
                        {service.updatedAt}
                      </td>

                      {/* Actions */}
                      <td
                        className="px-5 py-4 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="inline-flex items-center justify-end gap-1.5">
                          {/* View Sub-Services Drilldown */}
                          <Link
                            href={`/services/sub-services?parent=${service.slug}`}
                            aria-label={`View sub-services for ${service.name}`}
                            title="View Sub-Services"
                            className="p-1.5 rounded-lg text-text-secondary hover:text-orange hover:bg-orange/10 transition-colors"
                          >
                            <FolderOpen className="w-4 h-4" />
                          </Link>

                          {/* Edit Service */}
                          <Link
                            href={`/services/${service.slug}/edit`}
                            aria-label={`Edit ${service.name}`}
                            title="Edit Service"
                            className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-canvas transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>

                          {/* Delete Service */}
                          <button
                            type="button"
                            aria-label={`Delete ${service.name}`}
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
        title="Delete Service Category"
        itemName={deletingService?.name ?? ""}
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
    </div>
  );
}
