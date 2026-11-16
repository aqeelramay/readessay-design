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

export default async function EditSampleSectionPage({ params }: PageProps) {
  const { id } = await params;
  return <SampleSectionForm sectionId={id} />;
}
