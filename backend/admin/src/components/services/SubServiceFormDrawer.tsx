"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { MainService, SubService, ServiceStatus } from "@/data/mockServices";

interface SubServiceFormDrawerProps {
  isOpen: boolean;
  subService?: SubService | null;
  mainServices: MainService[];
  defaultParentId?: string;
  onClose: () => void;
  onSave: (subServiceData: Omit<SubService, "id" | "updatedAt"> & { id?: string }) => void;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function SubServiceFormDrawer({
  isOpen,
  subService,
  mainServices,
  defaultParentId,
  onClose,
  onSave,
}: SubServiceFormDrawerProps) {
  const isEditing = Boolean(subService);

  // Initialize directly from props (reset on key change in parent)
  const [parentId, setParentId] = useState(
    subService?.parentId || defaultParentId || (mainServices[0]?.id ?? "")
  );
  const [name, setName] = useState(subService?.name ?? "");
  const [slug, setSlug] = useState(subService?.slug ?? "");
  const [shortDescription, setShortDescription] = useState(
    subService?.shortDescription ?? ""
  );
  const [status, setStatus] = useState<ServiceStatus>(
    subService?.status ?? "active"
  );
  const [displayOrder, setDisplayOrder] = useState<number>(
    subService?.displayOrder ?? 1
  );
  const [error, setError] = useState<string | null>(null);

  function handleNameChange(value: string) {
    setName(value);
    if (!isEditing) {
      setSlug(slugify(value));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!parentId) {
      setError("Please select a parent main service category.");
      return;
    }

    if (!name.trim()) {
      setError("Please enter a sub-service name.");
      return;
    }

    const cleanSlug = slugify(slug);
    if (!cleanSlug) {
      setError("Please provide a valid slug.");
      return;
    }

    onSave({
      id: subService?.id,
      parentId,
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
        aria-label={isEditing ? "Edit Sub-Service" : "Add Sub-Service"}
        className="relative w-full max-w-lg bg-surface border-l border-border h-full shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-250"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-text-primary tracking-tight">
              {isEditing ? "Edit Sub-Service" : "Add New Sub-Service"}
            </h2>
            <p className="text-xs text-text-secondary mt-0.5">
              {isEditing
                ? "Update sub-service metadata and academic discipline assignment."
                : "Create a specialized academic sub-service under a main category."}
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

          {/* Parent Service Selector */}
          <div>
            <label
              htmlFor="subservice-parent"
              className="block text-xs font-semibold text-text-primary mb-1.5"
            >
              Parent Main Service <span className="text-rose-500">*</span>
            </label>
            <select
              id="subservice-parent"
              required
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
            >
              <option value="" disabled>
                Select a Parent Service
              </option>
              {mainServices.map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sub-Service Name */}
          <div>
            <label
              htmlFor="subservice-name"
              className="block text-xs font-semibold text-text-primary mb-1.5"
            >
              Sub-Service Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="subservice-name"
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Accounting Assignment Help"
              className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
            />
          </div>

          {/* Slug */}
          <div>
            <label
              htmlFor="subservice-slug"
              className="block text-xs font-semibold text-text-primary mb-1.5"
            >
              URL Slug <span className="text-rose-500">*</span>
            </label>
            <div className="flex items-center rounded-lg border border-border bg-canvas overflow-hidden focus-within:ring-2 focus-within:ring-orange/30 focus-within:border-orange transition-all">
              <span className="px-3 text-xs text-text-muted select-none">
                /services/
              </span>
              <input
                id="subservice-slug"
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="accounting-assignment-help"
                className="w-full bg-surface px-3 py-2.5 text-sm text-text-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label
              htmlFor="subservice-desc"
              className="block text-xs font-semibold text-text-primary mb-1.5"
            >
              Summary / Short Description
            </label>
            <textarea
              id="subservice-desc"
              rows={4}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Detailed description of topics, syllabus coverage, and academic assistance..."
              className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
            />
          </div>

          {/* Grid: Display Order & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="subservice-order"
                className="block text-xs font-semibold text-text-primary mb-1.5"
              >
                Display Order
              </label>
              <input
                id="subservice-order"
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
                htmlFor="subservice-status"
                className="block text-xs font-semibold text-text-primary mb-1.5"
              >
                Publish Status
              </label>
              <select
                id="subservice-status"
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
              {isEditing ? "Save Changes" : "Create Sub-Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
