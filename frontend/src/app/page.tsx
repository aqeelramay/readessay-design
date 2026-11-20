import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle2,
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  Star,
  FileCheck,
  Headphones,
  Award,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Users,
  Search,
  ShoppingCart,
  BookOpen,
  Laptop,
  Lock,
  DollarSign,
  HelpCircle,
  Check,
} from 'lucide-react';
import {
  fetchServiceTree,
  fetchFeaturedReviews,
  fetchPublicCalculator,
  resolveReviewAvatar,
  DEFAULT_FAQS,
} from '@/lib/data-fetchers';
import RatingCards from '@/components/shared/RatingCards';
import UniversityMarquee from '@/components/shared/UniversityMarquee';
import TopExpertsCarousel from '@/components/shared/TopExpertsCarousel';
import VerifiedGradesMarquee from '@/components/shared/VerifiedGradesMarquee';
import FaqAccordion from '@/components/shared/FaqAccordion';
import { PriceCalculatorWidget } from '@/components/shared/PriceCalculatorWidget';
import JsonLd from '@/components/seo/JsonLd';
import { buildFaqPageSchema } from '@/lib/schema';
import AppIcon from '@/components/shared/AppIcon';

export default async function HomePage() {
  // Fetch live services tree, reviews and calculator data on the server with ISR caching
  const [serviceTree, reviews, calculatorData] = await Promise.all([
    fetchServiceTree(),
    fetchFeaturedReviews(),
    fetchPublicCalculator(),
  ]);

  // Select 2 main services for the Comprehensive Subject Matrix
  // Prefer assignment-help and homework-help so each card is richly populated
  const preferredSlugs = ['assignment-help', 'homework-help'];
  const preferredServices = preferredSlugs
    .map((slug) => serviceTree.find((s) => s.slug === slug))
    .filter((s): s is (typeof serviceTree)[number] => Boolean(s));

  const matrixServices =
    preferredServices.length >= 2
      ? preferredServices.slice(0, 2)
      : serviceTree.filter((s) => (s.subServices?.length ?? 0) >= 4).length >= 2
        ? serviceTree.filter((s) => (s.subServices?.length ?? 0) >= 4).slice(0, 2)
        : serviceTree.slice(0, 2);

  return (
    <div className="w-full flex flex-col">
      <JsonLd data={buildFaqPageSchema(DEFAULT_FAQS)} />
      {/* =====================================================================
          1. HERO SECTION
          Two-column layout with clean reserved slot for Price Calculator
      ====================================================================== */}
      <section className="relative w-full bg-white overflow-hidden py-12 lg:py-20 border-b border-slate-100">
        <div className="absolute -top-32 right-10 w-96 h-96 bg-[#FFF2EC] rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-slate-50 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headlines, Trust Badges, CTAs */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF2EC] text-[#FF641A] text-xs font-semibold self-start border border-[#FF641A]/20">
                <Clock className="w-4 h-4" />
                <span>DELIVERED ON TIME • 24/7 DEDICATED ACADEMIC EXPERTS</span>
              </div>

              {/* Exact Hero h1 with Poppins and font-weight: 700 (font-bold) */}
              <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#243445] tracking-tight leading-[1.18]">
                USA&apos;s No.1 Online Classes and Academic Writing Company{' '}
                <span className="text-[#FF641A]">Thesis/Dissertation</span> Editing 24/7
              </h1>

              <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
                Trusted academic helpers ensuring top grades, verified confidentiality,
                and zero stress across all collegiate platforms.
              </p>

              {/* 5 Value Checkmarks with #059669 Green */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 pb-2">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0" />
                  <span className="text-sm font-medium text-[#243445]">100% Unique Content</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0" />
                  <span className="text-sm font-medium text-[#243445]">Strong Attention to deadlines</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0" />
                  <span className="text-sm font-medium text-[#243445]">24/7 Support handled with professionalism</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0" />
                  <span className="text-sm font-medium text-[#243445]">100% Money Back Guarantee</span>
                </div>
                <div className="flex items-center gap-3 sm:col-span-2">
                  <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0" />
                  <span className="text-sm font-medium text-[#243445]">Revisions as per your Desires!</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="https://wa.me/923138400066"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#059669] text-white font-bold text-sm shadow-lg hover:bg-emerald-700 transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp Now</span>
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FF641A] text-white font-bold text-sm shadow-md hover:bg-[#E8540E] transition-colors hover:-translate-y-0.5"
                >
                  <Headphones className="w-5 h-5" />
                  <span>Live Chat with Expert</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Price Calculator Widget */}
            <div className="lg:col-span-5">
              <div id="hero-calculator-slot" className="w-full">
                <PriceCalculatorWidget initialData={calculatorData} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. RATINGS & INSTITUTIONAL TRUST BAR + CONNECT WITH SENIORS
      ====================================================================== */}
      <section className="w-full bg-slate-50 py-10 shadow-inner border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* AS Reviews, Sitejabber & Trustpilot Rating Cards */}
          <RatingCards />

          {/* Connect with Seniors University Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex flex-col items-center justify-between gap-6">
            <div className="w-full flex flex-col items-center text-center">
              <div className="font-heading text-xl font-bold text-[#FF641A] flex items-center justify-center gap-2 mb-2">
                <Users className="w-6 h-6 text-[#FF641A]" />
                <span>Connect with Seniors</span>
              </div>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mb-6 text-center leading-relaxed">
                10,000+ Students across American, Australian, Canadian and
                Middle East Universities. Connect to ask anything. Absolutely
                Free. Fast.
              </p>

              {/* Complete University Marquee Slider */}
              <UniversityMarquee />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. SERVICE HUB & ACADEMIC CATEGORIES (Comprehensive Subject Matrix)
      ====================================================================== */}
      <section className="w-full bg-white py-16 lg:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF641A]">
              Comprehensive Subject Matrix
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#243445] mt-2">
              Specialized Support Across All Domains
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
              Whether you need daily homework submission assistance or
              extensive thesis assignments, our PhD-qualified tutors are
              matched to your exact academic field.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {matrixServices.map((service) => {
              const displayedSubServices = (service.subServices ?? []).slice(0, 4);

              return (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl p-8 shadow-md border border-slate-200/80 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#FFF2EC] text-[#FF641A] flex items-center justify-center font-bold">
                          <GraduationCap className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-xl text-[#243445]">
                            <Link href={`/${service.slug}`} className="hover:text-[#FF641A] transition-colors">
                              {service.title}
                            </Link>
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {service.shortDescription || 'Fast turnaround, doctoral problem sets & guidance'}
                          </p>
                        </div>
                      </div>
                      {service.subServices && service.subServices.length > 0 && (
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium shrink-0">
                          {service.subServices.length} Modules
                        </span>
                      )}
                    </div>

                    {/* Clickable Sub-Service Pills (strictly max 4 arranged in a clean 2x2 grid) */}
                    {displayedSubServices.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6">
                        {displayedSubServices.map((sub) => (
                          <Link
                            key={sub.id}
                            href={`/${service.slug}/${sub.slug}`}
                            className="p-3.5 rounded-xl bg-slate-50 hover:bg-[#FFF2EC] text-[#243445] hover:text-[#FF641A] transition-colors flex items-center gap-2.5 text-xs sm:text-sm font-medium border border-slate-100"
                          >
                            <Check className="w-4 h-4 text-[#FF641A] shrink-0" />
                            <span className="leading-snug">{sub.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Centered Unconditional More Services CTA Button */}
          <div className="mt-12 flex items-center justify-center">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF641A] px-7 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#e55612] transition-colors"
            >
              <span>More Services</span>
              <AppIcon name="arrow_forward" className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. INTRODUCTION & CORE SERVICES (Unlocking Scholarly Balance)
      ====================================================================== */}
      <section className="w-full bg-slate-50 py-16 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-white rounded-3xl p-8 lg:p-14 shadow-lg mb-16 border border-slate-200/80">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF641A]">
                Unlocking Scholarly Balance
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#243445] mt-2 leading-tight">
                Ace Your Online Classes with ReadEssay Academic Helpers
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
                Are you struggling with online classes, assignments, and
                online coursework? Are online exams giving you chills and
                turning your days into nightmares? Don&apos;t worry! You are not
                alone! Students worldwide approach us, sharing their concerns
                and queries that overwhelm them. We, in return, offer them a
                one-stop solution: a robust online class service.
              </p>
              <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
                Our online professionals help struggling students manage their
                online coursework, take their online classes, assist them with
                homework, and tackle their protected exams so they can easily
                manage their personal and professional commitments. Our team
                of top online class helpers ensures you stay ahead without
                compromising on anything. We offload your burden; you can
                enjoy a stress-free life.
              </p>
            </div>

            {/* Direct Quote Callout */}
            <div className="mt-8 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
              <div>
                <div className="font-heading font-bold text-lg text-[#243445]">
                  Contact us today to live a stress-free life!
                </div>
                <div className="text-slate-600 text-sm">
                  Your success is in your own hands!
                </div>
              </div>
              <a
                href="https://wa.me/923138400066"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white font-bold text-sm shadow-md flex items-center gap-2 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>TEXT ME A FREE QUOTE!</span>
              </a>
            </div>
          </div>

          {/* 3 Feature Spotlight Cards */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#243445]">
              Readessay Services You Can Trust – Academic Help Tailored Just For You
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
              At ReadEssay, we offer many online class services designed
              especially for students like you. We keep students&apos; needs in
              mind and, therefore, offer assistance at every academic level for
              all academic needs. So whether you need help with a single
              assignment or want help with a complete online coursework, we
              have got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#FFF2EC] text-[#FF641A] flex items-center justify-center mb-6">
                  <Laptop className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-bold text-xl text-[#243445] mb-3">
                  Online Class Help
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Keeping up with lectures, quizzes, and assignments can be
                  overwhelming. But we have the best solution: We will take
                  your online class and manage your coursework. Our experts
                  will help you ace your grades and stay on top during online
                  classes.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-100">
                <Link
                  href="/online-class-help"
                  className="text-sm font-bold text-[#FF641A] flex items-center gap-1.5 hover:translate-x-1 transition-transform"
                >
                  <span>Explore Coursework Support</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-[#243445] flex items-center justify-center mb-6">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-bold text-xl text-[#243445] mb-3">
                  Online Homework Assistance
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Our academic writers provide detailed, well-researched
                  solutions tailored to coursework requirements. So, if your
                  assignments are piling up and submitting assignments is
                  leaving you overwhelmed, hire our experts today.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-100">
                <Link
                  href="/homework-help"
                  className="text-sm font-bold text-[#FF641A] flex items-center gap-1.5 hover:translate-x-1 transition-transform"
                >
                  <span>View Homework Tutors</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-6">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-bold text-xl text-[#243445] mb-3">
                  Online Protected Exam Help
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Our skilled, knowledgeable professionals skillfully take
                  protected exams for students, maintaining your privacy. So,
                  if you want to ace your grade securely, hire our experts. We
                  help you score higher with absolute safety.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-100">
                <Link
                  href="/exam-help"
                  className="text-sm font-bold text-[#FF641A] flex items-center gap-1.5 hover:translate-x-1 transition-transform"
                >
                  <span>Secure Exam Protocols</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Hook CTA Bar */}
          <div className="text-center mt-12">
            <h3 className="font-heading font-bold text-xl text-[#243445] max-w-2xl mx-auto mb-6 text-center">
              Get hooked with the best expert today! No more delays; make the
              smart choice today!
            </h3>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white font-bold text-sm shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>PLACE AN ORDER NOW!</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. HOW IT WORKS – A Simple, Seamless Process (4 Steps)
      ====================================================================== */}
      <section className="w-full bg-white py-16 lg:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF641A]">
              Transparent Workflow
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#243445] mt-2">
              How It Works – A Simple, Seamless Process To Achieve Academic Excellence
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
              We understand the burden students hold. Therefore, we present
              you with a stress-free and rapid 4-step workflow to achieve
              academic excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-7 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-200/80 flex flex-col">
              <div className="w-12 h-12 rounded-full bg-[#243445] text-white flex items-center justify-center font-heading font-bold text-lg mb-6 shadow-md">
                1
              </div>
              <h3 className="font-heading font-bold text-lg text-[#243445] mb-2">
                Place Your Order
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Share details about your syllabus, assignments, ongoing
                classes, or exam dates through our confidential intake forms.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-7 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-200/80 flex flex-col">
              <div className="w-12 h-12 rounded-full bg-[#FF641A] text-white flex items-center justify-center font-heading font-bold text-lg mb-6 shadow-md">
                2
              </div>
              <h3 className="font-heading font-bold text-lg text-[#243445] mb-2">
                Confirm The Payment
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Receive a transparent quote customized to your rubric and
                deadlines. Secure your booking through encrypted checkout.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-7 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-200/80 flex flex-col">
              <div className="w-12 h-12 rounded-full bg-[#243445] text-white flex items-center justify-center font-heading font-bold text-lg mb-6 shadow-md">
                3
              </div>
              <h3 className="font-heading font-bold text-lg text-[#243445] mb-2">
                Work In Progress
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our subject specialist begins immediately. You receive regular
                live updates directly via WhatsApp or client dashboard.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl p-7 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-200/80 flex flex-col">
              <div className="w-12 h-12 rounded-full bg-[#059669] text-white flex items-center justify-center font-heading font-bold text-lg mb-6 shadow-md">
                4
              </div>
              <h3 className="font-heading font-bold text-lg text-[#243445] mb-2">
                Receive Completed Work
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                All coursework, papers, and exam results are delivered timely
                alongside a verified originality &amp; plagiarism report.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. CORE ACADEMIC SOLUTIONS (4 Featured Dedicated Solutions)
      ====================================================================== */}
      <section className="w-full bg-slate-50 py-16 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF641A]">
              CORE ACADEMIC SOLUTIONS
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#243445] mt-2 leading-tight">
              Achieving success was never so easy. Get started with the best
              online class services today and make your academic journey
              stress-free!
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3">
              Select your service module to lock in dedicated doctoral-level
              assistance today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Solution Card 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-200/80">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FFF2EC] text-[#FF641A] flex items-center justify-center mb-4">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#243445] mb-2">
                  Pay to do My Assignment Help
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  If you&apos;re tired and have multiple coursework lined up, don&apos;t
                  fret. ReadEssay has writers trained across all disciplines
                  ready to cater to urgent guidelines.
                </p>
                <Link
                  href="/assignment-help"
                  className="text-xs font-semibold text-[#FF641A] hover:underline mb-6 flex items-center gap-1"
                >
                  <span>Continue Reading....</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <Link
                href="/contact"
                className="w-full py-2.5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white text-xs font-bold text-center transition-colors shadow-sm block"
              >
                Order Now
              </Link>
            </div>

            {/* Solution Card 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-200/80">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#243445] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#243445] mb-2">
                  Online Protected Exam Help
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Are online proctored exams too stressful? Deadlines
                  intimidating? Find verified experts ready to take
                  assessments with total privacy.
                </p>
                <Link
                  href="/exam-help"
                  className="text-xs font-semibold text-[#FF641A] hover:underline mb-6 flex items-center gap-1"
                >
                  <span>Continue Reading....</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <Link
                href="/contact"
                className="w-full py-2.5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white text-xs font-bold text-center transition-colors shadow-sm block"
              >
                Order Now
              </Link>
            </div>

            {/* Solution Card 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-200/80">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#243445] text-white flex items-center justify-center mb-4">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#243445] mb-2">
                  Take My Class Help
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Lengthy coursework and endless discussions can overwhelm
                  busy schedules. ReadEssay is ready to share the entire term
                  workload for guaranteed A/B grades.
                </p>
                <Link
                  href="/online-class-help"
                  className="text-xs font-semibold text-[#FF641A] hover:underline mb-6 flex items-center gap-1"
                >
                  <span>Continue Reading....</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <Link
                href="/contact"
                className="w-full py-2.5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white text-xs font-bold text-center transition-colors shadow-sm block"
              >
                Order Now
              </Link>
            </div>

            {/* Solution Card 4 */}
            <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-200/80">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-4">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#243445] mb-2">
                  Do my Online Quiz &amp; Test Help
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  College and high school virtual facilities test knowledge
                  under strict timers. Let our subject experts handle your
                  weekly tests and secure top scores.
                </p>
                <Link
                  href="/exam-help"
                  className="text-xs font-semibold text-[#FF641A] hover:underline mb-6 flex items-center gap-1"
                >
                  <span>Continue Reading....</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <Link
                href="/contact"
                className="w-full py-2.5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white text-xs font-bold text-center transition-colors shadow-sm block"
              >
                Order Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. WHY CHOOSE READESSAY? (6 Pillars)
      ====================================================================== */}
      <section className="w-full bg-white py-16 lg:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF641A]">
              Uncompromising Quality
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#243445] mt-2">
              Why Choose ReadEssay?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
              ReadEssay provides robust services at the most competitive,
              transparent rates. Here is what establishes our long-standing
              standing among thousands of collegiate students:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-200/80">
              <div className="w-12 h-12 rounded-xl bg-[#FFF2EC] text-[#FF641A] flex items-center justify-center mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#243445] mb-2">
                High-Quality Work
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We deliver only high-quality services. When you hand over your
                work, it is in safe hands with well-researched, accurate, and
                properly formatted submissions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-200/80">
              <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-5">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#243445] mb-2">
                100% Original Content
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We understand the cost of submitting plagiarized work. No
                plagiarism, no AI shortcuts; only custom solutions crafted
                according to your precise prompt.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-200/80">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#243445] flex items-center justify-center mb-5">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#243445] mb-2">
                100% Confidential
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Your personal information, login credentials, and academic
                details remain protected under strict domestic VPN security
                and privacy agreements.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-200/80">
              <div className="w-12 h-12 rounded-xl bg-[#243445] text-white flex items-center justify-center mb-5">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#243445] mb-2">
                Affordable Pricing
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Looking for an affordable provider? ReadEssay offers upfront,
                honest pricing starting from $5.50 with zero surprise costs or
                hidden platform fees.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-200/80">
              <div className="w-12 h-12 rounded-xl bg-[#FFF2EC] text-[#FF641A] flex items-center justify-center mb-5">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#243445] mb-2">
                Live Chat Support
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our support team is online 24/7 to resolve questions, handle
                sudden deadline changes, and relay instructions straight to
                your assigned tutor.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-200/80">
              <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-5">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#243445] mb-2">
                Skilled Subject Experts
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                From STEM, Python, and Statistics to Nursing and Business, our
                specialists possess advanced degrees and extensive teaching
                backgrounds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. PROMOTIONAL FAST TURNAROUND BANNER
      ====================================================================== */}
      <section className="w-full relative overflow-hidden py-16 bg-[#243445] text-white">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src="/images/fast-turnaround-bg.jpg"
            alt="Academic Support Background Banner"
            fill
            sizes="100vw"
            loading="lazy"
            className="object-cover object-center"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF641A]">
              Fast Turnaround Guaranteed
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mt-1">
              Get your papers created by real professionals!
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mt-2 max-w-2xl leading-relaxed">
              Join thousands of university students scoring A and B grades
              this semester.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-4 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white font-bold text-sm shadow-xl whitespace-nowrap transition-transform hover:scale-105"
          >
            Place Your Order
          </Link>
        </div>
      </section>

      {/* =====================================================================
          9. TOP EXPERTS (Learn & Succeed with Our Top Subject Experts)
      ====================================================================== */}
      <section className="w-full bg-slate-50 py-16 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF641A]">
              VETTED SCHOLARLY FACULTY
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#243445] mt-2">
              Learn &amp; Succeed with Our Top Subject Experts
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
              Connect with seasoned scholars, certified professionals, and doctoral researchers who maintain a 99.4%
              first-time pass rate.
            </p>
          </div>

          {/* Interactive Experts Carousel */}
          <TopExpertsCarousel />
        </div>
      </section>

      {/* =====================================================================
          10. STUDENT TESTIMONIALS (Success Stories Directly From Our Clients)
      ====================================================================== */}
      <section className="w-full bg-white py-16 lg:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF641A]">
              Student Testimonials
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#243445] mt-2">
              Success Stories Directly From Our Clients
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
              ReadEssay is the trusted partner for college learners worldwide.
              See what real students say after partnering with our subject scholars:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {reviews.slice(0, 4).map((rev, idx) => {
              const avatarUrl = resolveReviewAvatar(
                (rev as { reviewerAvatar?: string }).reviewerAvatar,
                idx,
              );
              return (
                <div
                  key={rev.id || `rev-${idx}`}
                  className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-200/80 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1 text-[#FF641A] mb-4">
                      {[...Array(Math.min(5, rev.rating || 5))].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FF641A] text-[#FF641A]" />
                      ))}
                    </div>
                    <p className="text-slate-600 text-sm italic mb-6 leading-relaxed">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                      <Image
                        src={avatarUrl}
                        alt={rev.clientName || 'Student Reviewer'}
                        fill
                        sizes="40px"
                        loading="lazy"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-sm text-[#243445]">
                        {rev.clientName}
                      </div>
                      <div className="text-xs text-slate-400">
                        {rev.serviceTitle || 'Online Course Service'}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section Action Button */}
          <div className="text-center">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <span>More Reviews</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          11. VERIFIED PORTAL GRADE SUBMISSIONS (Real Proof Showcase)
      ====================================================================== */}
      <section className="w-full bg-slate-50 py-16 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF641A]">
              Real Grade Transcript Proof Showcase
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#243445] mt-2">
              Verified Portal Grade Submissions
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
              Our clients consistently score in the top percentiles. Here is uncensored, direct LMS portal evidence straight from Blackboard, Canvas, and university portals:
            </p>
          </div>

          {/* Infinite Marquee Component */}
          <VerifiedGradesMarquee />
        </div>
      </section>

      {/* =====================================================================
          12. CORE QUALITY GUARANTEES (2x3 Grid)
      ====================================================================== */}
      <section className="w-full bg-white py-16 lg:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF641A]">
              Unmatched Standards
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#243445] mt-2">
              Core Quality Guarantees
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
              Our service commitment ensures every single assignment or test
              assistance request is delivered under airtight guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-200/80">
              <div className="w-12 h-12 rounded-xl bg-[#FFF2EC] text-[#FF641A] flex items-center justify-center mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#243445] mb-2">
                Best Quality Assignments &amp; Papers
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                The writers hired by ReadEssay are experienced specialists.
                This assures intensive research behind each order, designed
                specifically to secure high grades.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-200/80">
              <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#243445] mb-2">
                Plagiarism-Free Work
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                It is against our core values to deliver any project without
                screening. All work is 100% original and verified through
                industry-grade scanners.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-200/80">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#243445] flex items-center justify-center mb-5">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#243445] mb-2">
                Proofreading &amp; Revisions
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Specialized editors inspect every document prior to final
                submission. We ensure zero grammatical, formatting, or
                contextual errors remain.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-200/80">
              <div className="w-12 h-12 rounded-xl bg-[#243445] text-white flex items-center justify-center mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#243445] mb-2">
                Meeting All Deadlines
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our writers complete assignments at least 24 hours prior to
                your cutoff whenever possible, eliminating anxiety and giving
                you ample time for review.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-200/80">
              <div className="w-12 h-12 rounded-xl bg-[#FFF2EC] text-[#FF641A] flex items-center justify-center mb-5">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#243445] mb-2">
                24/7 Customer Support Availability
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Regardless of your time zone, log onto ReadEssay any time. Our
                responsive operators provide instant answers and seamless
                order status updates.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-200/80">
              <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-5">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#243445] mb-2">
                On-Time Delivery &amp; Free Revisions
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Even after delivery, you have continuous access to fast
                adjustments. Writers make any required instructor amendments
                without additional fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          13. TRANSPARENT PRICING & SUPPORTED DISCIPLINES
      ====================================================================== */}
      <section className="w-full bg-slate-50 py-16 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF641A]">
              Honest Upfront Pricing
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#243445] mt-2">
              Transparent Rates for Every Stage
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
              No hidden fees or unexpected surge charges. Simple pricing that
              fits student budgets with guaranteed top academic delivery.
            </p>
          </div>

          {/* Pricing Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Tile 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-200/80 flex flex-col justify-between text-center">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Custom Papers
                </span>
                <div className="font-heading font-bold text-xl text-[#243445] mt-1">
                  Essay Writing
                </div>
                <div className="mt-4 mb-2">
                  <span className="text-xs text-slate-400">from </span>
                  <span className="font-heading font-extrabold text-3xl text-[#FF641A]">
                    $9.50
                  </span>
                  <span className="text-xs text-slate-400"> / page</span>
                </div>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  Original research, formatting &amp; free title page.
                </p>
              </div>
              <Link
                href="/contact"
                className="w-full py-2.5 rounded-full bg-slate-100 hover:bg-[#FF641A] hover:text-white text-[#243445] text-xs font-bold transition-colors"
              >
                Order Essay
              </Link>
            </div>

            {/* Tile 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-200/80 flex flex-col justify-between text-center">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Refinement
                </span>
                <div className="font-heading font-bold text-xl text-[#243445] mt-1">
                  Proofreading
                </div>
                <div className="mt-4 mb-2">
                  <span className="text-xs text-slate-400">from </span>
                  <span className="font-heading font-extrabold text-3xl text-[#FF641A]">
                    $7.34
                  </span>
                  <span className="text-xs text-slate-400"> / page</span>
                </div>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  Grammar check, tone polishing &amp; citation review.
                </p>
              </div>
              <Link
                href="/contact"
                className="w-full py-2.5 rounded-full bg-slate-100 hover:bg-[#FF641A] hover:text-white text-[#243445] text-xs font-bold transition-colors"
              >
                Order Review
              </Link>
            </div>

            {/* Tile 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-200/80 flex flex-col justify-between text-center">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Advanced Degrees
                </span>
                <div className="font-heading font-bold text-xl text-[#243445] mt-1">
                  Dissertation Help
                </div>
                <div className="mt-4 mb-2">
                  <span className="text-xs text-slate-400">from </span>
                  <span className="font-heading font-extrabold text-3xl text-[#FF641A]">
                    $15.50
                  </span>
                  <span className="text-xs text-slate-400"> / page</span>
                </div>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  Chapter methodology, data models &amp; defense prep.
                </p>
              </div>
              <Link
                href="/contact"
                className="w-full py-2.5 rounded-full bg-[#FF641A] text-white text-xs font-bold shadow-md hover:bg-[#E8540E] transition-colors"
              >
                Order Thesis
              </Link>
            </div>

            {/* Tile 4 */}
            <div className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-200/80 flex flex-col justify-between text-center">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Quick Polish
                </span>
                <div className="font-heading font-bold text-xl text-[#243445] mt-1">
                  Editing Services
                </div>
                <div className="mt-4 mb-2">
                  <span className="text-xs text-slate-400">from </span>
                  <span className="font-heading font-extrabold text-3xl text-[#FF641A]">
                    $5.50
                  </span>
                  <span className="text-xs text-slate-400"> / page</span>
                </div>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  Structural flow, syntax corrections &amp; formatting.
                </p>
              </div>
              <Link
                href="/contact"
                className="w-full py-2.5 rounded-full bg-slate-100 hover:bg-[#FF641A] hover:text-white text-[#243445] text-xs font-bold transition-colors"
              >
                Order Editing
              </Link>
            </div>
          </div>

          {/* Supported Subject Tags */}
          <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-200/80">
            <h3 className="font-heading font-bold text-lg text-[#243445] text-center mb-6">
              Supported Disciplines &amp; Academic Faculties
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {[
                'Statistics',
                'Accounting',
                'Math',
                'Finance',
                'Chemistry',
                'Computer Science (CS)',
                'Economics',
                'English',
                'Nursing',
                'Psychology',
                'Management',
                'Supply Chain',
                'Operations Management',
              ].map((faculty) => (
                <span
                  key={faculty}
                  className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-xs sm:text-sm font-medium hover:bg-[#FFF2EC] hover:text-[#FF641A] transition-colors cursor-default"
                >
                  {faculty}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          14. FREQUENTLY ASKED QUESTIONS FAQ (10 Accordions)
      ====================================================================== */}
      <section className="w-full bg-white py-16 lg:py-24 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF641A]">
              Clarifications &amp; Help
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#243445] mt-2">
              Frequently Asked Questions FAQ
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
              Find rapid answers about our order placement, security, and class handling policies.
            </p>
          </div>

          {/* FAQ Accordion Component */}
          <FaqAccordion />
        </div>
      </section>

      {/* =====================================================================
          15. FINAL CONVERSION SECTION & DIRECT HOTLINES
      ====================================================================== */}
      <section className="w-full bg-slate-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-[#243445] text-white rounded-3xl p-8 lg:p-14 relative overflow-hidden shadow-2xl">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#FF641A]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF641A]">
                  Get In Touch With Us
                </span>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white mt-2 leading-tight">
                  Excel your academic journey today with ReadEssay&apos;s online
                  class service and protected exam service.
                </h2>
                <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl">
                  Don&apos;t let coursework weigh you down. We are your partners in
                  your academic journey. Ordering from ReadEssay.com is
                  absolutely safe and secure. We do not disclose any customer
                  information.
                </p>

                <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8 pt-4">
                  <a
                    href="tel:+923138400066"
                    className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#1E293B] hover:bg-slate-700 transition-colors text-white"
                  >
                    <Phone className="w-5 h-5 text-[#FF641A] shrink-0" />
                    <div>
                      <span className="text-[10px] block uppercase tracking-wider text-slate-400">
                        PK WhatsApp Hotline
                      </span>
                      <span className="text-xs sm:text-sm font-bold">+92 3138400066</span>
                    </div>
                  </a>

                  <a
                    href="tel:+447460674811"
                    className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#1E293B] hover:bg-slate-700 transition-colors text-white"
                  >
                    <Phone className="w-5 h-5 text-[#FF641A] shrink-0" />
                    <div>
                      <span className="text-[10px] block uppercase tracking-wider text-slate-400">
                        UK Support Desk
                      </span>
                      <span className="text-xs sm:text-sm font-bold">+44 7460 674811</span>
                    </div>
                  </a>

                  <a
                    href="mailto:support@readessay.com"
                    className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#1E293B] hover:bg-slate-700 transition-colors text-white"
                  >
                    <Headphones className="w-5 h-5 text-[#FF641A] shrink-0" />
                    <div>
                      <span className="text-[10px] block uppercase tracking-wider text-slate-400">
                        Official Email
                      </span>
                      <span className="text-xs sm:text-sm font-bold">support@readessay.com</span>
                    </div>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end">
                <Link
                  href="/contact"
                  className="px-8 py-5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white font-heading font-bold text-base shadow-xl transition-all transform hover:-translate-y-1 text-center w-full lg:w-auto"
                >
                  Place Your Order Now
                </Link>
                <span className="text-slate-300 text-xs sm:text-sm mt-3 text-center lg:text-right block w-full">
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
