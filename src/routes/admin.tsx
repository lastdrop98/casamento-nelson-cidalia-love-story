import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchWedding, fetchGallery, signUrl } from "@/lib/wedding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin — Nelson & Cidália" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const nav = useNavigate();
  const qc = useQueryClient();
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) { nav({ to: "/auth" }); return; }
      setUserId(data.user.id);
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id);
      setIsAdmin(!!roles?.some((r) => r.role === "admin"));
      setReady(true);
    })();
  }, [nav]);

  const weddingQ = useQuery({ queryKey: ["wedding"], queryFn: fetchWedding, enabled: ready && isAdmin });
  const wedding = weddingQ.data;
  const galleryQ = useQuery({
    queryKey: ["gallery", wedding?.id],
    queryFn: () => fetchGallery(wedding!.id),
    enabled: !!wedding?.id,
  });

  if (!ready) return <div className="min-h-screen flex items-center justify-center">A carregar…</div>;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center border border-[var(--gold)]/30 p-8 bg-card/50">
          <p className="font-script text-3xl text-[var(--gold)]">Sem permissões</p>
          <p className="mt-3 text-sm text-muted-foreground">
            A sua conta está autenticada mas não tem o papel <code>admin</code>. Peça a um administrador para atribuir permissões executando no backend:
          </p>
          <pre className="text-left mt-4 bg-muted p-3 text-xs overflow-auto">
{`INSERT INTO public.user_roles (user_id, role)
VALUES ('${userId}', 'admin');`}
          </pre>
          <div className="mt-6 flex gap-3 justify-center">
            <Button variant="outline" onClick={async () => { await supabase.auth.signOut(); nav({ to: "/auth" }); }}>
              Terminar sessão
            </Button>
            <Link to="/" className="text-xs uppercase tracking-widest self-center text-muted-foreground hover:text-[var(--gold)]">Voltar</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!wedding) return <div className="min-h-screen flex items-center justify-center">A carregar…</div>;

  return (
    <div className="min-h-screen bg-[var(--ivory)] px-6 py-12 max-w-3xl mx-auto space-y-12">
      <header className="flex items-center justify-between">
        <div>
          <p className="font-script text-4xl text-[var(--gold)]">Admin</p>
          <p className="uppercase tracking-[0.3em] text-xs text-[var(--gold)]">{wedding.display_names}</p>
        </div>
        <div className="flex gap-2">
          <Link to="/" className="text-xs uppercase tracking-widest self-center text-muted-foreground hover:text-[var(--gold)]">Ver convite</Link>
          <Button variant="outline" onClick={async () => { await supabase.auth.signOut(); nav({ to: "/auth" }); }}>Sair</Button>
        </div>
      </header>

      <WeddingEditor wedding={wedding} onSaved={() => qc.invalidateQueries({ queryKey: ["wedding"] })} />

      <CoverUploader wedding={wedding} onDone={() => qc.invalidateQueries({ queryKey: ["wedding"] })} />

      <MusicUploader wedding={wedding} onDone={() => qc.invalidateQueries({ queryKey: ["wedding"] })} />

      <GalleryManager
        weddingId={wedding.id}
        items={galleryQ.data ?? []}
        onChanged={() => qc.invalidateQueries({ queryKey: ["gallery", wedding.id] })}
      />

      <RsvpList weddingId={wedding.id} wedding={wedding} />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-[var(--gold)]/30 p-6 bg-card/50 space-y-4">
      <h2 className="font-script text-2xl text-[var(--gold)]">{title}</h2>
      {children}
    </section>
  );
}

