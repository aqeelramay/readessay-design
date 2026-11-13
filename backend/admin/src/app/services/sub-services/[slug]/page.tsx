import Link from "next/link";
import { ArrowLeft, BookOpen, Info, Pencil } from "lucide-react";
import {
  INITIAL_SUB_SERVICES,
  INITIAL_MAIN_SERVICES,
} from "@/data/mockServices";
import { ServiceStatusBadge } from "@/components/services/ServiceStatusBadge";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return INITIAL_SUB_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const subService = INITIAL_SUB_SERVICES.find((s) => s.slug === slug);
  return {
    title: `${subService?.name ?? "Sub-Service Details"} — ReadEssay Admin`,
    description: subService?.shortDescription ?? "Academic sub-service details",
  };
}

export default async function SubServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const subService = INITIAL_SUB_SERVICES.find((s) => s.slug === slug);
  const parentService = subService
    ? INITIAL_MAIN_SERVICES.find((p) => p.id === subService.parentId)
    : null;

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
    <div className="space-y-6 max-w-4xl">
      {/* Back to Sub-Services Navigation */}
      <div>
        <Link
          href={
            parentService
              ? `/services/sub-services?parent=${parentService.slug}`
              : "/services/sub-services"
          }
          className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-orange transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>
            Back to {parentService ? parentService.name : "Sub-Services"}
          </span>
        </Link>
      </div>

      {/* Main Sub-Service Card */}
      <section className="bg-surface border border-border rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-bold text-text-primary tracking-tight">
                  {subService.name}
                </h1>
                <ServiceStatusBadge status={subService.status} />
              </div>

              {parentService && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-text-muted">Parent Category:</span>
                  <Link
                    href={`/services/sub-services?parent=${parentService.slug}`}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    {parentService.name}
                  </Link>
                </div>
              )}

              <p className="text-xs font-mono text-text-muted mt-2">
                URL Identifier: /services/{subService.slug}
              </p>
            </div>
          </div>

          <Link
            href={`/services/sub-services/${subService.slug}/edit`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-canvas transition-colors shrink-0"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Edit Sub-Service</span>
          </Link>
        </div>

        {/* Content Section */}
        <div className="mt-8 pt-6 border-t border-border space-y-4">
          <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider text-xs">
            Academic Scope &amp; Summary
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed bg-canvas p-4 rounded-lg border border-border">
            {subService.shortDescription}
          </p>
        </div>

        {/* Notice Box */}
        <div className="mt-6 p-4 rounded-lg bg-blue-50/60 border border-blue-200 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700 space-y-1">
            <p className="font-semibold text-navy">
              Sub-Service Content Schema Ready
            </p>
            <p className="leading-relaxed">
              Sub-service content editor, syllabus taxonomy, and writer assignment
              metadata will be wired directly to the NestJS API in subsequent phases.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

