import type { Metadata } from "next";
import { SampleSectionForm } from "@/components/samples/SampleSectionForm";

export const metadata: Metadata = {
  title: "Add Discipline Section — ReadEssay Admin",
  description:
    "Create a new academic discipline category to organize sample papers and exemplars.",
};

export default function NewSampleSectionPage() {
  return <SampleSectionForm />;
}

