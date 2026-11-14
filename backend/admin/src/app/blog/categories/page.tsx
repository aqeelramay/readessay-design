import type { Metadata } from "next";
import { BlogCategoriesView } from "@/components/blog/BlogCategoriesView";

export const metadata: Metadata = {
  title: "Blog Categories — ReadEssay Admin",
  description:
    "Organize academic publications, research guides, and writing resources into curated category topics.",
};

export default function BlogCategoriesPage() {
  return <BlogCategoriesView />;
}

