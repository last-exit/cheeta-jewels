/**
 * ATELIER FITTING STUDIO : Haute Lunetterie & Jewelry Try-On Engine
 * Pure #FFFFFF Canvas · Zero Card Containers / Boxless Editorial Architecture
 * Close-up Portraiture with Dynamic Eyewear & Mineral Optics Fitting
 * Features:
 * - Model Switcher (Model I Sovereign, Model II Monolith, Model III Nocturne)
 * - Signature Eyewear Collections (Gun / Double Barrel, Masquerade, Maharaja, Savanah)
 * - Real-time Mineral Lens Optics Customization (Ruby, Obsidian, Amber, Emerald)
 * - Specular Light Gleam & Optical Sheen Animations
 * - 3D Interactive Parallax Tilt on Cursor Hover
 * - Swiss Watch NumberFlow AED Valuation
 * - Sonner Luxury Toasts & Web Audio Tactile Claps
 */
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import { Link } from "wouter";
import { useCart } from "@/contexts/CartContext";
import { playLensSwap, playMetallicClick, playVaultAcquisition } from "@/lib/soundEffects";
import { toast } from "sonner";

export type ModelId = "sovereign" | "monolith" | "nocturne";
export type CollectionKey = "barrel" | "masquerade" | "maharaja" | "savanah";
export type LensTintKey = "ruby" | "obsidian" | "amber" | "emerald";

interface ModelInfo {
  id: ModelId;
  label: string;
  roman: string;
  portraitByCollection: Record<CollectionKey, string>;
}

interface EyewearCollectionInfo {
  id: CollectionKey;
  roman: string;
  collectionName: string;
  pieceName: string;
  frameDescription: string;
  defaultLens: LensTintKey;
  price: number;
  priceDisplay: string;
  slug: string;
  metallurgy: string;
  optics: string;
  weight: string;
  tagline: string;
}

interface LensTintInfo {
  id: LensTintKey;
  name: string;
  hex: string;
  filterStyle: string;
}

const MODELS: ModelInfo[] = [
  {
    id: "sovereign",
    label: "Sovereign Silhouette",
    roman: "I",
    portraitByCollection: {
      barrel: "/manus-storage/model-cutout-01-transparent.png",
      masquerade: "/manus-storage/model-cutout-masquerade.png",
      maharaja: "/models/model-04-octagon.jpg",
      savanah: "/models/model-06-savannah.jpg",
    },
  },
  {
    id: "monolith",
    label: "Chiseled Monolith",
    roman: "II",
    portraitByCollection: {
      barrel: "/models/model-02-monolith.jpg",
      masquerade: "/models/model-05-nocturne.jpg",
      maharaja: "/models/model-04-octagon.jpg",
      savanah: "/models/model-06-savannah.jpg",
    },
  },
  {
    id: "nocturne",
    label: "Venetian Nocturne",
    roman: "III",
    portraitByCollection: {
      barrel: "/manus-storage/model-cutout-03-transparent.png",
      masquerade: "/models/model-05-nocturne.jpg",
      maharaja: "/models/model-04-octagon.jpg",
      savanah: "/models/model-07-cyber.jpg",
    },
  },
];

