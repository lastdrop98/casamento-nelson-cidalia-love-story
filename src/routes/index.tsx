import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchWedding, signUrl } from "@/lib/wedding";
import { music } from "@/lib/music";
import { BotanicalCorner } from "@/components/wedding/BotanicalCorner";
import coverFallback from "@/assets/cover-fallback.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nelson & Cidália — Convite Digital" },
      { name: "description", content: "Save the date — 27 de Novembro de 2026. #NelsonCidália2026" },
      { property: "og:title", content: "Nelson & Cidália — 27.11.2026" },
      { property: "og:description", content: "Save the date — 27 de Novembro de 2026." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://nelson-cidalia-convite-digital.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://nelson-cidalia-convite-digital.lovable.app/" }],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  const [opening, setOpening] = useState(false);
  const wQ = useQuery({ queryKey: ["wedding"], queryFn: fetchWedding });
  const coverQ = useQuery({
    queryKey: ["cover", wQ.data?.cover_image_path],
    queryFn: () => signUrl("wedding-cover", wQ.data?.cover_image_path),
    enabled: !!wQ.data,
  });

  const coverUrl = coverQ.data ?? coverFallback;

  useEffect(() => {
    if (coverQ.data) {
      const img = new Image();
      img.src = coverQ.data;
    }
  }, [coverQ.data]);

    const openInvite = async () => {
    setOpening(true);
    await music.play();
    const tipo = new URLSearchParams(window.location.search).get("tipo");
    setTimeout(() => navigate({ to: "/home", search: tipo ? { tipo } : undefined }), 450);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        backgroundImage: `linear-gradient(180deg, rgba(14,32,20,0.35) 0%, rgba(14,32,20,0.55) 45%, rgba(14,32,20,0.92) 100%), url(${coverUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center 20%",
        backgroundColor: "#1B3526",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        textAlign: "center",
        padding: "60px 24px 80px",
        color: "#F5EDD8",
      }}
    >
      <h1 style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>Nelson & Cidália — Convite de Casamento, 27 de Novembro de 2026</h1>

      {/* Ornate double frame */}
      <div style={{
        position: "absolute", inset: 14,
        border: "1px solid rgba(201,168,76,0.55)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: 22,
        border: "1px solid rgba(201,168,76,0.25)", pointerEvents: "none",
      }} />

      <BotanicalCorner position="top-left" size={92} opacity={0.75} inset={30} />
      <BotanicalCorner position="top-right" size={92} opacity={0.75} inset={30} />
      <BotanicalCorner position="bottom-left" size={86} opacity={0.65} inset={30} />
      <BotanicalCorner position="bottom-right" size={86} opacity={0.65} inset={30} />

      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: `${8 + i * 11}%`,
            bottom: `${10 + (i % 4) * 12}%`,
            width: i % 2 === 0 ? 3 : 4,
            height: i % 2 === 0 ? 3 : 4,
            borderRadius: "50%",
            background: "rgba(201,168,76,0.4)",
            pointerEvents: "none",
            zIndex: 1,
          }}
          animate={{ y: [0, -80, -160], opacity: [0, 0.6, 0], scale: [1, 0.8, 0.3] }}
          transition={{
            duration: 7 + i,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 0.9,
            repeatDelay: 1,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: opening ? 0 : 1, y: opening ? -20 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ position: "relative", zIndex: 2 }}
      >
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 10, letterSpacing: 6, textTransform: "uppercase",
          color: "#C9A84C", marginBottom: 24,
        }}>Save the Date</p>

        <p style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 76, lineHeight: 1, color: "#F5EDD8",
          textShadow: "0 2px 20px rgba(0,0,0,0.5)",
        }}>Nelson</p>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 22, color: "#C9A84C", margin: "6px 0",
          fontStyle: "italic",
        }}>&</p>
        <p style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 76, lineHeight: 1, color: "#F5EDD8",
          textShadow: "0 2px 20px rgba(0,0,0,0.5)",
        }}>Cidália</p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, margin: "28px 0" }}>
          <div style={{ width: 40, height: 1, background: "#C9A84C" }} />
          <span style={{ color: "#C9A84C", fontSize: 8 }}>✦</span>
          <div style={{ width: 40, height: 1, background: "#C9A84C" }} />
        </div>

        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 12, letterSpacing: 5, textTransform: "uppercase",
          color: "#E7D9A8",
        }}>27 · 11 · 2026 &nbsp;·&nbsp; Maputo</p>

        <button
          onClick={openInvite}
          disabled={opening}
          style={{
            marginTop: 44,
            border: "1px solid #C9A84C",
            background: "rgba(27,53,38,0.4)",
            color: "#C9A84C",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 11, letterSpacing: 5, textTransform: "uppercase",
            padding: "14px 34px",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
        >
          {opening ? "A abrir..." : "Abrir Convite"}
        </button>
      </motion.div>
    </div>
  );
}
