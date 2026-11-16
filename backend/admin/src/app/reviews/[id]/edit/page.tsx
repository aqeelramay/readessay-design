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

export default async function EditReviewPage({ params }: PageProps) {
  const { id } = await params;
  return <ReviewForm reviewId={id} />;
}


