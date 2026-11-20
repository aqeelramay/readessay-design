'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  Sparkles,
  ShieldCheck,
  Headphones,
  Award,
} from 'lucide-react';
import { PublicService } from '@/lib/public-api';
import AppIcon from '@/components/shared/AppIcon';

interface HeaderProps {
  serviceTree: PublicService[];
}

function getDropdownContainerClasses(columnCount: number): string {
  switch (columnCount) {
    case 1:
      return 'w-80 left-0 p-4';
    case 2:
      return 'w-[680px] max-w-[92vw] left-1/2 -translate-x-1/2 p-5';
    case 3:
      return 'w-[1020px] max-w-[94vw] left-1/2 -translate-x-1/2 p-6';
    case 4:
    default:
      return 'w-[1360px] max-w-[96vw] left-1/2 -translate-x-1/2 p-6';
  }
}

function getDropdownGridCols(columnCount: number): string {
  switch (columnCount) {
    case 1:
      return 'grid-cols-1';
    case 2:
      return 'grid-cols-2';
    case 3:
      return 'grid-cols-3';
    case 4:
    default:
      return 'grid-cols-4';
  }
}

export default function Header({ serviceTree }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openParentSlug, setOpenParentSlug] = useState<string | null>(null);

  const toggleMobileParent = (slug: string) => {
    setOpenParentSlug((prev) => (prev === slug ? null : slug));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full shadow-md">
      {/* 1. Full-Width Edge-to-Edge Announcement Ticker Bar */}
      <div className="w-full bg-[#243445] text-white py-2 overflow-hidden border-b border-white/10 select-none">
        <div className="ticker-track-animate text-xs sm:text-sm font-medium tracking-wide uppercase">
          {/* Loop Segment 1 */}
          <div className="flex items-center gap-6 px-4 shrink-0">
            <span className="flex items-center gap-2 text-white">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>🎉 Great Deal! GET First 2 Pages Assignment or Essay Absolutely Free!</span>
            </span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-2 text-white">
              <Award className="w-4 h-4 text-[#FF641A]" />
              <span>⚡ USA&apos;s No.1 Academic Platform</span>
            </span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-2 text-white">
              <Headphones className="w-4 h-4 text-emerald-400" />
              <span>24/7 Dedicated Support &amp; Ph.D. Experts</span>
            </span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-2 text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Unique &amp; Plagiarism-Free Content Guaranteed</span>
            </span>
            <span className="text-white/40">•</span>
          </div>

          {/* Loop Segment 2 (Duplicate for seamless continuous loop) */}
          <div className="flex items-center gap-6 px-4 shrink-0" aria-hidden="true">
            <span className="flex items-center gap-2 text-white">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>🎉 Great Deal! GET First 2 Pages Assignment or Essay Absolutely Free!</span>
            </span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-2 text-white">
              <Award className="w-4 h-4 text-[#FF641A]" />
              <span>⚡ USA&apos;s No.1 Academic Platform</span>
            </span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-2 text-white">
              <Headphones className="w-4 h-4 text-emerald-400" />
              <span>24/7 Dedicated Support &amp; Ph.D. Experts</span>
            </span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-2 text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Unique &amp; Plagiarism-Free Content Guaranteed</span>
            </span>
            <span className="text-white/40">•</span>
          </div>
        </div>
      </div>

      {/* 2. Full-Width Main Navigation Bar with 3-Zone Layout */}
      <nav className="w-full bg-[#FF641A] shadow-md text-white relative">
        <div className="w-full px-6 lg:px-12 h-20 flex items-center justify-between gap-6">
          {/* Left Zone: ReadEssay Logo */}
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/"
              className="flex items-center gap-3 py-1"
              aria-label="ReadEssay Home"
            >
              <div className="relative w-44 sm:w-48 h-20">
                <Image
                  src="/images/readessay-logo.png"
                  alt="ReadEssay Logo"
                  fill
                  priority
                  sizes="(max-width: 768px) 176px, 192px"
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Center Zone: Dynamic Parent Services with Mega-Menus + Top Links */}
          <div className="hidden xl:flex items-center gap-6 2xl:gap-7 whitespace-nowrap text-white font-medium text-sm h-full">
            {/* Dynamic Parent Services directly rendered (NO generic 'Services' wrapper) */}
            {serviceTree.map((service) => {
              const subServices = service.subServices || [];
              const count = subServices.length;
              const hasSub = count > 0;
              // 1-4 -> 1 col | 5-8 -> 2 cols | 9-12 -> 3 cols | 13+ -> 4 cols (max 4 columns)
              const columnCount = Math.min(4, Math.max(1, Math.ceil(count / 4)));
              // Always ceil(count / columnCount) so 26 items across 4 cols = 7 rows/col (7, 7, 7, 5)
              const rowsPerColumn = Math.ceil(count / columnCount);
              const columns = Array.from({ length: columnCount }, (_, colIndex) =>
                subServices.slice(colIndex * rowsPerColumn, (colIndex + 1) * rowsPerColumn)
              );

              return (
                <div
                  key={service.id}
                  className={`group h-full flex items-center ${
                    columnCount === 1 ? 'relative' : ''
                  }`}
                >
                  <Link
                    href={`/${service.slug}`}
                    className="flex items-center gap-1 font-semibold text-white hover:text-white/80 transition-colors py-6"
                  >
                    <span>{service.title}</span>
                    {hasSub && (
                      <ChevronDown className="w-4 h-4 text-white/80 group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </Link>

                  {/* Dynamic Dropdown / Mega-Menu */}
                  {hasSub && (
                    <div
                      className={`absolute top-full ${getDropdownContainerClasses(
                        columnCount
                      )} bg-white text-[#243445] rounded-2xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 whitespace-normal before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']`}
                    >
                      <div className={`grid gap-x-5 gap-y-1.5 ${getDropdownGridCols(columnCount)}`}>
                        {columns.map((col, colIdx) => (
                          <div key={colIdx} className="space-y-1">
                            {col.map((sub) => (
                              <Link
                                key={sub.id}
                                href={`/${service.slug}/${sub.slug}`}
                                className="flex items-start gap-2.5 px-3 py-2 rounded-xl text-[#243445] hover:bg-slate-50 hover:text-[#FF641A] transition-colors group/item"
                              >
                                <AppIcon
                                  name={sub.icon || 'file_text'}
                                  className="w-4 h-4 text-[#FF641A] shrink-0 mt-0.5"
                                />
                                <span className="text-[13.5px] font-medium text-[#243445] group-hover/item:text-[#FF641A] leading-snug whitespace-normal">
                                  {sub.title}
                                </span>
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Top-Level Editorial Links */}
            <Link
              href="/reviews"
              className="font-semibold text-white hover:text-white/80 transition-colors py-6"
            >
              Reviews
            </Link>

            <Link
              href="/samples"
              className="font-semibold text-white hover:text-white/80 transition-colors py-6"
            >
              Samples
            </Link>

            <Link
              href="/blog"
              className="font-semibold text-white hover:text-white/80 transition-colors py-6"
            >
              Blog
            </Link>

            <Link
              href="/top-experts"
              className="font-semibold text-white hover:text-white/80 transition-colors py-6"
            >
              Top Experts
            </Link>
          </div>

          {/* Right Zone: Stacked Phone & Email Contact Info */}
          <div className="hidden sm:flex flex-col items-end justify-center shrink-0 text-white">
            <a
              href="tel:+923138400066"
              className="flex items-center gap-1.5 text-white hover:text-white/80 text-sm font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-white shrink-0" />
              <span>+92 3138400066</span>
            </a>
            <a
              href="mailto:support@readessay.com"
              className="flex items-center gap-1.5 text-white/90 hover:text-white text-xs font-medium transition-colors mt-0.5"
            >
              <Mail className="w-3 h-3 text-white/90 shrink-0" />
              <span>support@readessay.com</span>
            </a>
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <div className="flex items-center xl:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white text-[#243445] border-t border-slate-100 px-6 py-6 shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col space-y-3">
              {/* Dynamic Parent Services Accordions */}
              {serviceTree.map((service) => {
                const hasSub = service.subServices && service.subServices.length > 0;
                const isOpen = openParentSlug === service.slug;

                return (
                  <div key={service.id} className="border-b border-slate-100 pb-2">
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/${service.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="font-bold text-base text-[#243445] hover:text-[#FF641A] py-1.5"
                      >
                        {service.title}
                      </Link>
                      {hasSub && (
                        <button
                          type="button"
                          onClick={() => toggleMobileParent(service.slug)}
                          className="p-1.5 text-slate-400 hover:text-[#FF641A]"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#FF641A]' : ''
                              }`}
                          />
                        </button>
                      )}
                    </div>

                    {hasSub && isOpen && (
                      <div className="pl-3 pt-1 pb-2 space-y-1.5 border-l-2 border-[#FF641A]/30 ml-1 mt-1">
                        {service.subServices!.map((sub) => (
                          <Link
                            key={sub.id}
                            href={`/${service.slug}/${sub.slug}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2 text-xs text-slate-600 hover:text-[#FF641A] py-1"
                          >
                            <AppIcon
                              name={sub.icon || 'file_text'}
                              className="w-3.5 h-3.5 text-[#FF641A] shrink-0"
                            />
                            <span>{sub.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Core Links */}
              <Link
                href="/reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-bold text-[#243445] hover:text-[#FF641A] py-2 border-b border-slate-100"
              >
                Reviews
              </Link>

              <Link
                href="/samples"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-bold text-[#243445] hover:text-[#FF641A] py-2 border-b border-slate-100"
              >
                Samples
              </Link>

              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-bold text-[#243445] hover:text-[#FF641A] py-2 border-b border-slate-100"
              >
                Blog
              </Link>

              <Link
                href="/top-experts"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-bold text-[#243445] hover:text-[#FF641A] py-2 border-b border-slate-100"
              >
                Top Experts
              </Link>

              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-bold text-[#FF641A] py-2 border-b border-slate-100"
              >
                All Services Matrix &rarr;
              </Link>

              {/* Mobile Contact CTAs */}
              <div className="pt-4 space-y-2.5">
                <a
                  href="tel:+923138400066"
                  className="flex items-center gap-2 text-sm font-bold text-[#243445]"
                >
                  <Phone className="w-4 h-4 text-[#FF641A]" />
                  <span>+92 3138400066</span>
                </a>
                <a
                  href="mailto:support@readessay.com"
                  className="flex items-center gap-2 text-sm text-slate-600"
                >
                  <Mail className="w-4 h-4 text-[#FF641A]" />
                  <span>support@readessay.com</span>
                </a>
                <a
                  href="https://wa.me/923138400066"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#059669] text-white font-bold text-sm shadow hover:bg-emerald-700 transition-colors mt-2"
                >
                  WhatsApp Expert Now
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
