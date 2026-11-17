'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { BlogTocHeading } from '@/lib/public-api';

interface StickyArticleTocProps {
  tocHeadings?: (string | BlogTocHeading)[];
  hasAuthor?: boolean;
  hasFaq?: boolean;
}

interface TocItem {
  id: string;
  num: string;
  text: string;
}

export default function StickyArticleToc({
  tocHeadings = [],
  hasAuthor = true,
  hasFaq = true,
}: StickyArticleTocProps) {
  const [activeId, setActiveId] = useState<string>('');

  // Normalize headings into structured array
  const items = useMemo(() => {
    const list: TocItem[] = [];

    tocHeadings.forEach((h, idx) => {
      const rawText = typeof h === 'string' ? h : h.text;
      const rawId = typeof h === 'object' && h.id ? h.id : `toc-section-${idx + 1}`;

      // Clean leading numbers if present (e.g. "1. Understanding..." -> num="1.", text="Understanding...")
      const match = rawText.match(/^(\d+[\.\)]\s*)(.*)$/);
      if (match) {
        list.push({
          id: rawId,
          num: match[1].trim(),
          text: match[2].trim(),
        });
      } else {
        list.push({
          id: rawId,
          num: `${idx + 1}.`,
          text: rawText,
        });
      }
    });

    if (hasAuthor) {
      list.push({
        id: 'toc-section-author',
        num: `${list.length + 1}.`,
        text: 'About the Lead Faculty Author',
      });
    }

    if (hasFaq) {
      list.push({
        id: 'toc-section-faq',
        num: `${list.length + 1}.`,
        text: 'Frequently Asked Questions (FAQ)',
      });
    }

    return list;
  }, [tocHeadings, hasAuthor, hasFaq]);

  useEffect(() => {
    if (items.length === 0) return;

    // Use IntersectionObserver to spy active heading
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '-100px 0px -60% 0px',
      threshold: 0,
    });

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -120; // offset for sticky header
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
      window.history.pushState(null, '', `#${id}`);
    }
  };

  if (items.length === 0) return null;

  return (
    <aside className="lg:col-span-4 space-y-6">
      <div className="sticky top-28 space-y-6">
        {/* Table of Contents Container */}
        <nav
          aria-label="Table of Contents"
          className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs"
        >
          <div className="flex items-center space-x-2 pb-3 mb-3 border-b border-slate-100">
            <svg
              className="w-5 h-5 text-[#FF641A]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 6h16M4 12h16M4 18h7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <h3 className="font-poppins font-bold text-[#243445] text-sm tracking-tight uppercase">
              Table of Contents
            </h3>
          </div>

          <ul className="space-y-2 text-xs text-slate-600 font-medium">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className={`transition-colors flex items-start gap-2 py-1 px-2 rounded-lg ${
                      isActive
                        ? 'bg-orange-50 text-[#FF641A] font-bold'
                        : 'hover:text-[#FF641A] hover:bg-slate-50'
                    }`}
                  >
                    <span
                      className={`shrink-0 font-bold ${
                        isActive ? 'text-[#FF641A]' : 'text-slate-400'
                      }`}
                    >
                      {item.num}
                    </span>
                    <span className="line-clamp-2 leading-relaxed">{item.text}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Quick Action Concierge Box */}
        <div className="bg-[#243445] text-white rounded-2xl p-6 shadow-xl relative overflow-hidden space-y-4">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#FF641A]/20 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-[11px] font-semibold text-orange-200">
              <span>🎓</span>
              <span>1-on-1 Academic Support</span>
            </div>
            <h4 className="font-poppins font-bold text-white text-base leading-snug">
              Stuck on Your Dissertation or Coursework?
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our verified Oxbridge & Ivy League faculty advisors review, edit, and guide your
              academic writing with 100% confidentiality.
            </p>
            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href="https://wa.me/923138400066"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white text-xs font-bold text-center transition shadow-md flex items-center justify-center gap-2"
              >
                <span>Chat with Advisor on WhatsApp</span>
                <span>→</span>
              </a>
              <Link
                href="/services"
                className="w-full py-2 px-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold text-center transition"
              >
                Explore All Academic Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
