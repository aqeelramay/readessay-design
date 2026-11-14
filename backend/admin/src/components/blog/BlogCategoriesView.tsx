"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  CheckCircle2,
  FolderOpen,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import {
  INITIAL_BLOG_CATEGORIES,
  INITIAL_BLOG_POSTS,
  type BlogCategory,
} from "@/data/mockBlog";
import { BlogStatusBadge } from "./BlogStatusBadge";
import { DeleteConfirmModal } from "@/components/services/DeleteConfirmModal";

export function BlogCategoriesView() {
  const [categories, setCategories] = useState<BlogCategory[]>(
    INITIAL_BLOG_CATEGORIES
  );
  const [posts, setPosts] = useState(INITIAL_BLOG_POSTS);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [deletingCategory, setDeletingCategory] = useState<BlogCategory | null>(
    null
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }

  function getPostCount(categoryId: string): number {
    return posts.filter((p) => p.categoryId === categoryId).length;
  }

  const filteredCategories = useMemo(() => {
    return categories
      .filter((cat) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          cat.name.toLowerCase().includes(query) ||
          cat.slug.toLowerCase().includes(query) ||
          cat.shortDescription.toLowerCase().includes(query);

        const matchesStatus =
          statusFilter === "all" || cat.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [categories, searchQuery, statusFilter]);

  function handleConfirmDelete() {
    if (!deletingCategory) return;
    const name = deletingCategory.name;
    const catId = deletingCategory.id;

    setCategories((prev) => prev.filter((c) => c.id !== catId));
    setPosts((prev) => prev.filter((p) => p.categoryId !== catId));
    setDeletingCategory(null);
    showToast(`Deleted category "${name}".`);
  }

  // Summary Metrics
  const totalCategoriesCount = categories.length;
  const publishedCount = categories.filter(
    (c) => c.status === "published"
  ).length;
  const totalPostsCount = posts.length;

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

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[26px] font-bold text-text-primary tracking-tight">
            Blog Categories
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Organize academic articles, research publications, and editorial
            topics into curated disciplinary collections.
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border bg-surface text-text-secondary hover:text-text-primary hover:bg-canvas text-xs font-semibold transition-colors"
          >
            <BookOpen className="w-4 h-4 text-orange" />
            <span>All Posts</span>
          </Link>
          <Link
            href="/blog/categories/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange hover:bg-orange-hover text-white text-xs font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-xl p-4 shadow-xs">
          <div className="text-xs text-text-secondary font-medium">
            Total Categories
          </div>
          <div className="text-2xl font-bold text-text-primary mt-1">
            {totalCategoriesCount}
          </div>
          <div className="text-[11px] text-text-muted mt-1">
            Editorial sections
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 shadow-xs">
          <div className="text-xs text-text-secondary font-medium">
            Published Categories
          </div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">
            {publishedCount}
          </div>
          <div className="text-[11px] text-text-muted mt-1">
            Live on ReadEssay Blog
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 shadow-xs">
          <div className="text-xs text-text-secondary font-medium">
            Total Blog Articles
          </div>
          <div className="text-2xl font-bold text-navy mt-1">
            {totalPostsCount}
          </div>
          <div className="text-[11px] text-text-muted mt-1">
            Assigned to collections
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 shadow-xs">
          <div className="text-xs text-text-secondary font-medium">
            Average Articles / Cat
          </div>
          <div className="text-2xl font-bold text-orange mt-1">
            {totalCategoriesCount > 0
              ? (totalPostsCount / totalCategoriesCount).toFixed(1)
              : "0"}
          </div>
          <div className="text-[11px] text-text-muted mt-1">
            Content distribution
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-surface border border-border rounded-xl p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories by name, slug, or description..."
            className="w-full bg-canvas border border-border rounded-lg pl-9 pr-3.5 py-2 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:bg-surface focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-navy transition-all"
          />
        </div>

        {/* Status Filter Tabs & Count Badge */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-lg border border-border bg-canvas p-0.5">
            {[
              { id: "all", label: "All" },
              { id: "published", label: "Published" },
              { id: "draft", label: "Draft" },
              { id: "archived", label: "Archived" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  statusFilter === tab.id
                    ? "bg-surface text-text-primary font-semibold shadow-2xs border border-border/80"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-xs font-medium text-text-muted px-2.5 py-1 bg-canvas rounded-lg border border-border">
            {filteredCategories.length}{" "}
            {filteredCategories.length === 1 ? "Category" : "Categories"}
          </span>
        </div>
      </div>

      {/* Structured SaaS Data Table */}
      <div className="bg-surface border border-border rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-canvas border-b border-border text-[11px] font-bold text-text-secondary uppercase tracking-wider select-none">
                <th scope="col" className="px-5 py-3.5">
                  Category Name &amp; Slug
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Short Description
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Posts
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
            <tbody className="divide-y divide-border text-xs sm:text-sm text-text-primary bg-surface">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-text-secondary"
                  >
                    <FolderOpen className="w-8 h-8 text-text-muted mx-auto mb-2 opacity-50" />
                    <p className="font-medium text-text-primary">
                      No blog categories found
                    </p>
                    <p className="text-xs text-text-muted mt-1">
                      Try clearing search filters or add a new blog category.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredCategories.map((cat) => {
                  const count = getPostCount(cat.id);
                  return (
                    <tr
                      key={cat.id}
                      className="hover:bg-canvas/50 transition-colors group"
                    >
                      {/* Name & Slug */}
                      <td className="px-5 py-4">
                        <div>
                          <Link
                            href={`/blog/categories/${cat.slug}/edit`}
                            className="font-bold text-text-primary hover:text-orange transition-colors block text-xs sm:text-sm"
                          >
                            {cat.name}
                          </Link>
                          <span className="block text-[11px] font-mono text-text-muted mt-0.5">
                            /blog/category/{cat.slug}
                          </span>
                        </div>
                      </td>

                      {/* Description */}
                      <td className="px-5 py-4">
                        <p className="text-xs text-text-secondary line-clamp-2 max-w-md leading-relaxed">
                          {cat.shortDescription}
                        </p>
                      </td>

                      {/* Posts Count Pill (links to /blog?category=<slug>) */}
                      <td className="px-5 py-4">
                        <Link
                          href={`/blog?category=${cat.slug}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange/10 text-orange border border-orange/20 hover:bg-orange/20 transition-colors"
                          title={`View posts under ${cat.name}`}
                        >
                          <span>
                            {count} {count === 1 ? "Post" : "Posts"}
                          </span>
                          <ArrowRight className="w-3 h-3 text-orange" />
                        </Link>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <BlogStatusBadge status={cat.status} />
                      </td>

                      {/* Updated Date */}
                      <td className="px-5 py-4">
                        <span className="text-xs font-mono text-text-secondary">
                          {cat.updatedAt}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 opacity-90 group-hover:opacity-100">
                          <Link
                            href={`/blog/categories/${cat.slug}/edit`}
                            aria-label={`Edit ${cat.name}`}
                            className="p-1.5 text-text-secondary hover:text-navy hover:bg-canvas rounded-md transition-colors"
                            title="Edit Category"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => setDeletingCategory(cat)}
                            aria-label={`Delete ${cat.name}`}
                            className="p-1.5 text-text-secondary hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                            title="Delete Category"
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
      {deletingCategory && (
        <DeleteConfirmModal
          isOpen={Boolean(deletingCategory)}
          title="Delete Blog Category"
          itemName={deletingCategory.name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingCategory(null)}
        />
      )}
    </div>
  );
}
