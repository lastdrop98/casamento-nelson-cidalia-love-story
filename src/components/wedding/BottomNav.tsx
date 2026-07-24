import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Home, Calendar, CheckCircle, Camera, Grid2x2, ChevronRight, X } from "lucide-react";

const TABS = [
  { to: "/home", label: "INÍCIO", Icon: Home },
  { to: "/programa", label: "PROGRAMA", Icon: Calendar },
  { to: "/rsvp", label: "CONFIRMAR", Icon: CheckCircle, center: true },
  { to: "/galeria", label: "GALERIA", Icon: Camera },
] as const;

const MORE_ITEMS = [
  { to: "/historia", label: "Nossa História" },
  { to: "/localizacao", label: "Localização" },
  { to: "/presentes", label: "Lista de Presentes" },
  { to: "/dresscode", label: "Dress Code" },
  { to: "/mensagem", label: "Mensagem aos Noivos" },
  { to: "/contactos", label: "Contactos" },
] as const;

export function BottomNav() {
  const [mounted, setMounted] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  useEffect(() => setMounted(true), []);
  useEffect(() => setSheetOpen(false), [pathname]);

  if (!mounted) return null;
  if (pathname === "/") return null;

  const isActive = (to: string) =>
    pathname === to || (to !== "/" && pathname.startsWith(to));

  const inactive = "rgba(201,168,76,0.45)";
  const gold = "#C9A84C";

  const nav = (
    <>
      {/* MORE bottom sheet */}
      {sheetOpen && (
        <div
          onClick={() => setSheetOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(8,14,6,0.6)",
            zIndex: 9998,
            animation: "fadeIn 0.2s ease-out",
          }}
        />
      )}
      {sheetOpen && (
        <div
          role="dialog"
          style={{
            position: "fixed",
            left: "50%",
            bottom: 0,
            transform: "translate3d(-50%,0,0)",
            width: "100%",
            maxWidth: 430,
            zIndex: 9999,
            background: "linear-gradient(180deg,#1E3828,#0E2014)",
            borderRadius: "24px 24px 0 0",
            borderTop: "1.5px solid rgba(201,168,76,0.4)",
            padding: "12px 0 28px",
            animation: "sheetUp 0.32s cubic-bezier(0.22,1,0.36,1)",
            boxShadow: "0 -20px 40px rgba(0,0,0,0.4)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, background: gold, opacity: 0.7 }} />
          </div>
          <div style={{
            textAlign: "center",
            marginTop: 12,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 12,
            letterSpacing: 6,
            color: gold,
          }}>
            N | C
          </div>
          <button
            onClick={() => setSheetOpen(false)}
            aria-label="Fechar"
            style={{
              position: "absolute", top: 12, right: 14,
              background: "transparent", border: "none", color: gold, cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
          <div style={{ marginTop: 16 }}>
            {MORE_ITEMS.map((it) => (
              <button
                key={it.to}
                onClick={() => { setSheetOpen(false); navigate({ to: it.to }); }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 22px",
                  borderLeft: `2px solid ${gold}`,
                  borderBottom: "1px solid rgba(201,168,76,0.08)",
                  background: "transparent",
                  color: "#F5EDD8",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 13,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                <span>{it.label}</span>
                <ChevronRight size={16} color={gold} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom nav bar */}
      <div
        style={{
          position: "fixed",
          bottom: 22,
          left: "50%",
          transform: "translate3d(-50%,0,0)",
          width: "100%",
          maxWidth: 430,
          height: 62,
          background: "#1B3526",
          borderTop: "1px solid rgba(201,168,76,0.25)",
          zIndex: 9999,
          willChange: "transform",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "nowrap",
          boxShadow: "0 -6px 24px rgba(0,0,0,0.3)",
        }}
      >
        {TABS.map((t) => {
          const active = isActive(t.to);
          if (t.center) {
            return (
              <Link
                key={t.to}
                to={t.to}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  textDecoration: "none", flex: 1,
                  transform: "translateY(-14px)",
                }}
              >
                <div
                  style={{
                    width: 48, height: 48, borderRadius: "50%",
                    border: `1.5px solid ${gold}`,
                    background: "rgba(201,168,76,0.14)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: active ? `0 0 18px rgba(201,168,76,0.55)` : `0 0 10px rgba(201,168,76,0.25)`,
                    transition: "box-shadow 0.3s",
                  }}
                >
                  <t.Icon size={24} color={active ? gold : "#E7D9A8"} />
                </div>
                <span style={{
                  marginTop: 4,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 7, letterSpacing: 0.5, textTransform: "uppercase",
                  color: active ? gold : inactive,
                }}>{t.label}</span>
              </Link>
            );
          }
          return (
            <Link
              key={t.to}
              to={t.to}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                textDecoration: "none", flex: 1,
                borderTop: active ? `2px solid ${gold}` : "2px solid transparent",
                paddingTop: 8,
                height: "100%",
                justifyContent: "center",
              }}
            >
              <t.Icon size={22} color={active ? gold : inactive} />
              <span style={{
                marginTop: 4,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 7, letterSpacing: 0.5, textTransform: "uppercase",
                color: active ? gold : inactive,
              }}>{t.label}</span>
            </Link>
          );
        })}
        <button
          onClick={() => setSheetOpen(true)}
          style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            background: "transparent", border: "none", cursor: "pointer",
            flex: 1, height: "100%", justifyContent: "center",
            paddingTop: 8,
          }}
        >
          <Grid2x2 size={22} color={inactive} />
          <span style={{
            marginTop: 4,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 7, letterSpacing: 0.5, textTransform: "uppercase",
            color: inactive,
          }}>MAIS</span>
        </button>
      </div>
    </>
  );

  return createPortal(nav, document.body);
}
