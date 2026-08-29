/**
 * Desert Monolith style: an archival, stone-and-ink product experience where
 * high-jewelry facts and cinematic imagery occupy the page with calm authority.
 */
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowDownRight, ArrowLeft, ChevronRight, Plus, X } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import TwinStrikeSeal from "@/components/TwinStrikeSeal";

const gallery = [
  {
    url: "/manus-storage/cheeta-double-barrel-hero_c55a3dea.png",
    alt: "The Barrel 01 double-barrel sunglasses in gold and smoke lens",
    className: "object-cover object-center",
  },
  {
    url: "/manus-storage/cheeta-dubai-atelier_0dde518b.png",
    alt: "The Barrel 01 resting in the Cheeta Jewels atelier in Dubai at dusk",
    className: "object-cover object-center",
  },
];

const details = [
  ["Lens", "44 mm smoke mineral"],
  ["Frame", "18K brushed gold"],
  ["Stone", "0.28 ct emerald pair"],
  ["Edition", "01 / 25"],
];

const privateCollection = [
  { id: "barrel-01", name: "The Barrel 01", material: "18K gold / smoke mineral", price: "AED 15,000", edition: "01 / 25", image: "/manus-storage/cheeta-double-barrel-hero_c55a3dea.png", secondaryImage: "/manus-storage/cheeta-double-barrel-alt_8f963d0f.png", alt: "The Barrel 01 in gold and smoke lens", secondaryAlt: "The Barrel 01 from an alternate three-quarter campaign angle" },
  { id: "signet-02", name: "The Signet 02", material: "Emerald / brushed gold", price: "AED 18,500", edition: "02 / 12", image: "/manus-storage/cheeta-emerald-ring_510231e1.png", secondaryImage: "/manus-storage/cheeta-emerald-signet-alt_3be3bf1a.png", alt: "Emerald Cheeta signet ring", secondaryAlt: "The Signet 02 from an alternate campaign angle" },
  { id: "atrium-03", name: "The Atrium 03", material: "Gold link / emerald detail", price: "AED 24,000", edition: "03 / 09", image: "/manus-storage/cheeta-necklace-atrium_e7928040.png", secondaryImage: "/manus-storage/cheeta-atrium-necklace-alt_37930290.png", alt: "Gold and emerald Cheeta necklace", secondaryAlt: "The Atrium 03 from an alternate campaign angle" },
] as const;

