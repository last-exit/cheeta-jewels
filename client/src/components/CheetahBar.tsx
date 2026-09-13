/**
 * CHEETAH BAR — Transparent Luxury Dropdown Navigation (Chrome Hearts Style)
 * - Official CJ logo trigger at top-left
 * - Pure transparent dropdown (NO white sidebar!)
 * - Fluid downward roll-down and staggered link entrance
 * - Exact user hierarchy:
 *   1. COLLECTIONS (The Gun Collection, The Masquerade)
 *   2. PHILOSOPHY
 *   3. HOME
 *   4. HAYRAT
 *   5. BAG
 */
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import React, { useEffect, useRef, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { playMetallicClick } from "@/lib/soundEffects";

const TRANSITION_EASE = [0.16, 1, 0.3, 1] as const;

export default function CheetahBar({ dark = false }: { dark?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [collectionsExpanded, setCollectionsExpanded] = useState(true);
  const [location] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const toggleDropdown = () => {
    try {
      playMetallicClick();
    } catch {}
    setIsOpen(!isOpen);
  };

  const isCurrentRoute = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  // Text color classes based on dark/light context
  const textClass = dark
    ? "text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
    : "text-[#000000]";
  const subtextClass = dark
    ? "text-white/70 hover:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
    : "text-black/65 hover:text-black";
  const hoverClass = dark
    ? "hover:text-white"
    : "hover:text-black";

  return (
    <div
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()}
      className="fixed top-0 left-0 z-50 p-5 sm:p-7 pointer-events-none select-none"
    >
      {/* 1. Official CJ Logo Trigger Button */}
      <button
        onClick={toggleDropdown}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        className="pointer-events-auto group relative flex items-center gap-2.5 focus:outline-none cursor-pointer p-1 transition-transform duration-300 active:scale-95"
      >
        <div className="relative h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <img
            src="/manus-storage/cheeta-cj-official_8dcc9825.png"
            alt="Cheeta Jewels"
            className={`h-full w-full object-contain transition-all duration-300 ${
              dark
                ? "brightness-0 invert opacity-95 drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]"
                : "opacity-90 hover:opacity-100"
            }`}
          />
        </div>

        {/* Quiet bag counter */}
        {totalCount > 0 && (
          <span
            className={`text-[10px] font-sans px-2 py-0.5 rounded-full font-medium ${
              dark ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            {totalCount}
          </span>
        )}
      </button>

      {/* 2. Transparent Dropdown Menu (Chrome Hearts Style) */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: TRANSITION_EASE }}
            className={`pointer-events-auto mt-4 w-72 sm:w-80 flex flex-col space-y-6 pt-2 pb-6 px-2 sm:px-3 bg-transparent backdrop-blur-[2px]`}
          >
            {/* 1. COLLECTIONS Dropdown Item */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.03, duration: 0.3, ease: TRANSITION_EASE }}
              className="flex flex-col space-y-2.5"
            >
              <button
                onClick={() => setCollectionsExpanded(!collectionsExpanded)}
                className="flex items-center justify-between text-left group cursor-pointer focus:outline-none"
              >
                <span
                  className={`font-serif text-3xl sm:text-4xl tracking-tight transition-transform duration-300 group-hover:translate-x-1.5 ${textClass}`}
                >
                  COLLECTIONS
                </span>
                <span
                  className={`font-sans text-xs transition-colors pl-2 ${
                    dark ? "text-white/60 group-hover:text-white" : "text-black/40 group-hover:text-black"
                  }`}
                >
                  {collectionsExpanded ? "—" : "+"}
                </span>
              </button>

              {/* Sub-links (The Gun Collection, The Masquerade) */}
              <AnimatePresence>
                {collectionsExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: TRANSITION_EASE }}
                    className={`pl-4 flex flex-col space-y-2.5 pt-1 border-l overflow-hidden ${
                      dark ? "border-white/20" : "border-black/20"
                    }`}
                  >
                    <Link
                      href="/collection/barrel"
                      className={`font-sans text-sm transition-all duration-200 hover:translate-x-1 ${subtextClass} ${
                        location === "/collection/barrel" ? "font-medium underline underline-offset-4" : ""
                      }`}
                    >
                      The Gun Collection
                    </Link>
                    <Link
                      href="/collection/masquerade"
                      className={`font-sans text-sm transition-all duration-200 hover:translate-x-1 ${subtextClass} ${
                        location === "/collection/masquerade" ? "font-medium underline underline-offset-4" : ""
                      }`}
                    >
                      The Masquerade
                    </Link>
                    <Link
                      href="/collection/maharaja"
                      className={`font-sans text-sm transition-all duration-200 hover:translate-x-1 ${subtextClass} ${
                        location === "/collection/maharaja" ? "font-medium underline underline-offset-4" : ""
                      }`}
                    >
                      The Maharaja
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* 2. PHILOSOPHY */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.07, duration: 0.3, ease: TRANSITION_EASE }}
            >
              <Link
                href="/philosophy"
                className={`block font-serif text-3xl sm:text-4xl tracking-tight transition-transform duration-300 hover:translate-x-1.5 ${textClass} ${hoverClass}`}
              >
                PHILOSOPHY
              </Link>
            </motion.div>

            {/* 3. HOME */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.11, duration: 0.3, ease: TRANSITION_EASE }}
            >
              <Link
                href="/"
                className={`block font-serif text-3xl sm:text-4xl tracking-tight transition-transform duration-300 hover:translate-x-1.5 ${textClass} ${hoverClass}`}
              >
                HOME
              </Link>
            </motion.div>

            {/* 4. HAYRAT */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.3, ease: TRANSITION_EASE }}
            >
              <Link
                href="/hayrat"
                className={`block font-serif text-3xl sm:text-4xl tracking-tight transition-transform duration-300 hover:translate-x-1.5 ${textClass} ${hoverClass}`}
              >
                HAYRAT
              </Link>
            </motion.div>

            {/* 5. BAG */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.19, duration: 0.3, ease: TRANSITION_EASE }}
            >
              <Link
                href="/cart"
                className={`flex items-baseline justify-between font-serif text-3xl sm:text-4xl tracking-tight transition-transform duration-300 hover:translate-x-1.5 ${textClass} ${hoverClass}`}
              >
                <span>BAG</span>
                {totalCount > 0 && (
                  <span className="font-sans text-xs font-normal opacity-70">
                    ({totalCount})
                  </span>
                )}
              </Link>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
