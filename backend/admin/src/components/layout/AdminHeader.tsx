"use client";

import Link from "next/link";
import { PanelLeft, Menu } from "lucide-react";
import { Breadcrumbs } from "./Breadcrumbs";
import { CommandSearch } from "./CommandSearch";
import { NotificationMenu } from "./NotificationMenu";
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
          className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-orange rounded-lg py-1 px-1 -ml-1 transition-opacity hover:opacity-95"
        >
          <div className="w-7 h-7 rounded-lg bg-orange flex items-center justify-center font-bold text-white text-base shadow-xs shrink-0">
            R
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-white text-sm sm:text-base tracking-tight font-sans">
              ReadEssay
            </span>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase bg-white/10 text-slate-300 border border-white/10">
              STUDIO
            </span>
          </div>
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

      {/* Right side: Search, Live indicator, Notifications, User menu */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <div className="hidden lg:block">
          <CommandSearch />
        </div>

        {/* LIVE status pill */}
        <div
          aria-label="System operational status: Live"
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-navy-dark/90 border border-white/10 text-[10px] font-bold tracking-wider text-slate-200 select-none shadow-xs"
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-emerald-400">LIVE</span>
        </div>

        <NotificationMenu />

        <div className="h-5 w-px bg-white/10 hidden sm:block" aria-hidden="true" />

        <UserMenu />
      </div>
    </header>
  );
}

