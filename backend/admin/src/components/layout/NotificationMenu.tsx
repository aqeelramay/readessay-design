"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, CheckCheck, ExternalLink } from "lucide-react";
import Link from "next/link";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  category: string;
  href: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "New review awaiting moderation",
    description:
      "5-star submission on Healthcare dissertation package requires approval.",
    time: "10m ago",
    category: "Reviews",
    href: "/reviews",
  },
  {
    id: "notif-2",
    title: "Sample citation check complete",
    description:
      "Turnitin 0% similarity report ready for Economics exemplar #128.",
    time: "45m ago",
    category: "Samples",
    href: "/samples",
  },
  {
    id: "notif-3",
    title: "Order milestone update",
    description:
      "Order #4829 reached 1st draft milestone — assigned writer active.",
    time: "2h ago",
    category: "Orders",
    href: "/orders",
  },
];

export function NotificationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [notifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

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

  function handleMarkAllAsRead() {
    setUnreadCount(0);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={`Notifications (${unreadCount} unread)`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative p-2 rounded-full text-slate-300 hover:text-white hover:bg-navy-hover transition-colors focus:outline-none focus:ring-2 focus:ring-orange"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-orange text-white text-[10px] font-bold leading-none shadow-sm">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          role="region"
          aria-label="Notifications panel"
          className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-navy-dark border border-white/10 shadow-2xl z-50 overflow-hidden backdrop-blur-md"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-navy/60">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">
                Notifications
              </span>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-orange/20 text-orange border border-orange/30">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllAsRead}
                className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5 text-orange" />
                <span>Mark all as read</span>
              </button>
            )}
          </div>

          {/* Alert List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
            {notifications.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block p-3.5 hover:bg-navy-hover/60 transition-colors group"
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-semibold text-orange tracking-wide uppercase text-[10px]">
                    {item.category}
                  </span>
                  <span className="text-slate-400">{item.time}</span>
                </div>
                <h4 className="text-xs font-medium text-white group-hover:text-orange transition-colors flex items-center justify-between">
                  <span>{item.title}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
                <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-white/5 bg-navy/40 text-center">
            <span className="text-[11px] text-slate-400">
              Mock operational alerts for UI shell stage
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

