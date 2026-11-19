import { Suspense } from "react";
import type { Metadata } from "next";
import { SampleSectionForm } from "@/components/samples/SampleSectionForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Edit Discipline Section — ReadEssay Admin`,
    description: `Edit discipline section #${id}`,
  };
}

async function EditSampleSectionContent({ params }: PageProps) {
  const { id } = await params;
  return <SampleSectionForm sectionId={id} />;
}

export default function EditSampleSectionPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-text-secondary text-xs">
          Loading section editor...
        </div>
      }
    >
      <EditSampleSectionContent params={params} />
    </Suspense>
  );
}
