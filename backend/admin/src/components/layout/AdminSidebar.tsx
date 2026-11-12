"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import { NAVIGATION_ITEMS } from "@/config/navigation";

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export function AdminSidebar({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}: AdminSidebarProps) {
  const pathname = usePathname();

  // Handle body scroll lock on mobile
  useEffect(() => {
    if (isMobileOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobileOpen]);

  // Handle Escape key for mobile drawer
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isMobileOpen) {
        onCloseMobile();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen, onCloseMobile]);

  function isItemActive(href: string): boolean {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      {/* ======================================================== */}
      {/* 1. Desktop Sidebar (hidden md:flex)                      */}
      {/* ======================================================== */}
      <aside
        aria-label="Sidebar Navigation"
        className={`hidden md:flex flex-col bg-navy border-r border-white/10 shrink-0 transition-[width] duration-300 ease-in-out select-none ${
          isCollapsed ? "w-[72px]" : "w-[228px]"
        }`}
      >
        {/* Navigation Section Header */}
        <div className="px-4 pt-4 pb-2">
          {isCollapsed ? (
            <div className="h-px bg-white/10 my-1" aria-hidden="true" />
          ) : (
            <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Navigation
            </span>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-1 space-y-1 overflow-y-auto">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item.href);

            return (
              <Link
                key={item.id}
                href={item.href}
                title={isCollapsed ? item.label : undefined}
                className={`group flex items-center gap-3 px-3 py-2.5 text-xs transition-colors ${
                  active
                    ? "bg-orange text-white font-medium rounded-lg shadow-xs"
                    : "text-slate-300 hover:bg-navy-hover hover:text-white rounded-lg"
                } ${isCollapsed ? "justify-center px-0" : ""}`}
              >
                <Icon
                  aria-hidden="true"
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    active ? "text-white" : "text-slate-400 group-hover:text-white"
                  }`}
                />
                {!isCollapsed && (
                  <span className="truncate flex-1 tracking-tight">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Anchored Bottom Bar: Collapse control */}
        <div className="p-3 bg-navy-dark border-t border-white/10">
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-navy-hover rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange ${
              isCollapsed ? "justify-center px-0" : ""
            }`}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-4 h-4 shrink-0" />
            ) : (
              <>
                <PanelLeftClose className="w-4 h-4 shrink-0" />
                <span className="truncate">Collapse Menu</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 2. Mobile Navigation Drawer (md:hidden slide-over)      */}
      {/* ======================================================== */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            aria-hidden="true"
            onClick={onCloseMobile}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
          />

          {/* Drawer container */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Drawer"
            className="relative w-72 max-w-[85vw] bg-navy flex flex-col shadow-2xl z-50 animate-in slide-in-from-left duration-300"
          >
            {/* Drawer Header */}
            <div className="h-14 flex items-center justify-between px-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-orange flex items-center justify-center font-bold text-white text-base shadow-xs">
                  R
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white text-base tracking-tight font-sans">
                    ReadEssay
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase bg-white/10 text-slate-300 border border-white/10">
                    STUDIO
                  </span>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close mobile navigation"
                onClick={onCloseMobile}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-hover transition-colors focus:outline-none focus:ring-2 focus:ring-orange"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Section label */}
            <div className="px-4 pt-4 pb-2">
              <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                Navigation
              </span>
            </div>

            {/* Mobile Navigation List */}
            <nav className="flex-1 px-3 py-1 space-y-1 overflow-y-auto">
              {NAVIGATION_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = isItemActive(item.href);

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={onCloseMobile}
                    className={`flex items-center justify-between px-3.5 py-2.5 text-xs rounded-lg transition-colors ${
                      active
                        ? "bg-orange text-white font-medium shadow-xs"
                        : "text-slate-200 hover:bg-navy-hover hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate font-medium">{item.label}</span>
                    </div>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-white/5 text-slate-400 border border-white/10"
                      }`}
                    >
                      {item.badge}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Drawer Footer */}
            <div className="p-4 bg-navy-dark border-t border-white/10">
              <p className="text-[11px] text-slate-400">
                ReadEssay Admin v0.1.0
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

