import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  fetchPublicBlogCategories,
  fetchPublicBlogPosts,
} from '@/lib/data-fetchers';
import BlogDirectoryClient from '@/components/blog/BlogDirectoryClient';
import AppIcon from '@/components/shared/AppIcon';
import JsonLd from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'ReadEssay Blog | Academic Insights & Student Resources',
  description:
    'Explore practical guides, expert advice, and proven strategies for academic writing, essay composition, dissertation research, referencing, and university coursework.',
  openGraph: {
    title: 'ReadEssay Blog | Academic Insights & Student Resources',
    description:
      'Expert advice and proven strategies for academic writing, essays, dissertations, and research methodology.',
    type: 'website',
  },
};

export default async function BlogIndexPage() {
  const [categories, postsResponse] = await Promise.all([
    fetchPublicBlogCategories(),
    fetchPublicBlogPosts({ limit: 50 }),
  ]);

  const posts = postsResponse.posts || [];
  const featuredPost = posts[0] || null;
  const regularPosts = posts.length > 1 ? posts.slice(1) : posts;

  return (
    <main className="w-full pt-28 bg-[#F8FAFC]">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
        ])}
      />
      <div className="flex flex-col w-full">
        {/* HERO SECTION */}
        <section
          className="relative bg-gradient-to-b from-white via-orange-50/20 to-[#F8FAFC] pt-12 pb-16 lg:py-20 border-b border-slate-200"
          data-purpose="blog-hero"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 flex justify-center items-center text-xs text-slate-500 gap-2">
              <Link href="/" className="hover:text-[#FF641A] transition">
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-slate-800">Blog</span>
            </nav>

            <div className="inline-flex items-center space-x-2 bg-orange-100 text-[#FF641A] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <span>✨</span>
              <span>READESSAY BLOG | ACADEMIC INSIGHTS & STUDENT RESOURCES</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#243445] tracking-tight leading-tight font-poppins max-w-4xl mx-auto mb-6">
              Expert Academic Insights to Help You Study Smarter and Succeed
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
              Explore practical guides, expert advice, and proven strategies for academic writing,
              essay composition, dissertation research, referencing, and university coursework. Get
              the knowledge and guidance you need to strengthen your academic skills and approach
              every assignment with confidence.
            </p>
          </div>
        </section>

        {/* FEATURED EDITOR'S PICK BANNER */}
        {featuredPost && (
          <section className="pt-12 pb-6 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
                  {/* Left Column: Image */}
                  <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[420px] overflow-hidden bg-slate-100 group">
                    <Image
                      src={
                        featuredPost.featuredImage?.url ||
                        'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ69LFSgBNZ2h1755hnc9BJm9FHy6LNw_PaKHfP_wc5tkz1yP34K1Lk1YBwJOfrvZ-2ECQV5PJi0tY4HxbXcVU20z2GhN6pCg-_LaEn8IZNxfUz-2IpGyTOH5P8TlEOlfqA6skHbT-kRl-dfou5sg8jMKI2dh0wCUA11CH2_kLtrq900VNrtteElaSf0dLpZyd7r7hoeqe8W_wjR1isaJ_1ZgQSyBiE3lhUC_pnE7n'
                      }
                      alt={featuredPost.featuredImage?.altText || featuredPost.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      unoptimized={featuredPost.featuredImage?.url?.startsWith('http://localhost:4000')}
                    />
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <span className="bg-[#FF641A] text-white font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                        Featured Masterclass
                      </span>
                      {featuredPost.category?.name && (
                        <span className="bg-white/95 backdrop-blur-xs text-[#243445] font-semibold text-xs px-3 py-1.5 rounded-full shadow-xs">
                          {featuredPost.category.name}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Content */}
                  <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-xs text-slate-400 font-medium">
                        <span>{featuredPost.publishedAt || 'October 24, 2024'}</span>
                        <span>•</span>
                        <span>{featuredPost.readTime || '8 min read'}</span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold text-[#243445] hover:text-[#FF641A] transition font-poppins leading-tight">
                        <Link href={`/blog/${featuredPost.slug}`}>
                          {featuredPost.title}
                        </Link>
                      </h2>

                      {featuredPost.excerpt && (
                        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-orange-100 text-[#FF641A] font-bold text-sm flex items-center justify-center">
                          {featuredPost.author?.name ? featuredPost.author.name.charAt(0) : 'R'}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#243445]">
                            {featuredPost.author?.name || 'Dr. David Moraine'}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {featuredPost.author?.credentials || 'PhD, Oxford Alum'}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white text-xs font-bold transition shadow-md"
                      >
                        <span>Read Blueprint</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ARTICLES DIRECTORY SECTION */}
        <section className="py-12 lg:py-16 bg-[#F8FAFC] relative" id="blog-articles">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlogDirectoryClient
              initialPosts={regularPosts}
              categories={categories}
              defaultCategorySlug="all"
            />
          </div>
        </section>

        {/* CONVERSION FINAL SECTION & DIRECT HOTLINES */}
        <section className="w-full bg-white py-16 lg:py-24 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="bg-[#243445] text-white rounded-3xl p-8 lg:p-14 relative overflow-hidden shadow-2xl">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#FF641A]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                <div className="lg:col-span-8">
                  <span className="text-xs uppercase tracking-wider text-[#FF641A] font-bold">
                    Get In Touch With Us
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-poppins text-white mt-2 leading-tight">
                    Excel your academic journey today with ReadEssay&apos;s online class service and
                    protected exam service.
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed max-w-2xl">
                    Don&apos;t let coursework weigh you down. We are your partners in your academic
                    journey. Ordering from ReadEssay.com is absolutely safe and secure. We do not
                    disclose any customer information.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8 pt-2">
                    <a
                      className="flex items-center gap-3 px-5 py-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors"
                      href="tel:+923138400066"
                    >
                      <AppIcon name="phone_iphone" className="w-[22px] h-[22px] text-[#FF641A]" />
                      <div>
                        <span className="text-[10px] block uppercase tracking-wider text-slate-400">
                          PK WhatsApp Hotline
                        </span>
                        <span className="text-sm font-bold">+92 3138400066</span>
                      </div>
                    </a>
                    <a
                      className="flex items-center gap-3 px-5 py-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors"
                      href="tel:+447460674811"
                    >
                      <AppIcon name="call" className="w-[22px] h-[22px] text-[#FF641A]" />
                      <div>
                        <span className="text-[10px] block uppercase tracking-wider text-slate-400">
                          UK Support Desk
                        </span>
                        <span className="text-sm font-bold">+44 7460 674811</span>
                      </div>
                    </a>
                    <a
                      className="flex items-center gap-3 px-5 py-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors"
                      href="mailto:support@readessay.com"
                    >
                      <AppIcon name="mail" className="w-[22px] h-[22px] text-[#FF641A]" />
                      <div>
                        <span className="text-[10px] block uppercase tracking-wider text-slate-400">
                          Official Email
                        </span>
                        <span className="text-sm font-bold">support@readessay.com</span>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end">
                  <a
                    className="px-8 py-5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white font-bold text-base shadow-xl transition-all transform hover:-translate-y-1 text-center w-full lg:w-auto"
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
    </main>
  );
}
