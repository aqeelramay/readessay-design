import { Suspense } from "react";
import type { Metadata } from "next";
import { SampleItemForm } from "@/components/samples/SampleItemForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Edit Academic Sample — ReadEssay Admin`,
    description: `Update academic sample document #${id} metadata and attachments.`,
  };
}

export default async function EditSampleItemPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-text-secondary text-xs">
          Loading sample form...
        </div>
      }
    >
      <SampleItemForm sampleId={id} />
    </Suspense>
  );
}
