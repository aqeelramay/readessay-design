import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { INITIAL_BLOG_POSTS, getBlogPostBySlug } from "@/data/mockBlog";
import { BlogPostForm } from "@/components/blog/BlogPostForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return INITIAL_BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

function findPost(slug: string) {
  if (typeof getBlogPostBySlug === "function") {
    const p = getBlogPostBySlug(slug);
    if (p) return p;
  }
  return INITIAL_BLOG_POSTS.find((post) => post.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  return {
    title: `${post ? `Edit ${post.title}` : "Edit Post"} — ReadEssay Admin`,
    description: post?.excerpt ?? "Edit blog article content and metadata.",
  };
}

export default async function EditBlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = findPost(slug);

  if (!post) {
    return (
      <div className="bg-surface border border-border rounded-xl p-8 text-center max-w-lg mx-auto">
        <h1 className="text-xl font-bold text-text-primary">
          Article Not Found
        </h1>
        <p className="text-sm text-text-secondary mt-2">
          The requested blog article &ldquo;{slug}&rdquo; does not exist in the
          catalog.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-lg bg-orange text-white text-xs font-semibold hover:bg-orange-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog Posts</span>
        </Link>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-text-secondary">
          Loading article editor...
        </div>
      }
    >
      <BlogPostForm post={post} />
    </Suspense>
  );
}

