/**
 * HOMEPAGE — CHEETA JEWELS / ICON LIVIN
 * - Hero: Pure campaign cinema with ONLY handwritten script "Icon livin'" logo
 * - Zero clutter on hero: NO "The Gun Collection" written, NO 01/02 counter
 * - Character Select (Lookbook) appears upon scrolling down
 * - All typography: GT Sectra Display & GT America with zero fake-monospace tracking
 * - Official CJ logo floating sidebar trigger
 */
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import React, { useState } from "react";
import { Link } from "wouter";
import CheetahBar from "@/components/CheetahBar";
import GoldParticleEngine from "@/components/GoldParticleEngine";
import { useCart } from "@/contexts/CartContext";
import { COLLECTIONS, COLLECTION_ORDER } from "@/data/collections";
import { playMetallicClick, playVaultAcquisition } from "@/lib/soundEffects";
import { toast } from "sonner";

interface ModelCharacter {
  id: string;
  romanNumeral: string;
  editionNumber: string;
  name: string;
  frame: string;
  lens: string;
  price: number;
  priceDisplay: string;
  modelImage: string;
  specimenImage: string;
  batch: string;
  craftHallmark: string;
  gemsHallmark: string;
  opticsHallmark: string;
  weight: string;
  slug: string;
}

const CHARACTERS: ModelCharacter[] = [
  {
    id: "barrel-01",
    romanNumeral: "I",
    editionNumber: "01",
    name: "The Double Barrel 01",
    frame: "18K Brushed Gold",
    lens: "Custom Ruby Mineral Lenses",
    price: 15000,
    priceDisplay: "AED 15,000",
    modelImage: "/manus-storage/model-cutout-01-transparent.png",
    specimenImage: "/manus-storage/cheeta-double-barrel-hero_c55a3dea.png",
    batch: "50 Pieces Worldwide",
    craftHallmark: "18K Brushed Solid Gold",
    gemsHallmark: "Hand-Set Emerald Cabochons",
    opticsHallmark: "Ruby Mineral Crystal",
    weight: "48.2g Solid Mass",
    slug: "double-barrel-01",
  },
  {
    id: "barrel-02",
    romanNumeral: "II",
    editionNumber: "02",
    name: "The Double Barrel 02",
    frame: "Gunmetal Obsidian",
    lens: "Polarized Smoke Mineral Lenses",
    price: 15000,
    priceDisplay: "AED 15,000",
    modelImage: "/manus-storage/model-cutout-02-transparent.png",
    specimenImage: "/manus-storage/cheeta-double-barrel-gunmetal.jpg",
    batch: "50 Pieces Worldwide",
    craftHallmark: "PVD Obsidian Titanium",
    gemsHallmark: "Hand-Set Emerald Cabochons",
    opticsHallmark: "Polarized Smoke Crystal",
    weight: "48.2g Solid Mass",
    slug: "double-barrel-02",
  },
  {
    id: "barrel-03",
    romanNumeral: "III",
    editionNumber: "03",
    name: "The Double Barrel 03",
    frame: "Antique Bronze",
    lens: "Amber Gradient Mineral Lenses",
    price: 15000,
    priceDisplay: "AED 15,000",
    modelImage: "/manus-storage/model-cutout-03-transparent.png",
    specimenImage: "/manus-storage/cheeta-double-barrel-bronze.jpg",
    batch: "50 Pieces Worldwide",
    craftHallmark: "Patinated Antique Bronze",
    gemsHallmark: "Hand-Set Emerald Cabochons",
    opticsHallmark: "Amber Gradient Crystal",
    weight: "48.2g Solid Mass",
    slug: "double-barrel-03",
  },
];

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function Home() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [heroSlide, setHeroSlide] = useState(0);
  const [perspective, setPerspective] = useState<"specimen" | "silhouette">("specimen");
  const { addToCart } = useCart();
  const current = CHARACTERS[selectedIdx];

  const handleSwitchVideo = () => {
    try {
      playMetallicClick();
    } catch {}
    setHeroSlide((prev) => (prev + 1) % COLLECTION_ORDER.length);
  };

  const handleAddToCart = (item: ModelCharacter) => {
    try {
      playVaultAcquisition();
    } catch {}
    addToCart({
      id: item.id,
      name: item.name,
      frame: item.frame,
      lens: item.lens,
      price: item.price,
      priceDisplay: item.priceDisplay,
      image: perspective === "specimen" ? item.specimenImage : item.modelImage,
    });
    toast.success(`${item.name} acquired.`, {
      description: `${item.frame} · ${item.priceDisplay}`,
    });
  };

  const handleSelectCharacter = (idx: number) => {
    try {
      playMetallicClick();
    } catch {}
    setSelectedIdx(idx);
  };

  const handleTogglePerspective = (mode: "specimen" | "silhouette") => {
    try {
      playMetallicClick();
    } catch {}
    setPerspective(mode);
  };

  return (
    <main className="relative w-full min-h-screen bg-[#FFFFFF] text-[#000000] selection:bg-[#000000] selection:text-[#FFFFFF]">
      {/* Floating Official CJ Logo Sidebar Trigger */}
      <CheetahBar dark />

      {/* ========================================================================= */}
      {/* 1. HERO — STRIPPED FULL-BLEED CAMPAIGN CINEMA                             */}
      {/* Zero text except center "Icon livin'" script logo. No counter, no label.  */}
      {/* ========================================================================= */}
      <section
        onClick={handleSwitchVideo}
        className="relative h-screen w-full overflow-hidden bg-black text-white flex flex-col items-center justify-center p-6 select-none cursor-pointer"
        title="Click anywhere to switch campaign film"
      >
        {/* Campaign Cinema Videos */}
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
              className={`absolute inset-0 h-full w-full object-cover object-center filter brightness-[0.75] contrast-[1.1] transition-opacity duration-1000 ease-in-out pointer-events-none ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              <source src={col.video} type="video/mp4" />
            </video>
          );
        })}

        {/* Atmospheric Film Texture & Subtle Particles */}
        <div className="absolute inset-0 pointer-events-none film-grain opacity-30" />
        <GoldParticleEngine
          particleCount={20}
          className="absolute inset-0 pointer-events-none z-10 opacity-30"
        />

        {/* Center: STRIPPED — ONLY Handwritten "Icon livin'" Script Logo */}
        <div className="relative z-20 w-full max-w-[340px] sm:max-w-[440px] md:max-w-[540px] flex items-center justify-center pointer-events-none">
          <motion.img
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE_OUT }}
            src="/brand/icon-livin-white.png"
            alt="Icon livin'"
            className="w-full h-auto object-contain filter drop-shadow-[0_12px_32px_rgba(0,0,0,0.85)]"
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE DUAL-PERSPECTIVE ATELIER — EYEWEAR SHOWCASE                        */}
      {/* Pure white canvas, zero card borders, GT Sectra & GT America typography    */}
      {/* ========================================================================= */}
      <section
        id="characters"
        className="relative min-h-screen w-full bg-[#FFFFFF] py-24 md:py-36 px-6 md:px-20 pl-16 md:pl-28 flex flex-col justify-center select-none overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full relative">
          {/* Architectural Watermark — Monumental Roman Numeral */}
          <div className="absolute -top-12 sm:-top-20 left-1/2 -translate-x-1/2 md:left-1/3 md:-translate-x-1/2 pointer-events-none select-none z-0">
            <AnimatePresence mode="wait">
              <motion.span
                key={current.romanNumeral}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
                className="font-serif text-[240px] sm:text-[360px] md:text-[460px] lg:text-[540px] text-[#4A0E16]/[0.035] leading-none select-none block"
              >
                {current.romanNumeral}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Section Header Controls — Status & Perspective Switcher */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-12">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A0E16]" />
              <span className="font-sans text-xs tracking-wider uppercase text-black/50 font-normal">
                Atelier Archive · {current.batch}
              </span>
            </div>

            {/* Dual-Perspective Switcher Pill */}
            <div className="inline-flex items-center p-1 bg-black/[0.04] rounded-full border border-black/5">
              <button
                type="button"
                onClick={() => handleTogglePerspective("specimen")}
                className={`px-4 py-1.5 rounded-full font-sans text-xs transition-all cursor-pointer ${
                  perspective === "specimen"
                    ? "bg-black text-white font-medium shadow-sm"
                    : "text-black/55 hover:text-black font-normal"
                }`}
              >
                Specimen
              </button>
              <button
                type="button"
                onClick={() => handleTogglePerspective("silhouette")}
                className={`px-4 py-1.5 rounded-full font-sans text-xs transition-all cursor-pointer ${
                  perspective === "silhouette"
                    ? "bg-black text-white font-medium shadow-sm"
                    : "text-black/55 hover:text-black font-normal"
                }`}
              >
                Silhouette
              </button>
            </div>
          </div>

          {/* Main Visual & Dossier Stage */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Primary Visual Stage (Specimen / Silhouette) */}
            <div className="lg:col-span-7 relative h-[420px] sm:h-[540px] md:h-[640px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {perspective === "specimen" ? (
                  <motion.div
                    key={`specimen-${current.id}`}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                    className="h-full w-full flex items-center justify-center p-4 relative"
                  >
                    <img
                      src={current.specimenImage}
                      alt={`${current.name} fine jewelry specimen`}
                      className="max-h-[85%] max-w-full object-contain pointer-events-none mix-blend-multiply drop-shadow-[0_28px_48px_rgba(0,0,0,0.12)] filter contrast-[1.03]"
                    />
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-sans text-[11px] text-black/40 font-normal tracking-wide">
                      Isolated Fine Jewelry Macro
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`silhouette-${current.id}`}
                    initial={{ opacity: 0, scale: 0.96, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -10 }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                    className="h-full w-full flex items-center justify-center p-4 relative"
                  >
                    <img
                      src={current.modelImage}
                      alt={`${current.name} on figure`}
                      className="max-h-full max-w-full object-contain pointer-events-none drop-shadow-[0_24px_40px_rgba(0,0,0,0.06)]"
                    />
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-sans text-[11px] text-black/40 font-normal tracking-wide">
                      Lookbook Character Silhouette
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Editorial Hallmarks & Acquisition Dossier */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-7">
              <div>
                <span className="font-serif text-3xl text-[#4A0E16] block mb-2 font-normal">
                  {current.romanNumeral}
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#000000] leading-[1.05]">
                  {current.name}
                </h2>
                <p className="font-sans text-sm sm:text-base text-[#000000]/60 mt-2 font-normal">
                  {current.frame} · {current.lens}
                </p>

                {/* Micro-Provenance Dossier — Lineless Archival Hallmarks */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 pt-6 text-xs font-sans">
                  <div>
                    <span className="text-black/40 block font-normal text-[11px]">Metallurgy</span>
                    <span className="text-black/85 font-medium mt-0.5 block">{current.craftHallmark}</span>
                  </div>
                  <div>
                    <span className="text-black/40 block font-normal text-[11px]">Gemstone Inlay</span>
                    <span className="text-black/85 font-medium mt-0.5 block">{current.gemsHallmark}</span>
                  </div>
                  <div>
                    <span className="text-black/40 block font-normal text-[11px]">Mineral Optics</span>
                    <span className="text-black/85 font-medium mt-0.5 block">{current.opticsHallmark}</span>
                  </div>
                  <div>
                    <span className="text-black/40 block font-normal text-[11px]">Calibrated Weight</span>
                    <span className="text-black/85 font-medium mt-0.5 block">{current.weight}</span>
                  </div>
                </div>

                {/* Swiss Watch NumberFlow Valuation */}
                <div className="mt-8 flex items-baseline gap-2 font-serif text-3xl sm:text-4xl font-normal text-[#000000]">
                  <span>AED</span>
                  <NumberFlow value={current.price} format={{ useGrouping: true }} />
                </div>
              </div>

              {/* Tactile Archival Edition Selector */}
              <div className="space-y-3 pt-4 border-t border-black/10">
                <div className="flex items-center justify-between font-sans text-xs text-black/50 font-normal">
                  <span>Archival Editions</span>
                  <span>Edition {selectedIdx + 1} of {CHARACTERS.length}</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {CHARACTERS.map((char, idx) => {
                    const isSelected = selectedIdx === idx;
                    return (
                      <button
                        key={char.id}
                        type="button"
                        onClick={() => handleSelectCharacter(idx)}
                        className={`group flex flex-col p-3 text-left rounded-lg transition-all cursor-pointer relative ${
                          isSelected
                            ? "bg-black/[0.05] text-black"
                            : "bg-transparent text-black/40 hover:text-black hover:bg-black/[0.02]"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-serif text-lg font-normal">{char.romanNumeral}</span>
                          <span
                            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                              isSelected ? "bg-[#4A0E16] scale-100" : "bg-transparent scale-0"
                            }`}
                          />
                        </div>
                        <span className="font-sans text-[11px] leading-snug mt-1 line-clamp-1 font-normal">
                          {char.frame}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Acquisition & Details Action */}
              <div className="pt-2 flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => handleAddToCart(current)}
                  className="group relative inline-flex items-center gap-4 bg-black text-white hover:bg-[#4A0E16] transition-all duration-300 pl-7 pr-3 py-3 rounded-full font-sans text-xs font-medium cursor-pointer active:scale-[0.98]"
                >
                  <span>Acquire Edition</span>
                  <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </button>

                <Link
                  href={`/product/${current.slug}`}
                  className="font-sans text-xs text-black/60 hover:text-black transition-colors py-2 flex items-center gap-1.5 group font-medium"
                >
                  <span>View Full Dossier</span>
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. THE LEOPARD VELVET VAULT                                               */}
        {/* ========================================================================= */}
        <div className="max-w-6xl mx-auto w-full mt-28 md:mt-40 overflow-hidden bg-[#141211] text-[#FFFFFF] shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 p-8 md:p-14 space-y-4">
            <h3 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-white">
              The Leopard Velvet Vault
            </h3>
            <p className="font-sans text-sm text-white/70 leading-relaxed max-w-md font-normal">
              Each piece is encased in bespoke Italian leopard velvet with imperial burgundy silk and 18K solid gold hardware.
            </p>
          </div>

          <div className="lg:col-span-6 h-full min-h-[280px] md:min-h-[360px] overflow-hidden">
            <img
              src="/manus-storage/cheeta-leopard-vault-box.jpg"
              alt="Handcrafted Italian Leopard Velvet Box with 18K Solid Gold Seal"
              className="h-full w-full object-cover filter contrast-[1.05]"
            />
          </div>
        </div>

        {/* Editorial Gateways */}
        <div className="max-w-6xl mx-auto w-full mt-24 md:mt-32 grid grid-cols-1 sm:grid-cols-2 gap-12 pt-12 border-t border-black/10">
          <Link href="/collection/barrel" className="group block">
            <span className="font-serif text-2xl sm:text-3xl font-normal text-black group-hover:text-[#4A0E16] transition-colors flex items-center gap-2">
              The Gun Collection <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>

          <Link href="/philosophy" className="group block">
            <span className="font-serif text-2xl sm:text-3xl font-normal text-black group-hover:text-[#4A0E16] transition-colors flex items-center gap-2">
              The Philosophy <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
