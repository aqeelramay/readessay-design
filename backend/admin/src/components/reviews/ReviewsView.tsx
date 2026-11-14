"use client";

import { useState, useMemo } from "react";
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
} from "lucide-react";
import {
  INITIAL_REVIEWS,
  type StudentReview,
} from "@/data/mockReviews";
import { ReviewStatusBadge } from "./ReviewStatusBadge";
import { DeleteConfirmModal } from "@/components/services/DeleteConfirmModal";

export function ReviewsView() {
  // Individual reviews state initialized with mock data
  const [reviews, setReviews] = useState<StudentReview[]>(INITIAL_REVIEWS);

  // Search and Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Modal state
  const [deletingReview, setDeletingReview] = useState<StudentReview | null>(
    null
  );

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }

  // Filtered reviews list
  const filteredReviews = useMemo(() => {
    return reviews
      .filter((review) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          review.studentName.toLowerCase().includes(query) ||
          review.courseLabel.toLowerCase().includes(query) ||
          review.quoteHeadline.toLowerCase().includes(query) ||
          review.reviewBody.toLowerCase().includes(query);

        const matchesStatus =
          statusFilter === "all" || review.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [reviews, searchQuery, statusFilter]);

  // Handle Delete
  function handleConfirmDelete() {
    if (!deletingReview) return;

    const studentName = deletingReview.studentName;
    const reviewId = deletingReview.id;

    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    setDeletingReview(null);
    showToast(`Deleted review from "${studentName}".`);
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-text-primary tracking-tight">
              Reviews
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
              <span>4.92 ★ (2.4k)</span>
            </span>
          </div>
          <p className="text-sm text-text-secondary mt-1">
            Manage individual client reviews, star ratings, and verified student feedback.
          </p>
        </div>

        <Link
          href="/reviews/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-orange hover:bg-orange-hover text-white text-sm font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Review</span>
        </Link>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div
          role="status"
          className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between gap-3 animate-in fade-in"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-xs text-emerald-700 hover:text-emerald-950 font-semibold px-1"
          >
            ✕
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
            placeholder="Search by client name, course, or quote..."
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
            {filteredReviews.length}{" "}
            {filteredReviews.length === 1 ? "Review" : "Reviews"}
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
                  Client Name
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Review Star
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
              {filteredReviews.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-text-secondary"
                  >
                    <User className="w-8 h-8 text-text-muted mx-auto mb-2 opacity-50" />
                    <p className="font-medium text-text-primary">
                      No client reviews found
                    </p>
                    <p className="text-xs text-text-muted mt-1">
                      Try clearing search filters or add a new client review.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredReviews.map((review) => {
                  return (
                    <tr
                      key={review.id}
                      className="hover:bg-canvas/50 transition-colors group"
                    >
                      {/* Client Name + Avatar + Course & Quote Preview */}
                      <td className="px-5 py-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 border border-border flex items-center justify-center shrink-0 overflow-hidden font-bold text-xs text-text-secondary shadow-2xs">
                            {review.avatarUrl ? (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img
                                src={review.avatarUrl}
                                alt={review.studentName}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).style.display =
                                    "none";
                                }}
                              />
                            ) : (
                              review.studentName.slice(0, 2).toUpperCase()
                            )}
                          </div>
                          <div className="min-w-0">
                            <Link
                              href={`/reviews/${review.id}/edit`}
                              className="font-bold text-text-primary hover:text-orange transition-colors block text-sm"
                            >
                              {review.studentName}
                            </Link>
                            <div className="flex items-center gap-2 mt-0.5 text-xs text-text-secondary truncate">
                              <span className="font-medium text-text-secondary">
                                {review.courseLabel}
                              </span>
                              <span className="text-text-muted">•</span>
                              <span className="text-text-muted truncate max-w-sm italic">
                                {review.quoteHeadline}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Review Star + Rating + Verified Pill */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
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
                          {review.verified && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <Check className="w-2.5 h-2.5 text-emerald-600" />
                              <span>Verified</span>
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <ReviewStatusBadge status={review.status} />
                      </td>

                      {/* Updated Date */}
                      <td className="px-5 py-4">
                        <span className="text-xs font-mono text-text-secondary">
                          {review.updatedAt}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 opacity-90 group-hover:opacity-100">
                          <Link
                            href={`/reviews/${review.id}/edit`}
                            aria-label={`Edit ${review.studentName}`}
                            className="p-1.5 text-text-secondary hover:text-orange hover:bg-canvas rounded-md transition-colors"
                            title="Edit Review"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => setDeletingReview(review)}
                            aria-label={`Delete ${review.studentName}`}
                            className="p-1.5 text-text-secondary hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
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
        itemName={deletingReview?.studentName ?? ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingReview(null)}
      />
    </div>
  );
}
