"use client";

// Authentic Official Minecraft Audio Asset Manager

let audioCtx: AudioContext | null = null;
const audioCache: Record<string, AudioBuffer> = {};
const loadingPromises: Record<string, Promise<AudioBuffer | null>> = {};

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function isSoundMuted(): boolean {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("mc_sound_muted");
    if (stored !== null) return stored === "1";
  }
  return false;
}

export function setSoundMuted(muted: boolean) {
  if (typeof window !== "undefined") {
    localStorage.setItem("mc_sound_muted", muted ? "1" : "0");
  }
}

export function toggleSound(): boolean {
  const currentMuted = isSoundMuted();
  const nextMuted = !currentMuted;
  setSoundMuted(nextMuted);
  if (!nextMuted) {
    playXp();
  }
  return nextMuted;
}

// Pre-load official Minecraft sound file into Web Audio API cache
async function loadMinecraftSound(filename: string): Promise<AudioBuffer | null> {
  if (audioCache[filename]) return audioCache[filename];
  if (filename in loadingPromises) return loadingPromises[filename];

  const ctx = getAudioContext();
  if (!ctx) return null;

  const promise = (async () => {
    try {
      const res = await fetch(`/${filename}`);
      if (!res.ok) return null;
      const arrayBuffer = await res.arrayBuffer();
      const decoded = await ctx.decodeAudioData(arrayBuffer);
      audioCache[filename] = decoded;
      return decoded;
    } catch {
      return null;
    }
  })();

  loadingPromises[filename] = promise;
  return promise;
}

// Play Official Minecraft Sound File from Web Audio Buffer, with HTML5 Audio Fallback
async function playOfficialSound(filename: string, volume = 0.5) {
  if (isSoundMuted()) return;
  const ctx = getAudioContext();

  if (ctx) {
    const buffer = await loadMinecraftSound(filename);
    if (buffer) {
      const source = ctx.createBufferSource();
      const gainNode = ctx.createGain();

      source.buffer = buffer;
      gainNode.gain.value = volume;

      source.connect(gainNode);
      gainNode.connect(ctx.destination);

      source.start(0);
      return;
    }
  }

  // Fallback to HTML5 Audio
  try {
    const audio = new Audio(`/${filename}`);
    audio.volume = volume;
    audio.play().catch(() => {});
  } catch {
    // Ignore audio autoplay restrictions
  }
}

// 1. Official Minecraft Creeper Primed / Fuse Sound (fuse.ogg)
export function playFuse() {
  playOfficialSound("fuse.ogg", 0.7);
}

// 2. Official Minecraft Creeper Explosion Blast Sound (explode.ogg)
export function playExplosion() {
  playOfficialSound("explode.ogg", 0.85);
}

// 3. Official Minecraft Nether Portal Travel Sound (portal.ogg)
export function playPortalTravel() {
  playOfficialSound("portal.ogg", 0.65);
}

// Alias for Nether Portal Ambient Sound
export function playPortal() {
  playPortalTravel();
}

// 4. Official Minecraft Button Click Sound (click.ogg)
export function playClick() {
  playOfficialSound("click.ogg", 0.4);
}

// 5. Official Minecraft Hotbar Hover Sound
export function playItemHover() {
  playOfficialSound("click.ogg", 0.2);
}

// 6. Official Minecraft XP Orb Pickup Sound (orb.ogg)
export function playXp() {
  playOfficialSound("orb.ogg", 0.5);
}

// 7. Official Minecraft Title Page Launch Sound (challenge.ogg / h2eBoIoq5vw Fanfare)
export function playLevelUp() {
  playOfficialSound("challenge.ogg", 0.75);
}

// 8. Official Minecraft Achievement Unlocked Sound
export function playAchievement() {
  playOfficialSound("challenge.ogg", 0.75);
}
