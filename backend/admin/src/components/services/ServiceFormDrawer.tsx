"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { MainService, ServiceStatus } from "@/data/mockServices";

interface ServiceFormDrawerProps {
  isOpen: boolean;
  service?: MainService | null;
  onClose: () => void;
  onSave: (serviceData: Omit<MainService, "id" | "updatedAt"> & { id?: string }) => void;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ServiceFormDrawer({
  isOpen,
  service,
  onClose,
  onSave,
}: ServiceFormDrawerProps) {
  const isEditing = Boolean(service);

  // Initialize directly from props (reset on key change in parent)
  const [name, setName] = useState(service?.name ?? "");
  const [slug, setSlug] = useState(service?.slug ?? "");
  const [shortDescription, setShortDescription] = useState(
    service?.shortDescription ?? ""
  );
  const [status, setStatus] = useState<ServiceStatus>(
    service?.status ?? "active"
  );
  const [displayOrder, setDisplayOrder] = useState<number>(
    service?.displayOrder ?? 1
  );
  const [error, setError] = useState<string | null>(null);

  // Handle name change and auto-generate slug in create mode
  function handleNameChange(value: string) {
    setName(value);
    if (!isEditing) {
      setSlug(slugify(value));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter a service name.");
      return;
    }

    const cleanSlug = slugify(slug);
    if (!cleanSlug) {
      setError("Please provide a valid slug.");
      return;
    }

    onSave({
      id: service?.id,
      name: name.trim(),
      slug: cleanSlug,
      shortDescription: shortDescription.trim(),
      status,
      displayOrder: Number(displayOrder) || 1,
    });
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Slide-over panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isEditing ? "Edit Service" : "Add Service"}
        className="relative w-full max-w-lg bg-surface border-l border-border h-full shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-250"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-text-primary tracking-tight">
              {isEditing ? "Edit Service Category" : "Add New Service Category"}
            </h2>
            <p className="text-xs text-text-secondary mt-0.5">
              {isEditing
                ? "Update top-level service category metadata and content description."
                : "Create a new parent academic service category."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-canvas transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {error && (
            <div
              role="alert"
              className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs"
            >
              {error}
            </div>
          )}

          {/* Service Name */}
          <div>
            <label
              htmlFor="service-name"
              className="block text-xs font-semibold text-text-primary mb-1.5"
            >
              Service Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="service-name"
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Assignment Help"
              className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
            />
          </div>

          {/* Slug */}
          <div>
            <label
              htmlFor="service-slug"
              className="block text-xs font-semibold text-text-primary mb-1.5"
            >
              URL Slug <span className="text-rose-500">*</span>
            </label>
            <div className="flex items-center rounded-lg border border-border bg-canvas overflow-hidden focus-within:ring-2 focus-within:ring-orange/30 focus-within:border-orange transition-all">
              <span className="px-3 text-xs text-text-muted select-none">
                /services/
              </span>
              <input
                id="service-slug"
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="assignment-help"
                className="w-full bg-surface px-3 py-2.5 text-sm text-text-primary focus:outline-none"
              />
            </div>
            <p className="text-[11px] text-text-muted mt-1">
              Unique URL identifier for this parent service.
            </p>
          </div>

          {/* Short Description */}
          <div>
            <label
              htmlFor="service-desc"
              className="block text-xs font-semibold text-text-primary mb-1.5"
            >
              Summary / Short Description
            </label>
            <textarea
              id="service-desc"
              rows={4}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Concise overview of academic assistance provided under this service category..."
              className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
            />
          </div>

          {/* Grid: Display Order & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="service-order"
                className="block text-xs font-semibold text-text-primary mb-1.5"
              >
                Display Order
              </label>
              <input
                id="service-order"
                type="number"
                min={1}
                max={99}
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value, 10) || 1)}
                className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="service-status"
                className="block text-xs font-semibold text-text-primary mb-1.5"
              >
                Publish Status
              </label>
              <select
                id="service-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as ServiceStatus)}
                className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
              >
                <option value="active">Active (Published)</option>
                <option value="draft">Draft (Hidden)</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-6 border-t border-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-canvas transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-orange hover:bg-orange-hover text-white text-xs font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40"
            >
              {isEditing ? "Save Changes" : "Create Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
