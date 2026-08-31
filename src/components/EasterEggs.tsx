"use client";

import { useState } from "react";
import { playAchievement, playExplosion, playFuse } from "@/lib/mcSound";

export function EasterEggs() {
  const [creeperClicks, setCreeperClicks] = useState(0);
  const [diamondFound, setDiamondFound] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleCreeperClick = () => {
    const next = creeperClicks + 1;
    setCreeperClicks(next);

    if (next < 3) {
      playFuse();
      setToast(`Creeper hiss... (${3 - next} clicks left!)`);
      setTimeout(() => setToast(null), 1500);
    } else {
      playExplosion();
      setCreeperClicks(0);
      setToast("💥 BOOM! Creeper exploded! Achievement Unlocked: Creeper Whisperer");
      setTimeout(() => setToast(null), 4000);
    }
  };

  const handleDiamondClick = () => {
    if (diamondFound) return;
    setDiamondFound(true);
    playAchievement();
    setToast("💎 Achievement Unlocked: Found the Hidden Diamond!");
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 left-6 z-[100] mc-tooltip font-pixel text-xs text-[#ffaa00] animate-bounce max-w-sm">
          {toast}
        </div>
      )}

      {/* Hidden Creeper Icon (Bottom Right Floating) */}
      <button
        type="button"
        onClick={handleCreeperClick}
        className="fixed bottom-4 right-4 z-40 w-8 h-8 bg-[#55a828] border-2 border-[#000] flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
        title="Hidden Creeper..."
      >
        <span className="font-pixel text-[10px] text-[#000]">👾</span>
      </button>

      {/* Hidden Diamond (Bottom Left Floating) */}
      {!diamondFound && (
        <button
          type="button"
          onClick={handleDiamondClick}
          className="fixed bottom-4 left-4 z-40 text-xl opacity-50 hover:opacity-100 transition-opacity cursor-pointer animate-pulse"
          title="Hidden Diamond 💎"
        >
          💎
        </button>
      )}
    </>
  );
}
