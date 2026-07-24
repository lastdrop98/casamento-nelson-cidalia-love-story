import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageShell } from "@/components/wedding/PageShell";

export const Route = createFileRoute("/localizacao")({
  head: () => ({
    meta: [
      { title: "Localização — Nelson & Cidália" },
      { name: "description", content: "Como chegar à igreja e à recepção do nosso casamento em Maputo." },
      { property: "og:title", content: "Localização" },
      { property: "og:description", content: "Igreja Nossa Senhora de Fátima e Cajada Eventos 2, Maputo." },
    ],
  }),
  component: Localizacao,
});

function LocationCard({
  icon, eyebrow, name, address, time, mapsUrl, wazeUrl, copyText,
}: {
  icon: string; eyebrow: string; name: string; address: string; time?: string;
  mapsUrl: string; wazeUrl: string; copyText?: string;
}) {
  const gold = "#C9A84C";
  return (
    <div style={{
      border: `1px solid ${gold}`,
      background: "rgba(255,252,245,0.9)",
      borderRadius: 14, padding: 20,
    }}>
      <p style={{ fontSize: 30, color: gold }}>{icon}</p>
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 9, letterSpacing: 3, color: gold, textTransform: "uppercase", marginTop: 6,
      }}>{eyebrow}</p>
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 16, letterSpacing: 1, color: "#1E1A10", marginTop: 4,
      }}>{name}</p>
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
          textAlign: "center", padding: "10px 16px", borderRadius: 999,
          background: "#1B3526", color: gold, textDecoration: "none",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
        }}>📍 Abrir no Google Maps</a>
        <a href={wazeUrl} target="_blank" rel="noreferrer" style={{
          textAlign: "center", padding: "10px 16px", borderRadius: 999,
          border: `1px solid ${gold}`, color: gold, textDecoration: "none",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
        }}>🧭 Abrir no Waze</a>
        {copyText && (
          <button
            onClick={() => { navigator.clipboard.writeText(copyText); toast.success("✓ Endereço copiado!"); }}
            style={{
              padding: "10px 16px", borderRadius: 999,
              border: `1px solid ${gold}`, color: gold, background: "transparent", cursor: "pointer",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
            }}>📋 Copiar Endereço</button>
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
          icon="⛪"
          eyebrow="Cerimónia Religiosa"
          name="Igreja Nossa Senhora de Fátima"
          address="Bairro Ferroviário, Maputo"
          time="11H00"
          mapsUrl="https://maps.google.com/?q=Igreja+Nossa+Senhora+Fatima+Maputo"
          wazeUrl="https://waze.com/ul?q=Igreja+Nossa+Senhora+Fatima+Maputo"
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, margin: "22px 0" }}>
          <div style={{ width: 40, height: 1, background: "#C9A84C" }} />
          <span style={{ color: "#C9A84C" }}>✦</span>
          <div style={{ width: 40, height: 1, background: "#C9A84C" }} />
        </div>

        <LocationCard
          icon="🏛️"
          eyebrow="Recepção"
          name="Cajada Eventos e Serviços 2"
          address="Av. Dom Alexandre, Maputo - Cidade"
          mapsUrl="https://maps.google.com/?q=Cajada+Eventos+Servicos+Maputo"
          wazeUrl="https://waze.com/ul?q=Cajada+Eventos+Servicos+Maputo"
          copyText="Cajada Eventos e Serviços 2, Av. Dom Alexandre, Maputo - Cidade"
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
