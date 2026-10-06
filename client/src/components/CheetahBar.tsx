/**
 * CHEETAH BAR: Chrome Hearts Inspired Transparent Dropdown
 * 
 * - Triggered by the Cheetah Paw Logo (top-left)
 * - Drops down directly beneath the Cheetah Paw
 * - 100% TRANSPARENT (no background, no translucent box, no border)
 * - No top header clutter inside the menu
 * - No bottom lines or dubai atelier footer
 * - Strictly the 4 items with first letter capitalized:
 *     1. Collections (hover reveals sub-collections)
 *     2. Retail
 *     3. Hayrat
 *     4. Philosophy
 * - Upright GT Sectra Display
 * - Zero em dashes anywhere
 */
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { playMetallicClick } from "@/lib/soundEffects";

interface CheetahBarProps {
  dark?: boolean;
}

const COLLECTIONS_LIST = [
  { name: "The Gun Collection", href: "/collection/barrel" },
  { name: "The Masquerade", href: "/collection/masquerade" },
  { name: "The Maharaja", href: "/collection/maharaja" },
  { name: "The Savanah", href: "/collection/savanah" },
];

const TRANSITION_EASE = [0.16, 1, 0.3, 1] as const;

export default function CheetahBar({ dark = false }: CheetahBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [collectionsExpanded, setCollectionsExpanded] = useState(false);
  const [location] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<number | null>(null);

  // Auto-close menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setCollectionsExpanded(false);
  }, [location]);

  // Keyboard shortcut: Escape to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    try {
      playMetallicClick();
    } catch {}
    setIsOpen((prev) => !prev);
  };

  const handleMouseEnterCollections = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setCollectionsExpanded(true);
  };

  const handleMouseLeaveCollections = () => {
    hoverTimeoutRef.current = window.setTimeout(() => {
      setCollectionsExpanded(false);
    }, 200);
  };

  const handleLinkClick = () => {
    try {
      playMetallicClick();
    } catch {}
    setIsOpen(false);
    setCollectionsExpanded(false);
  };

  const isCurrentRoute = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  // Paw icon color: white for dark mode/cinema hero, black for light pages
  const pawSrc = dark
    ? "/brand/cheetah-paw-white.png"
    : "/brand/cheetah-paw.png";

  const textPrimary = dark
    ? "text-white/85 hover:text-white"
    : "text-[#0B0B0C]/85 hover:text-[#0B0B0C]";
  const textActive = dark ? "text-white font-bold" : "text-[#0B0B0C] font-bold";
  const subTextColor = dark
    ? "text-white/70 hover:text-white"
    : "text-[#0B0B0C]/65 hover:text-[#0B0B0C]";
  const subTextActive = dark ? "text-white font-medium" : "text-[#0B0B0C] font-medium";

  return (
    <div
      ref={dropdownRef}
      className="fixed top-8 left-8 sm:top-12 sm:left-12 z-50 select-none bg-transparent"
    >
      {/* =================================================================== */}
      {/* 1. CHEETAH PAW LOGO (Trigger)                                       */}
      {/* =================================================================== */}
      <button
        onClick={toggleMenu}
        aria-label={isOpen ? "close navigation" : "open navigation"}
        aria-expanded={isOpen}
        className="group relative flex items-center justify-center p-1.5 -ml-1.5 bg-transparent cursor-pointer focus:outline-none transition-transform duration-200 active:scale-95"
      >
        <div className="relative h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center">
          <img
            src={pawSrc}
            alt="Cheetah Paw"
            className="h-full w-full object-contain opacity-90 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
          />
        </div>
      </button>

      {/* =================================================================== */}
      {/* 2. TRANSPARENT DROP DOWN (Directly beneath cheetah paw logo)        */}
      {/* =================================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: TRANSITION_EASE }}
            className="mt-4 sm:mt-5 bg-transparent p-0 text-left w-max"
          >
            <nav className="flex flex-col space-y-3 sm:space-y-4">
              {/* 1. Collections (Hover dropdown for sub-collections) */}
              <div
                className="flex flex-col"
                onMouseEnter={handleMouseEnterCollections}
                onMouseLeave={handleMouseLeaveCollections}
              >
                <button
                  type="button"
                  onClick={() => {
                    try {
                      playMetallicClick();
                    } catch {}
                    setCollectionsExpanded((prev) => !prev);
                  }}
                  className="flex items-center justify-between group cursor-pointer focus:outline-none w-max"
                >
                  <span
                    className={`font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight transition-all duration-200 group-hover:translate-x-1 ${
                      location.startsWith("/collection") ? textActive : textPrimary
                    }`}
                  >
                    Collections
                  </span>
                </button>

                {/* Sub-collections dropdown */}
                <AnimatePresence>
                  {collectionsExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -4 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -4 }}
                      transition={{ duration: 0.2, ease: TRANSITION_EASE }}
                      className="pl-4 py-2 flex flex-col space-y-2 overflow-hidden"
                    >
                      {COLLECTIONS_LIST.map((col) => {
                        const isActive = isCurrentRoute(col.href);
                        return (
                          <Link
                            key={col.href}
                            href={col.href}
                            onClick={handleLinkClick}
                            className={`font-sans text-xs sm:text-sm tracking-wide transition-all duration-150 hover:translate-x-1 ${
                              isActive ? subTextActive : subTextColor
                            }`}
                          >
                            <span>{col.name}</span>
                            {isActive && (
                              <span className="h-1 w-1 rounded-full bg-[#B8985F] ml-2 inline-block align-middle" />
                            )}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 2. Retail */}
              <div>
                <Link
                  href="/retail"
                  onClick={handleLinkClick}
                  className={`inline-flex items-center font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight transition-all duration-200 hover:translate-x-1 ${
                    isCurrentRoute("/retail") ? textActive : textPrimary
                  }`}
                >
                  <span>Retail</span>
                  {isCurrentRoute("/retail") && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#B8985F] ml-3 inline-block" />
                  )}
                </Link>
              </div>

              {/* 3. Hayrat */}
              <div>
                <Link
                  href="/hayrat"
                  onClick={handleLinkClick}
                  className={`inline-flex items-center font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight transition-all duration-200 hover:translate-x-1 ${
                    isCurrentRoute("/hayrat") ? textActive : textPrimary
                  }`}
                >
                  <span>Hayrat</span>
                  {isCurrentRoute("/hayrat") && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#B8985F] ml-3 inline-block" />
                  )}
                </Link>
              </div>

              {/* 4. Philosophy */}
              <div>
                <Link
                  href="/philosophy"
                  onClick={handleLinkClick}
                  className={`inline-flex items-center font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight transition-all duration-200 hover:translate-x-1 ${
                    isCurrentRoute("/philosophy") ? textActive : textPrimary
                  }`}
                >
                  <span>Philosophy</span>
                  {isCurrentRoute("/philosophy") && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#B8985F] ml-3 inline-block" />
                  )}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
