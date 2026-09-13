/**
 * CHEETA JEWELS / ICON LIVIN — Art-Directed Collection Destination
 * Inspired by gentlemonster.com:
 * 1. FILM: Full-bleed 86svh video fading into page bg
 * 2. TITLE + INTRO: Centered serif title & all-caps serif narrative
 * 3. EDITORIAL STACK: Asymmetric figures (3:4 portrait, col 1-5 4:5 + col 8-12 4:3, 16:9 wide)
 * 4. STATEMENT: Centered poetic all-caps serif line
 * 5. FLAT LAY: Four frames quad shot, rounded-2xl
 * 6. THE FRAMES: 4-up honest product grid with sliding ENQUIRE bar
 * 7. CREDITS: 4-column atelier credits with tiny caps
 * 8. NEXT COLLECTION: 70svh full-bleed transition band
 */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import CheetahBar from "@/components/CheetahBar";
import Eyewear3DModel from "@/components/Eyewear3DModel";
import GoldParticleEngine from "@/components/GoldParticleEngine";
import ScrollReveal from "@/components/ScrollReveal";
import { COLLECTIONS, CollectionProduct } from "@/data/collections";
import { useCart } from "@/contexts/CartContext";
import { playMetallicClick, playVaultAcquisition } from "@/lib/soundEffects";
import { toast } from "sonner";

