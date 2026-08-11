import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Church, Landmark, MapPin, Navigation, ClipboardCopy, Heart, Check, X as XIcon,
  CircleDot, Minus, Plus, Gift, Lock, Camera, ChevronLeft, ChevronRight, Mail,
  Instagram, Facebook, Music2, Flower2, Wine, Music, Share2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BotanicalCorner } from "@/components/wedding/BotanicalCorner";
import {
  fetchWedding, fetchGallery, fetchGifts, reserveGift, fetchMessages,
  submitMessage, signUrl, submitRsvp,
} from "@/lib/wedding";

const gold = "#C9A84C";
const ink = "#1E1A10";
const CREAM_BG = "linear-gradient(180deg,#FDFAF2 0%,#F5EDD8 100%)";
const GREEN_BG = "linear-gradient(180deg,#1B3526 0%,#0E2014 100%)";

export function GoldOrnament({ dark = false }: { dark?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "26px 20px" }}>
      <div style={{ width: 60, height: 1, background: gold, opacity: dark ? 0.7 : 0.6 }} />
      <span style={{ color: gold, fontSize: 12 }}>◆</span>
      <div style={{ width: 60, height: 1, background: gold, opacity: dark ? 0.7 : 0.6 }} />
    </div>
  );
}

function Section({
  children, dark = false, background,
}: { children: React.ReactNode; dark?: boolean; background?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "relative",
        overflow: "hidden",
        background: background ?? (dark ? GREEN_BG : CREAM_BG),
        padding: "40px 20px",
      }}
    >
      <BotanicalCorner position="top-left" size={64} opacity={0.5} inset={8} />
      <BotanicalCorner position="bottom-right" size={64} opacity={0.5} inset={8} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </motion.section>
  );
}

/* ── SECTION 2 — CONTAGEM REGRESSIVA ───────────────────────── */

const TARGET = new Date("2026-11-27T11:00:00").getTime();
function diff() {
  const ms = Math.max(0, TARGET - Date.now());
  return {
    dias: Math.floor(ms / 86400000),
    horas: Math.floor((ms % 86400000) / 3600000),
    min: Math.floor((ms % 3600000) / 60000),
    seg: Math.floor((ms % 60000) / 1000),
  };
}

