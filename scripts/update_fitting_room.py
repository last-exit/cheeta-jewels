import os

with open('client/src/pages/Home.tsx', 'r') as f:
    code = f.read()

# 1. Update imports
old_imports = """import { ArrowUpRight } from "lucide-react";"""

new_imports = """import {
  ArrowUpRight,
  ShoppingBag,
  User,
  Search,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react";"""

assert old_imports in code, "old_imports not found"
code = code.replace(old_imports, new_imports)

# 2. Add HANGER_ITEMS and RUSH states
old_characters_end = """    weight: "48.2g Solid Mass",
    slug: "double-barrel-03",
  },
];

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function Home() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [heroSlide, setHeroSlide] = useState(0);
  const [perspective, setPerspective] = useState<"specimen" | "silhouette">("specimen");
  const { addToCart } = useCart();"""

new_characters_end = """    weight: "48.2g Solid Mass",
    slug: "double-barrel-03",
  },
];

const HANGER_ITEMS = [
  { id: "hanger-1", name: "Leather Bomber", image: "/fitting-room/item_jacket.png", highlight: false },
  { id: "hanger-2", name: "Faded Denim", image: "/fitting-room/item_jeans.png", highlight: false },
  { id: "hanger-3", name: "Slip Dress", image: "/fitting-room/item_dress.png", highlight: true },
  { id: "hanger-4", name: "Burgundy Miniskirt", image: "/fitting-room/item_skirt.png", highlight: true },
  { id: "hanger-5", name: "Straight Trousers", image: "/fitting-room/item_trousers.png", highlight: true },
  { id: "hanger-6", name: "Graphic Tee", image: "/fitting-room/item_hoodie.png", highlight: false },
  { id: "hanger-7", name: "Chunky Boots", image: "/fitting-room/item_boots.png", highlight: false },
];

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function Home() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [heroSlide, setHeroSlide] = useState(0);
  const [perspective, setPerspective] = useState<"specimen" | "silhouette">("specimen");
  const { addToCart } = useCart();

  // RUSH AI Fitting Room State
  const [fitParams, setFitParams] = useState({
    chest: 81,
    waist: 59,
    hips: 86,
    height: 168,
  });
  const [selectedColor, setSelectedColor] = useState<"Brown" | "Black">("Brown");
  const [selectedSize, setSelectedSize] = useState<"XS" | "S" | "M" | "L" | "XL">("S");
  const [activeHangerIdx, setActiveHangerIdx] = useState(3);
  const [activeStageHotspot, setActiveStageHotspot] = useState<"jacket" | "pants" | null>(null);
  const [stageScale, setStageScale] = useState(1.0);
  const [openAccordions, setOpenAccordions] = useState({
    materials: false,
    availability: false,
    deliveries: false,
  });

  const handleConfirmFitParams = () => {
    try {
      playMetallicClick();
    } catch {}
    toast.success("Parameters Calibrated", {
      description: `Chest: ${fitParams.chest}cm · Waist: ${fitParams.waist}cm · Hips: ${fitParams.hips}cm · Height: ${fitParams.height}cm`,
    });
  };

  const handleAddBundleToBag = () => {
    try {
      playVaultAcquisition();
    } catch {}
    addToCart({
      id: "rush-ensemble-01",
      name: "Oversize Faux Leather Jacket Ensemble",
      frame: `Ref. 55934-02 · ${selectedColor} · Size ${selectedSize}`,
      lens: "Complete 3-Piece Runway Fit",
      price: 159.97,
      priceDisplay: "$ 159.97",
      image: "/fitting-room/thumb_jacket.png",
    });
    toast.success("Added to Bag", {
      description: `Oversize Jacket (${selectedColor} / Size ${selectedSize}), Straight-fit Trousers, Tan Boots · $ 159.97`,
    });
  };

  const toggleAccordion = (key: "materials" | "availability" | "deliveries") => {
    try {
      playMetallicClick();
    } catch {}
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };"""

assert old_characters_end in code, "old_characters_end not found"
code = code.replace(old_characters_end, new_characters_end)

