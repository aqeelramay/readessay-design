import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/dashboard/ModulePlaceholder";

export const metadata: Metadata = {
  title: "Orders — ReadEssay Studio",
  description:
    "Order fulfillment queue, customer briefs, deadlines & milestone tracking.",
};

export default function OrdersPage() {
  return <ModulePlaceholder moduleId="orders" />;
}

