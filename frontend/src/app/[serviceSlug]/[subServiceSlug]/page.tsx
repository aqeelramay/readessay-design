import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  fetchSubService,
  fetchServiceBySlug,
  fetchServiceTree,
  fetchFeaturedReviews,
  fetchPublicCalculator,
  DEFAULT_FAQS,
  resolveReviewAvatar,
} from '@/lib/data-fetchers';
import RatingCards from '@/components/shared/RatingCards';
import UniversityMarquee from '@/components/shared/UniversityMarquee';
import TopExpertsCarousel from '@/components/shared/TopExpertsCarousel';
import VerifiedGradesMarquee from '@/components/shared/VerifiedGradesMarquee';
import FaqAccordion from '@/components/shared/FaqAccordion';
import PriceCalculatorWidget from '@/components/shared/PriceCalculatorWidget';
import AppIcon from '@/components/shared/AppIcon';
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
  params: Promise<{ serviceSlug: string; subServiceSlug: string }>;
}

export async function generateStaticParams() {
  const tree = await fetchServiceTree();
  const params: { serviceSlug: string; subServiceSlug: string }[] = [];
  for (const service of tree) {
    if (service.subServices) {
      for (const sub of service.subServices) {
        params.push({
          serviceSlug: service.slug,
          subServiceSlug: sub.slug,
        });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { serviceSlug, subServiceSlug } = await params;
  if (RESERVED_SLUGS.includes(serviceSlug)) {
    return {};
  }

  const subService = await fetchSubService(serviceSlug, subServiceSlug);
  if (!subService) {
    return {
      title: 'Specialization Not Found | ReadEssay',
    };
  }

  return {
    title:
      subService.seoTitle ||
      `${subService.title} | Expert Academic Assistance | ReadEssay`,
    description:
      subService.seoDescription ||
      subService.shortDescription ||
      `Get top-rated ${subService.title} from verified doctoral experts at ReadEssay. 100% original Turnitin-verified research, 24/7 support, and guaranteed grades.`,
    alternates: {
      canonical: `https://readessay.com/${serviceSlug}/${subService.slug}`,
    },
    openGraph: {
      title: subService.seoTitle || `${subService.title} | ReadEssay`,
      description: subService.shortDescription || '',
      url: `https://readessay.com/${serviceSlug}/${subService.slug}`,
      siteName: 'ReadEssay',
      type: 'website',
    },
  };
}

// 5 Specialized Rubrics Blueprint from design/service-detail.html
const DEFAULT_RUBRIC_CARDS = [
  {
    icon: 'query_stats',
    title: 'Cost-System Accounting Task Help',
    desc: 'Do your limited knowledge plunge you in problematic questions of volume-profit analysis, activity-based costing, tools for planning and control, flexible budgeting, variance analysis, inventory costing, and capacity optimization? Get expert advice from doctoral specialists to resolve the most challenging calculations.',
  },
  {
    icon: 'receipt_long',
    title: 'Tax Accounting Problem-Solutions',
    desc: 'Covering all respective fields of property, income, and corporate tax computation. We assist students with real-time corporate filing simulations, UK HMRC & US IRS compliance frameworks, and specified ticklish taxation questions.',
  },
  {
    icon: 'account_balance',
    title: 'Finance Accounting Task Help',
    desc: 'Budgeting models, preparation of financial statements, balance sheet totals, machine cost financing schedules, stock inventory management, and financial ratio projections with zero copied material.',
  },
  {
    icon: 'security',
    title: 'Forensic Complex Situations Task',
    desc: 'Case studies involving solvency declarations between publicly listed corporations, bankruptcy resolution, auditing fraud detection, and evidence matrices solved to yield high-scoring academic papers.',
  },
  {
    icon: 'fact_check',
    title: 'Audit Aspect of Accounting Assistance',
    desc: 'Guidance on absorption vs. variable costing, operational budgeting techniques, standard costing vs. variance analysis, internal/external audit governance reports, and corporate sustainability records.',
  },
];

// 6 Core Quality Guarantees from design/service-detail.html
const CORE_GUARANTEES = [
  {
    icon: 'workspace_premium',
    title: 'Best Quality Assignments & Papers',
    desc: 'The writers hired by ReadEssay are experienced specialists. This assures intensive research behind each order, designed specifically to secure high grades.',
  },
  {
    icon: 'task_alt',
    title: 'Plagiarism-Free Work',
    desc: 'It is against our core values to deliver any project without screening. All work is 100% original and verified through industry-grade scanners.',
  },
  {
    icon: 'find_in_page',
    title: 'Proofreading & Revisions',
    desc: 'Specialized editors inspect every document prior to final submission. We ensure zero grammatical, formatting, or contextual errors remain.',
  },
  {
    icon: 'alarm_on',
    title: 'Meeting All Deadlines',
    desc: 'Our writers complete assignments at least 24 hours prior to your cutoff whenever possible, eliminating anxiety and giving you ample time for review.',
  },
  {
    icon: 'headset_mic',
    title: '24/7 Customer Support Availability',
    desc: 'Regardless of your time zone, log onto ReadEssay any time. Our responsive operators provide instant answers and seamless order status updates.',
  },
  {
    icon: 'published_with_changes',
    title: 'On-Time Delivery & Free Revisions',
    desc: 'Even after delivery, you have continuous access to fast adjustments. Writers make any required instructor amendments without additional fees.',
  },
];

export default async function SubServiceDetailPage({ params }: PageProps) {
  const { serviceSlug, subServiceSlug } = await params;

  if (RESERVED_SLUGS.includes(serviceSlug)) {
    notFound();
  }

  const [subService, parentService, calculatorData] = await Promise.all([
    fetchSubService(serviceSlug, subServiceSlug),
    fetchServiceBySlug(serviceSlug),
    fetchPublicCalculator(),
  ]);

  if (!subService) {
    notFound();
  }

  const parentTitle =
    subService.service?.title || parentService?.title || 'Academic Services';

  // Sibling sub-services (excluding this one)
  const siblingSubServices =
    parentService?.subServices?.filter(
      (s) => s.slug !== subServiceSlug && s.slug !== subService.slug,
    ) || [];

  const reviews = await fetchFeaturedReviews({
    serviceSlug,
    subServiceSlug,
    limit: 4,
  });

  const combinedFaqs =
    subService.faqs && subService.faqs.length > 0 ? subService.faqs : DEFAULT_FAQS;

  // Use subService.features if provided, or default to the 5 rubric cards
  const rubricCards =
    subService.features && subService.features.length >= 3
      ? subService.features.map((f, idx) => {
        const defaultCard = DEFAULT_RUBRIC_CARDS[idx % DEFAULT_RUBRIC_CARDS.length];
        const title = typeof f === 'string' ? f : ((f as unknown as { title?: string }).title || defaultCard.title);
        const desc = typeof f === 'string' ? defaultCard.desc : ((f as unknown as { description?: string }).description || defaultCard.desc);
        return {
          icon: defaultCard.icon,
          title,
          desc,
        };
      })
      : DEFAULT_RUBRIC_CARDS;

  return (
    <div className="w-full bg-[#FAFAFA] text-[#243445]">
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: parentTitle, url: `/${serviceSlug}` },
            { name: subService.title, url: `/${serviceSlug}/${subService.slug}` },
          ]),
          buildServiceSchema({
            name: subService.title,
            description:
              subService.shortDescription ||
              subService.heroSubtitle ||
              `${subService.title} academic coursework support under ${parentTitle}.`,
            url: `/${serviceSlug}/${subService.slug}`,
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
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 flex-wrap">
            <Link href="/" className="hover:text-[#FF641A] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-[#FF641A] transition-colors">
              Services
            </Link>
            <span>/</span>
            <Link
              href={`/${serviceSlug}`}
              className="hover:text-[#FF641A] transition-colors"
            >
              {parentTitle}
            </Link>
            <span>/</span>
            <span className="text-[#243445] font-semibold">{subService.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left: Copy & Value Props */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF2EC] text-[#FF641A] text-xs sm:text-sm font-semibold self-start border border-[#FF641A]/10">
                <AppIcon name="verified_user" className="w-[18px] h-[18px]" filled />
                <span>
                  {subService.heroBadge ||
                    `Expert ${subService.title} for Every Academic Level`}
                </span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#243445] tracking-tight leading-tight">
                {subService.heroTitle ||
                  `${subService.title} to Achieve Better Grades with Confidence`}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                {subService.heroSubtitle ||
                  subService.shortDescription ||
                  `Get reliable ${subService.title.toLowerCase()} from experienced subject specialists. From fundamental concepts to advanced applied coursework, receive expert guidance to tackle complex topics and meet your deadlines.`}
              </p>

              {/* 5 Value Checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 pb-2">
                <div className="flex items-center gap-3">
                  <AppIcon name="check_circle" className="w-5 h-5 text-[#059669]" filled />
                  <span className="text-sm sm:text-base text-[#243445] font-medium">
                    100% Unique Content
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <AppIcon name="check_circle" className="w-5 h-5 text-[#059669]" filled />
                  <span className="text-sm sm:text-base text-[#243445] font-medium">
                    Strong Attention to deadlines
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <AppIcon name="check_circle" className="w-5 h-5 text-[#059669]" filled />
                  <span className="text-sm sm:text-base text-[#243445] font-medium">
                    24/7 Support handled with professionalism
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <AppIcon name="check_circle" className="w-5 h-5 text-[#059669]" filled />
                  <span className="text-sm sm:text-base text-[#243445] font-medium">
                    100% Money Back Guarantee
                  </span>
                </div>
                <div className="flex items-center gap-3 sm:col-span-2">
                  <AppIcon name="check_circle" className="w-5 h-5 text-[#059669]" filled />
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
                  <AppIcon name="chat" className="w-5 h-5" />
                  <span>Live Chat with Expert</span>
                </a>
              </div>
            </div>

            {/* Right: Live Price Calculator Widget */}
            <div className="lg:col-span-5">
              <div id="hero-calculator-slot" className="w-full">
                <PriceCalculatorWidget
                  data={calculatorData}
                  defaultServiceSlug={parentService?.slug || 'assignment-help'}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REUSED HOMEPAGE TRUST BARS (Rating Cards & Connect with Seniors) */}
      <section className="w-full bg-slate-50 py-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
          <RatingCards />
          <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
            <div className="text-xl font-bold text-[#FF641A] flex items-center justify-center gap-2 mb-2 font-heading">
              <AppIcon name="groups" className="w-6 h-6" />
              <span>Connect with Seniors</span>
            </div>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-6 text-center">
              10,000+ Students across American, Australian, Canadian and Middle East Universities. Connect to ask anything. Absolutely Free. Fast.
            </p>
            <UniversityMarquee />
          </div>
        </div>
      </section>

      {/* 3. OVERVIEW & STATS BAR */}
      <section className="py-16 lg:py-24 w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header & 3 Key Stat Counters */}
          <div className="text-center max-w-4xl mx-auto mb-12 space-y-3">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#243445] leading-tight">
              Assistance in {subService.title}
            </h2>
            <p className="text-sm md:text-base text-slate-600">
              Get Rid Of All Confusions With Our Expert Writers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-[#FFF2EC] flex items-center justify-center text-[#FF641A] shrink-0">
                <AppIcon name="task_alt" className="w-8 h-8" />
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
                <AppIcon name="star" className="w-8 h-8" filled />
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
                <AppIcon name="workspace_premium" className="w-8 h-8" />
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
                <span>Specialized Assistance</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#243445] leading-snug">
                Rigorous Guidance in {subService.title} Tasks
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                {subService.content ||
                  `Does the conception of reasoning compound questions of ${subService.title} fear the blood of your nerves? This website is particularly made to calm students’ fears and provide exact, step-by-step verified solutions.`}
              </p>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                Our specialists hold advanced degrees in {subService.title} and related disciplines. You receive full working files, raw code scripts or calculations, and complete Turnitin originality reports.
              </p>
              <div className="pt-2">
                <a
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white text-sm font-semibold shadow-md transition-colors"
                  href="https://wa.me/923138400066"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Get Help Now</span>
                  <AppIcon name="arrow_forward" className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Video Player Card */}
            <div className="lg:col-span-6">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/OaqUwnjm9Xo"
                  title={`Assistance in ${subService.title} Tasks`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DETAILED SOLUTIONS & RUBRIC CARDS */}
      <section className="py-16 lg:py-24 w-full bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
              Detailed Solutions
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#243445] leading-tight">
              Acquire Assistance in {subService.title} for Detailed Solutions
            </h2>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              We are holding up the squad of 5,500+ professionals who hold specialist degrees in respective branches. Look upon to clear your queries and realize the expertise of our team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rubricCards.map((card, idx) => {
              const isWide = idx === 4 && rubricCards.length === 5;
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-start border border-slate-100 ${isWide ? 'md:col-span-2 lg:col-span-2' : ''
                    }`}
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#FFF2EC] flex items-center justify-center text-[#FF641A]">
                      <AppIcon name={card.icon} className="w-7 h-7" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-[#243445] leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. ACADEMIC LEVEL GUIDANCE (3-COLUMN CARDS) */}
      <section className="py-16 lg:py-24 w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
              Respective Academic Fields
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#243445] leading-tight">
              One-Click Online Guide for All Respective Academic Fields
            </h2>
            <p className="text-sm md:text-base text-slate-600">
              This service solves queries across US, UK, Canadian, and Australian curricula with native subject experts.
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
                    School
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-[#243445]">
                  High and Public Held Schools
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Initial Cambridge business field practices, A-Levels scenarios, and complex questions of high-ranked secondary curricula solved with great expertise.
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
                    Colleges
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-[#243445]">
                  Graded Colleges &amp; Universities
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  In-depth analysis of variables, term coursework, empirical reports, and journal papers formatted to strict faculty standards.
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
                  Techniques for assisting in multivariate variables, statistical regressions, and economic projections to publish papers and achieve upgrades.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SUBJECT-MATTER EXPERT PROFILE CARDS & ACCOUNTABILITY AT WORK */}
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
              Is your consciousness pondering whether the expert will be able to perform your task diligently? Meet our assigned specialists for {subService.title}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FFF2EC] flex items-center justify-center text-[#FF641A]">
                <AppIcon name="psychology" className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-xl font-bold text-[#243445]">
                Ph.D. Intellectuals
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The best scholars from Edinburgh, Oxford, and Melbourne are dedicated to conducting each task with motivation and deep subject mastery.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#ECFDF5] flex items-center justify-center text-[#059669]">
                <AppIcon name="public" className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-xl font-bold text-[#243445]">
                Indigenous Task Writers
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our mentors are trained in specific national curricula (US APA, UK Harvard/OSCOLA, Australian guidelines) for accurate contextual mastery.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-[#243445]">
                <AppIcon name="hub" className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-xl font-bold text-[#243445]">
                Subject Branch Hub
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Specialized branch experts ensure that whether preparing tax reports or econometric models, your task is guided by certified professionals.
              </p>
            </div>
          </div>

          {/* Reused Homepage Top Experts Carousel */}
          <div className="space-y-8">
            <TopExpertsCarousel />
            {/* <div className="text-center pt-2">
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#243445] hover:bg-slate-800 text-white text-sm sm:text-base font-semibold transition-colors"
              >
                <span>Meet Our Experts</span>
                <AppIcon name="arrow_forward" className="w-[18px] h-[18px]" />
              </Link>
            </div> */}
          </div>
        </div>
      </section>

      {/* 7. VERIFIED STUDENT TESTIMONIAL SPOTLIGHT */}
      <section className="py-16 lg:py-24 w-full bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="bg-[#243445] text-white rounded-3xl p-8 md:p-14 shadow-xl relative overflow-hidden">
            <AppIcon
              name="format_quote"
              className="w-36 h-36 text-white/5 absolute -right-6 -bottom-6 pointer-events-none select-none"
            />
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <AppIcon key={i} name="star" className="w-5 h-5 text-amber-400" filled />
                  ))}
                </div>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold">
                  Verified Coursework Grade Outcome
                </span>
              </div>
              <blockquote className="font-heading text-xl sm:text-2xl lg:text-[28px] font-medium leading-snug italic text-white/95">
                &ldquo;I got my assignment done by cost-accounting professional and thus this raised my grade form B+ to A in cost system subject at University of Australia.&rdquo;
              </blockquote>
              <div className="flex items-center gap-4 pt-4">
                <div className="w-12 h-12 rounded-full bg-[#FF641A] flex items-center justify-center text-white font-bold text-lg font-heading">
                  TY
                </div>
                <div>
                  <p className="font-heading text-lg font-bold text-white">Taylor Yates</p>
                  <p className="text-xs text-white/70">Accountant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ADDITIONAL CORE GUARANTEES & FEATURES ("Additional Incentives") */}
      <section className="py-16 lg:py-24 w-full bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
              Additional Incentives
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#243445] leading-tight">
              Performing {subService.title} Tasks with Additional Incentives in Hand
            </h2>
            <p className="text-sm md:text-base text-slate-600">
              Here is the list of additional essential elements provided for students:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center">
                <AppIcon name="verified" className="w-6 h-6" filled />
              </div>
              <h3 className="font-heading font-semibold text-[#243445] text-lg leading-snug">
                100% Authentic Mode of Payment
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The mode of payment is secured with 256-bit SSL encryption. We support debit/credit cards, PayPal, and bank transfers with zero hidden platform fees.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FFF2EC] text-[#FF641A] flex items-center justify-center">
                <AppIcon name="file_present" className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold text-[#243445] text-lg leading-snug">
                Customized Task as Sample for Free
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A wide range of verified coursework samples is available for free inspection, helping you evaluate writing quality and citation formatting upfront.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center">
                <AppIcon name="content_paste_search" className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold text-[#243445] text-lg leading-snug">
                No Copied Material: 99.9% Plagiarism-Free
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                All solutions are synthesized from ground up using primary literature. Turnitin similarity reports are generated alongside every delivery.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#243445] flex items-center justify-center">
                <AppIcon name="schedule" className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold text-[#243445] text-lg leading-snug">
                Fastest and Immediate Delivery
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Orders are delivered directly to your inbox with hours to spare before your institutional deadline, leaving ample time for thorough review.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAST TURNAROUND PROMOTIONAL BANNER */}
      <section className="w-full relative overflow-hidden py-16 bg-[#243445] text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/fast-turnaround-bg.jpg"
            alt="Academic Support Background Banner"
            fill
            className="object-cover object-center opacity-25"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
              Fast Turnaround Guaranteed
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-1">
              Get your papers created by real professionals!
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              Join thousands of university students scoring A and B grades this semester.
            </p>
          </div>
          <a
            className="px-8 py-4 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white font-semibold text-sm sm:text-base shadow-xl whitespace-nowrap transition-transform hover:scale-105"
            href="https://wa.me/923138400066"
            target="_blank"
            rel="noopener noreferrer"
          >
            Place Your Order
          </a>
        </div>
      </section>

      {/* 10. SIBLING SUB-SERVICES EXPLORATION */}
      {siblingSubServices.length > 0 && (
        <section className="py-16 lg:py-24 w-full bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-8 gap-4 border-b border-slate-100 mb-10">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
                  Related Specializations
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#243445] mt-1">
                  Other {parentTitle} Solutions
                </h2>
              </div>
              <Link
                href={`/${serviceSlug}`}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#FF641A] hover:text-[#E8540E] transition-colors"
              >
                <span>All {parentTitle} Modules</span>
                <AppIcon name="arrow_forward" className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {siblingSubServices.slice(0, 6).map((sibling) => (
                <div
                  key={sibling.id}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    <h3 className="font-heading text-lg font-bold text-[#243445] mb-2 group-hover:text-[#FF641A] transition-colors">
                      <Link href={`/${serviceSlug}/${sibling.slug}`}>{sibling.title}</Link>
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {sibling.shortDescription ||
                        `Explore specialized guidance and doctoral support for ${sibling.title}.`}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-200/60">
                    <Link
                      href={`/${serviceSlug}/${sibling.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#FF641A] group-hover:text-[#E8540E] transition-colors"
                    >
                      <span>Explore Module</span>
                      <AppIcon
                        name="arrow_forward"
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 11. CLIENT SUCCESS STORIES & VERIFIED TESTIMONIALS */}
      <section className="py-16 lg:py-24 w-full bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
              Student Testimonials
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#243445] leading-tight">
              Success Stories for {subService.title}
            </h2>
            <p className="text-sm md:text-base text-slate-600">
              See what real university students say after completing their coursework with our doctoral mentors:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {reviews.map((rev, idx) => (
              <div
                key={rev.id || idx}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#FF641A] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <AppIcon key={i} name="star" className="w-[18px] h-[18px]" filled />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm italic mb-6 leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
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
              <AppIcon name="arrow_forward" className="w-[18px] h-[18px]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 12. VERIFIED GRADES EVIDENCE SHOWCASE (REUSED HOMEPAGE MARQUEE) */}
      <section className="w-full bg-white py-16 lg:py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] text-xs font-semibold mb-2">
                <AppIcon name="verified" className="w-4 h-4" filled />
                <span>Live Academic Evidence</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#243445]">
                Verified Grade Submissions for {subService.title}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-xl bg-slate-100 font-medium text-xs sm:text-sm text-[#243445] shadow-sm">
                Canvas Gradebook
              </span>
              <span className="px-4 py-2 rounded-xl bg-[#ECFDF5] font-bold text-xs sm:text-sm text-[#059669]">
                96.38% A+ Average
              </span>
            </div>
          </div>

          <VerifiedGradesMarquee />

          {/* <div className="text-center pt-6">
            <Link
              href="/samples"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#059669] hover:bg-emerald-600 text-white text-sm sm:text-base font-semibold shadow-md transition-colors"
            >
              <span>View All Samples</span>
              <AppIcon name="arrow_forward" className="w-[18px] h-[18px]" />
            </Link>
          </div> */}
        </div>
      </section>

      {/* 13. CORE QUALITY GUARANTEES (6 CARDS) */}
      <section className="w-full bg-slate-50 py-16 lg:py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
              Unmatched Standards
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#243445] mt-2">
              Core Quality Guarantees
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Our service commitment ensures every single assignment or test assistance request is delivered under airtight guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORE_GUARANTEES.map((g, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FFF2EC] text-[#FF641A] flex items-center justify-center mb-5">
                  <AppIcon name={g.icon} className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#243445] mb-2">
                  {g.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section className="w-full bg-white py-16 lg:py-24 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
              Clarifications &amp; Help
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#243445] mt-2">
              Frequently Asked Questions for {subService.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Find rapid answers about our order placement, security, and class handling policies.
            </p>
          </div>

          <FaqAccordion items={combinedFaqs} />

          {/* <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/samples"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-[#243445] text-sm font-semibold transition-colors"
            >
              <AppIcon name="description" className="w-[18px] h-[18px]" />
              <span>View All Samples</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white text-sm font-semibold shadow-md transition-colors"
            >
              <AppIcon name="support_agent" className="w-[18px] h-[18px]" />
              <span>Contact Support</span>
            </Link>
          </div> */}
        </div>
      </section>

      {/* 15. CLOSING CONVERSION BANNER (Deep Navy Card) */}
      {/* <section className="w-full bg-slate-50 py-16 lg:py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-[#243445] rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#FF641A]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#059669]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="px-4 py-1.5 rounded-full bg-[#FF641A]/20 text-[#FF641A] text-xs uppercase tracking-wider font-bold">
                No More Calculation Anxiety
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                Ready to Master Your {subService.title} Coursework?
              </h2>
              <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Get instant expert solutions created by verified CPAs and Ph.D. scholars. Lift your grades, secure complete peace of mind, and receive 30% off your first order today.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <a
                  className="px-8 py-4 rounded-full bg-[#FF641A] text-white font-semibold text-sm shadow-lg hover:bg-[#E8540E] transition-all transform hover:-translate-y-0.5"
                  href="https://wa.me/923138400066"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Place Your Order Now
                </a>
                <a
                  className="px-7 py-4 rounded-full bg-[#059669] text-white font-semibold text-sm shadow-md hover:bg-emerald-600 transition-all flex items-center gap-2"
                  href="https://wa.me/923138400066"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AppIcon name="chat" className="w-5 h-5" />
                  <span>Talk to an Expert on WhatsApp</span>
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <AppIcon name="check_circle" className="w-4 h-4 text-[#059669]" filled />
                  Plagiarism Free
                </span>
                <span className="flex items-center gap-1.5">
                  <AppIcon name="check_circle" className="w-4 h-4 text-[#059669]" filled />
                  Best Price Guarantee
                </span>
                <span className="flex items-center gap-1.5">
                  <AppIcon name="check_circle" className="w-4 h-4 text-[#059669]" filled />
                  100% Money Back
                </span>
                <span className="flex items-center gap-1.5">
                  <AppIcon name="check_circle" className="w-4 h-4 text-[#059669]" filled />
                  24/7 Live Support
                </span>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* 16. DIRECT HOTLINES & FINAL CALL TO ACTION */}
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
                  Excel your academic journey today with ReadEssay’s {subService.title} support.
                </h2>
                <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl">
                  Don’t let coursework weigh you down. Ordering from ReadEssay is absolutely safe, confidential, and backed by a 100% money-back guarantee.
                </p>

                <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8 pt-4">
                  <a
                    className="flex items-center gap-3 px-5 py-3 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 transition-colors border border-slate-700"
                    href="tel:+923138400066"
                  >
                    <AppIcon name="phone_iphone" className="w-[22px] h-[22px] text-[#FF641A]" />
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
                    <AppIcon name="call" className="w-[22px] h-[22px] text-[#FF641A]" />
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
                    <AppIcon name="mail" className="w-[22px] h-[22px] text-[#FF641A]" />
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
