import type { Metadata } from "next";
import { ExpertsView } from "@/components/experts/ExpertsView";

export const metadata: Metadata = {
  title: "Top Experts — ReadEssay Admin",
  description: "Manage Ph.D. and Master's academic specialists, ratings, and featured faculty presence.",
};

export default function ExpertsPage() {
  return <ExpertsView />;
}
