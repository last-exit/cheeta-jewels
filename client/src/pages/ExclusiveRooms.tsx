/**
 * EXCLUSIVE ROOMS — Private Viewing Salon Showcase
 * Radical luxury: Real-time 3D WebGL eyewear, GPU gold dust particle engine,
 * procedural Web Audio API synthesis, and atmospheric room lighting.
 */
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Volume2, VolumeX } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import CheetahBar from "@/components/CheetahBar";
import Eyewear3DModel from "@/components/Eyewear3DModel";
import GoldParticleEngine from "@/components/GoldParticleEngine";
import { playLensSwap, playMetallicClick, playVaultAcquisition } from "@/lib/soundEffects";

export interface ExclusivePair {
  id: string;
  name: string;
  finish: string;
  frameType: "gold" | "gunmetal" | "bronze";
  defaultLens: "ruby" | "obsidian" | "amber" | "emerald";
  roomImage: string;
  audioSrc: string;
  alt: string;
}

export const EXCLUSIVE_PAIRS: ExclusivePair[] = [
  {
    id: "dubai-salon",
    name: "The Sovereign Salon",
    finish: "Dubai Atelier Penthouse · Solid 18K Gold",
    frameType: "gold",
    defaultLens: "ruby",
    roomImage: "/manus-storage/cheeta-dubai-private-salon.jpg",
    audioSrc: "/manus-storage/cheeta-opening-commanding-luxury_6f9be9cd.mp3",
    alt: "The Dubai Penthouse Salon",
  },
  {
    id: "barrel-01",
    name: "The 1910s Smoke House",
    finish: "Solid 18K Yellow Gold · Custom Ruby Mineral",
    frameType: "gold",
    defaultLens: "ruby",
    roomImage: "/manus-storage/cheeta-smoke-room-whole-space_6e7a12d4.png",
    audioSrc: "/manus-storage/cheeta-opening-commanding-luxury_6f9be9cd.mp3",
    alt: "The Smoke House Salon",
  },
  {
    id: "masquerade",
    name: "The Masquerade Hall",
    finish: "Black Rhodium · Muzo Colombian Emerald",
    frameType: "gunmetal",
    defaultLens: "emerald",
    roomImage: "/manus-storage/cheeta-masquerade-eerie-audience_8a20891a.png",
    audioSrc: "/manus-storage/cheeta-masquerade-ambient_b1516c67.mp3",
    alt: "The Masquerade Hall",
  },
];

const LENS_OPTIONS: { id: "ruby" | "obsidian" | "amber" | "emerald"; label: string }[] = [
  { id: "ruby", label: "Ruby" },
  { id: "obsidian", label: "Obsidian" },
  { id: "amber", label: "Amber" },
  { id: "emerald", label: "Emerald" },
];

