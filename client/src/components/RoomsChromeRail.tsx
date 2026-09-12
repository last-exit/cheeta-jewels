/**
 * ROOMS CHROME RAIL
 * Left-side permanent ornament for the Exclusive Rooms page.
 *
 * Drawn after the Chrome Hearts silver-gothic vocabulary — stacked cruciform,
 * dagger, fleur-de-lis and scroll motifs, on a brushed-silver gradient against
 * the obsidian salon backdrop. Pure ornament; no navigation.
 */
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Motif bank                                                         */
/*  Each motif is a self-contained inline SVG sized to the rail column. */
/* ------------------------------------------------------------------ */

function FleurDeLis() {
  return (
    <svg
      viewBox="0 0 64 96"
      className="h-24 w-auto"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* central petal */}
      <path d="M32 4 C24 22 24 40 32 60 C40 40 40 22 32 4 Z" />
      {/* outer petals */}
      <path d="M32 36 C20 28 12 32 6 50 C16 52 26 48 32 42" />
      <path d="M32 36 C44 28 52 32 58 50 C48 52 38 48 32 42" />
      {/* base scrollwork */}
      <path d="M14 60 C18 70 24 76 32 80 C40 76 46 70 50 60" />
      <path d="M14 60 C10 64 6 62 4 56" />
      <path d="M50 60 C54 64 58 62 60 56" />
      {/* pinstripe down the spine */}
      <path d="M32 14 L32 76" />
    </svg>
  );
}

function Crucifix() {
  return (
    <svg
      viewBox="0 0 48 80"
      className="h-20 w-auto"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* main vertical */}
      <path d="M24 4 L24 76" />
      {/* crossbar */}
      <path d="M8 22 L40 22" />
      <path d="M10 28 L38 28" />
      {/* trefoil finials */}
      <path d="M24 4 C20 10 28 10 24 4" />
      <path d="M8 22 C4 28 12 28 8 22" />
      <path d="M40 22 C36 28 44 28 40 22" />
      {/* base block */}
      <path d="M14 70 L34 70" />
      <path d="M16 76 L32 76" />
      {/* small diamonds on arms */}
      <path d="M24 14 L28 18 L24 22 L20 18 Z" />
      <path d="M24 36 L28 40 L24 44 L20 40 Z" />
    </svg>
  );
}

function Dagger() {
  return (
    <svg
      viewBox="0 0 32 96"
      className="h-24 w-auto"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* blade */}
      <path d="M16 2 L16 56" />
      <path d="M14 8 L18 8" />
      <path d="M14 18 L18 18" />
      <path d="M14 28 L18 28" />
      <path d="M14 38 L18 38" />
      <path d="M14 48 L18 48" />
      {/* crossguard */}
      <path d="M2 60 L30 60" />
      <path d="M2 64 L30 64" />
      <path d="M2 60 C0 64 0 66 4 68" />
      <path d="M30 60 C32 64 32 66 28 68" />
      {/* grip */}
      <path d="M14 68 L18 68 L18 86 L14 86 Z" />
      <path d="M14 72 L18 72" />
      <path d="M14 78 L18 78" />
      <path d="M14 84 L18 84" />
      {/* pommel */}
      <path d="M10 88 L22 88" />
      <path d="M12 92 L20 92" />
    </svg>
  );
}

function ScrollLeaf() {
  return (
    <svg
      viewBox="0 0 80 24"
      className="h-4 w-16"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
    >
      <path d="M2 12 C20 4 32 20 40 12 C48 4 60 20 78 12" />
      <path d="M6 12 C20 8 28 16 40 12" />
      <path d="M40 12 C52 8 60 16 74 12" />
    </svg>
  );
}

function Horseshoe() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-10 w-10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 18 C6 8 14 4 24 4 C34 4 42 8 42 18 L42 32 L36 32 L36 18 C36 12 32 10 24 10 C16 10 12 12 12 18 L12 32 L6 32 Z" />
      {/* nail holes */}
      <circle cx="12" cy="20" r="1.2" fill="currentColor" />
      <circle cx="24" cy="20" r="1.2" fill="currentColor" />
      <circle cx="36" cy="20" r="1.2" fill="currentColor" />
    </svg>
  );
}

function Diamond() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-2.5 w-2.5"
      fill="currentColor"
    >
      <path d="M8 0 L16 8 L8 16 L0 8 Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Rail                                                               */
/* ------------------------------------------------------------------ */

export default function RoomsChromeRail() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="fixed top-0 left-0 z-30 h-screen w-20 md:w-24 flex flex-col items-center justify-between py-6 md:py-8 select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* brushed-silver panel behind the ornaments */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(40,32,26,0.55) 0%, rgba(26,20,16,0.0) 70%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      {/* brushed-silver gradient hairline along the inner edge */}
      <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-[#B8B8B8]/40 to-transparent" />

      {/* =============== TOP CLUSTER =============== */}
      <div className="flex flex-col items-center gap-3 text-[#D6D2C8]">
        <FleurDeLis />
        <ScrollLeaf />
        <Crucifix />
        <div className="mt-1 flex flex-col items-center gap-2 text-[#A8A39A]">
          <Diamond />
          <Diamond />
          <Diamond />
        </div>
      </div>

      {/* =============== MIDDLE INSCRIPTION =============== */}
      <div className="flex flex-col items-center gap-4">
        {/* Upper flanking ornament */}
        <div className="flex flex-col items-center gap-2 text-[#A8A39A]">
          <Horseshoe />
          <div className="h-6 w-px bg-gradient-to-b from-[#B8B8B8]/55 to-transparent" />
        </div>

        {/* Vertical pinstripe inscription — Chrome Hearts style */}
        <div className="flex items-stretch gap-2">
          <span className="font-serif text-[10px] tracking-[0.4em] text-[#A8A39A]/70 [writing-mode:vertical-rl] rotate-180 self-center">
            EST · MMXXVI
          </span>
          <div className="flex flex-col items-center gap-3 self-center">
            <span
              className="font-serif text-[11px] uppercase tracking-[0.55em] text-[#D6D2C8]/90 [writing-mode:vertical-rl]"
              style={{ letterSpacing: "0.55em" }}
            >
              CHEETAH · JEWELZ
            </span>
            <span
              className="font-serif text-[9px] uppercase tracking-[0.42em] text-[#A8A39A]/75 [writing-mode:vertical-rl]"
            >
              DUBAI · ATELIER
            </span>
          </div>
          <span className="font-serif text-[10px] tracking-[0.4em] text-[#A8A39A]/70 [writing-mode:vertical-rl] self-center">
            № · 001
          </span>
        </div>

        {/* Lower flanking ornament */}
        <div className="flex flex-col items-center gap-2 text-[#A8A39A]">
          <div className="h-6 w-px bg-gradient-to-t from-[#B8B8B8]/55 to-transparent" />
          <Horseshoe />
        </div>
      </div>

      {/* =============== BOTTOM CLUSTER =============== */}
      <div className="flex flex-col items-center gap-3 text-[#D6D2C8]">
        <div className="flex flex-col items-center gap-2 text-[#A8A39A]">
          <Diamond />
          <Diamond />
          <Diamond />
        </div>
        <Dagger />
        <ScrollLeaf />
        <FleurDeLis />
      </div>
    </motion.aside>
  );
}
