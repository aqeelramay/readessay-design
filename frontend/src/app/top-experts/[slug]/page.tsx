import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Star,
  GraduationCap,
  CheckCircle,
  ArrowRight,
  Award,
  Clock,
  ShieldCheck,
  BookOpen,
  MessageSquare,
} from 'lucide-react';
import {
  fetchPublicExperts,
  fetchExpertBySlug,
  TOP_EXPERTS_FAQS,
  DEFAULT_EXPERTS,
} from '@/lib/data-fetchers';
import TopExpertsCarousel from '@/components/shared/TopExpertsCarousel';
import VerifiedGradesMarquee from '@/components/shared/VerifiedGradesMarquee';
import FaqAccordion from '@/components/shared/FaqAccordion';
import JsonLd from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema, buildPersonSchema } from '@/lib/schema';
import AppIcon from '@/components/shared/AppIcon';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const experts = await fetchPublicExperts();
  const list = experts && experts.length > 0 ? experts : DEFAULT_EXPERTS;
  return list.map((exp) => ({
    slug: exp.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const expert = await fetchExpertBySlug(slug);

  if (!expert) {
    return {
      title: 'Expert Profile | ReadEssay',
    };
  }

  const title = `${expert.name} (${expert.degree}) - ${expert.roleTitle} | ReadEssay`;
  const description = `${expert.bio.slice(0, 155)}...`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://readessay.com/top-experts/${expert.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://readessay.com/top-experts/${expert.slug}`,
      siteName: 'ReadEssay',
      type: 'profile',
      images: [
        {
          url: expert.avatarUrl || 'https://readessay.com/images/readessay-logo.png',
          alt: expert.name,
        },
      ],
    },
  };
}

