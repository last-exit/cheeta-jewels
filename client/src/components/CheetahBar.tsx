/**
 * CHEETAH BAR — Sleek Minimal Drawer with Official CJ Logo Trigger
 * - Compact sidebar width (w-64 to w-72)
 * - Official CJ mark trigger (/manus-storage/cheeta-cj-official_8dcc9825.png)
 * - ONLY the user-specified items:
 *   1. COLLECTIONS (The Gun Collection, The Masquerade)
 *   2. PHILOSOPHY
 *   3. HOME
 *   4. HAYRAT
 *   5. BAG
 * - GT Sectra Display & GT America typography with zero fake-monospace tracking
 */
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import React, { useEffect, useRef, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { playMetallicClick } from "@/lib/soundEffects";

export default function CheetahBar({ dark = false }: { dark?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [collectionsExpanded, setCollectionsExpanded] = useState(true);
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

  const toggleDrawer = () => {
    try {
      playMetallicClick();
    } catch {}
    setIsOpen(!isOpen);
  };

  const isCurrentRoute = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <>
      {/* 1. Official CJ Logo Floating Trigger (Top-Left) */}
      <aside
        className="fixed top-0 left-0 z-50 pointer-events-none p-5 sm:p-7 select-none"
        aria-label="Cheeta Jewels Navigation"
      >
        <button
          onClick={toggleDrawer}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          className="pointer-events-auto group relative flex items-center gap-2.5 focus:outline-none cursor-pointer p-1.5 transition-transform duration-300 active:scale-95 hover:scale-105"
        >
          {/* Official CJ Logo */}
          <div className="relative h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center">
            <img
              src="/manus-storage/cheeta-cj-official_8dcc9825.png"
              alt="Cheeta Jewels"
              className={`h-full w-full object-contain transition-all duration-300 ${
                dark
                  ? "brightness-0 invert opacity-90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
                  : "opacity-85 hover:opacity-100"
              }`}
            />
          </div>

          {/* Quiet Bag Count Badge if bag has items */}
          {totalCount > 0 && (
            <span
              className={`text-[11px] font-sans px-2 py-0.5 rounded-full font-medium ${
                dark ? "bg-white text-black" : "bg-black text-white"
              }`}
            >
              {totalCount}
            </span>
          )}
        </button>
      </aside>

      {/* 2. Compact, Sleek Drawer (Not too big) */}
      <AnimatePresence>
        {isOpen && (
          <div ref={drawerRef} className="fixed inset-0 z-50 flex">
            {/* Soft Ambient Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Compact Slide-out Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-64 sm:w-72 h-full bg-[#FFFFFF] text-[#000000] flex flex-col justify-between p-7 sm:p-8 z-10 shadow-2xl border-r border-black/10 select-none"
            >
              {/* Header with simple Close button */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setIsOpen(false)}
                  className="font-sans text-xs text-black/50 hover:text-black transition-colors cursor-pointer p-1"
                  aria-label="Close menu"
                >
                  ✕ Close
                </button>
              </div>

              {/* Exact Client Architecture Navigation Links */}
              <nav className="flex flex-col space-y-6 my-auto">
                {/* 1. COLLECTIONS */}
                <div className="flex flex-col space-y-2.5">
                  <button
                    onClick={() => setCollectionsExpanded(!collectionsExpanded)}
                    className="flex items-center justify-between text-left group cursor-pointer"
                  >
                    <span
                      className={`font-serif text-2xl sm:text-3xl tracking-tight transition-colors ${
                        location.startsWith("/collection")
                          ? "text-black font-normal"
                          : "text-black/80 hover:text-black"
                      }`}
                    >
                      COLLECTIONS
                    </span>
                    <span className="font-sans text-xs text-black/40 group-hover:text-black transition-colors pl-2">
                      {collectionsExpanded ? "—" : "+"}
                    </span>
                  </button>

                  <AnimatePresence>
                    {collectionsExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-4 flex flex-col space-y-2 pt-1 border-l border-black/15 overflow-hidden"
                      >
                        <Link
                          href="/collection/barrel"
                          className={`font-sans text-sm transition-colors ${
                            location === "/collection/barrel"
                              ? "text-black font-medium"
                              : "text-black/60 hover:text-black"
                          }`}
                        >
                          The Gun Collection
                        </Link>
                        <Link
                          href="/collection/masquerade"
                          className={`font-sans text-sm transition-colors ${
                            location === "/collection/masquerade"
                              ? "text-black font-medium"
                              : "text-black/60 hover:text-black"
                          }`}
                        >
                          The Masquerade
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2. PHILOSOPHY */}
                <Link
                  href="/philosophy"
                  className={`font-serif text-2xl sm:text-3xl tracking-tight transition-colors ${
                    isCurrentRoute("/philosophy")
                      ? "text-black font-normal"
                      : "text-black/80 hover:text-black"
                  }`}
                >
                  PHILOSOPHY
                </Link>

                {/* 3. HOME */}
                <Link
                  href="/"
                  className={`font-serif text-2xl sm:text-3xl tracking-tight transition-colors ${
                    location === "/"
                      ? "text-black font-normal"
                      : "text-black/80 hover:text-black"
                  }`}
                >
                  HOME
                </Link>

                {/* 4. HAYRAT */}
                <Link
                  href="/hayrat"
                  className={`font-serif text-2xl sm:text-3xl tracking-tight transition-colors ${
                    isCurrentRoute("/hayrat")
                      ? "text-black font-normal"
                      : "text-black/80 hover:text-black"
                  }`}
                >
                  HAYRAT
                </Link>

                {/* 5. BAG */}
                <Link
                  href="/cart"
                  className={`flex items-baseline justify-between font-serif text-2xl sm:text-3xl tracking-tight transition-colors ${
                    isCurrentRoute("/cart")
                      ? "text-black font-normal"
                      : "text-black/80 hover:text-black"
                  }`}
                >
                  <span>BAG</span>
                  {totalCount > 0 && (
                    <span className="font-sans text-xs text-black/50">
                      ({totalCount})
                    </span>
                  )}
                </Link>
              </nav>

              {/* Bottom Spacer */}
              <div className="h-4" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
