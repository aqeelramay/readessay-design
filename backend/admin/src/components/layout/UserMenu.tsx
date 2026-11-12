"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut } from "lucide-react";

export function UserMenu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
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
          className="absolute right-0 mt-2 w-52 rounded-2xl bg-navy-dark border border-white/10 shadow-2xl z-50 overflow-hidden py-1 backdrop-blur-md"
        >
          {/* User info banner inside dropdown */}
          <div className="px-4 py-2.5 border-b border-white/10">
            <p className="text-xs font-semibold text-white">Sarah Jenkins</p>
            <p className="text-[10px] text-slate-400 font-mono">
              admin@readessay.com
            </p>
          </div>

          {/* Clean single Sign Out item */}
          <div className="p-1">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                router.push("/login");
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-rose-300 hover:text-rose-200 hover:bg-rose-950/30 transition-colors text-left"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