export function CountdownSection() {
  const [t, setT] = useState(diff);
  useEffect(() => {
    const i = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(i);
  }, []);
  const boxes = [
    { label: "Dias", value: t.dias },
    { label: "Horas", value: t.horas },
    { label: "Min", value: t.min },
    { label: "Seg", value: t.seg },
  ];
  return (
    <Section dark>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 9, letterSpacing: 6, color: gold, textTransform: "uppercase" }}>
          Faltam apenas
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 15, color: "rgba(201,168,76,0.6)", marginTop: 4 }}>
          para o nosso grande dia
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginTop: 18 }}>
          {boxes.map((b) => (
            <div key={b.label} style={{
              background: "#FAF6EE",
              border: "1px solid rgba(201,168,76,0.5)",
              borderRadius: 12,
              padding: "12px 8px",
            }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 36, color: ink, lineHeight: 1 }}>
                {String(b.value).padStart(2, "0")}
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 8, letterSpacing: 3, color: gold, textTransform: "uppercase", marginTop: 6 }}>
                {b.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── SECTION 3 — PROGRAMA ──────────────────────────────────── */

const SCHEDULE: Array<{ time: string; Icon: LucideIcon; title: string; desc: string }> = [
  { time: "11H00", Icon: Church, title: "Cerimónia Religiosa", desc: "Igreja Nossa Senhora de Fátima — Bairro Ferroviário" },
  { time: "13H00", Icon: Flower2, title: "Recepção dos Convidados", desc: "Cajada Eventos e Serviços 2 — Av. Dom Alexandre" },
  { time: "14H00", Icon: Wine, title: "Cocktail", desc: "Momentos de convívio e celebração" },
  { time: "15H00", Icon: Wine, title: "Copo de Água", desc: "Celebração e brinde à nossa nova vida juntos" },
  { time: "17H00", Icon: Music, title: "Festa e Dança", desc: "Que a música nos una até de madrugada" },
];

export function ProgramaSection() {
  return (
    <Section>
      <p style={{ textAlign: "center", fontFamily: "'Great Vibes', cursive", fontSize: 40, color: ink }}>O Nosso Dia</p>
      <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
        {SCHEDULE.map((it, idx) => (
          <motion.div
            key={it.time + it.title}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            style={{
              background: "rgba(255,252,245,0.9)",
              borderLeft: `3px solid ${gold}`,
              borderRadius: "0 12px 12px 0",
              padding: "14px 16px",
              boxShadow: "0 3px 12px rgba(122,104,72,0.08)",
            }}
          >
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 16, color: gold }}>{it.time}</p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: 2, color: ink,
              marginTop: 3, textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 8,
            }}>
              <it.Icon size={14} color={gold} /> {it.title}
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 13, color: "#7A6848", marginTop: 4 }}>
              {it.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ── SECTION 4 — LOCALIZAÇÃO ───────────────────────────────── */

function LocationCard({
  Icon, eyebrow, name, address, time, mapsUrl, wazeUrl, copyText,
}: {
  Icon: LucideIcon; eyebrow: string; name: string; address: string; time?: string;
  mapsUrl: string; wazeUrl: string; copyText?: string;
}) {
  return (
    <div style={{ border: `1px solid ${gold}`, background: "rgba(255,252,245,0.9)", borderRadius: 14, padding: 20 }}>
      <Icon size={36} color={gold} strokeWidth={1.4} />
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 9, letterSpacing: 3, color: gold, textTransform: "uppercase", marginTop: 6 }}>{eyebrow}</p>
      <h2 style={{ margin: 0, fontWeight: 400, fontFamily: "'Cormorant Garamond', serif", fontSize: 16, letterSpacing: 1, color: ink, marginTop: 4 }}>{name}</h2>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#7A6848", marginTop: 4 }}>{address}</p>
      {time && <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 10, letterSpacing: 2, color: gold, marginTop: 6 }}>{time}</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
        <a href={mapsUrl} target="_blank" rel="noreferrer" style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
          padding: "10px 16px", borderRadius: 999, background: "#1B3526", color: gold,
          textDecoration: "none", fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
          letterSpacing: 3, textTransform: "uppercase",
        }}><MapPin size={14} /> Abrir no Google Maps</a>
        <a href={wazeUrl} target="_blank" rel="noreferrer" style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
          padding: "10px 16px", borderRadius: 999, border: `1px solid ${gold}`, color: gold,
          textDecoration: "none", fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
          letterSpacing: 3, textTransform: "uppercase",
        }}><Navigation size={14} /> Abrir no Waze</a>
        {copyText && (
          <button
            onClick={() => { navigator.clipboard.writeText(copyText); toast.success("Endereço copiado!"); }}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "10px 16px", borderRadius: 999, border: `1px solid ${gold}`, color: gold,
              background: "transparent", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif",
              fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
            }}><ClipboardCopy size={14} /> Copiar Endereço</button>
        )}
      </div>
    </div>
  );
}

export function LocalizacaoSection() {
  return (
    <Section>
      <p style={{ textAlign: "center", fontFamily: "'Great Vibes', cursive", fontSize: 36, color: ink, marginBottom: 20 }}>
        Como Chegar até Nós
      </p>
      <LocationCard
        Icon={Church}
        eyebrow="Cerimónia Religiosa"
        name="Igreja Nossa Senhora de Fátima"
        address="Bairro Ferroviário, Maputo"
        time="11H00"
        mapsUrl="https://maps.google.com/?q=Igreja+Nossa+Senhora+Fatima+Bairro+Ferroviario+Maputo"
        wazeUrl="https://waze.com/ul?q=Igreja+Nossa+Senhora+Fatima+Maputo"
      />
      <GoldOrnament />
      <LocationCard
        Icon={Landmark}
        eyebrow="Recepção"
        name="Cajada Eventos e Serviços 2"
        address="Av. Dom Alexandre, Maputo - Cidade"
        mapsUrl="https://maps.google.com/?q=Cajada+Eventos+Servicos+Maputo"
        wazeUrl="https://waze.com/ul?q=Cajada+Eventos+Servicos+Maputo"
        copyText="Cajada Eventos e Serviços 2, Av. Dom Alexandre, Maputo"
      />
    </Section>
  );
}

