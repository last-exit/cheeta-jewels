/**
 * CHEETA JEWELS / ICON LIVIN : Art-Directed Collection Destination
 * Pure #F9F6F0 Canvas : Gentle Monster-Inspired Boxless Architecture
 * - Zero boxes, zero card vitrines, zero generic AI grids
 * - Eyewear frames float freely on the open canvas with natural soft contact shadows
 * - Asymmetric editorial layout with flagship spotlight and staggered sculptural duets
 * - Bespoke collection motifs (gun rifling / mughal jali / venetian / savannah) + subtle cheetah rosettes
 * - GT Sectra Display & GT America typography
 * - Zero unnecessary subtext, coordinates, or AI micro-labels
 * - Zero em dashes anywhere
 */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";
import Eyewear3DModel from "@/components/Eyewear3DModel";
import ScrollReveal from "@/components/ScrollReveal";
import SubtleLuxuryBackground from "@/components/SubtleLuxuryBackground";
import CollectionBespokeMotifs from "@/components/CollectionBespokeMotifs";
import { COLLECTIONS, CollectionProduct } from "@/data/collections";
import { useCart } from "@/contexts/CartContext";
import { playMetallicClick, playVaultAcquisition } from "@/lib/soundEffects";
import { toast } from "sonner";

export default function CollectionDetail() {
  const params = useParams<{ id: string }>();
  const rawId = (params.id || "barrel").toLowerCase();
  const collectionId = rawId === "gun" ? "barrel" : rawId;
  const collection = COLLECTIONS[collectionId] || COLLECTIONS.barrel;
  const { addToCart } = useCart();
  const [scrollProgress, setScrollProgress] = useState(0);

  // 3D Model interactive state
  const [activeLens, setActiveLens] = useState<"ruby" | "obsidian" | "amber" | "emerald">(
    collection.modelConfig.defaultLens
  );
  const [activeFrame, setActiveFrame] = useState<"gold" | "gunmetal" | "bronze">(
    collection.modelConfig.frameType
  );

  // Sync state when collection changes
  useEffect(() => {
    setActiveLens(collection.modelConfig.defaultLens);
    setActiveFrame(collection.modelConfig.frameType);
    window.scrollTo(0, 0);
  }, [collectionId, collection.modelConfig.defaultLens, collection.modelConfig.frameType]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [collectionId]);

  const handleEnquire = (product: CollectionProduct) => {
    try {
      playVaultAcquisition();
    } catch {}
    addToCart({
      id: product.id,
      name: product.name,
      frame: product.material,
      lens: "Custom Mineral Lenses",
      price: product.price,
      priceDisplay: product.priceDisplay,
      image: product.quad,
    });
    toast.success(product.name, {
      description: `${product.priceDisplay} · Added to Bag. Client concierge assigned.`,
    });
  };

  const handleAcquireBespoke = () => {
    try {
      playVaultAcquisition();
    } catch {}
    const frameName =
      activeFrame === "gold"
        ? "18K Brushed Gold"
        : activeFrame === "gunmetal"
        ? "Gunmetal Obsidian"
        : "Antique Bronze";
    const lensName =
      activeLens === "ruby"
        ? "Custom Ruby Mineral Lenses"
        : activeLens === "obsidian"
        ? "Polarized Smoke Mineral Lenses"
        : activeLens === "amber"
        ? "Amber Honey Mineral Lenses"
        : "Emerald Beryl Mineral Lenses";

    addToCart({
      id: `${collection.id}-bespoke-${activeFrame}-${activeLens}`,
      name: `${collection.title} Bespoke 3D Edition`,
      frame: frameName,
      lens: lensName,
      price: 18000,
      priceDisplay: "AED 18,000",
      image: collection.frames,
    });
    toast.success(`${collection.title} Bespoke Edition Acquired`, {
      description: `${frameName} · ${lensName} · AED 18,000. Concierge assigned.`,
    });
  };

  // Safe product mapping
  const p1 = collection.products[0];
  const p2 = collection.products[1];
  const p3 = collection.products[2];
  const p4 = collection.products[3];

  return (
    <div className="relative w-full min-h-screen bg-[#F9F6F0] text-[#2A241D] selection:bg-[#2A241D] selection:text-[#F9F6F0] overflow-hidden">
      {/* Official CJ Logo Sidebar Trigger */}
      <CheetahBar dark />

      {/* Hairline Scroll-Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[1.5px] z-50 origin-left pointer-events-none bg-[#2A241D] transition-transform duration-75"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Centered Transparent Cheeta Jewels Header Wordmark */}
      <HeaderWordmark dark={false} />

      {/* Subtle Background Swirls & Cheetah Rosettes (3-4% Opacity) */}
      <SubtleLuxuryBackground variant="full" />

      {/* Bespoke Collection Artwork (Gun Rifling / Mughal Jali / Venetian Mask / Savannah Cheetah) */}
      <CollectionBespokeMotifs collectionId={collection.id} />

      {/* ========================================================================= */}
      {/* 1. CINEMATIC FILM HERO : DISSOLVING INTO WARM LUXURY BEIGE                */}
      {/* ========================================================================= */}
      <section className="relative w-full h-[70svh] md:h-[82svh] overflow-hidden bg-black select-none">
        <video
          key={collection.video}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center pointer-events-none filter brightness-[0.85] contrast-[1.08]"
        >
          <source src={collection.video} type="video/mp4" />
        </video>

        {/* Seamless Dissolve into warm beige #F9F6F0 */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 md:h-56 pointer-events-none z-20"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, #F9F6F0 100%)",
          }}
        />
      </section>

      {/* ========================================================================= */}
      {/* 2. COLLECTION MANIFESTO : TIGHTENED EDITORIAL RHYTHM                      */}
      {/* ========================================================================= */}
      <section className="relative w-full px-6 sm:px-12 md:px-20 pt-10 md:pt-16 pb-12 md:pb-16 max-w-5xl mx-auto text-center select-none">
        <ScrollReveal>
          <h1 className="font-serif lowercase text-[clamp(2.4rem,5.5vw,4.5rem)] font-normal leading-[1.05] tracking-tight text-[#2A241D]">
            {collection.pageTitle}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="font-sans text-sm sm:text-base md:text-lg leading-relaxed max-w-[48ch] mx-auto mt-4 md:mt-6 text-[#2A241D]/75 font-normal">
            {collection.intro}
          </p>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 3. EDITORIAL STILL LIFE : GENTLE MONSTER UNBOXED PHOTOGRAPHY SPREAD      */}
      {/* ========================================================================= */}
      <section className="relative w-full px-6 sm:px-12 md:px-20 py-12 md:py-20 max-w-7xl mx-auto select-none">
        {/* Lead Hero Plate : Unboxed Borderless Editorial Photography */}
        <ScrollReveal className="w-full flex justify-center">
          <div className="w-full max-w-4xl">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden shadow-[0_20px_50px_rgba(42,36,29,0.07)]">
              <img
                src={collection.stills[0]}
                alt={`${collection.title} editorial portrait`}
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.02]"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Asymmetric Offset Duet : Unboxed Architectural Crops */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 mt-16 md:mt-24 items-start">
          <ScrollReveal delay={90} className="col-span-1 md:col-span-7">
            <div className="w-full">
              <div className="relative aspect-[4/5] w-full overflow-hidden shadow-[0_20px_45px_rgba(42,36,29,0.06)]">
                <img
                  src={collection.stills[1]}
                  alt={`${collection.title} detail`}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.02]"
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={180} className="col-span-1 md:col-span-5 md:mt-24">
            <div className="w-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden shadow-[0_20px_45px_rgba(42,36,29,0.06)]">
                <img
                  src={collection.stills[2]}
                  alt={`${collection.title} architectural angle`}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.02]"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. POETIC AXIOM STATEMENT : UNBOXED EDITORIAL MONOGRAPH                   */}
      {/* ========================================================================= */}
      <section className="relative w-full px-6 sm:px-12 py-16 md:py-24 max-w-4xl mx-auto text-center select-none">
        <ScrollReveal>
          <span className="font-serif text-4xl sm:text-5xl text-[#D4AF37]/50 block mb-3 leading-none">
            &ldquo;
          </span>
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl leading-[1.25] tracking-tight max-w-[32ch] mx-auto text-[#2A241D] font-normal">
            {collection.statement}
          </p>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 5. THE 360° INSPECTION : UNBOXED FLOATING VIRTUAL VITRINE                 */}
      {/* ========================================================================= */}
      <section className="relative w-full px-6 sm:px-12 md:px-20 py-14 md:py-22 max-w-6xl mx-auto select-none">
        <ScrollReveal>
          {/* Section Header */}
          <div className="pb-5 border-b border-[#2A241D]/10 mb-8 text-center sm:text-left">
            <h2 className="font-serif lowercase text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-[#2A241D]">
              interactive 360° inspection
            </h2>
          </div>

          {/* Unboxed 3D Model Floating in Pure Open Space */}
          <div className="relative w-full flex flex-col items-center justify-between min-h-[440px] sm:min-h-[520px]">
            {/* Ambient Radial Pedestal Halo */}
            <div
              className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
              aria-hidden="true"
            >
              <div className="w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full bg-gradient-to-tr from-[#D4AF37]/[0.10] to-transparent blur-3xl" />
            </div>

            {/* 3D Model Floating Canvas */}
            <div className="relative w-full flex-1 flex items-center justify-center min-h-[320px] sm:min-h-[420px] md:min-h-[460px]">
              <Eyewear3DModel
                key={`${activeFrame}-${activeLens}`}
                frameType={activeFrame}
                lensType={activeLens}
                className="w-full h-[320px] sm:h-[420px] md:h-[460px]"
                autoRotate={true}
              />
            </div>

            {/* Floating Controls: Gem Mineral Lens Swatches & Acquire Action */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 pb-2 border-t border-[#2A241D]/10">
              {/* Gem Mineral Lens Swatches */}
              <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-center font-sans">
                {[
                  { id: "ruby", label: "Ruby", color: "#8A0E1C" },
                  { id: "obsidian", label: "Obsidian", color: "#1A1C20" },
                  { id: "amber", label: "Amber", color: "#B86314" },
                  { id: "emerald", label: "Emerald", color: "#0F5C43" },
                ].map((lens) => {
                  const isSelected = activeLens === lens.id;
                  return (
                    <button
                      key={lens.id}
                      onClick={() => {
                        try {
                          playMetallicClick();
                        } catch {}
                        setActiveLens(lens.id as any);
                      }}
                      className={`group flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? "bg-[#2A241D] text-[#F9F6F0] shadow-sm"
                          : "bg-[#2A241D]/[0.05] text-[#2A241D]/70 hover:text-[#2A241D] hover:bg-[#2A241D]/[0.09]"
                      }`}
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full transition-transform duration-300 ${
                          isSelected ? "scale-110 ring-2 ring-[#D4AF37]" : "group-hover:scale-110"
                        }`}
                        style={{ backgroundColor: lens.color }}
                      />
                      <span className="text-xs font-normal lowercase">{lens.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Bespoke Acquisition CTA */}
              <button
                onClick={handleAcquireBespoke}
                className="group relative inline-flex items-center gap-3 px-6 py-2 rounded-full font-sans text-xs font-medium bg-[#2A241D] text-[#F9F6F0] hover:bg-[#D4AF37] hover:text-[#2A241D] transition-all duration-300 cursor-pointer active:scale-98 shadow-sm"
              >
                <span>acquire 3d bespoke</span>
                <span className="text-white/40 group-hover:text-black/40">·</span>
                <span>aed 18,000</span>
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 6. EYEWEAR EDITIONS : GENTLE MONSTER BOXLESS GALLERY                      */}
      {/* ========================================================================= */}
      <section
        id="frames"
        className="relative w-full px-6 sm:px-12 md:px-20 pt-16 md:pt-24 pb-28 md:pb-36 max-w-7xl mx-auto select-none"
      >
        {/* Curatorial Header */}
        <div className="pb-6 border-b border-[#2A241D]/10 mb-14 md:mb-20">
          <h2 className="font-serif lowercase text-3xl sm:text-4xl md:text-5xl font-normal text-[#2A241D] tracking-tight">
            {collection.title} editions
          </h2>
        </div>

        {/* --------------------------------------------------------------------- */}
        {/* PIECE 01: THE FLAGSHIP SILHOUETTE (ASYMMETRIC MONUMENTAL SPOTLIGHT)   */}
        {/* --------------------------------------------------------------------- */}
        {p1 && (
          <ScrollReveal className="w-full mb-24 md:mb-36">
            <div
              className="group grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center cursor-pointer"
              onClick={() => handleEnquire(p1)}
            >
              {/* Left / Center: Unboxed Eyewear Floating Free */}
              <div className="lg:col-span-7 relative flex items-center justify-center py-8 sm:py-14">
                <img
                  src={p1.quad}
                  alt={p1.name}
                  loading="lazy"
                  className="w-full max-w-xl max-h-[380px] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04] filter drop-shadow-[0_24px_38px_rgba(42,36,29,0.12)] group-hover:drop-shadow-[0_32px_48px_rgba(42,36,29,0.18)]"
                />
              </div>

              {/* Right: Editorial Narrative Floating Beside */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-4 px-2">
                <h3 className="font-serif lowercase text-3xl sm:text-4xl font-normal text-[#2A241D] tracking-tight leading-snug group-hover:text-[#D4AF37] transition-colors">
                  {p1.name}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#2A241D]/65 leading-relaxed font-normal max-w-[40ch]">
                  {p1.material}
                </p>

                <div className="pt-2 flex items-baseline gap-2 font-serif text-2xl text-[#2A241D]">
                  <span>{p1.priceDisplay}</span>
                </div>

                <div className="pt-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEnquire(p1);
                    }}
                    className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full font-sans text-xs font-medium bg-[#2A241D] text-[#F9F6F0] hover:bg-[#D4AF37] hover:text-[#2A241D] transition-all duration-300 cursor-pointer shadow-sm active:scale-98"
                  >
                    <span>acquire edition +</span>
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* --------------------------------------------------------------------- */}
        {/* PIECES 02 & 03: ASYMMETRIC SCULPTURAL DUET (OFFSET RUNWAY)            */}
        {/* --------------------------------------------------------------------- */}
        {(p2 || p3) && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start mb-24 md:mb-36">
            {/* Piece 02: Offset Left */}
            {p2 && (
              <ScrollReveal delay={80} className="col-span-1 md:col-span-6">
                <div
                  className="group flex flex-col cursor-pointer"
                  onClick={() => handleEnquire(p2)}
                >
                  {/* Floating Frame */}
                  <div className="relative w-full aspect-[4/3] flex items-center justify-center py-6 sm:py-10">
                    <img
                      src={p2.quad}
                      alt={p2.name}
                      loading="lazy"
                      className="w-full max-w-md max-h-[300px] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04] filter drop-shadow-[0_20px_35px_rgba(42,36,29,0.11)] group-hover:drop-shadow-[0_28px_45px_rgba(42,36,29,0.16)]"
                    />
                  </div>

                  {/* Metadata Floating Beneath */}
                  <div className="mt-4 flex flex-col space-y-1.5 px-2">
                    <h3 className="font-serif lowercase text-xl sm:text-2xl font-normal text-[#2A241D] tracking-tight group-hover:text-[#D4AF37] transition-colors">
                      {p2.name}
                    </h3>
                    <p className="font-sans text-xs text-[#2A241D]/60 leading-relaxed font-normal">
                      {p2.material}
                    </p>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="font-serif text-lg text-[#2A241D]">{p2.priceDisplay}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEnquire(p2);
                        }}
                        className="font-sans lowercase text-xs text-[#2A241D] hover:text-[#D4AF37] transition-colors underline underline-offset-4 cursor-pointer"
                      >
                        acquire +
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Piece 03: Offset Right with Vertical Stagger */}
            {p3 && (
              <ScrollReveal delay={160} className="col-span-1 md:col-span-6 md:mt-24">
                <div
                  className="group flex flex-col cursor-pointer"
                  onClick={() => handleEnquire(p3)}
                >
                  {/* Floating Frame */}
                  <div className="relative w-full aspect-[4/3] flex items-center justify-center py-6 sm:py-10">
                    <img
                      src={p3.quad}
                      alt={p3.name}
                      loading="lazy"
                      className="w-full max-w-md max-h-[300px] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04] filter drop-shadow-[0_20px_35px_rgba(42,36,29,0.11)] group-hover:drop-shadow-[0_28px_45px_rgba(42,36,29,0.16)]"
                    />
                  </div>

                  {/* Metadata Floating Beneath */}
                  <div className="mt-4 flex flex-col space-y-1.5 px-2">
                    <h3 className="font-serif lowercase text-xl sm:text-2xl font-normal text-[#2A241D] tracking-tight group-hover:text-[#D4AF37] transition-colors">
                      {p3.name}
                    </h3>
                    <p className="font-sans text-xs text-[#2A241D]/60 leading-relaxed font-normal">
                      {p3.material}
                    </p>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="font-serif text-lg text-[#2A241D]">{p3.priceDisplay}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEnquire(p3);
                        }}
                        className="font-sans lowercase text-xs text-[#2A241D] hover:text-[#D4AF37] transition-colors underline underline-offset-4 cursor-pointer"
                      >
                        acquire +
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        )}

        {/* --------------------------------------------------------------------- */}
        {/* PIECE 04: THE ARCHIVAL MONOLITH (CENTERED SCULPTURAL FINALE)          */}
        {/* --------------------------------------------------------------------- */}
        {p4 && (
          <ScrollReveal delay={120} className="w-full flex justify-center">
            <div
              className="group w-full max-w-3xl flex flex-col items-center text-center cursor-pointer"
              onClick={() => handleEnquire(p4)}
            >
              {/* Floating Frame */}
              <div className="relative w-full aspect-[16/9] flex items-center justify-center py-6 sm:py-12">
                <img
                  src={p4.quad}
                  alt={p4.name}
                  loading="lazy"
                  className="w-full max-w-lg max-h-[340px] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04] filter drop-shadow-[0_24px_38px_rgba(42,36,29,0.12)] group-hover:drop-shadow-[0_32px_48px_rgba(42,36,29,0.18)]"
                />
              </div>

              {/* Metadata Floating Beneath */}
              <div className="mt-4 flex flex-col items-center space-y-2 px-4 max-w-xl">
                <h3 className="font-serif lowercase text-2xl sm:text-3xl font-normal text-[#2A241D] tracking-tight group-hover:text-[#D4AF37] transition-colors">
                  {p4.name}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#2A241D]/65 leading-relaxed font-normal">
                  {p4.material}
                </p>
                <div className="pt-2 flex items-center gap-4">
                  <span className="font-serif text-xl text-[#2A241D]">{p4.priceDisplay}</span>
                  <span className="text-[#2A241D]/30">·</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEnquire(p4);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-sans text-xs font-medium bg-[#2A241D] text-[#F9F6F0] hover:bg-[#D4AF37] hover:text-[#2A241D] transition-all duration-300 cursor-pointer shadow-sm active:scale-98"
                  >
                    <span>acquire edition +</span>
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 7. NEXT COLLECTION PORTAL                                                  */}
      {/* ========================================================================= */}
      <section className="relative w-full h-[60svh] overflow-hidden select-none bg-black">
        <Link
          href={`/collection/${collection.nextId}`}
          onClick={() => {
            try {
              playMetallicClick();
            } catch {}
          }}
          className="group block relative w-full h-full cursor-pointer"
          aria-label={`Go to next collection: ${collection.nextName}`}
        >
          <img
            src={collection.nextCampaign}
            alt={`Next collection: ${collection.nextName}`}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-[0.7]"
          />

          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-700 flex flex-col items-center justify-center text-center p-6 text-white">
            <span className="font-sans text-xs text-white/70 mb-3 block font-normal lowercase tracking-[0.2em]">
              next destination
            </span>
            <h2 className="font-serif lowercase text-[clamp(2.2rem,6vw,5rem)] font-normal tracking-tight leading-none">
              {collection.nextName}
            </h2>
            <div className="mt-5 flex items-center gap-2 font-sans text-xs text-white font-medium lowercase tracking-wider">
              <span>enter collection</span>
              <span className="transition-transform duration-500 group-hover:translate-x-1.5">
                →
              </span>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
