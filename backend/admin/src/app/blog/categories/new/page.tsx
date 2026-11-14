import type { Metadata } from "next";
import { BlogCategoryForm } from "@/components/blog/BlogCategoryForm";

export const metadata: Metadata = {
  title: "Add Blog Category — ReadEssay Admin",
  description: "Create a new academic topic category for the ReadEssay Blog.",
};

export default function NewBlogCategoryPage() {
  return <BlogCategoryForm />;
}

