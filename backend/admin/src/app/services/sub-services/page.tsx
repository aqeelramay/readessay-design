import { Suspense } from "react";
import type { Metadata } from "next";
import { SubServicesView } from "@/components/services/SubServicesView";

export const metadata: Metadata = {
  title: "Sub-Services — ReadEssay Admin",
  description:
    "Manage specialized academic writing sub-services and parent category assignments.",
};

function SubServicesFallback() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-slate-200 rounded-lg w-1/4" />
      <div className="h-14 bg-slate-200 rounded-xl" />
      <div className="h-64 bg-slate-200 rounded-xl" />
    </div>
  );
}

export default function SubServicesPage() {
  return (
    <Suspense fallback={<SubServicesFallback />}>
      <SubServicesView />
    </Suspense>
  );
}

