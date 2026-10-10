/**
 * HOMEPAGE : CHEETA JEWELS / ICON LIVIN
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
import HeaderWordmark from "@/components/HeaderWordmark";
import GoldParticleEngine from "@/components/GoldParticleEngine";
import SubtleLuxuryBackground from "@/components/SubtleLuxuryBackground";
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
    name: "the gun collection",
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
    name: "the gun collection",
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
    name: "the gun collection",
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

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#characters") {
      const el = document.getElementById("characters");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "instant", block: "start" });
        }, 100);
      }
    }
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-[#F9F6F0] text-[#2A241D] selection:bg-[#2A241D] selection:text-[#F9F6F0]">
      {/* Floating Official CJ Logo Sidebar Trigger */}
      <CheetahBar dark />

      {/* Persistent Floating CJ Monogram (blends on scroll, color-matched to active character) */}
      <HeaderWordmark
        color={
          selectedIdx === 0
            ? "#8A0E1C"
            : selectedIdx === 1
            ? "#2A241D"
            : "#B8860B"
        }
      />

      {/* ========================================================================= */}
      {/* 1. HERO : STRIPPED FULL-BLEED CAMPAIGN CINEMA                             */}
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

        {/* Center: STRIPPED : ONLY Handwritten "Icon livin'" Script Logo */}
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

        {/* Ambient Hero Corner Rosettes (Subtle Discoverable Golden Marks) */}
        <svg
          aria-label="Cheeta Cinema Mark"
          className="absolute top-8 right-8 sm:right-14 w-28 sm:w-36 h-auto text-[#D4AF37] opacity-[0.05] hover:opacity-[0.22] hover:text-[#F3E5AB] hover:scale-[1.04] hover:drop-shadow-[0_0_16px_rgba(212,175,55,0.4)] transition-all duration-700 ease-out pointer-events-auto cursor-pointer z-20"
          viewBox="0 0 160 140"
          fill="currentColor"
        >
          <path d="M40,32 C44,22 56,18 66,22 C58,28 56,36 60,44 C50,42 42,38 40,32 Z" />
          <path d="M72,25 C82,28 88,38 85,48 C78,43 73,45 68,40 C70,33 69,28 72,25 Z" />
          <path d="M56,50 C64,53 74,51 80,46 C76,53 68,57 60,56 C54,54 53,51 56,50 Z" />
          <ellipse cx="102" cy="35" rx="4" ry="3.2" transform="rotate(25 102 35)" />
          <ellipse cx="34" cy="58" rx="3" ry="4" transform="rotate(-15 34 58)" />
        </svg>

        <svg
          aria-label="Cheeta Atelier Touchmark"
          className="absolute bottom-10 right-8 sm:right-14 w-32 sm:w-40 h-auto text-[#D4AF37] opacity-[0.05] hover:opacity-[0.22] hover:text-[#F3E5AB] hover:scale-[1.04] hover:drop-shadow-[0_0_16px_rgba(212,175,55,0.4)] transition-all duration-700 ease-out pointer-events-auto cursor-pointer z-20"
          viewBox="0 0 180 160"
          fill="currentColor"
        >
          <path d="M50,42 C54,30 68,26 80,30 C70,38 67,48 73,58 C61,56 52,50 50,42 Z" />
          <path d="M88,32 C100,36 108,48 104,60 C96,54 90,56 84,50 C86,42 85,36 88,32 Z" />
          <path d="M68,64 C78,68 90,66 98,60 C94,68 84,74 74,72 C66,70 65,66 68,64 Z" />
          <ellipse cx="125" cy="45" rx="5" ry="4" transform="rotate(25 125 45)" />
          <ellipse cx="45" cy="75" rx="4" ry="5" transform="rotate(-15 45 75)" />
        </svg>
      </section>

      {/* ========================================================================= */}
      {/* 2. CHARACTER SELECT (LOOKBOOK) : REVEALED UPON SCROLLING                  */}
      {/* ========================================================================= */}
      <section
        id="characters"
        className="relative min-h-screen w-full py-24 md:py-36 px-6 md:px-20 pl-16 md:pl-28 flex flex-col justify-center select-none overflow-hidden transition-colors duration-1000"
        style={{
          backgroundColor:
            selectedIdx === 0
              ? "#FDF9F9" // Ruby subtle tint
              : selectedIdx === 1
              ? "#F5F5F5" // Obsidian subtle tint
              : "#FCF9F2", // Amber subtle tint
        }}
      >
        {/* Subtle Background Swirls & Cheetah Rosettes (3-4% Opacity) */}
        <SubtleLuxuryBackground variant="full" />

        {/* Subtle Background Character Design (Watermark) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${current.id}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.03, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center z-0"
          >
            <span className="font-serif text-[40vw] text-[#2A241D] leading-none text-center">
              {current.romanNumeral}
            </span>
          </motion.div>
        </AnimatePresence>

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left: Model Silhouette Floating Naturally */}
            <div className="lg:col-span-7 relative h-[480px] md:h-[660px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                  className="h-full w-full flex items-center justify-center"
                >
                  <img
                    src={current.modelImage}
                    alt={current.name}
                    className="max-h-full max-w-full object-contain pointer-events-none drop-shadow-[0_24px_40px_rgba(0,0,0,0.08)]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Product Info in GT Sectra & GT America */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-7">
              <div>
                <span className="font-serif text-3xl text-[#D4AF37] block mb-2 font-normal drop-shadow-sm">
                  {current.romanNumeral}
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[#2A241D] leading-[1.08]">
                  {current.name}
                </h2>
                <p className="font-sans lowercase text-sm text-[#2A241D]/60 mt-2 font-normal">
                  {current.frame} · {current.lens}
                </p>

                {/* Swiss Watch NumberFlow Price */}
                <div className="mt-8 flex items-baseline gap-2 font-serif text-3xl sm:text-4xl font-normal text-[#2A241D]">
                  <span className="uppercase tracking-wide">AED</span>
                  <NumberFlow value={current.price} format={{ useGrouping: true }} />
                </div>
              </div>

              {/* Silhouette Switcher */}
              <div className="flex items-center gap-6 font-sans text-sm pt-6">
                {CHARACTERS.map((char, idx) => {
                  const isSelected = selectedIdx === idx;
                  const activeColor =
                    idx === 0
                      ? "#8B0000" // Deep Red
                      : idx === 1
                      ? "#2A241D" // Obsidian
                      : "#B8860B"; // Dark Goldenrod
                  return (
                    <button
                      key={char.id}
                      onClick={() => handleSelectCharacter(idx)}
                      className={`group flex items-center gap-2 cursor-pointer transition-all ${
                        isSelected
                          ? "text-[#2A241D] font-semibold"
                          : "text-[#2A241D]/35 hover:text-[#2A241D]"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                          isSelected ? "scale-100" : "bg-transparent scale-0"
                        }`}
                        style={{ backgroundColor: isSelected ? activeColor : "transparent" }}
                      />
                      <span className="font-serif lowercase text-base">{char.romanNumeral}</span>
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
                    className="p-2 text-[#2A241D]/40 hover:text-[#2A241D] transition-colors cursor-pointer active:scale-95"
                    aria-label="Previous edition"
                  >
                    ←
                  </button>
                  <button
                    onClick={() =>
                      handleSelectCharacter((selectedIdx + 1) % CHARACTERS.length)
                    }
                    className="p-2 text-[#2A241D]/40 hover:text-[#2A241D] transition-colors cursor-pointer active:scale-95"
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
                  className="group relative inline-flex items-center gap-4 bg-[#2A241D] text-[#F9F6F0] hover:bg-[#D4AF37] hover:text-[#2A241D] transition-all duration-300 pl-6 pr-2.5 py-2.5 rounded-full font-sans lowercase text-xs font-medium cursor-pointer active:scale-[0.98] shadow-md"
                >
                  <span>acquire</span>
                  <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </button>

                <Link
                  href={`/product/${current.slug}`}
                  className="font-sans lowercase text-xs text-[#2A241D]/55 hover:text-[#2A241D] transition-colors py-2"
                >
                  details
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. THE LEOPARD VELVET VAULT                                               */}
        {/* ========================================================================= */}
        <div className="max-w-6xl mx-auto w-full mt-28 md:mt-40 overflow-hidden bg-[#141211] text-[#F9F6F0] shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center rounded-sm">
          <div className="lg:col-span-6 p-8 md:p-14 space-y-4">
            <h3 className="font-serif lowercase text-3xl sm:text-4xl font-normal tracking-tight text-white">
              the leopard velvet vault
            </h3>
            <p className="font-sans text-sm text-[#F9F6F0]/70 leading-relaxed max-w-md font-normal">
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
        <div className="max-w-6xl mx-auto w-full mt-24 md:mt-32 grid grid-cols-1 sm:grid-cols-2 gap-12 pt-12 border-t border-[#2A241D]/10">
          <Link href="/collection/barrel" className="group block">
            <span className="font-serif lowercase text-2xl sm:text-3xl font-normal text-[#2A241D] group-hover:text-[#D4AF37] transition-colors flex items-center gap-2">
              the gun collection <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>

          <Link href="/philosophy" className="group block">
            <span className="font-serif lowercase text-2xl sm:text-3xl font-normal text-[#2A241D] group-hover:text-[#D4AF37] transition-colors flex items-center gap-2">
              the philosophy <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
