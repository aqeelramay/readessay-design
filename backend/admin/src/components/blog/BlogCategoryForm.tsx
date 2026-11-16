"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Loader2,
} from "lucide-react";
import {
  type BlogCategory,
  type BlogStatus,
  type BlogPost,
  getBlogCategoryByIdOrSlug,
  createBlogCategory,
  updateBlogCategory,
} from "@/lib/blog-api";
import { BlogStatusBadge } from "./BlogStatusBadge";

interface BlogCategoryFormProps {
  category?: BlogCategory;
  categorySlug?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function BlogCategoryForm({
  category: initialCategory,
  categorySlug,
}: BlogCategoryFormProps) {
  const router = useRouter();

  const [categoryData, setCategoryData] = useState<BlogCategory | null>(
    initialCategory ?? null
  );
  const [isLoadingCategory, setIsLoadingCategory] = useState(
    Boolean(categorySlug && !initialCategory)
  );
  const [loadError, setLoadError] = useState<string | null>(null);

  const isEditing = Boolean(categoryData || categorySlug);

  // Form Fields
  const [name, setName] = useState(initialCategory?.name ?? "");
  const [slug, setSlug] = useState(initialCategory?.slug ?? "");
  const [isSlugCustomized, setIsSlugCustomized] = useState(
    Boolean(initialCategory)
  );
  const [badgeLabel, setBadgeLabel] = useState(
    initialCategory?.badgeLabel ?? "Category"
  );
  const [shortDescription, setShortDescription] = useState(
    initialCategory?.shortDescription ?? ""
  );

  const [status, setStatus] = useState<BlogStatus>(
    initialCategory?.status ?? "published"
  );
  const [displayOrder, setDisplayOrder] = useState<number>(
    initialCategory?.displayOrder ?? 1
  );

  const [metaTitle, setMetaTitle] = useState(
    initialCategory?.seo?.metaTitle ?? ""
  );
  const [metaDescription, setMetaDescription] = useState(
    initialCategory?.seo?.metaDescription ?? ""
  );

  // Associated posts if in edit mode
  const [categoryPosts, setCategoryPosts] = useState<BlogPost[]>(
    initialCategory?.posts ?? []
  );

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categorySlug || initialCategory) return;

    let isMounted = true;
    getBlogCategoryByIdOrSlug(categorySlug)
      .then((cat) => {
        if (!isMounted) return;
        setCategoryData(cat);
        setName(cat.name);
        setSlug(cat.slug);
        setIsSlugCustomized(true);
        setBadgeLabel(cat.badgeLabel);
        setShortDescription(cat.shortDescription);
        setStatus(cat.status);
        setDisplayOrder(cat.displayOrder);
        setMetaTitle(cat.seo?.metaTitle ?? "");
        setMetaDescription(cat.seo?.metaDescription ?? "");
        setCategoryPosts(cat.posts ?? []);
      })
      .catch((err) => {
        if (!isMounted) return;
        const msg =
          err instanceof Error ? err.message : "Failed to load category.";
        setLoadError(msg);
      })
      .finally(() => {
        if (isMounted) setIsLoadingCategory(false);
      });

