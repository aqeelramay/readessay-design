'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PublicBlogPost, PublicBlogCategory } from '@/lib/public-api';
import AppIcon from '@/components/shared/AppIcon';

interface BlogDirectoryClientProps {
  initialPosts: PublicBlogPost[];
  categories: PublicBlogCategory[];
  defaultCategorySlug?: string;
  showFilters?: boolean;
}

export default function BlogDirectoryClient({
  initialPosts,
  categories,
  defaultCategorySlug = 'all',
  showFilters = true,
}: BlogDirectoryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategorySlug);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      // Category match
      const categoryMatch =
        selectedCategory === 'all' ||
        post.category?.slug === selectedCategory ||
        post.categoryId === selectedCategory;

      // Search match
      const q = searchQuery.trim().toLowerCase();
      const searchMatch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(q)) ||
        (post.author?.name && post.author.name.toLowerCase().includes(q)) ||
        (post.category?.name && post.category.name.toLowerCase().includes(q));

      return categoryMatch && searchMatch;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  return (
    <div className="space-y-10">
      {showFilters && (
        <div className="space-y-6">
          {/* Search bar & Category filter header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search academic guides, topics, authors..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF641A] focus:border-transparent transition shadow-xs"
              />
              <AppIcon
                name="search"
                className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Results count */}
            <div className="text-xs text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-800">{filteredPosts.length}</span>{' '}
              {filteredPosts.length === 1 ? 'article' : 'articles'}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#FF641A] text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-[#243445]'
              }`}
            >
              All Topics ({initialPosts.length})
            </button>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.slug;
              const catCount = initialPosts.filter(
                (p) => p.category?.slug === cat.slug || p.categoryId === cat.id,
              ).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#FF641A] text-white shadow-md'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-[#243445]'
                  }`}
                >
                  <span>{cat.name}</span>
                  {catCount > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {catCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3-Column Articles Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => {
            const imgUrl =
              post.featuredImage?.url ||
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDza27cP_ZfAYr61LR2q1Q3Aih-gWj1WzsOs8KLCNfPYCzxHTYb875FVsp_o7fRN28Y5Sm7UNCfGIhxOBRcflTLWEfqRmiot6vyEeckG5All28OIojV0HyE6uWWThyAZ56qOvyZenobHmoRcqtV0eCOYp42nzrpFIMOIz4if5AWqE-ClYTRHETZj7JjIOnN8zK6n-AR04qMsuqgCzAqyYhAnzAbhxchZcHSkGs-F_4k';
            const categoryName = post.category?.name || 'Academic Writing';
            const authorName = post.author?.name || 'Faculty Editorial Board';

            return (
              <article
                key={post.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Article Thumbnail */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative block h-52 overflow-hidden bg-slate-100"
                  >
                    <Image
                      src={imgUrl}
                      alt={post.featuredImage?.altText || post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized={imgUrl.startsWith('http://localhost:4000')}
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-white/95 backdrop-blur-xs text-[#FF641A] font-bold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                        {categoryName}
                      </span>
                    </div>
                  </Link>

                  {/* Article Body */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-medium">
                      <span>{post.publishedAt || 'Recent'}</span>
                      <span>•</span>
                      <span>{post.readTime || '5 min read'}</span>
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

                {/* Article Footer */}
                <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">{authorName}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[#FF641A] font-bold hover:underline inline-flex items-center gap-1 group/btn"
                  >
                    <span>Read Article</span>
                    <span className="transition-transform group-hover/btn:translate-x-0.5">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-[#FF641A] flex items-center justify-center mx-auto text-2xl font-bold">
            🔍
          </div>
          <h3 className="text-xl font-bold text-[#243445] font-poppins">
            No matching articles found
          </h3>
          <p className="text-sm text-slate-600">
            We couldn&apos;t find any guides matching your criteria. Try adjusting your search term
            or switching topic filters.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-full bg-[#FF641A] text-white text-xs font-bold hover:bg-[#E8540E] transition shadow-md"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