export default async function ExpertProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const expert = await fetchExpertBySlug(slug);

  if (!expert) {
    notFound();
  }

  const allExperts = await fetchPublicExperts();
  const otherExperts = allExperts.filter((e) => e.slug !== expert.slug);

  const ratingScore =
    typeof expert.rating === 'number'
      ? expert.rating.toFixed(2)
      : String(expert.rating);
  const primarySpecialty = expert.specialties?.[0] || '';
  const hireUrl = `/contact?expert=${encodeURIComponent(
    expert.name,
  )}&service=${encodeURIComponent(primarySpecialty)}`;
  const whatsappUrl = `https://wa.me/923138400066?text=${encodeURIComponent(
    `Hello ReadEssay! I would like to consult with ${expert.name} (${expert.roleTitle}) regarding my coursework / assignment.`,
  )}`;

  return (
    <div className="w-full bg-[#f8f9ff]">
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Top Experts', url: '/top-experts' },
            { name: expert.name, url: `/top-experts/${expert.slug}` },
          ]),
          buildPersonSchema(expert),
        ]}
      />

      {/* HERO / PROFILE HEADER SECTION */}
      <section className="relative w-full bg-white overflow-hidden py-10 lg:py-16 border-b border-slate-200/80">
        <div className="absolute -top-32 right-10 w-96 h-96 bg-[#FFF2EC] rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-50/60 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          {/* BREADCRUMB */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-slate-500 mb-8 flex-wrap"
          >
            <Link href="/" className="hover:text-[#FF641A] transition-colors">
              Home
            </Link>
            <AppIcon name="chevron_right" className="w-3.5 h-3.5" />
            <Link href="/top-experts" className="hover:text-[#FF641A] transition-colors">
              Top Experts
            </Link>
            <AppIcon name="chevron_right" className="w-3.5 h-3.5" />
            <span className="text-[#243445] font-semibold">{expert.name}</span>
          </nav>

          {/* MAIN PROFILE HERO CARD */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200/80">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Portrait & Verified Badge */}
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden bg-slate-100 border-4 border-[#FF641A]/20 shadow-md">
                  <Image
                    src={expert.avatarUrl || '/images/male-expert1.jpg'}
                    alt={expert.name}
                    fill
                    sizes="(max-width: 640px) 176px, 208px"
                    priority
                    className="object-cover"
                  />
                </div>

                {/* Verified Badge Pill */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ECFDF5] text-[#059669] text-xs font-bold border border-emerald-200/80 mt-4 shadow-2xs">
                  <CheckCircle className="w-4 h-4 fill-[#ECFDF5] text-[#059669]" />
                  <span>Verified ReadEssay Faculty</span>
                </div>

                <div className="text-xs text-slate-400 mt-2">
                  Member of Academic Committee
                </div>
              </div>

              {/* Right Column: Scholar Information & CTA */}
              <div className="lg:col-span-8 flex flex-col space-y-5">
                <div>
                  <div className="inline-block px-3 py-1 rounded-lg bg-orange-50 text-[#FF641A] text-xs font-bold border border-orange-100 mb-2">
                    {expert.roleTitle}
                  </div>
                  <h1 className="font-heading font-bold text-3xl sm:text-4xl text-[#243445] leading-tight">
                    {expert.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-slate-600 mt-2">
                    <span className="font-bold text-[#059669]">{expert.degree}</span>
                    <span className="text-slate-300">•</span>
                    <div className="flex items-center gap-1.5 font-medium">
                      <GraduationCap className="w-4 h-4 text-[#FF641A]" />
                      <span>{expert.university}</span>
                    </div>
                  </div>
                </div>

                {/* 4 Verified Stat Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
                    <div className="flex items-center justify-center gap-1 text-[#FF641A] font-bold text-base">
                      <Star className="w-4 h-4 fill-[#FF641A]" />
                      <span>{ratingScore}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-semibold block mt-0.5">
                      Client Rating
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
                    <div className="text-base font-bold text-[#243445]">
                      {expert.completedOrders}+
                    </div>
                    <span className="text-[11px] text-slate-500 font-semibold block mt-0.5">
                      Delivered Orders
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
                    <div className="text-base font-bold text-[#059669]">
                      {expert.successRate}
                    </div>
                    <span className="text-[11px] text-slate-500 font-semibold block mt-0.5">
                      First-Time Pass
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
                    <div className="text-base font-bold text-[#243445]">
                      {expert.experienceYears}+ Years
                    </div>
                    <span className="text-[11px] text-slate-500 font-semibold block mt-0.5">
                      Faculty Tenure
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <Link
                    href={hireUrl}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Hire {expert.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#059669] hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>WhatsApp Direct Consult</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED BIO & SPECIALTIES */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            {/* Bio Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF641A]">
                <BookOpen className="w-4 h-4" />
                <span>Academic Biography</span>
              </div>
              <h2 className="font-heading font-bold text-2xl text-[#243445]">
                About {expert.name}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {expert.bio}
              </p>
            </div>

            {/* Specialties & Research Competencies */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#059669]">
                <Award className="w-4 h-4" />
                <span>Domains of Mastery</span>
              </div>
              <h2 className="font-heading font-bold text-2xl text-[#243445]">
                Academic Specialties &amp; Methodologies
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {expert.name} provides end-to-end coursework development, quantitative modeling,
                literature synthesis, and formatting compliance across the following areas:
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {expert.specialties.map((spec, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-xl bg-orange-50/80 text-[#FF641A] font-bold text-xs sm:text-sm border border-orange-200/80"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Student Review */}
            {expert.featuredReviewQuote && (
              <div className="bg-linear-to-br from-white to-orange-50/40 rounded-3xl p-6 sm:p-8 shadow-sm border border-orange-200/80 space-y-4 relative overflow-hidden">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF641A]">
                  <MessageSquare className="w-4 h-4" />
                  <span>Verified Student Testimonial</span>
                </div>
                <blockquote className="text-base sm:text-lg text-[#243445] font-medium italic leading-relaxed">
                  &ldquo;{expert.featuredReviewQuote}&rdquo;
                </blockquote>
                {expert.featuredReviewAuthor && (
                  <div className="text-xs sm:text-sm font-bold text-[#059669]">
                    — {expert.featuredReviewAuthor}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Trust Guarantees */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
              <h3 className="font-heading font-bold text-lg text-[#243445]">
                Academic Integrity Guarantees
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#243445]">0% AI Plagiarism:</strong> Every paper
                    passes non-repository Turnitin filters prior to student handover.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#243445]">Strict Timelines:</strong> Guaranteed
                    delivery at least 4 to 12 hours ahead of your official university cutoff.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#243445]">Unlimited Amendments:</strong> Revisions
                    according to professor rubric feedback handled free of charge.
                  </span>
                </li>
              </ul>

              <div className="pt-2">
                <Link
                  href={hireUrl}
                  className="w-full py-3 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white font-bold text-xs text-center transition shadow-xs block"
                >
                  Direct Order with {expert.name.split(' ')[0]}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VERIFIED GRADES EVIDENCE SHOWCASE */}
      <section className="w-full bg-white py-16 lg:py-24 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#059669] bg-[#ECFDF5] px-3 py-1 rounded-full mb-2">
                <AppIcon name="verified" className="w-4 h-4" filled />
                Verified Academic Evidence
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#243445]">
                Live Student Portal Grade Submissions
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Authentic grade submissions achieved with the guidance of ReadEssay doctoral scholars.
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

      {/* OTHER TOP EXPERTS CAROUSEL */}
      {otherExperts.length > 0 && (
        <section className="w-full bg-[#f8f9ff] py-16 lg:py-24 border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF641A]">
                Explore Faculty
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#243445] mt-2">
                Other Top Academic Specialists
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Need support in another discipline? Meet our other vetted PhD researchers and senior faculty.
              </p>
            </div>
            <TopExpertsCarousel experts={otherExperts} />
          </div>
        </section>
      )}

      {/* FAQ ACCORDION */}
      <section className="w-full bg-white py-16 lg:py-24 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF641A]">
              Specialist Consultation FAQs
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#243445] mt-2">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Learn how our 1-on-1 expert matching and confidentiality pacts protect your degree.
            </p>
          </div>
          <FaqAccordion items={TOP_EXPERTS_FAQS} />
        </div>
      </section>
    </div>
  );
}
