import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchAllPublicReviews, REVIEWS_FAQS } from '@/lib/data-fetchers';
import RatingCards from '@/components/shared/RatingCards';
import UniversityMarquee from '@/components/shared/UniversityMarquee';
import VerifiedGradesMarquee from '@/components/shared/VerifiedGradesMarquee';
import FaqAccordion from '@/components/shared/FaqAccordion';
import ReviewsFilterGrid from '@/components/reviews/ReviewsFilterGrid';

export const metadata: Metadata = {
  title: 'Student Reviews & Ratings - Genuine Experiences | ReadEssay',
  description:
    'Explore verified student reviews and ratings for ReadEssay. Genuine feedback, high grade outcomes, and authentic academic experiences from university scholars.',
  alternates: {
    canonical: 'https://readessay.com/reviews',
  },
  openGraph: {
    title: 'Student Reviews & Ratings - Genuine Experiences | ReadEssay',
    description:
      'Explore verified student reviews and ratings for ReadEssay. Genuine feedback, high grade outcomes, and authentic academic experiences.',
    url: 'https://readessay.com/reviews',
    siteName: 'ReadEssay',
    type: 'website',
  },
};

export default async function ReviewsPage() {
  const { reviews, stats } = await fetchAllPublicReviews();

  const totalReviewsCount = stats.totalReviews || reviews.length;
  const avgRatingFormatted = stats.averageRating ? stats.averageRating.toFixed(1) : '4.8';

  // Compute percentage for 5-star and 4-star breakdown
  const breakdown = stats.ratingBreakdown || { 5: reviews.length, 4: 0, 3: 0, 2: 0, 1: 0 };
  const fiveStarPercent = totalReviewsCount > 0 ? Math.round(((breakdown[5] || 0) / totalReviewsCount) * 100) : 92;
  const fourStarPercent = totalReviewsCount > 0 ? Math.round(((breakdown[4] || 0) / totalReviewsCount) * 100) : 8;

  return (
    <div className="w-full bg-[#f8f9ff]">
      {/* BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="w-full bg-white border-b border-slate-200/80 py-3">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-[#FF641A] transition-colors">
            Home
          </Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#243445] font-semibold">Reviews</span>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative w-full bg-white overflow-hidden py-12 lg:py-20 border-b border-slate-100">
        <div className="absolute -top-32 right-10 w-96 h-96 bg-[#FFF2EC] rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-50/60 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left: Copy & Value Props */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF2EC] text-[#FF641A] text-xs sm:text-sm font-semibold self-start border border-[#FF641A]/20">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>Real Experiences. Honest Feedback. Trusted Academic Support.</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#243445] tracking-tight leading-tight">
                See What Students Say About Their ReadEssay Experience
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                Explore genuine student feedback and discover why over 10,000+ university scholars trust ReadEssay for reliable academic support, high grades, and exceptional service.
              </p>

              {/* 5 Value Checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 pb-2">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#059669] text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                    check_circle
                  </span>
                  <span className="text-sm text-[#243445] font-medium">100% Unique Content</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#059669] text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                    check_circle
                  </span>
                  <span className="text-sm text-[#243445] font-medium">Strong Attention to deadlines</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#059669] text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                    check_circle
                  </span>
                  <span className="text-sm text-[#243445] font-medium">24/7 Support handled with professionalism</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#059669] text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                    check_circle
                  </span>
                  <span className="text-sm text-[#243445] font-medium">100% Money Back Guarantee</span>
                </div>
                <div className="flex items-center gap-3 sm:col-span-2">
                  <span className="material-symbols-outlined text-[#059669] text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                    check_circle
                  </span>
                  <span className="text-sm text-[#243445] font-medium">Revisions as per your Desires!</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#059669] text-white font-semibold text-sm shadow-lg hover:bg-emerald-700 transition-all hover:-translate-y-0.5"
                  href="https://wa.me/923138400066"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>WhatsApp Now</span>
                </a>
                <Link
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FF641A] text-white font-semibold text-sm shadow-md hover:bg-[#E8540E] transition-all hover:-translate-y-0.5"
                  href="/services"
                >
                  <span className="material-symbols-outlined text-[20px]">explore</span>
                  <span>Browse All Services</span>
                </Link>
              </div>
            </div>

            {/* Right: Aggregate Rating & KPI Summary Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 relative">
                <div className="absolute -top-3.5 right-6 bg-[#FF641A] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Verified Summary
                </div>

                <div className="flex flex-col mb-6">
                  <span className="text-xs font-semibold text-[#FF641A] uppercase tracking-wider">
                    Aggregate Student Feedback
                  </span>
                  <h2 className="font-heading text-2xl font-bold text-[#243445] mt-1">
                    Student Rating Score
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Consolidated score across direct portal orders, AS Reviews, Sitejabber, and Trustpilot.
                  </p>
                </div>

                <div className="flex items-center gap-6 p-5 rounded-2xl bg-[#f8f9ff] border border-slate-100 mb-6">
                  <div className="text-center shrink-0">
                    <span className="font-heading text-4xl sm:text-5xl font-extrabold text-[#243445] block">
                      {avgRatingFormatted}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">out of 5.0</span>
                  </div>
                  <div className="border-l border-slate-200 pl-6 space-y-1">
                    <div className="flex items-center space-x-1 text-[#FF641A]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                          star
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#243445] block">
                      Based on {totalReviewsCount}+ Authenticated Reviews
                    </span>
                    <span className="text-[11px] text-[#059669] font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">verified</span>
                      100% Verified Customer Identities
                    </span>
                  </div>
                </div>

                {/* Rating Distribution Bars */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="w-14 font-semibold text-slate-600">5 Stars</span>
                    <div className="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-[#FF641A] rounded-full" style={{ width: `${fiveStarPercent}%` }} />
                    </div>
                    <span className="w-10 text-right font-bold text-slate-600">{fiveStarPercent}%</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="w-14 font-semibold text-slate-600">4 Stars</span>
                    <div className="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-[#FF641A]/70 rounded-full" style={{ width: `${fourStarPercent}%` }} />
                    </div>
                    <span className="w-10 text-right font-bold text-slate-600">{fourStarPercent}%</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs opacity-50">
                    <span className="w-14 font-semibold text-slate-600">3 Stars</span>
                    <div className="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-slate-300 rounded-full" style={{ width: '0%' }} />
                    </div>
                    <span className="w-10 text-right font-bold text-slate-600">0%</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#059669] text-[16px]">security</span>
                    Encrypted SSL Reviews
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#059669] text-[16px]">thumb_up</span>
                    99.4% Student Approval
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RATINGS & SENIOR TRUST BAR */}
      <section className="w-full bg-[#f8f9ff] py-10 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
          {/* Rating Cards Component */}
          <RatingCards />

          {/* Connect with Seniors Marquee */}
          <UniversityMarquee />
        </div>
      </section>

      {/* VERIFIED STUDENT REVIEWS SECTION WITH FILTER GRID */}
      <section className="w-full py-16 lg:py-24" id="reviews-directory">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 bg-[#FFF2EC] text-[#FF641A] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-[#FF641A]/20">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span>VERIFIED STUDENT EXPERIENCES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#243445] tracking-tight font-heading">
              What Students Are Saying About ReadEssay
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Real, unfiltered feedback from university students who achieved higher grades and met strict academic deadlines with our accredited PhD researchers.
            </p>
          </div>

          {/* Client Filter & Grid */}
          <ReviewsFilterGrid initialReviews={reviews} />
        </div>
      </section>

      {/* VERIFIED GRADES TRANSCRIPT SHOWCASE */}
      <section className="w-full bg-white py-16 lg:py-24 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#059669] bg-[#ECFDF5] px-3 py-1 rounded-full mb-2">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Verified Evidence
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#243445]">
                Verified Grade Submissions &amp; Academic Scores
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Authentic screenshots of university portal results achieved by students who partnered with ReadEssay.
              </p>
            </div>
            <Link
              href="/samples"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white text-xs font-bold transition-colors shadow-sm shrink-0"
            >
              <span>View All Samples</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          <VerifiedGradesMarquee />
        </div>
      </section>

      {/* CORE QUALITY GUARANTEES (2x3 GRID) */}
      <section className="w-full bg-[#f8f9ff] py-16 lg:py-24 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
              Unmatched Standards
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#243445] mt-2">
              Core Quality Guarantees
            </h2>
            <p className="text-base text-slate-600 mt-3">
              Our service commitment ensures every single assignment or test assistance request is delivered under airtight guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-[#FFF2EC] text-[#FF641A] flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-[26px]">workspace_premium</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-[#243445] mb-2">
                Best Quality Assignments &amp; Papers
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The writers hired by ReadEssay are experienced specialists. This assures intensive research behind each order, designed specifically to secure high grades.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-[26px]">task_alt</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-[#243445] mb-2">
                Plagiarism-Free Work
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                It is against our core values to deliver any project without screening. All work is 100% original and verified through industry-grade scanners.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-[26px]">find_in_page</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-[#243445] mb-2">
                Proofreading &amp; Revisions
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Specialized editors inspect every document prior to final submission. We ensure zero grammatical, formatting, or contextual errors remain.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-[#243445] text-white flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-[26px]">alarm_on</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-[#243445] mb-2">
                Meeting All Deadlines
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our writers complete assignments at least 24 hours prior to your cutoff whenever possible, eliminating anxiety and giving you ample time for review.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-[#FFF2EC] text-[#FF641A] flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-[26px]">headset_mic</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-[#243445] mb-2">
                24/7 Customer Support Availability
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Regardless of your time zone, log onto ReadEssay any time. Our responsive operators provide instant answers and seamless order status updates.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-[26px]">published_with_changes</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-[#243445] mb-2">
                On-Time Delivery &amp; Free Revisions
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Even after delivery, you have continuous access to fast adjustments. Writers make any required instructor amendments without additional fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSPARENT PRICING & SUBJECT CATALOG */}
      <section className="w-full bg-white py-16 lg:py-24 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
              Honest Upfront Pricing
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#243445] mt-2">
              Transparent Rates for Every Stage
            </h2>
            <p className="text-base text-slate-600 mt-3">
              No hidden fees or unexpected surge charges. Simple pricing that fits student budgets with guaranteed top academic delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between text-center border border-slate-200">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Custom Papers</span>
                <div className="font-heading text-xl font-bold text-[#243445] mt-1">
                  Essay Writing
                </div>
                <div className="mt-4 mb-2">
                  <span className="text-xs text-slate-400">from </span>
                  <span className="font-heading text-3xl text-[#FF641A] font-bold">$9.50</span>
                  <span className="text-xs text-slate-400"> / page</span>
                </div>
                <p className="text-xs text-slate-500 mb-6">
                  Original research, formatting &amp; free title page.
                </p>
              </div>
              <Link
                href="/services"
                className="w-full py-2.5 rounded-full bg-slate-100 hover:bg-[#FF641A] hover:text-white text-[#243445] text-xs font-bold transition-colors"
              >
                Order Essay
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between text-center border border-slate-200">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Refinement</span>
                <div className="font-heading text-xl font-bold text-[#243445] mt-1">
                  Proofreading
                </div>
                <div className="mt-4 mb-2">
                  <span className="text-xs text-slate-400">from </span>
                  <span className="font-heading text-3xl text-[#FF641A] font-bold">$7.34</span>
                  <span className="text-xs text-slate-400"> / page</span>
                </div>
                <p className="text-xs text-slate-500 mb-6">
                  Grammar check, tone polishing &amp; citation review.
                </p>
              </div>
              <Link
                href="/services"
                className="w-full py-2.5 rounded-full bg-slate-100 hover:bg-[#FF641A] hover:text-white text-[#243445] text-xs font-bold transition-colors"
              >
                Order Review
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between text-center border-2 border-[#FF641A]">
              <div>
                <span className="text-xs text-[#FF641A] uppercase tracking-wider font-bold">Advanced Degrees</span>
                <div className="font-heading text-xl font-bold text-[#243445] mt-1">
                  Dissertation Help
                </div>
                <div className="mt-4 mb-2">
                  <span className="text-xs text-slate-400">from </span>
                  <span className="font-heading text-3xl text-[#FF641A] font-bold">$15.50</span>
                  <span className="text-xs text-slate-400"> / page</span>
                </div>
                <p className="text-xs text-slate-500 mb-6">
                  Chapter methodology, data models &amp; defense prep.
                </p>
              </div>
              <Link
                href="/services"
                className="w-full py-2.5 rounded-full bg-[#FF641A] text-white text-xs font-bold shadow-md hover:bg-[#E8540E] transition-colors"
              >
                Order Thesis
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between text-center border border-slate-200">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Quick Polish</span>
                <div className="font-heading text-xl font-bold text-[#243445] mt-1">
                  Editing Services
                </div>
                <div className="mt-4 mb-2">
                  <span className="text-xs text-slate-400">from </span>
                  <span className="font-heading text-3xl text-[#FF641A] font-bold">$5.50</span>
                  <span className="text-xs text-slate-400"> / page</span>
                </div>
                <p className="text-xs text-slate-500 mb-6">
                  Structural flow, syntax corrections &amp; formatting.
                </p>
              </div>
              <Link
                href="/services"
                className="w-full py-2.5 rounded-full bg-slate-100 hover:bg-[#FF641A] hover:text-white text-[#243445] text-xs font-bold transition-colors"
              >
                Order Editing
              </Link>
            </div>
          </div>

          {/* Supported Subject Tags */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <h3 className="font-heading text-lg font-bold text-[#243445] text-center mb-6">
              Supported Disciplines &amp; Academic Faculties
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {[
                'Statistics',
                'Accounting',
                'Mathematics',
                'Corporate Finance',
                'Chemistry & Physics',
                'Computer Science (CS)',
                'Macro & Micro Economics',
                'English Literature',
                'Clinical Nursing',
                'Psychology & Behavioral',
                'Strategic Management',
                'Supply Chain & Logistics',
                'Operations Management',
              ].map((subject) => (
                <span
                  key={subject}
                  className="px-4 py-2 rounded-full bg-white text-slate-700 text-xs font-semibold border border-slate-200 shadow-2xs"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="w-full py-16 lg:py-24 bg-[#f8f9ff]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
              Clarifications &amp; Help
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#243445] mt-2">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-base text-slate-600 mt-3">
              Find rapid answers about our verified reviews, money-back guarantees, and quality assurance workflows.
            </p>
          </div>

          <FaqAccordion items={REVIEWS_FAQS} />
        </div>
      </section>

      {/* CONVERSION BOTTOM CTA BANNER & DIRECT HOTLINES */}
      <section className="w-full bg-[#f8f9ff] pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-[#243445] text-white rounded-3xl p-8 lg:p-14 relative overflow-hidden shadow-2xl">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#FF641A]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8">
                <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
                  Get In Touch With Us
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-2 leading-tight">
                  Excel your academic journey today with ReadEssay&apos;s online class service and protected exam service.
                </h2>
                <p className="text-base text-slate-300 mt-4 leading-relaxed max-w-2xl">
                  Don&apos;t let coursework weigh you down. We are your partners in your academic journey. Ordering from ReadEssay.com is absolutely safe and secure.
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-8">
                  <a
                    className="flex items-center gap-3 px-5 py-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors border border-slate-700"
                    href="tel:+923138400066"
                  >
                    <span className="material-symbols-outlined text-[#FF641A] text-[22px]">phone_iphone</span>
                    <div>
                      <span className="text-[10px] block uppercase tracking-wider text-slate-400">PK WhatsApp Hotline</span>
                      <span className="text-xs font-bold">+92 3138400066</span>
                    </div>
                  </a>
                  <a
                    className="flex items-center gap-3 px-5 py-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors border border-slate-700"
                    href="tel:+447460674811"
                  >
                    <span className="material-symbols-outlined text-[#FF641A] text-[22px]">call</span>
                    <div>
                      <span className="text-[10px] block uppercase tracking-wider text-slate-400">UK Support Desk</span>
                      <span className="text-xs font-bold">+44 7460 674811</span>
                    </div>
                  </a>
                  <a
                    className="flex items-center gap-3 px-5 py-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors border border-slate-700"
                    href="mailto:support@readessay.com"
                  >
                    <span className="material-symbols-outlined text-[#FF641A] text-[22px]">mail</span>
                    <div>
                      <span className="text-[10px] block uppercase tracking-wider text-slate-400">Official Email</span>
                      <span className="text-xs font-bold">support@readessay.com</span>
                    </div>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end">
                <Link
                  className="px-8 py-5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white font-heading font-bold text-lg shadow-xl transition-all transform hover:-translate-y-1 text-center w-full lg:w-auto"
                  href="/services"
                >
                  Browse Services &amp; Order
                </Link>
                <span className="text-slate-400 text-xs mt-3 text-center lg:text-right block w-full">
                  Grade A or B Guaranteed • 100% Refundable
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
