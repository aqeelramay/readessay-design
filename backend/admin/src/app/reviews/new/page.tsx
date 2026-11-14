import type { Metadata } from "next";
import { ReviewForm } from "@/components/reviews/ReviewForm";

export const metadata: Metadata = {
  title: "Add Review — ReadEssay Admin",
  description:
    "Add an individual client review, star rating, and verified student feedback.",
};

export default function NewReviewPage() {
  return <ReviewForm />;
}
