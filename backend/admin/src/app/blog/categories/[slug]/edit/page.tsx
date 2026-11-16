import { Suspense } from "react";
import type { Metadata } from "next";
import { BlogCategoryForm } from "@/components/blog/BlogCategoryForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Edit Category (${slug}) — ReadEssay Admin`,
    description: `Edit blog topic category details for ${slug}.`,
  };
}

export default async function EditBlogCategoryPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-text-secondary">
          Loading category editor...
        </div>
      }
    >
      <BlogCategoryForm categorySlug={slug} />
    </Suspense>
  );
}
