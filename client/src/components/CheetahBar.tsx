/**
 * CHEETAH BAR — Floating Luxury Navigation & Fluid Island Drawer
 * Radical anti-slop minimalism: Zero numbered tags, zero fake eyebrows.
 * Pure editorial typography in GT Sectra Display & GT America.
 */
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/contexts/CartContext";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collection/maharaja" },
  { label: "Archive Retail", href: "/retail" },
  { label: "Philosophy", href: "/philosophy" },
  { label: "Bag", href: "/cart" },
];

export default function CheetahBar({ dark = false }: { dark?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const drawerRef = useRef<HTMLDivElement>(null);
  const { totalCount } = useCart();

  // Auto-close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const isCurrentRoute = (href: string) => {
    if (href === "/") return location === "/";
    if (href === "/rooms") return location === "/rooms" || location === "/exclusive-rooms";
    return location.startsWith(href);
  };

  return (
    <>
      {/* 1. Floating Transparent Cheetah Mark Trigger */}
      <aside
        className="fixed top-0 left-0 z-50 h-screen w-20 pointer-events-none flex flex-col justify-between items-center py-8 select-none"
        aria-label="Cheeta Jewels Navigation"
      >
        {/* Top: Floating Cheetah Mark Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          className="pointer-events-auto group relative flex items-center justify-center p-3 focus:outline-none cursor-pointer transition-transform duration-300 active:scale-95 hover:scale-105"
        >
          <div className="relative h-10 w-10 flex items-center justify-center">
            <img
              src="/manus-storage/cheeta-cj-official_8dcc9825.png"
              alt="Cheeta Jewels"
              className={`h-full w-full object-contain transition-all duration-300 ${
                dark
                  ? "brightness-0 invert opacity-90 group-hover:opacity-100 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
                  : "opacity-85 group-hover:opacity-100"
              }`}
            />
          </div>
        </button>

        {/* Center: Invisible Spacer */}
        <div className="flex-1" />

        {/* Bottom: Floating Bag Counter */}
        {totalCount > 0 && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open cart menu"
            className="pointer-events-auto group flex flex-col items-center justify-center p-2 cursor-pointer focus:outline-none transition-transform active:scale-95"
          >
            <span className="h-2 w-2 rounded-full bg-[#4A0E16]" />
            <span
              className={`mt-1 font-sans text-[10px] tracking-wider ${
                dark ? "text-white/80" : "text-[#0B0B0C]/70"
              }`}
            >
              {totalCount}
            </span>
          </button>
        )}
      </aside>

      {/* 2. Expanded Lineless Luxury Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div ref={drawerRef} className="fixed inset-0 z-50 flex">
            {/* Soft Ambient Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#0B0B0C]/40 backdrop-blur-md"
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
              className="relative w-full max-w-sm sm:max-w-md h-full bg-[#F4F3EE] text-[#0B0B0C] flex flex-col justify-between p-8 sm:p-14 z-10 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl tracking-tight text-[#0B0B0C]">
                  Cheeta Jewels
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="font-sans text-xs uppercase tracking-[0.14em] text-[#0B0B0C]/40 hover:text-[#0B0B0C] p-2 transition-colors cursor-pointer"
                  aria-label="Close drawer"
                >
                  Close
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-6 my-auto">
                {NAV_ITEMS.map((item) => {
                  const active = isCurrentRoute(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group font-serif text-3xl sm:text-4xl transition-all duration-300 ${
                        active
                          ? "text-[#4A0E16] translate-x-1"
                          : "text-[#0B0B0C]/70 hover:text-[#0B0B0C] hover:translate-x-1"
                      }`}
                    >
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="font-sans text-xs uppercase tracking-[0.16em] text-[#0B0B0C]/40 flex justify-between items-center border-t border-[#0B0B0C]/10 pt-6">
                <span>Dubai Atelier</span>
                <span>Est. 2026</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
