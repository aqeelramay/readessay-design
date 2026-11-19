'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PublicService } from '@/lib/public-api';
import AppIcon from '@/components/shared/AppIcon';

interface ContactFormClientProps {
  services?: PublicService[];
}

export default function ContactFormClient({ services = [] }: ContactFormClientProps) {
  const searchParams = useSearchParams();

  const [orderEstimate] = useState<{
    service: string;
    level: string;
    deadline: string;
    pages: string;
    words: string;
    estimate: string;
  } | null>(() => {
    if (!searchParams) return null;
    const estimateParam = searchParams.get('estimate') || '';
    if (!estimateParam) return null;
    return {
      service: searchParams.get('service') || '',
      level: searchParams.get('level') || '',
      deadline: searchParams.get('deadline') || '',
      pages: searchParams.get('pages') || '',
      words: searchParams.get('words') || '',
      estimate: estimateParam,
    };
  });

  const [formData, setFormData] = useState(() => {
    const serviceParam = searchParams?.get('service') || '';
    const levelParam = searchParams?.get('level') || '';
    const deadlineParam = searchParams?.get('deadline') || '';
    const pagesParam = searchParams?.get('pages') || '';
    const wordsParam = searchParams?.get('words') || '';
    const estimateParam = searchParams?.get('estimate') || '';

    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      serviceSlug: serviceParam,
      academicLevel: levelParam || 'undergraduate',
      deadline: deadlineParam ? `${deadlineParam.replace(/-/g, ' ')}` : '',
      wordCount: wordsParam ? `${wordsParam} words (${pagesParam} ${pagesParam === '1' ? 'page' : 'pages'})` : '',
      message: estimateParam
        ? `Order inquiry from price calculator: ${pagesParam} ${pagesParam === '1' ? 'page' : 'pages'} (${wordsParam} words), estimated at $${estimateParam} USD with ${deadlineParam.replace(/-/g, ' ')} turnaround.`
        : '',
    };
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.firstName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in all required fields (Name, Email, and Brief).');
      return;
    }

    setIsSubmitting(true);

    // Simulate API submission or dispatch
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitted(true);
    } catch {
      setErrorMsg('Failed to dispatch inquiry. Please reach out to our WhatsApp hotline directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate pre-filled WhatsApp message
  const whatsappText = encodeURIComponent(
    `Hello ReadEssay Support! My name is ${formData.firstName || '[Name]'} ${formData.lastName || ''
    }.\n\n` +
    `*Inquiry Details:*\n` +
    `• Service: ${formData.serviceSlug || 'General Inquiry'}\n` +
    `• Academic Level: ${formData.academicLevel}\n` +
    `• Target Deadline: ${formData.deadline || 'Not specified'}\n` +
    `• Target Word Count: ${formData.wordCount || 'Not specified'}\n` +
    (orderEstimate ? `• Calculator Estimate: $${orderEstimate.estimate} USD (${orderEstimate.pages} ${orderEstimate.pages === '1' ? 'page' : 'pages'} / ${orderEstimate.words} words)\n` : '') +
    `• Phone/WhatsApp: ${formData.phone || 'Not specified'}\n` +
    `• Email: ${formData.email || 'Not specified'}\n\n` +
    `*Brief / Notes:*\n${formData.message || 'I would like to inquire about assignment help.'}`,
  );

  const whatsappUrl = `https://wa.me/923138400066?text=${whatsappText}`;

  if (isSubmitted) {
    return (
      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-slate-100 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#059669] flex items-center justify-center mx-auto text-3xl font-bold">
          <AppIcon name="check_circle" className="w-9 h-9" filled />
        </div>

        <div className="space-y-2">
          <h3 className="font-poppins font-bold text-2xl text-[#243445]">
            Inquiry Dispatched Successfully!
          </h3>
          <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-[#243445]">{formData.firstName}</strong>. An academic
            coordinator will review your assignment brief and send a comprehensive breakdown to{' '}
            <strong className="text-[#243445]">{formData.email}</strong> in less than 15 minutes.
          </p>
        </div>

        {/* WhatsApp Fast Track Shortcut */}
        <div className="p-5 rounded-2xl bg-orange-50/70 border border-orange-100 max-w-md mx-auto text-left space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#FF641A] uppercase tracking-wide">
            <AppIcon name="bolt" className="w-4 h-4" />
            <span>Need an Instant Response?</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Skip the inbox queue by dispatching your brief directly to our senior WhatsApp
            coordinators.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full bg-[#059669] hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition"
          >
            <span>Open in WhatsApp with Pre-filled Brief</span>
            <span>→</span>
          </a>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                serviceSlug: '',
                academicLevel: 'undergraduate',
                deadline: '',
                wordCount: '',
                message: '',
              });
            }}
            className="text-xs font-bold text-slate-500 hover:text-[#FF641A] transition underline"
          >
            Submit Another Scholastic Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-slate-100 space-y-6">
      {/* Form Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF641A]">
          <AppIcon name="edit_note" className="w-4 h-4" />
          <span>Direct Scholastic Request</span>
        </div>
        <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-[#243445] tracking-tight">
          Send Us a Message
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Fill out the form below with your academic inquiry or assignment details, and our senior
          coordinator will reach out promptly.
        </p>
      </div>

      {orderEstimate && (
        <div className="p-4 sm:p-5 rounded-2xl bg-orange-50/80 border border-orange-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF641A]">
              <AppIcon name="calculate" className="w-4 h-4" />
              <span>Calculator Order Estimate Applied</span>
            </div>
            <p className="text-xs text-slate-600">
              Configured for <strong className="text-[#243445]">{orderEstimate.pages} {orderEstimate.pages === '1' ? 'page' : 'pages'}</strong> ({orderEstimate.words} words) &bull; Turnaround: <strong className="text-[#243445]">{orderEstimate.deadline.replace(/-/g, ' ')}</strong>
            </p>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <span className="text-xs text-slate-500 font-semibold block">Total Estimate</span>
            <span className="text-xl sm:text-2xl font-black text-[#FF641A] font-poppins">
              ${orderEstimate.estimate} USD
            </span>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
          <AppIcon name="error" className="w-[18px] h-[18px]" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Row 1: Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="firstName" className="block text-xs font-bold text-[#243445]">
              First Name <span className="text-[#FF641A]">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              placeholder="e.g., Alexander"
              className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-2xl outline-none focus:bg-white focus:border-[#FF641A] focus:ring-2 focus:ring-orange-100 transition text-sm shadow-inner"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="lastName" className="block text-xs font-bold text-[#243445]">
              Last Name <span className="text-[#FF641A]">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              placeholder="e.g., Vance"
              className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-2xl outline-none focus:bg-white focus:border-[#FF641A] focus:ring-2 focus:ring-orange-100 transition text-sm shadow-inner"
            />
          </div>
        </div>

        {/* Row 2: Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-bold text-[#243445]">
              Email Address <span className="text-[#FF641A]">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g., student@university.edu"
              className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-2xl outline-none focus:bg-white focus:border-[#FF641A] focus:ring-2 focus:ring-orange-100 transition text-sm shadow-inner"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="phone" className="block text-xs font-bold text-[#243445]">
              Phone / WhatsApp Number <span className="text-[#FF641A]">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g., +44 7700 900077"
              className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-2xl outline-none focus:bg-white focus:border-[#FF641A] focus:ring-2 focus:ring-orange-100 transition text-sm shadow-inner"
            />
          </div>
        </div>

        {/* Row 3: Service Topic Selection & Academic Level */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="serviceSlug" className="block text-xs font-bold text-[#243445]">
              Academic Service / Topic <span className="text-[#FF641A]">*</span>
            </label>
            <div className="relative">
              <select
                id="serviceSlug"
                name="serviceSlug"
                required
                value={formData.serviceSlug}
                onChange={handleChange}
                className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-slate-800 rounded-2xl outline-none focus:bg-white focus:border-[#FF641A] focus:ring-2 focus:ring-orange-100 appearance-none text-sm shadow-inner cursor-pointer"
              >
                <option value="" disabled>
                  Select service or consultation category
                </option>
                {services.length > 0 ? (
                  services.map((srv) => (
                    <optgroup label={srv.title} key={srv.id}>
                      <option value={srv.slug}>{srv.title} (All Topics)</option>
                      {srv.subServices?.map((sub) => (
                        <option key={sub.id} value={`${srv.slug}/${sub.slug}`}>
                          ↳ {sub.title}
                        </option>
                      ))}
                    </optgroup>
                  ))
                ) : (
                  <>
                    <option value="online-class-help">Online Class Help</option>
                    <option value="essay-writing">Essay Writing Service</option>
                    <option value="dissertation-help">Dissertation &amp; Thesis Support</option>
                    <option value="assignment-help">Coursework &amp; Assignment Help</option>
                  </>
                )}
                <optgroup label="Other Inquiries">
                  <option value="order-status">Order Status &amp; Progress Consultation</option>
                  <option value="urgent-exam">Urgent Proctored Exam &amp; Quiz Assistance</option>
                  <option value="billing-pricing">Billing, Pricing Calculator &amp; Payment</option>
                  <option value="general-inquiry">Other Academic Guidance Questions</option>
                </optgroup>
              </select>
              <AppIcon
                name="expand_more"
                className="w-5 h-5 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="academicLevel" className="block text-xs font-bold text-[#243445]">
              Academic Level
            </label>
            <div className="relative">
              <select
                id="academicLevel"
                name="academicLevel"
                value={formData.academicLevel}
                onChange={handleChange}
                className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-slate-800 rounded-2xl outline-none focus:bg-white focus:border-[#FF641A] focus:ring-2 focus:ring-orange-100 appearance-none text-sm shadow-inner cursor-pointer"
              >
                <option value="undergraduate">Undergraduate (Years 1-3)</option>
                <option value="master">Master&apos;s Degree</option>
                <option value="postgraduate">Postgraduate</option>
                <option value="phd">PhD / Doctoral Candidate</option>
                <option value="doctoral">Doctoral</option>
                <option value="college">College / A-Level / IB</option>
                <option value="high-school">High School</option>
              </select>
              <AppIcon
                name="expand_more"
                className="w-5 h-5 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Row 4: Deadline Date & Word Count */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="deadline" className="block text-xs font-bold text-[#243445]">
              Target Deadline Date
            </label>
            <input
              type="text"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              placeholder="e.g., Nov 25, 2026 or Urgent (24 Hours)"
              className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-2xl outline-none focus:bg-white focus:border-[#FF641A] focus:ring-2 focus:ring-orange-100 transition text-sm shadow-inner"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="wordCount" className="block text-xs font-bold text-[#243445]">
              Target Word Count / Pages
            </label>
            <input
              type="text"
              id="wordCount"
              name="wordCount"
              value={formData.wordCount}
              onChange={handleChange}
              placeholder="e.g., 2,500 words or 10 pages"
              className="w-full h-11 px-4 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-2xl outline-none focus:bg-white focus:border-[#FF641A] focus:ring-2 focus:ring-orange-100 transition text-sm shadow-inner"
            />
          </div>
        </div>

        {/* Row 5: Message */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="message" className="block text-xs font-bold text-[#243445]">
              Assignment Brief / Inquiries <span className="text-[#FF641A]">*</span>
            </label>
            <span className="text-[11px] text-slate-400 font-medium">
              Rubrics &amp; datasets can also be sent via WhatsApp
            </span>
          </div>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Provide details about your subject, specific university rubric instructions, required citation style (APA, Harvard, OSCOLA), or urgent quiz schedule..."
            className="w-full p-4 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-2xl outline-none focus:bg-white focus:border-[#FF641A] focus:ring-2 focus:ring-orange-100 transition text-sm resize-none shadow-inner"
          />
        </div>

        {/* Reassurance Statement */}
        <div className="flex items-start gap-3 p-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl">
          <AppIcon name="verified_user" className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" filled />
          <p className="text-xs text-slate-600 leading-relaxed">
            Your information is protected by our{' '}
            <strong className="text-[#243445]">100% strict Non-Disclosure Agreement (NDA)</strong> and
            banking-grade 256-bit SSL encryption. No student data or university portal records are
            ever shared with third parties.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-[#FF641A] hover:bg-[#E8540E] text-white font-bold text-sm py-4 rounded-full shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? (
              <span>Dispatching Inquiry...</span>
            ) : (
              <>
                <span>Submit Inquiry</span>
                <AppIcon name="arrow_forward" className="w-[18px] h-[18px]" />
              </>
            )}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md shrink-0"
          >
            <AppIcon name="chat" className="w-[18px] h-[18px]" />
            <span>Send via WhatsApp</span>
          </a>
        </div>
      </form>
    </div>
  );
}
