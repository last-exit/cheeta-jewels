/**
 * TOP NAV — Transparent over hero, becomes solid ivory on scroll.
 * Centered wordmark, hover dropdowns for grouped links, mobile full-screen menu.
 */
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const NAV_GROUPS: { label: string; href?: string; children?: { label: string; href: string; sub?: string }[] }[] = [
  {
    label: "Shop",
    children: [
      { label: "The 100", href: "/retail", sub: "Numbered 001—100" },
      { label: "The Double Barrel 01", href: "/product/double-barrel-01" },
      { label: "The Double Barrel 02", href: "/product/double-barrel-02" },
      { label: "The Double Barrel 03", href: "/product/double-barrel-03" },
    ],
  },
  {
    label: "Salons",
    href: "/rooms",
  },
  {
    label: "The Founder",
    href: "/founder",
  },
];

export default function TopNav() {
  const { totalCount } = useCart();
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  // Close on route change
  useEffect(() => {
    setOpenGroup(null);
    setMobileOpen(false);
  }, [location]);

  // Close on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openGroupWithDelay = (label: string) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenGroup(label);
  };

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenGroup(null), 120);
  };

  return (
    <>
      {/* NAV BAR */}
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(244,241,232,0.94)" : "rgba(244,241,232,0)",
          color: scrolled ? "#1A1410" : "#F4F1E8",
          borderBottomColor: scrolled ? "rgba(26,20,16,0.08)" : "rgba(244,241,232,0)",
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md"
        style={{ borderBottomWidth: "1px", borderBottomStyle: "solid" }}
      >
        <nav
          className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between"
          aria-label="Primary"
        >
          {/* Left: mobile menu trigger */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="md:hidden p-2 -ml-2"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>

          {/* Left: desktop shop dropdown trigger (or first group) */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_GROUPS.slice(0, 1).map((group) =>
              group.children ? (
                <div
                  key={group.label}
                  className="relative h-20 flex items-center"
                  onMouseEnter={() => openGroupWithDelay(group.label)}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    onFocus={() => openGroupWithDelay(group.label)}
                    onBlur={scheduleClose}
                    className="font-sans text-[11px] uppercase tracking-[0.28em] flex items-center gap-1"
                    aria-expanded={openGroup === group.label}
                  >
                    {group.label}
                    <span className="text-[9px] opacity-50">▾</span>
                  </button>
                </div>
              ) : (
                <Link
                  key={group.label}
                  href={group.href!}
                  className="font-sans text-[11px] uppercase tracking-[0.28em]"
                >
                  {group.label}
                </Link>
              )
            )}
            {NAV_GROUPS.slice(1).map((group) => (
              <Link
                key={group.label}
                href={group.href!}
                className="font-sans text-[11px] uppercase tracking-[0.28em]"
              >
                {group.label}
              </Link>
            ))}
          </div>

          {/* Center: wordmark */}
          <Link
            href="/"
            aria-label="Cheetah Jewelz — Home"
            className="font-serif text-xl md:text-2xl tracking-tight absolute left-1/2 -translate-x-1/2"
          >
            Cheetah Jewelz
          </Link>

          {/* Right: bag */}
          <Link
            href="/cart"
            aria-label={`Bag (${totalCount})`}
            className="flex items-center gap-2 p-2 -mr-2"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            <span className="font-sans text-[11px] tabular-nums">
              {totalCount > 0 ? `(${totalCount})` : ""}
            </span>
          </Link>
        </nav>
      </motion.header>

      {/* SHOP DROPDOWN PANEL */}
      <AnimatePresence>
        {openGroup === "Shop" && (
          <motion.div
            key="shop-dd"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => openGroupWithDelay("Shop")}
            onMouseLeave={scheduleClose}
            className="fixed top-16 md:top-20 left-0 right-0 z-30 bg-[#F4F1E8]/96 backdrop-blur-md border-b border-[#1A1410]/10"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
              {NAV_GROUPS[0].children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="group flex items-baseline justify-between border-b border-[#1A1410]/10 py-4 hover:border-[#6B1A2C] transition-colors"
                >
                  <div>
                    <div className="font-serif text-2xl md:text-3xl tracking-tight text-[#1A1410] group-hover:text-[#6B1A2C] transition-colors">
                      {child.label}
                    </div>
                    {child.sub && (
                      <div className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#1A1410]/45 mt-1">
                        {child.sub}
                      </div>
                    )}
                  </div>
                  <div className="text-[#1A1410]/30 group-hover:text-[#6B1A2C] transition-colors text-xl">↗</div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#F4F1E8] text-[#1A1410] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-[#1A1410]/10">
              <span className="font-serif text-xl tracking-tight">Cheetah Jewelz</span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="p-2 -mr-2"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-10 space-y-10">
              {NAV_GROUPS.map((group) => (
                <div key={group.label}>
                  {group.href ? (
                    <Link
                      href={group.href}
                      className="font-serif text-4xl tracking-tight block"
                      onClick={() => setMobileOpen(false)}
                    >
                      {group.label}
                    </Link>
                  ) : (
                    <>
                      <div className="font-sans text-[10px] uppercase tracking-[0.28em] text-[#1A1410]/45 mb-4">
                        {group.label}
                      </div>
                      <div className="space-y-5">
                        {group.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block font-serif text-2xl tracking-tight"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
