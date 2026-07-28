import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "@tanstack/react-router";
import { Music, VolumeX } from "lucide-react";
import { useMusic } from "@/lib/music";

export function MusicButton() {
  const [mounted, setMounted] = useState(false);
  const { pathname } = useLocation();
  const { playing, hasSrc, toggle } = useMusic();
  useEffect(() => setMounted(true), []);
  if (!mounted || !hasSrc || pathname === "/") return null;

  const gold = "#C9A84C";
  const el = (
    <button
      onClick={toggle}
      aria-label={playing ? "Pausar música" : "Tocar música"}
      style={{
        position: "fixed",
        right: 16,
        bottom: 108,
        zIndex: 9998,
        width: 46,
        height: 46,
        borderRadius: "50%",
        border: `1px solid ${gold}`,
        background: "linear-gradient(180deg,#1E3828,#0E2014)",
        color: gold,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 6px 18px rgba(0,0,0,0.35), 0 0 12px rgba(201,168,76,0.25)",
      }}
    >
      {playing ? <Music size={18} className="animate-pulse" /> : <VolumeX size={18} />}
    </button>
  );
  return createPortal(el, document.body);
}
