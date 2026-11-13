"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATION_ITEMS } from "@/config/navigation";
import {
  INITIAL_MAIN_SERVICES,
  INITIAL_SUB_SERVICES,
  getServiceBySlug,
  getSubServiceBySlug,
} from "@/data/mockServices";

function resolveServiceName(slug: string): string {
  if (typeof getServiceBySlug === "function") {
    const s = getServiceBySlug(slug);
    if (s?.name) return s.name;
  }
  const s = INITIAL_MAIN_SERVICES.find((item) => item.slug === slug);
  return s?.name ?? slug;
}

function resolveSubServiceName(slug: string): string {
  if (typeof getSubServiceBySlug === "function") {
    const s = getSubServiceBySlug(slug);
    if (s?.name) return s.name;
  }
  const s = INITIAL_SUB_SERVICES.find((item) => item.slug === slug);
  return s?.name ?? slug;
}

export function Breadcrumbs() {
  const pathname = usePathname();

  // 1. Sub-services specific paths:
  // /services/sub-services/new -> Admin Panel > Services > Sub-Services > Add Sub-Service
  if (pathname === "/services/sub-services/new") {
    return (
      <nav aria-label="Breadcrumbs" className="flex items-center text-xs sm:text-sm">
        <ol className="flex items-center space-x-1.5 sm:space-x-2">
          <li>
            <Link
              href="/"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Admin Panel
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li>
            <Link
              href="/services"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Services
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li>
            <Link
              href="/services/sub-services"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Sub-Services
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li aria-current="page">
            <span className="text-white font-semibold">Add Sub-Service</span>
          </li>
        </ol>
      </nav>
    );
  }

  // /services/sub-services/[slug]/edit -> Admin Panel > Services > Sub-Services > [Sub-Service Name] > Edit
  const subEditMatch = pathname.match(/^\/services\/sub-services\/([^/]+)\/edit$/);
  if (subEditMatch) {
    const slug = subEditMatch[1];
    const subName = resolveSubServiceName(slug);
    return (
      <nav aria-label="Breadcrumbs" className="flex items-center text-xs sm:text-sm">
        <ol className="flex items-center space-x-1.5 sm:space-x-2">
          <li>
            <Link
              href="/"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Admin Panel
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li>
            <Link
              href="/services"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Services
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li>
            <Link
              href="/services/sub-services"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Sub-Services
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li>
            <Link
              href={`/services/sub-services/${slug}`}
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              {subName}
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li aria-current="page">
            <span className="text-white font-semibold">Edit</span>
          </li>
        </ol>
      </nav>
    );
  }

  // /services/sub-services/[slug] -> Admin Panel > Services > Sub-Services > [Sub-Service Name]
  const subDetailMatch = pathname.match(/^\/services\/sub-services\/([^/]+)$/);
  if (subDetailMatch && subDetailMatch[1] !== "new") {
    const slug = subDetailMatch[1];
    const subName = resolveSubServiceName(slug);
    return (
      <nav aria-label="Breadcrumbs" className="flex items-center text-xs sm:text-sm">
        <ol className="flex items-center space-x-1.5 sm:space-x-2">
          <li>
            <Link
              href="/"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Admin Panel
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li>
            <Link
              href="/services"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Services
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li>
            <Link
              href="/services/sub-services"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Sub-Services
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li aria-current="page">
            <span className="text-white font-semibold">{subName}</span>
          </li>
        </ol>
      </nav>
    );
  }

  // /services/sub-services -> Admin Panel > Services > Sub-Services
  if (pathname === "/services/sub-services") {
    return (
      <nav aria-label="Breadcrumbs" className="flex items-center text-xs sm:text-sm">
        <ol className="flex items-center space-x-1.5 sm:space-x-2">
          <li>
            <Link
              href="/"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Admin Panel
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li>
            <Link
              href="/services"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Services
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li aria-current="page">
            <span className="text-white font-semibold">Sub-Services</span>
          </li>
        </ol>
      </nav>
    );
  }

  // 2. Main services specific paths:
  // /services/new -> Admin Panel > Services > Add Service
  if (pathname === "/services/new") {
    return (
      <nav aria-label="Breadcrumbs" className="flex items-center text-xs sm:text-sm">
        <ol className="flex items-center space-x-1.5 sm:space-x-2">
          <li>
            <Link
              href="/"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Admin Panel
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li>
            <Link
              href="/services"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Services
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li aria-current="page">
            <span className="text-white font-semibold">Add Service</span>
          </li>
        </ol>
      </nav>
    );
  }

  // /services/[slug]/edit -> Admin Panel > Services > [Service Name] > Edit
  const serviceEditMatch = pathname.match(/^\/services\/([^/]+)\/edit$/);
  if (serviceEditMatch) {
    const slug = serviceEditMatch[1];
    const servName = resolveServiceName(slug);
    return (
      <nav aria-label="Breadcrumbs" className="flex items-center text-xs sm:text-sm">
        <ol className="flex items-center space-x-1.5 sm:space-x-2">
          <li>
            <Link
              href="/"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Admin Panel
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li>
            <Link
              href="/services"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Services
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li>
            <span className="text-slate-300 font-medium">{servName}</span>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li aria-current="page">
            <span className="text-white font-semibold">Edit</span>
          </li>
        </ol>
      </nav>
    );
  }

  // Fallback to default
  const currentItem =
    NAVIGATION_ITEMS.find((item) =>
      item.href === "/"
        ? pathname === "/"
        : pathname === item.href || pathname.startsWith(`${item.href}/`)
    ) ?? NAVIGATION_ITEMS[0];

  return (
    <nav aria-label="Breadcrumbs" className="flex items-center text-xs sm:text-sm">
      <ol className="flex items-center space-x-1.5 sm:space-x-2">
        <li>
          <Link
            href="/"
            className="text-slate-300 hover:text-white transition-colors font-medium"
          >
            Admin Panel
          </Link>
        </li>
        <li aria-hidden="true" className="text-slate-500 text-xs select-none">
          &gt;
        </li>
        <li aria-current="page">
          <span className="text-white font-semibold">{currentItem.label}</span>
        </li>
      </ol>
    </nav>
  );
}
