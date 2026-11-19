import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
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

// 26 Disciplines Catalog extracted from design/services.html
const ASSIGNMENT_DISCIPLINES = [
  { slug: 'assignment-accounting', title: 'Accounting Assignment Help', icon: 'account_balance_wallet', desc: 'Master balance sheets, financial reporting, taxation, and auditing with accurate balance-matching solutions.' },
  { slug: 'assignment-business', title: 'Business Assignment Help', icon: 'business_center', desc: 'Strategic analysis, marketing plans, MBA case evaluations, and corporate feasibility reports.' },
  { slug: 'assignment-finance', title: 'Corporate Finance Assignment Help', icon: 'trending_up', desc: 'Advanced capital budgeting, DCF valuation models, M&A cases, and WACC calculations.' },
  { slug: 'assignment-cs', title: 'CS Assignment Help', icon: 'terminal', desc: 'Clean and tested Python, Java, C++, SQL scripts, database ERDs, and algorithm documentation.' },
  { slug: 'assignment-finance-general', title: 'Finance Assignment Help', icon: 'pie_chart', desc: 'Portfolio management, risk hedging, asset pricing, and financial statement ratio analysis.' },
  { slug: 'assignment-history', title: 'History Assignment Help', icon: 'history_edu', desc: 'Primary source critiques, historiographical reviews, archival citations, and chronological thesis papers.' },
  { slug: 'assignment-hr', title: 'Human Resource Assignment Help', icon: 'groups', desc: 'Talent acquisition models, workplace dispute resolution, OSHA policies, and HR strategy briefs.' },
  { slug: 'assignment-humanities', title: 'Humanities Assignment Help', icon: 'auto_stories', desc: 'Deep textual synthesis, cultural critiques, ethics frameworks, and philosophy term essays.' },
  { slug: 'assignment-management', title: 'Management Assignment Help', icon: 'business_center', desc: 'Organizational leadership frameworks, SWOT/PESTLE reviews, and supply chain logistics papers.' },
  { slug: 'assignment-marketing', title: 'Marketing Assignment Help', icon: 'campaign', desc: 'Omnichannel consumer persona studies, brand positioning roadmaps, and digital marketing pitches.' },
  { slug: 'assignment-math', title: 'Mathematics Assignment Help', icon: 'functions', desc: 'Discrete mathematics, differential calculus, vector algebra, and linear algebra step-by-step proofs.' },
  { slug: 'assignment-mechanical', title: 'Mechanical Engineering Assignment Help', icon: 'precision_manufacturing', desc: 'Thermodynamics, fluid mechanics, CAD schematics, statics, and finite element analyses.' },
  { slug: 'assignment-nursing', title: 'Nursing Assignment Help', icon: 'biotech', desc: 'Evidence-based nursing care plans, clinical pharmacology, epidemiology, and patient case notes.' },
  { slug: 'assignment-operations', title: 'Operations Management Assignment Help', icon: 'factory', desc: 'Lean Six Sigma workflows, inventory modeling, bottleneck mitigation, and operations planning.' },
  { slug: 'assignment-philosophy', title: 'Philosophy Assignment Help', icon: 'menu_book', desc: 'Epistemology, ethical moral dilemmas, existential treatises, and logical symbolic proofs.' },
  { slug: 'assignment-physics', title: 'Physics Assignment Help', icon: 'biotech', desc: 'Classical mechanics, quantum physics, electromagnetism, and laboratory experiment reports.' },
  { slug: 'assignment-political', title: 'Political Science Assignment Help', icon: 'gavel', desc: 'Geopolitics, constitutional law reviews, international relations, and public policy analyses.' },
  { slug: 'assignment-programming', title: 'Programming Assignment Help', icon: 'code', desc: 'Bug-free code in React, Node, Django, Spring Boot, and C# with comprehensive unit test coverage.' },
  { slug: 'assignment-psychology', title: 'Psychology Assignment Help', icon: 'psychology', desc: 'Cognitive behavioral assessments, DSM-5 case syntheses, and qualitative psychological papers.' },
  { slug: 'assignment-science', title: 'Science Assignment Help', icon: 'biotech', desc: 'Biology genetics, organic chemistry reaction mechanisms, biochemistry, and lab analyses.' },
  { slug: 'assignment-sociology', title: 'Sociology Assignment Help', icon: 'public', desc: 'Social stratification, demographic urbanization papers, and sociological research methodologies.' },
  { slug: 'assignment-statistics', title: 'Statistics Assignment Help', icon: 'bar_chart', desc: 'SPSS regression analysis, ANOVA tests, R scripts, Python pandas, and hypothesis interpretations.' },
  { slug: 'assignment-supply-chain', title: 'Supply Chain Assignment Help', icon: 'factory', desc: 'Procurement logistics, distribution networks, warehouse optimization, and supply forecasting.' },
  { slug: 'assignment-hertfordshire', title: 'University of Hertfordshire Assignment Help', icon: 'school', desc: 'Tailored to Herts module rubrics, student handbook criteria, and localized grading standards.' },
  { slug: 'assignment-greenwich', title: 'University of Greenwich Assignment Help', icon: 'school', desc: 'Greenwich faculty guidelines, Harvard reference standards, and course syllabus alignment.' },
  { slug: 'assignment-coventry', title: 'Coventry University Assignment Help', icon: 'school', desc: 'CU Coventry modular course briefs, APA/Coventry Harvard styles, and seminar rubrics.' },
];

