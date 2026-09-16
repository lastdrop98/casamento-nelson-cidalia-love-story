import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Printer, Download } from "lucide-react";
import { useState } from "react";
import { fetchWedding, signUrl } from "@/lib/wedding";
import coupleHero from "@/assets/couple-hero.jpg.asset.json";

export const Route = createFileRoute("/imprimir")({
  head: () => ({
    meta: [
      { title: "Convite para Imprimir — Nelson & Cidália" },
      {
        name: "description",
        content:
          "Versão imprimível do convite de casamento de Nelson & Cidália — 27 de Novembro de 2026, Maputo. Descarregue em PDF ou imprima directamente.",
      },
      { property: "og:title", content: "Convite para Imprimir — Nelson & Cidália" },
      {
        property: "og:description",
        content: "Descarregue ou imprima o convite físico do casamento de Nelson & Cidália.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Convite para Imprimir — Nelson & Cidália" },
      {
        name: "twitter:description",
        content: "Descarregue ou imprima o convite físico do casamento de Nelson & Cidália.",
      },
    ],
  }),
  component: Imprimir,
});

const GOLD = "#C9A84C";
const CHAMPAGNE = "#DEC491";

function fmtDate(d?: string | null) {
  if (!d) return "";
  try {
    return new Intl.DateTimeFormat("pt-PT", { dateStyle: "long" }).format(new Date(d));
  } catch {
    return "";
  }
}

async function toDataUrl(url: string) {
  const res = await fetch(url);
  const blob = await res.blob();
  return await new Promise<string>((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result as string);
    fr.onerror = reject;
    fr.readAsDataURL(blob);
  });
}

