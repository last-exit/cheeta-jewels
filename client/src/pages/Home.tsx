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
  const [heroSlide, setHeroSlide] = useState(0);
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
      image: item.modelImage,
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
              poster={col.campaign}
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
      {/* 2. CHARACTER SELECT (LOOKBOOK) — REVEALED UPON SCROLLING                  */}
      {/* GT Sectra Display & GT America — Zero fake-monospaced tracking             */}
      {/* ========================================================================= */}
      <section
        id="characters"
        className="relative min-h-screen w-full bg-[#FFFFFF] py-24 md:py-36 px-6 md:px-20 pl-16 md:pl-28 flex flex-col justify-center select-none"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left: Model Silhouette Floating Naturally on White */}
            <div className="lg:col-span-7 relative h-[480px] md:h-[660px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="h-full w-full flex items-center justify-center"
                >
                  <img
                    src={current.modelImage}
                    alt={current.name}
                    className="max-h-full max-w-full object-contain pointer-events-none drop-shadow-[0_24px_40px_rgba(0,0,0,0.06)]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Product Info in GT Sectra & GT America */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-7">
              <div>
                <span className="font-serif text-3xl text-[#4A0E16] block mb-2 font-normal">
                  {current.romanNumeral}
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[#000000] leading-[1.08]">
                  {current.name}
                </h2>
                <p className="font-sans text-sm text-[#000000]/60 mt-2 font-normal">
                  {current.frame} · {current.lens}
                </p>

                {/* Swiss Watch NumberFlow Price */}
                <div className="mt-8 flex items-baseline gap-2 font-serif text-3xl sm:text-4xl font-normal text-[#000000]">
                  <span>AED</span>
                  <NumberFlow value={current.price} format={{ useGrouping: true }} />
                </div>
              </div>

              {/* Silhouette Switcher */}
              <div className="flex items-center gap-6 font-sans text-sm border-t border-black/10 pt-6">
                {CHARACTERS.map((char, idx) => {
                  const isSelected = selectedIdx === idx;
                  return (
                    <button
                      key={char.id}
                      onClick={() => handleSelectCharacter(idx)}
                      className={`group flex items-center gap-2 cursor-pointer transition-all ${
                        isSelected
                          ? "text-black font-semibold"
                          : "text-black/35 hover:text-black"
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
                      handleSelectCharacter(
                        (selectedIdx - 1 + CHARACTERS.length) % CHARACTERS.length
                      )
                    }
                    className="p-2 text-black/40 hover:text-black transition-colors cursor-pointer active:scale-95"
                    aria-label="Previous edition"
                  >
                    ←
                  </button>
                  <button
                    onClick={() =>
                      handleSelectCharacter((selectedIdx + 1) % CHARACTERS.length)
                    }
                    className="p-2 text-black/40 hover:text-black transition-colors cursor-pointer active:scale-95"
                    aria-label="Next edition"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Acquisition & Details Action */}
              <div className="pt-2 flex items-center gap-6">
                <button
                  onClick={() => handleAddToCart(current)}
                  className="group relative inline-flex items-center gap-4 bg-black text-white hover:bg-[#4A0E16] transition-all duration-300 pl-6 pr-2.5 py-2.5 rounded-full font-sans text-xs font-medium cursor-pointer active:scale-[0.98]"
                >
                  <span>Acquire</span>
                  <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </button>

                <Link
                  href={`/product/${current.slug}`}
                  className="font-sans text-xs text-black/55 hover:text-black transition-colors py-2"
                >
                  Details
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
