import type { Metadata } from "next";
import { MainServiceForm } from "@/components/services/MainServiceForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    { slug: "assignment-help" },
    { slug: "essay-writing" },
    { slug: "dissertation-help" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Edit Service: ${slug} — ReadEssay Admin`,
    description: "Edit academic service category",
  };
}

export default async function EditServicePage({ params }: PageProps) {
  const { slug } = await params;
  return <MainServiceForm serviceIdOrSlug={slug} />;
}
