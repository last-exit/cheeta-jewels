/**
 * CART : Private Acquisition Summary
 * Pure luxury typography in GT Sectra Display & GT America with Swiss NumberFlow rolling prices.
 */
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import CheetahBar from "@/components/CheetahBar";
import { useCart } from "@/contexts/CartContext";
import { playMetallicClick, playVaultAcquisition } from "@/lib/soundEffects";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, totalPrice, totalCount } =
    useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleUpdateQty = (id: string, delta: number) => {
    playMetallicClick();
    updateQuantity(id, delta);
  };

  const handleRemove = (id: string) => {
    playMetallicClick();
    removeFromCart(id);
  };

  const handleCheckout = () => {
    playVaultAcquisition();
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setShowConfirmation(true);
      clearCart();
      toast.success("Acquisition logged.", {
        description: "A private client advisor will reach out to coordinate delivery.",
      });
    }, 700);
  };

  return (
    <main className="min-h-screen w-full bg-[#F4F3EE] text-[#0B0B0C] selection:bg-[#0B0B0C] selection:text-[#F4F3EE]">
      {/* Floating Transparent Cheetah Bar */}
      <CheetahBar />

      <div className="max-w-5xl mx-auto px-6 md:px-20 py-24 md:py-36 pl-16 md:pl-28">
        {/* Back Link */}
        <div className="mb-12">
          <Link
            href="/retail"
            className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.16em] text-[#0B0B0C]/50 hover:text-[#0B0B0C] transition-colors"
          >
            <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
            <span>Collection</span>
          </Link>
        </div>

        {/* Header */}
        <header className="mb-16 flex items-baseline justify-between border-b border-[#0B0B0C]/10 pb-6">
          <h1 className="font-serif text-4xl md:text-5xl font-normal tracking-tight">
            Bag
          </h1>
          <span className="font-sans text-xs uppercase tracking-[0.14em] text-[#0B0B0C]/40">
            {totalCount} {totalCount === 1 ? "Piece" : "Pieces"}
          </span>
        </header>

        {showConfirmation ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-16 text-center space-y-4"
          >
            <h2 className="font-serif text-3xl font-normal text-[#0B0B0C]">
              Acquisition Initiated
            </h2>
            <p className="font-sans text-sm text-[#0B0B0C]/70 max-w-md mx-auto leading-relaxed">
              Your reservation has been logged with the atelier. A private concierge will contact you with your schedule.
            </p>
            <div className="pt-6">
              <Link
                href="/retail"
                onClick={() => setShowConfirmation(false)}
                className="inline-block font-sans text-xs uppercase tracking-[0.2em] text-[#0B0B0C] hover:text-[#4A0E16] transition-colors"
              >
                Return to Collection →
              </Link>
            </div>
          </motion.div>
        ) : cart.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <p className="font-serif text-2xl text-[#0B0B0C]/60">Your bag is empty.</p>
            <div className="pt-4">
              <Link
                href="/retail"
                className="inline-block font-sans text-xs uppercase tracking-[0.2em] text-[#0B0B0C] hover:text-[#4A0E16] transition-colors"
              >
                Explore Collection →
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Item List */}
            <div className="space-y-10">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-[#0B0B0C]/10"
                >
                  <div className="flex items-center gap-6">
                    <div className="h-20 w-20 flex items-center justify-center shrink-0 bg-[#EBEAE4]/40 p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain drop-shadow-sm"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-normal text-[#0B0B0C]">
                        {item.name}
                      </h3>
                      <p className="font-sans text-xs uppercase tracking-[0.12em] text-[#0B0B0C]/50 mt-1">
                        {item.frame}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-8">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 font-sans text-sm">
                      <button
                        onClick={() => handleUpdateQty(item.id, -1)}
                        className="p-1 text-[#0B0B0C]/40 hover:text-[#0B0B0C] transition-colors cursor-pointer"
                        aria-label="Decrease"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="px-2 select-none font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQty(item.id, 1)}
                        className="p-1 text-[#0B0B0C]/40 hover:text-[#0B0B0C] transition-colors cursor-pointer"
                        aria-label="Increase"
                      >
                        <Plus size={11} />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="flex items-baseline gap-1 font-serif text-lg min-w-[110px] justify-end">
                      <span>AED</span>
                      <NumberFlow value={item.price * item.quantity} format={{ useGrouping: true }} />
                    </div>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-[#0B0B0C]/30 hover:text-[#4A0E16] transition-colors p-1 cursor-pointer"
                      aria-label="Remove"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="pt-8 space-y-6 max-w-md ml-auto">
              <div className="space-y-3 font-sans text-xs uppercase tracking-[0.14em]">
                <div className="flex justify-between text-[#0B0B0C]/50">
                  <span>Subtotal</span>
                  <div className="flex items-baseline gap-1">
                    <span>AED</span>
                    <NumberFlow value={totalPrice} format={{ useGrouping: true }} />
                  </div>
                </div>
                <div className="flex justify-between text-[#0B0B0C]/50">
                  <span>Delivery</span>
                  <span>Complimentary</span>
                </div>
                <div className="flex justify-between text-xl font-serif font-normal text-[#0B0B0C] pt-4 border-t border-[#0B0B0C]/10">
                  <span>Total</span>
                  <div className="flex items-baseline gap-1">
                    <span>AED</span>
                    <NumberFlow value={totalPrice} format={{ useGrouping: true }} />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-3.5 bg-[#0B0B0C] text-[#F4F3EE] hover:bg-[#4A0E16] transition-colors font-sans text-xs uppercase tracking-[0.18em] font-medium cursor-pointer rounded-full active:scale-[0.98]"
                >
                  {isCheckingOut ? "Processing..." : "Acquire"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
