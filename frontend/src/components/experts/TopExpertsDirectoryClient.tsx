'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  GraduationCap,
  CheckCircle,
  ArrowRight,
  Search,
} from 'lucide-react';
import type { PublicExpert } from '@/lib/public-api';

interface TopExpertsDirectoryClientProps {
  experts: PublicExpert[];
}

const SPECIALTY_FILTERS = [
  { label: 'All Disciplines', value: 'all' },
  { label: 'Accounting & Finance', value: 'accounting' },
  { label: 'Computer Science & AI', value: 'computer' },
  { label: 'Mathematics & Stats', value: 'mathematics' },
  { label: 'Psychology & Healthcare', value: 'psychology' },
  { label: 'Natural & Bio Sciences', value: 'chemistry' },
];

export default function TopExpertsDirectoryClient({
  experts = [],
}: TopExpertsDirectoryClientProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExperts = useMemo(() => {
    return experts.filter((exp) => {
      // Specialty filter match
      let matchesFilter = true;
      if (selectedFilter !== 'all') {
        const needle = selectedFilter.toLowerCase();
        const role = exp.roleTitle.toLowerCase();
        const spec = exp.specialties.map((s) => s.toLowerCase()).join(' ');
        matchesFilter = role.includes(needle) || spec.includes(needle);
      }

      // Search query match
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const name = exp.name.toLowerCase();
        const role = exp.roleTitle.toLowerCase();
        const uni = exp.university.toLowerCase();
        const spec = exp.specialties.map((s) => s.toLowerCase()).join(' ');
        matchesSearch =
          name.includes(query) ||
          role.includes(query) ||
          uni.includes(query) ||
          spec.includes(query);
      }

      return matchesFilter && matchesSearch;
    });
  }, [experts, selectedFilter, searchQuery]);

  return (
    <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200/80 mb-10 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by expert name, university, or subject..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full text-xs sm:text-sm bg-slate-50 border border-slate-200 text-[#243445] placeholder:text-slate-400 focus:outline-none focus:border-[#FF641A] focus:bg-white transition-all"
            />
          </div>

          {/* Result Count */}
          <div className="text-xs sm:text-sm font-semibold text-slate-500 self-end md:self-center">
            Showing <strong className="text-[#243445]">{filteredExperts.length}</strong> verified specialists
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none">
          {SPECIALTY_FILTERS.map((filter) => {
            const active = selectedFilter === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[#FF641A] text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Experts Grid */}
      {filteredExperts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 max-w-lg mx-auto space-y-4">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="font-heading font-bold text-xl text-[#243445]">
            No Specialists Found
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We couldn&apos;t find any experts matching your search criteria. Try adjusting your query or resetting the filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedFilter('all');
              setSearchQuery('');
            }}
            className="px-6 py-2.5 rounded-full bg-[#FF641A] text-white font-bold text-xs hover:bg-[#E8540E] transition shadow-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredExperts.map((expert) => {
            const avatarSrc = expert.avatarUrl || '/images/male-expert1.jpg';
            const ratingScore =
              typeof expert.rating === 'number'
                ? expert.rating.toFixed(2)
                : String(expert.rating);

            return (
              <div
                key={expert.id || expert.slug}
                className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-slate-200/80 flex flex-col justify-between group"
              >
                <div>
                  {/* Top: Avatar & Name */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border-2 border-[#FF641A]/20 shadow-xs">
                      <Image
                        src={avatarSrc}
                        alt={expert.name}
                        fill
                        sizes="64px"
                        loading="lazy"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <h3 className="font-heading font-bold text-base sm:text-lg text-[#243445] truncate leading-tight">
                          {expert.name}
                        </h3>
                        <CheckCircle className="w-4 h-4 text-[#059669] shrink-0 fill-[#ECFDF5]" />
                      </div>
                      <span className="text-xs text-[#059669] font-bold block mb-1">
                        {expert.degree}
                      </span>
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                        <GraduationCap className="w-3.5 h-3.5 text-[#FF641A] shrink-0" />
                        <span className="truncate">{expert.university}</span>
                      </div>
                    </div>
                  </div>

                  {/* Role Title Badge */}
                  <div className="mb-4">
                    <div className="inline-block px-3 py-1 rounded-lg bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200/70 line-clamp-1">
                      {expert.roleTitle}
                    </div>
                  </div>

                  {/* Bio Excerpt */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {expert.bio}
                  </p>

                  {/* Verified Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-xl bg-slate-50 border border-slate-100 text-center mb-4">
                    <div>
                      <div className="flex items-center justify-center gap-0.5 text-[#FF641A] font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-[#FF641A]" />
                        <span>{ratingScore}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">Rating</span>
                    </div>
                    <div className="border-x border-slate-200/60">
                      <div className="text-xs font-bold text-[#243445]">
                        {expert.completedOrders}+
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">Orders</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#059669]">
                        {expert.successRate}
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">Pass Rate</span>
                    </div>
                  </div>

                  {/* Specialties Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {expert.specialties.slice(0, 3).map((spec, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-orange-50/70 text-[#FF641A] border border-orange-100"
                      >
                        {spec}
                      </span>
                    ))}
                    {expert.specialties.length > 3 && (
                      <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500">
                        +{expert.specialties.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-2 border-t border-slate-100">
                  <Link
                    href={`/top-experts/${expert.slug}`}
                    className="w-full py-2.5 px-4 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white font-bold text-xs text-center transition-colors shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
