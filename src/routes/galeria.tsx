import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchWedding, fetchGallery, signUrl } from "@/lib/wedding";
import { PageShell } from "@/components/wedding/PageShell";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galeria — Nelson & Cidália" },
      { name: "description", content: "A colecção de fotografias de Nelson & Cidália: momentos do noivado, sessões fotográficas e as memórias que nos trouxeram até aqui." },
      { property: "og:title", content: "Galeria de Fotos — Nelson & Cidália" },
      { property: "og:description", content: "Percorra as fotografias que contam a história de Nelson & Cidália até ao dia do casamento." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://nelson-cidalia-convite-digital.lovable.app/galeria" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Galeria de Fotos — Nelson & Cidália" },
      { name: "twitter:description", content: "Percorra as fotografias que contam a história de Nelson & Cidália até ao dia do casamento." },
    ],
    links: [{ rel: "canonical", href: "https://nelson-cidalia-convite-digital.lovable.app/galeria" }],
  }),
  component: Galeria,
});

function Galeria() {
  const [tab, setTab] = useState<"photos" | "videos">("photos");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const wQ = useQuery({ queryKey: ["wedding"], queryFn: fetchWedding });
  const w = wQ.data;
  const gQ = useQuery({
    queryKey: ["gallery", w?.id],
    queryFn: () => fetchGallery(w!.id),
    enabled: !!w,
  });

  const [urls, setUrls] = useState<Array<{ id: string; url: string; caption: string | null }>>([]);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!gQ.data) return;
      const items = await Promise.all(
        gQ.data.map(async (g) => ({
          id: g.id,
          caption: g.caption,
          url: (await signUrl("wedding-gallery", g.image_path)) ?? "",
        }))
      );
      if (!cancelled) setUrls(items.filter((i) => i.url));
    })();
    return () => { cancelled = true; };
  }, [gQ.data]);

  const gold = "#C9A84C";

  return (
    <PageShell title="Galeria" background="green">
      <div style={{ padding: "24px 20px" }}>
        <p style={{
          textAlign: "center",
          fontFamily: "'Great Vibes', cursive",
          fontSize: 38, color: gold,
        }}>Os Nossos Momentos</p>

        <div style={{ display: "flex", justifyContent: "center", gap: 30, marginTop: 20 }}>
          {(["photos", "videos"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                background: "transparent", border: "none", cursor: "pointer",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 12, letterSpacing: 3, textTransform: "uppercase",
                color: tab === t ? gold : "rgba(201,168,76,0.4)",
                borderBottom: tab === t ? `2px solid ${gold}` : "2px solid transparent",
                padding: "6px 10px",
              }}
            >{t === "photos" ? "Fotos" : "Vídeos"}</button>
          ))}
        </div>

        <div style={{ marginTop: 22 }}>
          {tab === "photos" && (
            urls.length === 0 ? (
              <Empty />
            ) : (
              <div style={{ columnCount: 2, columnGap: 8 }}>
                {urls.map((g, i) => (
                  <motion.figure
                    key={g.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setLightbox(i)}
                    style={{
                      breakInside: "avoid", marginBottom: 8,
                      borderRadius: 14, overflow: "hidden",
                      border: "1px solid rgba(201,168,76,0.3)",
                      cursor: "zoom-in",
                    }}
                  >
                    <img src={g.url} alt={g.caption ?? `Fotografia ${i + 1} de Nelson & Cidália`} style={{ width: "100%", display: "block" }} loading="lazy" />
                  </motion.figure>
                ))}
              </div>
            )
          )}
          {tab === "videos" && <Empty label="Os vídeos serão adicionados em breve" />}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && urls[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: "fixed", inset: 0, background: "#000", zIndex: 10000,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <button
              aria-label="Fechar fotografia"
              onClick={() => setLightbox(null)}
              style={{ position: "absolute", top: 18, right: 18, color: "#fff", background: "transparent", border: "none", cursor: "pointer" }}
            ><X size={28} /></button>
            <button
              aria-label="Fotografia anterior"
              onClick={() => setLightbox((n) => n === null ? n : (n - 1 + urls.length) % urls.length)}
              style={{ position: "absolute", left: 8, color: "#fff", background: "transparent", border: "none", cursor: "pointer" }}
            ><ChevronLeft size={36} /></button>
            <img src={urls[lightbox].url} alt={urls[lightbox].caption ?? `Fotografia ${lightbox + 1} de Nelson & Cidália`} style={{ maxWidth: "92vw", maxHeight: "80vh", objectFit: "contain" }} />
            <button
              aria-label="Fotografia seguinte"
              onClick={() => setLightbox((n) => n === null ? n : (n + 1) % urls.length)}
              style={{ position: "absolute", right: 8, color: "#fff", background: "transparent", border: "none", cursor: "pointer" }}
            ><ChevronRight size={36} /></button>
            {urls[lightbox].caption && (
              <p style={{
                position: "absolute", bottom: 40, left: 0, right: 0, textAlign: "center",
                color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
              }}>{urls[lightbox].caption}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}

function Empty({ label = "As fotos serão adicionadas em breve" }: { label?: string }) {
  return (
    <div style={{ textAlign: "center", padding: "50px 20px" }}>
      <Camera size={48} color="#C9A84C" style={{ opacity: 0.7 }} />
      <p style={{
        marginTop: 12, fontFamily: "'Cormorant Garamond', serif",
        fontStyle: "italic", color: "rgba(201,168,76,0.7)",
      }}>{label}</p>
    </div>
  );
}
