import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  fetchServiceBySlug,
  fetchServiceTree,
  fetchFeaturedReviews,
  DEFAULT_FAQS,
  resolveReviewAvatar,
} from '@/lib/data-fetchers';
import RatingCards from '@/components/shared/RatingCards';
import UniversityMarquee from '@/components/shared/UniversityMarquee';
import VerifiedGradesMarquee from '@/components/shared/VerifiedGradesMarquee';
import FaqAccordion from '@/components/shared/FaqAccordion';
import JsonLd from '@/components/seo/JsonLd';
import {
  buildBreadcrumbSchema,
  buildServiceSchema,
  buildFaqPageSchema,
} from '@/lib/schema';

export const revalidate = 60;

const RESERVED_SLUGS = [
  'services',
  'reviews',
  'samples',
  'blog',
  'about-us',
  'contact',
  'privacy-policy',
  'terms-of-service',
  'api',
];

interface PageProps {
  params: Promise<{ serviceSlug: string }>;
}

export async function generateStaticParams() {
  const tree = await fetchServiceTree();
  return tree.map((service) => ({
    serviceSlug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { serviceSlug } = await params;
  if (RESERVED_SLUGS.includes(serviceSlug)) {
    return {};
  }

  const service = await fetchServiceBySlug(serviceSlug);
  if (!service) {
    return {
      title: 'Service Not Found | ReadEssay',
    };
  }

  return {
    title: service.seoTitle || `${service.title} | Top-Rated Academic Assistance | ReadEssay`,
    description:
      service.seoDescription ||
      service.shortDescription ||
      `Get reliable ${service.title} from verified doctoral experts at ReadEssay. Guaranteed A/B grades, 0% AI, and 100% Turnitin-safe reports.`,
    alternates: {
      canonical: `https://readessay.com/${service.slug}`,
    },
    openGraph: {
      title: service.seoTitle || `${service.title} | ReadEssay`,
      description: service.shortDescription || '',
      url: `https://readessay.com/${service.slug}`,
      siteName: 'ReadEssay',
      type: 'website',
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { serviceSlug } = await params;

  if (RESERVED_SLUGS.includes(serviceSlug)) {
    notFound();
  }

  const service = await fetchServiceBySlug(serviceSlug);
  if (!service) {
    notFound();
  }

  const reviews = await fetchFeaturedReviews({ serviceSlug, limit: 3 });

  // Merge FAQs
  const combinedFaqs =
    service.faqs && service.faqs.length > 0 ? service.faqs : DEFAULT_FAQS;

  return (
    <div className="w-full bg-[#FAFAFA] text-[#243445]">
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
            { name: service.title, url: `/${service.slug}` },
          ]),
          buildServiceSchema({
            name: service.title,
            description:
              service.shortDescription ||
              service.heroSubtitle ||
              `${service.title} academic support and coursework assistance by ReadEssay.`,
            url: `/${service.slug}`,
            category: service.badgeLabel || undefined,
          }),
          buildFaqPageSchema(combinedFaqs),
        ]}
      />
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-white overflow-hidden py-12 lg:py-20 border-b border-slate-100">
        <div className="absolute -top-32 right-10 w-96 h-96 bg-[#FFF2EC] rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-slate-50 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-[#FF641A] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-[#FF641A] transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-[#243445] font-semibold">{service.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left: Copy & Value Props */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF2EC] text-[#FF641A] text-xs sm:text-sm font-semibold self-start border border-[#FF641A]/10">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span>
                  {service.heroBadge ||
                    'Professional Academic Assistance Tailored to Your Degree'}
                </span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#243445] tracking-tight leading-tight">
                {service.heroTitle || service.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                {service.heroSubtitle ||
                  service.shortDescription ||
                  'Connect with verified doctoral experts who understand your syllabus, meet urgent deadlines, and secure top grades with complete privacy.'}
              </p>

              {/* 5 Value Checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 pb-2">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#059669] text-[20px]">
                    check_circle
                  </span>
                  <span className="text-sm sm:text-base text-[#243445] font-medium">
                    100% Unique Content
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#059669] text-[20px]">
                    check_circle
                  </span>
                  <span className="text-sm sm:text-base text-[#243445] font-medium">
                    Strong Attention to deadlines
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#059669] text-[20px]">
                    check_circle
                  </span>
                  <span className="text-sm sm:text-base text-[#243445] font-medium">
                    24/7 Support handled with professionalism
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#059669] text-[20px]">
                    check_circle
                  </span>
                  <span className="text-sm sm:text-base text-[#243445] font-medium">
                    100% Money Back Guarantee
                  </span>
                </div>
                <div className="flex items-center gap-3 sm:col-span-2">
                  <span className="material-symbols-outlined text-[#059669] text-[20px]">
                    check_circle
                  </span>
                  <span className="text-sm sm:text-base text-[#243445] font-medium">
                    Revisions as per your Desires!
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
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  <span>Live Chat with Expert</span>
                </a>
              </div>
            </div>

            {/* Right: Reserved Calculator Slot */}
            <div className="lg:col-span-5">
              <div
                id="hero-calculator-slot"
                className="w-full min-h-[420px] rounded-3xl bg-slate-50/80 border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#FFF2EC] text-[#FF641A] flex items-center justify-center mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-[32px]">calculate</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-[#243445] mb-2">
                  Calculate Order Price
                </h3>
                <p className="text-sm text-slate-500 max-w-sm mb-6">
                  Instant estimate tailored to your exact {service.title} requirements.
                </p>
                <a
                  href="https://wa.me/923138400066"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#243445] text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
                >
                  <span>Request Instant Quote</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
                <div className="mt-4 flex items-center gap-4 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-[#059669]">check</span>
                    Zero Obligation
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-[#059669]">check</span>
                    Instant Match
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RATINGS & TRUST BAR */}
      <section className="w-full bg-slate-50 py-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
          <RatingCards />
          <UniversityMarquee />
        </div>
      </section>

      {/* 3. OVERVIEW & STATS SECTION */}
      <section className="py-16 lg:py-24 w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header & 3 Key Stat Counters */}
          <div className="text-center max-w-4xl mx-auto mb-12 space-y-3">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#243445] leading-tight">
              Online {service.title} Support in UK, US &amp; Global Universities
            </h2>
            <p className="text-sm md:text-base text-slate-600">
              Get Rid Of All Confusions With Our Expert Writers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-[#FFF2EC] flex items-center justify-center text-[#FF641A] shrink-0">
                <span className="material-symbols-outlined text-[32px]">task_alt</span>
              </div>
              <div>
                <span className="font-heading text-2xl lg:text-3xl font-bold text-[#243445] tracking-tight block">
                  1,352,241
                </span>
                <p className="text-sm font-medium text-slate-500">Orders Delivered</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-[#ECFDF5] flex items-center justify-center text-[#059669] shrink-0">
                <span className="material-symbols-outlined text-[32px]">star</span>
              </div>
              <div>
                <span className="font-heading text-2xl lg:text-3xl font-bold text-[#243445] tracking-tight block">
                  4.9 / 5.0
                </span>
                <p className="text-sm font-medium text-slate-500">5 Star Rating</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-[#243445] shrink-0">
                <span className="material-symbols-outlined text-[32px]">workspace_premium</span>
              </div>
              <div>
                <span className="font-heading text-2xl lg:text-3xl font-bold text-[#243445] tracking-tight block">
                  5,079+
                </span>
                <p className="text-sm font-medium text-slate-500">PhD Experts</p>
              </div>
            </div>
          </div>

          {/* Editorial Overview Narrative + Video Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-[#FF641A] text-xs font-bold uppercase tracking-wider">
                <span>Specialized Academic Assistance</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#243445] leading-snug">
                Dedicated Assistance in {service.title}
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                {service.content ||
                  `Does the conception of reasoning compound questions of ${service.title} fear the blood of your nerves? This service is particularly designed to calm students' anxieties and provide mathematically and contextually accurate solutions.`}
              </p>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                Our specialists hold doctorates and master’s degrees from premier US, UK, and Australian institutions. When you assign your requirements to ReadEssay, we guarantee on-time completion, strict adherence to institutional rubrics, and 100% Turnitin-verified originality.
              </p>
              <div className="pt-2">
                <a
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white text-sm font-semibold shadow-md transition-colors"
                  href="https://wa.me/923138400066"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Get Help Now</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
              </div>
            </div>

            {/* Video Player Card */}
            <div className="lg:col-span-6">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/OaqUwnjm9Xo"
                  title={`${service.title} Walkthrough`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SUB-SERVICES EXPLORATION GRID (WHEN SUB-SERVICES EXIST) */}
      {service.subServices && service.subServices.length > 0 && (
        <section className="py-16 lg:py-24 w-full bg-slate-50 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
                Detailed Solutions
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#243445] leading-tight">
                Explore Specialized {service.title} Modules
              </h2>
              <p className="text-sm md:text-base text-slate-600">
                We hold a squad of over 5,500 dedicated academic professionals holding specialist degrees in each respective sub-branch.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.subServices.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-slate-100 group"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#FFF2EC] flex items-center justify-center text-[#FF641A] group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-[28px]">
                        {sub.slug.includes('stat')
                          ? 'analytics'
                          : sub.slug.includes('cs')
                          ? 'terminal'
                          : sub.slug.includes('business')
                          ? 'business_center'
                          : sub.slug.includes('account')
                          ? 'query_stats'
                          : 'fact_check'}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-[#243445] leading-snug">
                      <Link
                        href={`/${service.slug}/${sub.slug}`}
                        className="hover:text-[#FF641A] transition-colors"
                      >
                        {sub.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {sub.shortDescription ||
                        `Acquire rigorous assistance on complex assignments, research projects, and exam preparations for ${sub.title}.`}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <Link
                      href={`/${service.slug}/${sub.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF641A] group-hover:text-[#E8540E] transition-colors"
                    >
                      <span>Explore Service</span>
                      <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. ACADEMIC LEVEL GUIDANCE (3-COLUMN CARDS) */}
      <section className="py-16 lg:py-24 w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
              Respective Academic Fields
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#243445] leading-tight">
              One-Click Online Guide for All Academic Standards
            </h2>
            <p className="text-sm md:text-base text-slate-600">
              Our expert team fulfills assigned tasks within time limits customized to your precise academic benchmark.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col justify-start">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-full bg-[#FF641A] text-white flex items-center justify-center font-heading font-bold text-lg">
                    1
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                    High School &amp; A-Levels
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-[#243445]">
                  High and Public Held Schools
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Initial Cambridge curriculum, IB diplomas, and A-Levels scenarios are solved with great clarity to provide strong foundational marks.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-[#FF641A]/30 flex flex-col justify-start relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-full bg-[#243445] text-white flex items-center justify-center font-heading font-bold text-lg">
                    2
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#FFF2EC] text-xs font-semibold text-[#FF641A]">
                    Undergrad &amp; College
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-[#243445]">
                  Graded Colleges &amp; Universities
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  In-depth analysis of variables, term papers, literature reviews, and journal submissions evaluated against collegiate grading rubrics.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col justify-start">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-full bg-[#059669] text-white flex items-center justify-center font-heading font-bold text-lg">
                    3
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                    Post-Grad &amp; PhD
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-[#243445]">
                  Post-Graduates and Ph.D. Programs
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Complex study of econometric indicators, variance modeling, empirical data analysis, and publication-ready dissertation chapters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ELITE SPECIALIST TEAM */}
      <section className="py-16 lg:py-24 w-full bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
              Accountability at Work
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#243445] leading-tight">
              Task Helpers Accountability at Work
            </h2>
            <p className="text-sm md:text-base text-slate-600">
              Meet our bench of verified doctorate scholars dedicated to delivering academic excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FFF2EC] flex items-center justify-center text-[#FF641A]">
                <span className="material-symbols-outlined text-[28px]">psychology</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-[#243445]">
                Ph.D. Intellectuals
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The best scholars from Oxford, Edinburgh, Melbourne, and University of Florida are hired to conduct assignments with high rigor.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#ECFDF5] flex items-center justify-center text-[#059669]">
                <span className="material-symbols-outlined text-[28px]">public</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-[#243445]">
                Indigenous Regional Writers
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our mentors are trained in specific national curricula (US APA, UK Harvard/OSCOLA, Australian guidelines) for accurate contextual mastery.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-[#243445]">
                <span className="material-symbols-outlined text-[28px]">hub</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-[#243445]">
                Subject Branch Hub
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Specialized sub-field experts ensure that from quantitative modeling to qualitative synthesis, your work is authored by a subject authority.
              </p>
            </div>
          </div>

          {/* Expert Profile Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-5">
              <div className="w-20 h-20 rounded-full overflow-hidden relative shrink-0">
                <Image
                  src="/images/female-expert1.jpg"
                  alt="Dr. Alan Crawford"
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-heading text-sm font-bold text-[#243445]">
                    Dr. Alan Crawford, Ph.D.
                  </h4>
                  <span className="px-2 py-0.5 rounded bg-[#ECFDF5] text-[#059669] text-[10px] font-bold">
                    Verified
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  12+ Years Experience • Oxford Fellow
                </p>
                <div className="flex flex-col text-xs text-[#FF641A] font-medium">
                  <span>★ 4.98 Rating</span>
                  <span className="text-slate-500">840+ Papers Delivered</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-5">
              <div className="w-20 h-20 rounded-full overflow-hidden relative shrink-0">
                <Image
                  src="/images/male-expert1.jpg"
                  alt="Elena Morales"
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-heading text-sm font-bold text-[#243445]">
                    Elena Morales, M.Sc.
                  </h4>
                  <span className="px-2 py-0.5 rounded bg-[#ECFDF5] text-[#059669] text-[10px] font-bold">
                    Verified
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  9+ Years Experience • STEM Specialist
                </p>
                <div className="flex flex-col text-xs text-[#FF641A] font-medium">
                  <span>★ 4.96 Rating</span>
                  <span className="text-slate-500">620+ Papers Delivered</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-5">
              <div className="w-20 h-20 rounded-full overflow-hidden relative shrink-0">
                <Image
                  src="/images/female-expert2.jpg"
                  alt="Marcus Vance"
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-heading text-sm font-bold text-[#243445]">
                    Marcus Vance, Ph.D.
                  </h4>
                  <span className="px-2 py-0.5 rounded bg-[#ECFDF5] text-[#059669] text-[10px] font-bold">
                    Verified
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  11+ Years Experience • Empirical Research
                </p>
                <div className="flex flex-col text-xs text-[#FF641A] font-medium">
                  <span>★ 4.97 Rating</span>
                  <span className="text-slate-500">710+ Papers Delivered</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/about-us"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#243445] hover:bg-slate-800 text-white text-sm sm:text-base font-semibold transition-colors"
            >
              <span>Meet Our Experts</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. VERIFIED STUDENT TESTIMONIAL SPOTLIGHT */}
      <section className="py-16 lg:py-24 w-full bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="bg-[#243445] text-white rounded-3xl p-8 md:p-14 shadow-xl relative overflow-hidden mb-12">
            <span className="material-symbols-outlined text-[140px] text-white/5 absolute -right-6 -bottom-6 pointer-events-none select-none">
              format_quote
            </span>
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[20px]">
                      star
                    </span>
                  ))}
                </div>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold">
                  Verified Coursework Grade Outcome
                </span>
              </div>
              <blockquote className="font-heading text-xl sm:text-2xl lg:text-[28px] font-medium leading-snug italic text-white/95">
                &ldquo;I got my {service.title} task done by a verified professional and this raised my grade from B+ to A in my final assessment.&rdquo;
              </blockquote>
              <div className="flex items-center gap-4 pt-4">
                <div className="w-12 h-12 rounded-full bg-[#FF641A] flex items-center justify-center text-white font-bold text-lg font-heading">
                  TY
                </div>
                <div>
                  <p className="font-heading text-lg font-bold text-white">Taylor Yates</p>
                  <p className="text-xs text-white/70">Verified Student • 2026 Cohort</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {reviews.map((rev, idx) => (
              <div
                key={rev.id || idx}
                className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#FF641A] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[18px]">
                        star
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm italic mb-6 leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0 bg-slate-200">
                    <Image
                      src={resolveReviewAvatar(null, idx)}
                      alt={rev.clientName}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <span className="font-heading font-bold text-sm text-[#243445] block">
                      {rev.clientName}
                    </span>
                    <span className="text-xs text-slate-500">{rev.serviceTitle}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white text-sm sm:text-base font-semibold shadow-md transition-colors"
            >
              <span>More Reviews</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. VERIFIED GRADES EVIDENCE SHOWCASE */}
      <section className="w-full bg-slate-50 py-16 lg:py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] text-xs font-semibold mb-2">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>Live Academic Evidence</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#243445]">
                Verified Grade Submissions in {service.title}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-xl bg-white font-medium text-xs sm:text-sm text-[#243445] shadow-sm">
                Canvas Gradebook
              </span>
              <span className="px-4 py-2 rounded-xl bg-[#ECFDF5] font-bold text-xs sm:text-sm text-[#059669]">
                96.38% A+ Average
              </span>
            </div>
          </div>

          <VerifiedGradesMarquee />

          <div className="text-center pt-6">
            <Link
              href="/samples"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#059669] hover:bg-emerald-600 text-white text-sm sm:text-base font-semibold shadow-md transition-colors"
            >
              <span>View All Samples</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. CORE QUALITY GUARANTEES (2x3 GRID) */}
      <section className="py-16 lg:py-24 w-full bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
              Unmatched Standards
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#243445] leading-tight">
              Core Quality Guarantees
            </h2>
            <p className="text-sm md:text-base text-slate-600">
              Our service commitment ensures every single assignment or test request is delivered under airtight guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#FFF2EC] text-[#FF641A] flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-[26px]">workspace_premium</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-[#243445] mb-2">
                Best Quality Assignments &amp; Papers
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The writers hired by ReadEssay are experienced specialists. This assures intensive research behind each order, designed specifically to secure high grades.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-[26px]">task_alt</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-[#243445] mb-2">
                Plagiarism-Free Work
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                It is against our core values to deliver any project without screening. All work is 100% original and verified through industry-grade Turnitin scanners.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#243445] flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-[26px]">find_in_page</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-[#243445] mb-2">
                Proofreading &amp; Revisions
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Specialized editors inspect every document prior to final submission. We ensure zero grammatical, formatting, or contextual errors remain.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#243445] text-white flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-[26px]">alarm_on</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-[#243445] mb-2">
                Meeting All Deadlines
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our writers complete assignments at least 24 hours prior to your cutoff whenever possible, eliminating anxiety and giving you ample review time.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#FFF2EC] text-[#FF641A] flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-[26px]">headset_mic</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-[#243445] mb-2">
                24/7 Customer Support Availability
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Regardless of your time zone, log onto ReadEssay any time. Our responsive operators provide instant answers and seamless order status updates.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-[26px]">published_with_changes</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-[#243445] mb-2">
                On-Time Delivery &amp; Free Revisions
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Even after delivery, you have continuous access to fast adjustments. Writers make any required instructor amendments without additional fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section className="w-full bg-slate-50 py-16 lg:py-24 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
              Clarifications &amp; Help
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#243445] mt-2">
              Frequently Asked Questions for {service.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Find rapid answers about our order placement, security, and class handling policies.
            </p>
          </div>

          <FaqAccordion items={combinedFaqs} />

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/samples"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-[#243445] text-sm font-semibold transition-colors border border-slate-200"
            >
              <span className="material-symbols-outlined text-[18px]">description</span>
              <span>View All Samples</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white text-sm font-semibold shadow-md transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">support_agent</span>
              <span>Contact Support</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 11. DIRECT HOTLINES & FINAL CALL TO ACTION */}
      <section className="w-full bg-white py-16 lg:py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-[#243445] text-white rounded-3xl p-8 lg:p-14 relative overflow-hidden shadow-2xl">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#FF641A]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8">
                <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
                  Get In Touch With Us
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-2 leading-tight">
                  Excel your academic journey today with ReadEssay’s {service.title} solutions.
                </h2>
                <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl">
                  Don’t let coursework weigh you down. Ordering from ReadEssay is absolutely safe, confidential, and backed by a 100% money-back guarantee.
                </p>

                <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8 pt-4">
                  <a
                    className="flex items-center gap-3 px-5 py-3 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 transition-colors border border-slate-700"
                    href="tel:+923138400066"
                  >
                    <span className="material-symbols-outlined text-[#FF641A] text-[22px]">
                      phone_iphone
                    </span>
                    <div>
                      <span className="text-[10px] block uppercase tracking-wider text-slate-400">
                        PK WhatsApp Hotline
                      </span>
                      <span className="text-xs sm:text-sm font-bold">+92 3138400066</span>
                    </div>
                  </a>

                  <a
                    className="flex items-center gap-3 px-5 py-3 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 transition-colors border border-slate-700"
                    href="tel:+447460674811"
                  >
                    <span className="material-symbols-outlined text-[#FF641A] text-[22px]">
                      call
                    </span>
                    <div>
                      <span className="text-[10px] block uppercase tracking-wider text-slate-400">
                        UK Support Desk
                      </span>
                      <span className="text-xs sm:text-sm font-bold">+44 7460 674811</span>
                    </div>
                  </a>

                  <a
                    className="flex items-center gap-3 px-5 py-3 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 transition-colors border border-slate-700"
                    href="mailto:support@readessay.com"
                  >
                    <span className="material-symbols-outlined text-[#FF641A] text-[22px]">
                      mail
                    </span>
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
                <a
                  className="px-8 py-5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white font-heading text-base font-bold shadow-xl transition-all transform hover:-translate-y-1 text-center w-full lg:w-auto"
                  href="https://wa.me/923138400066"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Place Your Order Now
                </a>
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
