import type { Metadata } from "next";
import { ExpertForm } from "@/components/experts/ExpertForm";

export const metadata: Metadata = {
  title: "Add Top Expert — ReadEssay Admin",
  description: "Register a new Ph.D. or Master's subject specialist on ReadEssay.",
};

export default function NewExpertPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#243445] tracking-tight">Add Academic Expert</h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Register new verified subject specialists, degrees, and performance credentials.
        </p>
      </div>
      <ExpertForm />
    </div>
  );
}