# 3. Replace Section 2
section_start = """      {/* ========================================================================= */}
      {/* 2. THE DUAL-PERSPECTIVE ATELIER — EYEWEAR SHOWCASE                        */}
      {/* Pure white canvas, zero card borders, GT Sectra & GT America typography    */}
      {/* ========================================================================= */}
      <section
        id="characters" """

# Let's find `<section\n        id="characters"`
start_pos = code.find('<section\n        id="characters"')
assert start_pos != -1, "start_pos not found"

# In the current file, where does section 2 end?
# Notice that section 3 is inside <section id="characters">:
# lines 409: {/* 3. THE LEOPARD VELVET VAULT */}
# Let's make Section 2 close before Section 3:
vault_start = """        {/* ========================================================================= */}
        {/* 3. THE LEOPARD VELVET VAULT                                               */}"""

vault_pos = code.find(vault_start)
assert vault_pos != -1, "vault_start not found"

rush_section = """<section
        id="characters"
        className="relative min-h-screen w-full py-10 sm:py-16 md:py-24 px-3 sm:px-6 md:px-8 lg:px-12 flex items-center justify-center overflow-hidden bg-[#181818] bg-cover bg-center select-none"
        style={{
          backgroundImage: "url('/fitting-room/urban_bg.jpg')",
        }}
      >
        {/* Soft atmospheric dark overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] pointer-events-none" />

        {/* Floating Canvas Card */}
        <div className="relative w-full max-w-[1140px] bg-[#ECECEC] rounded-[32px] sm:rounded-[40px] p-5 sm:p-7 md:p-9 shadow-[0_32px_96px_rgba(0,0,0,0.55)] border border-white/50 z-10">
          {/* Top Bar: AI Fitting room < Back | RUSH | Bag (2) Avatar */}
          <div className="flex items-center justify-between pb-4 sm:pb-5">
            {/* Left: AI Fitting room + Back button */}
            <div className="flex flex-col">
              <span className="font-sans font-bold text-sm sm:text-base text-black tracking-tight leading-tight">
                AI Fitting room
              </span>
              <button
                type="button"
                onClick={() => {
                  try {
                    playMetallicClick();
                  } catch {}
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="font-sans text-[11px] sm:text-xs text-black/60 hover:text-black font-medium flex items-center gap-0.5 mt-0.5 transition-colors cursor-pointer"
              >
                <ChevronLeft size={13} className="-ml-1" />
                <span>Back</span>
              </button>
            </div>

            {/* Center: RUSH Logo */}
            <div className="font-sans font-black text-2xl sm:text-3xl tracking-tight text-black uppercase">
              RUSH
            </div>

            {/* Right: Bag (2) + User Profile Avatar */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  try {
                    playMetallicClick();
                  } catch {}
                  toast("Shopping Bag (2 items)", {
                    description: "Oversize faux leather jacket, Straight-fit trousers",
                  });
                }}
                className="bg-white rounded-full px-3.5 py-1.5 shadow-xs text-xs font-semibold text-black flex items-center gap-1.5 hover:bg-black hover:text-white transition-all cursor-pointer"
              >
                <ShoppingBag size={13} />
                <span>Bag (2)</span>
              </button>

              <div
                onClick={() => toast("Client Profile: Guest Session")}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-black/10 border border-black/10 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                title="Profile"
              >
                <User size={15} className="text-black/75" />
              </div>
            </div>
          </div>

          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-start mt-1 sm:mt-2">
            {/* Left Column: Interactive Model Stage (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col relative">
              <div className="relative rounded-[28px] overflow-hidden bg-[#ECECEC] flex items-center justify-center min-h-[520px] sm:min-h-[590px] md:min-h-[640px] select-none border border-black/5">
                {/* Scalable Model Graphic Container */}
                <div
                  className="relative w-full h-full flex items-center justify-center transition-transform duration-300"
                  style={{ transform: `scale(${stageScale})` }}
                >
                  <img
                    src="/fitting-room/model_stage.png"
                    alt="RUSH AI Fitting Room Model"
                    className="w-full h-auto max-h-[660px] object-contain pointer-events-none select-none"
                  />

                  {/* Interactive Lapel Hotspot 1 (Jacket) */}
                  <div
                    style={{ left: "62.5%", top: "27%" }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setActiveStageHotspot(activeStageHotspot === "jacket" ? null : "jacket");
                        try {
                          playMetallicClick();
                        } catch {}
                      }}
                      onMouseEnter={() => setActiveStageHotspot("jacket")}
                      className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer group"
                      aria-label="Jacket craft hotspot"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#D4AF37]/35 animate-ping absolute pointer-events-none" />
                      <span className="w-4 h-4 rounded-full bg-[#D4AF37] border-2 border-white shadow-md flex items-center justify-center group-hover:scale-125 transition-transform">
                        <span className="w-1 h-1 rounded-full bg-white" />
                      </span>
                    </button>

                    {/* Hotspot Tooltip */}
                    <AnimatePresence>
                      {activeStageHotspot === "jacket" && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.94 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.96 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-1/2 -translate-x-1/2 top-7 w-52 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-black/10 shadow-2xl z-40 text-left"
                        >
                          <div className="font-sans font-semibold text-xs text-black">
                            Oversize Faux Leather Jacket
                          </div>
                          <p className="font-sans text-[10px] text-black/65 mt-0.5 leading-snug">
                            Grained vegan leather finish with double-stitched lapels and drop shoulders.
                          </p>
                          <div className="mt-1.5 flex items-center justify-between text-[10px]">
                            <span className="font-bold text-black">$ 49.99</span>
                            <span className="text-[#9E7D4E] font-medium">Ref. 55934-02</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Interactive Knee Hotspot 2 (Pants) */}
                  <div
                    style={{ left: "48%", top: "53.5%" }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setActiveStageHotspot(activeStageHotspot === "pants" ? null : "pants");
                        try {
                          playMetallicClick();
                        } catch {}
                      }}
                      onMouseEnter={() => setActiveStageHotspot("pants")}
                      className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer group"
                      aria-label="Pants craft hotspot"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#D4AF37]/35 animate-ping absolute pointer-events-none" />
                      <span className="w-4 h-4 rounded-full bg-[#D4AF37] border-2 border-white shadow-md flex items-center justify-center group-hover:scale-125 transition-transform">
                        <span className="w-1 h-1 rounded-full bg-white" />
                      </span>
                    </button>

                    {/* Hotspot Tooltip */}
                    <AnimatePresence>
                      {activeStageHotspot === "pants" && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.94 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.96 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-1/2 -translate-x-1/2 top-7 w-52 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-black/10 shadow-2xl z-40 text-left"
                        >
                          <div className="font-sans font-semibold text-xs text-black">
                            Straight-Fit Washed Trousers
                          </div>
                          <p className="font-sans text-[10px] text-black/65 mt-0.5 leading-snug">
                            Heavyweight cotton flare silhouette with vintage caramel wash finish.
                          </p>
                          <div className="mt-1.5 flex items-center justify-between text-[10px]">
                            <span className="font-bold text-black">$ 39.99</span>
                            <span className="text-[#9E7D4E] font-medium">In Stock</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Left Zoom Controls */}
                <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30">
                  <button
                    type="button"
                    onClick={() => {
                      setStageScale((prev) => Math.min(1.3, prev + 0.1));
                      try {
                        playMetallicClick();
                      } catch {}
                    }}
                    className="w-7 h-7 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-black/10 flex items-center justify-center text-black/75 hover:text-black hover:bg-white cursor-pointer active:scale-95 transition-all"
                    title="Zoom in"
                  >
                    <Plus size={13} strokeWidth={2.5} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStageScale((prev) => Math.max(0.9, prev - 0.1));
                      try {
                        playMetallicClick();
                      } catch {}
                    }}
                    className="w-7 h-7 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-black/10 flex items-center justify-center text-black/75 hover:text-black hover:bg-white cursor-pointer active:scale-95 transition-all"
                    title="Zoom out"
                  >
                    <Minus size={13} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Floating "On a hanger" Translucent Dock */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 md:bottom-4 md:left-4 md:right-4 z-30">
                  <div className="bg-white/80 backdrop-blur-xl rounded-[24px] p-3 sm:p-3.5 shadow-lg border border-white/80">
                    {/* Header Row */}
                    <div className="flex items-center justify-between px-2 mb-1.5">
                      <span className="font-sans font-semibold text-xs text-black">On a hanger</span>
                      <button
                        type="button"
                        onClick={() => {
                          try {
                            playMetallicClick();
                          } catch {}
                          toast("Search Collections", {
                            description: "Explore all fw26 wardrobe pieces",
                          });
                        }}
                        className="text-black/60 hover:text-black transition-colors cursor-pointer"
                        title="Search wardrobe"
                      >
                        <Search size={14} />
                      </button>
                    </div>

                    {/* Garment Items Row */}
                    <div className="flex items-center justify-between gap-1 overflow-x-auto scrollbar-none py-1 px-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveHangerIdx((prev) => (prev - 1 + HANGER_ITEMS.length) % HANGER_ITEMS.length);
                          try {
                            playMetallicClick();
                          } catch {}
                        }}
                        className="text-black/60 hover:text-black p-1 cursor-pointer shrink-0"
                        title="Previous garment"
                      >
                        <ChevronLeft size={16} />
                      </button>

                      {HANGER_ITEMS.map((item, idx) => {
                        const isSelected = activeHangerIdx === idx;
                        const isHighlighted = item.highlight;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setActiveHangerIdx(idx);
                              try {
                                playMetallicClick();
                              } catch {}
                              toast(`${item.name} Selected`, {
                                description: "Ready to preview in AI Fitting Room",
                              });
                            }}
                            className={`shrink-0 p-1 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                              isSelected
                                ? "bg-white shadow-md scale-105 ring-1.5 ring-black"
                                : isHighlighted
                                ? "bg-white/90 shadow-xs"
                                : "hover:bg-white/60"
                            }`}
                            title={item.name}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-9 h-11 object-contain"
                            />
                          </button>
                        );
                      })}

                      <button
                        type="button"
                        onClick={() => {
                          setActiveHangerIdx((prev) => (prev + 1) % HANGER_ITEMS.length);
                          try {
                            playMetallicClick();
                          } catch {}
                        }}
                        className="text-black/60 hover:text-black p-1 cursor-pointer shrink-0"
                        title="Next garment"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 2 Stacked Cards (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              {/* Card 1: Your parameters */}
              <div className="bg-white rounded-[26px] p-5 sm:p-6 shadow-xs border border-black/5">
                <h3 className="font-sans font-bold text-sm sm:text-base text-black mb-3.5">
                  Your parameters
                </h3>

                {/* 2x2 Grid: Chest, Waist, Hips, Height */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mb-4 text-xs font-sans">
                  <div className="flex items-center justify-between">
                    <span className="text-black/80 font-normal">Chest (sm)</span>
                    <span className="bg-[#EDEDED] rounded-full px-4 py-1 text-black font-semibold text-center min-w-[56px]">
                      {fitParams.chest}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black/80 font-normal">Waist (sm)</span>
                    <span className="bg-[#EDEDED] rounded-full px-4 py-1 text-black font-semibold text-center min-w-[56px]">
                      {fitParams.waist}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black/80 font-normal">Hips (sm)</span>
                    <span className="bg-[#EDEDED] rounded-full px-4 py-1 text-black font-semibold text-center min-w-[56px]">
                      {fitParams.hips}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black/80 font-normal">Height (sm)</span>
                    <span className="bg-[#EDEDED] rounded-full px-4 py-1 text-black font-semibold text-center min-w-[56px]">
                      {fitParams.height}
                    </span>
                  </div>
                </div>

                {/* Confirm Yellow Button */}
                <button
                  type="button"
                  onClick={handleConfirmFitParams}
                  className="w-full bg-[#FFDE43] hover:bg-[#FCD526] text-black font-semibold text-xs sm:text-sm py-2.5 rounded-full transition-colors cursor-pointer text-center active:scale-[0.99] shadow-xs"
                >
                  Confirm
                </button>
              </div>

              {/* Card 2: You are wearing */}
              <div className="bg-white rounded-[26px] p-5 sm:p-6 shadow-xs border border-black/5 flex flex-col justify-between space-y-4">
                <h3 className="font-sans font-bold text-sm sm:text-base text-black">
                  You are wearing
                </h3>

                {/* Primary Active Item with Black Border & (X) Close Badge */}
                <div className="relative rounded-2xl border-[1.5px] border-black p-3 sm:p-3.5 flex gap-3.5 bg-white">
                  {/* Top-Right Close Badge */}
                  <button
                    type="button"
                    onClick={() => {
                      try {
                        playMetallicClick();
                      } catch {}
                      toast("Primary item active in runway fit");
                    }}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold shadow-sm hover:scale-110 transition-transform cursor-pointer"
                    title="Remove item"
                  >
                    <X size={11} strokeWidth={3} />
                  </button>

                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl bg-[#F5F5F5] shrink-0 flex items-center justify-center p-1 overflow-hidden">
                    <img
                      src="/fitting-room/thumb_jacket.png"
                      alt="Oversize faux leather jacket"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-sans font-semibold text-xs sm:text-[13px] text-black leading-snug">
                      Oversize faux leather jacket
                    </div>
                    <div className="flex items-baseline justify-between mt-0.5">
                      <span className="font-sans font-bold text-xs sm:text-[13px] text-black">
                        $ 49.99
                      </span>
                      <span className="font-mono text-[9.5px] text-black/45">
                        Ref. 55934-02
                      </span>
                    </div>

                    {/* Color Swatches */}
                    <div className="mt-2">
                      <span className="text-[10px] text-black/60 font-medium block">Color</span>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedColor("Brown");
                            try {
                              playMetallicClick();
                            } catch {}
                          }}
                          className="flex flex-col items-center gap-0.5 cursor-pointer group"
                        >
                          <span
                            className={`w-4 h-4 rounded-full transition-all ${
                              selectedColor === "Brown"
                                ? "ring-2 ring-black ring-offset-2 scale-105"
                                : "hover:scale-110"
                            }`}
                            style={{ backgroundColor: "#3B2219" }}
                          />
                          <span className="text-[9px] text-black/75 font-medium">Brown</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedColor("Black");
                            try {
                              playMetallicClick();
                            } catch {}
                          }}
                          className="flex flex-col items-center gap-0.5 cursor-pointer group"
                        >
                          <span
                            className={`w-4 h-4 rounded-full transition-all ${
                              selectedColor === "Black"
                                ? "ring-2 ring-black ring-offset-2 scale-105"
                                : "hover:scale-110"
                            }`}
                            style={{ backgroundColor: "#111111" }}
                          />
                          <span className="text-[9px] text-black/75 font-medium">Black</span>
                        </button>
                      </div>
                    </div>

                    {/* Size Selector */}
                    <div className="mt-2">
                      <span className="text-[10px] text-black/60 font-medium block">Size</span>
                      <div className="flex items-center gap-1.5 mt-1">
                        {(["XS", "S", "M", "L", "XL"] as const).map((sz) => {
                          const isSelected = selectedSize === sz;
                          return (
                            <button
                              key={sz}
                              type="button"
                              onClick={() => {
                                setSelectedSize(sz);
                                try {
                                  playMetallicClick();
                                } catch {}
                              }}
                              className={`w-6 h-6 rounded-full text-[10px] font-semibold flex items-center justify-center transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-black text-white shadow-xs"
                                  : "bg-[#EDEDED] text-black hover:bg-black/10"
                              }`}
                            >
                              {sz}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Other Worn Items (Pants & Boots) */}
                <div className="flex items-center gap-2.5">
                  <div
                    onClick={() => {
                      try {
                        playMetallicClick();
                      } catch {}
                      toast("Straight-fit Brown Trousers", {
                        description: "$ 39.99 · Size 38 · Caramel Wash",
                      });
                    }}
                    className="w-14 h-14 rounded-2xl bg-[#F5F5F5] overflow-hidden flex items-center justify-center p-1.5 border border-black/5 hover:border-black/25 transition-all cursor-pointer shadow-2xs"
                    title="Straight-fit trousers"
                  >
                    <img
                      src="/fitting-room/thumb_pants.png"
                      alt="Straight fit brown trousers"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div
                    onClick={() => {
                      try {
                        playMetallicClick();
                      } catch {}
                      toast("Tan Leather Boots", {
                        description: "$ 69.99 · Size 39 · Nubuck Leather",
                      });
                    }}
                    className="w-14 h-14 rounded-2xl bg-[#F5F5F5] overflow-hidden flex items-center justify-center p-1.5 border border-black/5 hover:border-black/25 transition-all cursor-pointer shadow-2xs"
                    title="Tan leather boots"
                  >
                    <img
                      src="/fitting-room/thumb_boots.png"
                      alt="Tan leather boots"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Accordions */}
                <div className="space-y-2 pt-1 text-xs">
                  {/* Materials, care and source */}
                  <div className="rounded-xl bg-[#F5F5F5] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleAccordion("materials")}
                      className="w-full px-3.5 py-2.5 flex items-center justify-between text-left font-sans font-medium text-black/90 hover:text-black cursor-pointer text-xs"
                    >
                      <span>Materials, care and source</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 text-black/60 ${
                          openAccordions.materials ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openAccordions.materials && (
                      <div className="px-3.5 pb-3 text-[11px] text-black/65 font-sans leading-relaxed border-t border-black/5 pt-2">
                        Outer shell: 100% Polyurethane / Faux Leather. Lining: 100% Viscose. Hand wash cold, do not tumble dry. Crafted sustainably in certified European workshops.
                      </div>
                    )}
                  </div>

                  {/* In-store availability */}
                  <div className="rounded-xl bg-[#F5F5F5] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleAccordion("availability")}
                      className="w-full px-3.5 py-2.5 flex items-center justify-between text-left font-sans font-medium text-black/90 hover:text-black cursor-pointer text-xs"
                    >
                      <span>In-store availability</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 text-black/60 ${
                          openAccordions.availability ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openAccordions.availability && (
                      <div className="px-3.5 pb-3 text-[11px] text-black/65 font-sans leading-relaxed border-t border-black/5 pt-2">
                        Available in-store: Flagship Paris Salon (3 in stock), London Bond St (2 in stock), Dubai Mall Atelier (5 in stock). Same-day private courier available.
                      </div>
                    )}
                  </div>

                  {/* Deliveries and returns */}
                  <div className="rounded-xl bg-[#F5F5F5] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleAccordion("deliveries")}
                      className="w-full px-3.5 py-2.5 flex items-center justify-between text-left font-sans font-medium text-black/90 hover:text-black cursor-pointer text-xs"
                    >
                      <span>Deliveries and returns</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 text-black/60 ${
                          openAccordions.deliveries ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openAccordions.deliveries && (
                      <div className="px-3.5 pb-3 text-[11px] text-black/65 font-sans leading-relaxed border-t border-black/5 pt-2">
                        Complimentary express worldwide delivery within 2-4 business days. 30-day hassle-free return window with complimentary doorstep pickup.
                      </div>
                    )}
                  </div>
                </div>

                {/* Add to bag (3) Button */}
                <button
                  type="button"
                  onClick={handleAddBundleToBag}
                  className="w-full bg-[#FFDE43] hover:bg-[#FCD526] text-black font-semibold text-xs sm:text-sm py-3.5 rounded-full transition-colors cursor-pointer text-center active:scale-[0.99] shadow-xs flex items-center justify-center gap-1.5"
                >
                  Add to bag (3)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

"""

code = code[:start_pos] + rush_section + code[vault_pos:]

with open('client/src/pages/Home.tsx', 'w') as f:
    f.write(code)

print("Home.tsx cleanly updated with RUSH Fitting Room!")
