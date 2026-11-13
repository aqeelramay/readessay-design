import type { Metadata } from "next";
import { MainServiceForm } from "@/components/services/MainServiceForm";

export const metadata: Metadata = {
  title: "Add Service — ReadEssay Admin",
  description: "Create a new top-level academic service category",
};

export default function NewServicePage() {
  return <MainServiceForm />;
}

