/**
 * CHEETA JEWELS : TRIBUTE TO HAYRAT
 * "a tribute to the house that made cheeta jewels possible"
 * Pure luxury minimalism with GT Sectra Display & GT America typography.
 * Featuring the official Hayrat ~Fine Gems & Arts~ emblem plate,
 * heartfelt tribute narrative, and bespoke ambient background gemology motifs.
 * Zero unneeded subtext, coordinates, or AI card boxes.
 */
import React, { useEffect } from "react";
import { Link } from "wouter";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";
import ScrollReveal from "@/components/ScrollReveal";
import SubtleLuxuryBackground from "@/components/SubtleLuxuryBackground";
import HayratBespokeMotifs from "@/components/HayratBespokeMotifs";
import { playMetallicClick } from "@/lib/soundEffects";

const hayratEmblem = "/hayrat/hayrat-logo.png";

export default function Hayrat() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-[#F9F6F0] text-[#2A241D] selection:bg-[#2A241D] selection:text-[#F9F6F0] overflow-hidden">
      {/* Official Transparent Cheetah Paw Sidebar Trigger */}
      <CheetahBar dark={false} />

      {/* Centered Transparent CHEETA JEWELS Header Wordmark */}
      <HeaderWordmark dark={false} />

      {/* Subtle Background Swirls & Cheetah Rosettes (3-4% Opacity) */}
      <SubtleLuxuryBackground variant="full" />

      {/* Bespoke Hayrat Gemological & Antique Art Vectors (3-4% Opacity) */}
      <HayratBespokeMotifs />

      {/* ========================================================================= */}
      {/* 1. HERO TRIBUTE HEADER                                                    */}
      {/* ========================================================================= */}
      <section className="relative z-10 w-full pt-32 sm:pt-40 md:pt-48 pb-14 md:pb-20 px-6 sm:px-12 md:px-20 max-w-5xl mx-auto text-center select-none">
        <ScrollReveal>
          <h1 className="font-serif lowercase text-[clamp(2.8rem,8vw,6.5rem)] font-normal tracking-tight leading-[0.95] text-[#2A241D]">
            hayrat
          </h1>
          <p className="font-serif italic lowercase text-lg sm:text-xl text-[#2A241D]/60 mt-3">
            fine gems & arts
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mt-8 md:mt-12 max-w-2xl mx-auto">
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#2A241D] leading-snug font-normal tracking-tight">
              &ldquo;rooted in a thirty-year legacy of fine gemstones, antique arts, and unconditional belief.&rdquo;
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE HAYRAT EMBLEM CENTERPIECE (GALLERY TRIBUTE PLATE)                   */}
      {/* ========================================================================= */}
      <section className="relative z-10 w-full px-6 sm:px-12 md:px-20 py-10 md:py-16 max-w-5xl mx-auto select-none">
        <ScrollReveal className="w-full flex justify-center">
          <div className="relative w-full max-w-xl flex flex-col items-center">
            {/* Ambient Radial Gem Halo */}
            <div
              className="absolute inset-0 pointer-events-none flex items-center justify-center -top-6"
              aria-hidden="true"
            >
              <div className="w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full bg-gradient-to-tr from-[#254B38]/[0.14] via-[#D4AF37]/[0.06] to-transparent blur-3xl" />
            </div>

            {/* Unboxed, Pure Gallery Frame of the Official Hayrat Artwork */}
            <div className="relative aspect-square w-full max-w-[440px] overflow-hidden shadow-[0_24px_55px_rgba(37,75,56,0.18)] transition-transform duration-1000 ease-out hover:scale-[1.015]">
              <img
                src={hayratEmblem}
                alt="Hayrat Fine Gems & Arts"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE TRIBUTE ESSAY : AN UNBROKEN DEBT OF GRATITUDE                       */}
      {/* ========================================================================= */}
      <section className="relative z-10 w-full px-6 sm:px-12 md:px-20 py-16 md:py-24 max-w-4xl mx-auto select-none">
        <div className="space-y-12 md:space-y-16 text-[#2A241D]">
          <ScrollReveal delay={80}>
            <div className="border-t border-[#2A241D]/10 pt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-4">
                <h2 className="font-serif lowercase text-2xl sm:text-3xl font-normal tracking-tight text-[#2A241D]">
                  the foundation
                </h2>
              </div>
              <div className="md:col-span-8 font-sans text-base sm:text-lg text-[#2A241D]/80 leading-relaxed space-y-5">
                <p>
                  Every luxury house begins with someone who believed before the world took notice. For Cheeta Jewels, that beginning was shaped, protected, and inspired by Hayrat.
                </p>
                <p>
                  Long before the first gold chassis was milled or the first mineral optics were set, decades were spent in the quiet study of ancient masterworks, antique weaponry, and rare gems. Hayrat opened the doors to this timeless world of form and conviction.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="border-t border-[#2A241D]/10 pt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-4">
                <h2 className="font-serif lowercase text-2xl sm:text-3xl font-normal tracking-tight text-[#2A241D]">
                  with gratitude
                </h2>
              </div>
              <div className="md:col-span-8 font-sans text-base sm:text-lg text-[#2A241D]/80 leading-relaxed space-y-5">
                <p>
                  This space is dedicated in tribute to Hayrat ~Fine Gems & Arts~. Their early mentorship, patronage, and unwavering generosity provided the bedrock upon which our atelier now stands.
                </p>
                <p>
                  We carry their respect for permanence into every piece of solid eighteen-karat gold we craft. Without Hayrat, the story of Cheeta Jewels could not have begun.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CLOSING MONOGRAM INVITATION                                            */}
      {/* ========================================================================= */}
      <section className="relative z-10 w-full px-6 sm:px-12 md:px-20 py-24 md:py-36 max-w-4xl mx-auto text-center select-none">
        <ScrollReveal>
          <blockquote className="font-serif lowercase text-2xl sm:text-3xl md:text-4xl leading-relaxed text-[#2A241D] font-normal max-w-2xl mx-auto">
            &ldquo;permanence is not born from trend; it is inherited from those who mastered the craft before us.&rdquo;
          </blockquote>

          <div className="mt-12 flex justify-center items-center gap-6 font-sans lowercase text-xs">
            <Link
              href="/collection/barrel"
              onClick={() => {
                try {
                  playMetallicClick();
                } catch {}
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-sans text-xs font-medium bg-[#2A241D] text-[#F9F6F0] hover:bg-[#D4AF37] hover:text-[#2A241D] transition-all duration-300 cursor-pointer shadow-sm active:scale-98"
            >
              <span>explore the collection</span>
              <span>→</span>
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
