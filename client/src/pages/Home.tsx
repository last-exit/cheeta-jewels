/**
 * HOMEPAGE — CHEETA JEWELS Flagship
 * Radical luxury minimalism: Full-bleed vintage video hero with pure "ICON LIVIN",
 * zero AI text clutter, model lookbook on bone white, and handcrafted leopard velvet presentation.
 */
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import React, { useState } from "react";
import { Link } from "wouter";
import CheetahBar from "@/components/CheetahBar";
import GoldParticleEngine from "@/components/GoldParticleEngine";
import { useCart } from "@/contexts/CartContext";
import { playMetallicClick, playVaultAcquisition } from "@/lib/soundEffects";
import { toast } from "sonner";

interface ModelCharacter {
  id: string;
  romanNumeral: string;
  name: string;
  frame: string;
  lens: string;
  price: number;
  priceDisplay: string;
  modelImage: string;
  slug: string;
}

const CHARACTERS: ModelCharacter[] = [
  {
    id: "barrel-01",
    romanNumeral: "I",
    name: "The Double Barrel 01",
    frame: "18K Brushed Gold",
    lens: "Custom Ruby Mineral Lenses",
    price: 15000,
    priceDisplay: "AED 15,000",
    modelImage: "/manus-storage/model-cutout-01-transparent.png",
    slug: "double-barrel-01",
  },
  {
    id: "barrel-02",
    romanNumeral: "II",
    name: "The Double Barrel 02",
    frame: "Gunmetal Obsidian",
    lens: "Polarized Smoke Mineral Lenses",
    price: 15000,
    priceDisplay: "AED 15,000",
    modelImage: "/manus-storage/model-cutout-02-transparent.png",
    slug: "double-barrel-02",
  },
  {
    id: "barrel-03",
    romanNumeral: "III",
    name: "The Double Barrel 03",
    frame: "Antique Bronze",
    lens: "Amber Gradient Mineral Lenses",
    price: 15000,
    priceDisplay: "AED 15,000",
    modelImage: "/manus-storage/model-cutout-03-transparent.png",
    slug: "double-barrel-03",
  },
];

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function Home() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const { addToCart } = useCart();
  const current = CHARACTERS[selectedIdx];

  const handleAddToCart = (item: ModelCharacter) => {
    playVaultAcquisition();
    addToCart({
      id: item.id,
      name: item.name,
      frame: item.frame,
      lens: item.lens,
      price: item.price,
      priceDisplay: item.priceDisplay,
      image: item.modelImage,
    });
    toast.success(`${item.name} acquired.`, {
      description: `${item.frame} · ${item.priceDisplay}`,
    });
  };

  const handleSelectCharacter = (idx: number) => {
    playMetallicClick();
    setSelectedIdx(idx);
  };

  return (
    <main className="relative w-full min-h-screen bg-[#F4F3EE] text-[#0B0B0C] selection:bg-[#0B0B0C] selection:text-[#F4F3EE]">
      {/* Floating Transparent Cheetah Bar */}
      <CheetahBar dark />

      {/* ========================================================================= */}
      {/* 1. SCARFACE VINTAGE VIDEO HERO — ICON LIVIN ONLY                          */}
      {/* ========================================================================= */}
      <section className="relative h-screen w-full overflow-hidden bg-[#0B0B0C] text-white flex flex-col justify-between p-8 md:p-16 select-none">
        {/* Full-Bleed Vintage Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover object-center filter brightness-[0.6] contrast-[1.15] pointer-events-none"
        >
          <source
            src="/manus-storage/cheeta-vintage-revival-entry_1f1afeed.mp4"
            type="video/mp4"
          />
        </video>

        {/* Film Grain Texture & Subtle Gold Dust Motes */}
        <div className="absolute inset-0 pointer-events-none film-grain" />
        <GoldParticleEngine particleCount={30} className="absolute inset-0 pointer-events-none z-10" />

        {/* Pure Monumental Hero: Just "ICON LIVIN" */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-6">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
            className="font-serif text-[clamp(4.5rem,17vw,18rem)] font-normal leading-none tracking-[-0.04em] text-white drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] select-none text-center"
          >
            ICON LIVIN
          </motion.h1>
        </div>

        {/* Minimal Scroll Cue */}
        <footer className="relative z-20 flex items-end justify-center">
          <a
            href="#lookbook"
            className="group flex flex-col items-center gap-2 font-sans text-[11px] uppercase tracking-[0.22em] text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <span>Explore</span>
            <ArrowDown size={13} className="transition-transform group-hover:translate-y-1" />
          </a>
        </footer>
      </section>

      {/* ========================================================================= */}
      {/* 2. MINIMALIST LOOKBOOK — BONE WHITE CANVAS                                */}
      {/* ========================================================================= */}
      <section
        id="lookbook"
        className="relative min-h-screen w-full bg-[#F4F3EE] py-24 md:py-36 px-6 md:px-20 pl-16 md:pl-28 flex flex-col justify-center select-none"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left: Model Cutout Floating Naturally */}
            <div className="lg:col-span-7 relative h-[480px] md:h-[680px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  className="h-full w-full flex items-center justify-center"
                >
                  <img
                    src={current.modelImage}
                    alt={current.name}
                    className="max-h-full max-w-full object-contain pointer-events-none drop-shadow-[0_30px_50px_rgba(0,0,0,0.08)]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Clean Product Information */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
              <div>
                <span className="font-serif text-3xl text-[#4A0E16] block mb-2">
                  {current.romanNumeral}
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#0B0B0C] leading-[1.05]">
                  {current.name}
                </h2>
                <p className="font-sans text-sm uppercase tracking-[0.12em] text-[#0B0B0C]/60 mt-2">
                  {current.frame} · {current.lens}
                </p>

                {/* Swiss Watch NumberFlow Price */}
                <div className="mt-8 flex items-baseline gap-2 font-serif text-3xl sm:text-4xl font-normal text-[#0B0B0C]">
                  <span>AED</span>
                  <NumberFlow value={current.price} format={{ useGrouping: true }} />
                </div>
              </div>

              {/* Silhouette Switcher */}
              <div className="flex items-center gap-6 font-sans text-sm border-t border-[#0B0B0C]/10 pt-6">
                {CHARACTERS.map((char, idx) => {
                  const isSelected = selectedIdx === idx;
                  return (
                    <button
                      key={char.id}
                      onClick={() => handleSelectCharacter(idx)}
                      className={`group flex items-center gap-2 cursor-pointer transition-all ${
                        isSelected
                          ? "text-[#0B0B0C] font-semibold"
                          : "text-[#0B0B0C]/35 hover:text-[#0B0B0C]"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                          isSelected ? "bg-[#4A0E16] scale-100" : "bg-transparent scale-0"
                        }`}
                      />
                      <span className="font-serif text-base">{char.romanNumeral}</span>
                    </button>
                  );
                })}

                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleSelectCharacter((selectedIdx - 1 + CHARACTERS.length) % CHARACTERS.length)
                    }
                    className="p-2 text-[#0B0B0C]/40 hover:text-[#0B0B0C] transition-colors cursor-pointer active:scale-95"
                    aria-label="Previous"
                  >
                    ←
                  </button>
                  <button
                    onClick={() =>
                      handleSelectCharacter((selectedIdx + 1) % CHARACTERS.length)
                    }
                    className="p-2 text-[#0B0B0C]/40 hover:text-[#0B0B0C] transition-colors cursor-pointer active:scale-95"
                    aria-label="Next"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Acquisition Button */}
              <div className="pt-2 flex items-center gap-6">
                <button
                  onClick={() => handleAddToCart(current)}
                  className="group relative inline-flex items-center gap-4 bg-[#0B0B0C] text-[#F4F3EE] hover:bg-[#4A0E16] transition-all duration-300 pl-6 pr-2.5 py-2.5 rounded-full font-sans text-xs uppercase tracking-[0.16em] cursor-pointer active:scale-[0.98]"
                >
                  <span>Acquire</span>
                  <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </button>

                <Link
                  href={`/product/${current.slug}`}
                  className="font-sans text-xs uppercase tracking-[0.14em] text-[#0B0B0C]/50 hover:text-[#0B0B0C] transition-colors py-2"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. MINIMALIST LEOPARD VELVET VAULT PRESENTATION                           */}
        {/* ========================================================================= */}
        <div className="max-w-6xl mx-auto w-full mt-28 md:mt-40 overflow-hidden bg-[#141211] text-[#F4F3EE] shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 p-8 md:p-14 space-y-4">
            <h3 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#F4F3EE]">
              The Leopard Velvet Vault
            </h3>
            <p className="font-sans text-sm text-[#F4F3EE]/70 leading-relaxed max-w-md">
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
        <div className="max-w-6xl mx-auto w-full mt-24 md:mt-32 grid grid-cols-1 sm:grid-cols-2 gap-12 pt-12 border-t border-[#0B0B0C]/10">
          <Link href="/rooms" className="group block">
            <span className="font-serif text-2xl sm:text-3xl font-normal text-[#0B0B0C] group-hover:text-[#4A0E16] transition-colors flex items-center gap-2">
              The Exclusive Rooms <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>

          <Link href="/philosophy" className="group block">
            <span className="font-serif text-2xl sm:text-3xl font-normal text-[#0B0B0C] group-hover:text-[#4A0E16] transition-colors flex items-center gap-2">
              The Philosophy <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