const EYEWEAR_COLLECTIONS: Record<CollectionKey, EyewearCollectionInfo> = {
  barrel: {
    id: "barrel",
    roman: "I",
    collectionName: "The Gun Collection",
    pieceName: "The Double Barrel 01",
    frameDescription: "18K Brushed Gold · Knurled Titanium Bridge",
    defaultLens: "ruby",
    price: 15000,
    priceDisplay: "AED 15,000",
    slug: "double-barrel-01",
    metallurgy: "18K Hand-Brushed Gold",
    optics: "Dual-Cylinder Mineral Optics",
    weight: "38.4g Balanced Center",
    tagline: "Proprietary Double Barrel Crossbar",
  },
  masquerade: {
    id: "masquerade",
    roman: "II",
    collectionName: "The Masquerade",
    pieceName: "Masquerade I : Concealed Visor",
    frameDescription: "Polished Obsidian PVD · Sculpted Titanium",
    defaultLens: "obsidian",
    price: 16800,
    priceDisplay: "AED 16,800",
    slug: "masquerade-01",
    metallurgy: "High-Polish Black Titanium",
    optics: "Concealed Visor Onyx Optics",
    weight: "34.1g Featherweight",
    tagline: "Venetian Midnight Silhouette",
  },
  maharaja: {
    id: "maharaja",
    roman: "III",
    collectionName: "The Maharaja",
    pieceName: "Maharaja I : Solid Octagon",
    frameDescription: "18K Solid Chiseled Gold · Jali Latticework",
    defaultLens: "amber",
    price: 18500,
    priceDisplay: "AED 18,500",
    slug: "maharaja-01",
    metallurgy: "18K Yellow Gold Monolith",
    optics: "Solid Octagon Quartz Lenses",
    weight: "42.6g Sovereign Mass",
    tagline: "Architectural Rajasthan Symmetry",
  },
  savanah: {
    id: "savanah",
    roman: "IV",
    collectionName: "The Savanah",
    pieceName: "Savanah I : Dune Wire Aviator",
    frameDescription: "Sand-Cast Desert Bronze · Sun-Bleached Acetate",
    defaultLens: "amber",
    price: 16500,
    priceDisplay: "AED 16,500",
    slug: "savanah-01",
    metallurgy: "Billet Desert Bronze",
    optics: "Sun-Warm Ochre Gradient Lenses",
    weight: "36.2g Nomadic Form",
    tagline: "Nomadic Arabian Dune Horizon",
  },
};

const LENS_TINTS: Record<LensTintKey, LensTintInfo> = {
  ruby: {
    id: "ruby",
    name: "Ruby Mineral",
    hex: "#8A0E1C",
    filterStyle: "hue-rotate(330deg) saturate(1.4) contrast(1.05)",
  },
  obsidian: {
    id: "obsidian",
    name: "Obsidian Smoke",
    hex: "#1A1C20",
    filterStyle: "brightness(0.9) contrast(1.15)",
  },
  amber: {
    id: "amber",
    name: "Amber Honey",
    hex: "#B86314",
    filterStyle: "sepia(0.35) saturate(1.3) hue-rotate(5deg)",
  },
  emerald: {
    id: "emerald",
    name: "Venetian Emerald",
    hex: "#0F5C43",
    filterStyle: "hue-rotate(90deg) saturate(1.2)",
  },
};

const SPRING_TRANSITION = {
  type: "spring" as const,
  stiffness: 320,
  damping: 28,
  mass: 0.9,
};

