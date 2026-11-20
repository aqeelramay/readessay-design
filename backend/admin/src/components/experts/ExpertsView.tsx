"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  CheckCircle2,
  Filter,
  Star,
  GraduationCap,
  Sparkles,
  AlertCircle,
  RefreshCw,
  BookOpen,
} from "lucide-react";
import {
  getAdminExperts,
  updateExpert,
  deleteExpert,
  type ExpertItem,
} from "@/lib/experts-api";

export function ExpertsView() {
  const [experts, setExperts] = useState<ExpertItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [featuredFilter, setFeaturedFilter] = useState<string>("all");

  // Deletion modal & toggling
  const [deletingExpert, setDeletingExpert] = useState<ExpertItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  }

  function showError(msg: string) {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(null), 6000);
  }

  const loadExperts = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const data = await getAdminExperts();
      setExperts(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load experts.";
      setLoadError(msg);
      showError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadExperts();
    }, 0);
    return () => clearTimeout(timer);
  }, [loadExperts]);

  // Quick toggle featured
  const handleToggleFeatured = async (expert: ExpertItem) => {
    setUpdatingId(expert.id);
    try {
      const updated = await updateExpert(expert.id, {
        isFeatured: !expert.isFeatured,
      });
      setExperts((prev) =>
        prev.map((e) => (e.id === expert.id ? { ...e, isFeatured: updated.isFeatured } : e))
      );
      showToast(
        `Expert "${expert.name}" ${updated.isFeatured ? "featured" : "unfeatured"}.`
      );
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "Failed to update featured status.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Quick toggle status (published / draft)
  const handleToggleStatus = async (expert: ExpertItem) => {
    setUpdatingId(expert.id);
    const nextStatus = expert.status === "published" ? "draft" : "published";
    try {
      const updated = await updateExpert(expert.id, {
        status: nextStatus,
      });
      setExperts((prev) =>
        prev.map((e) => (e.id === expert.id ? { ...e, status: updated.status } : e))
      );
      showToast(`Expert "${expert.name}" status set to ${updated.status}.`);
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete expert
  const handleDeleteConfirm = async () => {
    if (!deletingExpert) return;
    setIsDeleting(true);
    try {
      await deleteExpert(deletingExpert.id);
      setExperts((prev) => prev.filter((e) => e.id !== deletingExpert.id));
      showToast(`Expert "${deletingExpert.name}" deleted successfully.`);
      setDeletingExpert(null);
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "Failed to delete expert.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered view
  const filteredExperts = useMemo(() => {
    return experts.filter((exp) => {
      if (statusFilter !== "all" && exp.status !== statusFilter) return false;
      if (featuredFilter === "featured" && !exp.isFeatured) return false;
      if (featuredFilter === "standard" && exp.isFeatured) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = exp.name.toLowerCase().includes(q);
        const matchesRole = exp.roleTitle.toLowerCase().includes(q);
        const matchesUni = exp.university.toLowerCase().includes(q);
        const matchesSpecs = Array.isArray(exp.specialties) &&
          exp.specialties.some((s) => s.toLowerCase().includes(q));
        if (!matchesName && !matchesRole && !matchesUni && !matchesSpecs) {
          return false;
        }
      }
      return true;
    });
  }, [experts, statusFilter, featuredFilter, searchQuery]);

  // Statistics
  const totalCount = experts.length;
  const publishedCount = experts.filter((e) => e.status === "published").length;
  const featuredCount = experts.filter((e) => e.isFeatured).length;
  const avgRating =
    totalCount > 0
      ? (experts.reduce((acc, e) => acc + (e.rating || 0), 0) / totalCount).toFixed(2)
      : "5.0";

  return (
    <div className="space-y-6">
      {/* Toast notifications */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-xl shadow-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
      {errorMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-rose-600 text-white rounded-xl shadow-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <GraduationCap className="w-7 h-7 text-[#FF641A]" />
            <span>Top Experts Roster</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Manage Ph.D. &amp; Master&apos;s subject specialists, academic credentials, ratings, and featured directory presence.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={loadExperts}
            disabled={isLoading}
            className="px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs font-semibold flex items-center gap-1.5"
            title="Refresh experts list"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
          <Link
            href="/experts/new"
            className="px-4 py-2.5 rounded-xl bg-[#FF641A] hover:bg-[#E8540E] text-white transition-colors text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-[#FF641A]/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Expert</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Total Experts
          </span>
          <span className="text-2xl font-black text-white mt-1 block">
            {totalCount}
          </span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
            Published
          </span>
          <span className="text-2xl font-black text-emerald-400 mt-1 block">
            {publishedCount}
          </span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider block">
            Featured
          </span>
          <span className="text-2xl font-black text-purple-400 mt-1 block">
            {featuredCount}
          </span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block">
            Average Rating
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-2xl font-black text-amber-400">{avgRating}</span>
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by expert name, university, degree, or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-800/80 border border-slate-700/80 rounded-lg text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#FF641A]"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-2 bg-slate-800/80 border border-slate-700/80 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select
            value={featuredFilter}
            onChange={(e) => setFeaturedFilter(e.target.value)}
            className="px-2.5 py-2 bg-slate-800/80 border border-slate-700/80 rounded-lg text-white text-xs focus:outline-none focus:border-[#FF641A]"
          >
            <option value="all">All Spotlight</option>
            <option value="featured">Featured Only</option>
            <option value="standard">Standard</option>
          </select>
        </div>
      </div>

      {/* Experts Grid */}
      {isLoading ? (
        <div className="p-16 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#FF641A] mb-3" />
          <p className="text-sm">Loading academic specialists roster...</p>
        </div>
      ) : loadError ? (
        <div className="p-8 text-center rounded-2xl bg-rose-950/20 border border-rose-900/40 text-rose-300 space-y-3">
          <AlertCircle className="w-8 h-8 mx-auto text-rose-400" />
          <p className="text-sm font-semibold">{loadError}</p>
          <button
            type="button"
            onClick={loadExperts}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
          >
            Retry Connection
          </button>
        </div>
      ) : filteredExperts.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 space-y-3">
          <BookOpen className="w-10 h-10 mx-auto text-slate-500" />
          <p className="text-sm font-semibold text-slate-300">No experts found</p>
          <p className="text-xs text-slate-500">
            {searchQuery || statusFilter !== "all" || featuredFilter !== "all"
              ? "Try adjusting your search query or status filter."
              : "Get started by adding your first academic faculty member."}
          </p>
          <Link
            href="/experts/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF641A] text-white text-xs font-semibold hover:bg-[#E8540E] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Expert</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExperts.map((expert) => (
            <div
              key={expert.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all group"
            >
              <div>
                {/* Top Row: Avatar, Name & Status */}
                <div className="flex items-start justify-between gap-3 mb-3.5">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
                      {expert.avatarUrl ? (
                        <Image
                          src={expert.avatarUrl}
                          alt={expert.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-sm bg-slate-800">
                          {expert.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm group-hover:text-[#FF641A] transition-colors">
                        {expert.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-medium line-clamp-1">
                        {expert.degree}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(expert)}
                      disabled={updatingId === expert.id}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border transition-colors ${
                        expert.status === "published"
                          ? "bg-emerald-950/40 border-emerald-800/60 text-emerald-400 hover:bg-emerald-900/50"
                          : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700"
                      }`}
                      title="Click to toggle status"
                    >
                      {expert.status === "published" ? "Published" : "Draft"}
                    </button>
                    {expert.isFeatured && (
                      <span className="p-1 rounded-full bg-purple-950/50 text-purple-400 border border-purple-800/50" title="Featured Expert">
                        <Sparkles className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Role and University */}
                <div className="space-y-1 mb-3.5">
                  <p className="text-xs font-semibold text-slate-200 line-clamp-1">
                    {expert.roleTitle}
                  </p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 line-clamp-1">
                    <GraduationCap className="w-3.5 h-3.5 text-[#FF641A] shrink-0" />
                    <span>{expert.university}</span>
                  </p>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-1.5 py-2 px-2.5 bg-slate-800/60 rounded-xl border border-slate-800 mb-3.5 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Rating</span>
                    <span className="text-xs font-bold text-amber-400 flex items-center justify-center gap-0.5 mt-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{expert.rating.toFixed(2)}</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Orders</span>
                    <span className="text-xs font-bold text-white mt-0.5 block">
                      {expert.completedOrders}+
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Success</span>
                    <span className="text-xs font-bold text-emerald-400 mt-0.5 block">
                      {expert.successRate}
                    </span>
                  </div>
                </div>

                {/* Specialties Pills */}
                {Array.isArray(expert.specialties) && expert.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3.5">
                    {expert.specialties.slice(0, 3).map((spec, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-medium border border-slate-700/60"
                      >
                        {spec}
                      </span>
                    ))}
                    {expert.specialties.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-400 text-[10px] font-medium border border-slate-700/60">
                        +{expert.specialties.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                  <span>Order: #{expert.displayOrder}</span>
                  <button
                    type="button"
                    onClick={() => handleToggleFeatured(expert)}
                    disabled={updatingId === expert.id}
                    className={`hover:underline cursor-pointer ${
                      expert.isFeatured ? "text-purple-400 font-medium" : "text-slate-500"
                    }`}
                  >
                    {expert.isFeatured ? "★ Featured" : "☆ Feature"}
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <Link
                    href={`/experts/${expert.id}/edit`}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Edit expert"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setDeletingExpert(expert)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-400 transition-colors cursor-pointer"
                    title="Delete expert"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingExpert && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-10 h-10 rounded-xl bg-rose-950/50 border border-rose-800/60 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Delete Academic Expert?</h3>
                <p className="text-slate-400 text-xs mt-0.5">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed bg-slate-800/60 p-3.5 rounded-xl border border-slate-800">
              Are you sure you want to delete <strong className="text-white">{deletingExpert.name}</strong> ({deletingExpert.degree}) from the faculty roster?
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeletingExpert(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-md shadow-rose-900/30"
              >
                {isDeleting && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                <span>{isDeleting ? "Deleting..." : "Delete Permanently"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
