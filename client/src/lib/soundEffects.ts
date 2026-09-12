/**
 * NATIVE WEB AUDIO API SOUND SYNTHESIZER
 * Zero-latency procedural audio synthesis for luxury interactions:
 * - 18K Solid Gold Clasp Clicks
 * - Vault Resonance Sub-bass Chimes
 * - Optical Glass Swaps
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * 1. Micro-Mechanical Clasp Click (Solid Gold Watch Clasp)
 */
export function playMetallicClick() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.04);

    filter.type = "highpass";
    filter.frequency.setValueAtTime(800, ctx.currentTime);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.045);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // Audio context silent fallback
  }
}

/**
 * 2. Solid Gold Vault Acquisition Chime (Deep Resonant Sub-bass + Harmonic Gold Ring)
 */
export function playVaultAcquisition() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Sub-bass fundamental (72 Hz)
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(72, now);
    subOsc.frequency.exponentialRampToValueAtTime(45, now + 0.6);
    subGain.gain.setValueAtTime(0.18, now);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
    subOsc.connect(subGain);
    subGain.connect(ctx.destination);

    // Harmonic Gold Ring (432 Hz + 864 Hz)
    const goldOsc = ctx.createOscillator();
    const goldGain = ctx.createGain();
    goldOsc.type = "triangle";
    goldOsc.frequency.setValueAtTime(432, now);
    goldGain.gain.setValueAtTime(0.12, now);
    goldGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
    goldOsc.connect(goldGain);
    goldGain.connect(ctx.destination);

    subOsc.start(now);
    subOsc.stop(now + 0.75);
    goldOsc.start(now);
    goldOsc.stop(now + 0.55);
  } catch {
    // Audio context silent fallback
  }
}

/**
 * 3. Optical Glass Swap Whoosh
 */
export function playLensSwap() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.08);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, now);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  } catch {
    // Audio context silent fallback
  }
}
