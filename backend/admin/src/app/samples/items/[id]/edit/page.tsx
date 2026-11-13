import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  INITIAL_ACADEMIC_SAMPLES,
  getSampleById,
} from "@/data/mockSamples";
import { SampleItemForm } from "@/components/samples/SampleItemForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return INITIAL_ACADEMIC_SAMPLES.map((sample) => ({ id: sample.id }));
}

function findSample(id: string) {
  if (typeof getSampleById === "function") {
    const s = getSampleById(id);
    if (s) return s;
  }
  return INITIAL_ACADEMIC_SAMPLES.find((s) => s.id === id);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const sample = findSample(id);
  return {
    title: `${
      sample ? `Edit ${sample.title}` : "Edit Sample"
    } — ReadEssay Admin`,
    description: "Update academic sample document metadata and attachments.",
  };
}

export default async function EditSampleItemPage({ params }: PageProps) {
  const { id } = await params;
  const sample = findSample(id);

  if (!sample) {
    return (
      <div className="bg-surface border border-border rounded-xl p-8 text-center max-w-lg mx-auto">
        <h1 className="text-xl font-bold text-text-primary">
          Academic Sample Not Found
        </h1>
        <p className="text-sm text-text-secondary mt-2">
          The requested sample record &ldquo;{id}&rdquo; does not exist in the catalog.
        </p>
        <Link
          href="/samples/items"
          className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-lg bg-orange text-white text-xs font-semibold hover:bg-orange-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Samples</span>
        </Link>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-text-secondary text-xs">
          Loading sample form...
        </div>
      }
    >
      <SampleItemForm sample={sample} />
    </Suspense>
  );
}

