/**
 * HOMEPAGE (The Entry)
 * Extreme Minimalism with Pure Video Background.
 * Content: "ICON LIVIN" typography centered dead-center in the viewport.
 * Background: Raw, un-filtered looping cinematic entry video.
 * Navigation: Floating left-side Cheetah Bar.
 */
import { motion } from "framer-motion";
import CheetahBar from "@/components/CheetahBar";

export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black text-[#111111] select-none">
      {/* Floating Left Navigation Bar */}
      <CheetahBar dark />

      {/* Pure Cinematic Video Background (Raw / No Tint / No Overlay) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/manus-storage/cheeta-room-1910_79d40eca.png"
          className="h-full w-full object-cover object-center"
        >
          <source
            src="/manus-storage/cheeta-vintage-revival-entry_1f1afeed.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Centerpiece: "ICON LIVIN" — 100% Optical Center of the Entire Screen */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h1 className="font-serif text-[clamp(3.8rem,13vw,13.5rem)] font-normal leading-[0.88] tracking-[-0.04em] text-[#111111] drop-shadow-sm select-none">
            ICON LIVIN
          </h1>
        </motion.div>
      </div>
    </main>
  );
}
