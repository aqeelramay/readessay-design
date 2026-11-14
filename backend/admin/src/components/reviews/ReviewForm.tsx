"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Save,
  Globe,
  Sliders,
  Star,
  MessageSquareQuote,
  UserCheck,
  Check,
  Image as ImageIcon,
} from "lucide-react";
import type { StudentReview, ReviewStatus } from "@/data/mockReviews";
import { ReviewStatusBadge } from "./ReviewStatusBadge";

interface ReviewFormProps {
  review?: StudentReview;
}

export function ReviewForm({ review }: ReviewFormProps) {
  const router = useRouter();
  const isEditing = Boolean(review);

  // Review Card Fields
  const [studentName, setStudentName] = useState(review?.studentName ?? "");
  const [rating, setRating] = useState<number>(review?.rating ?? 5);
  const [verified, setVerified] = useState<boolean>(review?.verified ?? true);
  const [quoteHeadline, setQuoteHeadline] = useState(
    review?.quoteHeadline ?? ""
  );
  const [reviewBody, setReviewBody] = useState(review?.reviewBody ?? "");
  const [courseLabel, setCourseLabel] = useState(
    review?.courseLabel ?? "Course: Business Assignment"
  );
  const [timeAgoLabel, setTimeAgoLabel] = useState(
    review?.timeAgoLabel ?? "2 days ago"
  );
  const [avatarUrl, setAvatarUrl] = useState(
    review?.avatarUrl ?? "/images/female-expert1.jpg"
  );

  // Publishing & SEO Fields
  const [status, setStatus] = useState<ReviewStatus>(
    review?.status ?? "active"
  );
  const [displayOrder, setDisplayOrder] = useState<number>(
    review?.displayOrder ?? 1
  );
  const [metaTitle, setMetaTitle] = useState(review?.seo?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(
    review?.seo?.metaDescription ?? ""
  );

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Submit Handler
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!studentName.trim()) {
      setError("Please provide a client name.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (!quoteHeadline.trim()) {
      setError("Please provide a quote headline for this review.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (!reviewBody.trim()) {
      setError("Please enter the client's full review testimonial.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmation(
        isEditing
          ? `Review for "${studentName}" updated successfully. Changes staged in local UI session.`
          : `Review for "${studentName}" created successfully. Changes staged in local UI session.`
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
            href="/reviews"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-orange transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to Reviews</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-[26px] font-bold text-text-primary tracking-tight">
              {review ? `Edit Review: ${review.studentName}` : "Add Review"}
            </h1>
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
              <span>{rating.toFixed(1)} Stars</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            {isEditing
              ? "Update client testimonial details, star rating, and verified credentials."
              : "Create a new client review testimonial and rating."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/reviews"
            className="px-4 py-2 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-canvas transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            form="review-form"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-orange hover:bg-orange-hover text-white text-xs font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-orange/40 disabled:opacity-75"
          >
            <Save className="w-4 h-4" />
            <span>
              {isSubmitting
                ? "Saving..."
                : isEditing
                ? "Save Changes"
                : "Save Review"}
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
            <span>{confirmation}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.push("/reviews")}
              className="text-xs font-semibold underline hover:text-emerald-950"
            >
              Return to Reviews
            </button>
            <button
              type="button"
              onClick={() => setConfirmation(null)}
              className="text-xs text-emerald-700 hover:text-emerald-950 px-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2.5 animate-in fade-in"
        >
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Workspace */}
      <form id="review-form" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ======================================================== */}
          {/* Left Column: Review Card Details (8 Cols)               */}
          {/* ======================================================== */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-surface border border-border rounded-xl p-6 shadow-2xs space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <MessageSquareQuote className="w-4 h-4 text-orange" />
                <div>
                  <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                    Review Card Details
                  </h2>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Configure client testimonial, star rating, and verified enrollment credentials.
                  </p>
                </div>
              </div>

              {/* Top Control Bar: Rating Stars & Verified Toggle */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-border bg-canvas/40">
                {/* Interactive Star Rating Selector */}
                <div>
                  <span className="block text-xs font-semibold text-text-primary mb-1.5">
                    Rating Star <span className="text-rose-500">*</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        key={starVal}
                        type="button"
                        onClick={() => setRating(starVal)}
                        className="p-1 hover:scale-110 transition-transform focus:outline-none"
                        title={`${starVal} Star${starVal > 1 ? "s" : ""}`}
                      >
                        <Star
                          className={`w-5 h-5 ${
                            starVal <= rating
                              ? "fill-amber-400 text-amber-500"
                              : "text-slate-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-text-primary font-mono ml-2">
                      ({rating}/5 Stars)
                    </span>
                  </div>
                </div>

                {/* Verified Student Toggle Switch / Checkbox */}
                <div>
                  <span className="block text-xs font-semibold text-text-primary mb-1.5">
                    Verification Badge
                  </span>
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={verified}
                      onChange={(e) => setVerified(e.target.checked)}
                      className="w-4 h-4 text-orange rounded border-border focus:ring-orange/30 accent-orange"
                    />
                    <span className="text-xs font-medium text-text-primary flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Verified Student Status
                    </span>
                    {verified && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Check className="w-2.5 h-2.5 text-emerald-600" />
                        <span>Active</span>
                      </span>
                    )}
                  </label>
                </div>
              </div>

              {/* Quote Headline */}
              <div>
                <label
                  htmlFor="quote-headline"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Quote Headline <span className="text-rose-500">*</span>
                </label>
                <input
                  id="quote-headline"
                  type="text"
                  required
                  value={quoteHeadline}
                  onChange={(e) => setQuoteHeadline(e.target.value)}
                  placeholder='e.g., "I literally have no words to show my gratitude."'
                  className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange font-medium"
                />
              </div>

              {/* Full Review Testimonial Textarea */}
              <div>
                <label
                  htmlFor="review-body"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Full Review Testimonial <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="review-body"
                  required
                  rows={4}
                  value={reviewBody}
                  onChange={(e) => setReviewBody(e.target.value)}
                  placeholder="Enter the client's full review testimonial, experience with specialists, turnaround satisfaction, and grade results..."
                  className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange leading-relaxed"
                />
              </div>

              {/* Client Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {/* Client Name */}
                <div>
                  <label
                    htmlFor="student-name"
                    className="block text-xs font-semibold text-text-primary mb-1.5"
                  >
                    Client Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="student-name"
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g., Isabel Pearson"
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange font-medium"
                  />
                </div>

                {/* Course / Subject */}
                <div>
                  <label
                    htmlFor="course-label"
                    className="block text-xs font-semibold text-text-primary mb-1.5"
                  >
                    Course / Subject
                  </label>
                  <input
                    id="course-label"
                    type="text"
                    value={courseLabel}
                    onChange={(e) => setCourseLabel(e.target.value)}
                    placeholder="e.g., Business Assignment"
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  />
                </div>

                {/* Time Ago */}
                <div>
                  <label
                    htmlFor="time-ago"
                    className="block text-xs font-semibold text-text-primary mb-1.5"
                  >
                    Time Ago
                  </label>
                  <input
                    id="time-ago"
                    type="text"
                    value={timeAgoLabel}
                    onChange={(e) => setTimeAgoLabel(e.target.value)}
                    placeholder="e.g., 2 days ago"
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  />
                </div>
              </div>

              {/* Avatar URL with Live Circular Preview */}
              <div>
                <label
                  htmlFor="avatar-url"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Avatar URL
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-slate-100 border border-border flex items-center justify-center shrink-0 overflow-hidden font-bold text-xs text-text-secondary shadow-2xs">
                    {avatarUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={avatarUrl}
                        alt={studentName || "Avatar"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display =
                            "none";
                        }}
                      />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-text-muted" />
                    )}
                  </div>
                  <input
                    id="avatar-url"
                    type="text"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="e.g., /images/female-expert1.jpg"
                    className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  />
                </div>
                <p className="text-[11px] text-text-muted mt-1.5">
                  Path or URL to the client&apos;s verified display photo.
                </p>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* Right Column: Sticky Sidebar (4 Cols)                   */}
          {/* ======================================================== */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
            {/* 1. Publishing & Visibility Card */}
            <div className="bg-surface border border-border rounded-xl p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <Sliders className="w-4 h-4 text-orange" />
                <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                  Publishing &amp; Visibility
                </h2>
              </div>

              {/* Status Selector */}
              <div>
                <label
                  htmlFor="review-status"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Review Status
                </label>
                <div className="flex items-center gap-2.5">
                  <select
                    id="review-status"
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value as ReviewStatus)
                    }
                    className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                  >
                    <option value="active">Active (Published)</option>
                    <option value="draft">Draft (Unlisted)</option>
                    <option value="archived">Archived</option>
                  </select>
                  <ReviewStatusBadge status={status} />
                </div>
              </div>

              {/* Display Order */}
              <div>
                <label
                  htmlFor="review-order"
                  className="block text-xs font-semibold text-text-primary mb-1.5"
                >
                  Display Order
                </label>
                <input
                  id="review-order"
                  type="number"
                  min={1}
                  max={99}
                  value={displayOrder}
                  onChange={(e) =>
                    setDisplayOrder(parseInt(e.target.value, 10) || 1)
                  }
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                />
              </div>

              {/* Content Metrics */}
              <div className="p-3 rounded-lg border border-border bg-canvas/40 space-y-2 text-xs">
                <div className="flex items-center justify-between text-text-secondary">
                  <span>Rating Assigned:</span>
                  <span className="font-semibold text-amber-700">
                    {rating} / 5 Stars
                  </span>
                </div>
                <div className="flex items-center justify-between text-text-secondary">
                  <span>Verified Client:</span>
                  <span
                    className={`font-semibold ${
                      verified ? "text-emerald-700" : "text-text-muted"
                    }`}
                  >
                    {verified ? "Yes" : "No"}
                  </span>
                </div>
              </div>

              {/* Metadata */}
              <div className="pt-3 border-t border-border text-xs text-text-muted space-y-1">
                <p>
                  Last Updated:{" "}
                  <span className="font-mono text-text-secondary">
                    {review?.updatedAt || "Not yet saved"}
                  </span>
                </p>
                <p>Type: Individual Client Review</p>
              </div>
            </div>

            {/* 2. SEO & Search Metadata Card */}
            <div className="bg-surface border border-border rounded-xl p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <Globe className="w-4 h-4 text-orange" />
                <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                  SEO &amp; Search Snippet
                </h2>
              </div>

              {/* Meta Title */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="meta-title"
                    className="block text-xs font-semibold text-text-primary"
                  >
                    Meta Title
                  </label>
                  <span
                    className={`text-[10px] font-mono ${
                      metaTitle.length > 60
                        ? "text-amber-600 font-bold"
                        : "text-text-muted"
                    }`}
                  >
                    {metaTitle.length}/60
                  </span>
                </div>
                <input
                  id="meta-title"
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder={`${
                    studentName || "Student"
                  } Review — Verified Testimonial | ReadEssay`}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                />
              </div>

              {/* Meta Description */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="meta-desc"
                    className="block text-xs font-semibold text-text-primary"
                  >
                    Meta Description
                  </label>
                  <span
                    className={`text-[10px] font-mono ${
                      metaDescription.length > 160
                        ? "text-amber-600 font-bold"
                        : "text-text-muted"
                    }`}
                  >
                    {metaDescription.length}/160
                  </span>
                </div>
                <textarea
                  id="meta-desc"
                  rows={3}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Read verified student testimonial and feedback on ReadEssay's academic research and writing services..."
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange"
                />
              </div>

              {/* Live Google Search Snippet Preview */}
              <div className="pt-3 border-t border-border">
                <span className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">
                  Live Search Engine Preview
                </span>
                <div className="p-3.5 rounded-lg border border-border bg-[#F8F9FA] space-y-1 font-sans">
                  {/* Google Breadcrumb */}
                  <div className="text-[11px] text-[#202124] flex items-center gap-1.5 truncate">
                    <span className="text-[#5f6368]">readessay.com</span>
                    <span className="text-[#5f6368]">&gt;</span>
                    <span className="text-[#5f6368]">reviews</span>
                    <span className="text-[#5f6368]">&gt;</span>
                    <span className="text-[#202124]">
                      {studentName
                        ? studentName.toLowerCase().replace(/\s+/g, "-")
                        : "client-review"}
                    </span>
                  </div>

                  {/* Google Title */}
                  <div className="text-sm text-[#1a0dab] font-medium leading-snug truncate hover:underline cursor-pointer">
                    {metaTitle ||
                      `${
                        studentName || "Verified Student"
                      } Review — ReadEssay Testimonial`}
                  </div>

                  {/* Google Snippet */}
                  <div className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                    {metaDescription ||
                      reviewBody ||
                      quoteHeadline ||
                      "Explore genuine student feedback and discover why university students trust ReadEssay for reliable academic support."}
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
