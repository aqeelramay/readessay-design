'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PublicSampleSection, PublicAcademicSample } from '@/lib/public-api';
import AppIcon from '@/components/shared/AppIcon';
import { API_BASE_URL } from '@/config/api';

interface SamplesDirectoryClientProps {
  sections: PublicSampleSection[];
}

export default function SamplesDirectoryClient({ sections }: SamplesDirectoryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');

  // Compute total samples count
  const totalSamplesCount = useMemo(() => {
    return sections.reduce((acc, sec) => acc + (sec.samples ? sec.samples.length : 0), 0);
  }, [sections]);

  // Extract distinct academic levels & citation styles for filters
  const { allAcademicLevels, allCitationStyles } = useMemo(() => {
    const levels = new Set<string>();
    const styles = new Set<string>();

    for (const sec of sections) {
      for (const s of sec.samples || []) {
        if (s.academicLevel) levels.add(s.academicLevel.trim());
        if (s.citationStyle) styles.add(s.citationStyle.trim());
      }
    }

    return {
      allAcademicLevels: Array.from(levels),
      allCitationStyles: Array.from(styles),
    };
  }, [sections]);

  // Filter sections and their samples
  const filteredSections = useMemo(() => {
    return sections
      .map((sec) => {
        // If category is selected and does not match, filter this section out
        if (selectedCategory !== 'all' && sec.id !== selectedCategory && sec.heading !== selectedCategory) {
          return null;
        }

        const matchingSamples = (sec.samples || []).filter((sample) => {
          // Format filter (PDF vs DOCX)
          if (selectedFormat !== 'all') {
            const f = (sample.documentFile?.fileType || sample.fileType || '').toUpperCase();
            if (f !== selectedFormat.toUpperCase()) return false;
          }

          // Academic level filter
          if (selectedLevel !== 'all') {
            if (
              !sample.academicLevel ||
              !sample.academicLevel.toLowerCase().includes(selectedLevel.toLowerCase())
            ) {
              return false;
            }
          }

          // Citation style filter
          if (selectedStyle !== 'all') {
            if (
              !sample.citationStyle ||
              !sample.citationStyle.toLowerCase().includes(selectedStyle.toLowerCase())
            ) {
              return false;
            }
          }

          // Search query filter
          if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            const haystack = [
              sample.title,
              sample.academicLevel,
              sample.documentType,
              sample.citationStyle,
              sample.customMetaLabel,
              sample.customMetaValue,
              sample.fileName,
              sec.heading,
            ]
              .filter(Boolean)
              .join(' ')
              .toLowerCase();

            if (!haystack.includes(q)) return false;
          }

          return true;
        });

        if (matchingSamples.length === 0) {
          return null;
        }

        return {
          ...sec,
          samples: matchingSamples,
        };
      })
      .filter((sec): sec is PublicSampleSection => sec !== null);
  }, [sections, selectedCategory, searchQuery, selectedLevel, selectedStyle, selectedFormat]);

  const visibleSamplesCount = useMemo(() => {
    return filteredSections.reduce((acc, s) => acc + s.samples.length, 0);
  }, [filteredSections]);

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    searchQuery.trim().length > 0 ||
    selectedLevel !== 'all' ||
    selectedStyle !== 'all' ||
    selectedFormat !== 'all';

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedLevel('all');
    setSelectedStyle('all');
    setSelectedFormat('all');
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Smooth scroll down to samples catalog if user clicked from sticky bar
    const el = document.getElementById('samples-catalog-view');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full space-y-10" id="samples-catalog-view">
      {/* STICKY DISCIPLINE PILLS & SEARCH BAR */}
      <div className="sticky top-20 z-30 w-full bg-white/95 backdrop-blur-md shadow-md py-4 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-4">
          {/* Top row: Multi-row Discipline Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => handleCategorySelect('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${selectedCategory === 'all'
                  ? 'bg-[#FF641A] text-white shadow-md'
                  : 'bg-slate-100 text-[#243445] hover:bg-slate-200'
                }`}
            >
              All Disciplines ({totalSamplesCount})
            </button>

            {sections.map((sec) => {
              const isActive = selectedCategory === sec.id || selectedCategory === sec.heading;
              const count = sec.samples ? sec.samples.length : 0;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => handleCategorySelect(sec.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${isActive
                      ? 'bg-[#FF641A] text-white shadow-md'
                      : 'bg-slate-100 text-[#243445] hover:bg-slate-200'
                    }`}
                >
                  {sec.heading} ({count})
                </button>
              );
            })}
          </div>

          {/* Bottom row: Search + Dropdown Filters + Format Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="lg:col-span-5 relative">
              <AppIcon
                name="search"
                className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, document type, methodology..."
                className="w-full h-10 pl-10 pr-9 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-[#243445] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF641A] focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  aria-label="Clear search"
                >
                  <AppIcon name="close" className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Academic Level Dropdown */}
            <div className="lg:col-span-3 relative">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-8 text-xs sm:text-sm font-medium text-[#243445] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF641A]"
              >
                <option value="all">All Academic Levels</option>
                {allAcademicLevels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
              <AppIcon
                name="expand_more"
                className="w-[18px] h-[18px] text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>

            {/* Citation Style Dropdown */}
            <div className="lg:col-span-2 relative">
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-8 text-xs sm:text-sm font-medium text-[#243445] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF641A]"
              >
                <option value="all">All Citation Styles</option>
                {allCitationStyles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
              <AppIcon
                name="expand_more"
                className="w-[18px] h-[18px] text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>

            {/* Format Toggle (All / PDF / DOCX) */}
            <div className="lg:col-span-2 flex items-center justify-end gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setSelectedFormat('all')}
                className={`flex-1 py-1 px-2 rounded-lg text-xs font-semibold text-center transition-all ${selectedFormat === 'all'
                    ? 'bg-white text-[#FF641A] shadow-xs'
                    : 'text-slate-600 hover:text-[#243445]'
                  }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setSelectedFormat('PDF')}
                className={`flex-1 py-1 px-2 rounded-lg text-xs font-semibold text-center transition-all ${selectedFormat === 'PDF'
                    ? 'bg-white text-[#FF641A] shadow-xs'
                    : 'text-slate-600 hover:text-[#243445]'
                  }`}
              >
                PDF
              </button>
              <button
                type="button"
                onClick={() => setSelectedFormat('DOCX')}
                className={`flex-1 py-1 px-2 rounded-lg text-xs font-semibold text-center transition-all ${selectedFormat === 'DOCX'
                    ? 'bg-white text-[#FF641A] shadow-xs'
                    : 'text-slate-600 hover:text-[#243445]'
                  }`}
              >
                DOCX
              </button>
            </div>
          </div>

          {/* Active Filter Indicators */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>
              Showing <strong className="text-[#243445] font-bold">{visibleSamplesCount}</strong> of{' '}
              {totalSamplesCount} academic models
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-[#FF641A] hover:underline font-bold flex items-center gap-1"
              >
                <AppIcon name="refresh" className="w-3.5 h-3.5" />
                Reset All Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SAMPLES DIRECTORY LISTING */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        {filteredSections.length > 0 ? (
          filteredSections.map((section) => (
            <section
              key={section.id}
              id={`sec-${section.id}`}
              className="discipline-section space-y-6 pt-4 scroll-mt-36"
            >
              {/* Category Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
                <div className="max-w-3xl space-y-1">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF641A]">
                    <AppIcon name="folder_open" className="w-4 h-4" />
                    Discipline Portfolio
                  </div>
                  <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#243445]">
                    {section.heading}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {section.shortSummary}
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                    <AppIcon name="check_circle" className="w-3.5 h-3.5 text-[#059669]" filled />
                    {section.samples.length} Exemplar{section.samples.length === 1 ? '' : 's'}
                  </span>
                </div>
              </div>

              {/* 3-Column Card Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.samples.map((sample: PublicAcademicSample) => {
                  const rawDocUrl = sample.documentFile?.fileUrl || sample.fileUrl || '#';
                  const docUrl =
                    rawDocUrl.startsWith('http') || rawDocUrl.startsWith('#') || rawDocUrl.startsWith('//')
                      ? rawDocUrl
                      : `${API_BASE_URL.replace(/\/api\/v1\/?$/, '')}${rawDocUrl.startsWith('/') ? '' : '/'}${rawDocUrl}`;
                  const docFormat = (sample.documentFile?.fileType || sample.fileType || 'PDF').toUpperCase();
                  const docSize = sample.documentFile?.fileSize || sample.fileSize || '1.2 MB';

                  return (
                    <article
                      key={sample.id}
                      className="sample-card bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between border border-slate-200/80"
                    >
                      <div>
                        {/* Card Header: Pages + Format Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[#243445] text-xs font-semibold">
                            <AppIcon name="description" className="w-3.5 h-3.5 text-[#FF641A]" />
                            {sample.pageCount} {sample.pageCount === 1 ? 'Page' : 'Pages'}
                          </span>

                          <span
                            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${docFormat === 'PDF'
                                ? 'bg-red-50 text-red-600 border border-red-200/60'
                                : 'bg-blue-50 text-blue-600 border border-blue-200/60'
                              }`}
                          >
                            <AppIcon name="attachment" className="w-3 h-3" />
                            {docFormat} • {docSize}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-heading text-base font-bold text-[#243445] hover:text-[#FF641A] transition-colors line-clamp-2 mb-4 leading-snug">
                          {sample.title}
                        </h3>

                        {/* 4-Slot Metadata Grid */}
                        <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 bg-[#f8f9ff] p-3.5 rounded-xl mb-6 border border-slate-100 text-xs">
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">
                              Academic Level
                            </span>
                            <span className="font-semibold text-[#243445] block truncate">
                              {sample.academicLevel || 'Undergraduate'}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">
                              Document Type
                            </span>
                            <span className="font-semibold text-[#243445] block truncate">
                              {sample.documentType || 'Research Paper'}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">
                              Citation Style
                            </span>
                            <span className="font-semibold text-[#243445] block truncate">
                              {sample.citationStyle || 'APA 7th Edition'}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold truncate">
                              {sample.customMetaLabel || 'Software / Model'}
                            </span>
                            <span className="font-semibold text-[#243445] block truncate">
                              {sample.customMetaValue || 'Collegiate Reference'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer: View Sample Button + Order Similar */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        {/* Direct File Link Button */}
                        <a
                          href={docUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#FF641A] hover:bg-[#E8540E] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md"
                          download={sample.fileName || undefined}
                        >
                          <span>View Sample</span>
                          <AppIcon name="visibility" className="w-4 h-4" />
                        </a>

                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm max-w-xl mx-auto space-y-4 my-12">
            <div className="w-16 h-16 rounded-full bg-[#FFF2EC] text-[#FF641A] flex items-center justify-center mx-auto">
              <AppIcon name="folder_off" className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-bold text-xl text-[#243445]">
              No academic samples match your filters
            </h3>
            <p className="text-sm text-slate-500">
              Try choosing another discipline, clearing your search keywords, or selecting &ldquo;All Disciplines&rdquo;.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF641A] text-white font-semibold text-sm hover:bg-[#E8540E] transition-colors shadow-sm"
            >
              <AppIcon name="refresh" className="w-[18px] h-[18px]" />
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
