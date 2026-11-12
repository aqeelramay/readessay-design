"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

const STORAGE_KEY = "readessay_admin_sidebar_collapsed";

function subscribeToSidebarState(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSidebarSnapshot(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function getSidebarServerSnapshot(): boolean {
  return false;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const isAuthRoute =
    pathname?.startsWith("/login") || pathname?.startsWith("/forgot-password");

  // Synchronize with localStorage safely without triggering setState in effects or hydration mismatch
  const isSidebarCollapsed = useSyncExternalStore(
    subscribeToSidebarState,
    getSidebarSnapshot,
    getSidebarServerSnapshot
  );

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  function handleToggleSidebarCollapse() {
    const current = getSidebarSnapshot();
    const next = !current;
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
      // Dispatch storage event so useSyncExternalStore listeners in current window re-render
      window.dispatchEvent(new Event("storage"));
    } catch {
      // Ignore if localStorage is disabled
    }
  }

  // Auth routes (e.g. /login, /forgot-password) render directly without dashboard chrome
  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-text-primary antialiased">
      {/* Top Application Header */}
      <AdminHeader
        onToggleMobileMenu={() => setIsMobileOpen(true)}
        onToggleSidebarCollapse={handleToggleSidebarCollapse}
        isSidebarCollapsed={isSidebarCollapsed}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar & Mobile Drawer */}
        <AdminSidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleSidebarCollapse}
          isMobileOpen={isMobileOpen}
          onCloseMobile={() => setIsMobileOpen(false)}
        />

        {/* Scrollable Content Canvas */}
        <main className="flex-1 bg-canvas overflow-y-auto">
          <div className="max-w-[1440px] mx-auto px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
