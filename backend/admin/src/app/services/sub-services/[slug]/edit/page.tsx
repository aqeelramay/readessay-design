import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  INITIAL_MAIN_SERVICES,
  INITIAL_SUB_SERVICES,
  getSubServiceBySlug,
} from "@/data/mockServices";
import { SubServiceForm } from "@/components/services/SubServiceForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return INITIAL_SUB_SERVICES.map((s) => ({ slug: s.slug }));
}

function findSubService(slug: string) {
  if (typeof getSubServiceBySlug === "function") {
    const s = getSubServiceBySlug(slug);
    if (s) return s;
  }
  return INITIAL_SUB_SERVICES.find((item) => item.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const subService = findSubService(slug);
  return {
    title: `${subService ? `Edit ${subService.name}` : "Edit Sub-Service"} — ReadEssay Admin`,
    description: subService?.shortDescription ?? "Edit academic writing sub-service",
  };
}

export default async function EditSubServicePage({ params }: PageProps) {
  const { slug } = await params;
  const subService = findSubService(slug);

  if (!subService) {
    return (
      <div className="bg-surface border border-border rounded-xl p-8 text-center max-w-lg mx-auto">
        <h1 className="text-xl font-bold text-text-primary">Sub-Service Not Found</h1>
        <p className="text-sm text-text-secondary mt-2">
          The requested sub-service &ldquo;{slug}&rdquo; does not exist in the catalog.
        </p>
        <Link
          href="/services/sub-services"
          className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-lg bg-orange text-white text-xs font-semibold hover:bg-orange-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sub-Services</span>
        </Link>
      </div>
    );
  }

  return (
    <SubServiceForm
      subService={subService}
      mainServices={INITIAL_MAIN_SERVICES}
    />
  );
}

