"use client";

import { useSearchParams } from "next/navigation";
import { SubServiceForm } from "@/components/services/SubServiceForm";

export function NewSubServiceContent() {
  const searchParams = useSearchParams();
  const parentSlug = searchParams.get("parent") ?? undefined;

  return (
    <SubServiceForm
      defaultParentSlug={parentSlug}
    />
  );
}
