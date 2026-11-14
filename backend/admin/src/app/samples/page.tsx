import type { Metadata } from "next";
import { SampleSectionsView } from "@/components/samples/SampleSectionsView";

export const metadata: Metadata = {
  title: "Sample Sections — ReadEssay Admin",
  description:
    "Manage academic discipline sections, document exemplars, and research archives.",
};

export default function SamplesSectionsPage() {
  return <SampleSectionsView />;
}
