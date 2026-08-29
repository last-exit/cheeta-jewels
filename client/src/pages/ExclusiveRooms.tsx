/**
 * EXCLUSIVE ROOMS (The "Stage")
 * Full-screen immersive view.
 * Static image removed as requested.
 * Switchable atmospheric background environments (video/image).
 * Text Rules: NO TITLES. Pure visual stage.
 * Navigation: Fixed Cheetah Bar on the left.
 * UI: Minimal dots/lines to toggle the active environment.
 */
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import CheetahBar from "@/components/CheetahBar";

/**
 * Switchable Room Environments
 * Update or swap video and image URLs here.
 */
export interface RoomEnvironment {
  id: string;
  type: "image" | "video";
  src: string;
  alt: string;
}

export const ROOM_ENVIRONMENTS: RoomEnvironment[] = [
  {
    id: "smoky-room",
    // Option 1: 1910s vintage, wood, amber light
    type: "image",
    src: "/manus-storage/cheeta-smoke-room-whole-space_6e7a12d4.png",
    alt: "Smoky Room Atmosphere",
  },
  {
    id: "masquerade",
    // Option 2: Eyes Wide Shut style, cooler, dramatic
    type: "image",
    src: "/manus-storage/cheeta-masquerade-eerie-audience_8a20891a.png",
    alt: "Masquerade Atmosphere",
  },
];

export default function ExclusiveRooms() {
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const activeRoom = ROOM_ENVIRONMENTS[activeRoomIndex];

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black text-white select-none">
      {/* Navigation (Fixed Left, Dark Semi-Transparent Mode) */}
      <CheetahBar dark />

      {/* Full-Screen Switchable Variable Background Environment */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeRoom.type === "video" ? (
            <motion.video
              key={activeRoom.src}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover object-center filter brightness-[0.88] contrast-[1.08]"
            >
              <source src={activeRoom.src} type="video/mp4" />
            </motion.video>
          ) : (
            <motion.img
              key={activeRoom.src}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              src={activeRoom.src}
              alt={activeRoom.alt}
              className="absolute inset-0 h-full w-full object-cover object-center filter brightness-[0.88] contrast-[1.08]"
            />
          )}
        </AnimatePresence>

        {/* Ambient atmospheric vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/40 pointer-events-none" />
      </div>

      {/* Minimal Environment Toggle (Subtle Lines — NO TITLES) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6 bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
        {ROOM_ENVIRONMENTS.map((_, index) => {
          const isActive = activeRoomIndex === index;
          return (
            <button
              key={index}
              onClick={() => setActiveRoomIndex(index)}
              aria-label={`Environment 0${index + 1}`}
              className="group relative flex items-center py-2 focus:outline-none cursor-pointer"
            >
              <div
                className={`h-[2px] transition-all duration-500 ease-out ${
                  isActive
                    ? "w-10 bg-white"
                    : "w-5 bg-white/30 group-hover:bg-white/70 group-hover:w-7"
                }`}
              />
            </button>
          );
        })}
      </div>
    </main>
  );
}
