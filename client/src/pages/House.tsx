/**
 * Desert Monolith style: the House is presented as an origin dossier—Dubai-born,
 * editorially restrained, and centered on Eisa Saidi's living-icon conviction.
 */
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import VintageHud from "@/components/VintageHud";

const mark = "/manus-storage/cheeta-cj-official_8dcc9825.png";
const atelierImage = "/manus-storage/cheeta-dubai-atelier_0dde518b.png";
const necklaceImage = "/manus-storage/cheeta-necklace-atrium_e7928040.png";

const chapters = [
  ["01", "The beginning", "Raised beneath Dubai's ever-changing skyline, Eisa Saidi built an instinct for style that never asked for permission."],
  ["02", "The proof", "The look that invited ridicule became influence. What was mocked first was copied later."],
  ["03", "The house", "Cheeta Jewels turns that conviction into wearable art for people who refuse to blend in."],
];

export default function House() {
  return (
    <main className="relative overflow-hidden bg-[#efede6] text-[#181814]">
      <VintageHud />

      <section className="house-hero px-5 pb-16 pt-24 sm:px-8 sm:pb-24 sm:pt-28 lg:px-11 lg:pb-32 lg:pt-36">
        <div className="mx-auto max-w-[1680px] border-t border-[#181814]/20 pt-5">
          <div className="flex items-start justify-between gap-5">
            <p className="eyebrow">Dubai-born / Icon-led</p>
            <p className="max-w-[175px] text-right font-mono text-[9px] uppercase leading-[1.75] tracking-[0.13em] text-[#181814]/55">Dubai · 2026<br />A private house</p>
          </div>
          <img src={mark} alt="Cheeta Jewels CJ monogram" className="house-transition-seal" />
          <motion.h1 initial={{ opacity: 0, y: 38 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="mt-14 font-display text-[clamp(5.7rem,18vw,23rem)] leading-[0.69] tracking-[-0.078em]">
            DUBAI<br />BORN<span className="text-[#6b151e]">.</span>
          </motion.h1>
          <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[1fr_1.5fr] lg:items-end">
            <p className="max-w-[285px] font-mono text-[10px] uppercase leading-[1.85] tracking-[0.14em] text-[#181814]/60">A Dubai-born luxury house for jewellery, eyewear, and the person becoming impossible to ignore.</p>
            <p className="max-w-[720px] font-mono text-[clamp(0.88rem,1.35vw,1.22rem)] uppercase leading-[1.65] tracking-[0.055em] text-[#181814]/75">Cheeta Jewels makes wearable identity for those who understand that presence is not a performance. It is a decision.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#181814] px-5 py-20 text-[#efede6] sm:px-8 sm:py-28 lg:px-11 lg:py-40">
        <div className="mx-auto max-w-[1680px]">
          <div className="founder-grid border-t border-[#efede6]/25 pt-5">
            <div className="flex flex-col justify-between">
              <div>
                <p className="eyebrow text-[#efede6]/60">The founder / Eisa Saidi</p>
                <h2 className="mt-7 font-display text-[clamp(4rem,8vw,10.5rem)] leading-[0.75] tracking-[-0.07em]">THE<br />CHEETAH</h2>
              </div>
              <div className="mt-10 max-w-[278px] text-[15px] leading-[1.6] text-[#efede6]/72 lg:mt-0">
                <p>Social personality, boxer, actor, designer—Eisa Saidi built the house from a belief that difference is not a liability.</p>
                <p className="mt-5 font-mono text-[10px] uppercase leading-[1.8] tracking-[0.12em] text-[#efede6]/52">Dubai-born. Exact in its point of view. Built for people who stand apart.</p>
              </div>
            </div>
            <figure className="founder-portrait-frame relative overflow-hidden bg-[#252a25]">
              <img src={atelierImage} alt="Architectural Cheeta Jewels atelier in Dubai" className="h-full w-full object-cover opacity-60" />
              <div className="founder-portrait-overlay">
                <img src={mark} alt="" className="h-12 w-12 object-contain brightness-0 invert" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em]">Dubai at night</p>
                  <p className="mt-2 max-w-[230px] text-[12px] leading-relaxed text-[#efede6]/65">A city in motion. A house formed from the decision to remain distinct.</p>
                </div>
              </div>
              <figcaption className="absolute bottom-0 left-0 right-0 flex justify-between border-t border-[#efede6]/25 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.14em] text-[#efede6]/65"><span>House view</span><span>Dubai</span></figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-11 lg:py-40">
        <div className="mx-auto max-w-[1680px]">
          <div className="grid gap-10 border-t border-[#181814]/20 pt-5 lg:grid-cols-[1fr_2fr]">
            <p className="eyebrow">Three things make the house</p>
            <p className="max-w-[800px] font-display text-[clamp(3.2rem,7vw,9rem)] leading-[0.8] tracking-[-0.068em]">NOT MADE TO<br />FIT THE FRAME.</p>
          </div>
          <div className="chapter-list mt-16 lg:mt-24">
            {chapters.map(([number, title, copy]) => (
              <motion.article key={number} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55 }} className="chapter-row">
                <span className="font-mono text-[10px] text-[#136f54]">{number} / 03</span>
                <h3 className="font-display text-[clamp(2.8rem,5.5vw,7rem)] leading-[0.82] tracking-[-0.06em]">{title.toUpperCase()}</h3>
                <p>{copy}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#d8d5cb] px-5 py-20 sm:px-8 sm:py-28 lg:px-11 lg:py-40">
        <img src={necklaceImage} alt="Gold and emerald Cheeta object" className="absolute inset-y-0 right-0 h-full w-full object-cover opacity-30 mix-blend-multiply lg:w-1/2" />
        <div className="relative mx-auto flex max-w-[1680px] flex-col justify-between gap-16 border-t border-[#181814]/20 pt-5 lg:min-h-[52vh]">
          <p className="eyebrow">The house line</p>
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <h2 className="font-display text-[clamp(5rem,12vw,16rem)] leading-[0.69] tracking-[-0.077em]">ICON<br />LIVIN’.</h2>
            <div>
              <p className="max-w-[330px] text-[17px] leading-[1.55]">Not an instruction to be louder. A reason to be exact about who you are.</p>
              <Link href="/philosophy" className="archive-button mt-8 max-w-[330px]"><span>Read the philosophy</span><ArrowDownRight size={16} strokeWidth={1.4} /></Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#efede6] px-5 py-7 sm:px-8 lg:px-11"><div className="mx-auto flex max-w-[1680px] items-center justify-between border-t border-[#181814]/20 pt-5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#181814]/55"><span>Cheeta Jewels / Dossier 01</span><Link href="/barrel-01" className="magnetic-link flex items-center gap-2">View the Barrel <ArrowUpRight size={13} /></Link></div></footer>
    </main>
  );
}
