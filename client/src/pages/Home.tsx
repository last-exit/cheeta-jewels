/**
 * HOMEPAGE — CHEETA JEWELS / ICON LIVIN
 * Radical luxury minimalism:
 * - STRIPPED: Zero subtext, zero AI cards, zero button clutter.
 * - Center: ONLY the authentic handwritten script "Icon livin'" logo.
 * - Full-bleed campaign cinema with click-to-switch campaign videos.
 * - Chrome Hearts CheetahBar is the sole navigation element.
 */
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import CheetahBar from "@/components/CheetahBar";
import GoldParticleEngine from "@/components/GoldParticleEngine";
import { COLLECTIONS, COLLECTION_ORDER } from "@/data/collections";
import { playMetallicClick } from "@/lib/soundEffects";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function Home() {
  const [heroSlide, setHeroSlide] = useState(0);

  const handleSwitchVideo = () => {
    try {
      playMetallicClick();
    } catch {}
    setHeroSlide((prev) => (prev + 1) % COLLECTION_ORDER.length);
  };

  const currentId = COLLECTION_ORDER[heroSlide];
  const currentCollection = COLLECTIONS[currentId];

  return (
    <main
      onClick={handleSwitchVideo}
      className="relative w-full h-screen overflow-hidden bg-black text-white select-none cursor-pointer"
      title="Click anywhere to switch campaign film"
    >
      {/* Floating Chrome Hearts Style Sidebar Trigger */}
      <div onClick={(e) => e.stopPropagation()}>
        <CheetahBar dark />
      </div>

      {/* Campaign Cinema Videos (Click anywhere on screen to toggle) */}
      {COLLECTION_ORDER.map((id, idx) => {
        const col = COLLECTIONS[id];
        const isActive = heroSlide === idx;
        return (
          <video
            key={id}
            autoPlay
            loop
            muted
            playsInline
            poster={col.campaign}
            className={`absolute inset-0 h-full w-full object-cover object-center filter brightness-[0.72] contrast-[1.12] transition-opacity duration-1000 ease-in-out pointer-events-none ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={col.video} type="video/mp4" />
          </video>
        );
      })}

      {/* Atmospheric Film Texture & Ambient Gold Motes */}
      <div className="absolute inset-0 pointer-events-none film-grain opacity-35" />
      <GoldParticleEngine
        particleCount={20}
        className="absolute inset-0 pointer-events-none z-10 opacity-30"
      />

      {/* Center: STRIPPED — ONLY Authentic Handwritten "Icon livin'" Script Logo */}
      <div className="relative z-20 h-full w-full flex flex-col items-center justify-center p-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE_OUT }}
          className="w-full max-w-[340px] sm:max-w-[440px] md:max-w-[540px] flex items-center justify-center select-none"
        >
          <img
            src="/brand/icon-livin-white.png"
            alt="Icon livin'"
            className="w-full h-auto object-contain filter drop-shadow-[0_12px_32px_rgba(0,0,0,0.85)]"
          />
        </motion.div>
      </div>

      {/* Bottom Floating Click Indicators — Minimal & Pure */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-8 sm:bottom-12 inset-x-0 z-30 flex items-center justify-between px-8 sm:px-16 pointer-events-auto max-w-7xl mx-auto"
      >
        {/* Collection Label */}
        <AnimatePresence mode="wait">
          <motion.span
            key={currentCollection.title}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            className="font-sans text-[11px] uppercase tracking-[0.24em] text-white/70"
          >
            {currentCollection.title}
          </motion.span>
        </AnimatePresence>

        {/* Clickable Segment Switches */}
        <div className="flex items-center gap-3">
          {COLLECTION_ORDER.map((id, idx) => {
            const isActive = heroSlide === idx;
            return (
              <button
                key={id}
                onClick={() => {
                  try {
                    playMetallicClick();
                  } catch {}
                  setHeroSlide(idx);
                }}
                aria-label={`Switch to video ${idx + 1}`}
                className="group py-2 px-1 cursor-pointer focus:outline-none"
              >
                <div
                  className={`rounded-full transition-all duration-500 ${
                    isActive
                      ? "w-8 h-[2px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                      : "w-3 h-[2px] bg-white/30 group-hover:bg-white/60"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Counter */}
        <span className="font-sans text-[11px] tracking-[0.2em] text-white/50">
          0{heroSlide + 1} / 0{COLLECTION_ORDER.length}
        </span>
      </div>
    </main>
  );
}
