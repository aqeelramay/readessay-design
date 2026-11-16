"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Info, Pencil, RefreshCw, ExternalLink } from "lucide-react";
import { getSubServiceById, type SubServiceItem } from "@/lib/api";
import { ServiceStatusBadge } from "@/components/services/ServiceStatusBadge";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function SubServiceDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const [subService, setSubService] = useState<SubServiceItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    getSubServiceById(slug)
      .then((data) => {
        if (!isMounted) return;
        setSubService(data);
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        if (!isMounted) return;
        const msg = err instanceof Error ? err.message : "Failed to load sub-service";
        setError(msg);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <div className="bg-surface border border-border rounded-xl p-12 text-center max-w-lg mx-auto">
        <RefreshCw className="w-6 h-6 text-orange animate-spin mx-auto mb-3" />
        <h2 className="text-base font-bold text-text-primary">Loading Sub-Service...</h2>
        <p className="text-xs text-text-secondary mt-1">Connecting to NestJS API...</p>
      </div>
    );
  }

  if (error || !subService) {
    return (
      <div className="bg-surface border border-border rounded-xl p-8 text-center max-w-lg mx-auto">
        <h1 className="text-xl font-bold text-text-primary">Sub-Service Not Found</h1>
        <p className="text-sm text-text-secondary mt-2">
          {error || `The requested sub-service "${slug}" does not exist in the catalog.`}
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

  const parentName = subService.service?.title || subService.parent?.title || "Parent Service";
  const parentSlug = subService.service?.slug || subService.parent?.slug || "";
  const displayPath = subService.fullPath || `/${parentSlug}/${subService.slug}`;
  const displayUrl = subService.fullUrl || `https://readessay.com${displayPath}`;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <Link
          href={
            parentSlug
              ? `/services/sub-services?parent=${parentSlug}`
              : "/services/sub-services"
          }
          className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-orange transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>
            Back to {parentName || "Sub-Services"}
          </span>
        </Link>
      </div>

      <section className="bg-surface border border-border rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-bold text-text-primary tracking-tight">
                  {subService.title || subService.name}
                </h1>
                <ServiceStatusBadge status={subService.status} />
              </div>

              {parentName && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-text-muted">Parent Category:</span>
                  <Link
                    href={`/services/sub-services?parent=${parentSlug}`}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    {parentName}
                  </Link>
                </div>
              )}

              <p className="text-xs font-mono text-text-muted mt-2 flex items-center gap-1.5">
                <span>Public URL:</span>
                <span className="text-orange">{displayPath}</span>
                <a
                  href={displayUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-text-primary"
                  title="Open live storefront page"
                >
                  <ExternalLink className="w-3 h-3 inline" />
                </a>
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

        <div className="mt-8 pt-6 border-t border-border space-y-4">
          <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider text-xs">
            Academic Scope &amp; Summary
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed bg-canvas p-4 rounded-lg border border-border">
            {subService.shortDescription || subService.shortIntro || "No summary provided."}
          </p>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-blue-50/60 border border-blue-200 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700 space-y-1">
            <p className="font-semibold text-navy">
              Sub-Service Synced with PostgreSQL API
            </p>
            <p className="leading-relaxed">
              This sub-service is dynamically connected to the live NestJS backend API.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
