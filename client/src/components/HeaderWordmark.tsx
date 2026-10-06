/**
 * CENTERED CJ LOGO HEADER
 * Floating, transparent header for sub-pages.
 * Clicking returns to home page ("/") with soft metallic sound.
 * Transparent CJ monogram (no text, no background).
 * Auto-hides on scroll down so it never overlaps with text or images.
 */
import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { playMetallicClick } from "@/lib/soundEffects";

interface HeaderWordmarkProps {
  dark?: boolean;
  className?: string;
}

export default function HeaderWordmark({ dark = false, className = "" }: HeaderWordmarkProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    try {
      playMetallicClick();
    } catch {}
  };

  const logoSrc = dark
    ? "/brand/cheeta-cj-transparent-white.png"
    : "/brand/cheeta-cj-transparent.png";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 px-6 py-5 sm:py-6 flex items-center justify-center pointer-events-none select-none bg-transparent transition-all duration-300 ease-out ${
        scrolled ? "opacity-0 -translate-y-3 pointer-events-none" : "opacity-100 translate-y-0"
      } ${className}`}
    >
      <Link
        href="/"
        onClick={handleClick}
        className="pointer-events-auto flex items-center justify-center transition-opacity duration-300 hover:opacity-60 cursor-pointer focus:outline-none"
        aria-label="return to home page"
      >
        <img
          src={logoSrc}
          alt="CJ"
          className="h-7 sm:h-8 w-auto object-contain"
        />
      </Link>
    </header>
  );
}
