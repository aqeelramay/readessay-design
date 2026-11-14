import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  INITIAL_REVIEWS,
  getReviewById,
} from "@/data/mockReviews";
import { ReviewForm } from "@/components/reviews/ReviewForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return INITIAL_REVIEWS.map((r) => ({ id: r.id }));
}

function findReview(id: string) {
  if (typeof getReviewById === "function") {
    const r = getReviewById(id);
    if (r) return r;
  }
  return INITIAL_REVIEWS.find((item) => item.id === id);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const review = findReview(id);
  return {
    title: `${
      review ? `Edit Review: ${review.studentName}` : "Edit Review"
    } — ReadEssay Admin`,
    description:
      review?.quoteHeadline ?? "Edit individual client review and star rating",
  };
}

export default async function EditReviewPage({ params }: PageProps) {
  const { id } = await params;
  const review = findReview(id);

  if (!review) {
    return (
      <div className="bg-surface border border-border rounded-xl p-8 text-center max-w-lg mx-auto my-12">
        <h1 className="text-xl font-bold text-text-primary">
          Review Not Found
        </h1>
        <p className="text-sm text-text-secondary mt-2">
          The requested client review &ldquo;{id}&rdquo; does not exist in
          the catalog.
        </p>
        <Link
          href="/reviews"
          className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-lg bg-orange text-white text-xs font-semibold hover:bg-orange-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Reviews</span>
        </Link>
      </div>
    );
  }

  return <ReviewForm review={review} />;
}

