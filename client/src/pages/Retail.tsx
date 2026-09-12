/**
 * RETAIL CATALOG — Minimalist Luxury Archive
 * Radical luxury: Pure typography in GT Sectra Display & GT America,
 * Cartier/Repossi-level isolated still life, and Swiss NumberFlow pricing.
 */
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, Grid, Layers } from "lucide-react";
import React, { useState } from "react";
import { Link } from "wouter";
import CheetahBar from "@/components/CheetahBar";
import { useCart } from "@/contexts/CartContext";
import { playMetallicClick, playVaultAcquisition } from "@/lib/soundEffects";
import { toast } from "sonner";

export interface ProductItem {
  id: string;
  name: string;
  category: "Eyewear" | "High Jewelry";
  slug: string;
  frame: string;
  lens: string;
  price: number;
  priceDisplay: string;
  productImage: string;
  altImage?: string;
}

export const PRODUCTS: ProductItem[] = [
  {
    id: "barrel-01",
    name: "The Double Barrel 01",
    category: "Eyewear",
    slug: "double-barrel-01",
    frame: "18K Brushed Gold",
    lens: "Custom Ruby Mineral Lenses",
    price: 15000,
    priceDisplay: "AED 15,000",
    productImage: "/manus-storage/cheeta-double-barrel-hero_c55a3dea.png",
    altImage: "/manus-storage/cheeta-double-barrel-gold-still.jpg",
  },
  {
    id: "barrel-02",
    name: "The Double Barrel 02",
    category: "Eyewear",
    slug: "double-barrel-02",
    frame: "Gunmetal Obsidian",
    lens: "Polarized Smoke Mineral Lenses",
    price: 15000,
    priceDisplay: "AED 15,000",
    productImage: "/manus-storage/cheeta-double-barrel-gunmetal.jpg",
    altImage: "/manus-storage/cheeta-double-barrel-alt_8f963d0f.png",
  },
  {
    id: "barrel-03",
    name: "The Double Barrel 03",
    category: "Eyewear",
    slug: "double-barrel-03",
    frame: "Antique Bronze",
    lens: "Amber Gradient Mineral Lenses",
    price: 15000,
    priceDisplay: "AED 15,000",
    productImage: "/manus-storage/cheeta-double-barrel-bronze.jpg",
    altImage: "/manus-storage/cheeta-double-barrel-gold-still.jpg",
  },
  {
    id: "emerald-signet",
    name: "The Emerald Signet Ring",
    category: "High Jewelry",
    slug: "emerald-signet-ring",
    frame: "Solid 18K Yellow Gold",
    lens: "4.20 ct Muzo Emerald",
    price: 42000,
    priceDisplay: "AED 42,000",
    productImage: "/manus-storage/cheeta-emerald-ring_510231e1.png",
    altImage: "/manus-storage/cheeta-emerald-signet-still.jpg",
  },
  {
    id: "atrium-necklace",
    name: "The Atrium Gold Necklace",
    category: "High Jewelry",
    slug: "atrium-gold-necklace",
    frame: "Solid 18K Gold",
    lens: "3.45 ct Pavé Diamonds",
    price: 68000,
    priceDisplay: "AED 68,000",
    productImage: "/manus-storage/cheeta-necklace-atrium_e7928040.png",
    altImage: "/manus-storage/cheeta-atrium-necklace-alt_37930290.png",
  },
];

type FilterCategory = "all" | "eyewear" | "jewelry";
type ViewMode = "lookbook" | "grid";

