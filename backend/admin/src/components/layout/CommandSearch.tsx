"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { NAVIGATION_ITEMS, type NavigationItem } from "@/config/navigation";

export function CommandSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return NAVIGATION_ITEMS;
    }
    return NAVIGATION_ITEMS.filter(
      (item) =>
        item.label.toLowerCase().includes(trimmed) ||
        item.description.toLowerCase().includes(trimmed) ||
        item.action.toLowerCase().includes(trimmed) ||
        item.href.toLowerCase().includes(trimmed)
    );
  }, [query]);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  function handleSelect(item: NavigationItem) {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(0);
    inputRef.current?.blur();
    router.push(item.href);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
      return;
    }

    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < filteredItems.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : filteredItems.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems.length > 0 && filteredItems[activeIndex]) {
        handleSelect(filteredItems[activeIndex]);
      }
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-[320px]">
      <div className="relative flex items-center">
        <Search
          aria-hidden="true"
          className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none"
        />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-controls="command-search-listbox"
          placeholder="Jump to section (e.g. Orders, Blog)..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full h-9 pl-9 pr-12 text-xs rounded-full bg-navy-dark/80 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-orange focus:border-orange transition-all"
        />
        <div
          aria-hidden="true"
          className="absolute right-2.5 flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 select-none pointer-events-none"
        >
          <span>⌘</span>
          <span>K</span>
        </div>
      </div>

      {isOpen && (
        <div
          id="command-search-listbox"
          role="listbox"
          aria-label="Navigation Suggestions"
          className="absolute top-full mt-2 left-0 right-0 max-h-72 overflow-y-auto rounded-xl bg-navy-dark border border-white/10 shadow-2xl z-50 py-1.5 backdrop-blur-md"
        >
          <div className="px-3 py-1.5 text-[10px] uppercase font-semibold tracking-wider text-slate-400 border-b border-white/5">
            Navigation Sections
          </div>
          {filteredItems.length === 0 ? (
            <div className="px-3 py-4 text-center text-xs text-slate-400">
              No matching sections found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  role="option"
                  aria-selected={isSelected}
                  type="button"
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => handleSelect(item)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs transition-colors ${
                    isSelected
                      ? "bg-orange text-white"
                      : "text-slate-200 hover:bg-navy-hover"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="font-medium truncate">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 text-[10px]">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-white/5 text-slate-400 border border-white/10"
                      }`}
                    >
                      {item.badge}
                    </span>
                    <span
                      className={
                        isSelected ? "text-white/80" : "text-slate-400 font-mono"
                      }
                    >
                      {item.href}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