function WeddingEditor({ wedding, onSaved }: { wedding: any; onSaved: () => void }) {
  const [form, setForm] = useState(wedding);
  const [saving, setSaving] = useState(false);
  useEffect(() => setForm(wedding), [wedding]);

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("weddings").update({
      ceremony_venue: form.ceremony_venue,
      ceremony_address: form.ceremony_address,
      ceremony_time: form.ceremony_time,
      reception_venue: form.reception_venue,
      reception_address: form.reception_address,
      reception_time: form.reception_time,
      dress_code: form.dress_code,
      welcome_message: form.welcome_message,
      story: form.story,
      hashtag: form.hashtag,
      wedding_date: form.wedding_date,
    }).eq("id", wedding.id);
    setSaving(false);
    if (error) toast.error(error.message);
    else { toast.success("Guardado"); onSaved(); }
  };

  const f = (k: string) => ({
    value: form[k] ?? "",
    onChange: (e: any) => setForm({ ...form, [k]: e.target.value }),
    className: "mt-1 border-[var(--gold)]/40 bg-transparent",
  });

  return (
    <Section title="Informações">
      <div className="grid sm:grid-cols-2 gap-4">
        <div><Label>Cerimónia — local</Label><Input {...f("ceremony_venue")} /></div>
        <div><Label>Cerimónia — hora</Label><Input {...f("ceremony_time")} /></div>
        <div className="sm:col-span-2"><Label>Cerimónia — endereço</Label><Input {...f("ceremony_address")} /></div>
        <div><Label>Recepção — local</Label><Input {...f("reception_venue")} /></div>
        <div><Label>Recepção — hora</Label><Input {...f("reception_time")} /></div>
        <div className="sm:col-span-2"><Label>Recepção — endereço</Label><Input {...f("reception_address")} /></div>
        <div><Label>Traje</Label><Input {...f("dress_code")} /></div>
        <div><Label>Hashtag</Label><Input {...f("hashtag")} /></div>
        <div className="sm:col-span-2"><Label>Mensagem de boas-vindas</Label><Textarea {...f("welcome_message")} /></div>
      </div>
      <Button onClick={save} disabled={saving} className="bg-[var(--gold)] uppercase tracking-widest text-xs">
        {saving ? "..." : "Guardar"}
      </Button>
    </Section>
  );
}

function CoverUploader({ wedding, onDone }: { wedding: any; onDone: () => void }) {
  const [busy, setBusy] = useState(false);
  const coverQ = useQuery({
    queryKey: ["cover", wedding.cover_image_path],
    queryFn: () => signUrl("wedding-cover", wedding.cover_image_path),
  });
  const upload = async (file: File) => {
    setBusy(true);
    const path = `${wedding.id}/${Date.now()}-${file.name}`;
    const up = await supabase.storage.from("wedding-cover").upload(path, file, { upsert: true });
    if (up.error) { toast.error(up.error.message); setBusy(false); return; }
    const { error } = await supabase.from("weddings").update({ cover_image_path: path }).eq("id", wedding.id);
    setBusy(false);
    if (error) toast.error(error.message); else { toast.success("Capa actualizada"); onDone(); }
  };
  return (
    <Section title="Imagem de Capa">
      {coverQ.data && <img src={coverQ.data} alt="capa" className="w-full max-h-64 object-cover" />}
      <Input type="file" accept="image/*" disabled={busy} onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
    </Section>
  );
}

function MusicUploader({ wedding, onDone }: { wedding: any; onDone: () => void }) {
  const [busy, setBusy] = useState(false);
  const musicQ = useQuery({
    queryKey: ["music", wedding.music_path],
    queryFn: () => signUrl("wedding-audio", wedding.music_path),
  });
  const upload = async (file: File) => {
    setBusy(true);
    const path = `${wedding.id}/${Date.now()}-${file.name}`;
    const up = await supabase.storage.from("wedding-audio").upload(path, file, { upsert: true });
    if (up.error) { toast.error(up.error.message); setBusy(false); return; }
    const { error } = await supabase.from("weddings").update({ music_path: path }).eq("id", wedding.id);
    setBusy(false);
    if (error) toast.error(error.message); else { toast.success("Música actualizada"); onDone(); }
  };
  return (
    <Section title="Música">
      {musicQ.data && <audio controls src={musicQ.data} className="w-full" />}
      <Input type="file" accept="audio/*" disabled={busy} onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
    </Section>
  );
}

