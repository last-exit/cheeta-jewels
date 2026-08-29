/** Vintage Revival / Miami Empire style: a sharp house lockup with an official CJ mark and restrained Velvet Red cues. */
import { ShoppingBag } from "lucide-react";
import { Link } from "wouter";
import TwinStrikeSeal from "@/components/TwinStrikeSeal";

export default function VintageHud({ dark = false }: { dark?: boolean }) {
  return (
    <header className={`vintage-hud ${dark ? "is-dark" : ""}`}>
      <Link href="/" className="flex items-center gap-2.5" aria-label="Cheeta Jewels home">
        <TwinStrikeSeal dark={dark} className="cj-logo-wrap" />
        <span className="cheeta-wordmark">Cheeta Jewels</span>
      </Link>
      <div className="flex items-center gap-4 sm:gap-7">
        <Link href="/barrel-01" className="hud-collection-link font-mono text-[9px] uppercase tracking-[0.13em] sm:text-[10px]">Private Collection</Link>
        <Link href="/philosophy" className="hud-philosophy-link font-mono text-[9px] uppercase tracking-[0.13em] sm:text-[10px]">The Philosophy</Link>
        <Link href="/exclusive-rooms" className="hud-room-link font-mono text-[9px] uppercase tracking-[0.13em] sm:text-[10px]">The Exclusive Rooms</Link>
        <Link href="/barrel-01" className="grid h-8 w-8 place-items-center border border-current/30 transition-colors hover:border-[#6b151e] hover:text-[#6b151e]" aria-label="View private collection"><ShoppingBag size={14} strokeWidth={1.35} /></Link>
      </div>
    </header>
  );
}
