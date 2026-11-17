import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchServiceTree } from '@/lib/data-fetchers';
import ContactFormClient from '@/components/contact/ContactFormClient';
import FaqAccordion from '@/components/shared/FaqAccordion';

export const metadata: Metadata = {
  title: 'Contact Us | ReadEssay - 24/7 Academic Support & WhatsApp Desk',
  description:
    'Get in touch with ReadEssay academic advisors. Available 24/7 for urgent coursework, dissertation consultations, and online class assistance.',
  alternates: {
    canonical: 'https://readessay.com/contact',
  },
  openGraph: {
    title: 'Contact Us | ReadEssay - 24/7 Academic Support Desk',
    description:
      'Have questions or urgent coursework deadlines? Contact our senior coordinators via WhatsApp, phone, or online inquiry form.',
    url: 'https://readessay.com/contact',
    type: 'website',
  },
};

const FAQ_MICRO_ITEMS = [
  {
    number: '01',
    question: 'How quickly will I get a response?',
    answer:
      'Typically within 5 to 15 minutes via WhatsApp or live chat, and under 30 minutes via email. Urgent overnight assignments receive immediate dispatch priority.',
    tag: 'Instant Queue Matching',
    icon: 'bolt',
    tagColor: 'text-[#FF641A]',
    numBg: 'bg-orange-100 text-[#FF641A]',
  },
  {
    number: '02',
    question: 'Is my contact information confidential?',
    answer:
      'Yes. All student communication is protected under 256-bit banking-grade SSL encryption, rigorous NDA standards, and strict institutional privacy policies.',
    tag: 'Strict NDA Protected',
    icon: 'verified',
    tagColor: 'text-[#059669]',
    numBg: 'bg-emerald-100 text-[#059669]',
  },
  {
    number: '03',
    question: 'Can I submit urgent assignment guidelines?',
    answer:
      'Yes. You can describe your brief in this contact form, send syllabus PDFs directly to our WhatsApp desk, or attach them in the student portal after instant checkout.',
    tag: 'PDF, DOCX & Slides Accepted',
    icon: 'upload_file',
    tagColor: 'text-slate-600',
    numBg: 'bg-slate-200 text-[#243445]',
  },
];

