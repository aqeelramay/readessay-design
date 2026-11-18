import type { Metadata } from "next";
import { CalculatorManagerView } from "@/components/calculator/CalculatorManagerView";

export const metadata: Metadata = {
  title: "Order Pricing & Calculator — ReadEssay Admin",
  description:
    "Manage academic per-page rate matrix, deadline rules, words-per-page, and live order pricing calculator flow.",
};

export default function CalculatorPage() {
  return <CalculatorManagerView />;
}
