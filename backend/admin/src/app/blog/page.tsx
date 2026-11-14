import { Suspense } from "react";
import type { Metadata } from "next";
import { BlogPostsView } from "@/components/blog/BlogPostsView";

export const metadata: Metadata = {
  title: "Blog Posts — ReadEssay Admin",
  description:
    "Manage academic guides, editorial articles, table-of-contents sections, and SEO metadata.",
};

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-text-secondary">
          Loading blog articles...
        </div>
      }
    >
      <BlogPostsView />
    </Suspense>
  );
}
