import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fetchWedding, fetchSchedule } from "@/lib/wedding";
import { PageShell } from "@/components/wedding/PageShell";
import { Countdown } from "@/components/wedding/Countdown";

export const Route = createFileRoute("/programa")({
  head: () => ({
    meta: [
      { title: "Programa do Dia — Nelson & Cidália" },
      { name: "description", content: "O programa completo do casamento de 27 de Novembro de 2026: cerimónia religiosa, sessão de fotos, cocktail, jantar e festa." },
      { property: "og:title", content: "Programa do Dia — Nelson & Cidália" },
      { property: "og:description", content: "Cerimónia, sessão de fotos, cocktail, jantar e festa — hora a hora, a 27 de Novembro de 2026." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://nelson-cidalia-convite-digital.lovable.app/programa" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Programa do Dia — Nelson & Cidália" },
      { name: "twitter:description", content: "Cerimónia, sessão de fotos, cocktail, jantar e festa — hora a hora, a 27 de Novembro de 2026." },
    ],
    links: [{ rel: "canonical", href: "https://nelson-cidalia-convite-digital.lovable.app/programa" }],
  }),
  component: Programa,
});

function Programa() {
  const wQ = useQuery({ queryKey: ["wedding"], queryFn: fetchWedding });
  const w = wQ.data;
  const sQ = useQuery({
    queryKey: ["schedule", w?.id],
    queryFn: () => fetchSchedule(w!.id),
    enabled: !!w,
  });
  const items = sQ.data ?? [];

  return (
    <PageShell title="Programa do Dia">
      <div style={{ padding: "24px 20px" }}>
        {/* Countdown card */}
        <div style={{
          background: "linear-gradient(180deg,#1E3828,#142A1C)",
          border: "1px solid rgba(201,168,76,0.35)",
          borderRadius: 14,
          padding: "20px 16px",
          textAlign: "center",
          boxShadow: "0 6px 24px rgba(0,0,0,0.15)",
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 9, letterSpacing: 4, color: "#C9A84C", textTransform: "uppercase",
          }}>Faltam apenas</p>
          <div style={{ marginTop: 14 }}>
            {w && <Countdown date={w.wedding_date} />}
          </div>
        </div>

        <p style={{
          marginTop: 30, textAlign: "center",
          fontFamily: "'Great Vibes', cursive",
          fontSize: 40, color: "#1E1A10",
        }}>O Nosso Dia</p>

        <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((it, idx) => (
            <motion.div
              key={it.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              style={{
                background: "rgba(255,252,245,0.9)",
                borderLeft: "3px solid #C9A84C",
                borderRadius: "0 12px 12px 0",
                padding: "14px 16px",
                boxShadow: "0 3px 12px rgba(122,104,72,0.08)",
              }}
            >
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700, fontSize: 16, color: "#C9A84C",
              }}>{it.time_label}</p>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 12, letterSpacing: 2, color: "#1E1A10", marginTop: 3,
                textTransform: "uppercase",
              }}>{it.icon ? `${it.icon} ` : ""}{it.title}</p>
              {it.description && (
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic", fontSize: 13, color: "#7A6848", marginTop: 4,
                }}>{it.description}</p>
              )}
            </motion.div>
          ))}
        </div>

        <p style={{
          marginTop: 24, textAlign: "center",
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic", fontSize: 12, color: "#7A6848",
        }}>Programa sujeito a pequenas alterações</p>
      </div>
    </PageShell>
  );
}
