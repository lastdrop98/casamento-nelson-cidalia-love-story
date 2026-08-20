import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "@tanstack/react-router";
import { Home, Users, Image as ImageIcon, Mail, Calendar } from "lucide-react";

type Tab = { to: "/home" | "/historia" | "/galeria" | "/mensagem" | "/programa"; label: string; Icon: typeof Home };

const TABS: Tab[] = [
  { to: "/home", label: "Início", Icon: Home },
  { to: "/historia", label: "Nossa História", Icon: Users },
  { to: "/galeria", label: "Galeria", Icon: ImageIcon },
  { to: "/mensagem", label: "Mensagem", Icon: Mail },
  { to: "/programa", label: "Programa", Icon: Calendar },
];

export function BottomNav() {
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (pathname === "/") return null;

  const gold = "#C9A84C";
  const idle = "rgba(245,237,216,0.72)";

  const isActive = (to: string) => pathname === to || (to !== "/" && pathname.startsWith(to));

  const nav = (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translate3d(-50%,0,0)",
        width: "100%",
        maxWidth: 430,
        zIndex: 9999,
        willChange: "transform",
        background: "linear-gradient(180deg,#1B3A28 0%,#0E2014 100%)",
        borderTop: `1.5px solid ${gold}`,
        borderRadius: "36px 36px 0 0",
        boxShadow: "0 -10px 28px rgba(14,32,20,0.28)",
        padding: "14px 6px calc(16px + env(safe-area-inset-bottom, 0px))",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {TABS.map((t) => {
        const active = isActive(t.to);
        return (
          <Link
            key={t.to}
            to={t.to}
            aria-label={t.label}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              padding: "6px 0",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: active ? "rgba(201,168,76,0.18)" : "transparent",
                border: active ? `1px solid ${gold}` : "1px solid transparent",
                transition: "background 0.25s, border-color 0.25s",
              }}
            >
              <t.Icon size={24} strokeWidth={1.6} color={active ? gold : idle} />
            </span>
          </Link>
        );
      })}
    </div>
  );

  return createPortal(nav, document.body);
}
