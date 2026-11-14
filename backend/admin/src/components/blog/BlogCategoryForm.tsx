"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Plus,
  Pencil,
  FileText,
  Globe,
  CheckCircle2,
  AlertCircle,
  FolderOpen,
} from "lucide-react";
import {
  type BlogCategory,
  type BlogStatus,
  type BlogPost,
  getPostsForCategory,
} from "@/data/mockBlog";
import { BlogStatusBadge } from "./BlogStatusBadge";

interface BlogCategoryFormProps {
  category?: BlogCategory;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function BlogCategoryForm({ category }: BlogCategoryFormProps) {
  const isEditing = Boolean(category);

  // Form Fields
  const [name, setName] = useState(category?.name ?? "");
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [isSlugCustomized, setIsSlugCustomized] = useState(isEditing);
  const [badgeLabel, setBadgeLabel] = useState(category?.badgeLabel ?? "Category");
  const [shortDescription, setShortDescription] = useState(
    category?.shortDescription ?? ""
  );

  const [status, setStatus] = useState<BlogStatus>(
    category?.status ?? "published"
  );
  const [displayOrder, setDisplayOrder] = useState<number>(
    category?.displayOrder ?? 1
  );

  const [metaTitle, setMetaTitle] = useState(category?.seo?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(
    category?.seo?.metaDescription ?? ""
  );

  // Associated posts if in edit mode
  const [categoryPosts] = useState<BlogPost[]>(() => {
    if (category?.id) {
      return getPostsForCategory(category.id);
    }
    return [];
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleNameChange(val: string) {
    setName(val);
    if (!isSlugCustomized) {
      setSlug(slugify(val));
    }
    if (!metaTitle || metaTitle === `${name} | ReadEssay Blog`) {
      setMetaTitle(`${val} | ReadEssay Blog`);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please provide a category name.");
      return;
    }
    if (!slug.trim()) {
      setError("Please specify a URL slug for this category.");
      return;
    }
    if (!shortDescription.trim()) {
      setError("Please enter a short description for this category.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmation(
        isEditing
          ? `Category "${name}" updated successfully. Changes staged in local UI session.`
          : `Category "${name}" created successfully. Changes staged in local UI session.`
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
            href="/blog/categories"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-orange transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to Categories</span>
          </Link>
          <h1 className="text-2xl sm:text-[26px] font-bold text-text-primary tracking-tight">
            {isEditing ? `Edit Category: ${category?.name}` : "Add Blog Category"}
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            {isEditing
              ? "Update category description, public URL slug, and search engine metadata."
              : "Create a new editorial category to organize academic articles and guides."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/blog/categories"
            className="px-4 py-2 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-canvas transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            form="blog-category-form"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-orange hover:bg-orange-hover text-white text-xs font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40 disabled:opacity-75"
          >
            <Save className="w-4 h-4" />
            <span>
              {isSubmitting
                ? "Saving..."
                : isEditing
                ? "Save Changes"
                : "Create Category"}
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
        id="blog-category-form"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        {/* Left Column (8 cols): Core category info & assigned articles */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Category Details */}
          <div className="bg-surface rounded-xl border border-border p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-border">
              <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center text-orange">
                <FolderOpen className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-text-primary">
                  Category Information
                </h2>
                <p className="text-xs text-text-secondary">
                  Heading, URL identifier, and editorial summary.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1.5">
                  Category Name <span className="text-orange">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Dissertation & Thesis"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary placeholder:text-text-muted"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1.5">
                    URL Slug <span className="text-orange">*</span>
                  </label>
                  <div className="flex items-center rounded-lg border border-border bg-canvas overflow-hidden focus-within:border-navy transition-colors">
                    <span className="pl-3 pr-1 text-[11px] text-text-secondary select-none font-mono">
                      /blog/category/
                    </span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => {
                        setSlug(e.target.value);
                        setIsSlugCustomized(true);
                      }}
                      placeholder="dissertation-thesis"
                      className="w-full px-2 py-2 text-xs bg-transparent focus:outline-none text-text-primary font-mono placeholder:text-text-muted"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1.5">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    value={badgeLabel}
                    onChange={(e) => setBadgeLabel(e.target.value)}
                    placeholder="e.g. Category, Guide, Topic"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary placeholder:text-text-muted"
                  />
                  <p className="text-[11px] text-text-secondary mt-1">
                    Pill tag shown above the category heading on public pages.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1.5">
                  Short Description <span className="text-orange">*</span>
                </label>
                <textarea
                  rows={4}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Describe the themes, research areas, and topics categorized within this editorial section..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary placeholder:text-text-muted resize-y"
                  required
                />
                <p className="text-[11px] text-text-secondary mt-1">
                  Featured as the lead introductory paragraph on category index pages.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Associated Articles (Edit mode only) */}
          {isEditing && (
            <div className="bg-surface rounded-xl border border-border p-6 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center text-orange">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-text-primary">
                      Articles in this Category
                    </h2>
                    <p className="text-xs text-text-secondary">
                      {categoryPosts.length} published or drafted articles assigned.
                    </p>
                  </div>
                </div>

                <Link
                  href={`/blog/new?category=${slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange hover:bg-orange-hover text-white text-xs font-semibold transition-colors shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Article</span>
                </Link>
              </div>

              {categoryPosts.length === 0 ? (
                <div className="text-center py-8 px-4 rounded-lg border border-dashed border-border bg-canvas">
                  <p className="text-xs font-medium text-text-secondary mb-3">
                    No articles currently assigned to this category.
                  </p>
                  <Link
                    href={`/blog/new?category=${slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-navy hover:bg-navy-hover text-white text-xs font-semibold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create First Article</span>
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-canvas border-b border-border text-text-secondary font-semibold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-2.5 px-3.5">Article Title</th>
                        <th className="py-2.5 px-3">Author</th>
                        <th className="py-2.5 px-3">Read Time</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-surface">
                      {categoryPosts.map((post) => (
                        <tr
                          key={post.id}
                          className="hover:bg-canvas/60 transition-colors"
                        >
                          <td className="py-3 px-3.5">
                            <div className="font-semibold text-text-primary line-clamp-1 max-w-[280px]">
                              {post.title}
                            </div>
                            <div className="text-[11px] text-text-secondary font-mono mt-0.5">
                              /blog/{post.slug}
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-medium text-text-primary">
                              {post.author.name}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-text-secondary">
                              {post.readTime}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <BlogStatusBadge status={post.status} />
                          </td>
                          <td className="py-3 px-3 text-right">
                            <Link
                              href={`/blog/${post.slug}/edit`}
                              className="p-1.5 rounded-md text-text-secondary hover:text-navy hover:bg-canvas transition-colors inline-block"
                              title="Edit article"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </Link>
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
                  {(["published", "draft", "archived"] as BlogStatus[]).map(
                    (s) => {
                      const isSelected = status === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setStatus(s)}
                          className={`py-2 px-3 rounded-lg border text-xs font-semibold capitalize transition-all ${
                            isSelected
                              ? s === "published"
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
                  Determines order on public category navigation tabs.
                </p>
              </div>

              {isEditing && (
                <div className="pt-3 border-t border-border/60 text-xs text-text-secondary space-y-1.5">
                  <div className="flex justify-between">
                    <span>Assigned Articles:</span>
                    <span className="font-semibold text-text-primary">
                      {categoryPosts.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last updated:</span>
                    <span className="font-mono text-text-primary">
                      {category?.updatedAt ?? "2024-10-24"}
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
                  placeholder="e.g. Dissertation & Thesis Guides | ReadEssay"
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
                  placeholder="Master postgraduate dissertation blueprints, empirical research selection, and defense strategies..."
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
                    <span>blog</span>
                    <span>›</span>
                    <span>category</span>
                    <span>›</span>
                    <span className="text-text-secondary">
                      {slug || "category-slug"}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#1a0dab] line-clamp-1 hover:underline cursor-pointer">
                    {metaTitle ||
                      (name
                        ? `${name} Guides | ReadEssay Blog`
                        : "Blog Category | ReadEssay")}
                  </div>
                  <div className="text-[11px] text-[#4d5156] line-clamp-2 leading-relaxed">
                    {metaDescription ||
                      shortDescription ||
                      "Browse verified university-level editorial publications, essay frameworks, and research methodologies."}
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

