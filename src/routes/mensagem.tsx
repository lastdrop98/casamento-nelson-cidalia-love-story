import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { fetchWedding, fetchMessages, submitMessage } from "@/lib/wedding";
import { PageShell } from "@/components/wedding/PageShell";

export const Route = createFileRoute("/mensagem")({
  head: () => ({
    meta: [
      { title: "Mensagem aos Noivos — Nelson & Cidália" },
      { name: "description", content: "Deixe uma mensagem para os noivos." },
      { property: "og:title", content: "Mensagem aos Noivos" },
      { property: "og:description", content: "As suas palavras ficarão guardadas para sempre." },
    ],
  }),
  component: Mensagem,
});

function Mensagem() {
  const qc = useQueryClient();
  const wQ = useQuery({ queryKey: ["wedding"], queryFn: fetchWedding });
  const w = wQ.data;
  const mQ = useQuery({ queryKey: ["messages", w?.id], queryFn: () => fetchMessages(w!.id, 6), enabled: !!w });

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const [sent, setSent] = useState(false);
  const gold = "#C9A84C";

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
    <PageShell title="Mensagem aos Noivos">
      <div style={{ padding: "24px 20px" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 42 }}>💌</p>
          <p style={{
            fontFamily: "'Great Vibes', cursive", fontSize: 36, color: "#1E1A10",
          }}>Deixe as suas palavras</p>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            color: "#7A6848", fontSize: 14, marginTop: 6,
          }}>A sua mensagem ficará guardada para sempre no nosso álbum digital.</p>
        </div>

        <form onSubmit={submit} style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            placeholder="O seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: "12px 14px", borderRadius: 8,
              border: `1px solid ${gold}66`, background: "rgba(255,252,245,0.9)",
              fontFamily: "'Cormorant Garamond', serif", fontSize: 15,
            }}
          />
          <textarea
            placeholder="A sua mensagem *"
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 300))}
            rows={5}
            required
            style={{
              padding: "12px 14px", borderRadius: 8,
              border: `1px solid ${gold}66`, background: "rgba(255,252,245,0.9)",
              fontFamily: "'Cormorant Garamond', serif", fontSize: 15, resize: "vertical",
            }}
          />
          <div style={{
            textAlign: "right",
            fontFamily: "'Cormorant Garamond', serif", fontSize: 9, color: gold, letterSpacing: 1,
          }}>{text.length}/300</div>
          <button
            type="submit" disabled={saving}
            style={{
              padding: "14px", borderRadius: 999,
              background: "#1B3526", color: gold, border: `1px solid ${gold}`,
              fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", cursor: "pointer",
            }}
          >{saving ? "A enviar..." : "✦ Enviar Mensagem ✦"}</button>
        </form>

        {sent && (
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: "center", marginTop: 14,
              fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: gold,
            }}
          >Mensagem enviada com carinho! 💌</motion.p>
        )}

        <div style={{ marginTop: 28 }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 10, letterSpacing: 3, color: gold, textTransform: "uppercase", textAlign: "center",
          }}>Mural de Mensagens</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
            {(mQ.data ?? []).map((m) => (
              <div key={m.id} style={{
                background: "rgba(255,252,245,0.9)",
                borderLeft: `3px solid ${gold}`,
                borderRadius: "0 10px 10px 0",
                padding: 12,
              }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 10, letterSpacing: 1, color: gold,
                }}>{m.guest_name ?? "Anónimo"}</p>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
                  fontSize: 15, color: "#1E1A10", marginTop: 3,
                }}>"{m.message}"</p>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 8, color: "#7A6848", marginTop: 4,
                }}>{new Date(m.created_at).toLocaleDateString("pt-PT")}</p>
              </div>
            ))}
            {(!mQ.data || mQ.data.length === 0) && (
              <p style={{
                textAlign: "center",
                fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
                color: "#7A6848",
              }}>Seja o primeiro a deixar uma mensagem.</p>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
