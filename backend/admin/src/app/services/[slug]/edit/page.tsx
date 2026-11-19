import { Suspense } from "react";
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

async function EditServiceContent({ params }: PageProps) {
  const { slug } = await params;
  return <MainServiceForm serviceIdOrSlug={slug} />;
}

export default function EditServicePage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-text-secondary text-xs">
          Loading service editor...
        </div>
      }
    >
      <EditServiceContent params={params} />
    </Suspense>
  );
}
