/**
 * PHILOSOPHY — Monograph & High Jewelry Archive
 * Pure luxury typography in GT Sectra Display & GT America.
 */
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import CheetahBar from "@/components/CheetahBar";

const mark = "/manus-storage/cheeta-cj-official_8dcc9825.png";
const atelierImage = "/manus-storage/cheeta-dubai-atelier_0dde518b.png";
const necklaceImage = "/manus-storage/cheeta-necklace-atrium_e7928040.png";
const emeraldRing = "/manus-storage/cheeta-emerald-signet-still.jpg";
const eyeImage = "/manus-storage/cheeta-presence-eye_09963203.png";
const leopardBox = "/manus-storage/cheeta-leopard-vault-box.jpg";

const chapters = [
  {
    num: "I",
    title: "The Beginning",
    copy: "Raised beneath Dubai's skyline, Eisa Saidi built an instinct for style that never asked for permission. Grandeur without conviction is noise.",
  },
  {
    num: "II",
    title: "The Proof",
    copy: "The look that invited ridicule became influence. What was mocked first was copied later. Confidence is unbreakable.",
  },
  {
    num: "III",
    title: "The House",
    copy: "Cheeta Jewels turns conviction into wearable art. Solid 18K gold, natural Colombian emeralds, and architectural mineral optics.",
  },
];

export default function Philosophy() {
  return (
    <main className="min-h-screen w-full bg-[#F4F3EE] text-[#0B0B0C] selection:bg-[#0B0B0C] selection:text-[#F4F3EE] overflow-x-hidden">
      {/* Floating Transparent Cheetah Bar */}
      <CheetahBar />

      {/* ========================================================================= */}
      {/* 1. MONOGRAPH HERO: "DUBAI BORN."                                         */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-20 pt-28 md:pt-40 pb-24 md:pb-36 max-w-6xl mx-auto pl-16 md:pl-28">
        <div className="flex items-baseline justify-between mb-12">
          <span className="font-sans text-xs text-[#4A0E16] font-medium">
            Dubai Atelier
          </span>
        </div>

        {/* Monogram Seal */}
        <div className="h-10 w-10 mb-8 opacity-80">
          <img src={mark} alt="Cheeta Jewels Monogram" className="h-full w-full object-contain" />
        </div>

        {/* Monumental Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="font-serif text-[clamp(4.5rem,14vw,13rem)] leading-[0.8] tracking-[-0.04em] text-[#0B0B0C]"
        >
          DUBAI<br />
          BORN<span className="text-[#4A0E16]">.</span>
        </motion.h1>

        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end border-t border-[#0B0B0C]/10 pt-12">
          <div className="lg:col-span-5 font-sans text-xs text-[#0B0B0C]/55 leading-relaxed">
            A luxury house for solid gold jewellery, eyewear, and unmistakable presence.
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
        <div className="mt-4 flex items-baseline justify-between font-sans text-xs text-[#0B0B0C]/40">
          <span>The Gold Foundry · Dubai</span>
          <span>Lost-Wax Casting</span>
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
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start border-b border-[#0B0B0C]/10 pb-12"
            >
              <div className="md:col-span-2 font-serif text-2xl text-[#4A0E16]">
                {chap.num}
              </div>
              <div className="md:col-span-4 font-serif text-2xl md:text-3xl text-[#0B0B0C] tracking-tight">
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
      <section className="px-6 md:px-20 py-20 md:py-32 max-w-6xl mx-auto pl-16 md:pl-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 aspect-[4/3] overflow-hidden bg-[#161413] relative">
            <img
              src={eyeImage}
              alt="Cheetah Eye Gaze"
              className="h-full w-full object-cover filter contrast-125 brightness-90"
            />
          </div>

          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-serif text-3xl md:text-4xl text-[#0B0B0C]">
              The Leopard Archive
            </h2>
            <p className="font-sans text-sm text-[#0B0B0C]/75 leading-relaxed">
              Inspired by 1980s power dressing and vintage Cartier archives, each piece is signed with solid gold hardware and delivered in handcrafted Italian leopard velvet.
            </p>

            <div className="pt-2 aspect-[16/9] w-full overflow-hidden shadow-lg">
              <img
                src={leopardBox}
                alt="Handcrafted Italian Leopard Velvet Box"
                className="h-full w-full object-cover filter contrast-[1.05]"
              />
            </div>
          </div>
        </div>

        {/* High Jewelry Curated Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 pt-12 border-t border-[#0B0B0C]/10">
          <article className="group">
            <div className="aspect-[4/3] relative flex items-center justify-center p-8 overflow-hidden bg-[#EBEAE4]/40">
              <img
                src={emeraldRing}
                alt="Emerald Ring"
                className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-[0_20px_35px_rgba(0,0,0,0.1)]"
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="font-serif text-2xl text-[#0B0B0C]">The Emerald Signet</h3>
              <span className="font-sans text-xs text-[#0B0B0C]/50">4.20 ct Muzo Emerald</span>
            </div>
          </article>

          <article className="group relative z-10">
            <div className="aspect-[4/3] relative flex items-center justify-center p-8 overflow-hidden bg-[#EBEAE4]/40">
              <img
                src={necklaceImage}
                alt="Cheeta Collar"
                className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-[0_20px_35px_rgba(0,0,0,0.1)]"
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="font-serif text-2xl text-[#0B0B0C]">The Atrium Gold Collar</h3>
              <span className="font-sans text-xs text-[#0B0B0C]/50">3.45 ct Pavé Diamonds</span>
            </div>
          </article>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CLOSING MONUMENTAL FOOTER                                              */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-[#111112] text-[#F4F3EE] px-6 md:px-20 py-24 md:py-36 pl-16 md:pl-28">
        <div className="max-w-6xl mx-auto flex flex-col justify-between gap-16">
          <h2 className="font-serif text-[clamp(4.5rem,11vw,12rem)] leading-[0.75] tracking-[-0.04em] text-white">
            ICON<br />
            LIVIN<span className="text-[#4A0E16]">’</span>.
          </h2>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-12 border-t border-white/10">
            <span className="font-serif text-lg text-white/70 italic">
              "Presence speaks before words do."
            </span>

            <div className="flex items-center gap-8">
              <Link
                href="/retail"
                className="font-sans text-xs uppercase tracking-[0.18em] text-[#F4F3EE] hover:text-[#d4af37] transition-colors flex items-center gap-1.5"
              >
                <span>Collection</span>
                <ArrowUpRight size={13} />
              </Link>
              <Link
                href="/rooms"
                className="font-sans text-xs uppercase tracking-[0.18em] text-[#F4F3EE] hover:text-[#d4af37] transition-colors flex items-center gap-1.5"
              >
                <span>Exclusive Rooms</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
