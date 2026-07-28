import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Heart, Minus, Plus, Share2, Check, X as XIcon, CircleDot, Wine } from "lucide-react";
import { fetchWedding, submitRsvp } from "@/lib/wedding";
import { PageShell } from "@/components/wedding/PageShell";

export const Route = createFileRoute("/rsvp")({
  head: () => ({
    meta: [
      { title: "Confirmar Presença — Nelson & Cidália" },
      { name: "description", content: "Confirme a sua presença no nosso casamento até 30 de Outubro de 2026." },
      { property: "og:title", content: "Confirmar Presença" },
      { property: "og:description", content: "A vossa presença é o nosso maior presente." },
    ],
  }),
  component: RsvpPage,
});

type Attend = "yes" | "no" | "maybe";

function RsvpPage() {
  const wQ = useQuery({ queryKey: ["wedding"], queryFn: fetchWedding });
  const w = wQ.data;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attend, setAttend] = useState<Attend | null>(null);
  const [withPartner, setWithPartner] = useState<boolean | null>(null);
  const [partners, setPartners] = useState(0);
  const [children, setChildren] = useState(0);
  const [diet, setDiet] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<Attend | null>(null);
  const [doneName, setDoneName] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !attend) {
      toast.error("Preencha nome, telefone e confirmação.");
      return;
    }
    if (!w) return;
    setLoading(true);
    try {
      await submitRsvp({
        wedding_id: w.id,
        guest_name: `${name.trim()} · ${phone.trim()}`,
        attending: attend === "yes",
        guest_count: 1 + (attend === "yes" && withPartner ? partners : 0) + children,
        message: [
          attend === "maybe" ? "[TALVEZ]" : "",
          diet.trim() ? `Restrições: ${diet.trim()}` : "",
          message.trim(),
        ].filter(Boolean).join(" — ") || undefined,
      });
      setDoneName(name.trim());
      setDone(attend);
      toast.success("Confirmação recebida!");
    } catch {
      toast.error("Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const gold = "#C9A84C";
  const inputStyle: React.CSSProperties = {
    width: "100%",
    border: `1px solid rgba(201,168,76,0.5)`,
    borderRadius: 8,
    background: "rgba(255,252,245,0.85)",
    padding: "14px 16px",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 16,
    color: "#1E1A10",
    outline: "none",
  };

  return (
    <PageShell title="Confirmar Presença">
      <div style={{ padding: "22px 20px" }}>
        <div style={{
          border: `1px solid ${gold}`,
          background: "rgba(255,252,245,0.85)",
          borderRadius: 14,
          padding: 22,
          textAlign: "center",
        }}>
          <Heart size={36} color={gold} fill={gold} />
          <p style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 32, color: "#1E1A10", lineHeight: 1.15, marginTop: 8,
          }}>A vossa presença é o nosso maior presente</p>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic", color: gold, marginTop: 8, fontSize: 13,
          }}>Por favor confirme até 30 de Outubro de 2026</p>
        </div>

        {done ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ marginTop: 30, textAlign: "center", padding: 20 }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              style={{ display: "inline-block" }}
            >
              <Heart size={64} color={gold} fill={gold} />
            </motion.div>
            <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 44, color: gold, marginTop: 8 }}>
              Obrigado, {doneName}!
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
              fontSize: 16, color: "#1E1A10", marginTop: 10,
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              {done === "yes" && (<>A sua presença está confirmada. Até breve! <Wine size={16} color={gold} /></>)}
              {done === "no" && (<>Sentiremos a sua falta. Obrigado por avisar! <Heart size={14} color={gold} fill={gold} /></>)}
              {done === "maybe" && (<>Aguardamos a sua resposta final. <Heart size={14} color={gold} fill={gold} /></>)}
            </p>
            <button
              onClick={() => navigator.share?.({ title: "Nelson & Cidália", url: window.location.origin }).catch(() => {})}
              style={{
                marginTop: 24, padding: "10px 20px", borderRadius: 999,
                border: `1px solid ${gold}`, background: "transparent", color: gold,
                fontFamily: "'Cormorant Garamond', serif", letterSpacing: 3, fontSize: 11,
                textTransform: "uppercase", cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: 8,
              }}
            >
              <Share2 size={14} /> Partilhar
            </button>
          </motion.div>
        ) : (
          <form onSubmit={submit} style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <Field label="Nome Completo *">
              <input value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} required />
            </Field>
            <Field label="Telefone *">
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} required />
            </Field>

            <Field label="Vai estar presente? *">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {(["yes","no","maybe"] as Attend[]).map((v) => {
                  const AI = v === "yes" ? Check : v === "no" ? XIcon : CircleDot;
                  return (
                    <Pill key={v} active={attend === v} onClick={() => setAttend(v)}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <AI size={13} /> {v === "yes" ? "SIM" : v === "no" ? "NÃO" : "TALVEZ"}
                      </span>
                    </Pill>
                  );
                })}
              </div>
            </Field>

            {attend === "yes" && (
              <>
                <Field label="Vai acompanhado?">
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    <Pill active={withPartner === true} onClick={() => setWithPartner(true)}>SIM</Pill>
                    <Pill active={withPartner === false} onClick={() => { setWithPartner(false); setPartners(0); }}>NÃO</Pill>
                  </div>
                </Field>

                {withPartner && (
                  <Field label="Acompanhantes">
                    <Counter value={partners} onChange={setPartners} />
                  </Field>
                )}

                <Field label="Crianças">
                  <Counter value={children} onChange={setChildren} />
                </Field>

                <Field label="Restrições Alimentares">
                  <input value={diet} onChange={(e) => setDiet(e.target.value)} style={inputStyle} />
                </Field>
              </>
            )}

            <Field label="Mensagem para os noivos">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 300))}
                rows={4}
                style={{ ...inputStyle, resize: "vertical" }}
              />
              <div style={{
                textAlign: "right", fontFamily: "'Cormorant Garamond', serif",
                fontSize: 10, color: gold, marginTop: 4,
              }}>{message.length}/300</div>
            </Field>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: "#1B3526",
                color: gold,
                border: `1px solid ${gold}`,
                borderRadius: 999,
                padding: "16px 20px",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 12, letterSpacing: 5, textTransform: "uppercase",
                cursor: "pointer",
                marginTop: 6,
              }}
            >
              {loading ? "A confirmar..." : "Confirmar Presença"}
            </button>
          </form>
        )}
      </div>
    </PageShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "block" }}>
      <span style={{
        display: "block",
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 10, letterSpacing: 3, color: "#C9A84C",
        textTransform: "uppercase", marginBottom: 6,
      }}>{label}</span>
      {children}
    </label>
  );
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "12px 6px",
        borderRadius: 999,
        background: active ? "#1B3526" : "transparent",
        color: active ? "#C9A84C" : "#C9A84C",
        border: `1px solid ${active ? "#C9A84C" : "rgba(201,168,76,0.5)"}`,
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function Counter({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const btn: React.CSSProperties = {
    width: 44, height: 44, borderRadius: 999,
    border: "1px solid rgba(201,168,76,0.5)",
    background: "transparent", color: "#C9A84C", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
  };
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
      <button type="button" style={btn} onClick={() => onChange(Math.max(0, value - 1))}><Minus size={16} /></button>
      <span style={{
        fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#1E1A10",
        minWidth: 30, textAlign: "center",
      }}>{value}</span>
      <button type="button" style={btn} onClick={() => onChange(Math.min(10, value + 1))}><Plus size={16} /></button>
    </div>
  );
}
