'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  BookOpen,
} from 'lucide-react';
import type { PublicCalculatorResponse } from '@/lib/public-api';
import { DEFAULT_CALCULATOR_DATA } from '@/lib/data-fetchers';

export interface PriceCalculatorWidgetProps {
  initialData?: PublicCalculatorResponse;
  initialServiceSlug?: string;
  className?: string;
}

export function PriceCalculatorWidget({
  initialData,
  initialServiceSlug,
  className = '',
}: PriceCalculatorWidgetProps) {
  const router = useRouter();
  const data = initialData || DEFAULT_CALCULATOR_DATA;
  const config = data.config || DEFAULT_CALCULATOR_DATA.config;

  const sortedLevels = useMemo(() => {
    const list = data.levels && data.levels.length > 0 ? data.levels : DEFAULT_CALCULATOR_DATA.levels;
    return [...list]
      .filter((l) => l.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [data.levels]);

  const sortedDeadlines = useMemo(() => {
    const list = data.deadlines && data.deadlines.length > 0 ? data.deadlines : DEFAULT_CALCULATOR_DATA.deadlines;
    return [...list]
      .filter((d) => d.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [data.deadlines]);

  const availableServices = useMemo(() => {
    if (config.useServicesFromCatalog && data.services && data.services.length > 0) {
      return data.services.map((s) => ({
        slug: s.slug,
        name: s.title,
        multiplier: 1.0,
      }));
    }
    const types = data.paperTypes && data.paperTypes.length > 0 ? data.paperTypes : DEFAULT_CALCULATOR_DATA.paperTypes;
    return types
      .filter((p) => p.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((p) => ({
        slug: p.slug,
        name: p.name,
        multiplier: p.multiplier,
      }));
  }, [config.useServicesFromCatalog, data.services, data.paperTypes]);

  // Form selections state
  const [selectedLevelSlug, setSelectedLevelSlug] = useState<string>(() => {
    if (config.defaultLevelSlug && sortedLevels.some((l) => l.slug === config.defaultLevelSlug)) {
      return config.defaultLevelSlug;
    }
    return sortedLevels[2]?.slug || sortedLevels[0]?.slug || 'undergraduate';
  });

  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string>(() => {
    if (initialServiceSlug && availableServices.some((s) => s.slug === initialServiceSlug)) {
      return initialServiceSlug;
    }
    return availableServices[0]?.slug || 'essay-writing';
  });

  const [selectedDeadlineSlug, setSelectedDeadlineSlug] = useState<string>(() => {
    if (config.defaultDeadlineSlug && sortedDeadlines.some((d) => d.slug === config.defaultDeadlineSlug)) {
      return config.defaultDeadlineSlug;
    }
    return sortedDeadlines[6]?.slug || sortedDeadlines[0]?.slug || '6-days';
  });

  const [pages, setPages] = useState<number>(() => config.defaultPages || 2);

  // Dynamic calculation
  const calculation = useMemo(() => {
    const currentLevel = sortedLevels.find((l) => l.slug === selectedLevelSlug) || sortedLevels[0];
    const currentDeadline = sortedDeadlines.find((d) => d.slug === selectedDeadlineSlug) || sortedDeadlines[0];
    const currentService = availableServices.find((s) => s.slug === selectedServiceSlug) || availableServices[0];

    // Find rate in matrix
    let pricePerPage = 15.61;
    if (currentLevel && currentDeadline) {
      const rateObj = data.rates?.find(
        (r) => r.levelId === currentLevel.id && r.deadlineId === currentDeadline.id,
      );
      if (rateObj) {
        pricePerPage = rateObj.pricePerPage;
      }
    }

    const multiplier = currentService?.multiplier || 1.0;
    const wordsPerPage = config.wordsPerPage || 275;
    const words = pages * wordsPerPage;
    const totalPrice = Number((pricePerPage * multiplier * pages).toFixed(2));

    return {
      pricePerPage,
      multiplier,
      totalPrice,
      words,
      levelName: currentLevel?.name || 'Undergraduate',
      deadlineLabel: currentDeadline?.label || '6 days',
      serviceName: currentService?.name || 'Essay Writing',
    };
  }, [sortedLevels, sortedDeadlines, availableServices, selectedLevelSlug, selectedDeadlineSlug, selectedServiceSlug, pages, data.rates, config.wordsPerPage]);

  const handleContinueOrder = () => {
    const params = new URLSearchParams({
      service: selectedServiceSlug,
      level: selectedLevelSlug,
      deadline: selectedDeadlineSlug,
      pages: String(pages),
      words: String(calculation.words),
      estimate: calculation.totalPrice.toFixed(2),
    });
    router.push(`/contact?${params.toString()}`);
  };

  return (
    <div
      className={`w-full bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-200/80 relative text-left transition-all ${className}`}
    >
      {/* Top Header Badge & Title */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF2EC] text-[#FF641A] font-bold text-[11px] sm:text-xs uppercase tracking-wider border border-[#FF641A]/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{config.badgeText || 'PRICE CALCULATOR'}</span>
        </span>
        <span className="text-[11px] font-semibold text-slate-400">
          {config.wordsPerPage || 275} words/page
        </span>
      </div>

      <div className="mb-5">
        <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#243445] tracking-tight">
          {config.widgetTitle || 'Calculate Order Price'}
        </h3>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          {config.widgetSubtitle || 'Instant estimate tailored to your exact academic needs'}
        </p>
      </div>

      <div className="space-y-4">
        {/* 1. Academic Level Tabs */}
        <div>
          <label className="block text-xs font-bold text-[#243445] uppercase tracking-wider mb-1.5">
            Academic Level
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
            {sortedLevels.map((lvl) => {
              const isSelected = selectedLevelSlug === lvl.slug;
              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setSelectedLevelSlug(lvl.slug)}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all truncate ${isSelected
                      ? 'bg-[#FF641A] text-white shadow-md shadow-[#FF641A]/25'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  title={lvl.name}
                >
                  {lvl.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Service / Paper Type Dropdown */}
        <div>
          <label className="block text-xs font-bold text-[#243445] uppercase tracking-wider mb-1.5">
            Type of Service / Paper
          </label>
          <div className="relative">
            <select
              value={selectedServiceSlug}
              onChange={(e) => setSelectedServiceSlug(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs sm:text-sm font-semibold text-[#243445] focus:outline-none focus:border-[#FF641A] focus:bg-white transition-colors cursor-pointer appearance-none"
            >
              {availableServices.map((svc) => (
                <option key={svc.slug} value={svc.slug}>
                  {svc.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* 3. Deadline Dropdown */}
        <div>
          <label className="block text-xs font-bold text-[#243445] uppercase tracking-wider mb-1.5">
            Urgency / Deadline
          </label>
          <div className="relative">
            <select
              value={selectedDeadlineSlug}
              onChange={(e) => setSelectedDeadlineSlug(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs sm:text-sm font-semibold text-[#243445] focus:outline-none focus:border-[#FF641A] focus:bg-white transition-colors cursor-pointer appearance-none"
            >
              {sortedDeadlines.map((dl) => (
                <option key={dl.id} value={dl.slug}>
                  {dl.label} ({dl.hours} hours turnaround)
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* 4. Pages Stepper & Word Count */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-[#243445] uppercase tracking-wider">
              Pages / Length
            </label>
            <span className="text-xs font-semibold text-slate-500 font-mono">
              {calculation.words.toLocaleString()} words
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Decrease pages"
              onClick={() => setPages((p) => Math.max(config.minPages || 1, p - 1))}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#243445] font-bold text-lg flex items-center justify-center transition-colors disabled:opacity-40"
              disabled={pages <= (config.minPages || 1)}
            >
              -
            </button>
            <div className="flex-1 relative">
              <input
                type="number"
                min={config.minPages || 1}
                max={config.maxPages || 200}
                value={pages}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val)) {
                    setPages(Math.min(config.maxPages || 200, Math.max(config.minPages || 1, val)));
                  }
                }}
                className="w-full py-2 px-3 text-center rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-[#243445] focus:outline-none focus:border-[#FF641A] focus:bg-white"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 pointer-events-none">
                {pages === 1 ? 'page' : 'pages'}
              </span>
            </div>
            <button
              type="button"
              aria-label="Increase pages"
              onClick={() => setPages((p) => Math.min(config.maxPages || 200, p + 1))}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#243445] font-bold text-lg flex items-center justify-center transition-colors disabled:opacity-40"
              disabled={pages >= (config.maxPages || 200)}
            >
              +
            </button>
          </div>
        </div>

        {/* 5. Price Highlight Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FFF2EC] to-orange-50/60 border border-[#FF641A]/20 space-y-1.5">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#243445]">
              Estimated Total:
            </span>
            <div className="text-right">
              <span className="font-heading font-black text-3xl sm:text-4xl text-[#FF641A] tracking-tight">
                {config.currencySymbol || '$'}
                {calculation.totalPrice.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-slate-500 ml-1.5">USD</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1.5 border-t border-[#FF641A]/15 font-medium">
            <span>
              Per Page: {config.currencySymbol || '$'}
              {calculation.pricePerPage.toFixed(2)}
            </span>
            <span>
              {pages} {pages === 1 ? 'page' : 'pages'} &bull; {calculation.words} words
            </span>
          </div>
        </div>

        {/* 6. Action Button */}
        <button
          type="button"
          onClick={handleContinueOrder}
          className="w-full py-3.5 px-6 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#FF641A]/25 transition-all hover:-translate-y-0.5 cursor-pointer"
        >
          <span>{config.ctaButtonText || 'Continue with Order'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-1 pt-1 text-[11px] text-slate-500 text-center font-medium">
          <div className="flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#059669] shrink-0" />
            <span>100% Private</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
            <span>Free Revisions</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
            <span>0% AI Turnitin</span>
          </div>
        </div>
      </div>
    </div>
  );
}
