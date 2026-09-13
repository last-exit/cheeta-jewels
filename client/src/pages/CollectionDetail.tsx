/**
 * CHEETA JEWELS / ICON LIVIN — Art-Directed Collection Destination
 * Pure #FFFFFF Canvas — Boxless Architecture (Zero AI card slop)
 * Museum Still Life Presentation with GT Sectra Display & GT America
 */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import CheetahBar from "@/components/CheetahBar";
import Eyewear3DModel from "@/components/Eyewear3DModel";
import ScrollReveal from "@/components/ScrollReveal";
import { COLLECTIONS, CollectionProduct, COLLECTION_ORDER } from "@/data/collections";
import { useCart } from "@/contexts/CartContext";
import { playMetallicClick, playVaultAcquisition } from "@/lib/soundEffects";
import { toast } from "sonner";

export default function CollectionDetail() {
  const params = useParams<{ id: string }>();
  const rawId = (params.id || "barrel").toLowerCase();
  // Support collection alias
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

  return (
    <div className="relative w-full min-h-screen bg-[#FFFFFF] text-[#000000] selection:bg-[#000000] selection:text-[#FFFFFF]">
      {/* Chrome Hearts Style Sidebar Navigation */}
      <CheetahBar dark={false} />

      {/* Hairline Scroll-Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[1.5px] z-50 origin-left pointer-events-none bg-[#000000] transition-transform duration-75"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 md:px-20 py-8 flex items-center justify-between pointer-events-none select-none">
        <Link
          href="/"
          onClick={() => {
            try {
              playMetallicClick();
            } catch {}
          }}
          className="pointer-events-auto font-sans text-xs uppercase tracking-[0.24em] text-[#000000]/60 hover:text-[#000000] transition-colors pl-14 sm:pl-16"
          aria-label="Back to Home"
        >
          ← HOME
        </Link>

        <div className="font-serif text-sm tracking-[0.24em] uppercase text-[#000000]/70 text-center">
          {collection.label}
        </div>

        <Link
          href="/"
          onClick={() => {
            try {
              playMetallicClick();
            } catch {}
          }}
          className="pointer-events-auto font-sans text-xs uppercase tracking-[0.2em] text-[#000000]/60 hover:text-[#000000] transition-colors"
        >
          CLOSE ✕
        </Link>
      </header>

      {/* ========================================================================= */}
      {/* 1. CINEMATIC FILM HERO — DISSOLVING INTO PURE WHITE                       */}
      {/* ========================================================================= */}
      <section className="relative w-full h-[75svh] md:h-[88svh] overflow-hidden bg-black select-none">
        <video
          key={collection.video}
          autoPlay
          muted
          loop
          playsInline
          poster={collection.campaign}
          className="w-full h-full object-cover object-center pointer-events-none filter brightness-[0.85] contrast-[1.08]"
        >
          <source src={collection.video} type="video/mp4" />
        </video>

        {/* Seamless Dissolve into pure #FFFFFF */}
        <div
          className="absolute inset-x-0 bottom-0 h-44 md:h-64 pointer-events-none z-20"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, #FFFFFF 100%)",
          }}
        />
      </section>

      {/* ========================================================================= */}
      {/* 2. COLLECTION MANIFESTO — GT SECTRA DISPLAY ON PURE WHITE                */}
      {/* ========================================================================= */}
      <section className="relative w-full px-6 sm:px-12 md:px-20 pt-12 md:pt-20 pb-24 md:pb-36 max-w-5xl mx-auto text-center select-none">
        <ScrollReveal>
          <span className="font-sans text-xs uppercase tracking-[0.32em] text-[#000000]/40 block mb-4">
            {collection.eyebrow}
          </span>
          <h1 className="font-serif text-[clamp(2.4rem,6.5vw,5.2rem)] font-normal leading-[1.06] tracking-tight uppercase text-[#000000]">
            {collection.pageTitle}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <p className="font-serif uppercase text-center text-xs sm:text-sm md:text-[15px] leading-[1.7] tracking-[0.08em] max-w-[48ch] mx-auto mt-10 md:mt-14 text-[#000000]/80">
            {collection.intro}
          </p>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 3. EDITORIAL STILL LIFE — ASYMMETRIC, UNCONTAINED, ZERO BOXES             */}
      {/* ========================================================================= */}
      <section className="relative w-full px-6 sm:px-12 md:px-20 py-16 md:py-32 max-w-7xl mx-auto select-none">
        {/* Lead Hero Still: Centered Floating Monolith */}
        <ScrollReveal className="w-full flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAFAFA]">
              <img
                src={collection.stills[0]}
                alt={`${collection.title} editorial portrait`}
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.02]"
              />
            </div>
            <div className="mt-4 flex justify-between items-baseline font-sans text-[11px] uppercase tracking-[0.24em] text-[#000000]/45">
              <span>{collection.chapters[0]?.cap}</span>
              <span>{collection.chapters[0]?.note}</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Asymmetric Offset Duet: One Portrait, One Landscape */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12 mt-28 md:mt-48 items-start">
          <ScrollReveal delay={90} className="col-span-1 md:col-span-6 md:col-start-1">
            <div className="w-full max-w-lg">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAFAFA]">
                <img
                  src={collection.stills[1]}
                  alt={`${collection.title} detail`}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.02]"
                />
              </div>
              <div className="mt-4 flex justify-between items-baseline font-sans text-[11px] uppercase tracking-[0.24em] text-[#000000]/45">
                <span>{collection.chapters[1]?.cap}</span>
                <span>{collection.chapters[1]?.note}</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={180} className="col-span-1 md:col-span-5 md:col-start-8 md:mt-32">
            <div className="w-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAFAFA]">
                <img
                  src={collection.stills[2]}
                  alt={`${collection.title} architectural angle`}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.02]"
                />
              </div>
              <div className="mt-4 flex justify-between items-baseline font-sans text-[11px] uppercase tracking-[0.24em] text-[#000000]/45">
                <span>{collection.chapters[2]?.cap}</span>
                <span>{collection.chapters[2]?.note}</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. POETIC AXIOM STATEMENT                                                 */}
      {/* ========================================================================= */}
      <section className="relative w-full px-6 sm:px-12 py-28 md:py-48 max-w-4xl mx-auto text-center select-none">
        <ScrollReveal>
          <p className="font-serif uppercase text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-[1.35] tracking-[0.06em] max-w-[36ch] mx-auto text-[#000000]">
            &ldquo;{collection.statement}&rdquo;
          </p>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 5. THE 360° ATELIER — FLOATING DIRECTLY ON PURE WHITE (NO CARD BOX)       */}
      {/* ========================================================================= */}
      <section className="relative w-full px-6 sm:px-12 md:px-20 py-20 md:py-32 max-w-6xl mx-auto select-none">
        <ScrollReveal>
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#000000]/40 block mb-3">
              THE ATELIER SALON
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal uppercase tracking-tight text-[#000000]">
              Interactive 360° Inspection
            </h2>
          </div>

          {/* Floating Canvas Area (Unbounded on White, Zero Box Borders) */}
          <div className="relative w-full flex flex-col items-center justify-between min-h-[500px] sm:min-h-[600px] py-6">
            {/* Top Minimalist Finish Controls */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-black/10 pb-6">
              <div className="flex items-center gap-3">
                <span className="font-sans text-xs uppercase tracking-[0.24em] text-[#000000] font-medium">
                  {activeFrame === "gold"
                    ? "18K Brushed Gold"
                    : activeFrame === "gunmetal"
                    ? "Gunmetal Obsidian"
                    : "Antique Bronze"}
                </span>
                <span className="text-black/30">/</span>
                <span className="font-sans text-xs uppercase tracking-[0.24em] text-[#000000]/60">
                  {activeLens.toUpperCase()} MINERAL
                </span>
              </div>

              {/* Metal Finish Switcher */}
              <div className="flex items-center gap-2">
                {[
                  { id: "gold", label: "18K Gold", hex: "#D4AF37" },
                  { id: "gunmetal", label: "Gunmetal", hex: "#23262B" },
                  { id: "bronze", label: "Bronze", hex: "#7A5B3A" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      try {
                        playMetallicClick();
                      } catch {}
                      setActiveFrame(f.id as any);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-[10px] font-sans uppercase tracking-[0.2em] transition-all cursor-pointer ${
                      activeFrame === f.id
                        ? "bg-black text-white"
                        : "text-black/60 hover:text-black hover:bg-black/5"
                    }`}
                  >
                    <span
                      className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle"
                      style={{ backgroundColor: f.hex }}
                    />
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3D Model Floating Canvas (Completely seamless on white) */}
            <div className="relative w-full flex-1 flex items-center justify-center my-8 min-h-[340px] sm:min-h-[420px]">
              <Eyewear3DModel
                key={`${activeFrame}-${activeLens}`}
                frameType={activeFrame}
                lensType={activeLens}
                className="w-full h-[340px] sm:h-[420px] md:h-[480px]"
                autoRotate={true}
              />
            </div>

            {/* Bottom Controls: Mineral Lens Swatches & Acquire Action */}
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 border-t border-black/10 pt-6">
              {/* Mineral Lens Options */}
              <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
                <span className="font-sans text-[11px] uppercase tracking-[0.24em] text-[#000000]/45 hidden sm:inline-block">
                  Mineral Optics:
                </span>
                {[
                  { id: "ruby", label: "Ruby", color: "#8A0E1C" },
                  { id: "obsidian", label: "Obsidian", color: "#1A1C20" },
                  { id: "amber", label: "Amber", color: "#B86314" },
                  { id: "emerald", label: "Emerald", color: "#0F5C43" },
                ].map((lens) => (
                  <button
                    key={lens.id}
                    onClick={() => {
                      try {
                        playMetallicClick();
                      } catch {}
                      setActiveLens(lens.id as any);
                    }}
                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                      activeLens === lens.id
                        ? "bg-black/5 text-black font-medium"
                        : "text-black/50 hover:text-black"
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/20 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: lens.color }}
                    />
                    <span className="font-sans text-xs uppercase tracking-[0.2em]">
                      {lens.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Bespoke Acquisition CTA */}
              <button
                onClick={handleAcquireBespoke}
                className="px-8 py-3 rounded-full font-sans text-xs uppercase tracking-[0.22em] bg-black text-white hover:bg-black/80 transition-all duration-300 cursor-pointer active:scale-98"
              >
                ACQUIRE 3D EDITION · AED 18,000
              </button>
            </div>

            <span className="mt-4 font-sans text-[10px] uppercase tracking-[0.28em] text-[#000000]/40">
              Drag horizontally to rotate 360° · Real-time physical render
            </span>
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 6. EYEWEAR EDITIONS — UNCONFINED STILL LIFE GALLERY (NO BOXES)              */}
      {/* ========================================================================= */}
      <section
        id="frames"
        className="relative w-full px-6 sm:px-12 md:px-20 pt-20 md:pt-36 pb-28 max-w-7xl mx-auto select-none"
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-8 border-b border-black/10">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.28em] text-[#000000]/40 block">
              CATALOG
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal mt-1 uppercase text-[#000000]">
              {collection.title} Editions
            </h2>
          </div>
          <span className="font-sans text-xs uppercase tracking-[0.22em] text-[#000000]/40">
            0{collection.products.length} SILHOUETTES
          </span>
        </div>

        {/* Anti-Slop Layout: Floating Still-Life Products Directly on White */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mt-16 md:mt-24">
          {collection.products.map((product, idx) => (
            <ScrollReveal key={product.id} delay={idx * 80}>
              <div
                className="group flex flex-col cursor-pointer"
                onClick={() => handleEnquire(product)}
              >
                {/* Floating Product Silhouette (No box frame, no gray border) */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAFAFA] flex items-center justify-center transition-transform duration-700 ease-out group-hover:-translate-y-1">
                  <img
                    src={product.quad}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  {/* Subtle floating Acquire badge */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans text-[10px] uppercase tracking-[0.2em] bg-black text-white px-3 py-1 rounded-full">
                    Acquire +
                  </div>
                </div>

                {/* Typographic Metadata */}
                <div className="mt-5 flex flex-col space-y-1.5">
                  <h3 className="font-serif text-base font-normal text-[#000000] leading-snug group-hover:underline">
                    {product.name}
                  </h3>
                  <p className="font-sans text-xs uppercase tracking-[0.14em] text-[#000000]/50 leading-relaxed">
                    {product.material}
                  </p>
                  <p className="font-serif text-base font-normal text-[#000000] pt-1">
                    {product.priceDisplay}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. ATELIER CREDITS                                                        */}
      {/* ========================================================================= */}
      <section className="relative w-full px-6 sm:px-12 md:px-20 py-20 md:py-28 max-w-7xl mx-auto border-t border-black/10 select-none">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {collection.credits.map((credit, idx) => (
            <ScrollReveal key={idx} delay={idx * 60}>
              <div className="flex flex-col space-y-1.5">
                <span className="font-sans text-[10px] uppercase tracking-[0.26em] text-[#000000]/40">
                  {credit.role}
                </span>
                <span className="font-serif text-sm sm:text-base text-[#000000]">
                  {credit.name}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. NEXT COLLECTION PORTAL                                                  */}
      {/* ========================================================================= */}
      <section className="relative w-full h-[65svh] overflow-hidden select-none bg-black">
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
            <span className="font-sans text-xs uppercase tracking-[0.32em] text-white/70 mb-4 block">
              NEXT DESTINATION
            </span>
            <h2 className="font-serif text-[clamp(2.2rem,7vw,5.5rem)] font-normal uppercase tracking-tight leading-none">
              {collection.nextName}
            </h2>
            <div className="mt-8 flex items-center gap-2 font-sans text-xs uppercase tracking-[0.24em] text-white">
              <span>ENTER</span>
              <span className="transition-transform duration-500 group-hover:translate-x-2">
                →
              </span>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