/* ── SECTION 5 — RSVP ──────────────────────────────────────── */

type Attend = "yes" | "no" | "maybe";

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid rgba(201,168,76,0.5)",
  borderRadius: 8,
  background: "rgba(255,252,245,0.85)",
  padding: "14px 16px",
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: 16,
  color: ink,
  outline: "none",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "block" }}>
      <span style={{
        display: "block", fontFamily: "'Cormorant Garamond', serif", fontSize: 10,
        letterSpacing: 3, color: gold, textTransform: "uppercase", marginBottom: 6,
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
        padding: "12px 6px", borderRadius: 999,
        background: active ? "#1B3526" : "transparent",
        color: gold,
        border: `1px solid ${active ? gold : "rgba(201,168,76,0.5)"}`,
        fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
        letterSpacing: 2, textTransform: "uppercase", cursor: "pointer",
      }}
    >{children}</button>
  );
}

function Counter({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  const btn: React.CSSProperties = {
    width: 44, height: 44, borderRadius: 999,
    border: "1px solid rgba(201,168,76,0.5)",
    background: "transparent", color: gold, cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
  };
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
      <button type="button" aria-label={`Diminuir ${label}`} style={btn} onClick={() => onChange(Math.max(0, value - 1))}><Minus size={16} /></button>
      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: ink, minWidth: 24, textAlign: "center" }}>{value}</span>
      <button type="button" aria-label={`Aumentar ${label}`} style={btn} onClick={() => onChange(Math.min(10, value + 1))}><Plus size={16} /></button>
    </div>
  );
}

export function RsvpSection() {
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

  return (
    <Section background="radial-gradient(ellipse 80% 40% at 50% 0%, rgba(201,168,76,0.14) 0%, transparent 60%), linear-gradient(180deg,#FDFAF2 0%,#F7F0DE 100%)">
      <div style={{
        border: `1px solid ${gold}`, background: "rgba(255,252,245,0.85)",
        borderRadius: 14, padding: 22, textAlign: "center",
      }}>
        <Heart size={36} color={gold} fill={gold} />
        <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 32, color: ink, lineHeight: 1.15, marginTop: 8 }}>
          A vossa presença é o nosso maior presente
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: gold, marginTop: 8, fontSize: 13 }}>
          Por favor confirme até 30 de Outubro de 2026
        </p>
      </div>

      {done ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ marginTop: 30, textAlign: "center", padding: 20 }}>
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 1.4, repeat: Infinity }} style={{ display: "inline-block" }}>
            <Heart size={64} color={gold} fill={gold} />
          </motion.div>
          <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 44, color: gold, marginTop: 8 }}>Obrigado, {doneName}!</p>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 16, color: ink,
            marginTop: 10, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            {done === "yes" && (<>A sua presença está confirmada. Até breve! <Wine size={16} color={gold} /></>)}
            {done === "no" && (<>Sentiremos a sua falta. Obrigado por avisar! <Heart size={14} color={gold} fill={gold} /></>)}
            {done === "maybe" && (<>Aguardamos a sua resposta final. <Heart size={14} color={gold} fill={gold} /></>)}
          </p>
          <button
            onClick={() => navigator.share?.({ title: "Nelson & Cidália", url: window.location.origin }).catch(() => {})}
            style={{
              marginTop: 24, padding: "10px 20px", borderRadius: 999, border: `1px solid ${gold}`,
              background: "transparent", color: gold, fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: 3, fontSize: 11, textTransform: "uppercase", cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 8,
            }}
          ><Share2 size={14} /> Partilhar</button>
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
              {(["yes", "no", "maybe"] as Attend[]).map((v) => {
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
                  <Counter value={partners} onChange={setPartners} label="acompanhantes" />
                </Field>
              )}
              <Field label="Crianças">
                <Counter value={children} onChange={setChildren} label="crianças" />
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
            <div style={{ textAlign: "right", fontFamily: "'Cormorant Garamond', serif", fontSize: 10, color: gold, marginTop: 4 }}>
              {message.length}/300
            </div>
          </Field>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", background: "#1B3526", color: gold, border: `1px solid ${gold}`,
              borderRadius: 999, padding: "16px 20px", fontFamily: "'Cormorant Garamond', serif",
              fontSize: 12, letterSpacing: 5, textTransform: "uppercase", cursor: "pointer", marginTop: 6,
            }}
          >{loading ? "A confirmar..." : "✦ Confirmar Presença ✦"}</button>
        </form>
      )}
    </Section>
  );
}

