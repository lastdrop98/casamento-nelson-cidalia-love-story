import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Instagram, Facebook, Music2 } from "lucide-react";
import { PageShell } from "@/components/wedding/PageShell";

export const Route = createFileRoute("/contactos")({
  head: () => ({
    meta: [
      { title: "Contactos — Nelson & Cidália" },
      { name: "description", content: "Fale connosco directamente." },
      { property: "og:title", content: "Contactos" },
      { property: "og:description", content: "Estamos à disposição." },
    ],
  }),
  component: Contactos,
});

function ContactCard({ initial, role, name, phone, wa }: { initial: string; role: string; name: string; phone: string; wa?: string }) {
  const gold = "#C9A84C";
  return (
    <div style={{
      border: `1px solid ${gold}`, background: "rgba(255,252,245,0.9)",
      borderRadius: 14, padding: 18,
      display: "flex", alignItems: "center", gap: 14,
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: "50%",
        border: `1.5px solid ${gold}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: gold, fontFamily: "'Cormorant Garamond', serif", fontSize: 20,
        flexShrink: 0,
      }}>{initial}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 9, letterSpacing: 4, color: gold, textTransform: "uppercase" }}>{role}</p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#1E1A10", marginTop: 2 }}>{name}</p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#7A6848", marginTop: 2 }}>{phone}</p>
      </div>
      {wa ? (
        <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" style={{
          background: "#25D366", color: "#fff", padding: "8px 14px", borderRadius: 999,
          textDecoration: "none", fontFamily: "'Cormorant Garamond', serif",
          fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
        }}>WhatsApp</a>
      ) : (
        <span style={{
          background: "#25D366", color: "#fff", padding: "8px 14px", borderRadius: 999,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 11, letterSpacing: 2, textTransform: "uppercase", opacity: 0.4,
        }}>WhatsApp</span>
      )}
    </div>
  );
}

function Contactos() {
  const gold = "#C9A84C";
  const hashtag = "#NelsonECidália2026";
  return (
    <PageShell title="Contactos">
      <div style={{ padding: "24px 20px" }}>
        <p style={{ textAlign: "center", fontFamily: "'Great Vibes', cursive", fontSize: 36, color: "#1E1A10" }}>
          Estamos à Disposição
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 22 }}>
          <ContactCard initial="N" role="Noivo" name="Nelson Issufo Mussa" phone="+258 84 015 3624" wa="258840153624" />
          <ContactCard initial="C" role="Noiva" name="Cidália João Gulube" phone="+258 84 209 8679" wa="258842098679" />
          <ContactCard initial="?" role="Cerimonial" name="A confirmar" phone="—" />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "26px 0" }}>
          <div style={{ flex: 1, height: 1, background: gold, opacity: 0.5 }} />
          <span style={{ color: gold }}>✦</span>
          <div style={{ flex: 1, height: 1, background: gold, opacity: 0.5 }} />
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 9, letterSpacing: 4, color: gold, textTransform: "uppercase",
          }}>Sigam a nossa história</p>
          <button
            onClick={() => { navigator.clipboard.writeText(hashtag); toast.success("Hashtag copiada!"); }}
            style={{
              background: "transparent", border: "none", cursor: "pointer",
              fontFamily: "'Great Vibes', cursive", fontSize: 32, color: gold,
              marginTop: 4,
            }}
          >{hashtag}</button>
          <div style={{ display: "flex", justifyContent: "center", gap: 18, marginTop: 18 }}>
            {[
              { Icon: Instagram, label: "Instagram" },
              { Icon: Facebook, label: "Facebook" },
              { Icon: Music2, label: "TikTok" },
            ].map(({ Icon, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  border: `1px solid ${gold}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: gold,
                }}>
                  <Icon size={22} />
                </div>
                <p style={{ marginTop: 6, fontFamily: "'Cormorant Garamond', serif", fontSize: 8, letterSpacing: 2, color: gold, textTransform: "uppercase" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
