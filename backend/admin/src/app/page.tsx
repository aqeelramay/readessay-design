import type { Metadata } from "next";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";

export const metadata: Metadata = {
  title: "Dashboard — ReadEssay Admin",
  description:
    "Central administrative hub, operational overview, and workspace launchpad.",
};

export default function DashboardPage() {
  return <DashboardOverview />;
}