/* ── SECTION 6 — PRESENTES ─────────────────────────────────── */

export function PresentesSection() {
  const qc = useQueryClient();
  const wQ = useQuery({ queryKey: ["wedding"], queryFn: fetchWedding });
  const w = wQ.data;
  const gQ = useQuery({ queryKey: ["gifts", w?.id], queryFn: () => fetchGifts(w!.id), enabled: !!w });
  const [reserving, setReserving] = useState<null | { id: string; name: string }>(null);
  const [resName, setResName] = useState("");
  const [resPhone, setResPhone] = useState("");
  const [saving, setSaving] = useState(false);

  const confirmReserve = async () => {
    if (!reserving) return;
    if (!resName.trim() || !resPhone.trim()) { toast.error("Preencha o seu nome e telefone."); return; }
    setSaving(true);
    try {
      await reserveGift(reserving.id, resName.trim(), resPhone.trim());
      toast.success("Presente reservado com sucesso!");
      setReserving(null); setResName(""); setResPhone("");
      qc.invalidateQueries({ queryKey: ["gifts", w?.id] });
    } catch {
      toast.error("Erro ao reservar. Tente novamente.");
    } finally { setSaving(false); }
  };

  const gifts = gQ.data ?? [];

  return (
    <Section>
      <div style={{ textAlign: "center" }}>
        <Gift size={36} color={gold} strokeWidth={1.4} style={{ margin: "0 auto" }} />
        <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 34, color: ink, lineHeight: 1.15, marginTop: 4 }}>
          O Vosso Carinho é o Nosso Maior Presente
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 18 }}>
        {gifts.map((g) => (
          <div key={g.id} style={{
            background: "rgba(255,252,245,0.9)", border: `1px solid rgba(201,168,76,0.4)`,
            borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column", position: "relative",
          }}>
            <div style={{
              aspectRatio: "1 / 1",
              background: g.image_url ? `url(${g.image_url}) center/cover` : "linear-gradient(135deg,rgba(201,168,76,0.15),rgba(201,168,76,0.05))",
              display: "flex", alignItems: "center", justifyContent: "center", color: gold,
            }}>{g.image_url ? null : <Gift size={40} strokeWidth={1.4} />}</div>
            <span style={{
              position: "absolute", top: 8, right: 8, fontFamily: "'Cormorant Garamond', serif",
              fontSize: 9, letterSpacing: 1, textTransform: "uppercase", padding: "3px 10px", borderRadius: 999,
              background: g.status === "available" ? gold : g.status === "reserved" ? "#F0B84C" : "#4A7A50",
              color: g.status === "available" ? ink : "#fff",
              display: "inline-flex", alignItems: "center", gap: 4,
            }}>
              {g.status === "available" && "Disponível"}
              {g.status === "reserved" && (<>Reservado <Lock size={9} /></>)}
              {g.status === "purchased" && (<>Comprado <Check size={10} /></>)}
            </span>
            <div style={{ padding: 10, flex: 1, display: "flex", flexDirection: "column" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: 1, color: ink, textTransform: "uppercase" }}>{g.name}</p>
              {g.price_label && (
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: gold, marginTop: 6 }}>{g.price_label}</p>
              )}
              <div style={{ marginTop: "auto", paddingTop: 10 }}>
                {g.status === "available" && (
                  <button
                    onClick={() => setReserving({ id: g.id, name: g.name })}
                    style={{
                      width: "100%", padding: "8px", borderRadius: 999, background: "#1B3526",
                      color: gold, border: `1px solid ${gold}`, fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 11, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer",
                    }}>Reservar</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

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
                background: CREAM_BG, borderRadius: "24px 24px 0 0",
                borderTop: `2px solid ${gold}`, padding: "18px 20px 30px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: 3, color: ink, textTransform: "uppercase" }}>
                  Reservar {reserving.name}
                </p>
                <button onClick={() => setReserving(null)} aria-label="Fechar" style={{ background: "transparent", border: "none", color: gold, cursor: "pointer" }}>
                  <XIcon size={20} />
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
                <input placeholder="O seu nome *" value={resName} onChange={(e) => setResName(e.target.value)} style={inputStyle} />
                <input placeholder="O seu telefone *" value={resPhone} onChange={(e) => setResPhone(e.target.value)} style={inputStyle} />
                <button
                  onClick={confirmReserve}
                  disabled={saving}
                  style={{
                    padding: "14px", borderRadius: 999, background: "#1B3526", color: gold,
                    border: `1px solid ${gold}`, fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 12, letterSpacing: 4, textTransform: "uppercase", cursor: "pointer",
                  }}
                >{saving ? "A reservar..." : "Confirmar Reserva"}</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Section>
  );
}

/* ── SECTION 7 — GALERIA ───────────────────────────────────── */

export function GaleriaSection() {
  const [tab, setTab] = useState<"photos" | "videos">("photos");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const wQ = useQuery({ queryKey: ["wedding"], queryFn: fetchWedding });
  const w = wQ.data;
  const gQ = useQuery({ queryKey: ["gallery", w?.id], queryFn: () => fetchGallery(w!.id), enabled: !!w });
  const [urls, setUrls] = useState<Array<{ id: string; url: string; caption: string | null }>>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!gQ.data) return;
      const items = await Promise.all(gQ.data.map(async (g) => ({
        id: g.id,
        caption: g.caption,
        url: (await signUrl("wedding-gallery", g.image_path)) ?? "",
      })));
      if (!cancelled) setUrls(items.filter((i) => i.url));
    })();
    return () => { cancelled = true; };
  }, [gQ.data]);

  return (
    <Section dark>
      <p style={{ textAlign: "center", fontFamily: "'Great Vibes', cursive", fontSize: 38, color: gold }}>Os Nossos Momentos</p>

      <div style={{ display: "flex", justifyContent: "center", gap: 30, marginTop: 16 }}>
        {(["photos", "videos"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              background: "transparent", border: "none", cursor: "pointer",
              fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: 3, textTransform: "uppercase",
              color: tab === t ? gold : "rgba(201,168,76,0.4)",
              borderBottom: tab === t ? `2px solid ${gold}` : "2px solid transparent",
              padding: "6px 10px",
            }}
          >{t === "photos" ? "Fotos" : "Vídeos"}</button>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        {tab === "photos" ? (
          urls.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <Camera size={44} color={gold} style={{ opacity: 0.7 }} />
              <p style={{ marginTop: 12, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "rgba(201,168,76,0.7)" }}>
                As fotos serão adicionadas em breve
              </p>
            </div>
          ) : (
            <div style={{ columnCount: 2, columnGap: 8 }}>
              {urls.map((g, i) => (
                <motion.figure
                  key={g.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => setLightbox(i)}
                  style={{
                    breakInside: "avoid", marginBottom: 8, borderRadius: 14, overflow: "hidden",
                    border: "1px solid rgba(201,168,76,0.3)", cursor: "zoom-in",
                  }}
                >
                  <img src={g.url} alt={g.caption ?? `Fotografia ${i + 1} de Nelson & Cidália`} style={{ width: "100%", display: "block" }} loading="lazy" />
                </motion.figure>
              ))}
            </div>
          )
        ) : (
          <p style={{ textAlign: "center", padding: "40px 20px", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "rgba(201,168,76,0.7)" }}>
            Os vídeos serão adicionados em breve
          </p>
        )}
      </div>

      <AnimatePresence>
        {lightbox !== null && urls[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "#000", zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <button aria-label="Fechar fotografia" onClick={() => setLightbox(null)}
              style={{ position: "absolute", top: 18, right: 18, color: "#fff", background: "transparent", border: "none", cursor: "pointer" }}>
              <XIcon size={28} />
            </button>
            <button aria-label="Fotografia anterior" onClick={() => setLightbox((n) => n === null ? n : (n - 1 + urls.length) % urls.length)}
              style={{ position: "absolute", left: 8, color: "#fff", background: "transparent", border: "none", cursor: "pointer" }}>
              <ChevronLeft size={36} />
            </button>
            <img src={urls[lightbox].url} alt={urls[lightbox].caption ?? "Fotografia de Nelson & Cidália"} style={{ maxWidth: "92vw", maxHeight: "80vh", objectFit: "contain" }} />
            <button aria-label="Fotografia seguinte" onClick={() => setLightbox((n) => n === null ? n : (n + 1) % urls.length)}
              style={{ position: "absolute", right: 8, color: "#fff", background: "transparent", border: "none", cursor: "pointer" }}>
              <ChevronRight size={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

/* ── SECTION 8 — MENSAGEM ──────────────────────────────────── */

export function MensagemSection() {
  const qc = useQueryClient();
  const wQ = useQuery({ queryKey: ["wedding"], queryFn: fetchWedding });
  const w = wQ.data;
  const mQ = useQuery({ queryKey: ["messages", w?.id], queryFn: () => fetchMessages(w!.id, 6), enabled: !!w });
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!w || !text.trim()) { toast.error("Escreva uma mensagem."); return; }
    setSaving(true);
    try {
      await submitMessage({ wedding_id: w.id, guest_name: name.trim() || undefined, message: text.trim() });
      setSent(true); setText(""); setName("");
      qc.invalidateQueries({ queryKey: ["messages", w.id] });
      setTimeout(() => setSent(false), 4000);
    } catch { toast.error("Erro ao enviar."); }
    finally { setSaving(false); }
  };

  return (
    <Section>
      <div style={{ textAlign: "center" }}>
        <Mail size={44} color={gold} strokeWidth={1.4} style={{ margin: "0 auto" }} />
        <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 36, color: ink }}>Deixe as suas palavras</p>
      </div>

      <form onSubmit={submit} style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
        <input placeholder="O seu nome" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
        <textarea
          placeholder="A sua mensagem *"
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 300))}
          rows={5}
          required
          style={{ ...inputStyle, resize: "vertical" }}
        />
        <div style={{ textAlign: "right", fontFamily: "'Cormorant Garamond', serif", fontSize: 9, color: gold, letterSpacing: 1 }}>{text.length}/300</div>
        <button type="submit" disabled={saving} style={{
          padding: "14px", borderRadius: 999, background: "#1B3526", color: gold, border: `1px solid ${gold}`,
          fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", cursor: "pointer",
        }}>{saving ? "A enviar..." : "Enviar Mensagem"}</button>
      </form>

      {sent && (
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginTop: 14, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: gold }}>
          Mensagem enviada com carinho.
        </motion.p>
      )}

      <div style={{ marginTop: 26 }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 10, letterSpacing: 3, color: gold, textTransform: "uppercase", textAlign: "center" }}>
          Mural de Mensagens
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
          {(mQ.data ?? []).map((m) => (
            <div key={m.id} style={{
              background: "rgba(255,252,245,0.9)", borderLeft: `3px solid ${gold}`,
              borderRadius: "0 10px 10px 0", padding: 12,
            }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 10, letterSpacing: 1, color: gold }}>{m.guest_name ?? "Anónimo"}</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 15, color: ink, marginTop: 3 }}>"{m.message}"</p>
            </div>
          ))}
          {(!mQ.data || mQ.data.length === 0) && (
            <p style={{ textAlign: "center", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "#7A6848" }}>
              Seja o primeiro a deixar uma mensagem.
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}

/* ── SECTION 9 — CONTACTOS ─────────────────────────────────── */

function ContactCard({ initial, role, name, phone, wa }: { initial: string; role: string; name: string; phone: string; wa?: string }) {
  return (
    <div style={{
      border: `1px solid ${gold}`, background: "rgba(255,252,245,0.9)",
      borderRadius: 14, padding: 18, display: "flex", alignItems: "center", gap: 14,
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: "50%", border: `1.5px solid ${gold}`,
        display: "flex", alignItems: "center", justifyContent: "center", color: gold,
        fontFamily: "'Cormorant Garamond', serif", fontSize: 20, flexShrink: 0,
      }}>{initial}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 9, letterSpacing: 4, color: gold, textTransform: "uppercase" }}>{role}</p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: ink, marginTop: 2 }}>{name}</p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#7A6848", marginTop: 2 }}>{phone}</p>
      </div>
      {wa ? (
        <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" style={{
          background: "#25D366", color: "#fff", padding: "8px 14px", borderRadius: 999,
          textDecoration: "none", fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
          letterSpacing: 2, textTransform: "uppercase",
        }}>WhatsApp</a>
      ) : (
        <span style={{
          background: "#25D366", color: "#fff", padding: "8px 14px", borderRadius: 999,
          fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: 2,
          textTransform: "uppercase", opacity: 0.4,
        }}>WhatsApp</span>
      )}
    </div>
  );
}

