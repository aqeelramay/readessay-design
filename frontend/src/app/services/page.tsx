import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
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

export const metadata: Metadata = {
  title: 'Academic Services & Assignment Help Solutions | ReadEssay',
  description:
    'Explore comprehensive academic support across 26 core disciplines, online class management, protected exams, and dissertation assistance with 100% Turnitin-safe guarantees.',
  alternates: {
    canonical: 'https://readessay.com/services',
  },
  openGraph: {
    title: 'Academic Services & Assignment Help Solutions | ReadEssay',
    description:
      'Professional assignment help, online class management, and exam assistance across US, UK, Canadian, and Australian universities.',
    url: 'https://readessay.com/services',
    siteName: 'ReadEssay',
    type: 'website',
  },
};

const DISCIPLINES_26 = [
  {
    title: 'Accounting Assignment Help',
    icon: 'account_balance_wallet',
    desc: 'Master balance sheets, financial reporting, taxation, and auditing with accurate balance-matching solutions.',
    slug: 'assignment-help/assignment-accounting',
  },
  {
    title: 'Business Assignment Help',
    icon: 'business_center',
    desc: 'Strategic analysis, marketing plans, MBA case evaluations, and corporate feasibility reports.',
    slug: 'assignment-help/assignment-business',
  },
  {
    title: 'Corporate Finance Assignment Help',
    icon: 'trending_up',
    desc: 'Advanced capital budgeting, DCF valuation models, M&A cases, and WACC calculations.',
    slug: 'homework-help/hw-finance',
  },
  {
    title: 'CS Assignment Help',
    icon: 'terminal',
    desc: 'Python, Java, C++, data structures, SQL queries, algorithm complexity, and web architecture.',
    slug: 'assignment-help/assignment-cs',
  },
  {
    title: 'Finance Assignment Help',
    icon: 'pie_chart',
    desc: 'Portfolio management, stock valuation, options pricing, and capital asset pricing models (CAPM).',
    slug: 'homework-help/hw-finance',
  },
  {
    title: 'History Assignment Help',
    icon: 'history_edu',
    desc: 'Primary source evaluation, historiography papers, archival synthesis, and comparative historical analysis.',
    slug: 'assignment-help/assignment-essay',
  },
  {
    title: 'Human Resource Assignment Help',
    icon: 'groups',
    desc: 'Talent acquisition frameworks, CIPD modules, organizational behavior, and workplace ethics.',
    slug: 'assignment-help/assignment-business',
  },
  {
    title: 'Humanities Assignment Help',
    icon: 'auto_stories',
    desc: 'Philosophy, literary criticism, sociology dissertations, cultural anthropology, and ethics papers.',
    slug: 'assignment-help/assignment-essay',
  },
  {
    title: 'Management Assignment Help',
    icon: 'corporate_fare',
    desc: 'Operations management, supply chain logistics, leadership development, and change management.',
    slug: 'assignment-help/assignment-business',
  },
  {
    title: 'Marketing Assignment Help',
    icon: 'campaign',
    desc: 'Consumer behavior analysis, SEO strategies, branding campaigns, and market penetration matrices.',
    slug: 'assignment-help/assignment-business',
  },
  {
    title: 'Mathematics Assignment Help',
    icon: 'functions',
    desc: 'Calculus I-III, differential equations, linear algebra, vector fields, and discrete math proofs.',
    slug: 'assignment-help/assignment-math',
  },
  {
    title: 'Online Assignment Help',
    icon: 'laptop_chromebook',
    desc: 'Comprehensive multi-disciplinary assignment writing covering all academic curricula worldwide.',
    slug: 'assignment-help',
  },
  {
    title: 'BTEC HND Business Assignment Help',
    icon: 'school',
    desc: 'Rigorous unit-level reports for Pearson BTEC Higher National Diploma modules and criteria.',
    slug: 'assignment-help/assignment-business',
  },
  {
    title: 'Science Assignment Help',
    icon: 'biotech',
    desc: 'Laboratory reports, organic chemistry mechanisms, thermodynamics, and molecular biology papers.',
    slug: 'assignment-help',
  },
  {
    title: 'Statistics Assignment Help',
    icon: 'analytics',
    desc: 'SPSS syntax, R code, STATA datasets, ANOVA models, multivariate regression, and hypothesis testing.',
    slug: 'assignment-help/assignment-statistics',
  },
  {
    title: 'Bournemouth University Assignment Help',
    icon: 'account_balance',
    desc: 'Tailored coursework aligning directly with Bournemouth University assessment guidelines.',
    slug: 'assignment-help',
  },
  {
    title: 'Business Strategy Assignment Help',
    icon: 'military_tech',
    desc: 'Porter’s Five Forces, Blue Ocean strategy, VRIO analysis, and global competitive dynamics.',
    slug: 'assignment-help/assignment-business',
  },
  {
    title: 'Coventry University Assignment Help',
    icon: 'account_balance',
    desc: 'Coventry Harvard citation style and specific faculty rubrics mastered by alumni specialists.',
    slug: 'assignment-help',
  },
  {
    title: 'Management and Operations Assignment',
    icon: 'precision_manufacturing',
    desc: 'Lean Six Sigma workflows, inventory modeling, bottleneck calculations, and ERP strategies.',
    slug: 'assignment-help/assignment-business',
  },
  {
    title: 'UK Business Law Assignment Help',
    icon: 'gavel',
    desc: 'Tort law, commercial contract analysis, company law disputes, and OSCOLA citation standards.',
    slug: 'assignment-help',
  },
  {
    title: 'University College Birmingham Help',
    icon: 'hotel_class',
    desc: 'Hospitality management, culinary arts, business enterprise, and tourism coursework.',
    slug: 'assignment-help',
  },
  {
    title: 'University of Central Lancashire Help',
    icon: 'local_library',
    desc: 'UCLan module-specific coursework, case law summaries, and postgraduate research protocols.',
    slug: 'assignment-help',
  },
  {
    title: 'University of East Anglia Assignment Help',
    icon: 'history',
    desc: 'Norwich Business School, environmental sciences, and literature coursework excellence.',
    slug: 'assignment-help',
  },
  {
    title: 'University of Westminster Assignment Help',
    icon: 'apartment',
    desc: 'London curriculum guidelines, media studies, international relations, and finance essays.',
    slug: 'assignment-help',
  },
  {
    title: 'International Marketing Assignment Help',
    icon: 'public',
    desc: 'Cross-cultural consumer research, global market entry modes, and trade tariff impact papers.',
    slug: 'assignment-help/assignment-business',
  },
  {
    title: 'Research Project & Dissertation Help',
    icon: 'query_stats',
    desc: 'Complete dissertation methodology, literature review synthesis, and empirical data analysis.',
    slug: 'assignment-help',
  },
];

