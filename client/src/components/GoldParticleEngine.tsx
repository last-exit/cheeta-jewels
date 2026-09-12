/**
 * GPU GOLD DUST & ATMOSPHERIC MOTE PARTICLE SYSTEM
 * 60fps canvas simulation with Brownian thermal drift, metallic gold luster,
 * and subtle cursor gravitational deflection.
 */
import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  baseAlpha: number;
  hue: number;
}

export default function GoldParticleEngine({
  particleCount = 55,
  className = "absolute inset-0 pointer-events-none z-10",
}: {
  particleCount?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePosRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Generate gold dust particles with varied depths
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = Math.random() * 0.45 + 0.15;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.8 + 0.2, // depth factor
        size: Math.random() * 2.2 + 0.8,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.random() * 0.45 - 0.1, // upward atmospheric drift
        alpha: baseAlpha,
        baseAlpha,
        hue: Math.random() > 0.3 ? 42 : 36, // gold / warm amber hue
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    let animId: number;
    let t = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      t += 0.015;

      ctx.clearRect(0, 0, width, height);

      const mx = mousePosRef.current.x;
      const my = mousePosRef.current.y;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Brownian motion oscillation
        p.x += p.vx + Math.sin(t + i) * 0.2 * p.z;
        p.y += p.vy;

        // Cursor gravitational repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }

        // Wrap around boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Shimmering alpha
        const currentAlpha = p.baseAlpha * (0.8 + Math.sin(t * 2 + i * 2) * 0.2);

        // Draw soft glowing gold mote
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.z, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 65%, ${currentAlpha})`;
        ctx.shadowBlur = 8 * p.z;
        ctx.shadowColor = `hsla(42, 90%, 60%, ${currentAlpha * 0.8})`;
        ctx.fill();
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [particleCount]);

  return <canvas ref={canvasRef} className={className} />;
}
