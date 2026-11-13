import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  INITIAL_SAMPLE_SECTIONS,
  getSampleSectionById,
} from "@/data/mockSamples";
import { SampleSectionForm } from "@/components/samples/SampleSectionForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return INITIAL_SAMPLE_SECTIONS.map((sec) => ({ id: sec.id }));
}

function findSection(id: string) {
  if (typeof getSampleSectionById === "function") {
    const s = getSampleSectionById(id);
    if (s) return s;
  }
  return INITIAL_SAMPLE_SECTIONS.find((sec) => sec.id === id);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const section = findSection(id);
  return {
    title: `${
      section ? `Edit ${section.heading}` : "Edit Section"
    } — ReadEssay Admin`,
    description:
      section?.shortSummary ?? "Edit discipline section details and samples.",
  };
}

export default async function EditSampleSectionPage({ params }: PageProps) {
  const { id } = await params;
  const section = findSection(id);

  if (!section) {
    return (
      <div className="bg-surface border border-border rounded-xl p-8 text-center max-w-lg mx-auto">
        <h1 className="text-xl font-bold text-text-primary">
          Discipline Section Not Found
        </h1>
        <p className="text-sm text-text-secondary mt-2">
          The requested discipline section &ldquo;{id}&rdquo; does not exist in the
          catalog.
        </p>
        <Link
          href="/samples"
          className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-lg bg-orange text-white text-xs font-semibold hover:bg-orange-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sections</span>
        </Link>
      </div>
    );
  }

  return <SampleSectionForm section={section} />;
}

