import type { Metadata } from "next";
import { WelcomePanel } from "@/components/dashboard/WelcomePanel";
import { ModuleGrid } from "@/components/dashboard/ModuleGrid";

export const metadata: Metadata = {
  title: "Dashboard — ReadEssay Admin",
  description:
    "Central administrative hub, operational overview, and workspace launchpad.",
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <WelcomePanel />
      <ModuleGrid />
    </div>
  );
}
