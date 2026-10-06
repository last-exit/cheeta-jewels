/**
 * PHILOSOPHY : Monograph & High Jewelry Archive
 * Pure luxury typography in GT Sectra Display & GT America.
 */
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import CheetahBar from "@/components/CheetahBar";
import HeaderWordmark from "@/components/HeaderWordmark";

const mark = "/brand/cheeta-cj-transparent.png";
const atelierImage = "/manus-storage/cheeta-dubai-atelier_0dde518b.png";
const necklaceImage = "/manus-storage/cheeta-atrium-necklace-bone.jpg";
const emeraldRing = "/manus-storage/cheeta-emerald-signet-bone.jpg";
const eyeImage = "/manus-storage/cheeta-gaze-landscape.jpg";
const leopardBox = "/manus-storage/cheeta-leopard-vault-box.jpg";

const chapters = [
  {
    num: "i",
    title: "the beginning",
    copy: "Raised beneath Dubai's skyline, Eisa Saidi built an instinct for style that never asked for permission. Grandeur without conviction is noise.",
  },
  {
    num: "ii",
    title: "the proof",
    copy: "The look that invited ridicule became influence. What was mocked first was copied later. Confidence is unbreakable.",
  },
  {
    num: "iii",
    title: "the house",
    copy: "Cheeta Jewels turns conviction into wearable art. Solid 18K gold, natural Colombian emeralds, and architectural mineral optics.",
  },
];

