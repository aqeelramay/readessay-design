import type { Metadata } from "next";
import { SubServiceForm } from "@/components/services/SubServiceForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    { slug: "accounting" },
    { slug: "nursing" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Edit Sub-Service: ${slug} — ReadEssay Admin`,
    description: "Edit academic writing sub-service",
  };
}

export default async function EditSubServicePage({ params }: PageProps) {
  const { slug } = await params;
  return <SubServiceForm subServiceIdOrSlug={slug} />;
}