export default function AtelierFittingStudio() {
  const [activeModelId, setActiveModelId] = useState<ModelId>("sovereign");
  const [activeCollectionId, setActiveCollectionId] = useState<CollectionKey>("barrel");
  const [activeLens, setActiveLens] = useState<LensTintKey>("ruby");
  const [sheenKey, setSheenKey] = useState<number>(0);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const portraitContainerRef = useRef<HTMLDivElement | null>(null);

  const { addToCart } = useCart();

  const currentModel = MODELS.find((m) => m.id === activeModelId) || MODELS[0];
  const currentCollection = EYEWEAR_COLLECTIONS[activeCollectionId];
  const currentLensInfo = LENS_TINTS[activeLens];

  const currentImage = currentModel.portraitByCollection[activeCollectionId];

  // Mouse hover 3D tilt
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!portraitContainerRef.current) return;
    const rect = portraitContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 6, y: -y * 6 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  // Handle Model switch
  const handleSelectModel = (modelId: ModelId) => {
    try {
      playMetallicClick();
    } catch {}
    setActiveModelId(modelId);
    setSheenKey((prev) => prev + 1);
    toast.success(`Active Model: ${MODELS.find((m) => m.id === modelId)?.label}`, {
      description: "Close-up portrait calibrated for eyewear fitting.",
    });
  };

  // Handle Eyewear Fitting switch
  const handleSelectCollection = (colKey: CollectionKey) => {
    try {
      playMetallicClick();
    } catch {}
    setActiveCollectionId(colKey);
    const defaultLens = EYEWEAR_COLLECTIONS[colKey].defaultLens;
    setActiveLens(defaultLens);
    setSheenKey((prev) => prev + 1);

    const piece = EYEWEAR_COLLECTIONS[colKey];
    toast.success(`Fitted: ${piece.pieceName}`, {
      description: `${piece.frameDescription} · ${piece.priceDisplay}`,
    });
  };

  // Handle Mineral Lens Tint switch
  const handleSelectLens = (lensKey: LensTintKey) => {
    try {
      playLensSwap();
    } catch {}
    setActiveLens(lensKey);
    setSheenKey((prev) => prev + 1);

    toast.info(`Optics Swapped: ${LENS_TINTS[lensKey].name}`, {
      description: "Mineral crystal coated with anti-reflective sapphire shield.",
    });
  };

  // Acquire Look
  const handleAcquire = () => {
    try {
      playVaultAcquisition();
    } catch {}

    addToCart({
      id: `${currentCollection.id}-${activeLens}`,
      name: `${currentCollection.pieceName} (${currentLensInfo.name})`,
      frame: currentCollection.metallurgy,
      lens: `${currentLensInfo.name} Optics`,
      price: currentCollection.price,
      priceDisplay: currentCollection.priceDisplay,
      image: currentImage,
    });

    toast.success(`${currentCollection.pieceName} Acquired`, {
      description: `Custom fitted with ${currentLensInfo.name} lenses · Encased in Leopard Velvet Vault.`,
    });
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* =================================================================== */}
        {/* LEFT COLUMN: Close-Up Portraiture & Fitting Stage                  */}
        {/* =================================================================== */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* Portrait Display Frame (Boxless on Pure White) */}
          <div
            ref={portraitContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
              transition: "transform 0.15s ease-out",
            }}
            className="relative w-full max-w-[480px] h-[520px] sm:h-[620px] flex items-center justify-center select-none cursor-crosshair group"
          >
            {/* Ambient Radial Falloff Shadow */}
            <div className="absolute inset-0 bg-radial from-transparent via-transparent to-white/40 pointer-events-none z-10" />

            {/* Model & Eyewear Image with Animated Fitting Physics */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeModelId}-${activeCollectionId}`}
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -4 }}
                transition={SPRING_TRANSITION}
                className="relative h-full w-full flex items-center justify-center"
              >
                <img
                  src={currentImage}
                  alt={`${currentModel.label} wearing ${currentCollection.pieceName}`}
                  className="max-h-full max-w-full object-contain pointer-events-none drop-shadow-[0_28px_48px_rgba(0,0,0,0.08)] filter"
                />

                {/* Optical Lens Sheen Sweep */}
                <motion.div
                  key={sheenKey}
                  initial={{ x: "-120%", opacity: 0 }}
                  animate={{ x: "180%", opacity: [0, 0.8, 0] }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
                >
                  <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent transform -skew-x-25" />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Interactive Fitting Indicator Badge */}
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-black/10 shadow-sm text-[11px] font-sans text-black/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A0E16] animate-pulse" />
              <span>
                {currentCollection.pieceName} fitted onto {currentModel.roman}
              </span>
            </div>
          </div>

          {/* Model Switcher Bar */}
          <div className="w-full max-w-[480px] mt-6 pt-5 flex items-center justify-between">
            <span className="font-sans text-xs text-black/50 font-normal">Select Model Silhouette</span>

            <div className="flex items-center gap-2">
              {MODELS.map((model) => {
                const isSelected = model.id === activeModelId;
                return (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => handleSelectModel(model.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-black text-white font-medium shadow-sm"
                        : "bg-black/[0.04] text-black/60 hover:text-black hover:bg-black/[0.08]"
                    }`}
                  >
                    <span className="font-serif text-[11px]">{model.roman}</span>
                    <span>{model.id === "sovereign" ? "Sovereign" : model.id === "monolith" ? "Monolith" : "Nocturne"}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* RIGHT COLUMN: Haute Lunetterie Dossier & Fitting Controls           */}
        {/* =================================================================== */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-7">
          {/* Header & Typography */}
          <div>
            <div className="flex items-center gap-3">
              <span className="font-serif text-3xl text-[#4A0E16] font-normal">
                {currentCollection.roman}
              </span>
              <span className="font-sans text-xs uppercase tracking-widest text-black/40">
                {currentCollection.collectionName}
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[#000000] leading-[1.08] mt-2">
              {currentCollection.pieceName}
            </h2>

            <p className="font-sans text-sm text-[#000000]/60 mt-2 font-normal">
              {currentCollection.frameDescription}
            </p>

            {/* Swiss Watch NumberFlow Valuation */}
            <div className="mt-7 flex items-baseline gap-2 font-serif text-3xl sm:text-4xl font-normal text-[#000000]">
              <span>AED</span>
              <NumberFlow value={currentCollection.price} format={{ useGrouping: true }} />
            </div>
          </div>

          {/* Eyewear Collection Try-On Selectors */}
          <div className="space-y-3 pt-5">
            <div className="flex items-center justify-between text-xs font-sans text-black/50">
              <span>Fit Signature Collection Eyewear</span>
              <span>Click to equip onto model</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {(Object.keys(EYEWEAR_COLLECTIONS) as CollectionKey[]).map((colKey) => {
                const col = EYEWEAR_COLLECTIONS[colKey];
                const isSelected = colKey === activeCollectionId;
                return (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => handleSelectCollection(colKey)}
                    className={`group relative p-3 text-left rounded-lg transition-all cursor-pointer border ${
                      isSelected
                        ? "border-[#4A0E16] bg-[#4A0E16]/[0.03] text-black shadow-sm"
                        : "border-black/10 bg-transparent text-black/60 hover:text-black hover:border-black/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base font-normal">{col.roman}</span>
                      {isSelected ? (
                        <Check size={14} className="text-[#4A0E16]" />
                      ) : (
                        <span className="text-[10px] text-black/40 group-hover:text-black">Equip</span>
                      )}
                    </div>
                    <p className="font-sans text-xs font-medium text-black mt-1 line-clamp-1">{col.pieceName}</p>
                    <p className="font-sans text-[11px] text-black/45 mt-0.5 line-clamp-1">{col.tagline}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mineral Optics Lens Tint Customization */}
          <div className="space-y-3 pt-5">
            <div className="flex items-center justify-between text-xs font-sans text-black/50">
              <span>Mineral Lens Optics</span>
              <span className="text-black font-medium">{currentLensInfo.name}</span>
            </div>

            <div className="flex items-center gap-3">
              {(Object.keys(LENS_TINTS) as LensTintKey[]).map((lensKey) => {
                const lens = LENS_TINTS[lensKey];
                const isSelected = lensKey === activeLens;
                return (
                  <button
                    key={lens.id}
                    type="button"
                    onClick={() => handleSelectLens(lensKey)}
                    className={`group flex items-center gap-2 px-3 py-2 rounded-full border transition-all cursor-pointer ${
                      isSelected
                        ? "border-black bg-black/[0.04] text-black font-medium"
                        : "border-black/10 bg-transparent text-black/60 hover:border-black/30 hover:text-black"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-inner flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: lens.hex }}
                    />
                    <span className="font-sans text-xs">{lens.name.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Acquisition & Details Action */}
          <div className="pt-4 flex items-center gap-6">
            <button
              type="button"
              onClick={handleAcquire}
              className="group relative inline-flex items-center gap-4 bg-black text-white hover:bg-[#4A0E16] transition-all duration-300 pl-7 pr-3 py-3 rounded-full font-sans text-xs font-medium cursor-pointer active:scale-[0.98] shadow-sm"
            >
              <span>Acquire Look</span>
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </button>

            <Link
              href={`/product/${currentCollection.slug}`}
              className="font-sans text-xs text-black/60 hover:text-black transition-colors py-2 flex items-center gap-1.5 group font-medium"
            >
              <span>View Dossier</span>
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-black/40 group-hover:text-black"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
