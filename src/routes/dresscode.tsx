import type { LucideIcon } from "lucide-react";
import { Shirt, VenetianMask } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/wedding/PageShell";
import { BotanicalCorner } from "@/components/wedding/BotanicalCorner";

export const Route = createFileRoute("/dresscode")({
  head: () => ({
    meta: [
      { title: "Dress Code — Nelson & Cidália" },
      { name: "description", content: "Traje sugerido para o nosso casamento." },
      { property: "og:title", content: "Dress Code" },
      { property: "og:description", content: "Vista-se para a nossa celebração." },
    ],
  }),
  component: Dresscode,
});

function Card({ Icon, title, text }: { Icon: LucideIcon; title: string; text: string }) {
  const gold = "#C9A84C";
  return (
    <div style={{
      border: `1px solid ${gold}`, background: "rgba(255,252,245,0.9)",
      borderRadius: 14, padding: 20, marginBottom: 14,
    }}>
      <Icon size={32} color={gold} strokeWidth={1.4} />
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 12, letterSpacing: 4, color: "#1E1A10", textTransform: "uppercase", marginTop: 4,
      }}>{title}</p>
      <div style={{ width: 40, height: 1, background: gold, margin: "10px 0" }} />
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 15, color: "#1E1A10", lineHeight: 1.9,
      }}>{text}</p>
    </div>
  );
}

function Dresscode() {
  const gold = "#C9A84C";
  return (
    <PageShell title="Dress Code">
      <div style={{ position: "relative", padding: "24px 20px" }}>
        <BotanicalCorner pos="tl" size={70} />
        <BotanicalCorner pos="br" size={70} />
        <p style={{
          textAlign: "center", fontFamily: "'Great Vibes', cursive",
          fontSize: 36, color: "#1E1A10", position: "relative", zIndex: 1,
        }}>Vista-se para a Nossa Celebração</p>

        <div style={{ marginTop: 22, position: "relative", zIndex: 1 }}>
          <Card Icon={VenetianMask} title="Homens" text="Fato completo ou traje formal. Gravata ou laço recomendado. Cores sugeridas: marfim, dourado, navy, preto, cinza." />
          <Card Icon={Shirt} title="Mulheres" text="Vestido longo ou cocktail elegante. Evitar roupa casual ou informal. Saltos altos ou sapatos elegantes." />
        </div>

        <div style={{ marginTop: 6, textAlign: "center", position: "relative", zIndex: 1 }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 9, letterSpacing: 4, color: gold, textTransform: "uppercase",
          }}>Cores a Evitar</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 30, marginTop: 12 }}>
            {[{ c: "#FFFFFF", l: "Branco — reservado para a noiva" }, { c: "#CC0000", l: "Vermelho intenso" }].map((x) => (
              <div key={x.c} style={{ textAlign: "center", maxWidth: 130 }}>
                <div style={{
                  width: 46, height: 46, borderRadius: "50%",
                  background: x.c, border: "1px solid rgba(122,104,72,0.4)",
                  margin: "0 auto",
                }} />
                <p style={{
                  marginTop: 8, fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic", fontSize: 11, color: "#7A6848",
                }}>{x.l}</p>
              </div>
            ))}
          </div>
        </div>

        <p style={{
          marginTop: 26, textAlign: "center",
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic", color: "#7A6848", position: "relative", zIndex: 1,
        }}>Obrigado por contribuir para a beleza do nosso dia</p>
      </div>
    </PageShell>
  );
}
