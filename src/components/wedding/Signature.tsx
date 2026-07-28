import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Heart } from "lucide-react";
import { useLocation } from "@tanstack/react-router";

export function Signature() {
  const [mounted, setMounted] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setMounted(true), []);
  if (!mounted || pathname === "/") return null;

  const el = (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translate3d(-50%,0,0)",
      width: "100%",
      maxWidth: 430,
      height: 22,
      background: "#080E06",
      borderTop: "1px solid rgba(201,168,76,0.08)",
      zIndex: 9997,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 9,
      letterSpacing: 0.5,
      color: "rgba(201,168,76,0.45)",
    }}>
      <span>Feito com</span>
      <Heart size={8} fill="#C9A84C" strokeWidth={0} />
      <span>por Shelton Barreto</span>
      <span style={{ fontSize: 8, letterSpacing: 1 }}>MZ</span>
    </div>
  );
  return createPortal(el, document.body);
}
