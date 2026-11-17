'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Star, GraduationCap, CheckCircle } from 'lucide-react';

interface ExpertCardData {
  id: string;
  name: string;
  credentials: string;
  field: string;
  university: string;
  rating: string;
  papersCount: string;
  successRate: string;
  imageSrc: string;
}

const EXPERT_CARDS: ExpertCardData[] = [
  {
    id: 'exp-1',
    name: 'Dr. Alan Crawford',
    credentials: 'Ph.D., CPA',
    field: 'Forensic Accounting & Auditing',
    university: 'Oxford University',
    rating: '4.99',
    papersCount: '1,420+ Papers',
    successRate: '99.8% Success',
    imageSrc: '/images/male-expert1.jpg',
  },
  {
    id: 'exp-2',
    name: 'Dr. Elena Morales',
    credentials: 'M.Sc., CMA',
    field: 'Corporate Finance & Econometrics',
    university: 'LSE (London School of Economics)',
    rating: '4.98',
    papersCount: '1,150+ Papers',
    successRate: '99.5% Success',
    imageSrc: '/images/female-expert1.jpg',
  },
  {
    id: 'exp-3',
    name: 'Prof. David Sterling',
    credentials: 'Ph.D., AI Systems',
    field: 'Computer Science, Python & AI',
    university: 'MIT / Stanford University',
    rating: '4.99',
    papersCount: '1,840+ Papers',
    successRate: '99.9% Success',
    imageSrc: '/images/male-expert2.jpg',
  },
  {
    id: 'exp-4',
    name: 'Dr. Sarah Jenkins',
    credentials: 'Ph.D., Clinical Psychology',
    field: 'Behavioral Psychology & Healthcare',
    university: 'University of Queensland',
    rating: '4.97',
    papersCount: '980+ Papers',
    successRate: '99.4% Success',
    imageSrc: '/images/female-expert2.jpg',
  },
  {
    id: 'exp-5',
    name: 'Dr. Marcus Vance',
    credentials: 'Ph.D., Pure & Applied Mathematics',
    field: 'Advanced Calculus & Cryptography',
    university: 'Florida International University',
    rating: '4.99',
    papersCount: '1,210+ Papers',
    successRate: '99.7% Success',
    imageSrc: '/images/male-expert1.jpg',
  },
  {
    id: 'exp-6',
    name: 'Dr. Rachel Kim',
    credentials: 'Ph.D., Organic Chemistry',
    field: 'Biochemistry & Molecular Analysis',
    university: 'American University of the Middle East',
    rating: '4.98',
    papersCount: '890+ Papers',
    successRate: '99.6% Success',
    imageSrc: '/images/female-expert1.jpg',
  },
];

export default function TopExpertsCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);

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
          {EXPERT_CARDS.map((expert) => (
            <div
              key={expert.id}
              className="w-80 shrink-0 bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-slate-200/80 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden bg-slate-100 shrink-0 border-2 border-[#FF641A]/20">
                      <Image
                        src={expert.imageSrc}
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
                        {expert.credentials}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="inline-block px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 text-xs font-medium border border-slate-200/60">
                    {expert.field}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                    <GraduationCap className="w-4 h-4 text-[#FF641A] shrink-0" />
                    <span className="line-clamp-1">{expert.university}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mb-5">
                  <div className="flex items-center gap-1 text-[#FF641A] font-bold">
                    <Star className="w-4 h-4 fill-[#FF641A] text-[#FF641A]" />
                    <span className="text-[#243445]">{expert.rating}</span>
                    <span className="text-slate-400 font-normal">({expert.papersCount})</span>
                  </div>
                  <span className="text-[#059669] font-bold">{expert.successRate}</span>
                </div>
              </div>

              <Link
                href="/about-us"
                className="w-full py-2.5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white font-bold text-xs text-center transition-colors shadow-sm block"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button linking to /about-us */}
      <div className="mt-8 text-center">
        <Link
          href="/about-us"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5"
        >
          <span>Meet Our Experts</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
