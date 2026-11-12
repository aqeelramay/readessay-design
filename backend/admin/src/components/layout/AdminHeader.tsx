"use client";

import Link from "next/link";
import { PanelLeft, Menu } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Breadcrumbs } from "./Breadcrumbs";
import { UserMenu } from "./UserMenu";

interface AdminHeaderProps {
  onToggleMobileMenu: () => void;
  onToggleSidebarCollapse: () => void;
  isSidebarCollapsed: boolean;
}

export function AdminHeader({
  onToggleMobileMenu,
  onToggleSidebarCollapse,
  isSidebarCollapsed,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 w-full h-14 bg-navy border-b border-white/10 flex items-center justify-between px-3 sm:px-4 lg:px-6 shadow-xs select-none">
      {/* Left side: Brand, collapse toggle, breadcrumbs */}
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0">
        {/* Mobile menu hamburger button */}
        <button
          type="button"
          aria-label="Open mobile navigation drawer"
          onClick={onToggleMobileMenu}
          className="md:hidden p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-navy-hover transition-colors focus:outline-none focus:ring-2 focus:ring-orange"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand lockup */}
        <Link
          href="/"
          className="flex items-center focus:outline-none focus:ring-2 focus:ring-orange rounded-lg py-1 px-1 -ml-1 transition-opacity hover:opacity-95"
        >
          <BrandLogo compact surface="dark" size="sm" />
        </Link>

        {/* Desktop Sidebar Collapse Button */}
        <div className="hidden md:flex items-center">
          <div className="h-5 w-px bg-white/15 mx-2" aria-hidden="true" />
          <button
            type="button"
            aria-label={
              isSidebarCollapsed
                ? "Expand navigation sidebar"
                : "Collapse navigation sidebar"
            }
            onClick={onToggleSidebarCollapse}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-navy-hover transition-colors focus:outline-none focus:ring-2 focus:ring-orange"
          >
            <PanelLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Breadcrumbs */}
        <div className="hidden sm:block truncate ml-1">
          <Breadcrumbs />
        </div>
      </div>

      {/* Right side: Only User menu */}
      <div className="flex items-center shrink-0">
        <UserMenu />
      </div>
    </header>
  );
}
