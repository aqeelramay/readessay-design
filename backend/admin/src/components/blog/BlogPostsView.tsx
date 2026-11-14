"use client";

import { useState, useMemo } from "react";
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
} from "lucide-react";
import {
  INITIAL_BLOG_POSTS,
  INITIAL_BLOG_CATEGORIES,
  type BlogPost,
  type BlogCategory,
  getBlogCategoryById,
} from "@/data/mockBlog";
import { BlogStatusBadge } from "./BlogStatusBadge";
import { DeleteConfirmModal } from "@/components/services/DeleteConfirmModal";

export function BlogPostsView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [categories] = useState<BlogCategory[]>(INITIAL_BLOG_CATEGORIES);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>(
    categoryParam ?? "all"
  );
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [deletingPost, setDeletingPost] = useState<BlogPost | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }

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

      const postCategory = categoryMap.get(post.categoryId);
      const matchesCategory =
        selectedCategorySlug === "all" ||
        postCategory?.slug === selectedCategorySlug;

      const matchesStatus =
        statusFilter === "all" || post.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [posts, searchQuery, selectedCategorySlug, statusFilter, categories]);

  function handleCategoryChange(slug: string) {
    setSelectedCategorySlug(slug);
    if (slug === "all") {
      router.push("/blog");
    } else {
      router.push(`/blog?category=${slug}`);
    }
  }

  function handleConfirmDelete() {
    if (!deletingPost) return;
    const title = deletingPost.title;
    setPosts((prev) => prev.filter((p) => p.id !== deletingPost.id));
    setDeletingPost(null);
    showToast(`Article "${title}" deleted successfully.`);
  }

  // Summary Metrics
  const totalArticles = posts.length;
  const publishedArticles = posts.filter(
    (p) => p.status === "published"
  ).length;
  const draftArticles = posts.filter((p) => p.status === "draft").length;

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
              activeCategory
                ? `/blog/new?category=${activeCategory.slug}`
                : "/blog/new"
            }
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange hover:bg-orange-hover text-white text-xs font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40"
          >
            <Plus className="w-4 h-4" />
            <span>Add Post</span>
          </Link>
        </div>
      </div>

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
            Across {categories.length} categories
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
            Live on ReadEssay Blog
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 shadow-xs">
          <div className="text-xs text-text-secondary font-medium">
            Draft Articles
          </div>
          <div className="text-2xl font-bold text-amber-600 mt-1">
            {draftArticles}
          </div>
          <div className="text-[11px] text-text-muted mt-1">
            In review or editing
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 shadow-xs">
          <div className="text-xs text-text-secondary font-medium">
            Active Categories
          </div>
          <div className="text-2xl font-bold text-orange mt-1">
            {categories.length}
          </div>
          <div className="text-[11px] text-text-muted mt-1">
            Curated research topics
          </div>
        </div>
      </div>

      {/* Active Category Filter Banner (if filtered) */}
      {activeCategory && (
        <div className="bg-orange/5 border border-orange/20 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center text-orange shrink-0">
              <FolderOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-text-primary flex items-center gap-2">
                <span>Filtered by Category:</span>
                <span className="text-orange">{activeCategory.name}</span>
              </div>
              <p className="text-[11px] text-text-secondary mt-0.5 line-clamp-1">
                {activeCategory.shortDescription}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleCategoryChange("all")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-text-secondary hover:text-text-primary text-xs font-semibold transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
            <span>Show All Posts</span>
          </button>
        </div>
      )}

      {/* Toolbar: Category dropdown, Status tabs, Search bar */}
      <div className="bg-surface border border-border rounded-xl p-4 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-canvas rounded-lg border border-border/80 self-start sm:self-auto overflow-x-auto">
            {(["all", "published", "draft", "archived"] as const).map((tab) => {
              const count =
                tab === "all"
                  ? posts.length
                  : posts.filter((p) => p.status === tab).length;
              const isActive = statusFilter === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setStatusFilter(tab)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all capitalize whitespace-nowrap ${
                    isActive
                      ? "bg-surface text-navy shadow-xs border border-border"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive
                        ? "bg-navy/10 text-navy"
                        : "bg-slate-200/60 text-text-secondary"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Category Dropdown Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-text-secondary whitespace-nowrap">
              Category:
            </span>
            <select
              value={selectedCategorySlug}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary font-medium"
            >
              <option value="all">All Categories ({posts.length})</option>
              {categories.map((cat) => {
                const count = posts.filter(
                  (p) => p.categoryId === cat.id
                ).length;
                return (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name} ({count})
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts by title, slug, excerpt, or faculty author..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-border bg-canvas focus:bg-surface focus:border-navy focus:outline-none transition-colors text-text-primary placeholder:text-text-muted"
          />
        </div>
      </div>

      {/* SaaS Data Table */}
      <div className="bg-surface border border-border rounded-xl shadow-xs overflow-hidden">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center text-orange mx-auto mb-3">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-text-primary">
              No blog posts found
            </h2>
            <p className="text-xs text-text-secondary mt-1 max-w-sm mx-auto">
              No articles match your search or category filter. Try clearing
              your query or selecting another category.
            </p>
            {(searchQuery ||
              selectedCategorySlug !== "all" ||
              statusFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategorySlug("all");
                  setStatusFilter("all");
                  router.push("/blog");
                }}
                className="mt-4 px-3.5 py-1.5 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-canvas transition-colors"
              >
                Reset All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-canvas border-b border-border text-text-secondary font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Article Title &amp; Slug</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4">Read Time &amp; Date</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-surface">
                {filteredPosts.map((post) => {
                  const cat = getBlogCategoryById(post.categoryId);

                  return (
                    <tr
                      key={post.id}
                      className="hover:bg-canvas/60 transition-colors"
                    >
                      {/* Title & Slug (with thumbnail) */}
                      <td className="py-3 px-4">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-100 border border-border shrink-0 mt-0.5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={post.featuredImage.url}
                              alt={post.featuredImage.altText || post.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div>
                            <Link
                              href={`/blog/${post.slug}/edit`}
                              className="font-bold text-text-primary hover:text-orange transition-colors line-clamp-1 max-w-sm sm:max-w-md block"
                            >
                              {post.title}
                            </Link>
                            <span className="block text-[11px] font-mono text-text-muted mt-0.5">
                              /blog/{post.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4">
                        {cat ? (
                          <Link
                            href={`/blog?category=${cat.slug}`}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-orange/10 text-orange border border-orange/20 hover:bg-orange/20 transition-colors whitespace-nowrap"
                          >
                            {cat.name}
                          </Link>
                        ) : (
                          <span className="text-text-muted">—</span>
                        )}
                      </td>

                      {/* Author */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-text-primary">
                          {post.author.name}
                        </div>
                        <div className="text-[11px] text-text-secondary truncate max-w-[160px]">
                          {post.author.credentials}
                        </div>
                      </td>

                      {/* Read Time & Date */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 text-text-primary font-medium">
                          <Clock className="w-3 h-3 text-text-muted" />
                          <span>{post.readTime}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-text-secondary mt-0.5 font-mono">
                          <Calendar className="w-3 h-3 text-text-muted" />
                          <span>{post.publishedAt}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3">
                        <BlogStatusBadge status={post.status} />
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/blog/${post.slug}/edit`}
                            className="p-1.5 rounded-md text-text-secondary hover:text-navy hover:bg-canvas transition-colors"
                            title="Edit Article"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => setDeletingPost(post)}
                            className="p-1.5 rounded-md text-text-secondary hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Article"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingPost && (
        <DeleteConfirmModal
          isOpen={Boolean(deletingPost)}
          title="Delete Blog Post"
          itemName={deletingPost.title}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingPost(null)}
        />
      )}
    </div>
  );
}
