import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  fetchPublicBlogPostBySlug,
  fetchPublicBlogPosts,
} from '@/lib/data-fetchers';
import StickyArticleToc from '@/components/blog/StickyArticleToc';
import FaqAccordion from '@/components/shared/FaqAccordion';
import AppIcon from '@/components/shared/AppIcon';
import JsonLd from '@/components/seo/JsonLd';
import {
  buildBreadcrumbSchema,
  buildArticleSchema,
  buildFaqPageSchema,
} from '@/lib/schema';

interface BlogPostDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPublicBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | ReadEssay Blog',
      description: 'The requested academic guide could not be found.',
    };
  }

  const title =
    post.seo?.metaTitle || `${post.title} | ReadEssay Academic Masterclass`;
  const description =
    post.seo?.metaDescription ||
    post.excerpt ||
    'Read this comprehensive academic writing blueprint from verified ReadEssay faculty advisors.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: post.featuredImage?.url ? [post.featuredImage.url] : undefined,
    },
  };
}

export default async function BlogPostDetailPage({
  params,
}: BlogPostDetailPageProps) {
  const { slug } = await params;
  const post = await fetchPublicBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Pre-process content HTML to inject matching IDs for Table of Contents
  let h2Index = 0;
  const processedContentHtml = post.contentHtml
    ? post.contentHtml.replace(
        /<h2([^>]*)>(.*?)<\/h2>/gi,
        (match, attrs, innerText) => {
          h2Index++;
          if (attrs.includes('id=')) {
            return `<h2${attrs}>${innerText}</h2>`;
          }
          return `<h2 id="toc-section-${h2Index}"${attrs}>${innerText}</h2>`;
        },
      )
    : '';

  // Get related posts (either from API payload or fetch other posts)
  let relatedPosts = post.relatedPosts || [];
  if (relatedPosts.length === 0) {
    const allPostsRes = await fetchPublicBlogPosts({ limit: 4 });
    relatedPosts = allPostsRes.posts
      .filter((p) => p.slug !== slug)
      .slice(0, 3)
      .map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt || undefined,
        readTime: p.readTime || undefined,
        publishedAt: p.publishedAt || undefined,
        featuredImage: p.featuredImage || undefined,
      }));
  }

  const categoryName = post.category?.name || 'Academic Writing';
  const categorySlug = post.category?.slug || 'academic-writing-essays';

  return (
    <main className="w-full pt-28 bg-[#F8FAFC]">
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: categoryName, url: `/blog/category/${categorySlug}` },
            { name: post.title, url: `/blog/${post.slug}` },
          ]),
          buildArticleSchema(post),
          buildFaqPageSchema(post.faqSection?.items),
        ]}
      />
      <div className="flex flex-col w-full">
        {/* BREADCRUMB NAVIGATION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 w-full">
          <nav aria-label="Breadcrumb" className="w-full py-4 text-xs text-slate-500">
            <ol className="flex flex-wrap items-center space-x-2">
              <li>
                <Link href="/" className="hover:text-[#FF641A] transition">
                  Home
                </Link>
              </li>
              <li>
                <span>/</span>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#FF641A] transition">
                  Blog
                </Link>
              </li>
              <li>
                <span>/</span>
              </li>
              <li>
                <Link
                  href={`/blog/category/${categorySlug}`}
                  className="hover:text-[#FF641A] transition"
                >
                  {categoryName}
                </Link>
              </li>
              <li>
                <span>/</span>
              </li>
              <li className="text-slate-800 font-semibold truncate max-w-xs sm:max-w-md">
                {post.title}
              </li>
            </ol>
          </nav>
        </section>

        {/* ARTICLE HEADER SECTION */}
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
          <div className="max-w-4xl space-y-6">
            {/* Meta Badges Bar */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <Link
                href={`/blog/category/${categorySlug}`}
                className="bg-orange-100 text-[#FF641A] font-bold px-3 py-1 rounded-full uppercase tracking-wider hover:bg-orange-200 transition"
              >
                {categoryName}
              </Link>
              <span className="text-slate-500 flex items-center gap-1 font-medium">
                <svg
                  className="w-3.5 h-3.5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                {post.readTime || '8 min read'}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">
                Published: {post.publishedAt || 'Recent'}
              </span>
            </div>

            {/* Main SEO H1 */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-[#243445] leading-[1.2] tracking-tight">
              {post.title}
            </h1>

            {/* Author Byline & Social Bar */}
            {post.author && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-y border-slate-200 gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-11 h-11 rounded-full bg-orange-100 text-[#FF641A] font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
                    {post.author.name ? post.author.name.charAt(0) : 'R'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-poppins font-bold text-[#243445] text-sm">
                        {post.author.name}
                      </span>
                      {post.author.credentials && (
                        <span className="text-[11px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded">
                          {post.author.credentials}
                        </span>
                      )}
                    </div>
                    {post.author.roleSubtitle && (
                      <p className="text-xs text-slate-500 mt-0.5">
                        {post.author.roleSubtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Featured Image with Figure Caption */}
            {post.featuredImage?.url && (
              <figure className="mt-6">
                <div className="overflow-hidden rounded-3xl shadow-lg border border-slate-200/80 aspect-[16/9] relative bg-slate-100">
                  <Image
                    src={post.featuredImage.url}
                    alt={post.featuredImage.altText || post.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 896px"
                    className="object-cover"
                    unoptimized={post.featuredImage.url.startsWith('http://localhost:4000')}
                  />
                </div>
                {post.featuredImage.caption && (
                  <figcaption className="text-xs text-center text-slate-500 mt-3 font-normal italic">
                    {post.featuredImage.caption}
                  </figcaption>
                )}
              </figure>
            )}
          </div>
        </header>

        {/* MAIN ARTICLE TWO-COLUMN BODY */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Sticky Table of Contents & Concierge Box */}
            <StickyArticleToc
              tocHeadings={post.tocHeadings}
              hasAuthor={Boolean(post.author)}
              hasFaq={Boolean(post.faqSection?.items && post.faqSection.items.length > 0)}
            />

            {/* Right Column: Main Article Editorial Content */}
            <div className="lg:col-span-8 space-y-10">
              {/* Processed HTML Body with custom styling */}
              <div
                className="custom-prose text-slate-700 leading-relaxed text-sm sm:text-base space-y-4
                  [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-bold [&_h2]:font-poppins [&_h2]:text-[#243445] [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-slate-200 [&_h2]:scroll-mt-32
                  [&_h3]:text-lg [&_h3]:sm:text-xl [&_h3]:font-bold [&_h3]:font-poppins [&_h3]:text-[#243445] [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:scroll-mt-32
                  [&_p]:text-slate-600 [&_p]:leading-relaxed [&_p]:mb-4
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-6 [&_ul]:text-slate-600
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mb-6 [&_ol]:text-slate-600
                  [&_li]:leading-relaxed
                  [&_strong]:text-[#243445] [&_strong]:font-semibold
                  [&_blockquote]:border-l-4 [&_blockquote]:border-[#FF641A] [&_blockquote]:bg-orange-50/70 [&_blockquote]:p-4 [&_blockquote]:rounded-r-xl [&_blockquote]:my-6 [&_blockquote]:text-sm [&_blockquote]:text-[#243445] [&_blockquote]:not-italic
                  [&_table]:w-full [&_table]:border-collapse [&_table]:text-xs [&_table]:sm:text-sm [&_table]:my-4 [&_table]:border [&_table]:border-slate-200
                  [&_th]:bg-[#FF641A] [&_th]:text-white [&_th]:font-bold [&_th]:p-3 [&_th]:text-left
                  [&_td]:p-3 [&_td]:border-b [&_td]:border-slate-200 [&_td]:text-slate-700
                  [&_tr:hover]:bg-orange-50/30
                  [&_a]:text-[#FF641A] [&_a]:underline [&_a]:font-medium [&_a:hover]:text-[#E8540E]"
                dangerouslySetInnerHTML={{ __html: processedContentHtml }}
              />

              {/* Lead Faculty Author Biography Card */}
              {post.author && (
                <section
                  id="toc-section-author"
                  className="mt-12 p-6 sm:p-8 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-5 scroll-mt-32"
                >
                  <div className="w-16 h-16 rounded-full bg-orange-100 text-[#FF641A] font-bold text-xl flex items-center justify-center shrink-0 shadow-xs">
                    {post.author.name ? post.author.name.charAt(0) : 'R'}
                  </div>

                  <div className="space-y-2 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <h3 className="text-lg font-poppins font-bold text-[#243445] m-0">
                        About the Author: {post.author.name}
                        {post.author.credentials && `, ${post.author.credentials}`}
                      </h3>
                      <span className="bg-orange-100 text-[#FF641A] text-[11px] font-bold px-2 py-0.5 rounded">
                        Verified Faculty Advisor
                      </span>
                    </div>

                    {post.author.experienceLine && (
                      <p className="text-xs text-slate-500 font-medium">
                        {post.author.experienceLine}
                      </p>
                    )}

                    {post.author.bio && (
                      <p className="text-sm text-slate-600 leading-relaxed pt-1">
                        {post.author.bio}
                      </p>
                    )}

                    <div className="pt-2">
                      <a
                        href="https://wa.me/923138400066"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-[#FF641A] hover:underline inline-flex items-center gap-1"
                      >
                        <span>Schedule a 1-on-1 Consultation with Faculty</span>
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                </section>
              )}

              {/* Article FAQ Section */}
              {post.faqSection?.items && post.faqSection.items.length > 0 && (
                <section id="toc-section-faq" className="mt-12 space-y-4 scroll-mt-32">
                  <div className="border-b border-slate-200 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FF641A]">
                      {post.faqSection.tagline || 'Article Inquiries'}
                    </span>
                    <h2 className="text-2xl font-poppins font-bold text-[#243445] mt-1 mb-0">
                      {post.faqSection.heading || 'Frequently Asked Questions'}
                    </h2>
                  </div>

                  <FaqAccordion items={post.faqSection.items} />
                </section>
              )}

              {/* Social Share Bar Bottom */}
              <div className="mt-10 p-5 rounded-2xl bg-orange-50/60 border border-orange-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-bold text-[#FF641A] uppercase tracking-wide">
                  Share this guide with fellow researchers:
                </span>
                <div className="flex items-center gap-3">
                  {/* WhatsApp */}
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `${post.title} - ReadEssay Blog`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on WhatsApp"
                    className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-[#059669] transition-all transform hover:-translate-y-0.5 text-xs font-bold"
                  >
                    WA
                  </a>
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/sharing/share-offsite/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                    className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-[#0077b5] transition-all transform hover:-translate-y-0.5 text-xs font-bold"
                  >
                    IN
                  </a>
                  {/* X / Twitter */}
                  <a
                    href="https://x.com/readessay"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on X"
                    className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-black transition-all transform hover:-translate-y-0.5 text-xs font-bold"
                  >
                    X
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RELATED ARTICLES SECTION */}
        {relatedPosts.length > 0 && (
          <section className="bg-white border-y border-slate-200 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  <span className="text-xs font-bold text-[#FF641A] uppercase tracking-wider block mb-1">
                    Recommended Readings
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-[#243445] tracking-tight">
                    Related Academic Masterclasses &amp; Writing Blueprints
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#FF641A] hover:underline transition"
                >
                  <span>View All Academic Guides</span>
                  <span>→</span>
                </Link>
              </div>

              {/* 3-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((rel) => {
                  const imgUrl =
                    rel.featuredImage?.url ||
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuDza27cP_ZfAYr61LR2q1Q3Aih-gWj1WzsOs8KLCNfPYCzxHTYb875FVsp_o7fRN28Y5Sm7UNCfGIhxOBRcflTLWEfqRmiot6vyEeckG5All28OIojV0HyE6uWWThyAZ56qOvyZenobHmoRcqtV0eCOYp42nzrpFIMOIz4if5AWqE-ClYTRHETZj7JjIOnN8zK6n-AR04qMsuqgCzAqyYhAnzAbhxchZcHSkGs-F_4k';

                  return (
                    <article
                      key={rel.id}
                      className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
                    >
                      <div>
                        <Link
                          href={`/blog/${rel.slug}`}
                          className="relative block h-48 overflow-hidden bg-slate-100"
                        >
                          <Image
                            src={imgUrl}
                            alt={rel.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized={imgUrl.startsWith('http://localhost:4000')}
                          />
                        </Link>

                        <div className="p-6 space-y-3">
                          <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-medium">
                            <span>{rel.publishedAt || 'Recent'}</span>
                            <span>•</span>
                            <span>{rel.readTime || '6 min read'}</span>
                          </div>

                          <h3 className="text-base font-bold text-[#243445] group-hover:text-[#FF641A] transition font-poppins leading-snug">
                            <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                          </h3>

                          {rel.excerpt && (
                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                              {rel.excerpt}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-500">ReadEssay Faculty</span>
                        <Link
                          href={`/blog/${rel.slug}`}
                          className="text-[#FF641A] font-bold hover:underline inline-flex items-center gap-1"
                        >
                          <span>Read Article</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* CONVERSION FINAL SECTION & DIRECT HOTLINES */}
        <section className="w-full bg-[#F8FAFC] py-16 lg:py-24 border-t border-slate-200">
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
