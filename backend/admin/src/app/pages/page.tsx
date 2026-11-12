import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/dashboard/ModulePlaceholder";

export const metadata: Metadata = {
  title: "Pages — ReadEssay Admin",
  description:
    "Static site page builder, policy documents, terms of service & SEO metadata.",
};

export default function PagesPage() {
  return <ModulePlaceholder moduleId="pages" />;
}

