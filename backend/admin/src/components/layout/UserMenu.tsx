"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, User, Settings, LogOut, CheckCircle2 } from "lucide-react";

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  function handleActionClick(actionName: string) {
    setIsOpen(false);
    setToastMessage(
      `${actionName}: Authentication and account services will be wired in a later phase.`
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label="User account menu for Sarah Jenkins"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1 rounded-full sm:rounded-xl hover:bg-navy-hover transition-colors focus:outline-none focus:ring-2 focus:ring-orange"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange to-amber-500 flex items-center justify-center text-white text-xs font-bold tracking-wider shadow-sm ring-2 ring-white/10 shrink-0">
          SJ
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-semibold text-white leading-tight">
            Sarah Jenkins
          </span>
          <span className="text-[10px] text-slate-400 font-medium leading-tight">
            Super Admin
          </span>
        </div>
        <ChevronDown
          aria-hidden="true"
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 hidden sm:block ${
            isOpen ? "rotate-180 text-white" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label="User options"
          className="absolute right-0 mt-2 w-56 rounded-2xl bg-navy-dark border border-white/10 shadow-2xl z-50 overflow-hidden py-1.5 backdrop-blur-md"
        >
          {/* User info banner inside dropdown */}
          <div className="px-4 py-2.5 border-b border-white/10">
            <p className="text-xs font-semibold text-white">Sarah Jenkins</p>
            <p className="text-[10px] text-slate-400 font-mono">
              admin@readessay.com
            </p>
          </div>

          <div className="py-1">
            <button
              type="button"
              role="menuitem"
              onClick={() => handleActionClick("Profile Settings")}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-200 hover:text-white hover:bg-navy-hover transition-colors text-left"
            >
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Profile Settings</span>
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => handleActionClick("Workspace Preferences")}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-200 hover:text-white hover:bg-navy-hover transition-colors text-left"
            >
              <Settings className="w-3.5 h-3.5 text-slate-400" />
              <span>Workspace Preferences</span>
            </button>
          </div>

          <div className="pt-1 border-t border-white/5">
            <button
              type="button"
              role="menuitem"
              onClick={() => handleActionClick("Sign Out")}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-300 hover:text-rose-200 hover:bg-rose-950/30 transition-colors text-left"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Non-blocking Phase Toast Notice */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 max-w-sm flex items-center gap-3 p-3.5 rounded-xl bg-navy-dark border border-white/15 shadow-2xl text-white text-xs z-50 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle2 className="w-4 h-4 text-orange shrink-0" />
          <span className="flex-1 text-slate-200">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white text-xs font-semibold px-1"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

