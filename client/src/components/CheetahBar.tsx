/**
 * CHEETAH BAR — Chrome Hearts Inspired Luxury Navigation Drawer
 * Inspired by Chrome Hearts & Client Architecture:
 * - Gothic Cross emblem at top of drawer (/brand/chrome-cross.png)
 * - Raw warm canvas / textured white presentation
 * - Exact Client Hierarchy:
 *   1. COLLECTIONS (The Gun Collection, The Masquerade)
 *   2. PHILOSOPHY
 *   3. HOME
 *   4. HAYRAT (Founding 30-Year Antique Collection)
 *   5. BAG (Cart)
 * - GT Sectra Display & GT America typography
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
      {/* 1. Floating Chrome Hearts Trigger Button in Top-Left Corner */}
      <aside
        className="fixed top-0 left-0 z-50 pointer-events-none p-6 sm:p-8 select-none"
        aria-label="Cheeta Jewels Navigation"
      >
        <button
          onClick={toggleDrawer}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          className="pointer-events-auto group relative flex items-center gap-3 focus:outline-none cursor-pointer p-2"
        >
          {/* Gothic Cross Trigger */}
          <div className="relative h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 active:scale-95">
            <img
              src="/brand/chrome-cross.png"
              alt="Chrome Cross Menu Trigger"
              className={`h-full w-full object-contain transition-all duration-300 ${
                dark
                  ? "brightness-0 invert opacity-90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                  : "opacity-85 hover:opacity-100"
              }`}
            />
          </div>

          {/* Quiet menu text indicator */}
          <span
            className={`font-sans text-[11px] uppercase tracking-[0.26em] font-medium transition-opacity duration-300 ${
              dark
                ? "text-white/80 group-hover:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                : "text-black/70 group-hover:text-black"
            }`}
          >
            MENU
          </span>

          {/* Bag counter pill if items exist */}
          {totalCount > 0 && (
            <span
              className={`ml-1 text-[10px] font-sans px-2 py-0.5 rounded-full ${
                dark ? "bg-white text-black font-semibold" : "bg-black text-white"
              }`}
            >
              {totalCount}
            </span>
          )}
        </button>
      </aside>

      {/* 2. Chrome Hearts Style Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div ref={drawerRef} className="fixed inset-0 z-50 flex">
            {/* Soft Ambient Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm sm:max-w-md h-full bg-[#FAF9F5] text-black flex flex-col justify-between p-8 sm:p-12 z-10 shadow-2xl overflow-y-auto border-r border-black/10 selection:bg-black selection:text-white"
            >
              {/* Header with Gothic Cross Emblem and Close Button */}
              <div className="flex items-center justify-between pb-6 border-b border-black/10">
                <div className="flex items-center gap-3.5">
                  <img
                    src="/brand/chrome-cross.png"
                    alt="Icon Livin Gothic Cross"
                    className="h-6 w-6 object-contain"
                  />
                  <span className="font-serif text-lg tracking-wider uppercase">
                    ICON LIVIN
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="font-sans text-xs uppercase tracking-[0.2em] text-black/50 hover:text-black transition-colors cursor-pointer p-2"
                  aria-label="Close menu"
                >
                  ✕ CLOSE
                </button>
              </div>

              {/* Exact Client Architecture Navigation Links */}
              <nav className="flex flex-col space-y-7 my-auto py-8">
                {/* 1. COLLECTIONS (Accordion / Sub-menu) */}
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={() => setCollectionsExpanded(!collectionsExpanded)}
                    className="flex items-center justify-between text-left group cursor-pointer"
                  >
                    <span
                      className={`font-serif text-3xl sm:text-4xl tracking-tight transition-transform duration-300 group-hover:translate-x-1 ${
                        location.startsWith("/collection")
                          ? "text-black font-medium"
                          : "text-black/80 hover:text-black"
                      }`}
                    >
                      COLLECTIONS
                    </span>
                    <span className="font-sans text-xs text-black/40 group-hover:text-black transition-colors">
                      {collectionsExpanded ? "—" : "+"}
                    </span>
                  </button>

                  <AnimatePresence>
                    {collectionsExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="pl-5 flex flex-col space-y-3 pt-1 border-l-2 border-black/15 overflow-hidden"
                      >
                        {/* The Gun Collection */}
                        <Link
                          href="/collection/barrel"
                          className={`font-sans text-sm uppercase tracking-[0.18em] transition-all hover:translate-x-1 ${
                            location === "/collection/barrel"
                              ? "text-black font-semibold"
                              : "text-black/60 hover:text-black"
                          }`}
                        >
                          The Gun Collection
                        </Link>

                        {/* The Masquerade */}
                        <Link
                          href="/collection/masquerade"
                          className={`font-sans text-sm uppercase tracking-[0.18em] transition-all hover:translate-x-1 ${
                            location === "/collection/masquerade"
                              ? "text-black font-semibold"
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
                  className={`font-serif text-3xl sm:text-4xl tracking-tight transition-all duration-300 hover:translate-x-1 ${
                    isCurrentRoute("/philosophy")
                      ? "text-black font-medium"
                      : "text-black/80 hover:text-black"
                  }`}
                >
                  PHILOSOPHY
                </Link>

                {/* 3. HOME */}
                <Link
                  href="/"
                  className={`font-serif text-3xl sm:text-4xl tracking-tight transition-all duration-300 hover:translate-x-1 ${
                    location === "/"
                      ? "text-black font-medium"
                      : "text-black/80 hover:text-black"
                  }`}
                >
                  HOME
                </Link>

                {/* 4. HAYRAT */}
                <Link
                  href="/hayrat"
                  className={`group flex items-baseline justify-between font-serif text-3xl sm:text-4xl tracking-tight transition-all duration-300 hover:translate-x-1 ${
                    isCurrentRoute("/hayrat")
                      ? "text-black font-medium"
                      : "text-black/80 hover:text-black"
                  }`}
                >
                  <span>HAYRAT</span>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-black/40 group-hover:text-black transition-colors">
                    ANTIQUE VAULT
                  </span>
                </Link>

                {/* 5. BAG */}
                <Link
                  href="/cart"
                  className={`group flex items-baseline justify-between font-serif text-3xl sm:text-4xl tracking-tight transition-all duration-300 hover:translate-x-1 ${
                    isCurrentRoute("/cart")
                      ? "text-black font-medium"
                      : "text-black/80 hover:text-black"
                  }`}
                >
                  <span>BAG</span>
                  <span className="font-sans text-xs uppercase tracking-[0.2em] text-black/50 group-hover:text-black transition-colors">
                    {totalCount > 0 ? `(${totalCount})` : "(0)"}
                  </span>
                </Link>
              </nav>

              {/* Footer with Dubai Atelier & Year */}
              <div className="pt-6 border-t border-black/10 flex flex-col space-y-3 font-sans text-xs uppercase tracking-[0.2em] text-black/50">
                <div className="flex justify-between items-center">
                  <span>CHEETA JEWELS</span>
                  <span>DUBAI</span>
                </div>
                <div className="text-[10px] text-black/35 tracking-[0.16em]">
                  HAUTE JOAILLERIE & BESPOKE EYEWEAR
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