export default async function ContactPage() {
  const services = await fetchServiceTree();

  return (
    <main className="w-full pt-28 bg-[#F8FAFC] min-h-screen">
      <div className="flex flex-col w-full">
        {/* HERO SECTION */}
        <section
          className="w-full bg-gradient-to-b from-white via-orange-50/20 to-[#F8FAFC] pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-slate-200"
          data-purpose="contact-hero"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center text-xs text-slate-500 gap-2">
              <Link href="/" className="hover:text-[#FF641A] transition">
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-slate-800">Contact</span>
            </nav>

            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 bg-orange-100 text-[#FF641A] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              <span>24/7 STUDENT SUPPORT DESK</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-poppins font-bold text-3xl sm:text-5xl lg:text-6xl text-[#243445] tracking-tight max-w-4xl leading-tight">
              Get in Touch With Our Academic Advisory Team
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mt-4 leading-relaxed font-normal">
              Have a question or need assistance? Our support team is available 24/7 to help you
              with assignment outlines, doctoral consultations, and urgent coursework deadlines.
            </p>
          </div>
        </section>

        {/* MAIN CONTACT EXPERIENCE (2-COLUMN GRID) */}
        <section className="w-full py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Column 1: Direct Channels & Reachability (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="space-y-2">
                  <h2 className="font-poppins font-bold text-2xl text-[#243445] tracking-tight">
                    Direct Channels &amp; Contact Info
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Our specialized academic support coordinators are standing by around the clock
                    across UK, European, and North American academic time zones.
                  </p>
                </div>

                {/* Channel Cards Stack */}
                <div className="flex flex-col gap-4">
                  {/* Card 1: WhatsApp Direct Desk (Primary) */}
                  <a
                    href="https://wa.me/923138400066"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white p-5 rounded-2xl shadow-xs hover:shadow-md border border-slate-200/80 transition-all duration-200 flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#059669] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-[24px]">chat</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#059669]">
                          WhatsApp Direct Desk
                        </span>
                        <span className="material-symbols-outlined text-[16px] text-slate-400 group-hover:text-[#059669] transition-colors">
                          arrow_outward
                        </span>
                      </div>
                      <div className="font-poppins font-bold text-lg text-[#243445] mt-0.5 tracking-tight group-hover:text-[#059669] transition-colors">
                        +92 3138400066
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Instant replies, quick rubric file uploads, syllabus reviews &amp; direct
                        coordination with PhD specialists.
                      </p>
                    </div>
                  </a>

                  {/* Card 2: UK Support Desk */}
                  <a
                    href="tel:+447460674811"
                    className="group bg-white p-5 rounded-2xl shadow-xs hover:shadow-md border border-slate-200/80 transition-all duration-200 flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-orange-100 text-[#FF641A] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-[24px]">call</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Helpline (UK &amp; Global)
                        </span>
                        <span className="material-symbols-outlined text-[16px] text-slate-400 group-hover:text-[#FF641A] transition-colors">
                          arrow_outward
                        </span>
                      </div>
                      <div className="font-poppins font-bold text-lg text-[#243445] mt-0.5 tracking-tight group-hover:text-[#FF641A] transition-colors">
                        +44 7460 674811
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Available 24/7 for urgent deadline dispatch, dissertation scheduling, and
                        exam management.
                      </p>
                    </div>
                  </a>

                  {/* Card 3: Email Support */}
                  <a
                    href="mailto:support@readessay.com"
                    className="group bg-white p-5 rounded-2xl shadow-xs hover:shadow-md border border-slate-200/80 transition-all duration-200 flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-[#243445] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-[24px]">mail</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Official Inquiries &amp; Support
                        </span>
                        <span className="material-symbols-outlined text-[16px] text-slate-400 group-hover:text-[#243445] transition-colors">
                          arrow_outward
                        </span>
                      </div>
                      <div className="font-poppins font-bold text-lg text-[#243445] mt-0.5 tracking-tight">
                        support@readessay.com
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Expect detailed written replies, price breakdowns, and editorial feedback
                        within 15–30 minutes.
                      </p>
                    </div>
                  </a>

                  {/* Card 4: Web Platform Portal */}
                  <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[24px]">language</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Official Web Portal
                        </span>
                        <span className="text-[10px] font-bold text-[#059669] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Active 24/7
                        </span>
                      </div>
                      <div className="font-poppins font-bold text-base text-[#243445] mt-0.5 tracking-tight">
                        readessay.com
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Encrypted 256-bit SSL student client platform with real-time assignment
                        milestone tracking.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Corporate Operating Entity Card */}
                <div className="bg-slate-100/80 p-5 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#243445]">
                    <span className="material-symbols-outlined text-[18px] text-[#FF641A]">
                      corporate_fare
                    </span>
                    <span>Corporate Entity &amp; Registered Office</span>
                  </div>
                  <p className="leading-relaxed">
                    ReadEssay is operated by <strong className="text-[#243445]">786outsource Ltd</strong>.
                    Registered in England &amp; Wales under Company No. 13812845.
                  </p>
                  <p className="text-slate-500">
                    Registered Office: 20-22 Wenlock Road, London, England, N1 7GU.
                  </p>
                </div>
              </div>

              {/* Column 2: Interactive Contact Form (7 Cols) */}
              <div className="lg:col-span-7">
                <ContactFormClient services={services} />
              </div>
            </div>
          </div>
        </section>

        {/* COMPACT FAQ MICRO-STRIP */}
        <section className="w-full bg-white py-14 border-t border-slate-200 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF641A]">
                Quick Help
              </span>
              <h3 className="font-poppins font-bold text-2xl sm:text-3xl text-[#243445] tracking-tight">
                Frequently Asked Contact Inquiries
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Common procedural questions regarding our response turnaround and client confidentiality.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FAQ_MICRO_ITEMS.map((item) => (
                <div
                  key={item.number}
                  className="bg-[#F8FAFC] p-6 rounded-3xl border border-slate-200/80 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div
                      className={`w-9 h-9 rounded-full ${item.numBg} flex items-center justify-center font-bold text-xs`}
                    >
                      {item.number}
                    </div>
                    <h4 className="font-poppins font-bold text-base text-[#243445]">
                      {item.question}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.answer}</p>
                  </div>
                  <div className={`pt-2 flex items-center gap-1.5 text-xs font-bold ${item.tagColor}`}>
                    <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                    <span>{item.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DETAILED FAQ ACCORDION SECTION */}
        <section className="w-full bg-[#F8FAFC] py-16 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF641A]">
                Comprehensive Guidance
              </span>
              <h2 className="font-poppins font-bold text-2xl sm:text-4xl text-[#243445] tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Everything you need to know about placing an order, protected exams, and our academic guarantee.
              </p>
            </div>

            <FaqAccordion />
          </div>
        </section>
      </div>
    </main>
  );
}