function GalleryManager({ weddingId, items, onChanged }: { weddingId: string; items: any[]; onChanged: () => void }) {
  const [busy, setBusy] = useState(false);
  const [urls, setUrls] = useState<Record<string, string>>({});
  useEffect(() => {
    (async () => {
      const map: Record<string, string> = {};
      for (const it of items) {
        const u = await signUrl("wedding-gallery", it.image_path);
        if (u) map[it.id] = u;
      }
      setUrls(map);
    })();
  }, [items]);

  const upload = async (files: FileList) => {
    setBusy(true);
    for (const file of Array.from(files)) {
      const path = `${weddingId}/${Date.now()}-${file.name}`;
      const up = await supabase.storage.from("wedding-gallery").upload(path, file);
      if (up.error) { toast.error(up.error.message); continue; }
      await supabase.from("gallery").insert({ wedding_id: weddingId, image_path: path, sort_order: items.length });
    }
    setBusy(false);
    onChanged();
  };

  const remove = async (item: any) => {
    await supabase.storage.from("wedding-gallery").remove([item.image_path]);
    await supabase.from("gallery").delete().eq("id", item.id);
    onChanged();
  };

  return (
    <Section title="Galeria">
      <Input type="file" accept="image/*" multiple disabled={busy} onChange={(e) => e.target.files && upload(e.target.files)} />
      <div className="grid grid-cols-3 gap-2">
        {items.map((it) => (
          <div key={it.id} className="relative group aspect-square bg-muted overflow-hidden">
            {urls[it.id] && <img src={urls[it.id]} alt="" className="w-full h-full object-cover" />}
            <button onClick={() => remove(it)} className="absolute top-1 right-1 bg-destructive text-destructive-foreground text-xs px-2 py-1 opacity-0 group-hover:opacity-100">
              Remover
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
}

function playBeep() {
  try {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
    osc.onended = () => ctx.close();
  } catch { /* sem áudio */ }
}

const GREEN_DARK = "1B3526";
const GREEN_MID = "2A4832";
const GOLD = "C9A84C";
const CREAM = "F7F3E8";
const RED = "B33A3A";

function RsvpList({ weddingId, wedding }: { weddingId: string; wedding: any }) {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["rsvps", weddingId],
    queryFn: async () => {
      const { data, error } = await supabase.from("rsvps").select("*").eq("wedding_id", weddingId).order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Tempo real: novo RSVP → beep + toast + refresh da lista
  useEffect(() => {
    const channel = supabase
      .channel(`rsvps-admin-${weddingId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "rsvps", filter: `wedding_id=eq.${weddingId}` },
        (payload) => {
          playBeep();
          const name = (payload.new as any)?.guest_name ?? "Convidado";
          toast.success(`Nova confirmação: ${name}`);
          qc.invalidateQueries({ queryKey: ["rsvps", weddingId] });
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [weddingId, qc]);

  const rsvps = useMemo(() => q.data ?? [], [q.data]);
  const totalRespostas = rsvps.length;
  const totalPessoas = useMemo(
    () => rsvps.filter((r) => r.attending).reduce((sum, r) => sum + (r.guest_count ?? 1), 0),
    [rsvps],
  );

  const exportExcel = async () => {
    if (!rsvps.length) return;
    const XLSX = await import("xlsx-js-style");
    const fmt = new Intl.DateTimeFormat("pt-PT", { dateStyle: "short", timeStyle: "short" });
    const dataFmt = new Intl.DateTimeFormat("pt-PT", { dateStyle: "long" });

    const thin = { style: "thin", color: { rgb: GOLD } };
    const border = { top: thin, bottom: thin, left: thin, right: thin };

    const cell = (v: string | number, s: object) => ({ v, t: typeof v === "number" ? "n" : "s", s });

    const ws: Record<string, unknown> = {};

    ws["A1"] = cell("Confirmações — Nelson & Cidália", {
      font: { bold: true, sz: 16, color: { rgb: GOLD } },
      fill: { patternType: "solid", fgColor: { rgb: GREEN_DARK } },
      alignment: { horizontal: "center", vertical: "center" },
    });
    ws["A2"] = cell(
      `Casamento: 20 de Dezembro de 2026 · Exportado em ${dataFmt.format(new Date())}`,
      {
        font: { sz: 11, color: { rgb: CREAM }, italic: true },
        fill: { patternType: "solid", fgColor: { rgb: GREEN_MID } },
        alignment: { horizontal: "center", vertical: "center" },
      },
    );

    const headers = ["Nome", "Confirmou", "Nº Convidados", "Mensagem", "Data"];
    headers.forEach((h, i) => {
      ws[XLSX.utils.encode_cell({ r: 2, c: i })] = cell(h, {
        font: { bold: true, color: { rgb: GREEN_DARK } },
        fill: { patternType: "solid", fgColor: { rgb: GOLD } },
        alignment: { horizontal: "center", vertical: "center" },
        border,
      });
    });

    rsvps.forEach((r, idx) => {
      const row = 3 + idx;
      const zebra = idx % 2 === 0 ? "FFFFFF" : "F7F3E8";
      const base = { fill: { patternType: "solid", fgColor: { rgb: zebra } }, border };
      const values: (string | number)[] = [
        r.guest_name,
        r.attending ? "Sim" : "Não",
        r.guest_count ?? "",
        r.message ?? "",
        r.created_at ? fmt.format(new Date(r.created_at)) : "",
      ];
      values.forEach((v, c) => {
        const style: Record<string, unknown> = { ...base };
        if (c === 1) {
          style.font = { bold: true, color: { rgb: r.attending ? GREEN_DARK : RED } };
          style.alignment = { horizontal: "center" };
        }
        if (c === 2) style.alignment = { horizontal: "center" };
        ws[XLSX.utils.encode_cell({ r: row, c })] = cell(v, style);
      });
    });

    const totalRow = 3 + rsvps.length;
    ws[XLSX.utils.encode_cell({ r: totalRow, c: 0 })] = cell(
      `TOTAL: ${totalPessoas} ${totalPessoas === 1 ? "pessoa confirmada" : "pessoas confirmadas"}`,
      {
        font: { bold: true, sz: 12, color: { rgb: GREEN_DARK } },
        fill: { patternType: "solid", fgColor: { rgb: GOLD } },
        alignment: { horizontal: "center", vertical: "center" },
      },
    );

    ws["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 4 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 4 } },
      { s: { r: totalRow, c: 0 }, e: { r: totalRow, c: 4 } },
    ];
    ws["!cols"] = [{ wch: 28 }, { wch: 11 }, { wch: 14 }, { wch: 40 }, { wch: 18 }];
    ws["!rows"] = [{ hpt: 28 }, { hpt: 18 }, { hpt: 20 }];
    ws["!ref"] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: totalRow, c: 4 } });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws as never, "Confirmações");
    XLSX.writeFile(wb, `confirmacoes-nelson-cidalia-${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <Section title="Confirmações">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-muted-foreground">
          {totalRespostas} {totalRespostas === 1 ? "resposta" : "respostas"} · {totalPessoas}{" "}
          {totalPessoas === 1 ? "pessoa confirmada" : "pessoas confirmadas"}
        </p>
        <Button
          onClick={exportExcel}
          disabled={!rsvps.length}
          variant="outline"
          className="border-[var(--gold)]/40 text-xs uppercase tracking-widest"
        >
          Exportar Excel
        </Button>
      </div>
      {q.isLoading && <p>A carregar…</p>}
      {q.data?.length === 0 && <p className="text-muted-foreground text-sm">Ainda sem respostas.</p>}
      <ul className="divide-y divide-[var(--gold)]/20">
        {q.data?.map((r) => (
          <li key={r.id} className="py-3 flex justify-between gap-4">
            <div>
              <p className="font-medium">{r.guest_name}</p>
              {r.message && <p className="text-sm text-muted-foreground italic">"{r.message}"</p>}
            </div>
            <div className="text-right text-sm">
              <p className={r.attending ? "text-[var(--gold)]" : "text-destructive"}>
                {r.attending ? "Sim" : "Não"}
              </p>
              {r.attending && <p className="text-muted-foreground">{r.guest_count} convidado(s)</p>}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