export function ContactosSection() {
  const hashtag = "#NelsonECidália2026";
  return (
    <Section>
      <p style={{ textAlign: "center", fontFamily: "'Great Vibes', cursive", fontSize: 36, color: ink }}>Estamos à Disposição</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
        <ContactCard initial="N" role="Noivo" name="Nelson Issufo Mussa" phone="+258 84 015 3624" wa="258840153624" />
        <ContactCard initial="C" role="Noiva" name="Cidália João Gulube" phone="+258 84 209 8679" wa="258842098679" />
        <ContactCard initial="?" role="Cerimonial" name="A confirmar" phone="—" />
      </div>

      <GoldOrnament />

      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => { navigator.clipboard.writeText(hashtag); toast.success("Hashtag copiada!"); }}
          style={{ background: "transparent", border: "none", cursor: "pointer", fontFamily: "'Great Vibes', cursive", fontSize: 32, color: gold }}
        >{hashtag}</button>
        <div style={{ display: "flex", justifyContent: "center", gap: 18, marginTop: 16 }}>
          {[
            { Icon: Instagram, label: "Instagram" },
            { Icon: Facebook, label: "Facebook" },
            { Icon: Music2, label: "TikTok" },
          ].map(({ Icon, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%", border: `1px solid ${gold}`,
                display: "flex", alignItems: "center", justifyContent: "center", color: gold,
              }}><Icon size={22} /></div>
              <p style={{ marginTop: 6, fontFamily: "'Cormorant Garamond', serif", fontSize: 8, letterSpacing: 2, color: gold, textTransform: "uppercase" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── SECTION 10 — FOOTER ───────────────────────────────────── */

export function FooterSection() {
  return (
    <Section dark>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, letterSpacing: 10, color: gold }}>N | C</p>
        <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 48, color: gold, lineHeight: 1.1, marginTop: 6 }}>Nelson &amp; Cidália</p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 16, color: gold, marginTop: 4 }}>27 · 11 · 2026</p>
        <GoldOrnament dark />
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 18, color: "rgba(201,168,76,0.8)" }}>
          Obrigado por fazer parte da nossa história.
        </p>
        <p style={{
          marginTop: 22, fontFamily: "'Cormorant Garamond', serif", fontSize: 7,
          letterSpacing: 3, color: "rgba(201,168,76,0.35)", textTransform: "uppercase",
          display: "inline-flex", alignItems: "center", gap: 5, justifyContent: "center",
        }}>
          Feito com <Heart size={8} color="rgba(201,168,76,0.35)" fill="rgba(201,168,76,0.35)" /> por Shelton Barreto 🇲🇿
        </p>
      </div>
    </Section>
  );
}
