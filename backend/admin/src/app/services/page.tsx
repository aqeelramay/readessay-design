import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/dashboard/ModulePlaceholder";

export const metadata: Metadata = {
  title: "Services — ReadEssay Studio",
  description:
    "Manage essay writing packages, turnaround times, pricing tiers & academic tiers.",
};

export default function ServicesPage() {
  return <ModulePlaceholder moduleId="services" />;
}

