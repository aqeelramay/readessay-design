import type { Metadata } from "next";
import { Suspense } from "react";
import { INITIAL_MAIN_SERVICES } from "@/data/mockServices";
import { NewSubServiceContent } from "./NewSubServiceContent";

export const metadata: Metadata = {
  title: "Add Sub-Service — ReadEssay Admin",
  description: "Create a new academic writing sub-service",
};

export default function NewSubServicePage() {
  return (
    <Suspense
      fallback={
        <div className="h-64 flex items-center justify-center text-text-muted text-sm">
          Loading sub-service editor...
        </div>
      }
    >
      <NewSubServiceContent mainServices={INITIAL_MAIN_SERVICES} />
    </Suspense>
  );
}

