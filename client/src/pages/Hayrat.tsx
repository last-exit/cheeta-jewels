/**
 * CHEETA JEWELS / HAYRAT : Dedicated Museum Archive
 * "rooted in a 30 year old legacy of collecting antique artwork"
 * Pure #FFFFFF gallery, zero boxes or AI card slop.
 * Unbounded museum catalog presentation with GT Sectra Display & GT America.
 */
import React, { useEffect } from "react";
import { Link } from "wouter";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";
import ScrollReveal from "@/components/ScrollReveal";
import { playMetallicClick } from "@/lib/soundEffects";

const ANTIQUE_PIECES = [
  {
    id: "antique-01",
    title: "mempo iron face armor mask",
    period: "edo period, c. 18th century",
    medium: "hand-forged russet iron, red lacquer interior, horsehair mustache",
    provenance: "acquired from kyoto private collection · thirty-year family archive",
    description:
      "A masterwork of Edo-era metallurgical armor. Forged from high-carbon beaten iron with aggressive facial contours and an integral throat guard (yodare-kake). The ferocity of the expression served both as physical protection for the samurai warlord and as psychological warfare on the field of combat.",
    image: "/hayrat/hayrat-antique-1.jpg",
  },
  {
    id: "antique-02",
    title: "soman full-face battle mask (ressei)",
    period: "late muromachi / early edo transition",
    medium: "forged iron, embossed tendons, vermilion lacquered teeth & nostrils",
    provenance: "tokyo antiquarian guild collection · cheeta jewels founding vault",
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
      {/* Official Transparent Cheetah Paw Sidebar Selector */}
      <CheetahBar dark={false} />

      {/* Centered Transparent CHEETA JEWELS Header Wordmark */}
      <HeaderWordmark dark={false} />

      {/* 1. Hero Exhibition Statement */}
      <section className="relative w-full pt-36 md:pt-48 pb-20 md:pb-28 px-6 sm:px-12 md:px-20 max-w-5xl mx-auto text-center select-none">
        <ScrollReveal>
          <span className="font-sans lowercase text-xs text-[#000000]/45 block mb-3 font-normal">
            provenance & lineage
          </span>
          <h1 className="font-serif lowercase text-[clamp(2.5rem,7vw,5.5rem)] font-normal tracking-tight leading-[1.05] text-[#000000]">
            hayrat
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="mt-8 md:mt-12 max-w-2xl mx-auto">
            {/* Exact Client Mandate Caption */}
            <p className="font-serif lowercase text-xl sm:text-2xl md:text-3xl text-[#000000]/90 leading-snug font-normal tracking-tight">
              &ldquo;rooted in a 30 year old legacy of collecting antique artwork&rdquo;
            </p>
            <p className="font-sans text-sm text-[#000000]/55 mt-6 leading-relaxed font-normal">
              Before the first ingot of 18K solid gold was cast for Cheeta Jewels, three decades were spent in pursuit of ancient forms, armor, and museum relics. Hayrat represents this unbroken lineage.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 2. Asymmetric Museum Gallery : Lineless, Frameless, Unbounded */}
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
                    <div className="mt-4 flex justify-between items-baseline font-sans lowercase text-xs text-[#000000]/45 font-normal">
                      <span>archive ref. 0{idx + 1}</span>
                      <span className="italic">private vault</span>
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
                    <span className="font-sans lowercase text-xs text-[#000000]/45 block font-normal">
                      {piece.period}
                    </span>
                    <h2 className="font-serif lowercase text-3xl sm:text-4xl md:text-5xl font-normal text-[#000000] leading-tight tracking-tight">
                      {piece.title}
                    </h2>
                  </div>

                  <div className="pt-6 space-y-4">
                    <div>
                      <span className="font-sans lowercase text-xs text-[#000000]/45 block font-normal">
                        medium & metallurgy
                      </span>
                      <p className="font-sans lowercase text-sm text-[#000000]/80 mt-1">
                        {piece.medium}
                      </p>
                    </div>

                    <div>
                      <span className="font-sans lowercase text-xs text-[#000000]/45 block font-normal">
                        provenance
                      </span>
                      <p className="font-sans lowercase text-sm text-[#000000]/80 mt-1">
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
      <section className="relative w-full px-6 sm:px-12 md:px-20 py-28 md:py-44 max-w-4xl mx-auto text-center select-none">
        <ScrollReveal>
          <span className="font-sans lowercase text-xs text-[#000000]/40 block mb-6 font-normal">
            the philosophical bridge
          </span>
          <blockquote className="font-serif lowercase text-2xl sm:text-3xl md:text-4xl leading-relaxed text-[#000000] font-normal">
            &ldquo;an object does not acquire dignity from modern convenience. it acquires dignity from its refusal to yield to time.&rdquo;
          </blockquote>
          <div className="mt-12 flex justify-center items-center gap-6 font-sans lowercase text-xs">
            <Link
              href="/collection/barrel"
              onClick={() => {
                try {
                  playMetallicClick();
                } catch {}
              }}
              className="text-[#000000] hover:opacity-60 transition-opacity font-medium"
            >
              explore the gun collection →
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
