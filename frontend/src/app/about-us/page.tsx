import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import RatingCards from '@/components/shared/RatingCards';
import UniversityMarquee from '@/components/shared/UniversityMarquee';
import JsonLd from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/schema';
import AppIcon from '@/components/shared/AppIcon';

export const metadata: Metadata = {
  title: 'About Us | ReadEssay - Premier Scholastic Support & PhD Mentorship',
  description:
    'ReadEssay provides an authoritative, confidential academic support platform connecting students worldwide with accredited subject specialists and experienced PhD mentors.',
  alternates: {
    canonical: 'https://readessay.com/about-us',
  },
  openGraph: {
    title: 'About Us | ReadEssay - Premier Scholastic Support & PhD Mentorship',
    description:
      'Connecting undergraduate, postgraduate, and doctoral students worldwide with accredited subject specialists and experienced PhD mentors. 100% confidential and Turnitin verified.',
    url: 'https://readessay.com/about-us',
    type: 'website',
  },
};

const EXPERTS = [
  {
    name: 'Dr. David Moraine',
    degrees: 'PhD, Oxford Alum',
    role: 'Senior Academic Research Faculty & Integrity Lead',
    experience: '14+ Years Postgraduate Advising',
    publications: '45+ Peer-Reviewed Publications',
    specialties: ['Dissertation Defense', 'Empirical Research', 'Corporate Finance'],
    image: '/images/male-expert1.jpg',
    badge: 'Verified PhD Supervisor',
  },
  {
    name: 'Dr. Sarah Jenkins',
    degrees: 'PhD, Stanford University',
    role: 'Quantitative Methodology & Learning Design Specialist',
    experience: '10+ Years Methodology Advising',
    publications: '320+ Dissertations Supervised',
    specialties: ['SPSS & R Syntax', 'Psychometrics', 'Mixed Methods'],
    image: '/images/female-expert1.jpg',
    badge: 'Verified Methods Specialist',
  },
  {
    name: 'Prof. David Sterling',
    degrees: 'MA (Oxon), Fellow HEA',
    role: 'Senior Rhetoric Specialist & Composition Lead',
    experience: '18+ Years Higher Education Advising',
    publications: '500+ Synthesized Lit Reviews',
    specialties: ['Systematic Reviews', 'Case Study Analysis', 'Critical Critique'],
    image: '/images/male-expert2.jpg',
    badge: 'Verified Senior Fellow',
  },
  {
    name: 'Dr. Alan Crawford',
    degrees: 'PhD, Cambridge',
    role: 'Academic Documentation & Citation Manuals Lead',
    experience: '12+ Years Editorial Advising',
    publications: 'Author of Global Citation Guides',
    specialties: ['APA 7th & Chicago', 'OSCOLA Law', 'Technical Proofreading'],
    image: '/images/female-expert2.jpg',
    badge: 'Verified Style Specialist',
  },
];

const QA_STEPS = [
  {
    number: '01',
    title: 'Syllabus & Rubric Alignment',
    description:
      'Every project is mapped directly against your university descriptor, grading rubric, and module learning outcomes by a dedicated PhD coordinator.',
    icon: 'assignment_turned_in',
  },
  {
    number: '02',
    title: 'Bespoke Scholarly Drafting',
    description:
      'Researched and drafted exclusively by human faculty scholars. We incorporate primary peer-reviewed sources published within the last 3-5 years.',
    icon: 'edit_document',
  },
  {
    number: '03',
    title: 'Turnitin & AI Detection Scan',
    description:
      'Independent non-repository verification guaranteeing < 5% raw similarity and a 0% AI index score before any work is released.',
    icon: 'verified_user',
  },
  {
    number: '04',
    title: 'Direct Delivery & Free Amendments',
    description:
      'Your completed paper arrives in your secure dashboard with complete raw data files. Unlimited free revisions are included within 14-30 days.',
    icon: 'published_with_changes',
  },
];

