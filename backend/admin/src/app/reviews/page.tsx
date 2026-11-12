import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/dashboard/ModulePlaceholder";

export const metadata: Metadata = {
  title: "Reviews — ReadEssay Admin",
  description:
    "Student testimonials, verified ratings, feedback moderation & client sentiment.",
};

export default function ReviewsPage() {
  return <ModulePlaceholder moduleId="reviews" />;
}

