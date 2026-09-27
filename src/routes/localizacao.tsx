import type { LucideIcon } from "lucide-react";
import { Church, Landmark, MapPin, Navigation, ClipboardCopy } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageShell } from "@/components/wedding/PageShell";

export const Route = createFileRoute("/localizacao")({
  head: () => ({
    meta: [
      { title: "Localização — Nelson & Cidália" },
      { name: "description", content: "Como chegar à local de celebração em Xiguiane, com indicações para Google Maps e Waze." },
      { property: "og:title", content: "Localização — Xiguiane" },
      { property: "og:description", content: "Xiguiane — 28 de Novembro de 2026 — com indicações para Google Maps e Waze." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://nelson-cidalia-convite-digital.lovable.app/localizacao" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Localização — Xiguiane" },
      { name: "twitter:description", content: "Xiguiane — 28 de Novembro de 2026 — com indicações para Google Maps e Waze." },
    ],
    links: [{ rel: "canonical", href: "https://nelson-cidalia-convite-digital.lovable.app/localizacao" }],
  }),
  component: Localizacao,
});

function LocationCard({
  Icon, eyebrow, name, address, time, mapsUrl, wazeUrl, copyText,
}: {
  Icon: LucideIcon; eyebrow: string; name: string; address: string; time?: string;
  mapsUrl: string; wazeUrl: string; copyText?: string;
}) {
  const gold = "#C9A84C";
  return (
    <div style={{
      border: `1px solid ${gold}`,
      background: "rgba(255,252,245,0.9)",
      borderRadius: 14, padding: 20,
    }}>
      <Icon size={30} color={gold} strokeWidth={1.4} />
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 9, letterSpacing: 3, color: gold, textTransform: "uppercase", marginTop: 6,
      }}>{eyebrow}</p>
      <h2 style={{
        margin: 0,
        fontWeight: 400,
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 16, letterSpacing: 1, color: "#1E1A10", marginTop: 4,
      }}>{name}</h2>
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 14, color: "#7A6848", marginTop: 4,
      }}>{address}</p>
      {time && <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 10, letterSpacing: 2, color: gold, marginTop: 6,
      }}>{time}</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
        <a href={mapsUrl} target="_blank" rel="noreferrer" style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
          textAlign: "center", padding: "10px 16px", borderRadius: 999,
          background: "#1B3526", color: gold, textDecoration: "none",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
        }}><MapPin size={14} /> Abrir no Google Maps</a>
        <a href={wazeUrl} target="_blank" rel="noreferrer" style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
          textAlign: "center", padding: "10px 16px", borderRadius: 999,
          border: `1px solid ${gold}`, color: gold, textDecoration: "none",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
        }}><Navigation size={14} /> Abrir no Waze</a>
        {copyText && (
          <button
            onClick={() => { navigator.clipboard.writeText(copyText); toast.success("Endereço copiado!"); }}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "10px 16px", borderRadius: 999,
              border: `1px solid ${gold}`, color: gold, background: "transparent", cursor: "pointer",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
            }}><ClipboardCopy size={14} /> Copiar Endereço</button>
        )}
      </div>
    </div>
  );
}

function Localizacao() {
  return (
    <PageShell title="Localização">
      <div style={{ padding: "24px 20px" }}>
        <p style={{
          textAlign: "center", fontFamily: "'Great Vibes', cursive",
          fontSize: 36, color: "#1E1A10", marginBottom: 20,
        }}>Como Chegar até Nós</p>

        <LocationCard
          Icon={Landmark}
          eyebrow="Copo d'Água"
          name="Xiguiane"
          address="Xiguiane"
          time="13H00 · 28 DE NOVEMBRO DE 2026"
          mapsUrl="https://maps.google.com/?q=-25.911264,32.605160"
          wazeUrl="https://waze.com/ul?ll=-25.911264,32.605160&navigate=yes"
          copyText="-25.911264, 32.605160"
        />

        <p style={{
          marginTop: 26, textAlign: "center",
          fontFamily: "'Great Vibes', cursive",
          fontSize: 28, color: "#C9A84C",
        }}>Contamos com a vossa presença!</p>
      </div>
    </PageShell>
  );
}
