import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { X } from "lucide-react";
import { fetchWedding, fetchGifts, reserveGift } from "@/lib/wedding";
import { PageShell } from "@/components/wedding/PageShell";

export const Route = createFileRoute("/presentes")({
  head: () => ({
    meta: [
      { title: "Lista de Presentes — Nelson & Cidália" },
      { name: "description", content: "A nossa lista de presentes de casamento." },
      { property: "og:title", content: "Lista de Presentes" },
      { property: "og:description", content: "O vosso carinho é o nosso maior presente." },
    ],
  }),
  component: Presentes,
});

type Filter = "all" | "available" | "reserved" | "purchased";

function Presentes() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState<Filter>("all");
  const [reserving, setReserving] = useState<null | { id: string; name: string }>(null);
  const [resName, setResName] = useState("");
  const [resPhone, setResPhone] = useState("");
  const [saving, setSaving] = useState(false);

  const wQ = useQuery({ queryKey: ["wedding"], queryFn: fetchWedding });
  const w = wQ.data;
  const gQ = useQuery({
    queryKey: ["gifts", w?.id],
    queryFn: () => fetchGifts(w!.id),
    enabled: !!w,
  });

  const gifts = (gQ.data ?? []).filter((g) => filter === "all" ? true : g.status === filter);
  const gold = "#C9A84C";

  const confirmReserve = async () => {
    if (!reserving) return;
    if (!resName.trim() || !resPhone.trim()) {
      toast.error("Preencha o seu nome e telefone.");
      return;
    }
    setSaving(true);
    try {
      await reserveGift(reserving.id, resName.trim(), resPhone.trim());
      toast.success("✓ Presente reservado com sucesso!");
      setReserving(null); setResName(""); setResPhone("");
      qc.invalidateQueries({ queryKey: ["gifts", w?.id] });
    } catch {
      toast.error("Erro ao reservar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageShell title="Lista de Presentes">
      <div style={{ padding: "24px 20px" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 36, color: gold }}>🎁</p>
          <p style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 34, color: "#1E1A10", lineHeight: 1.15, marginTop: 4,
          }}>O Vosso Carinho é o Nosso Maior Presente</p>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic", color: "#7A6848", marginTop: 8, fontSize: 14,
          }}>Se desejarem presentear-nos, reservem um presente para evitar duplicados.</p>
        </div>

        <div style={{
          display: "flex", gap: 8, overflowX: "auto",
          marginTop: 20, paddingBottom: 4,
        }}>
          {(["all","available","reserved","purchased"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: "transparent", border: "none", cursor: "pointer",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
                color: filter === f ? gold : "rgba(201,168,76,0.4)",
                borderBottom: filter === f ? `2px solid ${gold}` : "2px solid transparent",
                padding: "6px 8px", whiteSpace: "nowrap",
              }}
            >
              {f === "all" ? "Todos" : f === "available" ? "Disponível" : f === "reserved" ? "Reservado" : "Comprado"}
            </button>
          ))}
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16,
        }}>
          {gifts.map((g) => (
            <div key={g.id} style={{
              background: "rgba(255,252,245,0.9)",
              border: "1px solid rgba(201,168,76,0.4)",
              borderRadius: 14, overflow: "hidden",
              display: "flex", flexDirection: "column",
              position: "relative",
            }}>
              <div style={{
                aspectRatio: "1 / 1",
                background: g.image_url
                  ? `url(${g.image_url}) center/cover`
                  : "linear-gradient(135deg,rgba(201,168,76,0.15),rgba(201,168,76,0.05))",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 40, color: gold,
              }}>{g.image_url ? "" : "🎁"}</div>
              <span style={{
                position: "absolute", top: 8, right: 8,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 9, letterSpacing: 1, textTransform: "uppercase",
                padding: "3px 10px", borderRadius: 999,
                background: g.status === "available" ? gold : g.status === "reserved" ? "#F0B84C" : "#4A7A50",
                color: g.status === "available" ? "#1E1A10" : "#fff",
              }}>{g.status === "available" ? "Disponível" : g.status === "reserved" ? "Reservado 🔒" : "Comprado ✓"}</span>
              <div style={{ padding: 10, flex: 1, display: "flex", flexDirection: "column" }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 11, letterSpacing: 1, color: "#1E1A10", textTransform: "uppercase",
                }}>{g.name}</p>
                {g.description && (
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 12, color: "#7A6848", marginTop: 3,
                    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}>{g.description}</p>
                )}
                {g.price_label && (
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 15, color: gold, marginTop: 6,
                  }}>{g.price_label}</p>
                )}
                <div style={{ marginTop: "auto", paddingTop: 10 }}>
                  {g.status === "available" && (
                    <button
                      onClick={() => setReserving({ id: g.id, name: g.name })}
                      style={{
                        width: "100%", padding: "8px", borderRadius: 999,
                        background: "#1B3526", color: gold, border: `1px solid ${gold}`,
                        fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
                        letterSpacing: 2, textTransform: "uppercase", cursor: "pointer",
                      }}>Reservar</button>
                  )}
                  {g.status === "reserved" && (
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 9, color: "#B58C34", letterSpacing: 1 }}>
                      Reservado{g.reserved_by_name ? ` por ${g.reserved_by_name}` : ""}
                    </p>
                  )}
                  {g.status === "purchased" && (
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 9, color: "#4A7A50", letterSpacing: 1 }}>✓ Comprado</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reserve sheet */}
      <AnimatePresence>
        {reserving && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setReserving(null)}
              style={{ position: "fixed", inset: 0, background: "rgba(8,14,6,0.6)", zIndex: 10000 }}
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 260 }}
              style={{
                position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
                width: "100%", maxWidth: 430, zIndex: 10001,
                background: "linear-gradient(180deg,#FDFAF2 0%,#F5EDD8 100%)",
                borderRadius: "24px 24px 0 0",
                borderTop: `2px solid ${gold}`, padding: "18px 20px 30px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 13, letterSpacing: 3, color: "#1E1A10", textTransform: "uppercase",
                }}>Reservar {reserving.name}</p>
                <button onClick={() => setReserving(null)} style={{ background: "transparent", border: "none", color: "#C9A84C", cursor: "pointer" }}>
                  <X size={20} />
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
                <input placeholder="O seu nome *" value={resName} onChange={(e) => setResName(e.target.value)}
                  style={{ padding: "12px 14px", borderRadius: 8, border: `1px solid ${gold}66`, background: "rgba(255,252,245,0.9)", fontFamily: "'Cormorant Garamond', serif", fontSize: 15 }} />
                <input placeholder="O seu telefone *" value={resPhone} onChange={(e) => setResPhone(e.target.value)}
                  style={{ padding: "12px 14px", borderRadius: 8, border: `1px solid ${gold}66`, background: "rgba(255,252,245,0.9)", fontFamily: "'Cormorant Garamond', serif", fontSize: 15 }} />
                <button
                  onClick={confirmReserve}
                  disabled={saving}
                  style={{
                    padding: "14px", borderRadius: 999, background: "#1B3526", color: gold, border: `1px solid ${gold}`,
                    fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", cursor: "pointer",
                  }}
                >{saving ? "A reservar..." : "✦ Confirmar Reserva ✦"}</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
