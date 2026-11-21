'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Star, GraduationCap, CheckCircle } from 'lucide-react';
import type { PublicExpert } from '@/lib/public-api';
import { DEFAULT_EXPERTS } from '@/lib/data-fetchers';

interface TopExpertsCarouselProps {
  experts?: PublicExpert[];
}

export default function TopExpertsCarousel({ experts }: TopExpertsCarouselProps = {}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const displayExperts = experts && experts.length > 0 ? experts : DEFAULT_EXPERTS;

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* Carousel Navigation Buttons */}
      <div className="flex justify-end items-center gap-3 shrink-0 mb-6">
        <button
          id="expert-scroll-left"
          type="button"
          onClick={scrollLeft}
          aria-label="Previous experts"
          className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#243445] hover:text-[#FF641A] hover:border-[#FF641A] hover:shadow-md transition-all shadow-sm focus:outline-none cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          id="expert-scroll-right"
          type="button"
          onClick={scrollRight}
          aria-label="Next experts"
          className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#243445] hover:text-[#FF641A] hover:border-[#FF641A] hover:shadow-md transition-all shadow-sm focus:outline-none cursor-pointer"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Experts Carousel Track */}
      <div className="relative w-full">
        <div
          id="experts-carousel-track"
          ref={trackRef}
          className="flex items-stretch gap-6 overflow-x-auto pb-6 pt-1 select-none scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayExperts.map((expert) => {
            const avatarSrc = expert.avatarUrl || '/images/male-expert1.jpg';
            const ratingScore =
              typeof expert.rating === 'number'
                ? expert.rating.toFixed(2)
                : String(expert.rating);
            const papersStr = `${expert.completedOrders}+ Papers`;

            return (
              <div
                key={expert.id || expert.slug}
                className="w-80 shrink-0 bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-slate-200/80 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden bg-slate-100 shrink-0 border-2 border-[#FF641A]/20">
                        <Image
                          src={avatarSrc}
                          alt={expert.name}
                          fill
                          sizes="56px"
                          loading="lazy"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-heading font-bold text-base text-[#243445] leading-tight">
                            {expert.name}
                          </h3>
                          <CheckCircle className="w-4 h-4 text-[#059669] shrink-0 fill-[#ECFDF5]" />
                        </div>
                        <span className="text-xs text-slate-500 font-medium">
                          {expert.degree}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="inline-block px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 text-xs font-medium border border-slate-200/60 line-clamp-1">
                      {expert.roleTitle}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                      <GraduationCap className="w-4 h-4 text-[#FF641A] shrink-0" />
                      <span className="line-clamp-1">{expert.university}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mb-5">
                    <div className="flex items-center gap-1 text-[#FF641A] font-bold">
                      <Star className="w-4 h-4 fill-[#FF641A] text-[#FF641A]" />
                      <span className="text-[#243445]">{ratingScore}</span>
                      <span className="text-slate-400 font-normal">({papersStr})</span>
                    </div>
                    <span className="text-[#059669] font-bold">
                      {expert.successRate} Success
                    </span>
                  </div>
                </div>

                <Link
                  href={`/top-experts/${expert.slug}`}
                  className="w-full py-2.5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white font-bold text-xs text-center transition-colors shadow-sm block"
                >
                  View Profile
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Button linking to /top-experts */}
      <div className="mt-8 text-center">
        <Link
          href="/top-experts"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5"
        >
          <span>Meet Our Experts</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