export default function AboutUsPage() {
  return (
    <main className="w-full pt-28 bg-[#F8FAFC] min-h-screen">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'About Us', url: '/about-us' },
        ])}
      />
      <div className="flex flex-col w-full">
        {/* HERO SECTION */}
        <section
          className="relative bg-gradient-to-b from-white via-orange-50/20 to-[#F8FAFC] pt-10 pb-16 lg:py-20 border-b border-slate-200 overflow-hidden"
          data-purpose="about-hero"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-xs text-slate-500 gap-2">
              <Link href="/" className="hover:text-[#FF641A] transition">
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-slate-800">About Us</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Hero Copy */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 bg-orange-100 text-[#FF641A] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  <AppIcon name="school" className="w-4 h-4" />
                  <span>Empowering Academic Excellence Worldwide</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#243445] tracking-tight leading-tight font-poppins">
                  About ReadEssay: Premier Scholastic Support &amp; PhD Mentorship
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
                  ReadEssay provides an authoritative, confidential academic support platform
                  connecting undergraduate, postgraduate, and doctoral students worldwide with
                  accredited subject specialists and experienced PhD mentors.
                </p>

                {/* Trust Badges Bar */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-[#059669] border border-emerald-200 text-xs font-semibold">
                    <AppIcon name="verified" className="w-4 h-4 text-[#059669]" filled />
                    <span>100% Plagiarism-Free • Turnitin Verified</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-[#059669] border border-emerald-200 text-xs font-semibold">
                    <AppIcon name="psychology" className="w-4 h-4 text-[#059669]" />
                    <span>Zero-AI Human Scholarship Guarantee</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-[#059669] border border-emerald-200 text-xs font-semibold">
                    <AppIcon name="lock" className="w-4 h-4 text-[#059669]" />
                    <span>Strict 256-Bit NDA Privacy</span>
                  </span>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    href="/services"
                    className="px-8 py-4 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white font-bold text-sm shadow-xl transition-all transform hover:-translate-y-0.5"
                  >
                    Explore Academic Services
                  </Link>
                  <Link
                    href="/contact"
                    className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-[#243445] border border-slate-200 font-bold text-sm transition-all shadow-xs"
                  >
                    Contact Academic Concierge
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Visual */}
              <div className="lg:col-span-5 relative">
                <div className="relative bg-white p-3 rounded-3xl shadow-xl border border-slate-100">
                  <div className="overflow-hidden rounded-2xl aspect-[4/3] relative bg-slate-100">
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7EZ5tqG6_kYLtGH9wg2t6tczslXXtGOVZ3N8bykrAbeT-t_iOKPsEmnNyQllU3go-LumN9-Xlw9kAYwg-OmMPKtnH_TYBnOvJeEFSx7Jj-yzznV77mmRlhJPTnOY7xb1G1iiTpa7b_j0LPMwDZ9pY5iBnbaK_3yrjuw1SXtrzmSKF67iqIiy90c3G4cG3nFfWy3gqeFCD7Nk_VYCVQ0BcqNw3qVtpXhmqk1g9tUEa"
                      alt="A diverse group of university students and doctoral researchers engaging in collaborative study in a modern library"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Decorative Blurs */}
                <div className="absolute -top-6 -right-6 w-36 h-36 bg-[#FF641A]/15 rounded-full blur-2xl -z-10" />
                <div className="absolute -bottom-8 -left-8 w-44 h-44 bg-[#243445]/15 rounded-full blur-2xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* GLOBAL IMPACT KPI METRICS */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="text-3xl sm:text-4xl font-bold font-poppins text-[#FF641A]">
                  150,000+
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#243445]">
                  Delivered Academic Projects
                </div>
                <p className="text-xs text-slate-500">Across 85+ Global Universities</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="text-3xl sm:text-4xl font-bold font-poppins text-[#243445]">
                  4.95 / 5.0
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#243445]">
                  Student Satisfaction Rating
                </div>
                <p className="text-xs text-slate-500">From 4,200+ Verified Client Reviews</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="text-3xl sm:text-4xl font-bold font-poppins text-[#FF641A]">
                  850+
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#243445]">
                  PhD &amp; Master&apos;s Specialists
                </div>
                <p className="text-xs text-slate-500">Oxbridge &amp; Russell Group Faculty</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="text-3xl sm:text-4xl font-bold font-poppins text-[#059669]">
                  &lt; 3%
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#243445]">
                  Turnitin Similarity Index
                </div>
                <p className="text-xs text-slate-500">Zero AI &amp; Full Authenticity Guarantee</p>
              </div>
            </div>
          </div>
        </section>

        {/* WHO WE ARE & CORE VALUES */}
        <section className="py-16 lg:py-20 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Narrative */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF641A]">
                  <AppIcon name="flag" className="w-4 h-4" />
                  <span>Who We Are &amp; Core Philosophy</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold text-[#243445] font-poppins tracking-tight leading-tight">
                  Democratizing High-Caliber Scholarly Mentorship
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                  <p>
                    ReadEssay provides a platform to students from all over the world to connect
                    with experienced and professional writers. You can benefit from our assignment
                    writing services, online tutoring help, and instant coursework assistance
                    directly through our platform.
                  </p>
                  <p>
                    We aim to help our clients by providing optimum quality services within
                    affordable and feasible budgets. Each assignment is tailored to the exact
                    specifications, formatting standards, and empirical rubrics requested by the
                    student.
                  </p>
                  <p>
                    Whether tackling a complex master&apos;s dissertation, a corporate finance case
                    study, or an urgent online exam module, our dedicated bench of PhD researchers
                    ensures your academic trajectory remains on track for top grade outcomes.
                  </p>
                </div>
              </div>

              {/* Right Column: Academic Proof Visual */}
              <div className="lg:col-span-5">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80 space-y-4">
                  <div className="overflow-hidden rounded-2xl aspect-[4/3] relative bg-slate-100">
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMk25c5xRhm79nFiZZQdP63zQVDfZTCUGxpItBeroZn5tEB_vIRDtTkomUbmoIILuX7SwCF-5EDpZonGbAcw9sSg4hWQyOTlbPZqZ3GmbsVL0F7WKoqkqOe3i-gs38-zzv7iNOFZzVRgrqYyWZ2gX0eiUdMp0DCEsmCXLM1SCopnR1t_-U0cYh5511nSimZOGKEiVeKKIh-ThRBdwMnvTljXKj1M-0vodDd1bHu-L7"
                      alt="Focused graduate student conducting research with scholarly books and laptops"
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-[#243445]">Faculty Editorial Standards</span>
                    <span className="text-[#059669] font-bold">Grade A or B Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2 BALANCED MISSION & VALUES CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission Card */}
              <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#FF641A] flex items-center justify-center">
                    <AppIcon name="eye_tracking" className="w-[30px] h-[30px]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#243445] font-poppins">
                    OUR VISION
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    ReadEssay was formed with the ideology to help students and provide assistance
                    with their written assignments. We aim to provide plagiarism-free assignments
                    written to the exact detail and specifications provided by the student. We
                    assure the best quality work delivered to you within the exact time limit!
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#FF641A]">
                  <span>Punctual Deliveries</span>
                  <span>•</span>
                  <span>100% Turnitin Clean</span>
                </div>
              </div>

              {/* Values Card */}
              <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#059669] flex items-center justify-center">
                    <AppIcon name="verified" className="w-[30px] h-[30px]" filled />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#243445] font-poppins">
                    OUR VALUES
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    At ReadEssay, we value integrity and hard work. These are the two key elements
                    we focus on when dealing with our clients and that is why all information of our
                    clientele remains confidential. Secure payment transaction methods are also
                    used to avoid any fraud or financial misconduct. This is why we are ultimately
                    the best choice in the business!
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#059669]">
                  <span>Complete Student Anonymity</span>
                  <span>•</span>
                  <span>SSL Encrypted Payments</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EDITORIAL BOARD & PHD EXPERTS SHOWCASE */}
        <section className="py-16 lg:py-24 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF641A] block">
                Scholarly Leadership
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#243445] font-poppins tracking-tight">
                Meet Our Lead Editorial Board &amp; PhD Subject Specialists
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Terminal degree scholars from Oxford, Stanford, Cambridge, and leading Russell
                Group universities personally guide and review every assignment.
              </p>
            </div>

            {/* 4 Expert Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {EXPERTS.map((expert) => (
                <div
                  key={expert.name}
                  className="bg-[#F8FAFC] rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Expert Photo */}
                    <div className="relative h-64 overflow-hidden bg-slate-200">
                      <Image
                        src={expert.image}
                        alt={expert.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                          <AppIcon name="check_circle" className="w-3.5 h-3.5" filled />
                          <span>{expert.badge}</span>
                        </span>
                      </div>
                    </div>

                    {/* Expert Details */}
                    <div className="p-6 space-y-3">
                      <div>
                        <h3 className="font-poppins font-bold text-lg text-[#243445] group-hover:text-[#FF641A] transition">
                          {expert.name}
                        </h3>
                        <p className="text-xs text-[#FF641A] font-semibold mt-0.5">
                          {expert.degrees}
                        </p>
                      </div>

                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        {expert.role}
                      </p>

                      <div className="space-y-1 text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                        <p>• {expert.experience}</p>
                        <p>• {expert.publications}</p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {expert.specialties.map((spec) => (
                          <span
                            key={spec}
                            className="text-[10px] bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md font-medium"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      href="/contact"
                      className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-[#FF641A] hover:text-white border border-slate-200 text-[#243445] text-xs font-bold text-center transition block shadow-xs"
                    >
                      Request Consultation
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* QUALITY ASSURANCE WORKFLOW */}
        <section className="py-16 lg:py-20 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF641A] block">
                Standard of Excellence
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#243445] font-poppins tracking-tight">
                Our 4-Stage Quality Assurance Protocol
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                How ReadEssay guarantees verified originality, academic rigor, and flawless grading
                alignment across every deliverable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {QA_STEPS.map((step) => (
                <div
                  key={step.number}
                  className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4 relative flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#FF641A] flex items-center justify-center">
                        <AppIcon name={step.icon} className="w-6 h-6" />
                      </div>
                      <span className="text-2xl font-bold font-poppins text-slate-300">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="font-poppins font-bold text-base text-[#243445]">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-2 text-[11px] text-[#059669] font-bold flex items-center gap-1">
                    <AppIcon name="check" className="w-3.5 h-3.5" />
                    <span>Verified Milestone</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST BARS: REVIEWS & UNIVERSITY MARQUEE */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF641A]">
                Independent Verification
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#243445] font-poppins">
                Backed by 4,200+ Verified Student Ratings
              </h3>
            </div>

            <RatingCards />
            <UniversityMarquee />
          </div>
        </section>

        {/* BOTTOM CALL-TO-ACTION BANNER */}
        <section className="w-full bg-[#243445] text-white py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center space-y-8 relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#FF641A]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl mx-auto space-y-4">
              <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
                Ready to Experience Stress-Free Academics?
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-poppins text-white leading-tight">
                Work Directly with Top PhD Mentors Today
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Connect with our academic concierge desk to receive a prompt, obligation-free quote,
                or explore our comprehensive catalog of coursework and exam support services.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/services"
                  className="px-8 py-4 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white font-bold text-sm shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                  Explore Our Services
                </Link>
                <Link
                  href="/reviews"
                  className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all"
                >
                  Read Student Reviews
                </Link>
                <Link
                  href="/samples"
                  className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all"
                >
                  Browse Free Samples
                </Link>
                <a
                  href="https://wa.me/923138400066"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all flex items-center gap-2"
                >
                  <span>Chat on WhatsApp</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
