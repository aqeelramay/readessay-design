"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  CheckCircle2,
  FolderOpen,
  Layers,
  BookOpen,
  X,
  Clock,
  Calendar,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  type BlogPost,
  type BlogCategory,
  getBlogPosts,
  getBlogCategories,
  deleteBlogPost,
} from "@/lib/blog-api";
import { BlogStatusBadge } from "./BlogStatusBadge";
import { DeleteConfirmModal } from "@/components/services/DeleteConfirmModal";

export function BlogPostsView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const selectedCategorySlug = categoryParam ?? "all";
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [deletingPost, setDeletingPost] = useState<BlogPost | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setFetchError(null);

      const [postsRes, catsRes] = await Promise.all([
        getBlogPosts({
          search: searchQuery || undefined,
          status: statusFilter !== "all" ? statusFilter : undefined,
          categorySlug: selectedCategorySlug !== "all" ? selectedCategorySlug : undefined,
          limit: 100,
        }),
        getBlogCategories(),
      ]);

      setPosts(postsRes.posts || []);
      setCategories(catsRes.categories || []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load blog posts.";
      setFetchError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, statusFilter, selectedCategorySlug]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 50);
    return () => clearTimeout(timer);
  }, [loadData]);

  // Active category object if filtered by category
  const activeCategory = useMemo(() => {
    if (selectedCategorySlug === "all") return null;
    return categories.find((c) => c.slug === selectedCategorySlug) ?? null;
  }, [selectedCategorySlug, categories]);

  const filteredPosts = useMemo(() => {
    const categoryMap = new Map(categories.map((c) => [c.id, c]));

    return posts.filter((post) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        post.title.toLowerCase().includes(query) ||
        post.slug.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query) ||
        post.author.credentials.toLowerCase().includes(query);

      const postCategory = categoryMap.get(post.categoryId) || post.category;
      const matchesCategory =
        selectedCategorySlug === "all" ||
        postCategory?.slug === selectedCategorySlug;

      const matchesStatus =
        statusFilter === "all" || post.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [posts, searchQuery, selectedCategorySlug, statusFilter, categories]);

  function handleCategoryChange(slug: string) {
    if (slug === "all") {
      router.push("/blog");
    } else {
      router.push(`/blog?category=${slug}`);
    }
  }

  async function handleConfirmDelete() {
    if (!deletingPost) return;
    const title = deletingPost.title;
    const postId = deletingPost.id;

    try {
      setErrorMessage(null);
      await deleteBlogPost(postId);
      setDeletingPost(null);
      showToast(`Article "${title}" deleted successfully.`);
      await loadData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : `Failed to delete article "${title}".`;
      setErrorMessage(msg);
      setDeletingPost(null);
    }
  }

  // Summary Metrics
  const totalArticles = posts.length;
  const publishedArticles = posts.filter(
    (p) => p.status === "published"
  ).length;
  const draftArticles = posts.filter((p) => p.status === "draft").length;
  const categoriesCount = categories.length;

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

      {/* Error Notification */}
      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start justify-between gap-3 text-rose-800 text-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-rose-600 hover:text-rose-800 font-bold ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[26px] font-bold text-text-primary tracking-tight">
            Blog Posts
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Manage academic guides, editorial articles, table-of-contents
            sections, and SEO metadata.
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/blog/categories"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border bg-surface text-text-secondary hover:text-text-primary hover:bg-canvas text-xs font-semibold transition-colors"
          >
            <Layers className="w-4 h-4 text-orange" />
            <span>Categories</span>
          </Link>
          <Link
            href={
              selectedCategorySlug !== "all"
                ? `/blog/new?category=${selectedCategorySlug}`
                : "/blog/new"
            }
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange hover:bg-orange-hover text-white text-xs font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40"
          >
            <Plus className="w-4 h-4" />
            <span>Add Post</span>
          </Link>
        </div>
      </div>

      {/* Active Category Filter Banner (if filtered via query param) */}
      {activeCategory && (
        <div className="bg-orange/10 border border-orange/20 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange text-white flex items-center justify-center font-bold text-xs shrink-0">
              <FolderOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-orange uppercase tracking-wider">
                Filtered by Category
              </span>
              <h2 className="text-sm font-bold text-text-primary">
                {activeCategory.name}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleCategoryChange("all")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border hover:bg-canvas text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear Filter</span>
          </button>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-xl p-4 shadow-xs">
          <div className="text-xs text-text-secondary font-medium">
            Total Articles
          </div>
          <div className="text-2xl font-bold text-text-primary mt-1">
            {totalArticles}
          </div>
          <div className="text-[11px] text-text-muted mt-1">
            Across all categories
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 shadow-xs">
          <div className="text-xs text-text-secondary font-medium">
            Published Articles
          </div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">
            {publishedArticles}
          </div>
          <div className="text-[11px] text-text-muted mt-1">
            Live on customer blog
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 shadow-xs">
          <div className="text-xs text-text-secondary font-medium">
            Drafts in Progress
          </div>
          <div className="text-2xl font-bold text-amber-600 mt-1">
            {draftArticles}
          </div>
          <div className="text-[11px] text-text-muted mt-1">
            Unpublished revisions
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 shadow-xs">
          <div className="text-xs text-text-secondary font-medium">
            Topic Categories
          </div>
          <div className="text-2xl font-bold text-navy mt-1">
            {categoriesCount}
          </div>
          <div className="text-[11px] text-text-muted mt-1">
            Curated collections
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
            placeholder="Search articles by title, slug, excerpt, or author..."
            className="w-full bg-canvas border border-border rounded-lg pl-9 pr-3.5 py-2 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:bg-surface focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-navy transition-all"
          />
        </div>

        {/* Category & Status Selectors */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Dropdown */}
          <select
            value={selectedCategorySlug}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-border bg-canvas text-xs font-medium text-text-primary focus:bg-surface focus:outline-none focus:ring-2 focus:ring-orange/30 transition-colors"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Status Filter Tabs */}
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
            {filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? "Article" : "Articles"}
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
                  Article Title &amp; Slug
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Category
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Author
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Read Time
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Status
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Published
                </th>
                <th scope="col" className="px-5 py-3.5 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-xs sm:text-sm text-text-primary bg-surface">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-text-secondary">
                    <Loader2 className="w-6 h-6 animate-spin text-orange mx-auto mb-2" />
                    <p className="text-xs text-text-muted">Loading blog posts from database...</p>
                  </td>
                </tr>
              ) : fetchError ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-rose-600">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-80" />
                    <p className="font-semibold text-sm">Failed to load blog posts</p>
                    <p className="text-xs text-text-muted mt-1">{fetchError}</p>
                    <button
                      type="button"
                      onClick={() => loadData()}
                      className="mt-3 px-3 py-1.5 rounded-lg bg-navy text-white text-xs font-semibold hover:bg-navy-hover"
                    >
                      Try Again
                    </button>
                  </td>
                </tr>
              ) : filteredPosts.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-text-secondary"
                  >
                    <BookOpen className="w-8 h-8 text-text-muted mx-auto mb-2 opacity-50" />
                    <p className="font-medium text-text-primary">
                      No blog articles found
                    </p>
                    <p className="text-xs text-text-muted mt-1">
                      Try clearing search filters or create a new blog post.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => {
                  const category =
                    categories.find((c) => c.id === post.categoryId) || post.category;
                  return (
                    <tr
                      key={post.id}
                      className="hover:bg-canvas/50 transition-colors group"
                    >
                      {/* Title & Slug */}
                      <td className="px-5 py-4 max-w-md">
                        <div>
                          <Link
                            href={`/blog/${post.slug}/edit`}
                            className="font-bold text-text-primary hover:text-orange transition-colors block text-xs sm:text-sm line-clamp-1"
                          >
                            {post.title}
                          </Link>
                          <span className="block text-[11px] font-mono text-text-muted mt-0.5">
                            readessay.com/blog/{post.slug}
                          </span>
                        </div>
                      </td>

                      {/* Category Pill */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        {category ? (
                          <Link
                            href={`/blog?category=${category.slug}`}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-navy/5 text-navy hover:bg-navy/10 border border-navy/10 transition-colors"
                          >
                            <span>{category.name}</span>
                          </Link>
                        ) : (
                          <span className="text-xs text-text-muted italic">
                            Unassigned
                          </span>
                        )}
                      </td>

                      {/* Author */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div>
                          <span className="font-semibold text-xs text-text-primary block">
                            {post.author?.name || "Editorial Staff"}
                          </span>
                          <span className="text-[11px] text-text-secondary block">
                            {post.author?.credentials || "ReadEssay Faculty"}
                          </span>
                        </div>
                      </td>

                      {/* Read Time */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-xs text-text-secondary font-mono">
                          <Clock className="w-3 h-3 text-text-muted" />
                          <span>{post.readTime}</span>
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <BlogStatusBadge status={post.status} />
                      </td>

                      {/* Published Date */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-text-secondary">
                          <Calendar className="w-3 h-3 text-text-muted" />
                          <span>{post.publishedAt}</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5 opacity-90 group-hover:opacity-100">
                          <Link
                            href={`/blog/${post.slug}/edit`}
                            aria-label={`Edit ${post.title}`}
                            className="p-1.5 text-text-secondary hover:text-navy hover:bg-canvas rounded-md transition-colors"
                            title="Edit Article"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => setDeletingPost(post)}
                            aria-label={`Delete ${post.title}`}
                            className="p-1.5 text-text-secondary hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                            title="Delete Article"
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
      {deletingPost && (
        <DeleteConfirmModal
          isOpen={Boolean(deletingPost)}
          title="Delete Blog Article"
          itemName={deletingPost.title}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingPost(null)}
        />
      )}
    </div>
  );
}
