import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/dashboard/ModulePlaceholder";

export const metadata: Metadata = {
  title: "Top Experts — ReadEssay Admin",
  description:
    "Vetted academic writers, credentials verification & workload balancing.",
};

export default function TopExpertsPage() {
  return <ModulePlaceholder moduleId="top-experts" />;
}