    return () => {
      isMounted = false;
    };
  }, [categorySlug, initialCategory]);

  function handleNameChange(val: string) {
    setName(val);
    if (!isSlugCustomized) {
      setSlug(slugify(val));
    }
    if (!metaTitle || metaTitle === `${name} | ReadEssay Blog`) {
      setMetaTitle(`${val} | ReadEssay Blog`);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setConfirmation(null);

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

    try {
      setIsSubmitting(true);

      const payload = {
        name: name.trim(),
        slug: slug.trim(),
        badgeLabel: badgeLabel.trim() || "Category",
        shortDescription: shortDescription.trim(),
        status,
        displayOrder: Number(displayOrder) || 1,
        metaTitle: metaTitle.trim() || null,
        metaDescription: metaDescription.trim() || null,
        canonicalSlug: slug.trim(),
        seo: {
          metaTitle: metaTitle.trim(),
          metaDescription: metaDescription.trim(),
          canonicalSlug: slug.trim(),
        },
      };

      if (categoryData?.id) {
        const updated = await updateBlogCategory(categoryData.id, payload);
        setCategoryData(updated);
        setConfirmation(`Category "${updated.name}" updated successfully.`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const created = await createBlogCategory(payload);
        setConfirmation(`Category "${created.name}" created successfully.`);
        router.push("/blog/categories");
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "An error occurred while saving the category.";
      setError(msg);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoadingCategory) {
    return (
      <div className="p-12 text-center text-text-secondary">
        <Loader2 className="w-8 h-8 animate-spin text-orange mx-auto mb-2" />
        <p className="text-sm font-medium text-text-primary">Loading category...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="bg-surface border border-border rounded-xl p-8 text-center max-w-lg mx-auto">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
        <h1 className="text-xl font-bold text-text-primary">Category Not Found</h1>
        <p className="text-sm text-text-secondary mt-2">{loadError}</p>
        <Link
          href="/blog/categories"
          className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-lg bg-orange text-white text-xs font-semibold hover:bg-orange-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Categories</span>
        </Link>
      </div>
    );
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
            {isEditing ? `Edit Category: ${categoryData?.name || name}` : "Add Blog Category"}
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
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{isSubmitting ? "Saving..." : isEditing ? "Save Changes" : "Create Category"}</span>
          </button>
        </div>
      </div>

      {/* Confirmation & Error Banners */}
      {confirmation && (
        <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900 text-xs sm:text-sm flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-medium">{confirmation}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl border border-rose-300 bg-rose-50 text-rose-900 text-xs sm:text-sm flex items-center gap-3 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Main Form Layout */}
      <form
        id="blog-category-form"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Left Column (2 Cols): Core Metadata & Articles Table */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Core Category Information */}
          <div className="bg-surface rounded-xl border border-border p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <FolderOpen className="w-4 h-4 text-orange" />
              <h2 className="text-base font-bold text-text-primary">
                Category Details
              </h2>
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
                  placeholder="e.g. Dissertation & Thesis Mastery"
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
                    className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1.5">
                  Short Description <span className="text-orange">*</span>
                </label>
                <textarea
                  rows={3}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Lead introductory paragraph for the category landing page..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary resize-y"
                  required
                />
              </div>
            </div>
          </div>

          {/* Card 2: Embedded Articles Table (in edit mode) */}
          {isEditing && (
            <div className="bg-surface rounded-xl border border-border p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange" />
                  <h2 className="text-base font-bold text-text-primary">
                    Articles in this Category ({categoryPosts.length})
                  </h2>
                </div>
                <Link
                  href={`/blog/new?category=${slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange hover:bg-orange-hover text-white text-xs font-semibold shadow-2xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Article</span>
                </Link>
              </div>

              {categoryPosts.length === 0 ? (
                <div className="p-8 text-center bg-canvas/50 rounded-lg border border-dashed border-border text-xs text-text-secondary">
                  <p>No articles are currently assigned to this category.</p>
                  <Link
                    href={`/blog/new?category=${slug}`}
                    className="inline-block mt-2 font-semibold text-orange hover:underline"
                  >
                    + Publish the first article in this collection
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-canvas border-b border-border text-[11px] font-bold text-text-secondary uppercase select-none">
                        <th className="px-4 py-2.5">Title &amp; Slug</th>
                        <th className="px-4 py-2.5">Status</th>
                        <th className="px-4 py-2.5">Published</th>
                        <th className="px-4 py-2.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-surface">
                      {categoryPosts.map((post) => (
                        <tr key={post.id} className="hover:bg-canvas/50 transition-colors">
                          <td className="px-4 py-3">
                            <span className="font-semibold text-text-primary block line-clamp-1">
                              {post.title}
                            </span>
                            <span className="text-[11px] font-mono text-text-muted">
                              /blog/{post.slug}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <BlogStatusBadge status={post.status} />
                          </td>
                          <td className="px-4 py-3 font-mono text-[11px] text-text-secondary">
                            {post.publishedAt}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Link
                              href={`/blog/${post.slug}/edit`}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-orange hover:underline"
                            >
                              <Pencil className="w-3 h-3" />
                              <span>Edit</span>
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

        {/* Right Column (1 Col): Publishing Status & SEO */}
        <div className="space-y-6">
          {/* Card 1: Publishing Settings */}
          <div className="bg-surface rounded-xl border border-border p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-text-primary pb-3 border-b border-border">
              Publishing Settings
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1.5">
                  Category Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["published", "draft", "archived"] as BlogStatus[]).map((s) => {
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
                  })}
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
                  onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary font-mono"
                  required
                />
                <p className="text-[11px] text-text-secondary mt-1">
                  Determines position on public category tabs (1 = leftmost).
                </p>
              </div>

              {categoryData && (
                <div className="pt-3 border-t border-border/60 text-xs text-text-secondary space-y-1.5">
                  <div className="flex justify-between">
                    <span>Category ID:</span>
                    <span className="font-mono text-text-primary">{categoryData.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last updated:</span>
                    <span className="font-mono text-text-primary">{categoryData.updatedAt}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Card 2: SEO & Search Metadata */}
          <div className="bg-surface rounded-xl border border-border p-6 shadow-xs space-y-4">
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
                  placeholder="e.g. Dissertation Guides | ReadEssay"
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
