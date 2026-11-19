import { Suspense } from "react";
import type { Metadata } from "next";
import { ReviewForm } from "@/components/reviews/ReviewForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Edit Review — ReadEssay Admin`,
    description: `Edit client review #${id}`,
  };
}

async function EditReviewContent({ params }: PageProps) {
  const { id } = await params;
  return <ReviewForm reviewId={id} />;
}

export default function EditReviewPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-text-secondary text-xs">
          Loading review editor...
        </div>
      }
    >
      <EditReviewContent params={params} />
    </Suspense>
  );
}


