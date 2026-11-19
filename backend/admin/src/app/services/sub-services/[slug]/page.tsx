import { Suspense } from "react";
import type { Metadata } from "next";
import { RefreshCw } from "lucide-react";
import { SubServiceDetailView } from "@/components/services/SubServiceDetailView";

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
    title: `Sub-Service: ${slug} — ReadEssay Admin`,
    description: `Sub-service details for ${slug}`,
  };
}

export default function SubServiceDetailPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="bg-surface border border-border rounded-xl p-12 text-center max-w-lg mx-auto">
          <RefreshCw className="w-6 h-6 text-orange animate-spin mx-auto mb-3" />
          <h2 className="text-base font-bold text-text-primary">Loading Sub-Service...</h2>
          <p className="text-xs text-text-secondary mt-1">Connecting to NestJS API...</p>
        </div>
      }
    >
      <SubServiceDetailView params={params} />
    </Suspense>
  );
}
