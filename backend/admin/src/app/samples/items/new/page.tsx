import { Suspense } from "react";
import type { Metadata } from "next";
import { SampleItemForm } from "@/components/samples/SampleItemForm";

export const metadata: Metadata = {
  title: "Add Academic Sample — ReadEssay Admin",
  description:
    "Upload a verified academic exemplar and configure discipline metadata.",
};

export default function NewSampleItemPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-text-secondary text-xs">
          Loading sample form...
        </div>
      }
    >
      <SampleItemForm />
    </Suspense>
  );
}