export default async function ServicesPage() {
  const [services, reviews] = await Promise.all([
    fetchServiceTree(),
    fetchFeaturedReviews({ limit: 6 }),
  ]);

  return (
    <div className="w-full bg-[#FAFAFA] text-[#243445]">
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
          ]),
          buildServiceSchema({
            name: 'ReadEssay Academic Services Catalog',
            description:
              'Explore comprehensive academic support across 26 core disciplines, online class management, protected exams, and dissertation assistance.',
            url: '/services',
          }),
          buildFaqPageSchema(DEFAULT_FAQS),
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
            <span className="text-[#243445] font-semibold">Services</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left: Copy & Value Props */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF2EC] text-[#FF641A] text-xs sm:text-sm font-semibold self-start border border-[#FF641A]/10">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span>Professional Assignment Help Designed Around Your Academic Needs</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#243445] tracking-tight leading-tight">
                Top-Rated Assignment Help For High Grades &amp; Academic Peace of Mind
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                Get expert assignment help across multiple subjects from experienced academic
                specialists. Receive quality support, meet deadlines, and work towards better
                grades with confidence.
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
                  Get an instant, transparent quote tailored to your academic level, subject, and deadline.
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

      {/* 3. DYNAMIC PARENT SERVICES & SUB-SERVICES MATRIX */}
      <section className="w-full py-16 lg:py-24 bg-white" id="all-services">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
              Core Service Catalog
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#243445] mt-2">
              Explore Our Core Academic Divisions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3">
              Select any primary division to view dedicated subject rubrics, verified expert profiles, and tailored solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FFF2EC] text-[#FF641A] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[26px]">
                      {service.slug.includes('exam')
                        ? 'verified_user'
                        : service.slug.includes('class')
                        ? 'school'
                        : service.slug.includes('homework')
                        ? 'quiz'
                        : 'description'}
                    </span>
                  </div>
                  {service.badgeLabel && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FFF2EC] text-[#FF641A] text-xs font-semibold mb-2">
                      {service.badgeLabel}
                    </span>
                  )}
                  <h3 className="font-heading text-xl font-bold text-[#243445] mb-2">
                    <Link
                      href={`/${service.slug}`}
                      className="hover:text-[#FF641A] transition-colors"
                    >
                      {service.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {service.shortDescription}
                  </p>

                  {/* Sub-services pills */}
                  {service.subServices && service.subServices.length > 0 && (
                    <div className="space-y-1.5 mb-6">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                        Specializations:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {service.subServices.slice(0, 5).map((sub) => (
                          <Link
                            key={sub.id}
                            href={`/${service.slug}/${sub.slug}`}
                            className="text-xs px-2.5 py-1 rounded-md bg-slate-50 hover:bg-[#FFF2EC] hover:text-[#FF641A] text-slate-600 font-medium transition-colors border border-slate-100"
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href={`/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#FF641A] group-hover:text-[#E8540E] transition-colors"
                  >
                    <span>Explore {service.title}</span>
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

      {/* 4. 26 SUBJECT SPECIALIZATIONS GRID */}
      <section className="w-full bg-slate-50 py-16 lg:py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#FF641A] tracking-wider uppercase">
              Comprehensive Subject Specializations
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#243445] mt-2">
              Explore Our Assignment Help Across 26 Core Disciplines
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Browse our specialized solutions tailored for undergraduate, postgraduate, and university-specific curricula.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DISCIPLINES_26.map((disc, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 border border-slate-100 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FFF2EC] text-[#FF641A] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[26px]">{disc.icon}</span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#243445] mb-2">
                    <Link href={`/${disc.slug}`} className="hover:text-[#FF641A] transition-colors">
                      {disc.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{disc.desc}</p>
                </div>
                <div className="pt-5 mt-4 border-t border-slate-100">
                  <Link
                    href={`/${disc.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm text-[#FF641A] group-hover:text-[#E8540E] font-semibold transition-colors"
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

          <div className="mt-12 text-center">
            <Link
              href="/assignment-help"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white text-sm sm:text-base font-semibold shadow-md transition-colors"
            >
              <span>Explore Assignment Help Directory</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. CORE ACADEMIC SOLUTIONS (4 HIGHLIGHT CARDS) */}
      <section className="w-full bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
              Core Academic Solutions
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#243445] mt-2 leading-tight">
              Achieving Success Was Never So Easy
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Select your service module to lock in dedicated doctoral-level assistance today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-100">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FFF2EC] text-[#FF641A] flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[22px]">description</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-[#243445] mb-2">
                  Pay to do My Assignment Help
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  If you’re tired and have multiple coursework lined up, don’t fret. ReadEssay has writers trained across all disciplines ready for urgent guidelines.
                </p>
                <Link
                  className="text-sm text-[#FF641A] font-semibold hover:underline mb-6 inline-flex items-center gap-1"
                  href="/assignment-help"
                >
                  <span>Continue Reading</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
              <a
                className="w-full py-2.5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white text-sm font-bold text-center transition-colors shadow-sm block"
                href="https://wa.me/923138400066"
                target="_blank"
                rel="noopener noreferrer"
              >
                Order Now
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-100">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#243445] flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[22px]">verified_user</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-[#243445] mb-2">
                  Online Protected Exam Help
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Are online proctored exams too stressful? Deadlines intimidating? Find verified experts ready to take assessments with total privacy.
                </p>
                <Link
                  className="text-sm text-[#FF641A] font-semibold hover:underline mb-6 inline-flex items-center gap-1"
                  href="/exam-help"
                >
                  <span>Continue Reading</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
              <a
                className="w-full py-2.5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white text-sm font-bold text-center transition-colors shadow-sm block"
                href="https://wa.me/923138400066"
                target="_blank"
                rel="noopener noreferrer"
              >
                Order Now
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-100">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#243445] text-white flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[22px]">school</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-[#243445] mb-2">
                  Take My Class Help
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Lengthy coursework and endless discussions can overwhelm busy schedules. ReadEssay is ready to share the entire term workload for guaranteed A/B grades.
                </p>
                <Link
                  className="text-sm text-[#FF641A] font-semibold hover:underline mb-6 inline-flex items-center gap-1"
                  href="/online-class-help"
                >
                  <span>Continue Reading</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
              <a
                className="w-full py-2.5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white text-sm font-bold text-center transition-colors shadow-sm block"
                href="https://wa.me/923138400066"
                target="_blank"
                rel="noopener noreferrer"
              >
                Order Now
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border border-slate-100">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[22px]">quiz</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-[#243445] mb-2">
                  Do my Online Quiz &amp; Test Help
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  College and high school virtual facilities test knowledge under strict timers. Let our subject experts handle your weekly tests and secure top scores.
                </p>
                <Link
                  className="text-sm text-[#FF641A] font-semibold hover:underline mb-6 inline-flex items-center gap-1"
                  href="/homework-help"
                >
                  <span>Continue Reading</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
              <a
                className="w-full py-2.5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white text-sm font-bold text-center transition-colors shadow-sm block"
                href="https://wa.me/923138400066"
                target="_blank"
                rel="noopener noreferrer"
              >
                Order Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE READESSAY (6 PILLARS) */}
      <section className="w-full bg-slate-50 py-16 lg:py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
              Uncompromising Quality
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#243445] mt-2">
              Why Choose ReadEssay?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              ReadEssay provides robust services at the most competitive, transparent rates. Here is what establishes our long-standing standing among thousands of collegiate students:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-200 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-[#FFF2EC] text-[#FF641A] flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-[26px]">grade</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-[#243445] mb-2">
                High-Quality Work
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We deliver only high-quality services. When you hand over your work, it is in safe hands with well-researched, accurate, and properly formatted submissions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-200 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-[26px]">fact_check</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-[#243445] mb-2">
                100% Original Content
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We understand the cost of submitting plagiarized work. No plagiarism, no AI shortcuts; only custom solutions crafted according to your precise prompt.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-200 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#243445] flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-[26px]">lock</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-[#243445] mb-2">
                100% Confidential
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your personal information, login credentials, and academic details remain protected under strict domestic VPN security and privacy agreements.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-200 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-[#243445] text-white flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-[26px]">price_check</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-[#243445] mb-2">
                Affordable Pricing
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Looking for an affordable provider? ReadEssay offers upfront, honest pricing starting from $5.50 with zero surprise costs or hidden platform fees.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-200 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-[#FFF2EC] text-[#FF641A] flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-[26px]">support_agent</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-[#243445] mb-2">
                Live Chat Support
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our support team is online 24/7 to resolve questions, handle sudden deadline changes, and relay instructions straight to your assigned tutor.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-200 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-[26px]">psychology</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-[#243445] mb-2">
                Skilled Subject Experts
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                From STEM, Python, and Statistics to Nursing and Business, our specialists possess advanced degrees and extensive teaching backgrounds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PROMOTIONAL FAST TURNAROUND BANNER */}
      <section className="w-full relative overflow-hidden py-16 bg-[#243445] text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/images/fast-turnaround-bg.jpg"
            alt="Academic Support Banner Background"
            fill
            className="object-cover object-center"
            sizes="100vw"
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
            className="px-8 py-4 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white text-sm sm:text-base font-bold shadow-xl whitespace-nowrap transition-transform hover:scale-105"
            href="https://wa.me/923138400066"
            target="_blank"
            rel="noopener noreferrer"
          >
            Place Your Order
          </a>
        </div>
      </section>

      {/* 8. FEATURE COMPARISON TABLE */}
      <section className="w-full bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
              Transparent Standards
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#243445] mt-2">
              How ReadEssay Compares
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              See why collegiate scholars trust ReadEssay over generic essay mills and unregulated freelance websites.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-sm font-heading font-bold text-[#243445]">
                  <th className="py-4 px-6">Quality Feature</th>
                  <th className="py-4 px-6 bg-[#FFF2EC] text-[#FF641A] border-x border-[#FF641A]/20">
                    ReadEssay Academic Concierge
                  </th>
                  <th className="py-4 px-6 text-slate-600">Standard Writing Sites</th>
                  <th className="py-4 px-6 text-slate-600">Freelancer Marketplaces</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                <tr>
                  <td className="py-4 px-6 font-medium text-[#243445]">Plagiarism Screening</td>
                  <td className="py-4 px-6 bg-[#FFF2EC]/30 font-semibold text-[#059669] border-x border-[#FF641A]/20">
                    Turnitin Non-Repo (&lt; 5%) + 0% AI
                  </td>
                  <td className="py-4 px-6 text-slate-500">Basic free checker</td>
                  <td className="py-4 px-6 text-slate-500">Depends on individual seller</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-[#243445]">Writer Qualifications</td>
                  <td className="py-4 px-6 bg-[#FFF2EC]/30 font-semibold text-[#243445] border-x border-[#FF641A]/20">
                    Doctorates &amp; Master’s verified specialists
                  </td>
                  <td className="py-4 px-6 text-slate-500">Anonymous generalist writers</td>
                  <td className="py-4 px-6 text-slate-500">Unvetted profiles with fake bids</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-[#243445]">Security &amp; Portal VPN</td>
                  <td className="py-4 px-6 bg-[#FFF2EC]/30 font-semibold text-[#059669] border-x border-[#FF641A]/20">
                    Residential domestic VPN matching your city
                  </td>
                  <td className="py-4 px-6 text-slate-500">No location matching (flag risk)</td>
                  <td className="py-4 px-6 text-slate-500">Foreign IP logins trigger alerts</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-[#243445]">Turnaround Speed</td>
                  <td className="py-4 px-6 bg-[#FFF2EC]/30 font-semibold text-[#243445] border-x border-[#FF641A]/20">
                    Urgent 6 to 12 hour express delivery
                  </td>
                  <td className="py-4 px-6 text-slate-500">24-48 hours minimum</td>
                  <td className="py-4 px-6 text-slate-500">Unpredictable freelancer timing</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-[#243445]">Amendments &amp; Revisions</td>
                  <td className="py-4 px-6 bg-[#FFF2EC]/30 font-semibold text-[#059669] border-x border-[#FF641A]/20">
                    Unlimited free revisions within 24h
                  </td>
                  <td className="py-4 px-6 text-slate-500">Charged extra after 7 days</td>
                  <td className="py-4 px-6 text-slate-500">Dispute tickets or ghosting</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-[#243445]">Support Accessibility</td>
                  <td className="py-4 px-6 bg-[#FFF2EC]/30 font-semibold text-[#FF641A] border-x border-[#FF641A]/20">
                    24/7 Direct WhatsApp &amp; Live Chat
                  </td>
                  <td className="py-4 px-6 text-slate-500">Email ticket queue only</td>
                  <td className="py-4 px-6 text-slate-500">Slow marketplace messaging</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-[#243445]">Grade Guarantee</td>
                  <td className="py-4 px-6 bg-[#FFF2EC]/30 font-semibold text-[#059669] border-x border-[#FF641A]/20">
                    A or B grade outcome or 100% refund
                  </td>
                  <td className="py-4 px-6 text-slate-500">Store credits only</td>
                  <td className="py-4 px-6 text-slate-500">No grade accountability</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 9. 4-STEP ORDER WORKFLOW */}
      <section className="w-full bg-slate-50 py-16 lg:py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
              Seamless Workflow
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#243445] mt-2">
              How Our Academic Support Works
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              From briefing your requirements to receiving A-grade submissions in 4 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative">
              <span className="w-8 h-8 rounded-full bg-[#FF641A] text-white flex items-center justify-center font-bold text-sm mb-4">
                1
              </span>
              <h3 className="font-heading text-lg font-bold text-[#243445] mb-2">
                Submit Your Requirements
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Share your assignment rubric, guidelines, reading materials, and deadline via WhatsApp or web form.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative">
              <span className="w-8 h-8 rounded-full bg-[#243445] text-white flex items-center justify-center font-bold text-sm mb-4">
                2
              </span>
              <h3 className="font-heading text-lg font-bold text-[#243445] mb-2">
                Doctoral Specialist Allocation
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We assign a certified PhD subject expert who understands your university’s specific criteria and modules.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative">
              <span className="w-8 h-8 rounded-full bg-[#059669] text-white flex items-center justify-center font-bold text-sm mb-4">
                3
              </span>
              <h3 className="font-heading text-lg font-bold text-[#243445] mb-2">
                Drafting &amp; Quality Audit
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your paper is researched from scratch and screened via Turnitin Non-Repository to ensure 100% original work.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative">
              <span className="w-8 h-8 rounded-full bg-[#FF641A] text-white flex items-center justify-center font-bold text-sm mb-4">
                4
              </span>
              <h3 className="font-heading text-lg font-bold text-[#243445] mb-2">
                Delivery &amp; Free Revisions
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Receive your completed document ahead of deadline with full rights and free revisions if requested.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. STUDENT TESTIMONIALS */}
      <section className="w-full bg-white py-16 lg:py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
              Student Testimonials
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#243445] mt-2">
              Success Stories Directly From Our Clients
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              ReadEssay is the trusted partner for college learners worldwide. See what real students say after partnering with our scholars:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {reviews.map((rev, idx) => (
              <div
                key={rev.id || idx}
                className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow"
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

      {/* 11. VERIFIED GRADES TRANSCRIPT SHOWCASE */}
      <section className="w-full bg-slate-50 py-16 lg:py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] text-xs font-semibold mb-2">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>Live Academic Evidence</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#243445]">
                Verified Portal Grade Submissions
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

      {/* 12. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section className="w-full bg-white py-16 lg:py-24 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
              Clarifications &amp; Help
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#243445] mt-2">
              Frequently Asked Questions FAQ
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Find rapid answers about our order placement, security, and class handling policies.
            </p>
          </div>

          <FaqAccordion items={DEFAULT_FAQS} />

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/samples"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-[#243445] text-sm font-semibold transition-colors"
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

      {/* 13. DIRECT HOTLINES & FINAL CALL TO ACTION */}
      <section className="w-full bg-slate-50 py-16 lg:py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-[#243445] text-white rounded-3xl p-8 lg:p-14 relative overflow-hidden shadow-2xl">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#FF641A]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8">
                <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
                  Get In Touch With Us
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-2 leading-tight">
                  Excel your academic journey today with ReadEssay’s online class service and protected exam service.
                </h2>
                <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl">
                  Don’t let coursework weigh you down. We are your partners in your academic journey. Ordering from ReadEssay is absolutely safe and secure. We do not disclose customer information.
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