export default function Retail() {
  const [filter, setFilter] = useState<FilterCategory>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("lookbook");
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const { addToCart, totalCount } = useCart();

  const filteredProducts = PRODUCTS.filter((p) => {
    if (filter === "eyewear") return p.category === "Eyewear";
    if (filter === "jewelry") return p.category === "High Jewelry";
    return true;
  });

  const handleAddToCart = (product: ProductItem) => {
    playVaultAcquisition();
    addToCart({
      id: product.id,
      name: product.name,
      frame: product.frame,
      lens: product.lens,
      price: product.price,
      priceDisplay: product.priceDisplay,
      image: product.productImage,
    });
    toast.success(`${product.name} added to bag.`, {
      description: `${product.frame} · ${product.priceDisplay}`,
    });
  };

  const handleFilterChange = (newFilter: FilterCategory) => {
    playMetallicClick();
    setFilter(newFilter);
  };

  const handleViewModeChange = (newMode: ViewMode) => {
    playMetallicClick();
    setViewMode(newMode);
  };

  return (
    <main className="min-h-screen w-full bg-[#F4F3EE] text-[#0B0B0C] selection:bg-[#0B0B0C] selection:text-[#F4F3EE]">
      {/* Floating Transparent Cheetah Bar */}
      <CheetahBar />

      <div className="max-w-6xl mx-auto px-6 md:px-20 py-24 md:py-36 pl-16 md:pl-28">
        {/* ========================================================================= */}
        {/* 1. MINIMALIST HEADER                                                      */}
        {/* ========================================================================= */}
        <header className="mb-20 md:mb-32 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#0B0B0C]/10 pb-8">
          <div>
            <h1 className="font-serif text-5xl sm:text-6xl font-normal tracking-tight text-[#0B0B0C]">
              Collection
            </h1>
          </div>

          {/* Filter & View Mode Controls */}
          <div className="flex items-center gap-6 font-sans text-xs uppercase tracking-[0.14em]">
            {/* Category Filter */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleFilterChange("all")}
                className={`transition-colors cursor-pointer ${
                  filter === "all"
                    ? "text-[#0B0B0C] font-semibold"
                    : "text-[#0B0B0C]/40 hover:text-[#0B0B0C]"
                }`}
              >
                All
              </button>
              <span className="text-[#0B0B0C]/20">/</span>
              <button
                onClick={() => handleFilterChange("eyewear")}
                className={`transition-colors cursor-pointer ${
                  filter === "eyewear"
                    ? "text-[#0B0B0C] font-semibold"
                    : "text-[#0B0B0C]/40 hover:text-[#0B0B0C]"
                }`}
              >
                Eyewear
              </button>
              <span className="text-[#0B0B0C]/20">/</span>
              <button
                onClick={() => handleFilterChange("jewelry")}
                className={`transition-colors cursor-pointer ${
                  filter === "jewelry"
                    ? "text-[#0B0B0C] font-semibold"
                    : "text-[#0B0B0C]/40 hover:text-[#0B0B0C]"
                }`}
              >
                Jewelry
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 border-l border-[#0B0B0C]/10 pl-6">
              <button
                onClick={() => handleViewModeChange("lookbook")}
                className={`p-1 transition-colors cursor-pointer ${
                  viewMode === "lookbook" ? "text-[#0B0B0C]" : "text-[#0B0B0C]/35 hover:text-[#0B0B0C]"
                }`}
                aria-label="Lookbook View"
              >
                <Layers size={15} />
              </button>
              <button
                onClick={() => handleViewModeChange("grid")}
                className={`p-1 transition-colors cursor-pointer ${
                  viewMode === "grid" ? "text-[#0B0B0C]" : "text-[#0B0B0C]/35 hover:text-[#0B0B0C]"
                }`}
                aria-label="Grid View"
              >
                <Grid size={15} />
              </button>
            </div>

            {/* Bag Counter */}
            <Link
              href="/cart"
              className="text-[#0B0B0C]/60 hover:text-[#0B0B0C] transition-colors pl-2"
            >
              Bag ({totalCount})
            </Link>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 2. PRODUCT ARCHIVE: LOOKBOOK VS GRID                                      */}
        {/* ========================================================================= */}
        {viewMode === "lookbook" ? (
          /* Clean Monograph Spreads */
          <div className="space-y-32 md:space-y-44">
            {filteredProducts.map((product, idx) => {
              const isEven = idx % 2 === 0;
              const isHovered = hoveredProduct === product.id;

              return (
                <article
                  key={product.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${
                    isEven ? "" : "lg:grid-flow-dense"
                  }`}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Product Stage */}
                  <div
                    className={`lg:col-span-7 aspect-[4/3] relative flex items-center justify-center p-8 cursor-pointer overflow-hidden ${
                      isEven ? "" : "lg:col-start-6"
                    }`}
                  >
                    <Link href={`/product/${product.slug}`} className="relative h-full w-full flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={isHovered && product.altImage ? "alt" : "main"}
                          src={isHovered && product.altImage ? product.altImage : product.productImage}
                          alt={product.name}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.3 }}
                          className="max-h-full max-w-full object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.08)]"
                        />
                      </AnimatePresence>
                    </Link>

                    {product.altImage && (
                      <span className="absolute bottom-4 right-4 font-sans text-[10px] uppercase tracking-[0.16em] text-[#0B0B0C]/35 flex items-center gap-1">
                        <Eye size={11} />
                        Alternate
                      </span>
                    )}
                  </div>

                  {/* Product Details & Acquisition */}
                  <div
                    className={`lg:col-span-5 space-y-6 flex flex-col justify-center ${
                      isEven ? "" : "lg:col-start-1"
                    }`}
                  >
                    <div>
                      <Link
                        href={`/product/${product.slug}`}
                        className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#0B0B0C] hover:text-[#4A0E16] transition-colors block"
                      >
                        {product.name}
                      </Link>
                      <p className="font-sans text-xs uppercase tracking-[0.12em] text-[#0B0B0C]/55 mt-2">
                        {product.frame} · {product.lens}
                      </p>
                    </div>

                    {/* Mechanical Price Roll */}
                    <div className="flex items-baseline gap-1.5 font-serif text-3xl font-normal text-[#0B0B0C]">
                      <span>AED</span>
                      <NumberFlow value={product.price} format={{ useGrouping: true }} />
                    </div>

                    {/* Button-in-Button Acquisition */}
                    <div className="pt-2 flex items-center gap-6">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="group/btn relative inline-flex items-center gap-4 bg-[#0B0B0C] text-[#F4F3EE] hover:bg-[#4A0E16] transition-all duration-300 pl-6 pr-2 py-2 rounded-full font-sans text-xs uppercase tracking-[0.16em] cursor-pointer active:scale-[0.98]"
                      >
                        <span>Acquire</span>
                        <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center transition-transform group-hover/btn:translate-x-0.5">
                          +
                        </span>
                      </button>

                      <Link
                        href={`/product/${product.slug}`}
                        className="font-sans text-xs uppercase tracking-[0.14em] text-[#0B0B0C]/50 hover:text-[#0B0B0C] transition-colors py-2"
                      >
                        Details →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Archive Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {filteredProducts.map((product) => (
              <article key={product.id} className="group flex flex-col justify-between">
                <Link
                  href={`/product/${product.slug}`}
                  className="aspect-[4/3] relative flex items-center justify-center p-8 cursor-pointer"
                >
                  <img
                    src={product.productImage}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105 drop-shadow-[0_20px_35px_rgba(0,0,0,0.06)]"
                  />
                </Link>

                <div className="mt-6 flex items-end justify-between border-t border-[#0B0B0C]/10 pt-4">
                  <div>
                    <Link
                      href={`/product/${product.slug}`}
                      className="font-serif text-2xl font-normal tracking-tight text-[#0B0B0C] hover:text-[#4A0E16] transition-colors block"
                    >
                      {product.name}
                    </Link>
                    <p className="font-sans text-xs uppercase tracking-[0.12em] text-[#0B0B0C]/50 mt-1">
                      {product.frame}
                    </p>
                    <div className="flex items-baseline gap-1 font-serif text-xl font-normal text-[#0B0B0C] mt-2">
                      <span>AED</span>
                      <NumberFlow value={product.price} format={{ useGrouping: true }} />
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="group/btn relative inline-flex items-center gap-3 bg-[#0B0B0C] text-[#F4F3EE] hover:bg-[#4A0E16] transition-colors pl-4 pr-1.5 py-1.5 rounded-full font-sans text-[10px] uppercase tracking-[0.16em] cursor-pointer active:scale-[0.97]"
                  >
                    <span>Acquire</span>
                    <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center transition-transform group-hover/btn:translate-x-0.5">
                      +
                    </span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. MINIMAL LEOPARD VELVET VAULT PRESENTATION                               */}
        {/* ========================================================================= */}
        <section className="mt-28 md:mt-40 overflow-hidden bg-[#141211] text-[#F4F3EE] shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 p-8 md:p-14 space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#F4F3EE]">
              The Leopard Velvet Vault
            </h2>
            <p className="font-sans text-sm text-[#F4F3EE]/70 leading-relaxed max-w-md">
              Each acquisition arrives encased in handcrafted Italian leopard velvet with imperial burgundy silk and 18K solid gold hardware.
            </p>
          </div>

          <div className="lg:col-span-6 h-full min-h-[260px] md:min-h-[340px] overflow-hidden">
            <img
              src="/manus-storage/cheeta-leopard-vault-box.jpg"
              alt="Handcrafted Italian Leopard Velvet Box with 18K Solid Gold Seal"
              className="h-full w-full object-cover filter contrast-[1.05]"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
