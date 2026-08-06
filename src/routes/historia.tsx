import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell } from "@/components/wedding/PageShell";

export const Route = createFileRoute("/historia")({
  head: () => ({
    meta: [
      { title: "Nossa História — Nelson & Cidália" },
      { name: "description", content: "Do primeiro encontro em 2019 ao pedido de casamento: a história de amor de Nelson & Cidália contada ano a ano até ao dia do sim." },
      { property: "og:title", content: "Nossa História — Nelson & Cidália" },
      { property: "og:description", content: "Do primeiro encontro ao pedido de casamento — a jornada de Nelson & Cidália contada ano a ano." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://nelson-cidalia-convite-digital.lovable.app/historia" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Nossa História — Nelson & Cidália" },
      { name: "twitter:description", content: "Do primeiro encontro ao pedido de casamento — a jornada de Nelson & Cidália contada ano a ano." },
    ],
    links: [{ rel: "canonical", href: "https://nelson-cidalia-convite-digital.lovable.app/historia" }],
  }),
  component: Historia,
});

const EVENTS = [
  { year: "2019", title: "O Primeiro Encontro", text: "Foi numa tarde que os nossos caminhos se cruzaram pela primeira vez. Um sorriso, um olhar — e o mundo mudou para sempre." },
  { year: "2021", title: "A Primeira Viagem", text: "Juntos descobrimos que o mundo é mais bonito quando partilhado com a pessoa certa." },
  { year: "2023", title: "O Pedido", text: "Numa noite especial, Nelson ajoelhou-se e fez a pergunta mais importante da sua vida. Cidália disse sim." },
  { year: "2026", title: "Para Sempre", text: "E agora convidamos as pessoas que amamos para testemunhar o início da nossa história eterna." },
];

function Historia() {
  return (
    <PageShell title="Nossa História">
      <div style={{ padding: "26px 20px 40px" }}>
        <p style={{
          textAlign: "center",
          fontFamily: "'Great Vibes', cursive",
          fontSize: 40, color: "#1E1A10",
        }}>Como Tudo Começou...</p>

        <div style={{ position: "relative", marginTop: 24, paddingLeft: 30 }}>
          <div style={{
            position: "absolute", left: 12, top: 8, bottom: 8,
            width: 2, background: "rgba(201,168,76,0.5)",
          }} />
          {EVENTS.map((e, idx) => (
            <motion.div
              key={e.year}
              initial={{ opacity: 0, x: idx % 2 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              style={{ position: "relative", marginBottom: 26 }}
            >
              <div style={{
                position: "absolute", left: -24, top: 12,
                width: 14, height: 14, borderRadius: "50%",
                background: "#C9A84C", boxShadow: "0 0 0 3px rgba(201,168,76,0.2)",
              }} />
              <span style={{
                display: "inline-block", padding: "4px 12px",
                border: "1px solid #C9A84C", borderRadius: 999,
                background: "rgba(255,252,245,0.9)", color: "#C9A84C",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 10, letterSpacing: 2,
              }}>{e.year}</span>
              <div style={{
                marginTop: 8, padding: 14,
                background: "rgba(255,252,245,0.9)",
                borderLeft: "2px solid #C9A84C",
                borderRadius: "0 12px 12px 0",
                boxShadow: "0 3px 12px rgba(122,104,72,0.08)",
              }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 12, letterSpacing: 2, color: "#1E1A10", textTransform: "uppercase",
                }}>{e.title}</p>
                <p style={{
                  marginTop: 6,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic", fontSize: 15, color: "#7A6848", lineHeight: 1.8,
                }}>{e.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <p style={{
          marginTop: 20, textAlign: "center",
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic", color: "#C9A84C",
        }}>Uma história de amor que acabou de começar...</p>
      </div>
    </PageShell>
  );
}
