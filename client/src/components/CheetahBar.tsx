/**
 * CHEETAH BAR — Minimalist Vertical Navigation (Left Side)
 * High-Fashion Editorial / Gentle Monster + Chrome Hearts
 * Transparent, semi-blurred floating bar that expands into a perfectly aligned luxury menu.
 */
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { code: "01", label: "Home", href: "/" },
  { code: "02", label: "Exclusive Rooms", href: "/exclusive-rooms" },
  { code: "03", label: "Retail", href: "/retail" },
  { code: "04", label: "Philosophy", href: "/philosophy" },
];

export default function CheetahBar({ dark = false }: { dark?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* 1. Fixed Left Vertical Bar (Transparent / Semi-Blurred) */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-16 md:w-20 border-r transition-all duration-500 flex flex-col justify-between items-center py-8 select-none ${
          dark
            ? "bg-black/25 backdrop-blur-md border-white/10 text-white"
            : "bg-white/20 backdrop-blur-md border-black/10 text-[#111111]"
        }`}
        aria-label="Sidebar Navigation"
      >
        {/* Top: Iconic Cheetah / CJ Mark (Trigger) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="group relative flex flex-col items-center justify-center p-2 focus:outline-none cursor-pointer"
        >
          <div className="relative h-10 w-10 md:h-12 md:w-12 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105">
            <img
              src="/manus-storage/cheeta-cj-official_8dcc9825.png"
              alt="Cheeta Jewels"
              className={`h-full w-full object-contain transition-all duration-300 ${
                dark
                  ? "brightness-0 invert opacity-90 group-hover:opacity-100"
                  : "opacity-85 group-hover:opacity-100"
              }`}
            />
          </div>
          <span className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] opacity-60 group-hover:opacity-100 transition-opacity">
            {isOpen ? "Close" : "Menu"}
          </span>
        </button>

        {/* Center: Vertical Brand Line */}
        <div className="flex flex-col items-center gap-3">
          <div className={`h-12 w-[1px] ${dark ? "bg-white/20" : "bg-black/15"}`} />
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] -rotate-90 my-6 opacity-45">
            CHEETA
          </span>
          <div className={`h-12 w-[1px] ${dark ? "bg-white/20" : "bg-black/15"}`} />
        </div>

        {/* Bottom: Minimal Status Dot */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className="group flex flex-col items-center p-2 cursor-pointer"
        >
          <div
            className={`h-2 w-2 rounded-full border transition-all duration-300 ${
              dark
                ? "border-white/60 group-hover:bg-white"
                : "border-black/60 group-hover:bg-black"
            } ${isOpen ? "scale-125 bg-current" : ""}`}
          />
        </button>
      </aside>

      {/* 2. Expanded Menu Panel (Weighted, Semi-Blurred Frosted Glass) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Backdrop with Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Menu Drawer */}
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 z-50 h-screen w-full max-w-[500px] bg-[#0C0C0C]/90 backdrop-blur-2xl text-[#F4F4F0] border-r border-white/10 shadow-2xl flex flex-col justify-between p-8 sm:p-12 md:p-14 pl-20 sm:pl-28 md:pl-32 select-none"
              role="dialog"
              aria-label="Site Navigation"
            >
              {/* Header: Brand + Close */}
              <div className="flex items-center justify-between border-b border-white/15 pb-6">
                <div className="flex items-center gap-3">
                  <img
                    src="/manus-storage/cheeta-cj-official_8dcc9825.png"
                    alt="Cheeta Jewels"
                    className="h-6 w-6 object-contain brightness-0 invert opacity-90"
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/70">
                    CHEETA JEWELS
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  CLOSE [ESC]
                </button>
              </div>

              {/* Navigation Links — Perfectly Aligned & No Line-Wrapping */}
              <div className="flex flex-col gap-7 my-auto py-6">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = location === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.08 + index * 0.06,
                        duration: 0.45,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center justify-between py-1 cursor-pointer"
                      >
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono text-[11px] tracking-[0.18em] text-white/40 group-hover:text-white/80 transition-colors">
                            {item.code}
                          </span>
                          <span
                            className={`font-serif text-[clamp(1.75rem,3.2vw,2.6rem)] leading-none tracking-[-0.02em] whitespace-nowrap transition-all duration-300 group-hover:translate-x-1.5 ${
                              isActive
                                ? "text-white font-medium italic"
                                : "text-white/75 group-hover:text-white"
                            }`}
                          >
                            {item.label}
                          </span>
                        </div>
                        <div className="h-[1px] w-6 bg-white/20 group-hover:w-10 group-hover:bg-white transition-all duration-300" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer / Location */}
              <div className="border-t border-white/15 pt-6 flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
                <div className="flex justify-between items-center">
                  <span>Dubai</span>
                  <span>2026</span>
                </div>
                <div className="text-[9px] text-white/35">
                  Private installation.
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
