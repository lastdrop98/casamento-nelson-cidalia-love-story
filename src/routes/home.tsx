import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Church, MapPin, Calendar as CalendarIcon, Heart } from "lucide-react";
import { fetchWedding } from "@/lib/wedding";
import { BotanicalCorner } from "@/components/wedding/BotanicalCorner";
import coupleHero from "@/assets/couple-hero.jpg.asset.json";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Convite — Nelson & Cidália" },
      { name: "description", content: "Convite oficial do casamento de Nelson & Cidália." },
      { property: "og:title", content: "Convite — Nelson & Cidália" },
      { property: "og:description", content: "27 de Novembro de 2026, Maputo." },
    ],
  }),
  component: Home,
});

const stagger = { animate: { transition: { staggerChildren: 0.12 } } };
const item = { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

function Home() {
  const q = useQuery({ queryKey: ["wedding"], queryFn: fetchWedding });
  const w = q.data;
  if (!w) return null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(201,168,76,0.09) 0%, transparent 60%), linear-gradient(180deg,#FDFAF2 0%,#F5EDD8 100%)",
      position: "relative",
      paddingBottom: 130,
    }}>
      {/* Hero photo — subtle background at the top only */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 520,
          backgroundImage: `linear-gradient(180deg, rgba(253,250,242,0.18) 0%, rgba(253,250,242,0.28) 40%, rgba(253,250,242,0.8) 72%, rgba(253,250,242,1) 100%), url(${coupleHero.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center 22%",
          opacity: 0.95,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "absolute", inset: 14, border: "1px solid rgba(201,168,76,0.4)", pointerEvents: "none", zIndex: 2 }} />
      <div style={{ position: "absolute", inset: 22, border: "1px solid rgba(201,168,76,0.2)", pointerEvents: "none", zIndex: 2 }} />
      <BotanicalCorner position="top-left" size={90} opacity={0.9} inset={30} />
      <BotanicalCorner position="top-right" size={90} opacity={0.9} inset={30} />
      <BotanicalCorner position="bottom-left" size={84} opacity={0.8} inset={30} />
      <BotanicalCorner position="bottom-right" size={84} opacity={0.8} inset={30} />

      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        style={{
          padding: "280px 34px 120px",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          color: "#1E1A10",
          textShadow: "0 1px 3px rgba(253,250,242,0.95), 0 0 12px rgba(253,250,242,0.7)",
        }}
      >
        {/* Laurel */}
        <motion.svg variants={item} viewBox="0 0 120 80" width={120} height={80} style={{ margin: "0 auto" }}>
          <g fill="none" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round">
            <path d="M60 70 C 30 60, 20 40, 22 18" />
            <path d="M60 70 C 90 60, 100 40, 98 18" />
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={`l${i}`}>
                <ellipse cx={30 - i * 2} cy={55 - i * 8} rx="6" ry="2.5" transform={`rotate(${-40 - i * 5} ${30 - i * 2} ${55 - i * 8})`} />
                <ellipse cx={90 + i * 2} cy={55 - i * 8} rx="6" ry="2.5" transform={`rotate(${40 + i * 5} ${90 + i * 2} ${55 - i * 8})`} />
              </g>
            ))}
            <circle cx="60" cy="72" r="2.5" fill="#C9A84C" />
          </g>
        </motion.svg>

        <motion.p variants={item} style={{
          marginTop: 12,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 24, letterSpacing: 8, color: "#C9A84C",
        }}>N | C</motion.p>

        <motion.p variants={item} style={{
          marginTop: 22,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 9, letterSpacing: 3, color: "#7A6848", textTransform: "uppercase",
        }}>Com a bênção de Deus e de seus pais</motion.p>
        <motion.p variants={item} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 9, letterSpacing: 2, color: "#C9A84C", textTransform: "uppercase",
          marginTop: 4,
        }}>Convidamos para o nosso casamento</motion.p>

        <motion.div variants={item} style={{ marginTop: 22 }}>
          <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 68, color: "#1E1A10", lineHeight: 1 }}>Nelson</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, margin: "6px 0" }}>
            <div style={{ width: 30, height: 1, background: "#C9A84C" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 26, color: "#C9A84C" }}>&</span>
            <div style={{ width: 30, height: 1, background: "#C9A84C" }} />
          </div>
          <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 68, color: "#1E1A10", lineHeight: 1 }}>Cidália</p>
          <div style={{ marginTop: 8, display: "flex", justifyContent: "center" }}>
            <Heart size={16} color="#C9A84C" fill="#C9A84C" />
          </div>
        </motion.div>

        {/* Info grid */}
        <motion.div variants={item} style={{
          marginTop: 30,
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          border: "1px solid rgba(201,168,76,0.4)",
          background: "rgba(255,252,245,0.75)",
          backdropFilter: "blur(2px)",
        }}>
          {[
            { Icon: Church, top: "11H00", mid: "CERIMÓNIA", sub: "Igreja N.Sra Fátima" },
            { Icon: MapPin, top: "CAJADA 2", mid: "RECEPÇÃO", sub: "Av. Dom Alexandre" },
            { Icon: CalendarIcon, top: "27 NOV", mid: "2026", sub: "Maputo" },
          ].map((c, idx) => (
            <div key={idx} style={{
              padding: "14px 8px",
              borderRight: idx < 2 ? "1px solid rgba(201,168,76,0.25)" : undefined,
              fontFamily: "'Cormorant Garamond', serif",
              display: "flex", flexDirection: "column", alignItems: "center",
            }}>
              <c.Icon size={16} color="#C9A84C" />
              <p style={{ fontSize: 10, letterSpacing: 1, color: "#C9A84C", marginTop: 6 }}>{c.top}</p>
              <p style={{ fontSize: 10, letterSpacing: 2, color: "#1E1A10", marginTop: 4 }}>{c.mid}</p>
              <p style={{ fontSize: 10, color: "#7A6848", marginTop: 2, fontStyle: "italic" }}>{c.sub}</p>
            </div>
          ))}
        </motion.div>

        <motion.div variants={item} style={{ margin: "30px auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <div style={{ width: 40, height: 1, background: "#C9A84C" }} />
          <span style={{ color: "#C9A84C" }}>✦</span>
          <div style={{ width: 40, height: 1, background: "#C9A84C" }} />
        </motion.div>

        <motion.p variants={item} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic", fontSize: 15, color: "#7A6848", lineHeight: 1.7,
        }}>
          "O amor tudo sofre, tudo crê,<br />tudo espera, tudo suporta.<br />O amor nunca falha."
        </motion.p>
        <motion.p variants={item} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 9, letterSpacing: 2, color: "#C9A84C", marginTop: 8, textTransform: "uppercase",
        }}>1 Coríntios 13:7-8</motion.p>

        <motion.p variants={item} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic", fontSize: 14, color: "#1E1A10", marginTop: 30,
          lineHeight: 1.6,
        }}>
          Mal podemos esperar para celebrar<br />este dia com você!
        </motion.p>
      </motion.div>
    </div>
  );
}
