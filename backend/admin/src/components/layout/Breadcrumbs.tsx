"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATION_ITEMS } from "@/config/navigation";

function formatSlugToTitle(slug: string): string {
  if (!slug) return "";
  return slug
    .replace(/^serv-/, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function resolveServiceName(slug: string): string {
  return formatSlugToTitle(slug);
}

function resolveSubServiceName(slug: string): string {
  return formatSlugToTitle(slug);
}

function resolveReviewClientName(id: string): string {
  if (!id) return "Review";
  if (id.length > 12) return `Review #${id.slice(0, 8)}`;
  return `Review #${id}`;
}

function resolveSampleSectionHeading(id: string): string {
  if (!id) return "Discipline Section";
  if (id.length > 12) return `Section #${id.slice(0, 8)}`;
  return `Section #${id}`;
}

function resolveSampleTitle(id: string): string {
  if (!id) return "Academic Sample";
  if (id.length > 12) return `Sample #${id.slice(0, 8)}`;
  return `Sample #${id}`;
}

function resolveBlogCategoryName(slug: string): string {
  return formatSlugToTitle(slug);
}

function resolveBlogPostTitle(slug: string): string {
  return formatSlugToTitle(slug);
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

  // 3. Reviews specific paths:
  // /reviews/new -> Admin Panel > Reviews > Add Review
  if (pathname === "/reviews/new") {
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
              href="/reviews"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Reviews
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li aria-current="page">
            <span className="text-white font-semibold">Add Review</span>
          </li>
        </ol>
      </nav>
    );
  }

  // /reviews/[id]/edit -> Admin Panel > Reviews > [Client Name] > Edit
  const reviewEditMatch = pathname.match(/^\/reviews\/([^/]+)\/edit$/);
  if (reviewEditMatch) {
    const id = reviewEditMatch[1];
    const clientName = resolveReviewClientName(id);
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
              href="/reviews"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Reviews
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li>
            <span className="text-slate-300 font-medium">{clientName}</span>
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

  // 4. Samples specific paths:
  // /samples/items/new -> Admin Panel > Samples > All Samples > Add Sample
  if (pathname === "/samples/items/new") {
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
              href="/samples"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Samples
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li>
            <Link
              href="/samples/items"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              All Samples
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li aria-current="page">
            <span className="text-white font-semibold">Add Sample</span>
          </li>
        </ol>
      </nav>
    );
  }

  // /samples/items/[id]/edit -> Admin Panel > Samples > All Samples > [Sample Title] > Edit
  const sampleItemEditMatch = pathname.match(/^\/samples\/items\/([^/]+)\/edit$/);
  if (sampleItemEditMatch) {
    const id = sampleItemEditMatch[1];
    const sampleTitle = resolveSampleTitle(id);
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
              href="/samples"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Samples
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li>
            <Link
              href="/samples/items"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              All Samples
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li>
            <span className="text-slate-300 font-medium truncate max-w-[200px] inline-block align-bottom">
              {sampleTitle}
            </span>
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

  // /samples/items -> Admin Panel > Samples > All Samples
  if (pathname === "/samples/items") {
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
              href="/samples"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Samples
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li aria-current="page">
            <span className="text-white font-semibold">All Samples</span>
          </li>
        </ol>
      </nav>
    );
  }

  // /samples/new -> Admin Panel > Samples > Add Discipline Section
  if (pathname === "/samples/new") {
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
              href="/samples"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Samples
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li aria-current="page">
            <span className="text-white font-semibold">Add Section</span>
          </li>
        </ol>
      </nav>
    );
  }

  // /samples/[id]/edit -> Admin Panel > Samples > [Section Heading] > Edit
  const sampleSectionEditMatch = pathname.match(/^\/samples\/([^/]+)\/edit$/);
  if (sampleSectionEditMatch) {
    const id = sampleSectionEditMatch[1];
    const heading = resolveSampleSectionHeading(id);
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
              href="/samples"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Samples
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li>
            <span className="text-slate-300 font-medium truncate max-w-[200px] inline-block align-bottom">
              {heading}
            </span>
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

  // /samples -> Admin Panel > Samples
  if (pathname === "/samples") {
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
            <span className="text-white font-semibold">Samples</span>
          </li>
        </ol>
      </nav>
    );
  }

  // 5. Blog specific paths:
  // /blog/categories/new -> Admin Panel > Blog > Categories > Add Category
  if (pathname === "/blog/categories/new") {
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
              href="/blog"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Blog
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li>
            <Link
              href="/blog/categories"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Categories
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li aria-current="page">
            <span className="text-white font-semibold">Add Category</span>
          </li>
        </ol>
      </nav>
    );
  }

  // /blog/categories/[slug]/edit -> Admin Panel > Blog > Categories > [Category Name] > Edit
  const blogCategoryEditMatch = pathname.match(/^\/blog\/categories\/([^/]+)\/edit$/);
  if (blogCategoryEditMatch) {
    const slug = blogCategoryEditMatch[1];
    const categoryName = resolveBlogCategoryName(slug);
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
              href="/blog"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Blog
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li>
            <Link
              href="/blog/categories"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Categories
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li>
            <span className="text-slate-300 font-medium truncate max-w-[200px] inline-block align-bottom">
              {categoryName}
            </span>
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

  // /blog/categories -> Admin Panel > Blog > Categories
  if (pathname === "/blog/categories") {
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
              href="/blog"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Blog
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li aria-current="page">
            <span className="text-white font-semibold">Categories</span>
          </li>
        </ol>
      </nav>
    );
  }

  // /blog/new -> Admin Panel > Blog > Add Post
  if (pathname === "/blog/new") {
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
              href="/blog"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Blog
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li aria-current="page">
            <span className="text-white font-semibold">Add Post</span>
          </li>
        </ol>
      </nav>
    );
  }

  // /blog/[slug]/edit -> Admin Panel > Blog > [Article Title] > Edit
  const blogPostEditMatch = pathname.match(/^\/blog\/([^/]+)\/edit$/);
  if (blogPostEditMatch) {
    const slug = blogPostEditMatch[1];
    const postTitle = resolveBlogPostTitle(slug);
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
              href="/blog"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Blog
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-500 text-xs select-none">
            &gt;
          </li>
          <li>
            <span className="text-slate-300 font-medium truncate max-w-[200px] inline-block align-bottom">
              {postTitle}
            </span>
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

  // /blog -> Admin Panel > Blog
  if (pathname === "/blog") {
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
            <span className="text-white font-semibold">Blog</span>
          </li>
        </ol>
      </nav>
    );
  }

  // /calculator -> Admin Panel > Order Pricing & Calculator
  if (pathname === "/calculator") {
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
            <span className="text-white font-semibold">Order Pricing &amp; Calculator</span>
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
