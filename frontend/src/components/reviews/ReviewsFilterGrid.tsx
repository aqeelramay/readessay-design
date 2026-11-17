'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { PublicReview } from '@/lib/public-api';
import { resolveReviewAvatar } from '@/lib/data-fetchers';

interface ReviewsFilterGridProps {
  initialReviews: PublicReview[];
}

export default function ReviewsFilterGrid({ initialReviews }: ReviewsFilterGridProps) {
  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Rating counts for pills
  const ratingCounts = useMemo(() => {
    const counts = { all: initialReviews.length, 5: 0, 4: 0 };
    for (const r of initialReviews) {
      const star = Math.round(r.rating);
      if (star === 5) counts[5]++;
      if (star === 4) counts[4]++;
    }
    return counts;
  }, [initialReviews]);

  // Academic levels found in dataset
  const academicLevels = useMemo(() => {
    const levels = new Set<string>();
    for (const r of initialReviews) {
      if (r.academicLevel) {
        levels.add(r.academicLevel);
      }
    }
    return Array.from(levels);
  }, [initialReviews]);

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    return initialReviews.filter((r) => {
      // Rating filter
      if (selectedRating !== 'all') {
        const star = Math.round(r.rating);
        if (star !== selectedRating) return false;
      }

      // Academic level filter
      if (selectedLevel !== 'all') {
        if (!r.academicLevel || !r.academicLevel.toLowerCase().includes(selectedLevel.toLowerCase())) {
          return false;
        }
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const haystack = [
          r.reviewerName,
          r.clientName,
          r.title,
          r.quoteHeadline,
          r.comment,
          r.subject,
          r.courseLabel,
          r.paperType,
          r.orderRef,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [initialReviews, selectedRating, selectedLevel, searchQuery]);

  const hasActiveFilters = selectedRating !== 'all' || selectedLevel !== 'all' || searchQuery.trim().length > 0;

  const resetFilters = () => {
    setSelectedRating('all');
    setSelectedLevel('all');
    setSearchQuery('');
  };

  return (
    <div className="w-full space-y-8">
      {/* Filter Controls Bar */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-5">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <span className="material-symbols-outlined text-[20px] text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by subject, review content, or student name..."
              className="w-full h-11 pl-11 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-sm text-[#243445] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF641A] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Clear search"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          {/* Academic Level Dropdown */}
          <div className="flex items-center gap-3">
            <label htmlFor="academic-level-select" className="text-xs font-semibold text-slate-500 uppercase tracking-wider shrink-0">
              Academic Level:
            </label>
            <div className="relative min-w-[180px]">
              <select
                id="academic-level-select"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-8 text-sm font-medium text-[#243445] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF641A]"
              >
                <option value="all">All Academic Levels</option>
                {academicLevels.length > 0 ? (
                  academicLevels.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="master">Master&apos;s</option>
                    <option value="phd">Doctoral / PhD</option>
                  </>
                )}
              </select>
              <span className="material-symbols-outlined text-[18px] text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* Rating Filter Pills & Reset Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">
              Rating:
            </span>
            <button
              type="button"
              onClick={() => setSelectedRating('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedRating === 'all'
                  ? 'bg-[#FF641A] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Ratings ({ratingCounts.all})
            </button>
            <button
              type="button"
              onClick={() => setSelectedRating(5)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                selectedRating === 5
                  ? 'bg-[#FF641A] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>5 Stars</span>
              <span className="text-amber-300">★★★★★</span>
              <span>({ratingCounts[5]})</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRating(4)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                selectedRating === 4
                  ? 'bg-[#FF641A] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>4 Stars</span>
              <span className="text-amber-300">★★★★☆</span>
              <span>({ratingCounts[4]})</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-medium">
              Showing <strong className="text-[#243445]">{filteredReviews.length}</strong> of{' '}
              {initialReviews.length} reviews
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold text-[#FF641A] hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">refresh</span>
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      {filteredReviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review, idx) => {
            const avatarSrc = review.reviewerAvatar
              ? review.reviewerAvatar
              : resolveReviewAvatar(undefined, idx);

            return (
              <article
                key={review.id || `rev-${idx}`}
                className="bg-white rounded-3xl p-7 flex flex-col justify-between border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {/* Star Icons */}
                    <div className="flex items-center space-x-0.5 text-[#FF641A]">
                      {Array.from({ length: 5 }).map((_, starIdx) => {
                        const filled = starIdx < Math.round(review.rating);
                        return (
                          <span
                            key={starIdx}
                            className={`material-symbols-outlined text-[18px] ${
                              filled ? 'text-[#FF641A]' : 'text-slate-200'
                            }`}
                            style={{ fontVariationSettings: '"FILL" 1' }}
                          >
                            star
                          </span>
                        );
                      })}
                    </div>

                    {/* Verified Badge */}
                    {review.isVerified && (
                      <span className="inline-flex items-center text-[11px] font-semibold text-[#059669] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full">
                        <svg className="w-3 h-3 mr-1 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            clipRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            fillRule="evenodd"
                          />
                        </svg>
                        Verified Student
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-bold text-base text-[#243445] mb-2 leading-snug">
                    {review.title || review.quoteHeadline || 'Exceptional Quality & Support'}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    {review.comment}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0 bg-gradient-to-tr from-[#FF641A] to-amber-200 text-white font-bold flex items-center justify-center text-sm shadow-sm font-heading">
                      {avatarSrc ? (
                        <Image
                          src={avatarSrc}
                          alt={review.reviewerName || review.clientName || 'Student'}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      ) : (
                        <span>
                          {review.reviewerInitials ||
                            (review.reviewerName || review.clientName || 'S').slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-[#243445] truncate">
                        {review.reviewerName || review.clientName}
                      </h4>
                      <span className="text-[11px] text-slate-400 block truncate">
                        {review.courseLabel || (review.subject ? `Course: ${review.subject}` : 'Course: Academic Coursework')}
                      </span>
                    </div>
                  </div>

                  {review.orderRef && (
                    <span className="text-[10px] text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0">
                      {review.orderRef}
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#FFF2EC] text-[#FF641A] flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[32px]">filter_alt_off</span>
          </div>
          <h3 className="font-heading font-bold text-xl text-[#243445]">
            No matching reviews found
          </h3>
          <p className="text-sm text-slate-500">
            We couldn&apos;t find any verified reviews matching your selected filters or search terms. Try clearing your filters or searching for another topic.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF641A] text-white font-semibold text-sm hover:bg-[#E8540E] transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