export default function Philosophy() {
  return (
    <main className="min-h-screen w-full bg-[#F4F3EE] text-[#0B0B0C] selection:bg-[#0B0B0C] selection:text-[#F4F3EE] overflow-x-hidden">
      {/* Floating Transparent Cheetah Bar */}
      <CheetahBar />

      {/* Centered Transparent CHEETA JEWELS Header Wordmark */}
      <HeaderWordmark dark={false} />

      {/* ========================================================================= */}
      {/* 1. MONOGRAPH HERO: "dubai born."                                         */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-20 pt-28 md:pt-40 pb-24 md:pb-36 max-w-6xl mx-auto pl-16 md:pl-28">
        <div className="flex items-baseline justify-between mb-12">
          <span className="font-sans lowercase text-xs text-[#4A0E16] font-medium">
            dubai atelier
          </span>
        </div>

        {/* Monogram Seal */}
        <div className="h-10 w-10 mb-8 opacity-80">
          <img src={mark} alt="cheeta jewels monogram" className="h-full w-full object-contain" />
        </div>

        {/* Monumental Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="font-serif lowercase text-[clamp(4.5rem,14vw,13rem)] leading-[0.8] tracking-[-0.04em] text-[#0B0B0C]"
        >
          dubai<br />
          born<span className="text-[#4A0E16]">.</span>
        </motion.h1>

        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end pt-12">
          <div className="lg:col-span-5 font-sans lowercase text-xs text-[#0B0B0C]/55 leading-relaxed">
            a luxury house for solid gold jewellery, eyewear, and unmistakable presence.
          </div>
          <div className="lg:col-span-7 font-sans text-base md:text-lg leading-relaxed text-[#0B0B0C]/80">
            We work in solid 18K gold, natural Colombian emeralds, and custom mineral optics. Every piece is forged for individuals whose presence speaks before they do.
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE ATELIER FOUNDRY PHOTO                                              */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-20 py-12 md:py-24 max-w-6xl mx-auto pl-16 md:pl-28">
        <div className="aspect-[16/9] w-full overflow-hidden bg-[#111112]">
          <img
            src={atelierImage}
            alt="Cheeta Jewels Dubai Atelier Foundry"
            className="h-full w-full object-cover filter contrast-[1.08] brightness-[0.92]"
          />
        </div>
        <div className="mt-4 flex items-baseline justify-between font-sans lowercase text-xs text-[#0B0B0C]/40">
          <span>the gold foundry · dubai</span>
          <span>lost-wax casting</span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THREE ESSAY CHAPTERS                                                   */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-20 py-20 md:py-32 max-w-6xl mx-auto space-y-20 pl-16 md:pl-28">
        <div className="space-y-16 md:space-y-20">
          {chapters.map((chap, idx) => (
            <motion.article
              key={chap.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start pb-12"
            >
              <div className="md:col-span-2 font-serif lowercase text-2xl text-[#4A0E16]">
                {chap.num}
              </div>
              <div className="md:col-span-4 font-serif lowercase text-2xl md:text-3xl text-[#0B0B0C] tracking-tight">
                {chap.title}
              </div>
              <div className="md:col-span-6 font-sans text-base text-[#0B0B0C]/75 leading-relaxed">
                {chap.copy}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. LEOPARD ARCHIVE & HIGH JEWELRY                                         */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-20 py-24 md:py-36 max-w-6xl mx-auto pl-16 md:pl-28">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-[#0B0B0C]/10 mb-14">
          <div className="space-y-3">
            <span className="font-sans lowercase text-xs tracking-[0.25em] text-[#4A0E16] font-medium block">
              archive · collection iv
            </span>
            <h2 className="font-serif lowercase text-4xl md:text-5xl lg:text-6xl text-[#0B0B0C] tracking-tight leading-[0.95]">
              the leopard archive
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-sans text-sm md:text-base text-[#0B0B0C]/75 leading-relaxed">
              Inspired by 1980s power dressing and vintage Cartier archives, each piece is signed with solid gold hardware and delivered in handcrafted Italian leopard velvet.
            </p>
          </div>
        </div>

        {/* Archival Plates: Atmosphere & The Vault */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start mb-20 md:mb-28">
          <div className="group">
            <div className="aspect-[4/3] overflow-hidden bg-[#0D0C0B] relative">
              <img
                src={eyeImage}
                alt="Cheetah Instinct Gaze"
                className="h-full w-full object-cover filter contrast-[1.06] brightness-95 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
            </div>
            <div className="mt-3.5 flex items-baseline justify-between font-sans lowercase text-xs text-[#0B0B0C]/45">
              <span className="font-serif lowercase text-base text-[#0B0B0C]">the gaze</span>
              <span>archive plate 01 · instinct & presence</span>
            </div>
          </div>

          <div className="group">
            <div className="aspect-[4/3] overflow-hidden bg-[#E7E5DC]/50 relative">
              <img
                src={leopardBox}
                alt="Handcrafted Italian Leopard Velvet Box"
                className="h-full w-full object-cover filter contrast-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
            </div>
            <div className="mt-3.5 flex items-baseline justify-between font-sans lowercase text-xs text-[#0B0B0C]/45">
              <span className="font-serif lowercase text-base text-[#0B0B0C]">the velvet vault</span>
              <span>plate 02 · italian leopard velvet</span>
            </div>
          </div>
        </div>

        {/* Curated High Jewelry Showcase */}
        <div>
          <div className="flex items-baseline justify-between pb-3 mb-8 border-b border-[#0B0B0C]/8 font-sans lowercase text-xs text-[#0B0B0C]/40">
            <span>curated high jewelry</span>
            <span>solid 18k gold · natural gemstones</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <article className="group">
              <div className="aspect-[4/3] relative overflow-hidden bg-[#F0F0E8] border border-[#0B0B0C]/6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-[#0B0B0C]/15">
                <img
                  src={emeraldRing}
                  alt="The Emerald Signet"
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <h3 className="font-serif lowercase text-2xl text-[#0B0B0C] group-hover:text-[#4A0E16] transition-colors">
                  the emerald signet
                </h3>
                <span className="font-sans lowercase text-xs text-[#0B0B0C]/55 tracking-wider">
                  4.20 ct muzo emerald · 18k gold
                </span>
              </div>
              <div className="mt-1 flex items-baseline justify-between font-sans lowercase text-[11px] text-[#0B0B0C]/40">
                <span>lost-wax casting · dubai atelier</span>
                <span>[ no. 081 ]</span>
              </div>
            </article>

            <article className="group">
              <div className="aspect-[4/3] relative overflow-hidden bg-[#F0F0E8] border border-[#0B0B0C]/6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-[#0B0B0C]/15">
                <img
                  src={necklaceImage}
                  alt="The Atrium Gold Collar"
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <h3 className="font-serif lowercase text-2xl text-[#0B0B0C] group-hover:text-[#4A0E16] transition-colors">
                  the atrium gold collar
                </h3>
                <span className="font-sans lowercase text-xs text-[#0B0B0C]/55 tracking-wider">
                  3.45 ct pavé diamonds · 18k gold
                </span>
              </div>
              <div className="mt-1 flex items-baseline justify-between font-sans lowercase text-[11px] text-[#0B0B0C]/40">
                <span>sculpted gold fluting · emerald drop</span>
                <span>[ no. 042 ]</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CLOSING MONUMENTAL FOOTER                                              */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-[#111112] text-[#F4F3EE] px-6 md:px-20 py-24 md:py-36 pl-16 md:pl-28">
        <div className="max-w-6xl mx-auto flex flex-col justify-between gap-16">
          <h2 className="font-serif lowercase text-[clamp(4.5rem,11vw,12rem)] leading-[0.75] tracking-[-0.04em] text-white">
            icon<br />
            livin<span className="text-[#4A0E16]">’</span>.
          </h2>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-12">
            <span className="font-serif lowercase text-lg text-white/70">
              "presence speaks before words do."
            </span>

            <div className="flex items-center gap-8">
              <Link
                href="/retail"
                className="font-sans lowercase text-xs tracking-wider text-[#F4F3EE] hover:text-[#d4af37] transition-colors flex items-center gap-1.5"
              >
                <span>retail</span>
                <ArrowUpRight size={13} />
              </Link>
              <Link
                href="/rooms"
                className="font-sans lowercase text-xs tracking-wider text-[#F4F3EE] hover:text-[#d4af37] transition-colors flex items-center gap-1.5"
              >
                <span>exclusive rooms</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
