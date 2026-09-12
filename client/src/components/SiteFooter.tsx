/**
 * SITE FOOTER
 * Persistent footer with concierge contact, secondary navigation,
 * service links, and the legal/credit row. Renders on the ivory
 * backdrop across every page.
 */
import { Link } from "wouter";

const SERVICE = [
  { label: "Shipping & Delivery", href: "/shipping" },
  { label: "Returns & Exchange", href: "/returns" },
  { label: "Care Guide", href: "/care" },
  { label: "Private Viewing", href: "/rooms" },
  { label: "Concierge", href: "/contact" },
];

const LEGAL = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms of Sale", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
];

const PRIMARY = [
  { label: "The 100", href: "/retail" },
  { label: "The Founder", href: "/founder" },
  { label: "Salons", href: "/rooms" },
  { label: "Film", href: "/film" },
  { label: "Bag", href: "/cart" },
];

export default function SiteFooter() {
  return (
    <footer className="relative w-full bg-[#F4F1E8] text-[#1A1410] border-t border-[#1A1410]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Top — wordmark + tagline */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-12 md:pb-16 border-b border-[#1A1410]/10">
          <div>
            <Link
              href="/"
              className="font-serif text-2xl md:text-3xl text-[#1A1410] tracking-tight hover:text-[#6B1A2C] transition-colors"
            >
              Cheetah Jewelz
            </Link>
            <p className="mt-3 font-serif text-base md:text-lg italic text-[#1A1410]/65 max-w-md">
              Icon Livin' — the first 100 pairs, hand-finished in the Dubai atelier.
            </p>
          </div>

          <a
            href="mailto:concierge@cheetahjewelz.com"
            className="font-sans text-xs md:text-sm uppercase tracking-[0.28em] text-[#1A1410] hover:text-[#6B1A2C] transition-colors"
          >
            concierge@cheetahjewelz.com →
          </a>
        </div>

        {/* Middle — link grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 py-12 md:py-16 border-b border-[#1A1410]/10">
          <FooterColumn title="The House" items={PRIMARY} />
          <FooterColumn title="Service" items={SERVICE} />
          <FooterColumn title="Legal" items={LEGAL} />
          <div>
            <h4 className="font-sans text-[10px] uppercase tracking-[0.42em] text-[#1A1410]/50 mb-5">
              Dubai Atelier
            </h4>
            <address className="not-italic font-sans text-sm text-[#1A1410]/80 leading-[1.7]">
              Al Quoz Creative Zone
              <br />
              Dubai, United Arab Emirates
              <br />
              <span className="text-[#1A1410]/55">By appointment only</span>
            </address>
            <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.32em] text-[#1A1410]/50">
              Sat — Thu · 10:00 — 18:00 GST
            </p>
          </div>
        </div>

        {/* Bottom — credit row */}
        <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 font-sans text-[10px] uppercase tracking-[0.32em] text-[#1A1410]/45">
          <span>© 2026 Cheetah Jewelz, Dubai</span>
          <span>Numbered 001 — 100</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="font-sans text-[10px] uppercase tracking-[0.42em] text-[#1A1410]/50 mb-5">
        {title}
      </h4>
      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              className="font-sans text-sm text-[#1A1410]/80 hover:text-[#6B1A2C] transition-colors"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
