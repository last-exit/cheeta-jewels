import React, { useId } from "react";

interface SubtleLuxuryBackgroundProps {
  className?: string;
  variant?: "full" | "swirls-only" | "rosettes-only";
  dark?: boolean;
  subtlePattern?: boolean;
}

/**
 * SUBTLE LUXURY BACKGROUND
 * Ambient, hand-drawn vector filigree swirls and organic cheetah rosettes
 * dispersed strategically across the entire canvas height.
 * 
 * Features:
 * 1. Ambient Paper Fiber Watermark: A continuous, whisper-faint (2% opacity)
 *    SVG vector pattern of organic cheetah rosettes woven into the paper texture sitewide.
 * 2. 12 Master Discoverable Constellations: Distributed down the negative margins (left/right).
 *    When the user's cursor glides across negative space, the hidden rosettes
 *    warm up with an exquisite golden bloom (from ~3.5% to 16% opacity, text-[#B8860B]),
 *    rewarding the user with the delightful sensation of spotting the house's signature mark.
 */
export default function SubtleLuxuryBackground({
  className = "",
  variant = "full",
  dark = false,
  subtlePattern = true,
}: SubtleLuxuryBackgroundProps) {
  const patternId = useId();

  // Theme-aware base tones
  const baseTextColor = dark ? "text-[#D4AF37]" : "text-[#2A241D]";
  const baseOpacityClass = dark ? "opacity-[0.045]" : "opacity-[0.035]";
  const hoverClass = dark
    ? "hover:opacity-[0.20] hover:scale-[1.04] hover:text-[#F3E5AB] hover:drop-shadow-[0_0_16px_rgba(212,175,55,0.35)] active:opacity-[0.24] active:scale-[1.06]"
    : "hover:opacity-[0.16] hover:scale-[1.04] hover:text-[#B8860B] hover:drop-shadow-[0_0_14px_rgba(184,134,11,0.28)] active:opacity-[0.20] active:scale-[1.06]";

  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      {/* ===================================================================== */}
      {/* 0. AMBIENT WATERMARK PATTERN: WOVEN ORGANIC CHEETAH PAPER TEXTURE     */}
      {/* ===================================================================== */}
      {subtlePattern && (variant === "full" || variant === "rosettes-only") && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id={patternId}
              x="0"
              y="0"
              width="360"
              height="360"
              patternUnits="userSpaceOnUse"
            >
              {/* Rosette 1 (Top-Left) */}
              <path
                d="M48,40 C52,30 64,28 72,32 C64,38 62,46 66,54 C56,52 49,48 48,40 Z"
                fill="currentColor"
              />
              <path
                d="M80,33 C89,37 94,47 91,56 C85,52 80,53 76,49 C77,42 77,37 80,33 Z"
                fill="currentColor"
              />
              <path
                d="M62,58 C70,61 80,59 86,55 C82,61 74,65 67,64 C61,63 60,60 62,58 Z"
                fill="currentColor"
              />

              {/* Rosette 2 (Mid-Right) */}
              <path
                d="M230,140 C236,128 250,125 260,130 C252,136 250,146 255,153 C244,151 236,147 230,140 Z"
                fill="currentColor"
              />
              <path
                d="M268,132 C278,137 282,149 278,160 C272,155 268,156 263,151 C264,144 264,138 268,132 Z"
                fill="currentColor"
              />
              <path
                d="M246,158 C255,162 265,160 272,155 C268,162 260,167 252,165 C246,164 245,160 246,158 Z"
                fill="currentColor"
              />

              {/* Rosette 3 (Lower-Left) */}
              <path
                d="M95,235 C100,223 113,220 123,225 C115,231 113,240 118,247 C108,245 100,241 95,235 Z"
                fill="currentColor"
              />
              <path
                d="M130,227 C139,232 143,243 140,253 C134,249 130,250 125,245 C126,238 126,233 130,227 Z"
                fill="currentColor"
              />
              <path
                d="M111,251 C119,254 128,253 135,248 C131,255 124,259 117,258 C111,257 110,253 111,251 Z"
                fill="currentColor"
              />

              {/* Scattered aerodynamic satellite teardrops */}
              <ellipse cx="145" cy="50" rx="3.5" ry="5" transform="rotate(25 145 50)" fill="currentColor" />
              <ellipse cx="285" cy="75" rx="4" ry="3" transform="rotate(-15 285 75)" fill="currentColor" />
              <ellipse cx="175" cy="215" rx="4.5" ry="3.5" transform="rotate(35 175 215)" fill="currentColor" />
              <ellipse cx="42" cy="175" rx="3" ry="4.5" transform="rotate(-30 42 175)" fill="currentColor" />
              <ellipse cx="295" cy="265" rx="3.5" ry="4" transform="rotate(15 295 265)" fill="currentColor" />
              <ellipse cx="185" cy="105" rx="2.5" ry="3" fill="currentColor" />
              <ellipse cx="75" cy="305" rx="4" ry="3" fill="currentColor" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill={`url(#${patternId})`}
            className={`${baseTextColor} ${dark ? "opacity-[0.024]" : "opacity-[0.018]"}`}
          />
        </svg>
      )}

      {/* ===================================================================== */}
      {/* 1. TOP-LEFT: DISCOVERY ROSETTE DUET & TEARDROP SPOTS (near menu)     */}
      {/* ===================================================================== */}
      {(variant === "full" || variant === "rosettes-only") && (
        <svg
          aria-label="Cheeta Jewels · Signature Rosette Duet"
          className={`absolute top-[4%] left-[4%] sm:left-[6%] w-48 sm:w-60 h-auto ${baseTextColor} ${baseOpacityClass} ${hoverClass} transition-all duration-700 ease-out pointer-events-auto cursor-default`}
          viewBox="0 0 240 200"
          fill="currentColor"
        >
          {/* Organic Rosette 1 */}
          <path d="M50,42 C54,30 68,26 80,30 C70,38 67,48 73,58 C61,56 52,50 50,42 Z" />
          <path d="M88,32 C100,36 108,48 104,60 C96,54 90,56 84,50 C86,42 85,36 88,32 Z" />
          <path d="M68,64 C78,68 90,66 98,60 C94,68 84,74 74,72 C66,70 65,66 68,64 Z" />

          {/* Satellite predatory teardrop spots */}
          <ellipse cx="125" cy="45" rx="5" ry="4" transform="rotate(25 125 45)" />
          <ellipse cx="45" cy="75" rx="4" ry="5" transform="rotate(-15 45 75)" />
          <ellipse cx="110" cy="80" rx="3.5" ry="3" />

          {/* Organic Rosette 2 */}
          <path d="M140,75 C146,62 162,58 174,64 C164,70 162,82 168,90 C154,88 144,83 140,75 Z" />
          <path d="M182,68 C194,74 198,88 194,100 C186,94 182,96 176,90 C178,82 178,74 182,68 Z" />
          <path d="M156,98 C166,102 178,100 188,94 C182,102 172,108 162,106 C155,104 154,100 156,98 Z" />

          <ellipse cx="145" cy="125" rx="4.5" ry="3.5" transform="rotate(30 145 125)" />
          <ellipse cx="205" cy="85" rx="3.5" ry="4" transform="rotate(-20 205 85)" />
        </svg>
      )}

      {/* ===================================================================== */}
      {/* 2. TOP-RIGHT: JEWELER'S ENGRAVING SWIRL & C-ROSETTE FINIAL            */}
      {/* ===================================================================== */}
      {(variant === "full" || variant === "swirls-only") && (
        <svg
          aria-label="Atelier Master Engraving Flourish"
          className={`absolute -top-12 -right-12 w-80 sm:w-96 md:w-[480px] h-auto ${baseTextColor} ${baseOpacityClass} ${hoverClass} transition-all duration-700 ease-out pointer-events-auto cursor-default`}
          viewBox="0 0 400 400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Engraving acanthus curve */}
          <path d="M380,40 C320,30 260,70 240,120 C220,170 250,230 310,240 C360,250 400,210 390,160 C380,120 330,110 300,140 C280,160 290,190 320,195" />
          <path d="M360,20 C290,20 220,80 200,150 C180,220 230,290 300,310 C370,330 420,280 400,210" strokeWidth="0.8" />
          <path d="M260,110 C210,100 170,140 160,190 C150,240 180,280 230,290" strokeDasharray="3 4" strokeWidth="0.75" />
          <path d="M240,130 Q180,160 150,220 T110,320" strokeWidth="0.9" />

          {/* Integrated Rosetta spots inside the swirl finials */}
          <circle cx="310" cy="240" r="3.5" fill="currentColor" opacity="0.6" />
          <circle cx="240" cy="120" r="2.5" fill="currentColor" opacity="0.6" />
          <circle cx="150" cy="220" r="2" fill="currentColor" opacity="0.6" />
        </svg>
      )}

      {/* ===================================================================== */}
      {/* 3. UPPER-LEFT (16% down): PREDATORY THREE-BRACKET ROSETTE TRAIL       */}
      {/* ===================================================================== */}
      {(variant === "full" || variant === "rosettes-only") && (
        <svg
          aria-label="Cheeta Rosette Trail"
          className={`absolute top-[16%] left-[2%] sm:left-[5%] w-56 sm:w-72 h-auto ${baseTextColor} ${baseOpacityClass} ${hoverClass} transition-all duration-700 ease-out pointer-events-auto cursor-default`}
          viewBox="0 0 260 220"
          fill="currentColor"
        >
          <path d="M70,40 C75,28 88,24 98,28 C88,36 86,46 92,54 C80,52 72,48 70,40 Z" />
          <path d="M106,30 C118,34 124,46 120,58 C112,52 106,54 100,48 C102,40 102,34 106,30 Z" />
          <path d="M84,60 C94,64 106,62 114,56 C108,64 98,70 88,68 C80,66 79,62 84,60 Z" />

          <ellipse cx="45" cy="50" rx="4" ry="5.5" transform="rotate(-20 45 50)" />
          <ellipse cx="140" cy="40" rx="5" ry="3.5" transform="rotate(30 140 40)" />
          <ellipse cx="65" cy="95" rx="3.5" ry="4" transform="rotate(15 65 95)" />

          <path d="M130,95 C135,82 148,78 158,84 C148,90 146,102 152,110 C138,108 129,103 130,95 Z" />
          <path d="M166,88 C176,94 180,106 176,118 C168,112 164,114 158,108 C160,100 160,94 166,88 Z" />
          <path d="M144,116 C154,120 164,118 172,112 C166,120 156,126 148,124 C142,122 142,118 144,116 Z" />
          <ellipse cx="195" cy="100" rx="4.5" ry="3.5" transform="rotate(-15 195 100)" />
        </svg>
      )}

      {/* ===================================================================== */}
      {/* 4. UPPER-RIGHT (28% down): ASYMMETRICAL CHEETAH ROSETTE TRIAD         */}
      {/* ===================================================================== */}
      {(variant === "full" || variant === "rosettes-only") && (
        <svg
          aria-label="The Imperial Rosette Triad"
          className={`absolute top-[28%] right-[2%] sm:right-[5%] w-60 sm:w-76 h-auto ${baseTextColor} ${baseOpacityClass} ${hoverClass} transition-all duration-700 ease-out pointer-events-auto cursor-default`}
          viewBox="0 0 280 240"
          fill="currentColor"
        >
          {/* Triad 1 */}
          <path d="M80,50 C86,34 104,30 118,36 C108,44 106,56 112,66 C98,64 88,58 80,50 Z" />
          <path d="M126,38 C140,44 144,58 140,72 C132,66 126,68 120,62 C122,52 120,44 126,38 Z" />
          <path d="M102,76 C112,82 126,80 136,72 C130,82 118,88 108,86 C100,84 98,78 102,76 Z" />

          <ellipse cx="55" cy="65" rx="4" ry="5.5" transform="rotate(-35 55 65)" />
          <ellipse cx="160" cy="50" rx="5" ry="3.5" transform="rotate(25 160 50)" />

          {/* Triad 2 */}
          <path d="M165,110 C171,96 188,92 200,98 C190,106 188,118 194,126 C180,124 171,118 165,110 Z" />
          <path d="M208,100 C220,106 226,120 220,132 C212,126 208,128 202,122 C204,114 204,106 208,100 Z" />
          <path d="M186,136 C196,140 210,138 218,132 C212,140 202,146 192,144 C185,142 184,138 186,136 Z" />

          <ellipse cx="140" cy="140" rx="3.5" ry="5" transform="rotate(15 140 140)" />
          <ellipse cx="240" cy="120" rx="4" ry="3.5" transform="rotate(-20 240 120)" />
        </svg>
      )}

      {/* ===================================================================== */}
      {/* 5. MID-LEFT (40% down): PROMINENT CHEETAH CONSTELLATION               */}
      {/* ===================================================================== */}
      {(variant === "full" || variant === "rosettes-only") && (
        <svg
          aria-label="Cheeta Constellation Mark"
          className={`absolute top-[40%] -left-6 sm:left-4 w-72 sm:w-88 h-auto ${baseTextColor} ${baseOpacityClass} ${hoverClass} transition-all duration-700 ease-out pointer-events-auto cursor-default`}
          viewBox="0 0 340 380"
          fill="currentColor"
        >
          {/* Rosette 1 */}
          <path d="M60,50 C65,35 80,30 95,34 C85,42 82,54 88,64 C75,62 63,58 60,50 Z" />
          <path d="M105,38 C118,42 125,55 122,68 C114,62 108,64 102,58 C104,50 102,44 105,38 Z" />
          <path d="M80,72 C90,76 105,74 115,68 C110,75 100,82 88,80 C80,78 78,74 80,72 Z" />

          {/* Rosette 2 */}
          <path d="M160,95 C166,82 182,78 194,84 C184,90 182,102 188,110 C174,108 164,103 160,95 Z" />
          <path d="M202,88 C214,94 218,108 214,120 C206,114 202,116 196,110 C198,102 198,94 202,88 Z" />
          <path d="M176,118 C186,122 198,120 208,114 C202,122 192,128 182,126 C175,124 174,120 176,118 Z" />

          {/* Micro-spots */}
          <ellipse cx="140" cy="65" rx="4" ry="6" transform="rotate(25 140 65)" />
          <ellipse cx="110" cy="115" rx="5" ry="4" transform="rotate(-15 110 115)" />
          <ellipse cx="235" cy="95" rx="6" ry="4" transform="rotate(40 235 95)" />
          <ellipse cx="170" cy="145" rx="4" ry="5" transform="rotate(10 170 145)" />

          {/* Rosette 3 */}
          <path d="M105,180 C110,166 126,162 138,168 C128,174 126,186 132,194 C118,192 108,188 105,180 Z" />
          <path d="M146,172 C158,178 162,192 158,204 C150,198 146,200 140,194 C142,186 142,178 146,172 Z" />
          <path d="M122,202 C132,206 144,204 154,198 C148,206 138,212 128,210 C121,208 120,204 122,202 Z" />

          <ellipse cx="85" cy="210" rx="5" ry="4" transform="rotate(-30 85 210)" />
          <ellipse cx="165" cy="225" rx="4" ry="6" transform="rotate(15 165 225)" />
        </svg>
      )}

      {/* ===================================================================== */}
      {/* 6. MID-RIGHT (52% down): SECRET DISCOVERY ROSETTE CLUSTER            */}
      {/* ===================================================================== */}
      {(variant === "full" || variant === "rosettes-only") && (
        <svg
          aria-label="Secret Discovery Rosette Cluster"
          className={`absolute top-[52%] -right-8 sm:right-6 md:right-10 w-64 sm:w-80 h-auto ${baseTextColor} ${baseOpacityClass} ${hoverClass} transition-all duration-700 ease-out pointer-events-auto cursor-default`}
          viewBox="0 0 300 280"
          fill="currentColor"
        >
          {/* Rosette Trio */}
          <path d="M60,60 C68,44 88,40 102,46 C92,54 90,68 97,78 C81,76 70,70 60,60 Z" />
          <path d="M112,48 C126,54 132,70 126,84 C118,78 112,80 104,72 C108,62 106,54 112,48 Z" />
          <path d="M84,90 C96,96 112,94 122,86 C116,96 104,104 92,102 C84,100 82,92 84,90 Z" />

          <ellipse cx="40" cy="110" rx="4.5" ry="6" transform="rotate(35 40 110)" />
          <ellipse cx="150" cy="65" rx="5" ry="3.5" transform="rotate(-20 150 65)" />

          {/* Second Rosette */}
          <path d="M160,110 C168,94 186,88 200,96 C190,104 188,118 195,128 C179,126 168,120 160,110 Z" />
          <path d="M210,98 C224,104 230,120 224,134 C216,128 210,130 202,122 C206,112 204,104 210,98 Z" />
          <path d="M182,140 C194,146 210,144 220,136 C214,146 202,154 190,152 C182,150 180,142 182,140 Z" />

          <ellipse cx="130" cy="160" rx="4" ry="5.5" transform="rotate(15 130 160)" />
          <ellipse cx="245" cy="140" rx="5" ry="4" transform="rotate(-15 245 140)" />

          {/* Third Rosette */}
          <path d="M100,180 C106,166 122,162 134,168 C124,174 122,186 128,194 C114,192 104,188 100,180 Z" />
          <path d="M142,172 C154,178 158,192 154,204 C146,198 142,200 136,194 C138,186 138,178 142,172 Z" />
          <path d="M118,202 C128,206 140,204 150,198 C144,206 134,212 124,210 C117,208 116,204 118,202 Z" />
        </svg>
      )}

      {/* ===================================================================== */}
      {/* 7. LOWER-LEFT (65% down): FILIGREE SCROLL WITH ORGANIC SPOTS          */}
      {/* ===================================================================== */}
      {(variant === "full" || variant === "swirls-only") && (
        <svg
          aria-label="Jeweler's Scroll & Rosettes"
          className={`absolute top-[65%] -left-10 sm:left-4 w-72 sm:w-96 h-auto ${baseTextColor} ${baseOpacityClass} ${hoverClass} transition-all duration-700 ease-out pointer-events-auto cursor-default`}
          viewBox="0 0 360 360"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Classical jeweler's scroll flourish */}
          <path d="M20,320 C80,310 140,260 160,200 C180,140 140,90 80,100 C30,110 0,160 20,210 C40,250 85,250 110,220 C130,195 115,165 90,170" />
          <path d="M40,340 C110,330 180,270 200,190 C220,110 160,50 90,65" strokeWidth="0.7" />
          <path d="M140,210 Q210,180 250,110 T300,20" strokeWidth="0.85" strokeDasharray="4 4" />
          <circle cx="80" cy="100" r="2.5" fill="currentColor" opacity="0.5" />
          <circle cx="160" cy="200" r="2" fill="currentColor" opacity="0.5" />
        </svg>
      )}

      {/* ===================================================================== */}
      {/* 8. LOWER-RIGHT (76% down): FLOWING SAVANNAH ROSETTE DRIFT             */}
      {/* ===================================================================== */}
      {(variant === "full" || variant === "rosettes-only") && (
        <svg
          aria-label="Savannah Rosette Drift"
          className={`absolute top-[76%] right-[4%] sm:right-[10%] w-64 sm:w-80 h-auto ${baseTextColor} ${baseOpacityClass} ${hoverClass} transition-all duration-700 ease-out pointer-events-auto cursor-default`}
          viewBox="0 0 320 220"
          fill="currentColor"
        >
          {/* Rosette 1 */}
          <path d="M60,50 C64,38 78,34 90,38 C80,46 76,56 82,64 C70,62 62,58 60,50 Z" />
          <path d="M98,40 C110,44 116,56 112,68 C104,62 98,64 92,58 C94,50 94,44 98,40 Z" />
          <path d="M76,70 C86,74 98,72 108,66 C102,74 92,80 82,78 C74,76 74,72 76,70 Z" />

          <ellipse cx="135" cy="52" rx="4" ry="3.5" transform="rotate(20 135 52)" />
          <ellipse cx="48" cy="85" rx="3.5" ry="4.5" transform="rotate(-25 48 85)" />

          {/* Rosette 2 */}
          <path d="M180,85 C186,72 202,68 214,74 C204,80 202,92 208,100 C194,98 184,93 180,85 Z" />
          <path d="M222,78 C234,84 238,98 234,110 C226,104 222,106 216,100 C218,92 218,84 222,78 Z" />
          <path d="M196,108 C206,112 218,110 228,104 C222,112 212,118 202,116 C195,114 194,110 196,108 Z" />

          <ellipse cx="160" cy="120" rx="4" ry="3.5" transform="rotate(-10 160 120)" />
          <ellipse cx="255" cy="95" rx="4" ry="4.5" transform="rotate(35 255 95)" />

          {/* Rosette 3 */}
          <path d="M230,140 C234,130 246,126 254,130 C246,136 244,144 248,150 C238,148 232,145 230,140 Z" />
          <path d="M260,132 C268,136 272,146 268,154 C262,150 258,152 254,146 C256,140 256,134 260,132 Z" />
          <path d="M242,156 C250,158 258,156 264,152 C260,158 252,162 246,160 C240,159 240,157 242,156 Z" />
        </svg>
      )}

      {/* ===================================================================== */}
      {/* 9. DEEP-LEFT (86% down): HOUSE TOUCHMARK ROSETTE DUET                 */}
      {/* ===================================================================== */}
      {(variant === "full" || variant === "rosettes-only") && (
        <svg
          aria-label="House Touchmark Rosette Duet"
          className={`absolute top-[86%] left-[3%] sm:left-[6%] w-52 sm:w-64 h-auto ${baseTextColor} ${baseOpacityClass} ${hoverClass} transition-all duration-700 ease-out pointer-events-auto cursor-default`}
          viewBox="0 0 240 200"
          fill="currentColor"
        >
          <path d="M55,50 C60,38 74,34 84,38 C75,46 73,56 78,64 C66,62 58,58 55,50 Z" />
          <path d="M92,42 C104,46 110,58 106,70 C98,64 92,66 86,60 C88,52 88,46 92,42 Z" />
          <path d="M72,70 C82,74 94,72 102,66 C96,74 86,80 78,78 C71,76 70,72 72,70 Z" />
          <ellipse cx="125" cy="55" rx="4" ry="5" transform="rotate(20 125 55)" />
          <ellipse cx="45" cy="85" rx="3" ry="4" transform="rotate(-15 45 85)" />

          <path d="M135,85 C140,74 152,70 162,75 C154,82 152,92 157,99 C146,97 138,93 135,85 Z" />
          <path d="M170,80 C180,85 184,97 180,107 C173,102 168,103 163,98 C165,91 165,86 170,80 Z" />
          <path d="M150,105 C158,109 168,107 175,102 C170,109 162,114 154,112 C148,111 148,107 150,105 Z" />
          <ellipse cx="195" cy="92" rx="3.5" ry="4" transform="rotate(30 195 92)" />
        </svg>
      )}

      {/* ===================================================================== */}
      {/* 10. DEEP-RIGHT (93% down): ATELIER MICRO-ROSETTES                     */}
      {/* ===================================================================== */}
      {(variant === "full" || variant === "rosettes-only") && (
        <svg
          aria-label="Atelier Micro-Rosette Constellation"
          className={`absolute top-[93%] right-[3%] sm:right-[7%] w-48 sm:w-60 h-auto ${baseTextColor} ${baseOpacityClass} ${hoverClass} transition-all duration-700 ease-out pointer-events-auto cursor-default`}
          viewBox="0 0 220 180"
          fill="currentColor"
        >
          <path d="M60,45 C64,35 76,32 84,36 C76,42 74,50 78,57 C68,55 62,51 60,45 Z" />
          <path d="M92,38 C100,42 105,52 101,62 C94,57 90,58 85,54 C86,47 86,42 92,38 Z" />
          <path d="M74,62 C82,65 92,63 98,59 C94,65 86,70 79,69 C73,68 73,64 74,62 Z" />
          <ellipse cx="120" cy="48" rx="3.5" ry="4" transform="rotate(25 120 48)" />
          <ellipse cx="50" cy="72" rx="3" ry="3.5" transform="rotate(-20 50 72)" />

          <path d="M125,75 C129,66 140,63 148,67 C141,73 139,81 143,87 C133,85 127,82 125,75 Z" />
          <path d="M154,70 C162,74 166,83 162,92 C156,88 152,89 148,85 C149,79 149,74 154,70 Z" />
          <path d="M138,91 C145,94 153,92 159,88 C155,94 148,98 142,97 C137,96 137,93 138,91 Z" />
          <ellipse cx="178" cy="80" rx="3" ry="3.5" transform="rotate(15 178 80)" />
        </svg>
      )}

      {/* ===================================================================== */}
      {/* 11. ATELIER DISCOVERY HALLMARK: 18K / CJ EMBOSSED SEAL (Bottom-Left)  */}
      {/* ===================================================================== */}
      <div
        className={`absolute bottom-6 left-6 sm:bottom-10 sm:left-12 ${baseTextColor} opacity-[0.028] hover:opacity-[0.16] hover:scale-[1.05] hover:text-[#B8860B] transition-all duration-700 ease-out pointer-events-auto cursor-default flex items-center gap-2`}
        title="Cheeta Jewels Atelier 18K Solid Gold Hallmark"
      >
        <svg className="w-5 h-5" viewBox="0 0 40 40" fill="none" stroke="currentColor">
          <circle cx="20" cy="20" r="18" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="20" cy="20" r="14" strokeWidth="0.8" />
          {/* Miniature cheetah rosette center */}
          <path d="M17,17 C18,14 22,14 23,16 C21,18 20,19 22,21" fill="currentColor" stroke="none" />
          <circle cx="18" cy="22" r="1.5" fill="currentColor" stroke="none" />
        </svg>
        <span className="font-sans text-[8px] uppercase tracking-[0.25em] font-medium hidden sm:inline">
          18k · cj
        </span>
      </div>

      {/* ===================================================================== */}
      {/* 12. CHEETAH PAW ATELIER TOUCHMARK (Bottom-Right)                      */}
      {/* ===================================================================== */}
      <div
        className={`absolute bottom-6 right-6 sm:bottom-10 sm:right-12 ${baseTextColor} opacity-[0.028] hover:opacity-[0.16] hover:scale-[1.05] hover:text-[#B8860B] transition-all duration-700 ease-out pointer-events-auto cursor-default flex items-center gap-2`}
        title="Cheetah Jewels Official Paw Touchmark"
      >
        <span className="font-sans text-[8px] uppercase tracking-[0.25em] font-medium hidden sm:inline">
          atelier mark
        </span>
        <svg className="w-5 h-5" viewBox="0 0 40 40" fill="currentColor">
          {/* Central Pad */}
          <path d="M14,24 C14,21 17,19 20,19 C23,19 26,21 26,24 C26,27 23,29 20,29 C17,29 14,27 14,24 Z" />
          {/* 4 Toe Pads */}
          <ellipse cx="12" cy="18" rx="2.5" ry="3.5" transform="rotate(-25 12 18)" />
          <ellipse cx="17" cy="14" rx="2.5" ry="3.5" transform="rotate(-8 17 14)" />
          <ellipse cx="23" cy="14" rx="2.5" ry="3.5" transform="rotate(8 23 14)" />
          <ellipse cx="28" cy="18" rx="2.5" ry="3.5" transform="rotate(25 28 18)" />
        </svg>
      </div>
    </div>
  );
}

