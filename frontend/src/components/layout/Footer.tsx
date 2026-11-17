import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, Building2, MessageCircle } from 'lucide-react';
import { PublicService } from '@/lib/public-api';

interface FooterProps {
  serviceTree: PublicService[];
}

export default function Footer({ serviceTree }: FooterProps) {
  // Top 5 services for footer core services list
  const footerServices = serviceTree.slice(0, 5);

  return (
    <>
      <footer className="w-full bg-[#243445] text-white border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-700/60">
            {/* Column 1 & 2: Brand, Info & Socials */}
            <div className="lg:col-span-2 space-y-4">
              <Link href="/" className="inline-block" aria-label="ReadEssay Home">
                <div className="relative w-44 h-14">
                  <Image
                    src="/images/readessay-logo.png"
                    alt="ReadEssay Logo"
                    fill
                    sizes="176px"
                    loading="lazy"
                    className="object-contain"
                  />
                </div>
              </Link>

              <div className="pt-2 space-y-2.5 text-slate-300 text-sm">
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-[#FF641A] shrink-0" />
                  <span>Operated by 786outsource Ltd</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#FF641A] shrink-0" />
                  <a
                    href="mailto:support@readessay.com"
                    className="hover:text-[#FF641A] transition-colors"
                  >
                    support@readessay.com
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#FF641A] shrink-0" />
                  <a
                    href="https://wa.me/447460674811"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FF641A] transition-colors"
                  >
                    UK WhatsApp: +44 7460 674811
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#FF641A] shrink-0" />
                  <a
                    href="https://wa.me/923138400066"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FF641A] transition-colors"
                  >
                    PK WhatsApp: +92 3138400066
                  </a>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-3">
                <span className="block text-xs uppercase tracking-wider text-slate-400 mb-3 font-semibold">
                  Connect with us
                </span>
                <div className="flex items-center gap-2.5">
                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/readessayofficial/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-9 h-9 rounded-full bg-[#1E293B] flex items-center justify-center text-slate-300 hover:bg-[#FF641A] hover:text-white transition-all transform hover:-translate-y-0.5"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/readessay_official/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-9 h-9 rounded-full bg-[#1E293B] flex items-center justify-center text-slate-300 hover:bg-[#FF641A] hover:text-white transition-all transform hover:-translate-y-0.5"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/company/readessay/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-9 h-9 rounded-full bg-[#1E293B] flex items-center justify-center text-slate-300 hover:bg-[#FF641A] hover:text-white transition-all transform hover:-translate-y-0.5"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>

                  {/* Pinterest */}
                  <a
                    href="https://www.pinterest.com/readessayofficial/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Pinterest"
                    className="w-9 h-9 rounded-full bg-[#1E293B] flex items-center justify-center text-slate-300 hover:bg-[#FF641A] hover:text-white transition-all transform hover:-translate-y-0.5"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                    </svg>
                  </a>

                  {/* X (Twitter) */}
                  <a
                    href="https://x.com/readessay"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (formerly Twitter)"
                    className="w-9 h-9 rounded-full bg-[#1E293B] flex items-center justify-center text-slate-300 hover:bg-[#FF641A] hover:text-white transition-all transform hover:-translate-y-0.5"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://www.youtube.com/@ReadEssayusa"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="w-9 h-9 rounded-full bg-[#1E293B] flex items-center justify-center text-slate-300 hover:bg-[#FF641A] hover:text-white transition-all transform hover:-translate-y-0.5"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 3: Core Services */}
            <div>
              <h3 className="font-heading font-bold text-base text-white mb-4">
                Core Services
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-300">
                {footerServices.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/${service.slug}`}
                      className="hover:text-[#FF641A] transition-colors"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1 font-semibold text-[#FF641A] hover:underline pt-1"
                  >
                    <span>All Services &rarr;</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Company */}
            <div>
              <h3 className="font-heading font-bold text-base text-white mb-4">
                Company
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li>
                  <Link href="/about-us" className="hover:text-[#FF641A] transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/reviews" className="hover:text-[#FF641A] transition-colors">
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link href="/samples" className="hover:text-[#FF641A] transition-colors">
                    Samples &amp; Exemplars
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-[#FF641A] transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#FF641A] transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5: Policy & Guarantees */}
            <div>
              <h3 className="font-heading font-bold text-base text-white mb-4">
                Policy &amp; Trust
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li>
                  <Link href="/privacy-policy" className="hover:text-[#FF641A] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-[#FF641A] transition-colors">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <span className="inline-block mt-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 text-emerald-400 text-xs font-semibold border border-emerald-800/40">
                    100% Confidential &amp; Verified
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>
              Copyright &copy; 2026 Readessay.com. All rights reserved | Readessay.com is owned and operated by 786outsource Ltd.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
                Privacy
              </Link>
              <Link href="/terms-of-service" className="hover:text-slate-300 transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-slate-300 transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/447460674811"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Expert"
          className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#059669] text-white font-bold text-sm shadow-[0_10px_25px_rgba(5,150,105,0.4)] hover:bg-emerald-700 transition-all transform hover:scale-105"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span>WhatsApp Expert</span>
        </a>
      </div>
    </>
  );
}
