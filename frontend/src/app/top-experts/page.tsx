import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  fetchPublicExperts,
  fetchPublicCalculator,
  TOP_EXPERTS_FAQS,
} from '@/lib/data-fetchers';
import TopExpertsDirectoryClient from '@/components/experts/TopExpertsDirectoryClient';
import RatingCards from '@/components/shared/RatingCards';
import UniversityMarquee from '@/components/shared/UniversityMarquee';
import VerifiedGradesMarquee from '@/components/shared/VerifiedGradesMarquee';
import FaqAccordion from '@/components/shared/FaqAccordion';
import { PriceCalculatorWidget } from '@/components/shared/PriceCalculatorWidget';
import JsonLd from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema, buildFaqPageSchema } from '@/lib/schema';
import AppIcon from '@/components/shared/AppIcon';

export const metadata: Metadata = {
  title: "Meet Top PhD & Master's Academic Specialists | ReadEssay",
  description:
    'Browse vetted doctoral and master researchers across Accounting, Computer Science, Finance, Mathematics, and Healthcare. Every expert is verified with a 99%+ on-time success rate.',
  alternates: {
    canonical: 'https://readessay.com/top-experts',
  },
  openGraph: {
    title: "Meet Top PhD & Master's Academic Specialists | ReadEssay",
    description:
      'Browse vetted doctoral and master researchers across Accounting, Computer Science, Finance, Mathematics, and Healthcare. Every expert is verified with a 99%+ on-time success rate.',
    url: 'https://readessay.com/top-experts',
    siteName: 'ReadEssay',
    type: 'website',
  },
};

export default async function TopExpertsPage() {
  const [experts, calculatorData] = await Promise.all([
    fetchPublicExperts(),
    fetchPublicCalculator(),
  ]);

  return (
    <div className="w-full bg-[#f8f9ff]">
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Top Experts', url: '/top-experts' },
          ]),
          buildFaqPageSchema(TOP_EXPERTS_FAQS),
        ]}
      />

      {/* HERO SECTION */}
      <section className="relative w-full bg-white overflow-hidden py-12 lg:py-20 border-b border-slate-100">
        <div className="absolute -top-32 right-10 w-96 h-96 bg-[#FFF2EC] rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-50/60 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          {/* BREADCRUMB */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-slate-500 mb-8"
          >
            <Link href="/" className="hover:text-[#FF641A] transition-colors">
              Home
            </Link>
            <AppIcon name="chevron_right" className="w-3.5 h-3.5" />
            <span className="text-[#243445] font-semibold">Top Experts</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left: Copy & Value Props */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF2EC] text-[#FF641A] text-xs sm:text-sm font-semibold self-start border border-[#FF641A]/20">
                <AppIcon name="verified" className="w-4 h-4" filled />
                <span>Verified Academic Faculty • PhD &amp; Master&apos;s Specialists</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#243445] tracking-tight leading-tight">
                Meet Our PhD &amp; Master&apos;s Subject Specialists
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                Connect with vetted scholars from Oxford, LSE, Stanford, and MIT.
                Receive dedicated 1-on-1 guidance for complex coursework, empirical dissertations,
                and proctored academic assessments.
              </p>

              {/* 5 Value Checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 pb-2">
                <div className="flex items-center gap-3">
                  <AppIcon name="check_circle" className="w-5 h-5 text-[#059669]" filled />
                  <span className="text-sm sm:text-base text-[#243445] font-medium">
                    100% Turnitin-Verified Originality
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <AppIcon name="check_circle" className="w-5 h-5 text-[#059669]" filled />
                  <span className="text-sm sm:text-base text-[#243445] font-medium">
                    Direct 1-on-1 Specialist Allocation
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <AppIcon name="check_circle" className="w-5 h-5 text-[#059669]" filled />
                  <span className="text-sm sm:text-base text-[#243445] font-medium">
                    24/7 Concierge &amp; WhatsApp Support
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <AppIcon name="check_circle" className="w-5 h-5 text-[#059669]" filled />
                  <span className="text-sm sm:text-base text-[#243445] font-medium">
                    Strict NDA &amp; Privacy Protocols
                  </span>
                </div>
                <div className="flex items-center gap-3 sm:col-span-2">
                  <AppIcon name="check_circle" className="w-5 h-5 text-[#059669]" filled />
                  <span className="text-sm sm:text-base text-[#243445] font-medium">
                    Unlimited Complimentary Amendments
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#059669] text-white text-sm sm:text-base font-semibold shadow-lg hover:bg-emerald-600 transition-transform hover:-translate-y-0.5"
                  href="https://wa.me/923138400066"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>WhatsApp Now</span>
                </a>
                <a
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FF641A] text-white text-sm sm:text-base font-semibold shadow-md hover:bg-[#E8540E] transition-colors hover:-translate-y-0.5"
                  href="https://wa.me/923138400066"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AppIcon name="chat" className="w-5 h-5" />
                  <span>Live Chat with Specialist</span>
                </a>
              </div>
            </div>

            {/* Right: Order Pricing Calculator */}
            <div className="lg:col-span-5 flex justify-center">
              <div id="hero-calculator-slot" className="w-full">
                <PriceCalculatorWidget initialData={calculatorData} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST RATINGS & UNIVERSITIES */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        <RatingCards />
      </section>

      <UniversityMarquee />

      {/* TOP EXPERTS INTERACTIVE DIRECTORY */}
      <TopExpertsDirectoryClient experts={experts} />

      {/* VERIFIED GRADES EVIDENCE SHOWCASE */}
      <section className="w-full bg-white py-16 lg:py-24 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#059669] bg-[#ECFDF5] px-3 py-1 rounded-full mb-2">
                <AppIcon name="verified" className="w-4 h-4" filled />
                Live Academic Evidence
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#243445]">
                Verified Grade Submissions &amp; Academic Scores
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Authentic screenshots of university portal results achieved by students who partnered with ReadEssay scholars.
              </p>
            </div>
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white text-xs font-bold transition-colors shadow-sm shrink-0"
            >
              <span>Read Student Reviews</span>
              <AppIcon name="arrow_forward" className="w-4 h-4" />
            </Link>
          </div>
          <VerifiedGradesMarquee />
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="w-full bg-[#f8f9ff] py-16 lg:py-24 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF641A]">
              Frequently Asked Questions
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#243445] mt-2">
              Everything You Need to Know About Our Academic Faculty
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Have questions about how we vet our scholars or coordinate custom coursework? Find quick answers below.
            </p>
          </div>
          <FaqAccordion items={TOP_EXPERTS_FAQS} />
        </div>
      </section>
    </div>
  );
}
