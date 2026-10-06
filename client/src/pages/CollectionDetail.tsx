/**
 * CHEETA JEWELS / ICON LIVIN : Art-Directed Collection Destination
 * Pure #FFFFFF Canvas : Boxless Architecture (Zero AI card slop)
 * GT Sectra Display & GT America Typography
 * - Cheeta Jewels transparent header button navigating to "/"
 * - Zero fake-monospaced tracked fonts
 */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";
import Eyewear3DModel from "@/components/Eyewear3DModel";
import ScrollReveal from "@/components/ScrollReveal";
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

  return (
    <div className="relative w-full min-h-screen bg-[#FFFFFF] text-[#000000] selection:bg-[#000000] selection:text-[#FFFFFF]">
      {/* Official CJ Logo Sidebar Trigger */}
      <CheetahBar dark={false} />

      {/* Hairline Scroll-Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[1.5px] z-50 origin-left pointer-events-none bg-[#000000] transition-transform duration-75"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* ========================================================================= */}
      {/* CENTERED CHEETA JEWELS HEADER WORDMARK                                    */}
      {/* ========================================================================= */}
      <HeaderWordmark dark={false} />

      {/* ========================================================================= */}
      {/* 1. CINEMATIC FILM HERO : DISSOLVING INTO PURE WHITE                       */}
      {/* ========================================================================= */}
      <section className="relative w-full h-[75svh] md:h-[88svh] overflow-hidden bg-black select-none">
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

        {/* Seamless Dissolve into pure #FFFFFF */}
        <div
          className="absolute inset-x-0 bottom-0 h-44 md:h-64 pointer-events-none z-20"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, #FFFFFF 100%)",
          }}
        />
      </section>

      {/* ========================================================================= */}
      {/* 2. COLLECTION MANIFESTO : GT SECTRA & GT AMERICA ON PURE WHITE           */}
      {/* ========================================================================= */}
      <section className="relative w-full px-6 sm:px-12 md:px-20 pt-12 md:pt-20 pb-24 md:pb-36 max-w-5xl mx-auto text-center select-none">
        <ScrollReveal>
          <span className="font-sans lowercase text-xs text-[#000000]/45 block mb-4 font-normal">
            {collection.eyebrow}
          </span>
          <h1 className="font-serif lowercase text-[clamp(2.4rem,6.5vw,5.2rem)] font-normal leading-[1.06] tracking-tight text-[#000000]">
            {collection.pageTitle}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <p className="font-sans text-sm sm:text-base md:text-lg leading-relaxed max-w-[50ch] mx-auto mt-8 md:mt-12 text-[#000000]/75 font-normal">
            {collection.intro}
          </p>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 3. EDITORIAL STILL LIFE : SCULPTURAL ARCHITECTURAL VITRINES               */}
      {/* ========================================================================= */}
      <section className="relative w-full px-6 sm:px-12 md:px-20 py-16 md:py-32 max-w-7xl mx-auto select-none">
        {/* Lead Hero Still: Monumental Arched Vault Portal */}
        <ScrollReveal className="w-full flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F8F7F5] rounded-t-[160px] md:rounded-t-[220px] border border-black/5 shadow-xs">
              <img
                src={collection.stills[0]}
                alt={`${collection.title} editorial portrait`}
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.02]"
              />
            </div>
            <div className="mt-5 flex justify-between items-baseline font-sans text-xs text-[#000000]/50 font-normal px-2">
              <span>{collection.chapters[0]?.cap}</span>
              <span>{collection.chapters[0]?.note}</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Asymmetric Offset Duet: Optical Capsule & Vaulted Plinth */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12 mt-28 md:mt-44 items-start">
          <ScrollReveal delay={90} className="col-span-1 md:col-span-6 md:col-start-1">
            <div className="w-full max-w-lg">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F8F7F5] rounded-[72px] border border-black/5 shadow-xs">
                <img
                  src={collection.stills[1]}
                  alt={`${collection.title} detail`}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.02]"
                />
              </div>
              <div className="mt-5 flex justify-between items-baseline font-sans text-xs text-[#000000]/50 font-normal px-2">
                <span>{collection.chapters[1]?.cap}</span>
                <span>{collection.chapters[1]?.note}</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={180} className="col-span-1 md:col-span-5 md:col-start-8 md:mt-28">
            <div className="w-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F8F7F5] rounded-t-[120px] rounded-b-[24px] border border-black/5 shadow-xs">
                <img
                  src={collection.stills[2]}
                  alt={`${collection.title} architectural angle`}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.02]"
                />
              </div>
              <div className="mt-5 flex justify-between items-baseline font-sans text-xs text-[#000000]/50 font-normal px-2">
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
      <section className="relative w-full px-6 sm:px-12 py-28 md:py-44 max-w-4xl mx-auto text-center select-none">
        <ScrollReveal>
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl leading-[1.35] tracking-tight max-w-[36ch] mx-auto text-[#000000] font-normal">
            &ldquo;{collection.statement}&rdquo;
          </p>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 5. THE 360° ATELIER : MINIMALIST LUXURY (NO SUGGESTIONS, NO SUBTEXT)       */}
      {/* ========================================================================= */}
      <section className="relative w-full px-6 sm:px-12 md:px-20 py-20 md:py-32 max-w-6xl mx-auto select-none">
        <ScrollReveal>
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif lowercase text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#000000]">
              interactive 360° inspection
            </h2>
          </div>

          {/* Floating Canvas Area with Ambient Luxury Aura */}
          <div className="relative w-full flex flex-col items-center justify-between min-h-[480px] sm:min-h-[560px] py-4">
            {/* Ambient Radial Pedestal Glow */}
            <div
              className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
              aria-hidden="true"
            >
              <div className="w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full bg-gradient-to-tr from-[#B8985F]/[0.08] to-transparent blur-3xl" />
            </div>

            {/* 3D Model Floating Canvas */}
            <div className="relative w-full flex-1 flex items-center justify-center my-6 min-h-[340px] sm:min-h-[440px] md:min-h-[480px]">
              <Eyewear3DModel
                key={`${activeFrame}-${activeLens}`}
                frameType={activeFrame}
                lensType={activeLens}
                className="w-full h-[340px] sm:h-[440px] md:h-[480px]"
                autoRotate={true}
              />
            </div>

            {/* Pure Controls: Gem Mineral Lens Swatches & Acquire Action */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
              {/* Gem-like Mineral Lens Swatches */}
              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap justify-center font-sans">
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
                      className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? "bg-black text-white shadow-xs"
                          : "bg-black/[0.03] text-black/70 hover:text-black hover:bg-black/[0.06]"
                      }`}
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full transition-transform duration-300 ${
                          isSelected ? "scale-110 ring-2 ring-white/40" : "group-hover:scale-110"
                        }`}
                        style={{ backgroundColor: lens.color }}
                      />
                      <span className="text-xs font-normal">{lens.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Bespoke Acquisition CTA */}
              <button
                onClick={handleAcquireBespoke}
                className="group relative inline-flex items-center gap-3 px-8 py-2.5 rounded-full font-sans text-xs font-medium bg-black text-white hover:bg-[#4A0E16] transition-all duration-300 cursor-pointer active:scale-98 shadow-xs"
              >
                <span>Acquire 3D Edition</span>
                <span className="text-white/40">·</span>
                <span>AED 18,000</span>
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 6. EYEWEAR EDITIONS : ARCHITECTURAL ARCHES & OPTICAL CAPSULE VITRINES      */}
      {/* ========================================================================= */}
      <section
        id="frames"
        className="relative w-full px-6 sm:px-12 md:px-20 pt-20 md:pt-36 pb-32 max-w-7xl mx-auto select-none"
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-8">
          <div>
            <span className="font-sans lowercase text-xs text-[#000000]/45 block font-normal">
              catalog
            </span>
            <h2 className="font-serif lowercase text-3xl sm:text-4xl md:text-5xl font-normal mt-1 text-[#000000] tracking-tight">
              {collection.title} editions
            </h2>
          </div>
          <span className="font-sans text-xs text-[#000000]/50 font-normal">
            0{collection.products.length} Silhouettes
          </span>
        </div>

        {/* Sculptural Staggered Salon Layout (Architectural Arches & Stadium Capsules) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mt-16 md:mt-24">
          {collection.products.map((product, idx) => {
            const isArched = idx % 2 === 0;
            return (
              <ScrollReveal key={product.id} delay={idx * 80}>
                <div
                  className={`group flex flex-col cursor-pointer ${
                    !isArched ? "md:mt-14" : ""
                  }`}
                  onClick={() => handleEnquire(product)}
                >
                  {/* Sculptural Vitrine Silhouette */}
                  <div
                    className={`relative aspect-[3/4] w-full overflow-hidden bg-[#F8F7F5] border border-black/5 flex items-center justify-center p-6 transition-all duration-700 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_24px_48px_rgba(0,0,0,0.07)] ${
                      isArched
                        ? "rounded-t-[140px] rounded-b-[16px]"
                        : "rounded-[72px]"
                    }`}
                  >
                    {/* Architectural Numeral Marker */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 font-sans text-[10px] tracking-widest text-black/35 font-medium">
                      0{idx + 1}
                    </div>

                    <img
                      src={product.quad}
                      alt={product.name}
                      loading="lazy"
                      className="max-h-[75%] max-w-[85%] object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-108 filter contrast-[1.03]"
                    />

                    {/* Floating Acquire Pill on Hover */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 font-sans text-xs bg-black text-white px-4 py-1.5 rounded-full font-medium shadow-sm whitespace-nowrap">
                      Acquire Edition +
                    </div>
                  </div>

                  {/* Typographic Metadata in GT Sectra & GT America */}
                  <div className="mt-5 flex flex-col space-y-1.5 px-2">
                    <h3 className="font-serif text-lg font-normal text-[#000000] leading-snug group-hover:underline">
                      {product.name}
                    </h3>
                    <p className="font-sans text-xs text-[#000000]/55 leading-relaxed font-normal">
                      {product.material}
                    </p>
                    <p className="font-serif text-base font-normal text-[#000000] pt-0.5">
                      {product.priceDisplay}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
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
            <span className="font-sans text-xs text-white/70 mb-3 block font-normal">
              Next Destination
            </span>
            <h2 className="font-serif text-[clamp(2.2rem,7vw,5.5rem)] font-normal tracking-tight leading-none">
              {collection.nextName}
            </h2>
            <div className="mt-6 flex items-center gap-2 font-sans text-xs text-white font-medium">
              <span>Enter Collection</span>
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