export default async function ServiceDetailPage({ params }: PageProps) {
  const { serviceSlug } = await params;

  if (RESERVED_SLUGS.includes(serviceSlug)) {
    notFound();
  }

  const [service, reviews, calculatorData] = await Promise.all([
    fetchServiceBySlug(serviceSlug),
    fetchFeaturedReviews({ serviceSlug, limit: 6 }),
    fetchPublicCalculator(),
  ]);

  if (!service) {
    notFound();
  }

  // Merge service FAQs with fallback
  const combinedFaqs =
    service.faqs && service.faqs.length > 0 ? service.faqs : DEFAULT_FAQS;

  const isAssignmentHelp = service.slug === 'assignment-help';

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

      {/* 1. HERO SECTION (2-Column with Price Calculator on Right) */}
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
                <AppIcon name="verified_user" className="w-[18px] h-[18px]" filled />
                <span>
                  {service.heroBadge ||
                    'Professional Assignment Help Designed Around Your Academic Needs'}
                </span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#243445] tracking-tight leading-tight">
                {service.heroTitle || service.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                {service.heroSubtitle ||
                  service.shortDescription ||
                  'Get expert assignment help across multiple subjects from experienced academic specialists. Receive quality support, meet deadlines, and work towards better grades with confidence.'}
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
                  defaultServiceSlug={service.slug}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REUSED HOMEPAGE TRUST BARS (Rating Cards & University Marquee) */}
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

      {/* 3. SUB-SERVICES / SPECIALIZATION MODULES GRID */}
      <section className="py-16 lg:py-24 w-full bg-white border-b border-slate-100" id="assignment-services">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#FF641A] tracking-wider uppercase">
              Comprehensive Subject Specializations
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#243445] mt-2">
              {isAssignmentHelp
                ? 'Explore Our Assignment Help Services Across Core Disciplines'
                : `Explore Specialized ${service.title} Modules`}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Browse our specialized solutions tailored for undergraduate, postgraduate, and university-specific curricula.
            </p>
          </div>

          {/* Seeded Child Sub-Services */}
          {service.subServices && service.subServices.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {service.subServices.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-white rounded-2xl p-6 shadow-md hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-slate-100 group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#FFF2EC] text-[#FF641A] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      <AppIcon name={sub.icon || 'edit_document'} className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-[#243445] mb-2 group-hover:text-[#FF641A] transition-colors">
                      <Link href={`/${service.slug}/${sub.slug}`}>
                        {sub.title}
                      </Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {sub.shortDescription ||
                        `Master ${sub.title} assignments with verified doctoral mentoring and step-by-step solutions.`}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <Link
                      href={`/${service.slug}/${sub.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#FF641A] group-hover:text-[#E8540E] font-semibold transition-colors"
                    >
                      <span>Explore Service</span>
                      <AppIcon name="arrow_forward" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Full 26 Disciplines Catalog from design/services.html (when on Assignment Help) */}
          {isAssignmentHelp && (
            <div className="mt-14 pt-10 border-t border-slate-100">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#243445]">
                  Full Discipline Directory &amp; University Rubrics
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Connect with subject specialists across all collegiate faculties
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ASSIGNMENT_DISCIPLINES.map((item, idx) => (
                  <div
                    key={idx}
                    className="service-card group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between border border-slate-100"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[#FFF2EC] text-[#FF641A] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                        <AppIcon name={item.icon} className="w-6 h-6" />
                      </div>
                      <h4 className="font-heading text-base font-bold text-[#243445] mb-2 group-hover:text-[#FF641A] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <a
                        href="#hero-calculator-slot"
                        className="inline-flex items-center gap-1 text-xs text-[#FF641A] font-semibold hover:underline"
                      >
                        <span>Calculate Quote</span>
                        <AppIcon name="arrow_forward" className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. EDITORIAL CONTENT, CORE ACADEMIC SOLUTIONS & 6 PILLARS */}
      <section className="w-full bg-slate-50 py-16 lg:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Core Academic Solutions Header */}
          <div className="text-center max-w-4xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF641A]">
              Core Academic Solutions
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-[#243445] mt-2 leading-tight font-bold">
              Achieving success was never so easy. Get started with the best online class services today and make your academic journey stress-free!
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3">
              Select your service module to lock in dedicated doctoral-level assistance today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-100">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FFF2EC] text-[#FF641A] flex items-center justify-center mb-4">
                  <AppIcon name="description" className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-[#243445] mb-2">
                  Pay to do My Assignment Help
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  If you’re tired and have multiple coursework lined up, don’t fret. ReadEssay has writers trained across all disciplines ready to cater to urgent guidelines.
                </p>
              </div>
              <Link
                href="/assignment-help"
                className="w-full py-2.5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white text-xs font-bold text-center transition-colors shadow-sm block"
              >
                Order Now
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-100">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#243445] flex items-center justify-center mb-4">
                  <AppIcon name="verified_user" className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-[#243445] mb-2">
                  Online Protected Exam Help
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Are online proctored exams too stressful? Deadlines intimidating? Find verified experts ready to take assessments with total privacy under Honorlock &amp; Proctorio.
                </p>
              </div>
              <Link
                href="/exam-help"
                className="w-full py-2.5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white text-xs font-bold text-center transition-colors shadow-sm block"
              >
                Order Now
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-100">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#243445] text-white flex items-center justify-center mb-4">
                  <AppIcon name="school" className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-[#243445] mb-2">
                  Take My Class Help
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Lengthy coursework and endless discussions can overwhelm busy schedules. ReadEssay is ready to share the entire term workload for guaranteed A/B grades.
                </p>
              </div>
              <Link
                href="/online-class-help"
                className="w-full py-2.5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white text-xs font-bold text-center transition-colors shadow-sm block"
              >
                Order Now
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-100">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-4">
                  <AppIcon name="quiz" className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-[#243445] mb-2">
                  Do my Online Quiz &amp; Test Help
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  College and high school virtual facilities test knowledge under strict timers. Let our subject experts handle your weekly tests and secure top scores.
                </p>
              </div>
              <Link
                href="/homework-help"
                className="w-full py-2.5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white text-xs font-bold text-center transition-colors shadow-sm block"
              >
                Order Now
              </Link>
            </div>
          </div>

          {/* Why Choose ReadEssay (6 Pillars) */}
          <div className="pt-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF641A]">
                Uncompromising Quality
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-[#243445] mt-2 font-bold">
                Why Choose ReadEssay?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-3">
                ReadEssay provides robust services at the most competitive, transparent rates. Here is what establishes our standing among thousands of collegiate students:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-[#FFF2EC] text-[#FF641A] flex items-center justify-center mb-5">
                  <AppIcon name="star" className="w-6 h-6" filled />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#243445] mb-2">
                  High-Quality Work
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We deliver only high-quality services. When you hand over your work, it is in safe hands with well-researched, accurate, and properly formatted submissions.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-5">
                  <AppIcon name="fact_check" className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#243445] mb-2">
                  100% Original Content
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We understand the cost of submitting plagiarized work. No plagiarism, no AI shortcuts; only custom solutions crafted according to your precise prompt.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#243445] flex items-center justify-center mb-5">
                  <AppIcon name="lock" className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#243445] mb-2">
                  100% Confidential
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Your personal information, login credentials, and academic details remain protected under strict domestic VPN security and privacy agreements.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-[#243445] text-white flex items-center justify-center mb-5">
                  <AppIcon name="price_check" className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#243445] mb-2">
                  Affordable Pricing
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Looking for an affordable provider? ReadEssay offers upfront, honest pricing starting from $5.50 with zero surprise costs or hidden platform fees.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-[#FFF2EC] text-[#FF641A] flex items-center justify-center mb-5">
                  <AppIcon name="support_agent" className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#243445] mb-2">
                  Live Chat Support
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our support team is online 24/7 to resolve questions, handle sudden deadline changes, and relay instructions straight to your assigned tutor.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-5">
                  <AppIcon name="psychology" className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#243445] mb-2">
                  Skilled Subject Experts
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  From STEM, Python, and Statistics to Nursing and Business, our specialists possess advanced degrees and extensive teaching backgrounds.
                </p>
              </div>
            </div>
          </div>

          {/* 4-Step Order Workflow */}
          <div className="mt-20 pt-10 border-t border-slate-200">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF641A]">
                Seamless Process
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-[#243445] mt-2 font-bold">
                How It Works: 4 Easy Steps
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Submit Requirements', desc: 'Share your assignment brief, rubric criteria, formatting style, and deadline.' },
                { step: '02', title: 'Expert Allocation', desc: 'We pair your coursework with a vetted Ph.D. scholar specializing in your exact field.' },
                { step: '03', title: 'Drafting & Dual-Audit', desc: 'Your paper is drafted from scratch with verified calculations and Turnitin similarity checks.' },
                { step: '04', title: 'Delivery & Revisions', desc: 'Receive your completed report and raw data files ahead of schedule with free revisions.' },
              ].map((st, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative">
                  <span className="text-3xl font-extrabold text-[#FF641A]/20 font-heading block mb-2">
                    {st.step}
                  </span>
                  <h4 className="font-heading font-bold text-base text-[#243445] mb-2">
                    {st.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROMOTIONAL BANNER */}
      <section className="w-full relative overflow-hidden py-16 bg-[#243445] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
              Fast Turnaround Guaranteed
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white mt-1 font-bold">
              Get your papers created by real professionals!
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2">
              Join thousands of university students scoring A and B grades this semester.
            </p>
          </div>
          <a
            href="https://wa.me/923138400066"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white font-bold text-sm shadow-xl whitespace-nowrap transition-transform hover:scale-105"
          >
            Place Your Order
          </a>
        </div>
      </section>

      {/* 5. REUSED HOMEPAGE FACULTY SECTION (<TopExpertsCarousel />) */}
      <section className="py-16 lg:py-24 w-full bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
              Accountability at Work
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#243445] mt-2">
              Meet Our Verified Doctoral Specialists
            </h2>
            <p className="text-sm md:text-base text-slate-600 mt-2">
              Our faculty scholars hold degrees from premier global universities and have guided over 10,000 students to Dean&apos;s List grades.
            </p>
          </div>
          <TopExpertsCarousel />
        </div>
      </section>

      {/* 6. VERIFIED STUDENT TESTIMONIALS (With "More Reviews" -> /reviews) */}
      <section className="py-16 lg:py-24 w-full bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
              Student Testimonials
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#243445] mt-2">
              Success Stories Directly From Our Clients
            </h2>
            <p className="text-sm md:text-base text-slate-600 mt-2">
              ReadEssay is the trusted partner for college learners worldwide. See what real students say after partnering with our subject scholars:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {reviews.map((rev, idx) => (
              <div
                key={rev.id || idx}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow"
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
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
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
                    <span className="text-xs text-slate-500">{rev.serviceTitle || service.title}</span>
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

      {/* 7. REUSED VERIFIED GRADES MARQUEE (With "View All Samples" -> /samples) */}
      <section className="w-full bg-white py-16 lg:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] text-xs font-semibold mb-2">
                <AppIcon name="verified" className="w-4 h-4" filled />
                <span>Live Academic Evidence</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#243445]">
                Verified Grade Submissions in {service.title}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-xl bg-slate-50 font-medium text-xs sm:text-sm text-[#243445] shadow-sm border border-slate-100">
                Canvas Gradebook
              </span>
              <span className="px-4 py-2 rounded-xl bg-[#ECFDF5] font-bold text-xs sm:text-sm text-[#059669]">
                96.38% A+ Average
              </span>
            </div>
          </div>

          <VerifiedGradesMarquee />
        </div>
      </section>

      {/* 8. CORE QUALITY GUARANTEES (2x3 GRID) */}
      <section className="py-16 lg:py-24 w-full bg-slate-50 border-b border-slate-100">
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
                <AppIcon name="workspace_premium" className="w-[26px] h-[26px]" />
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
                <AppIcon name="task_alt" className="w-[26px] h-[26px]" />
              </div>
              <h3 className="font-heading text-xl font-bold text-[#243445] mb-2">
                Plagiarism-Free Work
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                It is against our core values to deliver any project without screening. All work is 100% original and verified through industry-grade scanners.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#243445] flex items-center justify-center mb-5">
                <AppIcon name="find_in_page" className="w-[26px] h-[26px]" />
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
                <AppIcon name="alarm_on" className="w-[26px] h-[26px]" />
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
                <AppIcon name="headset_mic" className="w-[26px] h-[26px]" />
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
                <AppIcon name="published_with_changes" className="w-[26px] h-[26px]" />
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

      {/* 9. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section className="w-full bg-white py-16 lg:py-24 border-b border-slate-100">
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
        </div>
      </section>

      {/* 10. DIRECT HOTLINES & FINAL CALL TO ACTION BANNER */}
      <section className="w-full bg-slate-50 py-16 lg:py-24">
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
                  Don’t let coursework weigh you down. We are your partners in your academic journey. Ordering from ReadEssay is absolutely safe, confidential, and backed by a 100% money-back guarantee.
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
