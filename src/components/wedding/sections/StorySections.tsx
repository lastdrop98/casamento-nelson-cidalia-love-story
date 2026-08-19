import { motion } from "framer-motion";
import { Heart, Calendar, Church, MapPin, Gift, Users } from "lucide-react";
import { BotanicalCorner } from "@/components/wedding/BotanicalCorner";
import coupleHero from "@/assets/couple-hero.jpg.asset.json";
import {
  slideFromLeft, slideFromRight, fadeUp, zoomFade, blurFade, blurFadeDown,
  staggerContainer, inView, inViewNear, willChange,
} from "@/lib/motion-variants";

const gold = "#C9A84C";
const ink = "#1E1A10";
const muted = "#7A6848";

const script: React.CSSProperties = { fontFamily: "'Great Vibes', cursive", color: gold, lineHeight: 1.2 };
const serif: React.CSSProperties = { fontFamily: "'Cormorant Garamond', serif" };

function Block({ children, background }: { children: React.ReactNode; background?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ position: "relative", overflow: "hidden", background: background ?? "transparent", padding: "44px 22px", ...willChange }}
    >
      <BotanicalCorner position="top-left" size={64} opacity={0.45} inset={8} />
      <BotanicalCorner position="bottom-right" size={64} opacity={0.45} inset={8} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </motion.section>
  );
}

