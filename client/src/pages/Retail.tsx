/**
 * RETAIL / COLLECTION (The Buy)
 * Extreme minimalism.
 * Layout: Simplified list with pinned / fixed model.
 * Visuals: Transparent background models layered over Bone White (#F4F4F0).
 * Interaction: As you scroll or select items, the model remains fixed while the product (glasses) they are wearing changes.
 * UI: Simple price and "Buy" / "Add to Cart" button. No complex grids.
 * Copy: Direct words ("View", "Enter", "Buy"). No em-dashes.
 */
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CheetahBar from "@/components/CheetahBar";

export interface RetailProduct {
  id: string;
  name: string;
  frame: string;
  lens: string;
  price: string;
  modelImage: string;
  productImage: string;
  edition: string;
}

export const RETAIL_PRODUCTS: RetailProduct[] = [
  {
    id: "barrel-01-gold",
    name: "Barrel 01",
    frame: "18K Gold",
    lens: "Smoke Mineral",
    price: "AED 15,000",
    edition: "Edition of 25",
    modelImage: "/manus-storage/cheeta-customizer-model-01_a428694a.png",
    productImage: "/manus-storage/cheeta-double-barrel-hero_c55a3dea.png",
  },
  {
    id: "barrel-02-gunmetal",
    name: "Barrel 02",
    frame: "Gunmetal",
    lens: "Obsidian Smoke",
    price: "AED 15,000",
    edition: "Edition of 25",
    modelImage: "/manus-storage/cheeta-customizer-model-02_aaf841a4.png",
    productImage: "/manus-storage/cheeta-double-barrel-alt_8f963d0f.png",
  },
  {
    id: "barrel-03-antique",
    name: "Barrel 03",
    frame: "Antique Bronze",
    lens: "Amber Mineral",
    price: "AED 15,000",
    edition: "Edition of 25",
    modelImage: "/manus-storage/cheeta-customizer-model-03_5d86d3fc.png",
    productImage: "/manus-storage/cheeta-double-barrel-hero_c55a3dea.png",
  },
];

export default function Retail() {
  const [activeProductId, setActiveProductId] = useState<string>(RETAIL_PRODUCTS[0].id);
  const [cartCount, setCartCount] = useState<number>(0);

  const activeProduct =
    RETAIL_PRODUCTS.find((p) => p.id === activeProductId) || RETAIL_PRODUCTS[0];

  const handleBuy = (product: RetailProduct) => {
    setCartCount((prev) => prev + 1);
    toast.success(`${product.name} added.`, {
      description: `${product.frame} · ${product.price}`,
    });
  };

  return (
    <main className="min-h-screen w-full bg-[#F4F4F0] text-[#111111] pl-16 md:pl-20">
      {/* Navigation */}
      <CheetahBar />

      <div className="max-w-[1560px] mx-auto px-6 md:px-12 py-12 md:py-20">
        {/* Top Header */}
        <header className="border-b border-[#111111]/15 pb-8 mb-12 flex items-baseline justify-between">
          <div>
            <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-none font-normal">
              Retail
            </h1>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#111111]/60 mt-3">
              Double Barrel Eyewear
            </p>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#111111]/60">
            Cart ({cartCount})
          </div>
        </header>

        {/* Main Retail Layout: Fixed Anchor Model + Simplified List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Anchored Model Display (Fixed Viewport) */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 h-[55vh] lg:h-[75vh] flex items-center justify-center bg-[#ECECE7] border border-[#111111]/10 rounded-sm overflow-hidden relative">
            {/* Background transparent cutout layer */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.modelImage}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex items-center justify-center p-6"
              >
                <img
                  src={activeProduct.modelImage}
                  alt={activeProduct.name}
                  className="h-full w-full object-contain mix-blend-multiply filter contrast-[1.05]"
                />
              </motion.div>
            </AnimatePresence>

            {/* Product Badge */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[#111111]/60 bg-[#F4F4F0]/80 backdrop-blur-sm px-4 py-2 border border-[#111111]/10">
              <span>{activeProduct.name}</span>
              <span>{activeProduct.frame}</span>
            </div>
          </div>

          {/* Right Column: Simplified Product List */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {RETAIL_PRODUCTS.map((product) => {
              const isSelected = product.id === activeProductId;
              return (
                <div
                  key={product.id}
                  onMouseEnter={() => setActiveProductId(product.id)}
                  onClick={() => setActiveProductId(product.id)}
                  className={`cursor-pointer transition-all duration-300 border p-8 md:p-10 ${
                    isSelected
                      ? "bg-[#ECECE7] border-[#111111] shadow-sm"
                      : "bg-[#F4F4F0] border-[#111111]/15 hover:border-[#111111]/40"
                  }`}
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <h2 className="font-serif text-3xl md:text-4xl font-normal leading-none">
                      {product.name}
                    </h2>
                    <span className="font-mono text-base md:text-lg font-medium tracking-[0.05em]">
                      {product.price}
                    </span>
                  </div>

                  <div className="space-y-1 font-mono text-[12px] uppercase tracking-[0.14em] text-[#111111]/70 mb-8">
                    <div>Frame: {product.frame}</div>
                    <div>Lens: {product.lens}</div>
                    <div className="text-[#111111]/45">{product.edition}</div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBuy(product);
                      }}
                      className="w-full py-4 bg-[#111111] text-[#F4F4F0] font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-black transition-colors"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveProductId(product.id);
                      }}
                      className="px-6 py-4 border border-[#111111]/30 font-mono text-[11px] uppercase tracking-[0.2em] hover:border-[#111111] transition-colors"
                    >
                      View
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Direct Information Note (No generic copy, no em-dashes) */}
            <div className="border-t border-[#111111]/15 pt-6 mt-6 font-mono text-[10px] uppercase tracking-[0.15em] text-[#111111]/50 flex justify-between">
              <span>Complimentary insured shipping worldwide.</span>
              <span>Dubai Atelier</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
