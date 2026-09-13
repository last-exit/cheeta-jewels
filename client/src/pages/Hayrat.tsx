/**
 * CHEETA JEWELS / HAYRAT — Dedicated Museum Archive
 * "Rooted in a 30 year old legacy of collecting antique artwork"
 * Pure #FFFFFF gallery, zero boxes or AI card slop.
 * Unbounded museum catalog presentation with GT Sectra Display & GT America.
 */
import React, { useEffect } from "react";
import { Link } from "wouter";
import CheetahBar from "@/components/CheetahBar";
import ScrollReveal from "@/components/ScrollReveal";
import { playMetallicClick } from "@/lib/soundEffects";

const ANTIQUE_PIECES = [
  {
    id: "antique-01",
    title: "Mempo Iron Face Armor Mask",
    period: "Edo Period, c. 18th Century",
    medium: "Hand-Forged Russet Iron, Red Lacquer Interior, Horsehair Mustache",
    provenance: "Acquired from Kyoto Private Collection · Thirty-Year Family Archive",
    description:
      "A masterwork of Edo-era metallurgical armor. Forged from high-carbon beaten iron with aggressive facial contours and an integral throat guard (yodare-kake). The ferocity of the expression served both as physical protection for the samurai warlord and as psychological warfare on the field of combat.",
    image: "/hayrat/hayrat-antique-1.jpg",
  },
  {
    id: "antique-02",
    title: "Soman Full-Face Battle Mask (Ressei)",
    period: "Late Muromachi / Early Edo Transition",
    medium: "Forged Iron, Embossed Tendons, Vermilion Lacquered Teeth & Nostrils",
    provenance: "Tokyo Antiquarian Guild Collection · Cheeta Jewels Founding Vault",
    description:
      "A rare full-face iron visor capturing the wrathful deity persona. The deep chiseling of the brow and cheekbone ridges mirrors the sovereign architectural geometry that now anchors the Cheeta Jewels atelier design philosophy: unapologetic presence, permanent materials, and unyielding discipline.",
    image: "/hayrat/hayrat-antique-2.jpg",
  },
];

export default function Hayrat() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-[#FFFFFF] text-[#000000] selection:bg-[#000000] selection:text-[#FFFFFF]">
      {/* Official CJ Logo Sidebar Trigger */}
      <CheetahBar dark={false} />

      {/* Floating Transparent Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 md:px-16 py-6 flex items-center justify-between pointer-events-none select-none bg-transparent">
        <Link
          href="/"
          onClick={() => {
            try {
              playMetallicClick();
            } catch {}
          }}
          className="pointer-events-auto font-serif text-lg sm:text-xl text-[#000000] hover:opacity-60 transition-opacity pl-14 sm:pl-16 cursor-pointer tracking-tight"
          aria-label="Cheeta Jewels Home"
        >
          CHEETA JEWELS
        </Link>
        <span className="font-serif text-sm text-[#000000]/70">
          Hayrat Archive
        </span>
        <div className="w-16 sm:w-24" />
      </header>

      {/* 1. Hero Exhibition Statement */}
      <section className="relative w-full pt-36 md:pt-48 pb-20 md:pb-28 px-6 sm:px-12 md:px-20 max-w-5xl mx-auto text-center select-none">
        <ScrollReveal>
          <span className="font-sans text-xs text-[#000000]/45 block mb-3 font-normal">
            Provenance & Lineage
          </span>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] font-normal tracking-tight leading-[1.05] text-[#000000]">
            HAYRAT
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="mt-8 md:mt-12 max-w-2xl mx-auto">
            {/* Exact Client Mandate Caption */}
            <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#000000]/85 leading-snug font-normal">
              &ldquo;Rooted in a 30 year old legacy of collecting antique artwork&rdquo;
            </p>
            <p className="font-sans text-sm text-[#000000]/55 mt-6 leading-relaxed font-normal">
              Before the first ingot of 18K solid gold was cast for Cheeta Jewels, three decades were spent in pursuit of ancient forms, armor, and museum relics. Hayrat represents this unbroken lineage.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 2. Asymmetric Museum Gallery — Lineless, Frameless, Unbounded */}
      <section className="relative w-full px-6 sm:px-12 md:px-20 py-12 md:py-24 max-w-7xl mx-auto select-none">
        <div className="space-y-36 md:space-y-52">
          {ANTIQUE_PIECES.map((piece, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={piece.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center ${
                  isEven ? "" : "lg:grid-flow-dense"
                }`}
              >
                {/* Image Presentation: Floating Still Life on pure white */}
                <ScrollReveal
                  delay={100}
                  className={`lg:col-span-6 flex justify-center ${
                    isEven ? "lg:col-start-1" : "lg:col-start-7"
                  }`}
                >
                  <div className="w-full max-w-md">
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAFAFA]">
                      <img
                        src={piece.image}
                        alt={piece.title}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-[1.02]"
                      />
                    </div>
                    <div className="mt-4 flex justify-between items-baseline font-sans text-xs text-[#000000]/45 font-normal">
                      <span>Archive Ref. 0{idx + 1}</span>
                      <span className="italic">Private Vault</span>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Museum Curatorial Annotation */}
                <ScrollReveal
                  delay={180}
                  className={`lg:col-span-6 flex flex-col justify-center space-y-6 ${
                    isEven ? "lg:col-start-7" : "lg:col-start-1"
                  }`}
                >
                  <div className="space-y-2">
                    <span className="font-sans text-xs text-[#000000]/45 block font-normal">
                      {piece.period}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#000000] leading-tight tracking-tight">
                      {piece.title}
                    </h2>
                  </div>

                  <div className="border-t border-[#000000]/10 pt-6 space-y-4">
                    <div>
                      <span className="font-sans text-xs text-[#000000]/45 block font-normal">
                        Medium & Metallurgy
                      </span>
                      <p className="font-serif text-base text-[#000000]/80 mt-1">
                        {piece.medium}
                      </p>
                    </div>

                    <div>
                      <span className="font-sans text-xs text-[#000000]/45 block font-normal">
                        Provenance
                      </span>
                      <p className="font-serif text-base text-[#000000]/80 mt-1">
                        {piece.provenance}
                      </p>
                    </div>
                  </div>

                  <p className="font-sans text-sm leading-relaxed text-[#000000]/70 pt-2 max-w-xl font-normal">
                    {piece.description}
                  </p>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Curatorial Manifesto */}
      <section className="relative w-full px-6 sm:px-12 md:px-20 py-28 md:py-44 max-w-4xl mx-auto text-center border-t border-[#000000]/10 select-none">
        <ScrollReveal>
          <span className="font-sans text-xs text-[#000000]/40 block mb-6 font-normal">
            The Philosophical Bridge
          </span>
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl leading-relaxed text-[#000000] font-normal">
            &ldquo;An object does not acquire dignity from modern convenience. It acquires dignity from its refusal to yield to time.&rdquo;
          </blockquote>
          <div className="mt-12 flex justify-center items-center gap-6 font-sans text-xs">
            <Link
              href="/collection/barrel"
              onClick={() => {
                try {
                  playMetallicClick();
                } catch {}
              }}
              className="text-[#000000] hover:opacity-60 transition-opacity font-medium"
            >
              Explore The Gun Collection →
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