export default function ExclusiveRooms() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [currentLens, setCurrentLens] = useState<"ruby" | "obsidian" | "amber" | "emerald">("ruby");
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    city: "Dubai",
    piece: "The Double Barrel 01",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const activePair = EXCLUSIVE_PAIRS[activeIdx];

  useEffect(() => {
    setCurrentLens(activePair.defaultLens);
  }, [activeIdx, activePair.defaultLens]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = activePair.audioSrc;
      audioRef.current.load();
      if (isAudioPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [activeIdx, activePair.audioSrc, isAudioPlaying]);

  const handleNext = () => {
    playMetallicClick();
    setActiveIdx((prev) => (prev + 1) % EXCLUSIVE_PAIRS.length);
  };

  const handlePrev = () => {
    playMetallicClick();
    setActiveIdx((prev) => (prev - 1 + EXCLUSIVE_PAIRS.length) % EXCLUSIVE_PAIRS.length);
  };

  const handleLensSelect = (lensId: "ruby" | "obsidian" | "amber" | "emerald") => {
    playLensSwap();
    setCurrentLens(lensId);
  };

  const toggleAudio = () => {
    playMetallicClick();
    if (!audioRef.current) return;
    if (isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsAudioPlaying(true);
        })
        .catch(() => {
          setIsAudioPlaying(true);
        });
    }
  };

  const handleOpenModal = () => {
    playMetallicClick();
    setFormData((prev) => ({
      ...prev,
      piece: `${activePair.name} (${activePair.finish})`,
    }));
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim()) {
      toast.error("Please provide your name and contact details.");
      return;
    }

    playVaultAcquisition();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
      setFormData({
        name: "",
        contact: "",
        city: "Dubai",
        piece: `${activePair.name} (${activePair.finish})`,
        message: "",
      });
      toast.success("Visit request received.", {
        description: "The private atelier concierge will coordinate your viewing.",
      });
    }, 700);
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#0B0B0C] text-[#F4F3EE] select-none">
      {/* Hidden Ambient Audio Player */}
      <audio ref={audioRef} loop preload="auto" />

      {/* Floating Transparent Cheetah Bar */}
      <CheetahBar dark />

      {/* ========================================================================= */}
      {/* 1. ATMOSPHERIC ROOM BACKGROUND & GPU GOLD PARTICLES                        */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden film-grain">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePair.roomImage}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.0, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0 h-full w-full"
          >
            <img
              src={activePair.roomImage}
              alt={activePair.alt}
              className="h-full w-full object-cover object-center filter brightness-[0.6] contrast-[1.12]"
            />
          </motion.div>
        </AnimatePresence>

        {/* GPU Gold Dust */}
        <GoldParticleEngine particleCount={36} className="absolute inset-0 pointer-events-none z-10" />
      </div>

      {/* ========================================================================= */}
      {/* 2. REAL-TIME 3D EYEWEAR IN ROOM                                            */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="relative w-full max-w-4xl h-[340px] sm:h-[420px] md:h-[500px] flex items-center justify-center pointer-events-auto">
          <Eyewear3DModel
            key={`${activePair.id}-${activePair.frameType}`}
            lensType={currentLens}
            frameType={activePair.frameType}
            className="w-full h-full"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-64 h-8 bg-black/65 blur-xl rounded-full pointer-events-none" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CLEAN MONUMENTAL ROOM TITLE                                             */}
      {/* ========================================================================= */}
      <div className="absolute top-14 left-0 right-0 z-20 px-8 md:px-16 flex flex-col items-center text-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePair.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#F4F3EE] drop-shadow-[0_16px_32px_rgba(0,0,0,0.8)]">
              {activePair.name}
            </h1>
            <p className="font-sans text-xs uppercase tracking-[0.14em] text-[#F4F3EE]/60 mt-2">
              {activePair.finish}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ========================================================================= */}
      {/* 4. NAVIGATION (← / →)                                                      */}
      {/* ========================================================================= */}
      <div className="absolute inset-y-0 left-6 sm:left-12 z-30 flex items-center pointer-events-none">
        <button
          onClick={handlePrev}
          className="pointer-events-auto p-4 text-[#F4F3EE]/50 hover:text-[#F4F3EE] transition-transform hover:scale-110 cursor-pointer focus:outline-none"
          aria-label="Previous room"
        >
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>
      </div>

      <div className="absolute inset-y-0 right-6 sm:right-12 z-30 flex items-center pointer-events-none">
        <button
          onClick={handleNext}
          className="pointer-events-auto p-4 text-[#F4F3EE]/50 hover:text-[#F4F3EE] transition-transform hover:scale-110 cursor-pointer focus:outline-none"
          aria-label="Next room"
        >
          <ArrowRight size={22} strokeWidth={1.5} />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 5. BOTTOM BAR: LENS OPTIONS, AUDIO & VISIT ACTION                         */}
      {/* ========================================================================= */}
      <div className="absolute bottom-10 left-0 right-0 z-20 px-8 sm:px-14 md:px-20 flex flex-col sm:flex-row items-center justify-between gap-6 pointer-events-auto">
        {/* Lens Options */}
        <div className="flex items-center gap-6 font-sans text-xs uppercase tracking-[0.14em]">
          {LENS_OPTIONS.map((lens) => {
            const isSelected = currentLens === lens.id;
            return (
              <button
                key={lens.id}
                onClick={() => handleLensSelect(lens.id)}
                className={`cursor-pointer transition-colors ${
                  isSelected ? "text-[#F4F3EE] font-medium" : "text-[#F4F3EE]/40 hover:text-[#F4F3EE]"
                }`}
              >
                {lens.label}
              </button>
            );
          })}
        </div>

        {/* Audio & Visit Request */}
        <div className="flex items-center gap-8">
          <button
            onClick={toggleAudio}
            className="text-[#F4F3EE]/50 hover:text-[#F4F3EE] transition-colors p-1 cursor-pointer"
            title="Toggle Ambient Audio"
            aria-label="Toggle sound"
          >
            {isAudioPlaying ? <Volume2 size={16} className="text-[#4A0E16]" /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={handleOpenModal}
            className="group flex items-center gap-3 font-sans text-xs uppercase tracking-[0.18em] text-[#F4F3EE] hover:text-[#4A0E16] transition-colors cursor-pointer"
          >
            <Calendar size={13} className="text-[#4A0E16]" />
            <span>Request a Visit</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. PRIVATE VISIT SALON MODAL                                              */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full max-w-lg bg-[#F4F3EE] text-[#0B0B0C] p-10 md:p-12 shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2
                    id="modal-title"
                    className="font-serif text-3xl font-normal tracking-tight text-[#0B0B0C]"
                  >
                    Private Viewing Salon
                  </h2>
                  <p className="font-sans text-xs text-[#0B0B0C]/60 mt-1">
                    {formData.piece}
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="font-sans text-xs uppercase tracking-[0.14em] text-[#0B0B0C]/40 hover:text-[#0B0B0C] p-1 cursor-pointer"
                  aria-label="Close"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-sans text-xs uppercase tracking-[0.14em] text-[#0B0B0C]/60 mb-1"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Your Full Name"
                    className="w-full bg-[#EBEAE4] px-4 py-3 font-sans text-sm text-[#0B0B0C] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact"
                      className="block font-sans text-xs uppercase tracking-[0.14em] text-[#0B0B0C]/60 mb-1"
                    >
                      Phone or Email
                    </label>
                    <input
                      id="contact"
                      type="text"
                      required
                      value={formData.contact}
                      onChange={(e) =>
                        setFormData({ ...formData, contact: e.target.value })
                      }
                      placeholder="contact@domain.com"
                      className="w-full bg-[#EBEAE4] px-4 py-3 font-sans text-sm text-[#0B0B0C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block font-sans text-xs uppercase tracking-[0.14em] text-[#0B0B0C]/60 mb-1"
                    >
                      Salon City
                    </label>
                    <select
                      id="city"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      className="w-full bg-[#EBEAE4] px-4 py-3 font-sans text-sm text-[#0B0B0C] focus:outline-none"
                    >
                      <option value="Dubai">Dubai Atelier</option>
                      <option value="London">London Salon</option>
                      <option value="New York">New York</option>
                      <option value="Riyadh">Riyadh</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-sans text-xs uppercase tracking-[0.14em] text-[#0B0B0C]/60 mb-1"
                  >
                    Requests
                  </label>
                  <textarea
                    id="message"
                    rows={2}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Preferred appointment schedule."
                    className="w-full bg-[#EBEAE4] px-4 py-3 font-sans text-sm text-[#0B0B0C] focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0B0B0C] text-[#F4F3EE] hover:bg-[#4A0E16] transition-colors py-3.5 font-sans text-xs uppercase tracking-[0.18em] font-medium cursor-pointer"
                  >
                    {isSubmitting ? "Submitting..." : "Request Appointment"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
