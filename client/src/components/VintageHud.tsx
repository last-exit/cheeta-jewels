import { ShoppingBag } from "lucide-react";
import { Link } from "wouter";
import TwinStrikeSeal from "@/components/TwinStrikeSeal";
import { useCart } from "@/contexts/CartContext";

export default function VintageHud({ dark = false }: { dark?: boolean }) {
  const { totalCount } = useCart();

  return (
    <header className={`vintage-hud ${dark ? "is-dark" : ""}`}>
      <Link href="/" className="flex items-center gap-2.5" aria-label="Cheetah Jewelz home">
        <TwinStrikeSeal dark={dark} className="cj-logo-wrap" />
        <span className="cheeta-wordmark">Cheetah Jewelz</span>
      </Link>
      <div className="flex items-center gap-4 sm:gap-7">
        <Link href="/retail" className="hud-collection-link font-sans text-[10px] uppercase tracking-[0.16em]">Private Collection</Link>
        <Link href="/philosophy" className="hud-philosophy-link font-sans text-[10px] uppercase tracking-[0.16em]">The Philosophy</Link>
        <Link href="/rooms" className="hud-room-link font-sans text-[10px] uppercase tracking-[0.16em]">The Exclusive Rooms</Link>
        <Link href="/cart" className="relative grid h-8 w-8 place-items-center" aria-label="View private bag">
          <ShoppingBag size={14} strokeWidth={1.35} />
          {totalCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#6B1A2C] text-[8px] font-sans text-white">
              {totalCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
