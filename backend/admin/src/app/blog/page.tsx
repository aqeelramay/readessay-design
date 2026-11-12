import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/dashboard/ModulePlaceholder";

export const metadata: Metadata = {
  title: "Blog — ReadEssay Studio",
  description:
    "Educational articles, admissions guides, research tips & SEO publications.",
};

export default function BlogPage() {
  return <ModulePlaceholder moduleId="blog" />;
}

