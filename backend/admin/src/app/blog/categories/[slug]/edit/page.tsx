import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  INITIAL_BLOG_CATEGORIES,
  getBlogCategoryBySlug,
} from "@/data/mockBlog";
import { BlogCategoryForm } from "@/components/blog/BlogCategoryForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return INITIAL_BLOG_CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

function findCategory(slug: string) {
  if (typeof getBlogCategoryBySlug === "function") {
    const c = getBlogCategoryBySlug(slug);
    if (c) return c;
  }
  return INITIAL_BLOG_CATEGORIES.find((cat) => cat.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = findCategory(slug);
  return {
    title: `${
      category ? `Edit ${category.name}` : "Edit Category"
    } — ReadEssay Admin`,
    description:
      category?.shortDescription ?? "Edit blog topic category details.",
  };
}

export default async function EditBlogCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = findCategory(slug);

  if (!category) {
    return (
      <div className="bg-surface border border-border rounded-xl p-8 text-center max-w-lg mx-auto">
        <h1 className="text-xl font-bold text-text-primary">
          Category Not Found
        </h1>
        <p className="text-sm text-text-secondary mt-2">
          The requested blog category &ldquo;{slug}&rdquo; does not exist in the
          catalog.
        </p>
        <Link
          href="/blog/categories"
          className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-lg bg-orange text-white text-xs font-semibold hover:bg-orange-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Categories</span>
        </Link>
      </div>
    );
  }

  return <BlogCategoryForm category={category} />;
}

