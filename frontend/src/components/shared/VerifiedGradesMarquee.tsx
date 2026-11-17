'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface GradeItem {
  id: string;
  imageSrc: string;
  alt: string;
  title: string;
  scoreBadge: string;
  platform: string;
}

const GRADE_ITEMS: GradeItem[] = [
  {
    id: 'grade-1',
    imageSrc: '/images/grade-cipd.png',
    alt: 'CIPD Grade Evidence',
    title: 'CIPD Level 7 Assignment',
    scoreBadge: '78 / 100 Distinction',
    platform: 'CIPD Portal',
  },
  {
    id: 'grade-2',
    imageSrc: '/images/grade-whatsapp.png',
    alt: 'WhatsApp Result Proof',
    title: 'Final Exam Submission',
    scoreBadge: 'Grade: 94% (A+)',
    platform: 'Verified WhatsApp Score',
  },
  {
    id: 'grade-3',
    imageSrc: '/images/grade119.png',
    alt: 'Blackboard Grade Proof',
    title: 'Statistics & Probability',
    scoreBadge: '98% (A Grade)',
    platform: 'Blackboard Learn',
  },
  {
    id: 'grade-4',
    imageSrc: '/images/grade-laptop.png',
    alt: 'Canvas Portal Grade',
    title: 'Business Research Methods',
    scoreBadge: '96 / 100',
    platform: 'Canvas LMS',
  },
  {
    id: 'grade-5',
    imageSrc: '/images/grade162.png',
    alt: 'Mobile Grade Evidence',
    title: 'Corporate Finance Quiz',
    scoreBadge: 'Score: 100 / 100',
    platform: 'Brightspace LMS',
  },
  {
    id: 'grade-6',
    imageSrc: '/images/grade191.png',
    alt: 'Operation Management Score',
    title: 'Operations Management Exam',
    scoreBadge: 'Grade: A (91%)',
    platform: 'Moodle Portal',
  },
  {
    id: 'grade-7',
    imageSrc: '/images/faisal-alhad.png',
    alt: 'Principles of Finance Grade',
    title: 'Principles of Finance',
    scoreBadge: 'Grade: 95% (A)',
    platform: 'University Portal',
  },
  {
    id: 'grade-8',
    imageSrc: '/images/kimberley-wood.png',
    alt: 'Tutor Feedback and Grade',
    title: 'Economics Dissertation Module',
    scoreBadge: '33 / 40 (A Grade)',
    platform: 'Instructor Feedback',
  },
];

export default function VerifiedGradesMarquee() {
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
      const firstGroup = track.querySelector<HTMLDivElement>('.grade-group');
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
        currentTranslate -= 0.85;
        prevTranslate = currentTranslate;
        wrapPosition();
        track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Mouse & Touch Drag Handlers
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
      {/* Interactive Drag & Auto-Scroll Slider Container */}
      <div
        ref={containerRef}
        className="w-full overflow-hidden py-4 cursor-grab active:cursor-grabbing select-none"
        style={{ touchAction: 'pan-y' }}
      >
        <div ref={trackRef} className="flex items-center gap-6 w-max will-change-transform">
          {/* Group 1 */}
          <div className="grade-group flex items-center gap-6">
            {GRADE_ITEMS.map((item) => (
              <div
                key={`g1-${item.id}`}
                className="w-72 sm:w-80 shrink-0 bg-white rounded-2xl p-4 shadow-md border border-slate-200/80 hover:shadow-xl transition-shadow flex flex-col justify-between"
              >
                <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden bg-slate-100 mb-3 border border-slate-200/60">
                  <Image
                    src={item.imageSrc}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 288px, 320px"
                    loading="lazy"
                    className="object-cover object-top pointer-events-none"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      {item.platform}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  </div>
                  <h4 className="font-heading font-semibold text-sm text-[#243445] line-clamp-1">
                    {item.title}
                  </h4>
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Result:</span>
                    <span className="font-bold text-[#FF641A]">{item.scoreBadge}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Group 2 (Duplicate for infinite seamless loop) */}
          <div className="grade-group flex items-center gap-6" aria-hidden="true">
            {GRADE_ITEMS.map((item) => (
              <div
                key={`g2-${item.id}`}
                className="w-72 sm:w-80 shrink-0 bg-white rounded-2xl p-4 shadow-md border border-slate-200/80 hover:shadow-xl transition-shadow flex flex-col justify-between"
              >
                <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden bg-slate-100 mb-3 border border-slate-200/60">
                  <Image
                    src={item.imageSrc}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 288px, 320px"
                    loading="lazy"
                    className="object-cover object-top pointer-events-none"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      {item.platform}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  </div>
                  <h4 className="font-heading font-semibold text-sm text-[#243445] line-clamp-1">
                    {item.title}
                  </h4>
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Result:</span>
                    <span className="font-bold text-[#FF641A]">{item.scoreBadge}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button linking to /samples */}
      <div className="mt-8 text-center">
        <Link
          href="/samples"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5"
        >
          <span>View All Samples</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
