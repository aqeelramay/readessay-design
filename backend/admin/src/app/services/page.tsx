import type { Metadata } from "next";
import { ServicesView } from "@/components/services/ServicesView";

export const metadata: Metadata = {
  title: "Services — ReadEssay Admin",
  description:
    "Manage top-level academic service categories and their sub-service hierarchies.",
};

export default function ServicesPage() {
  return <ServicesView />;
}
