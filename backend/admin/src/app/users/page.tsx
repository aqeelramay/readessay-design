import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/dashboard/ModulePlaceholder";

export const metadata: Metadata = {
  title: "Users — ReadEssay Studio",
  description:
    "Client accounts, staff permissions, writer roles & RBAC access control.",
};

export default function UsersPage() {
  return <ModulePlaceholder moduleId="users" />;
}

