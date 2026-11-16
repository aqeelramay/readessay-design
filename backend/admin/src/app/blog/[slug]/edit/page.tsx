import { Suspense } from "react";
import type { Metadata } from "next";
import { BlogPostForm } from "@/components/blog/BlogPostForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Edit Post (${slug}) — ReadEssay Admin`,
    description: `Edit blog article content and metadata for ${slug}.`,
  };
}

export default async function EditBlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-text-secondary">
          Loading article editor...
        </div>
      }
    >
      <BlogPostForm postSlug={slug} />
    </Suspense>
  );
}
