import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  fetchPublicBlogCategoryBySlug,
  fetchPublicBlogCategories,
  fetchPublicBlogPosts,
} from '@/lib/data-fetchers';
import JsonLd from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/schema';
import AppIcon from '@/components/shared/AppIcon';

interface BlogCategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await fetchPublicBlogCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Category Not Found | ReadEssay Blog',
      description: 'The requested blog category could not be found.',
    };
  }

  const title =
    category.seo?.metaTitle || `${category.name} | ReadEssay Academic Blog`;
  const description =
    category.seo?.metaDescription ||
    category.shortDescription ||
    `Browse expert academic guides and writing strategies in ${category.name}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export default async function BlogCategoryPage({
  params,
}: BlogCategoryPageProps) {
  const { slug } = await params;

  const [category, allCategories, postsRes] = await Promise.all([
    fetchPublicBlogCategoryBySlug(slug),
    fetchPublicBlogCategories(),
    fetchPublicBlogPosts({ categorySlug: slug, limit: 50 }),
  ]);

  if (!category) {
    notFound();
  }

  const categoryPosts =
    category.posts && category.posts.length > 0
      ? category.posts
      : postsRes.posts.filter(
          (p) => p.category?.slug === slug || p.categoryId === category.id,
        );

  const otherCategories = allCategories.filter((c) => c.slug !== slug);

  return (
    <main className="w-full pt-28 bg-[#F8FAFC]">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: category.name, url: `/blog/category/${category.slug}` },
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
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex justify-center items-center text-xs text-slate-500 gap-2 flex-wrap"
            >
              <Link href="/" className="hover:text-[#FF641A] transition">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[#FF641A] transition">
                Blog
              </Link>
              <span>/</span>
              <span className="font-semibold text-slate-800">{category.name}</span>
            </nav>

            <div className="inline-flex items-center space-x-2 bg-orange-100 text-[#FF641A] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <span>✨</span>
              <span>{category.badgeLabel || 'Category Archive'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#243445] tracking-tight leading-tight font-poppins max-w-4xl mx-auto mb-6">
              {category.name}
            </h1>

            {category.shortDescription && (
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
                {category.shortDescription}
              </p>
            )}

            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="text-xs text-slate-500 font-medium">
                {categoryPosts.length} {categoryPosts.length === 1 ? 'Masterclass Guide' : 'Masterclass Guides'} in this topic
              </span>
            </div>
          </div>
        </section>

        {/* ARTICLES & SIDEBAR SECTION */}
        <section className="py-16 bg-[#F8FAFC] relative" id="blog-articles">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Main Articles Grid (Left) */}
              <div className="lg:col-span-8 space-y-8">
                {categoryPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {categoryPosts.map((post) => {
                      const imgUrl =
                        post.featuredImage?.url ||
                        'https://lh3.googleusercontent.com/aida-public/AB6AXuDza27cP_ZfAYr61LR2q1Q3Aih-gWj1WzsOs8KLCNfPYCzxHTYb875FVsp_o7fRN28Y5Sm7UNCfGIhxOBRcflTLWEfqRmiot6vyEeckG5All28OIojV0HyE6uWWThyAZ56qOvyZenobHmoRcqtV0eCOYp42nzrpFIMOIz4if5AWqE-ClYTRHETZj7JjIOnN8zK6n-AR04qMsuqgCzAqyYhAnzAbhxchZcHSkGs-F_4k';
                      const authorName = post.author?.name || 'Faculty Editorial Board';

                      return (
                        <article
                          key={post.id}
                          className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between group"
                        >
                          <div>
                            <Link
                              href={`/blog/${post.slug}`}
                              className="relative block h-52 overflow-hidden bg-slate-100"
                            >
                              <Image
                                src={imgUrl}
                                alt={post.featuredImage?.altText || post.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 38vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                unoptimized={imgUrl.startsWith('http://localhost:4000')}
                              />
                              <div className="absolute top-3 left-3 z-10">
                                <span className="bg-white/95 backdrop-blur-xs text-[#FF641A] font-bold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                                  {category.name}
                                </span>
                              </div>
                            </Link>

                            <div className="p-6 space-y-3">
                              <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-medium">
                                <span>{post.publishedAt || 'Recent'}</span>
                                <span>•</span>
                                <span>{post.readTime || '6 min read'}</span>
                              </div>

                              <h3 className="text-lg font-bold text-[#243445] group-hover:text-[#FF641A] transition font-poppins leading-snug">
                                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                              </h3>

                              {post.excerpt && (
                                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                                  {post.excerpt}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-700">{authorName}</span>
                            <Link
                              href={`/blog/${post.slug}`}
                              className="text-[#FF641A] font-bold hover:underline inline-flex items-center gap-1 group/btn"
                            >
                              <span>Read Article</span>
                              <span className="transition-transform group-hover/btn:translate-x-0.5">
                                →
                              </span>
                            </Link>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
                    <p className="text-sm text-slate-600">
                      No published guides currently in this category. Check back soon or explore
                      our other topics.
                    </p>
                    <Link
                      href="/blog"
                      className="inline-block px-6 py-2.5 rounded-full bg-[#FF641A] text-white text-xs font-bold hover:bg-[#E8540E] transition"
                    >
                      Browse All Articles
                    </Link>
                  </div>
                )}
              </div>

              {/* Sidebar (Right) */}
              <aside className="lg:col-span-4 space-y-6">
                <div className="sticky top-28 space-y-6">
                  {/* Other Topics Navigation Box */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                    <h3 className="font-poppins font-bold text-sm text-[#243445] uppercase tracking-wider">
                      Other Editorial Topics
                    </h3>
                    <div className="space-y-2">
                      {otherCategories.map((c) => (
                        <Link
                          key={c.id}
                          href={`/blog/category/${c.slug}`}
                          className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50/40 transition group"
                        >
                          <span className="text-xs font-bold text-slate-700 group-hover:text-[#FF641A] transition">
                            {c.name}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">
                            {c.postCount ?? ''} →
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Direct Academic Assistance Box */}
                  <div className="bg-[#243445] text-white rounded-2xl p-6 shadow-xl relative overflow-hidden space-y-4">
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#FF641A]/20 rounded-full blur-2xl pointer-events-none" />
                    <div className="relative z-10 space-y-3">
                      <span className="text-xs font-bold text-[#FF641A] uppercase tracking-wider block">
                        Need Custom Guidance?
                      </span>
                      <h4 className="font-poppins font-bold text-base text-white leading-snug">
                        Connect with an Oxbridge Subject Specialist
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Get personalized feedback, chapter proofreading, or end-to-end coursework
                        support under guaranteed privacy.
                      </p>
                      <a
                        href="https://wa.me/923138400066"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full py-2.5 px-4 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white text-xs font-bold text-center transition shadow-md"
                      >
                        Chat with Concierge Desk
                      </a>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
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
