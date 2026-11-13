import type { Metadata } from "next";
import { ReviewsView } from "@/components/reviews/ReviewsView";

export const metadata: Metadata = {
  title: "Reviews — ReadEssay Admin",
  description:
    "Manage individual client reviews, star ratings, and verified student feedback.",
};

export default function ReviewsPage() {
  return <ReviewsView />;
}
