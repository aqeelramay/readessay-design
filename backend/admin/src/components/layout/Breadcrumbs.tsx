"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATION_ITEMS } from "@/config/navigation";

export function Breadcrumbs() {
  const pathname = usePathname();

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
          <span className="text-white font-semibold">
            {currentItem.label}
          </span>
        </li>
      </ol>
    </nav>
  );
}

