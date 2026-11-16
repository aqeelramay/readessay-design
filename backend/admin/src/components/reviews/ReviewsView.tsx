"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  CheckCircle2,
  Filter,
  Star,
  Check,
  User,
  AlertCircle,
  RefreshCw,
  Sparkles,
  BookOpen,
} from "lucide-react";
import {
  getReviews,
  updateReview,
  deleteReview,
  getServices,
  type ReviewItem,
  type ReviewsSummary,
  type ServiceItem,
} from "@/lib/api";
import { ReviewStatusBadge } from "./ReviewStatusBadge";
import { DeleteConfirmModal } from "@/components/services/DeleteConfirmModal";

export function ReviewsView() {
  // Live Reviews State
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [summary, setSummary] = useState<ReviewsSummary | null>(null);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Search and Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");

  // Modal & Action states
  const [deletingReview, setDeletingReview] = useState<ReviewItem | null>(null);
  const [updatingReviewId, setUpdatingReviewId] = useState<string | null>(null);

  // Toast feedback state
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

  // Load parent services for filtering dropdown
  useEffect(() => {
    getServices({ limit: 100 })
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Failed to load services for filter:", err));
  }, []);

  // Fetch reviews from API
  const loadReviews = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const res = await getReviews({
        search: searchQuery.trim() || undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
        rating: ratingFilter !== "all" ? Number(ratingFilter) : undefined,
        serviceId: serviceFilter !== "all" ? serviceFilter : undefined,
        limit: 100,
      });

      setReviews(res.data);
      if (res.summary) {
        setSummary(res.summary);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load reviews";
      setLoadError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, statusFilter, ratingFilter, serviceFilter]);

  // Debounced load on search / filter changes
  useEffect(() => {
    const timer = setTimeout(() => {
      loadReviews();
    }, 250);
    return () => clearTimeout(timer);
  }, [loadReviews]);

  // Quick Status Toggle Handler
  async function handleStatusChange(review: ReviewItem, newStatus: string) {
    setUpdatingReviewId(review.id);
    try {
      await updateReview(review.id, { status: newStatus });
      setReviews((prev) =>
        prev.map((r) =>
          r.id === review.id ? { ...r, status: newStatus as ReviewItem["status"] } : r
        )
      );
      showToast(`Status updated to "${newStatus}" for "${review.reviewerName}".`);
      // Refresh summary counts
      const res = await getReviews({ limit: 1 });
      if (res.summary) setSummary(res.summary);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update review status";
      showError(msg);
    } finally {
      setUpdatingReviewId(null);
    }
  }

  // Quick Featured Toggle Handler
  async function handleToggleFeatured(review: ReviewItem) {
    const nextVal = !review.isFeatured;
    setUpdatingReviewId(review.id);
    try {
      await updateReview(review.id, { isFeatured: nextVal });
      setReviews((prev) =>
        prev.map((r) => (r.id === review.id ? { ...r, isFeatured: nextVal } : r))
      );
      showToast(
        nextVal
          ? `Marked "${review.reviewerName}" as featured.`
          : `Removed "${review.reviewerName}" from featured.`
      );
      // Refresh summary
      const res = await getReviews({ limit: 1 });
      if (res.summary) setSummary(res.summary);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update featured status";
      showError(msg);
    } finally {
      setUpdatingReviewId(null);
    }
  }

  // Handle Delete with backend API call
  async function handleConfirmDelete() {
    if (!deletingReview) return;
    const target = deletingReview;

    try {
      await deleteReview(target.id);
      setDeletingReview(null);
      showToast(`Deleted review from "${target.reviewerName}".`);
      await loadReviews();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete review";
      showError(msg);
      setDeletingReview(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-text-primary tracking-tight">
              Reviews &amp; Testimonials
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
              <span>
                {summary?.averageRating ? summary.averageRating.toFixed(2) : "5.00"} ★ (
                {summary?.totalCount ?? reviews.length})
              </span>
            </span>
          </div>
          <p className="text-sm text-text-secondary mt-1">
            Manage student reviews, verified credentials, and star ratings synced with PostgreSQL.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => loadReviews()}
            title="Refresh Reviews"
            className="p-2.5 rounded-lg border border-border bg-surface text-text-secondary hover:text-text-primary hover:bg-canvas transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-orange" : ""}`} />
          </button>
          <Link
            href="/reviews/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-orange hover:bg-orange-hover text-white text-sm font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Review</span>
          </Link>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total Reviews */}
        <div className="p-4 rounded-xl border border-border bg-surface shadow-2xs">
          <span className="text-xs text-text-secondary font-medium block">Total Reviews</span>
          <div className="text-xl sm:text-2xl font-bold text-text-primary mt-1">
            {summary?.totalCount ?? reviews.length}
          </div>
          <span className="text-[11px] text-text-muted mt-0.5 block">Recorded feedback</span>
        </div>

        {/* Average Rating */}
        <div className="p-4 rounded-xl border border-border bg-surface shadow-2xs">
          <span className="text-xs text-text-secondary font-medium block">Average Rating</span>
          <div className="text-xl sm:text-2xl font-bold text-amber-600 mt-1 flex items-center gap-1.5">
            <span>{summary?.averageRating ? summary.averageRating.toFixed(2) : "5.00"}</span>
            <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
          </div>
          <span className="text-[11px] text-text-muted mt-0.5 block">Out of 5.0 stars</span>
        </div>

        {/* Published Reviews */}
        <div className="p-4 rounded-xl border border-border bg-surface shadow-2xs">
          <span className="text-xs text-text-secondary font-medium block">Published</span>
          <div className="text-xl sm:text-2xl font-bold text-emerald-600 mt-1">
            {summary?.publishedCount ?? 0}
          </div>
          <span className="text-[11px] text-emerald-700/80 mt-0.5 block">Live on storefront</span>
        </div>

        {/* Pending / Moderation */}
        <div className="p-4 rounded-xl border border-border bg-surface shadow-2xs">
          <span className="text-xs text-text-secondary font-medium block">Pending &amp; Featured</span>
          <div className="text-xl sm:text-2xl font-bold text-navy mt-1 flex items-center gap-2">
            <span>{summary?.pendingCount ?? 0}</span>
            <span className="text-xs font-normal text-text-muted">pending</span>
            <span className="text-text-muted">•</span>
            <span className="text-orange">{summary?.featuredCount ?? 0}</span>
            <span className="text-xs font-normal text-text-muted">feat</span>
          </div>
          <span className="text-[11px] text-text-muted mt-0.5 block">Review moderation queue</span>
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
            onClick={() => loadReviews()}
            className="underline font-semibold hover:text-rose-950 shrink-0"
          >
            Retry
          </button>
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
            placeholder="Search by client name, course, title, or order ref..."
            className="w-full bg-surface border border-border rounded-lg pl-9 pr-3.5 py-2 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
          />
        </div>

        {/* Dropdowns & Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Service Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
            <BookOpen className="w-3.5 h-3.5 text-text-muted" />
            <span>Service:</span>
            <select
              aria-label="Filter by Service"
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="bg-canvas border border-border rounded-lg px-2.5 py-1.5 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30"
            >
              <option value="all">All Services</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title || s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
            <Star className="w-3.5 h-3.5 text-text-muted" />
            <span>Rating:</span>
            <select
              aria-label="Filter by Rating"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="bg-canvas border border-border rounded-lg px-2.5 py-1.5 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30"
            >
              <option value="all">All Stars</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 text-xs text-text-secondary pl-1">
            <Filter className="w-3.5 h-3.5 text-text-muted" />
            <span>Status:</span>
          </div>
          <div className="inline-flex rounded-lg border border-border bg-canvas p-0.5">
            {[
              { id: "all", label: "All" },
              { id: "PUBLISHED", label: "Published" },
              { id: "PENDING", label: "Pending" },
              { id: "HIDDEN", label: "Hidden" },
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

          <span className="text-xs font-medium text-text-muted px-2.5 py-1 bg-canvas rounded-lg border border-border shrink-0">
            {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
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
                  Client &amp; Testimonial
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Rating
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Service / Subject
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Featured
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Status
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Date
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
                      <p className="text-xs text-text-muted">Loading reviews from API...</p>
                    </div>
                  </td>
                </tr>
              ) : reviews.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-text-secondary">
                    <User className="w-8 h-8 text-text-muted mx-auto mb-2 opacity-50" />
                    <p className="font-medium text-text-primary">No client reviews found</p>
                    <p className="text-xs text-text-muted mt-1">
                      Try clearing search filters or click &ldquo;+ Add Review&rdquo; to create one.
                    </p>
                  </td>
                </tr>
              ) : (
                reviews.map((review) => {
                  const subjectLabel = review.subject || review.courseLabel || "Coursework";
                  const serviceTitle = review.service?.title || (review.subService ? review.subService.title : null);

                  return (
                    <tr
                      key={review.id}
                      className="hover:bg-canvas/50 transition-colors group"
                    >
                      {/* Client + Avatar + Initials + Quote Preview */}
                      <td className="px-5 py-4 max-w-md">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 border border-border flex items-center justify-center shrink-0 overflow-hidden font-bold text-xs text-text-secondary shadow-2xs">
                            {review.reviewerAvatar || review.avatarUrl ? (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img
                                src={review.reviewerAvatar || review.avatarUrl || ""}
                                alt={review.reviewerName}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).style.display = "none";
                                }}
                              />
                            ) : (
                              review.reviewerInitials ||
                              review.reviewerName.slice(0, 2).toUpperCase()
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <Link
                                href={`/reviews/${review.id}/edit`}
                                className="font-bold text-text-primary hover:text-orange transition-colors block text-sm truncate"
                              >
                                {review.reviewerName}
                              </Link>
                              {review.orderRef && (
                                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                                  {review.orderRef}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-text-muted italic truncate mt-0.5">
                              {review.title || review.quoteHeadline || `"${review.comment.slice(0, 50)}..."`}
                            </div>
                            <div className="text-[11px] text-text-secondary truncate mt-0.5 line-clamp-1">
                              {review.academicLevel && (
                                <span className="font-medium text-slate-700 mr-1.5">
                                  {review.academicLevel}
                                </span>
                              )}
                              {review.paperType && (
                                <span className="text-text-muted mr-1.5">
                                  • {review.paperType}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Review Star + Rating + Verified Pill */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-0.5 text-amber-500">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3.5 h-3.5 ${
                                  s <= review.rating
                                    ? "fill-amber-400 text-amber-500"
                                    : "text-slate-200"
                                }`}
                              />
                            ))}
                            <span className="ml-1 text-xs font-bold text-text-primary font-mono">
                              {review.rating.toFixed(1)}
                            </span>
                          </div>
                          {(review.isVerified ?? review.verified) && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <Check className="w-2.5 h-2.5 text-emerald-600" />
                              <span>Verified</span>
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Service / Subject */}
                      <td className="px-5 py-4 max-w-xs">
                        <div className="truncate text-xs font-medium text-text-primary">
                          {subjectLabel}
                        </div>
                        {serviceTitle && (
                          <div className="truncate text-[11px] text-text-muted mt-0.5">
                            {serviceTitle}
                          </div>
                        )}
                      </td>

                      {/* Featured Quick Toggle */}
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(review)}
                          disabled={updatingReviewId === review.id}
                          title={review.isFeatured ? "Unmark as featured" : "Mark as featured"}
                          aria-label={`Toggle featured for ${review.reviewerName}`}
                          className={`p-1.5 rounded-lg border transition-all ${
                            review.isFeatured
                              ? "bg-amber-50 border-amber-200 text-amber-600 shadow-2xs hover:bg-amber-100"
                              : "bg-surface border-border text-slate-300 hover:text-amber-500 hover:border-amber-200"
                          }`}
                        >
                          <Sparkles className="w-4 h-4" />
                        </button>
                      </td>

                      {/* Status & Quick Toggle */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <ReviewStatusBadge status={review.status} />
                          <select
                            value={review.status}
                            disabled={updatingReviewId === review.id}
                            onChange={(e) => handleStatusChange(review, e.target.value)}
                            title="Quick Change Status"
                            aria-label={`Change status for ${review.reviewerName}`}
                            className="bg-transparent border border-border text-[11px] text-text-secondary rounded px-1 py-0.5 hover:border-orange focus:outline-none focus:ring-1 focus:ring-orange cursor-pointer"
                          >
                            <option value="PUBLISHED">Published</option>
                            <option value="PENDING">Pending</option>
                            <option value="HIDDEN">Hidden</option>
                          </select>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 text-xs font-mono text-text-secondary whitespace-nowrap">
                        {review.reviewDate
                          ? new Date(review.reviewDate).toLocaleDateString()
                          : review.updatedAt
                          ? new Date(review.updatedAt).toLocaleDateString()
                          : "—"}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="inline-flex items-center justify-end gap-1.5">
                          {/* Edit Link */}
                          <Link
                            href={`/reviews/${review.id}/edit`}
                            aria-label={`Edit ${review.reviewerName}`}
                            className="p-1.5 text-text-secondary hover:text-orange hover:bg-canvas rounded-lg transition-colors"
                            title="Edit Review"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => setDeletingReview(review)}
                            aria-label={`Delete ${review.reviewerName}`}
                            className="p-1.5 text-text-secondary hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete Review"
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
        isOpen={Boolean(deletingReview)}
        title="Delete Client Review"
        itemName={deletingReview?.reviewerName ?? ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingReview(null)}
      />

      {/* Success Toast */}
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

      {/* Error Toast */}
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
