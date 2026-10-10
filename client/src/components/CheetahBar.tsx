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
  const menuHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isHome = location === "/";

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

  // Dynamic scroll detection: fade text and paw from white into deep black (#2A241D)
  // as user scrolls down from the dark hero cinema into the light character select region.
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!isHome && !dark) {
      setScrollProgress(1); // subpages with light background are always dark text
      return;
    }
    if (!isHome && dark && location === "/film") {
      setScrollProgress(0); // pure dark pages like /film are always white text
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Start fading immediately as user leaves hero top (scrollY >= 40)
      // and complete the fade to black well before character select reaches under menu (scrollY <= 360)
      const start = 40;
      const end = Math.min(360, window.innerHeight * 0.42);
      const progress = Math.min(1, Math.max(0, (scrollY - start) / (end - start)));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, dark, location]);

  // Calculate dynamic RGB color for text:
  // Starts at pure white rgb(255, 255, 255) at scrollY=0
  // Fades continuously to rich obsidian rgb(42, 36, 29) as you scroll down
  const r = Math.round(255 - scrollProgress * (255 - 42));
  const g = Math.round(255 - scrollProgress * (255 - 36));
  const b = Math.round(255 - scrollProgress * (255 - 29));
  const dynamicTextColor = `rgb(${r}, ${g}, ${b})`;
  const dynamicSubTextColor = `rgba(${r}, ${g}, ${b}, ${0.72 - scrollProgress * 0.05})`;

  // Hover triggers for paw and dropdown menu
  const handleMouseEnter = () => {
    if (menuHoverTimeoutRef.current) {
      clearTimeout(menuHoverTimeoutRef.current);
      menuHoverTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (menuHoverTimeoutRef.current) {
      clearTimeout(menuHoverTimeoutRef.current);
    }
    // Generous 380ms grace window ensures smooth, natural mouse navigation without abrupt drops
    menuHoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setCollectionsExpanded(false);
    }, 380);
  };

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
    }, 240);
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

  return (
    <div
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed top-8 left-8 sm:top-12 sm:left-12 z-50 select-none bg-transparent"
    >
      {/* =================================================================== */}
      {/* 1. CHEETAH PAW LOGO (Hover Dropdown Trigger & Scroll Crossfade)     */}
      {/* =================================================================== */}
      <button
        onClick={toggleMenu}
        onMouseEnter={handleMouseEnter}
        aria-label={isOpen ? "close navigation menu" : "open navigation menu"}
        aria-expanded={isOpen}
        className="group relative flex items-center justify-center p-2.5 -ml-2.5 bg-transparent cursor-pointer focus:outline-none transition-transform duration-300 active:scale-95"
      >
        <div className="relative h-8.5 w-8.5 sm:h-9.5 sm:w-9.5 flex items-center justify-center">
          {/* White Paw (for dark hero cinema) */}
          <motion.img
            src="/brand/cheetah-paw-white.png"
            alt="Cheetah Jewels"
            style={{ opacity: 1 - scrollProgress }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{
              scale: { repeat: Infinity, duration: 3, ease: "easeInOut" },
            }}
            className="absolute inset-0 h-full w-full object-contain pointer-events-none select-none drop-shadow-sm transition-transform duration-300 group-hover:scale-115"
          />

          {/* Dark Paw (fades in as user scrolls down into character select region) */}
          <motion.img
            src="/brand/cheetah-paw.png"
            alt="Cheetah Jewels"
            style={{ opacity: scrollProgress }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{
              scale: { repeat: Infinity, duration: 3, ease: "easeInOut" },
            }}
            className="absolute inset-0 h-full w-full object-contain pointer-events-none select-none drop-shadow-sm transition-transform duration-300 group-hover:scale-115"
          />
        </div>
      </button>

      {/* =================================================================== */}
      {/* 2. TRANSPARENT DROP DOWN (Directly beneath cheetah paw logo)        */}
      {/* =================================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: TRANSITION_EASE }}
            onMouseEnter={handleMouseEnter}
            className="pt-3 sm:pt-4 bg-transparent p-0 text-left w-max relative"
          >
            {/* Subtle Silk-Lined Cheetah Rosettes Watermark behind menu */}
            <svg
              aria-label="Cheeta Atelier Signature Mark"
              className="absolute -top-1 -left-2 w-48 sm:w-56 h-auto pointer-events-none select-none opacity-[0.038] hover:opacity-[0.14] hover:text-[#B8860B] transition-all duration-700 ease-out z-0"
              style={{ color: dynamicTextColor }}
              viewBox="0 0 220 200"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M40,32 C44,22 56,18 66,22 C58,28 56,36 60,44 C50,42 42,38 40,32 Z" />
              <path d="M72,25 C82,28 88,38 85,48 C78,43 73,45 68,40 C70,33 69,28 72,25 Z" />
              <path d="M56,50 C64,53 74,51 80,46 C76,53 68,57 60,56 C54,54 53,51 56,50 Z" />
              <ellipse cx="102" cy="35" rx="4" ry="3.2" transform="rotate(25 102 35)" />
              <ellipse cx="34" cy="58" rx="3" ry="4" transform="rotate(-15 34 58)" />
              <ellipse cx="94" cy="62" rx="3" ry="2.5" />

              <path d="M110,65 C115,54 128,51 138,56 C130,61 128,71 133,78 C122,76 113,72 110,65 Z" />
              <path d="M144,59 C154,64 157,75 154,85 C147,80 144,82 139,77 C141,70 141,64 144,59 Z" />
              <path d="M124,83 C132,86 142,85 150,80 C145,87 137,92 129,90 C123,88 122,85 124,83 Z" />
              <ellipse cx="115" cy="105" rx="3.5" ry="2.8" transform="rotate(30 115 105)" />
              <ellipse cx="165" cy="72" rx="2.8" ry="3.2" transform="rotate(-20 165 72)" />
            </svg>

            <nav className="relative z-10 flex flex-col space-y-3 sm:space-y-4">
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
                    style={{ color: dynamicTextColor }}
                    className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight transition-all duration-200 group-hover:translate-x-1"
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
                            style={{
                              color: isActive ? dynamicTextColor : dynamicSubTextColor,
                            }}
                            className="font-sans text-xs sm:text-sm tracking-wide transition-all duration-150 hover:translate-x-1 hover:opacity-100"
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
                  style={{ color: dynamicTextColor }}
                  className="inline-flex items-center font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight transition-all duration-200 hover:translate-x-1"
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
                  style={{ color: dynamicTextColor }}
                  className="inline-flex items-center font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight transition-all duration-200 hover:translate-x-1"
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
                  style={{ color: dynamicTextColor }}
                  className="inline-flex items-center font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight transition-all duration-200 hover:translate-x-1"
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
