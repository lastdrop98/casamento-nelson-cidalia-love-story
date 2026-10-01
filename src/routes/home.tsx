import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CalendarDays, Check, Heart, MapPin, Navigation, X as XIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchWedding, submitXiguiane } from "@/lib/wedding";
import { music } from "@/lib/music";
import { InviteBadge } from "@/components/wedding/InviteBadge";
import coupleHero from "@/assets/couple-hero.jpg.asset.json";
import noivos2 from "@/assets/noivos-2.jpg.asset.json";

const gold = "#C9A84C";
const ink = "#1E1A10";
const muted = "#7A6848";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Nelson & Cidália — Xiguiane | 28 de Novembro de 2026" },
      { name: "description", content: "Convite de Nelson & Cidália para o Copo de Água em Xiguiane, a 28 de Novembro de 2026, às 13H00." },
      { property: "og:title", content: "Nelson & Cidália — Xiguiane" },
      { property: "og:description", content: "28 de Novembro de 2026 · 13H00 · Xiguiane" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: coupleHero.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: coupleHero.url },
    ],
  }),
  component: XiguianeInvite,
});

function XiguianeInvite() {
  const tipo = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "").get("tipo");
  const isCouple = tipo === "casal";
  const guestCount = isCouple ? 2 : 1;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const wQ = useQuery({ queryKey: ["wedding"], queryFn: fetchWedding });

  useEffect(() => {
    const start = () => { void music.play(); };
    const timer = window.setTimeout(start, 500);
    window.addEventListener("pointerdown", start, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointerdown", start);
    };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wQ.data || !name.trim() || !phone.trim() || attending === null) return;
    setLoading(true);
    try {
      await submitXiguiane({
        wedding_id: wQ.data.id,
        nome: name.trim(),
        telefone: phone.trim(),
        tipo_convite: isCouple ? "casal" : "individual",
        acompanhantes: guestCount - 1,
        presenca: attending,
        mensagem: message.trim() || null,
      });
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg,#FDFAF2 0%,#F5EDD8 100%)", color: ink }}>
      <main style={{ width: "100%", maxWidth: 430, margin: "0 auto", overflow: "hidden", paddingBottom: 100 }}>
        <section style={{ position: "relative", height: "100svh", minHeight: 650, overflow: "hidden" }}>
          <img src={coupleHero.url} alt="Nelson & Cidália" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(14,32,20,.78) 0%,rgba(14,32,20,.18) 42%,rgba(14,32,20,.88) 100%)" }} />
          <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "42px 28px 54px", textAlign: "center" }}>
            <div style={{ width: 62, height: 62, borderRadius: "50%", border: "1px solid " + gold, display: "flex", alignItems: "center", justifyContent: "center", color: gold, fontFamily: "'Cormorant Garamond', serif", fontSize: 19 }}>N · C</div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }} style={{ marginTop: "12vh" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 10, letterSpacing: 4, color: "#F5EDD8", textTransform: "uppercase" }}>Xiguiane · Convite de Família</p>
              <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 70, lineHeight: .95, color: "#F5EDD8", marginTop: 18 }}>Nelson</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: gold, margin: "3px 0" }}>&amp;</p>
              <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 70, lineHeight: .95, color: "#F5EDD8" }}>Cidália</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: 4, color: "#E7D9A8", marginTop: 22, textTransform: "uppercase" }}>28 · 11 · 2026</p>
              <div style={{ marginTop: 15, display: "flex", justifyContent: "center" }}><InviteBadge /></div>
            </motion.div>
            <div style={{ color: "#F5EDD8", fontFamily: "'Cormorant Garamond', serif", fontSize: 10, letterSpacing: 3, textTransform: "uppercase" }}>
              Deslize para ver o convite
              <div style={{ marginTop: 12, color: gold }}>⌄</div>
            </div>
          </div>
        </section>

        <section style={{ padding: "50px 24px 34px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 40, color: gold }}>Com a bênção de Deus</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 16, color: muted, lineHeight: 1.8, marginTop: 15 }}>
            Temos a alegria de convidá-lo(a) para celebrar connosco este momento especial.
          </p>
          <div style={{ margin: "28px auto 0", width: "100%", maxWidth: 290, aspectRatio: "3 / 4", borderRadius: "150px 150px 18px 18px", overflow: "hidden", border: "1px solid " + gold }}>
            <img src={noivos2.url} alt="Nelson e Cidália" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%" }} loading="lazy" />
          </div>
        </section>

        <section style={{ padding: "18px 24px 42px", textAlign: "center" }}>
          <div style={{ border: "1px solid rgba(201,168,76,.5)", borderRadius: 22, background: "rgba(255,252,245,.82)", padding: "30px 20px" }}>
            <CalendarDays size={30} color={gold} style={{ margin: "0 auto" }} />
            <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 38, color: gold, marginTop: 8 }}>Xiguiane</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: ink, marginTop: 12 }}>28 de Novembro de 2026</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 15, color: muted, marginTop: 5 }}>13H00 · Copo de Água</p>
            <div style={{ margin: "26px auto 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <span style={{ width: 42, height: 1, background: gold }} /><Navigation size={19} color={gold} strokeWidth={1.3} /><span style={{ width: 42, height: 1, background: gold }} />
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, marginTop: 18 }}>Salão próximo a FIPAG do bairro ferroviário</p>
            <a href="https://maps.google.com/?q=-25.911264,32.605160" target="_blank" rel="noreferrer"
              style={{ marginTop: 18, display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 20px", borderRadius: 999, background: "#1B3526", color: gold, border: "1px solid " + gold, textDecoration: "none", fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase" }}>
              <MapPin size={14} /> Ver localização
            </a>
          </div>
        </section>

        <section style={{ padding: "0 24px 42px", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 22 }}>
            <span style={{ width: 48, height: 1, background: gold }} /><Heart size={15} color={gold} fill={gold} /><span style={{ width: 48, height: 1, background: gold }} />
          </div>
          <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 37, color: ink }}>Confirme a sua presença</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 14, color: muted, marginTop: 8 }}>
            {isCouple ? "Convite válido para 2 pessoas" : "Convite válido para 1 pessoa"}
          </p>
          {sent ? (
            <div style={{ marginTop: 24, padding: 25, border: "1px solid " + gold, borderRadius: 18, background: "rgba(255,252,245,.82)" }}>
              <Heart size={42} color={gold} fill={gold} style={{ margin: "0 auto" }} />
              <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 38, color: gold, marginTop: 10 }}>Obrigado!</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: muted, marginTop: 6 }}>A sua confirmação foi recebida.</p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 11, textAlign: "left" }}>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome completo" required style={inputStyle} />
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Telefone" required style={inputStyle} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <button type="button" onClick={() => setAttending(true)} style={{ ...choiceStyle, background: attending === true ? "#1B3526" : "transparent", color: attending === true ? gold : ink }}><Check size={15} /> Sim</button>
                <button type="button" onClick={() => setAttending(false)} style={{ ...choiceStyle, background: attending === false ? "#1B3526" : "transparent", color: attending === false ? gold : ink }}><XIcon size={15} /> Não</button>
              </div>
              <textarea value={message} onChange={(e) => setMessage(e.target.value.slice(0, 200))} placeholder="Mensagem (opcional)" rows={3} style={{ ...inputStyle, resize: "vertical" }} />
              <button type="submit" disabled={loading || attending === null}
                style={{ width: "100%", border: "1px solid " + gold, borderRadius: 999, padding: "14px 18px", background: "#1B3526", color: gold, fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", opacity: loading || attending === null ? .55 : 1 }}>
                {loading ? "A confirmar..." : "Confirmar presença"}
              </button>
            </form>
          )}
        </section>

        <section style={{ margin: "0 24px", minHeight: 380, borderRadius: 24, overflow: "hidden", border: "1px solid rgba(201,168,76,.35)", backgroundImage: "linear-gradient(180deg,rgba(14,32,20,.12) 0%,rgba(14,32,20,.78) 60%,rgba(14,32,20,.97) 100%),url(" + coupleHero.url + ")", backgroundSize: "cover", backgroundPosition: "center", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "38px 24px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 21, color: "#FDFAF2", lineHeight: 1.6 }}>Esperamos celebrar este dia consigo.</p>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, marginTop: 15 }}><span style={{ width: 38, height: 1, background: gold }} /><Heart size={13} color={gold} fill={gold} /><span style={{ width: 38, height: 1, background: gold }} /></div>
          <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 32, color: gold, marginTop: 9 }}>Nelson &amp; Cidália</p>
        </section>
        <footer style={{ textAlign: "center", padding: "34px 24px 0", color: muted }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 13 }}>28 · 11 · 2026 · Xiguiane</p>
        </footer>
      </main>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid rgba(201,168,76,.45)",
  borderRadius: 12,
  background: "rgba(255,252,245,.9)",
  color: ink,
  padding: "12px 13px",
  outline: "none",
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: 15,
  boxSizing: "border-box",
};

const choiceStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  border: "1px solid " + gold,
  borderRadius: 999,
  padding: "11px",
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: 14,
  cursor: "pointer",
};