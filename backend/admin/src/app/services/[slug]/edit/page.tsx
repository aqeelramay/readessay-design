import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { INITIAL_MAIN_SERVICES, getServiceBySlug } from "@/data/mockServices";
import { MainServiceForm } from "@/components/services/MainServiceForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return INITIAL_MAIN_SERVICES.map((s) => ({ slug: s.slug }));
}

function findService(slug: string) {
  if (typeof getServiceBySlug === "function") {
    const s = getServiceBySlug(slug);
    if (s) return s;
  }
  return INITIAL_MAIN_SERVICES.find((item) => item.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  return {
    title: `${service ? `Edit ${service.name}` : "Edit Service"} — ReadEssay Admin`,
    description: service?.shortIntro ?? "Edit academic service category",
  };
}

export default async function EditServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = findService(slug);

  if (!service) {
    return (
      <div className="bg-surface border border-border rounded-xl p-8 text-center max-w-lg mx-auto">
        <h1 className="text-xl font-bold text-text-primary">Service Not Found</h1>
        <p className="text-sm text-text-secondary mt-2">
          The requested service category &ldquo;{slug}&rdquo; does not exist in the catalog.
        </p>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-lg bg-orange text-white text-xs font-semibold hover:bg-orange-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Services</span>
        </Link>
      </div>
    );
  }

  return <MainServiceForm service={service} />;
}

