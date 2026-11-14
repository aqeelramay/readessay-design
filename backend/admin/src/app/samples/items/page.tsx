import type { Metadata } from "next";
import { AllSamplesView } from "@/components/samples/AllSamplesView";

export const metadata: Metadata = {
  title: "All Academic Samples — ReadEssay Admin",
  description:
    "Comprehensive repository of academic exemplar documents, files, and citation data.",
};

export default function AllSamplesPage() {
  return <AllSamplesView />;
}

