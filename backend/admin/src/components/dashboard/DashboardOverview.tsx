"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Wrench,
  MessageSquareQuote,
  BookOpen,
  FileText,
  Calculator,
  Plus,
  ArrowRight,
  ExternalLink,
  Pencil,
  Star,
  RefreshCw,
  AlertCircle,
  FileSpreadsheet,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getDashboardStats, type DashboardStatsResponse } from "@/lib/api";
import { ModuleGrid } from "./ModuleGrid";

export function DashboardOverview() {
  const { user } = useAuth();
  const name = user?.fullName || "Aqeel (Super Admin)";

  const [stats, setStats] = useState<DashboardStatsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = () => {
    setIsLoading(true);
    setError(null);
    getDashboardStats()
      .then((data) => {
        setStats(data);
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : "Failed to load dashboard metrics";
        setError(msg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    let isMounted = true;
    getDashboardStats()
      .then((data) => {
        if (isMounted) {
          setStats(data);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : "Failed to load dashboard metrics";
          setError(msg);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* 1. WELCOME & QUICK ACTIONS HERO */}
      <section
        aria-label="Welcome and operational status"
        className="bg-surface border border-border rounded-2xl shadow-xs p-6 sm:p-7 relative overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>SYSTEM OPERATIONAL • POSTGRESQL CONNECTED</span>
            </div>
            <h1 className="text-2xl sm:text-[28px] font-bold text-text-primary tracking-tight">
              Welcome, {name}
            </h1>
            <p className="text-sm text-text-secondary max-w-xl mt-1 leading-relaxed">
              Real-time administrative control center. Live database metrics across academic services, reviews, exemplar repository, publications, and dynamic order pricing.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/services/new"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface border border-border text-xs font-semibold text-text-primary hover:text-orange hover:border-orange/40 hover:bg-canvas transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5 text-orange" />
              <span>New Service</span>
            </Link>
            <Link
              href="/samples/items/new"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface border border-border text-xs font-semibold text-text-primary hover:text-emerald-600 hover:border-emerald-500/40 hover:bg-canvas transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-500" />
              <span>New Sample</span>
            </Link>
            <Link
              href="/blog/new"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface border border-border text-xs font-semibold text-text-primary hover:text-teal-600 hover:border-teal-500/40 hover:bg-canvas transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5 text-teal-500" />
              <span>New Article</span>
            </Link>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-orange text-white text-xs font-bold hover:bg-orange-hover transition-colors shadow-xs shadow-orange/20"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Pricing Matrix</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. LIVE KPI CARDS */}
      {error ? (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Failed to load live metrics: {error}</span>
          </div>
          <button
            onClick={fetchStats}
            className="inline-flex items-center gap-1 font-semibold underline hover:no-underline"
          >
            <RefreshCw className="w-3 h-3" /> Retry
          </button>
        </div>
      ) : (
        <section aria-label="Core Operational Metrics" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary">
              Core Live Metrics
            </h2>
            <button
              onClick={fetchStats}
              title="Refresh Stats"
              className="p-1 rounded text-text-muted hover:text-text-primary transition-colors text-xs inline-flex items-center gap-1"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
              <span className="text-[11px]">Sync Database</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Card 1: Services */}
            <Link
              href="/services"
              className="group bg-surface border border-border rounded-xl p-5 shadow-2xs hover:shadow-xs hover:border-blue-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
                    {isLoading ? "..." : `${stats?.services.publishedServices} Live`}
                  </span>
                </div>
                <div className="text-2xl font-bold text-text-primary tracking-tight font-poppins">
                  {isLoading ? (
                    <span className="inline-block w-12 h-7 bg-border animate-pulse rounded" />
                  ) : (
                    stats?.services.totalServices
                  )}
                </div>
                <div className="text-xs font-semibold text-text-secondary mt-0.5">
                  Academic Services
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-text-muted">
                <span>
                  {isLoading ? "..." : `${stats?.services.totalSubServices} Sub-Services`}
                </span>
                <span className="text-orange group-hover:translate-x-0.5 transition-transform">
                  &rarr;
                </span>
              </div>
            </Link>

            {/* Card 2: Reviews */}
            <Link
              href="/reviews"
              className="group bg-surface border border-border rounded-xl p-5 shadow-2xs hover:shadow-xs hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <MessageSquareQuote className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{isLoading ? "..." : `${stats?.reviews.averageRating}`}</span>
                  </span>
                </div>
                <div className="text-2xl font-bold text-text-primary tracking-tight font-poppins">
                  {isLoading ? (
                    <span className="inline-block w-12 h-7 bg-border animate-pulse rounded" />
                  ) : (
                    stats?.reviews.totalReviews
                  )}
                </div>
                <div className="text-xs font-semibold text-text-secondary mt-0.5">
                  Verified Reviews
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-text-muted">
                <span>
                  {isLoading ? "..." : `${stats?.reviews.featuredReviews} Featured`}
                </span>
                <span className="text-orange group-hover:translate-x-0.5 transition-transform">
                  &rarr;
                </span>
              </div>
            </Link>

            {/* Card 3: Samples */}
            <Link
              href="/samples"
              className="group bg-surface border border-border rounded-xl p-5 shadow-2xs hover:shadow-xs hover:border-emerald-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    {isLoading ? "..." : `${stats?.samples.activeSections} Disciplines`}
                  </span>
                </div>
                <div className="text-2xl font-bold text-text-primary tracking-tight font-poppins">
                  {isLoading ? (
                    <span className="inline-block w-12 h-7 bg-border animate-pulse rounded" />
                  ) : (
                    stats?.samples.totalSamples
                  )}
                </div>
                <div className="text-xs font-semibold text-text-secondary mt-0.5">
                  Sample Exemplars
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-text-muted">
                <span>
                  {isLoading ? "..." : `${stats?.samples.totalPagesArchived} Pages Archived`}
                </span>
                <span className="text-orange group-hover:translate-x-0.5 transition-transform">
                  &rarr;
                </span>
              </div>
            </Link>

            {/* Card 4: Blog */}
            <Link
              href="/blog"
              className="group bg-surface border border-border rounded-xl p-5 shadow-2xs hover:shadow-xs hover:border-teal-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full">
                    {isLoading ? "..." : `${stats?.blog.totalCategories} Categories`}
                  </span>
                </div>
                <div className="text-2xl font-bold text-text-primary tracking-tight font-poppins">
                  {isLoading ? (
                    <span className="inline-block w-12 h-7 bg-border animate-pulse rounded" />
                  ) : (
                    stats?.blog.totalPosts
                  )}
                </div>
                <div className="text-xs font-semibold text-text-secondary mt-0.5">
                  Articles Published
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-text-muted">
                <span>
                  {isLoading ? "..." : `${stats?.blog.publishedPosts} Active Posts`}
                </span>
                <span className="text-orange group-hover:translate-x-0.5 transition-transform">
                  &rarr;
                </span>
              </div>
            </Link>

            {/* Card 5: Calculator */}
            <Link
              href="/calculator"
              className="group bg-surface border border-border rounded-xl p-5 shadow-2xs hover:shadow-xs hover:border-orange/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-orange/10 text-orange flex items-center justify-center">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-orange bg-orange/10 px-2 py-0.5 rounded-full">
                    {isLoading ? "..." : `${stats?.calculator.wordsPerPage} w/p`}
                  </span>
                </div>
                <div className="text-2xl font-bold text-text-primary tracking-tight font-poppins">
                  {isLoading ? (
                    <span className="inline-block w-12 h-7 bg-border animate-pulse rounded" />
                  ) : (
                    stats?.calculator.totalRateCells
                  )}
                </div>
                <div className="text-xs font-semibold text-text-secondary mt-0.5">
                  Rate Matrix Cells
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-text-muted">
                <span>
                  {isLoading
                    ? "..."
                    : `Base: ${stats?.calculator.currencySymbol}${stats?.calculator.sampleBaseRate}/p`}
                </span>
                <span className="text-orange group-hover:translate-x-0.5 transition-transform">
                  &rarr;
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* 3. RECENT CONTENT & ACTIVITY SECTION */}
      <section aria-label="Recent Workspace Content" className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary">
          Recent Activity &amp; Content Feeds
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (7 cols): Recent Blog Posts & Recent Samples */}
          <div className="lg:col-span-7 space-y-6">
            {/* Table A: Recent Blog Posts */}
            <div className="bg-surface border border-border rounded-xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-teal-500" />
                  <h3 className="text-sm font-bold text-text-primary">Recent Articles</h3>
                </div>
                <Link
                  href="/blog"
                  className="text-xs font-semibold text-orange hover:underline flex items-center gap-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="divide-y divide-border/60 text-xs">
                {isLoading ? (
                  <div className="py-6 text-center text-text-muted text-xs">Loading posts...</div>
                ) : !stats?.recent.posts || stats.recent.posts.length === 0 ? (
                  <div className="py-6 text-center text-text-muted">No posts found.</div>
                ) : (
                  stats.recent.posts.map((post) => (
                    <div
                      key={post.id}
                      className="py-2.5 flex items-center justify-between gap-3 hover:bg-canvas/50 px-2 rounded-lg transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/blog/${post.slug}/edit`}
                          className="font-semibold text-text-primary hover:text-orange transition-colors truncate block"
                          title={post.title}
                        >
                          {post.title}
                        </Link>
                        <div className="flex items-center gap-2 text-[11px] text-text-muted mt-0.5">
                          {post.category && (
                            <span className="text-teal-600 dark:text-teal-400 font-medium">
                              {post.category.name}
                            </span>
                          )}
                          <span>&bull;</span>
                          <span>{post.publishedAt || "Recently updated"}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            post.status === "published"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          }`}
                        >
                          {post.status}
                        </span>
                        <Link
                          href={`/blog/${post.slug}/edit`}
                          className="p-1 rounded text-text-muted hover:text-text-primary"
                          title="Edit Post"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Table B: Recent Academic Samples */}
            <div className="bg-surface border border-border rounded-xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-500" />
                  <h3 className="text-sm font-bold text-text-primary">Recent Exemplars</h3>
                </div>
                <Link
                  href="/samples/items"
                  className="text-xs font-semibold text-orange hover:underline flex items-center gap-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="divide-y divide-border/60 text-xs">
                {isLoading ? (
                  <div className="py-6 text-center text-text-muted text-xs">Loading samples...</div>
                ) : !stats?.recent.samples || stats.recent.samples.length === 0 ? (
                  <div className="py-6 text-center text-text-muted">No samples found.</div>
                ) : (
                  stats.recent.samples.map((sample) => (
                    <div
                      key={sample.id}
                      className="py-2.5 flex items-center justify-between gap-3 hover:bg-canvas/50 px-2 rounded-lg transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/samples/items/${sample.id}/edit`}
                          className="font-semibold text-text-primary hover:text-orange transition-colors truncate block"
                          title={sample.title}
                        >
                          {sample.title}
                        </Link>
                        <div className="flex items-center gap-2 text-[11px] text-text-muted mt-0.5">
                          {sample.section && (
                            <span className="text-emerald-600 dark:text-emerald-400 font-medium truncate max-w-[160px]">
                              {sample.section.heading}
                            </span>
                          )}
                          <span>&bull;</span>
                          <span>
                            {sample.academicLevel} &bull; {sample.pageCount} pages ({sample.fileType})
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            sample.status === "active"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          }`}
                        >
                          {sample.status}
                        </span>
                        <Link
                          href={`/samples/items/${sample.id}/edit`}
                          className="p-1 rounded text-text-muted hover:text-text-primary"
                          title="Edit Sample"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Recent Reviews */}
          <div className="lg:col-span-5">
            <div className="bg-surface border border-border rounded-xl p-5 shadow-xs space-y-3 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MessageSquareQuote className="w-4 h-4 text-amber-500" />
                    <h3 className="text-sm font-bold text-text-primary">Recent Student Reviews</h3>
                  </div>
                  <Link
                    href="/reviews"
                    className="text-xs font-semibold text-orange hover:underline flex items-center gap-1"
                  >
                    <span>Moderate</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="divide-y divide-border/60 text-xs">
                  {isLoading ? (
                    <div className="py-6 text-center text-text-muted text-xs">Loading reviews...</div>
                  ) : !stats?.recent.reviews || stats.recent.reviews.length === 0 ? (
                    <div className="py-6 text-center text-text-muted">No reviews found.</div>
                  ) : (
                    stats.recent.reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="py-3 flex items-start justify-between gap-3 hover:bg-canvas/50 px-2 rounded-lg transition-colors"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-text-primary">{rev.reviewerName}</span>
                            <div className="flex items-center text-amber-500 text-[10px]">
                              {Array.from({ length: rev.rating }).map((_, i) => (
                                <Star key={i} className="w-2.5 h-2.5 fill-current" />
                              ))}
                            </div>
                          </div>
                          <p className="text-[11px] text-text-muted truncate mt-0.5">
                            {rev.serviceName}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold shrink-0 ${
                            rev.status === "PUBLISHED"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          }`}
                        >
                          {rev.status}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-border/60">
                <Link
                  href="/reviews"
                  className="w-full py-2 px-3 rounded-lg bg-canvas hover:bg-border/40 text-text-secondary hover:text-text-primary text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Review Moderation Queue</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WORKSPACE MANAGEMENT MODULES GRID */}
      <ModuleGrid stats={stats} />
    </div>
  );
}
