import { Suspense } from "react";
import type { Metadata } from "next";
import { BlogPostForm } from "@/components/blog/BlogPostForm";

export const metadata: Metadata = {
  title: "Add Blog Post — ReadEssay Admin",
  description:
    "Author and publish a new academic guide, research paper, or editorial article.",
};

export default function NewBlogPostPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-text-secondary">
          Loading article editor...
        </div>
      }
    >
      <BlogPostForm />
    </Suspense>
  );
}