function Imprimir() {
  const wQ = useQuery({ queryKey: ["wedding"], queryFn: fetchWedding });
  const w = wQ.data;
  const coverQ = useQuery({
    queryKey: ["cover", w?.cover_image_path],
    queryFn: () => signUrl("wedding-cover", w?.cover_image_path),
    enabled: !!w,
  });
  const cover = coverQ.data || coupleHero.url;
  const [busy, setBusy] = useState(false);

  if (!w) return <div style={{ minHeight: "100vh" }} />;

  const programa = [
    { label: "Cerimónia Civil", venue: w.civil_ceremony_venue, time: w.civil_ceremony_time },
    { label: "Cerimónia Religiosa", venue: w.ceremony_venue, time: w.ceremony_time },
    { label: "Recepção", venue: w.reception_venue, time: w.reception_time },
  ].filter((p) => p.venue || p.time);

  const downloadPdf = async () => {
    setBusy(true);
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ unit: "mm", format: "a5", orientation: "portrait" });
      const W = pdf.internal.pageSize.getWidth();
      const H = pdf.internal.pageSize.getHeight();

      try {
        const img = await toDataUrl(cover);
        pdf.addImage(img, "JPEG", 0, 0, W, H);
      } catch {
        pdf.setFillColor(20, 34, 24);
        pdf.rect(0, 0, W, H, "F");
      }

      // Véu escuro para contraste
      pdf.setFillColor(12, 24, 16);
      pdf.setGState(new (pdf as any).GState({ opacity: 0.68 }));
      pdf.rect(0, 0, W, H, "F");
      pdf.setGState(new (pdf as any).GState({ opacity: 1 }));

      // Moldura dourada
      pdf.setDrawColor(201, 168, 76);
      pdf.setLineWidth(0.7);
      pdf.rect(7, 7, W - 14, H - 14);
      pdf.setLineWidth(0.25);
      pdf.rect(10, 10, W - 20, H - 20);

      const center = (
        text: string,
        y: number,
        opts: { size: number; gold?: boolean; font?: string; style?: string },
      ) => {
        pdf.setFont(opts.font ?? "times", opts.style ?? "normal");
        pdf.setFontSize(opts.size);
        if (opts.gold) pdf.setTextColor(201, 168, 76);
        else pdf.setTextColor(222, 196, 145);
        pdf.text(text, W / 2, y, { align: "center" });
      };

      let y = 26;
      center("CONVITE DE CASAMENTO", y, { size: 9, gold: true });
      y += 12;
      center(w.groom_name, y, { size: 22, gold: true, style: "italic" });
      y += 8;
      center("&", y, { size: 12 });
      y += 9;
      center(w.bride_name, y, { size: 22, gold: true, style: "italic" });

      y += 12;
      center("Com a bênção de Deus e de seus pais", y, { size: 9, style: "italic" });

      y += 8;
      const pais = [
        [w.groom_father_name, w.groom_mother_name].filter(Boolean).join("  ·  "),
        [w.bride_father_name, w.bride_mother_name].filter(Boolean).join("  ·  "),
      ].filter(Boolean);
      for (const p of pais) {
        center(p, y, { size: 9 });
        y += 5.5;
      }

      y += 6;
      pdf.setDrawColor(201, 168, 76);
      pdf.setLineWidth(0.3);
      pdf.line(W / 2 - 20, y, W / 2 + 20, y);
      y += 9;
      center(fmtDate(w.wedding_date).toUpperCase(), y, { size: 12, gold: true });

      if (w.verse_text) {
        y += 10;
        pdf.setFont("times", "italic");
        pdf.setFontSize(9);
        pdf.setTextColor(222, 196, 145);
        const lines = pdf.splitTextToSize(`"${w.verse_text}"`, W - 40) as string[];
        for (const l of lines) {
          pdf.text(l, W / 2, y, { align: "center" });
          y += 4.6;
        }
        if (w.verse_reference) {
          center(w.verse_reference, y + 1, { size: 8, gold: true });
          y += 6;
        }
      }

      y += 10;
      center("PROGRAMA DO DIA", y, { size: 9, gold: true });
      y += 8;
      for (const p of programa) {
        center(`${p.label}${p.time ? ` — ${p.time}` : ""}`, y, { size: 10, gold: true });
        y += 5;
        if (p.venue) {
          center(p.venue, y, { size: 9 });
          y += 7;
        } else {
          y += 2;
        }
      }

      if (w.dress_code) {
        y += 2;
        center(`Traje: ${w.dress_code}`, y, { size: 9 });
      }

      center(w.hashtag ?? w.display_names, H - 14, { size: 8, gold: true });

      pdf.save(`convite-${w.slug}.pdf`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="print-invite">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-invite { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          @page { margin: 0; size: A5 portrait; }
        }
        .print-invite { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          position: "relative",
          backgroundImage: `url(${cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center 25%",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "rgba(12,24,16,0.72)" }} />
        <div
          style={{
            position: "absolute",
            inset: 14,
            border: `1px solid ${GOLD}`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 22,
            border: "1px solid rgba(201,168,76,0.4)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            padding: "60px 34px 70px",
            textAlign: "center",
            fontFamily: "'Cormorant Garamond', serif",
            color: CHAMPAGNE,
          }}
        >
          <p style={{ fontSize: 10, letterSpacing: 5, color: GOLD, textTransform: "uppercase" }}>
            Convite de Casamento
          </p>

          <p style={{ marginTop: 26, fontFamily: "'Great Vibes', cursive", fontSize: 46, color: GOLD }}>
            {w.groom_name}
          </p>
          <p style={{ fontSize: 18, margin: "4px 0" }}>&</p>
          <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 46, color: GOLD }}>
            {w.bride_name}
          </p>

          <p style={{ marginTop: 22, fontSize: 12, fontStyle: "italic" }}>
            Com a bênção de Deus e de seus pais
          </p>
          <div
            style={{
              marginTop: 10,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4px 16px",
              maxWidth: 380,
              margin: "12px auto 0",
              fontSize: 13,
            }}
          >
            <div>
              <p>{w.groom_father_name}</p>
              <p>{w.groom_mother_name}</p>
            </div>
            <div>
              <p>{w.bride_father_name}</p>
              <p>{w.bride_mother_name}</p>
            </div>
          </div>

          <div style={{ width: 60, height: 1, background: GOLD, margin: "26px auto" }} />

          <p style={{ fontSize: 16, letterSpacing: 3, color: GOLD, textTransform: "uppercase" }}>
            {fmtDate(w.wedding_date)}
          </p>

          {w.verse_text && (
            <div style={{ marginTop: 24, maxWidth: 420, marginInline: "auto" }}>
              <p style={{ fontSize: 14, fontStyle: "italic" }}>"{w.verse_text}"</p>
              {w.verse_reference && (
                <p style={{ marginTop: 6, fontSize: 11, letterSpacing: 2, color: GOLD }}>
                  {w.verse_reference}
                </p>
              )}
            </div>
          )}

          <p
            style={{
              marginTop: 34,
              fontSize: 10,
              letterSpacing: 5,
              color: GOLD,
              textTransform: "uppercase",
            }}
          >
            Programa do Dia
          </p>
          <div style={{ marginTop: 16, display: "grid", gap: 14, maxWidth: 420, marginInline: "auto" }}>
            {programa.map((p) => (
              <div key={p.label}>
                <p style={{ fontSize: 14, color: GOLD, letterSpacing: 1 }}>
                  {p.label}
                  {p.time ? ` — ${p.time}` : ""}
                </p>
                {p.venue && <p style={{ fontSize: 13 }}>{p.venue}</p>}
              </div>
            ))}
          </div>

          {w.dress_code && (
            <p style={{ marginTop: 22, fontSize: 13 }}>Traje: {w.dress_code}</p>
          )}

          <div
            className="no-print"
            style={{
              marginTop: 40,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "center",
            }}
          >
            <button
              onClick={downloadPdf}
              disabled={busy}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                border: `1px solid ${GOLD}`,
                background: "rgba(201,168,76,0.14)",
                color: GOLD,
                padding: "14px 26px",
                fontSize: 11,
                letterSpacing: 3,
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              <Download size={16} strokeWidth={1.6} />
              {busy ? "A gerar…" : "Baixar Convite em PDF"}
            </button>
            <button
              onClick={() => window.print()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                border: `1px solid ${GOLD}`,
                background: "transparent",
                color: CHAMPAGNE,
                padding: "14px 26px",
                fontSize: 11,
                letterSpacing: 3,
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              <Printer size={16} strokeWidth={1.6} />
              Imprimir Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
