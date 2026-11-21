import { Suspense } from "react";
import type { Metadata } from "next";
import { ExpertForm } from "@/components/experts/ExpertForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Edit Expert — ReadEssay Admin`,
    description: `Edit academic expert #${id}`,
  };
}

async function EditExpertContent({ params }: PageProps) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#243445] tracking-tight">Edit Academic Expert</h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Update verified specialist profile, credentials, and spotlight settings.
        </p>
      </div>
      <ExpertForm expertId={id} isEdit />
    </div>
  );
}

export default function EditExpertPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-500 text-xs">
          Loading expert editor...
        </div>
      }
    >
      <EditExpertContent params={params} />
    </Suspense>
  );
}
