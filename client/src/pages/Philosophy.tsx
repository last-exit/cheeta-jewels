/**
 * PHILOSOPHY
 * Private art installation editorial.
 * Background: Dominant Bone White (#F4F4F0).
 * Rules: No em-dashes. No generic AI buzzwords. Simple, direct prose.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import CheetahBar from "@/components/CheetahBar";

export default function Philosophy() {
  return (
    <main className="min-h-screen w-full bg-[#F4F4F0] text-[#111111] pl-16 md:pl-20">
      {/* Navigation */}
      <CheetahBar />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Header */}
        <header className="border-b border-[#111111]/15 pb-8 mb-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#111111]/50">
            04 / Philosophy
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(2.8rem,8vw,7rem)] leading-[0.92] font-normal tracking-[-0.03em] mt-4"
          >
            Diamonds are made in the rough.
          </motion.h1>
        </header>

        {/* Narrative Sections */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          <div className="md:col-span-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[#111111]/60 space-y-4">
            <p>Dubai. 2026.</p>
            <p>Founded by Eisa Saidi.</p>
            <p>Cheeta Jewels makes wearable identity for those who understand that presence is a decision.</p>
          </div>

          <div className="md:col-span-8 space-y-12">
            <div className="font-serif text-2xl md:text-3xl leading-relaxed text-[#111111]/90">
              Cheeta is for people who learned early that standing apart has a cost.
              The house starts there.
            </div>

            <div className="space-y-6 font-sans text-base md:text-lg leading-relaxed text-[#111111]/80 max-w-[680px]">
              <p>
                Raised beneath Dubai's skyline, Eisa Saidi built an instinct for style that
                never asked for permission. What was mocked first was copied later.
              </p>
              <p>
                The house turns that conviction into stone, gold, and fine eyewear.
                Each piece is made to keep its shape.
              </p>
            </div>

            {/* Direct Links */}
            <div className="pt-8 border-t border-[#111111]/15 flex flex-wrap gap-6 font-mono text-[11px] uppercase tracking-[0.18em]">
              <Link
                href="/exclusive-rooms"
                className="py-3 px-6 bg-[#111111] text-[#F4F4F0] hover:bg-black transition-colors"
              >
                Enter Exclusive Rooms
              </Link>
              <Link
                href="/retail"
                className="py-3 px-6 border border-[#111111]/30 hover:border-[#111111] transition-colors"
              >
                View Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