function ArchPhoto({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={inViewNear}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        ...willChange,
        margin: "0 auto",
        width: "100%",
        maxWidth: 300,
        aspectRatio: "3 / 4",
        borderRadius: "150px 150px 16px 16px",
        overflow: "hidden",
        border: `1px solid ${gold}`,
        backgroundImage: `url(${coupleHero.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center 25%",
      }}
    />
  );
}

/* ── LEI DIVINA ─────────────────────────────────────────────── */
export function LeiDivinaSection() {
  return (
    <Block>
      <div style={{ textAlign: "center" }}>
        <motion.svg
          variants={zoomFade} initial="hidden" whileInView="visible" viewport={inView}
          width={92} height={56} viewBox="0 0 92 56" style={{ margin: "0 auto", ...willChange }}
        >
          <circle cx="36" cy="28" r="18" fill="none" stroke={gold} strokeWidth="2.5" />
          <circle cx="56" cy="28" r="18" fill="none" stroke={gold} strokeWidth="2.5" />
        </motion.svg>
        <motion.p variants={blurFadeDown} initial="hidden" whileInView="visible" viewport={inView}
          style={{ ...script, fontSize: 38, marginTop: 14, ...willChange }}>Lei Divina...</motion.p>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewNear}
          style={{ ...serif, fontStyle: "italic", fontSize: 15, color: muted, lineHeight: 1.9, marginTop: 16, ...willChange }}>
          "Filho meu, não te esqueças da minha lei,<br />e o teu coração guarde os meus mandamentos."
        </motion.p>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewNear}
          style={{ ...serif, fontSize: 10, letterSpacing: 3, color: gold, textTransform: "uppercase", marginTop: 14 }}>
          Provérbios 3:1
        </motion.p>
      </div>
    </Block>
  );
}

/* ── OS NOIVOS ──────────────────────────────────────────────── */
export function OsNoivosSection() {
  return (
    <Block>
      <div style={{ textAlign: "center" }}>
        <motion.p variants={blurFadeDown} initial="hidden" whileInView="visible" viewport={inView}
          style={{ ...script, fontSize: 40, ...willChange }}>Os Noivos</motion.p>

        <div style={{ marginTop: 22 }}><ArchPhoto /></div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={inViewNear} style={{ marginTop: 26 }}>
          <motion.p variants={slideFromLeft} style={{ ...script, fontSize: 34, ...willChange }}>Cidália</motion.p>
          <motion.p variants={fadeUp} style={{ ...serif, fontSize: 12, letterSpacing: 2, color: muted, marginTop: 6 }}>Filha de</motion.p>
          <motion.p variants={fadeUp} style={{ ...serif, fontStyle: "italic", fontSize: 14, color: ink, marginTop: 2 }}>Ana Vilanculos</motion.p>
          <motion.p variants={fadeUp} style={{ ...serif, fontSize: 12, color: muted }}>e</motion.p>
          <motion.p variants={fadeUp} style={{ ...serif, fontStyle: "italic", fontSize: 14, color: ink }}>João Gulube</motion.p>

          <motion.div variants={zoomFade} style={{ margin: "20px 0" }}>
            <Heart size={22} color={gold} style={{ margin: "0 auto" }} />
          </motion.div>

          <motion.p variants={slideFromRight} style={{ ...script, fontSize: 34, ...willChange }}>Nelson</motion.p>
          <motion.p variants={fadeUp} style={{ ...serif, fontSize: 12, letterSpacing: 2, color: muted, marginTop: 6 }}>Filho de</motion.p>
          <motion.p variants={fadeUp} style={{ ...serif, fontStyle: "italic", fontSize: 14, color: ink, marginTop: 2 }}>Otília Massigue</motion.p>
          <motion.p variants={fadeUp} style={{ ...serif, fontSize: 12, color: muted }}>e</motion.p>
          <motion.p variants={fadeUp} style={{ ...serif, fontStyle: "italic", fontSize: 14, color: ink }}>Issufo Hassane Mussá</motion.p>
        </motion.div>
      </div>
    </Block>
  );
}

/* ── COM A BÊNÇÃO DE DEUS ───────────────────────────────────── */
export function BencaoSection() {
  const cards = [
    { Icon: Calendar, title: "27 de Novembro de 2026", sub: "Sexta-feira · Maputo" },
    { Icon: Church, title: "Cerimónia Religiosa · 11H00", sub: "Igreja Nossa Senhora de Fátima" },
    { Icon: MapPin, title: "Recepção · 13H00", sub: "Cajada Eventos e Serviços 2" },
  ];
  return (
    <Block>
      <div style={{ textAlign: "center" }}>
        <motion.p variants={blurFadeDown} initial="hidden" whileInView="visible" viewport={inView}
          style={{ ...script, fontSize: 36, ...willChange }}>Com a bênção de Deus</motion.p>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewNear}
          style={{ ...serif, fontSize: 14, color: muted, lineHeight: 1.9, marginTop: 16, ...willChange }}>
          Temos a honra de convidá-lo(a) a comemorar esta data especial connosco.
          Venha juntar-se a nós e ajudar-nos a celebrar o nosso enlace matrimonial
          de acordo com a agenda abaixo.
        </motion.p>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={inViewNear}
          style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
          {cards.map((c, i) => (
            <motion.div key={c.title} variants={i % 2 === 0 ? slideFromLeft : slideFromRight}
              whileHover={{ y: -4 }}
              style={{
                ...willChange,
                border: `1px solid rgba(201,168,76,0.5)`,
                background: "rgba(255,252,245,0.85)",
                borderRadius: 14, padding: "18px 16px",
              }}>
              <c.Icon size={22} color={gold} strokeWidth={1.4} style={{ margin: "0 auto" }} />
              <p style={{ ...serif, fontSize: 14, letterSpacing: 1, color: ink, marginTop: 8 }}>{c.title}</p>
              <p style={{ ...serif, fontStyle: "italic", fontSize: 13, color: muted, marginTop: 2 }}>{c.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Block>
  );
}

/* ── AMIGOS E FAMÍLIA ───────────────────────────────────────── */
export function AmigosFamiliaSection() {
  return (
    <Block>
      <motion.div variants={zoomFade} initial="hidden" whileInView="visible" viewport={inView}
        style={{
          ...willChange,
          background: "linear-gradient(180deg,#C9A84C 0%,#B99B41 100%)",
          borderRadius: 20, padding: "34px 22px", textAlign: "center",
        }}>
        <Users size={26} color="#FDFAF2" strokeWidth={1.4} style={{ margin: "0 auto" }} />
        <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 38, color: "#FDFAF2", marginTop: 6 }}>Amigos e Família</p>
        <p style={{ ...serif, fontSize: 14, color: "#FFFDF6", lineHeight: 1.9, marginTop: 12 }}>
          Se recebeu este convite significa que é nosso convidado de honra e a sua
          presença é importante para nós. Por favor confirme a sua presença para
          melhor nos organizarmos.
        </p>
      </motion.div>
      <div style={{ marginTop: 24 }}><ArchPhoto delay={0.1} /></div>
    </Block>
  );
}

/* ── PRESENTE DE CASAMENTO (intro) ──────────────────────────── */
export function PresenteIntroSection() {
  return (
    <Block>
      <div style={{ textAlign: "center" }}>
        <motion.div variants={zoomFade} initial="hidden" whileInView="visible" viewport={inView} style={willChange}>
          <Gift size={30} color={gold} strokeWidth={1.4} style={{ margin: "0 auto" }} />
        </motion.div>
        <motion.p variants={blurFade} initial="hidden" whileInView="visible" viewport={inView}
          style={{ ...script, fontSize: 36, marginTop: 8, ...willChange }}>Presente de Casamento</motion.p>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewNear}
          style={{ ...serif, fontSize: 14, color: muted, lineHeight: 1.9, marginTop: 14, ...willChange }}>
          A sua presença é o nosso maior presente. No entanto, caso queira nos
          agraciar com um presente, veja logo abaixo o resumo das nossas
          preferências.
        </motion.p>
      </div>
    </Block>
  );
}

/* ── ENCERRAMENTO ───────────────────────────────────────────── */
export function EncerramentoSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8 }}
      style={{ padding: "24px 16px" }}
    >
      <div style={{
        position: "relative", overflow: "hidden", borderRadius: 24,
        border: "1px solid rgba(201,168,76,0.35)", minHeight: 420,
        backgroundImage: `linear-gradient(180deg, rgba(14,32,20,0.15) 0%, rgba(14,32,20,0.75) 55%, rgba(14,32,20,0.96) 100%), url(${coupleHero.url})`,
        backgroundSize: "cover", backgroundPosition: "center 20%",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "40px 24px", textAlign: "center",
      }}>
        <motion.p
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={inViewNear}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ ...serif, fontSize: 22, color: "#FDFAF2", lineHeight: 1.6, ...willChange }}>
          Estamos ansiosos para recebê-lo no dia do nosso casamento.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={inViewNear} transition={{ delay: 0.2, duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 16 }}>
          <span style={{ width: 40, height: 1, background: gold }} />
          <Heart size={14} color={gold} fill={gold} />
          <span style={{ width: 40, height: 1, background: gold }} />
        </motion.div>
        <p style={{ ...script, fontSize: 30, marginTop: 10 }}>Nelson &amp; Cidália</p>
      </div>
    </motion.section>
  );
}
