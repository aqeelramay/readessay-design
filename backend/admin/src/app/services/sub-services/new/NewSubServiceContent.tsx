"use client";

import { useSearchParams } from "next/navigation";
import type { MainService } from "@/data/mockServices";
import { SubServiceForm } from "@/components/services/SubServiceForm";

interface NewSubServiceContentProps {
  mainServices: MainService[];
}

export function NewSubServiceContent({
  mainServices,
}: NewSubServiceContentProps) {
  const searchParams = useSearchParams();
  const parentSlug = searchParams.get("parent") ?? undefined;

  return (
    <SubServiceForm
      mainServices={mainServices}
      defaultParentSlug={parentSlug}
    />
  );
}