function DossierFigure({ image, index }: { image: typeof gallery[number]; index: number }) {
  const mediaRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: mediaRef, offset: ["start end", "end start"] });
  const imageY = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.25 });

  return (
    <motion.figure
      ref={mediaRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`dossier-media group relative col-span-2 overflow-hidden bg-[#d8d5cc] ${index === 0 ? "aspect-[16/10]" : "aspect-[16/9]"}`}
    >
      <motion.img style={{ scale: 1.075, y: imageY }} src={image.url} alt={image.alt} className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] ${image.className}`} />
      <figcaption className="dossier-caption absolute bottom-0 left-0 flex w-full translate-y-full items-center justify-between px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#efede6] transition-transform duration-300">
        <span>{index === 0 ? "Object study 01 / Barrel" : "Atelier context 02 / Dubai"}</span>
        <span className="inline-flex items-center gap-2"><i className="h-1.5 w-1.5 rounded-full bg-[#136f54]" />Witnessed</span>
      </figcaption>
    </motion.figure>
  );
}

export default function ProductDetail() {
  const [openDetail, setOpenDetail] = useState<number | null>(0);
  const [selectedObject, setSelectedObject] = useState<(typeof privateCollection)[number]>(privateCollection[0]);
  const [isAcquisitionOpen, setAcquisitionOpen] = useState(false);
  const [acquisitionStage, setAcquisitionStage] = useState<"threshold" | "request">("threshold");
  const pageRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });
  const dossierProgress = useSpring(scrollYProgress, { stiffness: 95, damping: 24, mass: 0.3 });

  function beginAcquisition(object: (typeof privateCollection)[number]) {
    setSelectedObject(object);
    setAcquisitionStage("threshold");
    setAcquisitionOpen(true);
  }

  function closeAcquisition() {
    setAcquisitionOpen(false);
    setAcquisitionStage("threshold");
  }

  return (
    <main ref={pageRef} className="relative min-h-screen overflow-hidden bg-[#efede6] text-[#181814]">
      <motion.div style={{ scaleX: dossierProgress }} className="dossier-progress" />
      <header className="relative z-20 flex items-center justify-between px-5 py-5 sm:px-8 lg:px-11">
        <Link href="/" className="group inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#181814]">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-[#181814]/25 transition-colors duration-200 group-hover:bg-[#181814] group-hover:text-[#efede6]">
            <ArrowLeft size={12} strokeWidth={1.5} />
          </span>
          Return to the house
        </Link>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#181814]/55">Object 01 / 25</span>
      </header>

      <section className="px-5 pb-12 sm:px-8 lg:px-11 lg:pb-20">
        <div className="detail-layout mx-auto max-w-[1680px] border-t border-[#181814]/20 pt-5">
          <div className="min-w-0">
            <div className="mb-5 flex items-end justify-between lg:hidden">
              <div>
                <p className="eyebrow">The eyewear archive</p>
                <h1 className="mt-2 font-display text-[17vw] leading-[0.8] tracking-[-0.06em]">BARREL</h1>
              </div>
              <span className="mb-1 font-mono text-[10px] tracking-[0.12em]">01</span>
            </div>
            <div className="gallery-grid">
              {gallery.map((image, index) => <DossierFigure key={image.url} image={image} index={index} />)}
            </div>
          </div>

          <aside className="detail-aside self-start lg:sticky lg:top-7">
            <div className="hidden border-b border-[#181814]/20 pb-10 lg:block">
              <div className="flex items-center justify-between">
                <p className="eyebrow">The eyewear archive / object 01</p>
                <TwinStrikeSeal className="dossier-house-seal" />
              </div>
              <h1 className="mt-5 font-display text-[clamp(6rem,10vw,12rem)] leading-[0.77] tracking-[-0.07em]">THE<br />BARREL</h1>
            </div>

            <div className="py-7">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#181814]/55">Double Barrel 01</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#181814]/75">A two-lens object of measured defiance. Cut, joined, and finished in the atelier.</p>
                </div>
                <span className="shrink-0 font-mono text-[11px] tracking-[0.1em]">AED 15,000</span>
              </div>

              <div className="dossier-stamp mt-6 grid grid-cols-3 gap-2 border-y border-[#181814]/20 py-3 font-mono text-[9px] uppercase tracking-[0.12em] text-[#181814]/55">
                <span>Filed / DXB</span><span className="text-center">Archive / 01</span><span className="text-right">Cut / 2026</span>
              </div>

              <button
                onClick={() => beginAcquisition(privateCollection[0])}
                className="archive-button mt-8 w-full"
              >
                <span>Acquire Barrel 01</span>
                <ArrowDownRight size={16} strokeWidth={1.4} />
              </button>
            </div>

            <div className="border-t border-[#181814]/20">
              {details.map(([label, value], index) => (
                <div key={label} className="border-b border-[#181814]/20">
                  <button onClick={() => setOpenDetail(openDetail === index ? null : index)} className="flex w-full items-center justify-between py-4 text-left">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em]">{label}</span>
                    <span className="flex items-center gap-3 font-mono text-[10px] text-[#181814]/55"><span className="hidden sm:inline">{value}</span><Plus className={`transition-transform duration-300 ${openDetail === index ? "rotate-45" : ""}`} size={14} strokeWidth={1.25} /></span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openDetail === index && (
                      <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden pb-4 pr-10 text-[12px] leading-relaxed text-[#181814]/60 sm:hidden">
                        {value}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <Link href="/" className="magnetic-link mt-9 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em]">
              Enter the house <ChevronRight size={12} />
            </Link>
          </aside>
        </div>

        <section className="private-collection-section mx-auto mt-12 max-w-[1680px] border-t border-[#181814]/20 pt-5 lg:mt-24">
          <div className="private-collection-heading">
            <p className="eyebrow">Private collection / current allocation</p>
            <p>Three objects are held for private acquisition. Availability is confirmed by the house before any commitment.</p>
          </div>
          <div className="private-collection-grid">
            {privateCollection.map((object) => (
              <article key={object.id} className="private-object-card">
                <div className="private-object-image"><img className="private-object-primary" src={object.image} alt={object.alt} /><img className="private-object-secondary" src={object.secondaryImage} alt={object.secondaryAlt} /><span className="private-object-angle">Alternate study</span></div>
                <div className="private-object-meta"><span>{object.edition}</span><span>{object.price}</span></div>
                <h2>{object.name}</h2>
                <p>{object.material}</p>
                <button onClick={() => beginAcquisition(object)} className="private-object-request">Request acquisition <ArrowDownRight size={15} strokeWidth={1.35} /></button>
              </article>
            ))}
          </div>
        </section>
      </section>

      <AnimatePresence>
        {isAcquisitionOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="acquisition-modal">
          <motion.section initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }} className="acquisition-card" aria-modal="true" role="dialog" aria-label={`Private acquisition request for ${selectedObject.name}`}>
            <button onClick={closeAcquisition} className="acquisition-close" aria-label="Close private acquisition request"><X size={15} strokeWidth={1.4} /></button>
            {acquisitionStage === "threshold" ? <div className="concierge-threshold"><TwinStrikeSeal className="concierge-seal" /><p className="eyebrow">Cheeta concierge / private threshold</p><h2>Before the<br />door opens.</h2><p className="concierge-threshold-copy">The house confirms the object, your preferred viewing, and the next private appointment before any allocation is discussed.</p><div className="concierge-steps"><span><b>01</b> Object confirmed</span><span><b>02</b> Viewing arranged</span><span><b>03</b> Allocation discussed</span></div><div className="concierge-object"><img src={selectedObject.image} alt="" /><div><p>{selectedObject.name}</p><p>{selectedObject.edition} · {selectedObject.material}</p></div></div><button onClick={() => setAcquisitionStage("request")} className="acquisition-submit">Enter concierge request <ArrowDownRight size={16} strokeWidth={1.4} /></button><p className="acquisition-note">A private request is not a payment or binding order.</p></div> : <div className="concierge-request"><button className="acquisition-return" onClick={() => setAcquisitionStage("threshold")}>← Return to threshold</button><p className="eyebrow">Private acquisition request</p><h2>{selectedObject.name}</h2><div className="acquisition-object"><img src={selectedObject.image} alt="" /><div><p>{selectedObject.material}</p><p>{selectedObject.edition} · {selectedObject.price}</p></div></div><div className="acquisition-fields"><label>Full name<input aria-label="Full name" placeholder="Your name" /></label><label>Contact detail<input aria-label="Contact detail" placeholder="Email or mobile" /></label><label>Preferred viewing<input aria-label="Preferred viewing" placeholder="Dubai / appointment preference" /></label></div><button onClick={() => { toast("Your private acquisition request is noted.", { description: `${selectedObject.name} · A Cheeta concierge will confirm availability.` }); closeAcquisition(); }} className="acquisition-submit">Send private request <ArrowDownRight size={16} strokeWidth={1.4} /></button><p className="acquisition-note">This is an availability request, not a payment or binding order.</p></div>}
          </motion.section>
        </motion.div>}
      </AnimatePresence>
    </main>
  );
}
