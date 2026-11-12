import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/dashboard/ModulePlaceholder";

export const metadata: Metadata = {
  title: "Samples — ReadEssay Studio",
  description:
    "Academic sample repository, plagiarism-checked exemplars & citations archive.",
};

export default function SamplesPage() {
  return <ModulePlaceholder moduleId="samples" />;
}

