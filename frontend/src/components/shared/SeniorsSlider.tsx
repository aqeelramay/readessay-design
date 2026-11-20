'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, GraduationCap, CheckCircle } from 'lucide-react';

interface SeniorExpert {
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

const SENIOR_EXPERTS: SeniorExpert[] = [
  {
    id: 'expert-1',
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
    id: 'expert-2',
    name: 'Dr. Elena Morales',
    credentials: 'M.Sc., CMA',
    field: 'Corporate Finance & Econometrics',
    university: 'London School of Economics (LSE)',
    rating: '4.98',
    papersCount: '1,150+ Papers',
    successRate: '99.5% Success',
    imageSrc: '/images/female-expert1.jpg',
  },
  {
    id: 'expert-3',
    name: 'Prof. David Sterling',
    credentials: 'Ph.D., AI Systems',
    field: 'Computer Science, Python & AI',
    university: 'Stanford & Cambridge',
    rating: '4.99',
    papersCount: '1,840+ Papers',
    successRate: '99.9% Success',
    imageSrc: '/images/male-expert2.jpg',
  },
  {
    id: 'expert-4',
    name: 'Dr. Sarah Jenkins',
    credentials: 'Ph.D., Clinical Psychology',
    field: 'Behavioral Psychology & Health',
    university: 'University of Queensland',
    rating: '4.97',
    papersCount: '980+ Papers',
    successRate: '99.4% Success',
    imageSrc: '/images/female-expert2.jpg',
  },
  {
    id: 'expert-5',
    name: 'Dr. Marcus Vance',
    credentials: 'Ph.D., Applied Mathematics',
    field: 'Advanced Calculus & Cryptography',
    university: 'Florida International University',
    rating: '4.99',
    papersCount: '1,210+ Papers',
    successRate: '99.7% Success',
    imageSrc: '/images/male-expert1.jpg',
  },
  {
    id: 'expert-6',
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

export default function SeniorsSlider() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let isDown = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let isHovered = false;
    let animationFrameId: number;
    let halfWidth = 0;

    const measureWidth = () => {
      const firstGroup = track.querySelector<HTMLDivElement>('.senior-group');
      if (firstGroup) {
        halfWidth = firstGroup.offsetWidth + 24; // 24px gap
      }
    };

    measureWidth();
    window.addEventListener('resize', measureWidth);

    const wrapPosition = () => {
      if (halfWidth <= 0) return;
      while (currentTranslate <= -halfWidth) {
        currentTranslate += halfWidth;
        prevTranslate += halfWidth;
      }
      while (currentTranslate > 0) {
        currentTranslate -= halfWidth;
        prevTranslate -= halfWidth;
      }
    };

    const animate = () => {
      if (!isDown && !isHovered && halfWidth > 0) {
        currentTranslate -= 0.8;
        prevTranslate = currentTranslate;
        wrapPosition();
        track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      isDown = true;
      startX = e.pageX;
      prevTranslate = currentTranslate;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      const deltaX = e.pageX - startX;
      currentTranslate = prevTranslate + deltaX;
      wrapPosition();
      track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
    };

    const onMouseUp = () => {
      if (!isDown) return;
      isDown = false;
      prevTranslate = currentTranslate;
    };

    const onMouseEnter = () => {
      isHovered = true;
    };

    const onMouseLeave = () => {
      isHovered = false;
      if (isDown) {
        isDown = false;
        prevTranslate = currentTranslate;
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDown = true;
        startX = e.touches[0].pageX;
        prevTranslate = currentTranslate;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDown || e.touches.length !== 1) return;
      const deltaX = e.touches[0].pageX - startX;
      currentTranslate = prevTranslate + deltaX;
      wrapPosition();
      track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
    };

    const onTouchEnd = () => {
      isDown = false;
      prevTranslate = currentTranslate;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', measureWidth);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div className="w-full">
      {/* Slider viewport */}
      <div
        ref={containerRef}
        className="w-full overflow-hidden py-4 cursor-grab active:cursor-grabbing select-none"
        style={{ touchAction: 'pan-y' }}
      >
        <div ref={trackRef} className="flex items-center gap-6 w-max will-change-transform">
          {/* Group 1 */}
          <div className="senior-group flex items-center gap-6">
            {SENIOR_EXPERTS.map((expert) => (
              <div
                key={`s1-${expert.id}`}
                className="w-72 sm:w-80 shrink-0 bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-100 shrink-0 border-2 border-[#FF641A]/20">
                      <Image
                        src={expert.imageSrc}
                        alt={expert.name}
                        fill
                        sizes="64px"
                        loading="lazy"
                        className="object-cover pointer-events-none"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <h4 className="font-heading font-bold text-sm text-[#243445]">
                          {expert.name}
                        </h4>
                        <CheckCircle className="w-4 h-4 text-[#059669] shrink-0" />
                      </div>
                      <span className="text-xs text-slate-500 font-medium">
                        {expert.credentials}
                      </span>
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
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 font-bold text-[#FF641A]">
                    <Star className="w-4 h-4 fill-[#FF641A] text-[#FF641A]" />
                    <span className="text-[#243445]">{expert.rating}</span>
                    <span className="text-slate-400 font-normal">({expert.papersCount})</span>
                  </div>
                  <span className="text-[#059669] font-bold">{expert.successRate}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Group 2 (Duplicate for infinite seamless loop) */}
          <div className="senior-group flex items-center gap-6" aria-hidden="true">
            {SENIOR_EXPERTS.map((expert) => (
              <div
                key={`s2-${expert.id}`}
                className="w-72 sm:w-80 shrink-0 bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-100 shrink-0 border-2 border-[#FF641A]/20">
                      <Image
                        src={expert.imageSrc}
                        alt={expert.name}
                        fill
                        sizes="64px"
                        loading="lazy"
                        className="object-cover pointer-events-none"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <h4 className="font-heading font-bold text-sm text-[#243445]">
                          {expert.name}
                        </h4>
                        <CheckCircle className="w-4 h-4 text-[#059669] shrink-0" />
                      </div>
                      <span className="text-xs text-slate-500 font-medium">
                        {expert.credentials}
                      </span>
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
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 font-bold text-[#FF641A]">
                    <Star className="w-4 h-4 fill-[#FF641A] text-[#FF641A]" />
                    <span className="text-[#243445]">{expert.rating}</span>
                    <span className="text-slate-400 font-normal">({expert.papersCount})</span>
                  </div>
                  <span className="text-[#059669] font-bold">{expert.successRate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button linking to /about-us */}
      {/* <div className="mt-8 text-center">
        <Link
          href="/about-us"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5"
        >
          <span>Meet Our Experts</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div> */}
    </div>
  );
}