export default function CollectionDetail() {
  const params = useParams<{ id: string }>();
  const collectionId = (params.id || "maharaja").toLowerCase();
  const collection = COLLECTIONS[collectionId] || COLLECTIONS.maharaja;
  const { addToCart } = useCart();
  const [scrollProgress, setScrollProgress] = useState(0);

  // 3D Model interactive state
  const [activeLens, setActiveLens] = useState<"ruby" | "obsidian" | "amber" | "emerald">(
    collection.modelConfig.defaultLens
  );
  const [activeFrame, setActiveFrame] = useState<"gold" | "gunmetal" | "bronze">(
    collection.modelConfig.frameType
  );

  // Sync active lens & frame when collection changes
  useEffect(() => {
    setActiveLens(collection.modelConfig.defaultLens);
    setActiveFrame(collection.modelConfig.frameType);
  }, [collectionId, collection.modelConfig.defaultLens, collection.modelConfig.frameType]);

  // Scroll to top on collection change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [collectionId]);

  // Track 2px scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
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
    } catch {
      // Audio fallback
    }
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
    } catch {
      // Audio fallback
    }
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

  const { theme } = collection;

  return (
    <div
      className="relative w-full min-h-screen selection:bg-[var(--c-ink)] selection:text-[var(--c-bg)] transition-colors duration-700"
      style={
        {
          "--c-bg": theme.bg,
          "--c-ink": theme.ink,
          "--c-soft": theme.soft,
          "--c-accent": theme.accent,
          "--c-line": theme.line,
          "--c-tint": theme.tint,
          backgroundColor: "var(--c-bg)",
          color: "var(--c-ink)",
        } as React.CSSProperties
      }
    >
      {/* Signature Floating Cheetah Bar Navigation Trigger */}
      <CheetahBar dark={theme.bg === "#0B0B0C" || collectionId === "masquerade"} />

      {/* 2px Scroll-Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left pointer-events-none transition-transform duration-75"
        style={{
          backgroundColor: "var(--c-accent)",
          transform: `scaleX(${scrollProgress})`,
        }}
      />

      {/* Fixed Minimal Header with mix-blend-difference */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-10 md:px-16 py-6 flex items-center justify-between pointer-events-none mix-blend-difference text-white select-none">
        {/* Left: Back to Archive */}
        <Link
          href="/"
          onClick={() => {
            try {
              playMetallicClick();
            } catch {}
          }}
          className="pointer-events-auto font-subtext text-xs tracking-[0.24em] font-normal hover:opacity-70 transition-opacity pl-12 sm:pl-16"
          aria-label="Back to Archive"
        >
          ← ARCHIVE
        </Link>

        {/* Center: Collection Index & Name */}
        <div className="font-subtext text-xs tracking-[0.28em] font-normal opacity-90 text-center">
          {collection.label}
        </div>

        {/* Right: Close button */}
        <Link
          href="/"
          onClick={() => {
            try {
              playMetallicClick();
            } catch {}
          }}
          className="pointer-events-auto font-subtext text-xs tracking-[0.22em] font-normal hover:opacity-70 transition-opacity"
          aria-label="Close Collection"
        >
          CLOSE ✕
        </Link>
      </header>

      {/* ========================================================================= */}
      {/* 1. FILM — FULL-BLEED 86SVH VIDEO WITH BOTTOM GRADIENT FADE               */}
      {/* ========================================================================= */}
      <section className="relative w-full h-[70svh] md:h-[86svh] overflow-hidden bg-black select-none">
        <video
          key={collection.video}
          autoPlay
          muted
          loop
          playsInline
          poster={collection.campaign}
          className="w-full h-full object-cover object-center pointer-events-none"
        >
          <source src={collection.video} type="video/mp4" />
        </video>

        {/* Subtle Gold Particles */}
        <GoldParticleEngine particleCount={18} className="absolute inset-0 pointer-events-none opacity-35 z-10" />

        {/* Gradient fade dissolving film into page background */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 md:h-48 pointer-events-none z-20"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, var(--c-bg) 100%)",
          }}
        />
      </section>

      {/* ========================================================================= */}
      {/* 2. TITLE + INTRO — CENTERED SERIF TITLE & ALL-CAPS SERIF NARRATIVE       */}
      {/* ========================================================================= */}
      <section className="relative w-full px-6 sm:px-12 md:px-20 pt-8 md:pt-16 pb-20 md:pb-28 max-w-5xl mx-auto text-center select-none">
        <ScrollReveal>
          <span
            className="font-subtext text-xs tracking-[0.28em] font-normal block mb-4"
            style={{ color: "var(--c-soft)" }}
          >
            {collection.eyebrow}
          </span>
          <h1
            className="font-serif text-[clamp(1.9rem,5.2vw,4rem)] font-normal leading-[1.08] tracking-tight uppercase"
            style={{ color: "var(--c-ink)" }}
          >
            {collection.pageTitle}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          {/* Gentle Monster signature: All-caps serif paragraph */}
          <p
            className="font-serif uppercase text-center text-xs sm:text-sm md:text-[15px] leading-[1.55] tracking-[0.06em] max-w-[46ch] mx-auto mt-8 md:mt-10 opacity-90"
            style={{ color: "var(--c-ink)" }}
          >
            {collection.intro}
          </p>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 3. EDITORIAL STACK — DELIBERATELY ASYMMETRIC WITH EMPTY BACKGROUND       */}
      {/* ========================================================================= */}
      <section className="relative w-full px-6 sm:px-12 md:px-20 py-12 md:py-24 max-w-7xl mx-auto select-none">
        {/* Figure A: Centered Portrait (3:4, max-width 420px) */}
        <ScrollReveal className="w-full flex justify-center">
          <figure className="w-full max-w-[420px]">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--c-tint)]">
              <img
                src={collection.stills[0]}
                alt={`${collection.title} editorial portrait`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.035] motion-reduce:transform-none"
              />
            </div>
            <figcaption
              className="mt-3.5 font-subtext text-[11px] tracking-[0.24em] font-normal"
              style={{ color: "var(--c-soft)" }}
            >
              {collection.chapters[0]?.cap} — {collection.chapters[0]?.note}
            </figcaption>
          </figure>
        </ScrollReveal>

        {/* Figure B: 12-Column Asymmetric Offset Row (col 1-5 4:5 + col 8-12 4:3 translate-y-28) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mt-20 md:mt-36 lg:mt-52 items-start">
          {/* Col 1-5 (4:5) */}
          <ScrollReveal
            delay={90}
            className="col-span-1 md:col-span-5 md:col-start-1"
          >
            <figure className="w-full">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--c-tint)]">
                <img
                  src={collection.stills[1]}
                  alt={`${collection.title} editorial study`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.035] motion-reduce:transform-none"
                />
              </div>
              <figcaption
                className="mt-3.5 font-subtext text-[11px] tracking-[0.24em] font-normal"
                style={{ color: "var(--c-soft)" }}
              >
                {collection.chapters[1]?.cap} — {collection.chapters[1]?.note}
              </figcaption>
            </figure>
          </ScrollReveal>

          {/* Col 8-12 (4:3) pushed down with translate-y-28 on desktop */}
          <ScrollReveal
            delay={180}
            className="col-span-1 md:col-span-5 md:col-start-8 md:translate-y-28"
          >
            <figure className="w-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--c-tint)]">
                <img
                  src={collection.stills[2]}
                  alt={`${collection.title} architectural angle`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.035] motion-reduce:transform-none"
                />
              </div>
              <figcaption
                className="mt-3.5 font-subtext text-[11px] tracking-[0.24em] font-normal"
                style={{ color: "var(--c-soft)" }}
              >
                {collection.chapters[2]?.cap} — {collection.chapters[2]?.note}
              </figcaption>
            </figure>
          </ScrollReveal>
        </div>

        {/* Figure C: Centered Wide (16:9, max-width 48rem) */}
        <ScrollReveal className="w-full flex justify-center mt-24 md:mt-56 lg:mt-72">
          <figure className="w-full max-w-[48rem]">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--c-tint)]">
              <img
                src={collection.stills[3]}
                alt={`${collection.title} wide cinematic frame`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.035] motion-reduce:transform-none"
              />
            </div>
            <figcaption
              className="mt-3.5 font-subtext text-[11px] tracking-[0.24em] font-normal"
              style={{ color: "var(--c-soft)" }}
            >
              {collection.chapters[3]?.cap} — {collection.chapters[3]?.note}
            </figcaption>
          </figure>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 4. STATEMENT — ONE CENTERED ALL-CAPS SERIF LINE (PY-40)                   */}
      {/* ========================================================================= */}
      <section className="relative w-full px-6 sm:px-12 py-28 md:py-40 max-w-4xl mx-auto text-center select-none">
        <ScrollReveal>
          <p
            className="font-serif uppercase text-center text-lg sm:text-xl md:text-2xl lg:text-3xl leading-[1.4] tracking-[0.07em] max-w-[40ch] mx-auto"
            style={{ color: "var(--c-ink)" }}
          >
            {collection.statement}
          </p>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 4.5. THE 360° ATELIER — INTERACTIVE WEBGL 3D ROTATION & MINERAL LENSES    */}
      {/* ========================================================================= */}
      <section className="relative w-full px-6 sm:px-12 md:px-20 py-16 md:py-24 max-w-6xl mx-auto select-none">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <span
              className="font-subtext text-xs tracking-[0.28em] block mb-3 font-normal"
              style={{ color: "var(--c-soft)" }}
            >
              THE ATELIER SALON · 360° VIRTUAL ROTATION
            </span>
            <h2
              className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal uppercase tracking-tight"
              style={{ color: "var(--c-ink)" }}
            >
              {collection.title} Bespoke Engineering
            </h2>
          </div>

          {/* 3D Model Canvas & Interaction Card */}
          <div
            className="relative w-full rounded-2xl overflow-hidden p-6 sm:p-10 md:p-12 shadow-2xl flex flex-col items-center justify-between min-h-[540px] sm:min-h-[620px]"
            style={{
              backgroundColor: "var(--c-tint)",
              border: "1px solid var(--c-line)",
            }}
          >
            {/* Subtle Ambient Particle Field */}
            <GoldParticleEngine particleCount={16} className="absolute inset-0 pointer-events-none opacity-40" />

            {/* Top Bar: Specs & Live Finishes */}
            <div
              className="relative z-10 w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-5"
              style={{ borderColor: "var(--c-line)" }}
            >
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--c-accent)" }} />
                <span className="font-subtext text-xs tracking-[0.24em] font-normal" style={{ color: "var(--c-ink)" }}>
                  {activeFrame === "gold" ? "18K BRUSHED GOLD" : activeFrame === "gunmetal" ? "GUNMETAL OBSIDIAN" : "ANTIQUE BRONZE"}
                </span>
                <span className="text-[10px] opacity-40">/</span>
                <span className="font-subtext text-xs tracking-[0.24em] font-normal" style={{ color: "var(--c-soft)" }}>
                  {activeLens.toUpperCase()} MINERAL
                </span>
              </div>

              {/* Metal Finish Switcher */}
              <div className="flex items-center gap-2">
                {[
                  { id: "gold", label: "Gold", hex: "#d4af37" },
                  { id: "gunmetal", label: "Gunmetal", hex: "#23262b" },
                  { id: "bronze", label: "Bronze", hex: "#7a5b3a" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      try { playMetallicClick(); } catch {}
                      setActiveFrame(f.id as any);
                    }}
                    className={`px-3 py-1 rounded-full text-[10px] font-subtext tracking-[0.2em] transition-all cursor-pointer ${
                      activeFrame === f.id
                        ? "bg-[var(--c-ink)] text-[var(--c-bg)] shadow-md"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <span className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle" style={{ backgroundColor: f.hex }} />
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Middle: 3D Interactive Model */}
            <div className="relative z-10 w-full flex-1 flex items-center justify-center my-6 min-h-[300px] sm:min-h-[380px]">
              <Eyewear3DModel
                key={`${activeFrame}-${activeLens}`}
                frameType={activeFrame}
                lensType={activeLens}
                className="w-full h-[320px] sm:h-[400px] md:h-[460px]"
                autoRotate={true}
              />
            </div>

            {/* Bottom Controls: Mineral Lens Swatches & Acquire CTA */}
            <div
              className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-6 border-t pt-6"
              style={{ borderColor: "var(--c-line)" }}
            >
              {/* Mineral Lens Options */}
              <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
                <span className="font-subtext text-[11px] tracking-[0.24em] opacity-60 hidden sm:inline-block">
                  MINERAL LENSES:
                </span>
                {[
                  { id: "ruby", label: "Ruby", color: "#8a0e1c" },
                  { id: "obsidian", label: "Obsidian", color: "#1a1c20" },
                  { id: "amber", label: "Amber", color: "#b86314" },
                  { id: "emerald", label: "Emerald", color: "#0f5c43" },
                ].map((lens) => (
                  <button
                    key={lens.id}
                    onClick={() => {
                      try { playMetallicClick(); } catch {}
                      setActiveLens(lens.id as any);
                    }}
                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                      activeLens === lens.id
                        ? "border border-[var(--c-ink)] shadow-sm bg-[var(--c-bg)]"
                        : "opacity-65 hover:opacity-100"
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full shadow-inner border border-black/20 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: lens.color }}
                    />
                    <span className="font-subtext text-xs tracking-[0.2em] font-normal" style={{ color: "var(--c-ink)" }}>
                      {lens.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Acquire Bespoke CTA */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handleAcquireBespoke}
                  className="px-6 py-2.5 rounded-full font-subtext text-xs tracking-[0.22em] font-normal transition-all duration-300 shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    backgroundColor: "var(--c-ink)",
                    color: "var(--c-bg)",
                  }}
                >
                  ACQUIRE 3D EDITION · AED 18,000
                </button>
              </div>
            </div>

            {/* Instruction Micro-Caption */}
            <div className="relative z-10 mt-4 text-center">
              <span className="font-subtext text-[10px] tracking-[0.28em] opacity-50 block">
                TOUCH OR DRAG HORIZONTALLY TO ROTATE 360° · REAL-TIME PHYSICAL RAY TRACING
              </span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 5. FLAT LAY — FOUR FRAMES TOGETHER, ROUNDED-2XL, MAX-W-56REM             */}
      {/* ========================================================================= */}
      <section className="relative w-full px-6 sm:px-12 md:px-20 py-12 md:py-20 max-w-[56rem] mx-auto select-none">
        <ScrollReveal>
          <figure className="w-full">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[var(--c-tint)] shadow-2xl">
              <img
                src={collection.frames}
                alt={`${collection.title} Quad Editions Flat Lay`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.03] motion-reduce:transform-none"
              />
            </div>
            {/* Haute-Joaillerie Subtext Typography per user artifact media_1789317649213.png */}
            <figcaption
              className="mt-5 text-center font-subtext text-xs sm:text-[13px] tracking-[0.24em] font-normal"
              style={{ color: "var(--c-soft)" }}
            >
              {collection.title} — THE COMPLETE QUAD EDITIONS
            </figcaption>
          </figure>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 6. THE FRAMES — HAIRLINE RULE, 4-UP PRODUCT GRID, SLIDING ENQUIRE BAR     */}
      {/* ========================================================================= */}
      <section
        id="frames"
        className="relative w-full px-6 sm:px-12 md:px-20 pt-20 md:pt-32 pb-24 max-w-7xl mx-auto select-none"
      >
        {/* Hairline rule and section title */}
        <div
          className="pt-8 border-t flex flex-col sm:flex-row sm:items-baseline justify-between gap-4"
          style={{ borderColor: "var(--c-line)" }}
        >
          <div>
            <span
              className="font-subtext text-xs tracking-[0.26em] block font-normal"
              style={{ color: "var(--c-soft)" }}
            >
              THE COLLECTION
            </span>
            <h2
              className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal mt-1 uppercase"
              style={{ color: "var(--c-ink)" }}
            >
              {collection.title} Eyewear
            </h2>
          </div>
          <span
            className="font-subtext text-xs tracking-[0.22em] font-normal"
            style={{ color: "var(--c-soft)" }}
          >
            04 EDITIONS
          </span>
        </div>

        {/* 4-Up Grid (2-up on mobile) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mt-12 md:mt-16">
          {collection.products.map((product, idx) => (
            <ScrollReveal key={product.id} delay={idx * 90}>
              <div
                className="group flex flex-col cursor-pointer"
                onClick={() => handleEnquire(product)}
              >
                {/* Square Card with Sliding ENQUIRE bar */}
                <div
                  className="relative aspect-square w-full overflow-hidden bg-[var(--c-tint)]"
                  style={{
                    border: "1px solid var(--c-line)",
                  }}
                >
                  <img
                    src={product.quad}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
                  />

                  {/* Solid ENQUIRE bar slides up on hover */}
                  <div
                    className="absolute inset-x-0 bottom-0 py-3 text-center transition-transform duration-500 ease-out transform translate-y-full group-hover:translate-y-0 motion-reduce:transform-none"
                    style={{
                      backgroundColor: "var(--c-ink)",
                      color: "var(--c-bg)",
                    }}
                  >
                    <span className="font-subtext text-xs tracking-[0.22em] font-medium">
                      ENQUIRE
                    </span>
                  </div>
                </div>

                {/* Product Metadata */}
                <div className="mt-4 flex flex-col">
                  <h3
                    className="font-serif text-sm sm:text-base font-normal leading-snug"
                    style={{ color: "var(--c-ink)" }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="font-subtext text-xs font-normal mt-1.5 opacity-80 leading-relaxed tracking-[0.12em]"
                    style={{ color: "var(--c-soft)" }}
                  >
                    {product.material}
                  </p>
                  <p
                    className="font-serif text-sm sm:text-base tabular-nums mt-2 font-normal"
                    style={{ color: "var(--c-ink)" }}
                  >
                    {product.priceDisplay}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. CREDITS — 4 COLUMNS, HAIRLINE TOP BORDER, TINY CAPS ROLE ABOVE NAME     */}
      {/* ========================================================================= */}
      <section className="relative w-full px-6 sm:px-12 md:px-20 py-20 md:py-28 max-w-7xl mx-auto select-none">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {collection.credits.map((credit, idx) => (
            <ScrollReveal key={idx} delay={idx * 60}>
              <div
                className="pt-4 border-t flex flex-col"
                style={{ borderColor: "var(--c-line)" }}
              >
                <span
                  className="font-subtext text-[10px] sm:text-[11px] tracking-[0.26em] block font-normal"
                  style={{ color: "var(--c-soft)" }}
                >
                  {credit.role}
                </span>
                <span
                  className="font-serif text-sm sm:text-base mt-2 block font-normal"
                  style={{ color: "var(--c-ink)" }}
                >
                  {credit.name}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. NEXT COLLECTION — FULL-BLEED 70SVH BAND WITH DARKENING OVERLAY         */}
      {/* ========================================================================= */}
      <section className="relative w-full h-[70svh] overflow-hidden select-none">
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
          {/* Next Campaign Image */}
          <img
            src={collection.nextCampaign}
            alt={`Next collection: ${collection.nextName}`}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105 motion-reduce:transform-none"
          />

          {/* Dark overlay that lightens on hover */}
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/35 transition-colors duration-700 flex flex-col items-center justify-center text-center p-6">
            <span className="font-subtext text-xs tracking-[0.32em] text-white/70 mb-4 block font-normal">
              NEXT COLLECTION
            </span>
            <h2 className="font-serif text-[clamp(2rem,7vw,5.5rem)] font-normal text-white uppercase tracking-tight leading-none drop-shadow-lg">
              {collection.nextName}
            </h2>
            <div className="mt-8 flex items-center gap-2 font-subtext text-xs tracking-[0.24em] text-white/90">
              <span>ENTER</span>
              <span className="transition-transform duration-500 group-hover:translate-x-2 motion-reduce:transform-none">
                →
              </span>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
