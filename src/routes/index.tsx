import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchWedding, fetchGallery, signUrl } from "@/lib/wedding";
import { Countdown } from "@/components/wedding/Countdown";
import { GoldDivider } from "@/components/wedding/GoldDivider";
import { MusicToggle } from "@/components/wedding/MusicToggle";
import { RsvpForm } from "@/components/wedding/RsvpForm";
import coverFallback from "@/assets/cover-fallback.jpg";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nelson & Cidália — 27 de Novembro de 2026" },
      { name: "description", content: "Com imensa alegria, convidamos você a celebrar connosco o nosso casamento no dia 27 de Novembro de 2026. #NelsonCidalia2026" },
      { property: "og:title", content: "Nelson & Cidália — Casamento" },
      { property: "og:description", content: "Celebre connosco no dia 27 de Novembro de 2026." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Great+Vibes&display=swap" },
    ],
  }),
  component: InvitationPage,
});

const MONTHS_PT = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
function formatPt(d: Date) {
  return `${d.getDate()} de ${MONTHS_PT[d.getMonth()]} de ${d.getFullYear()}`;
}

function InvitationPage() {
  const [opened, setOpened] = useState(false);

  const weddingQ = useQuery({ queryKey: ["wedding"], queryFn: fetchWedding });
  const wedding = weddingQ.data;

  const galleryQ = useQuery({
    queryKey: ["gallery", wedding?.id],
    queryFn: () => fetchGallery(wedding!.id),
    enabled: !!wedding?.id,
  });

  const coverQ = useQuery({
    queryKey: ["cover", wedding?.cover_image_path],
    queryFn: () => signUrl("wedding-cover", wedding?.cover_image_path),
    enabled: !!wedding,
  });

  const musicQ = useQuery({
    queryKey: ["music", wedding?.music_path],
    queryFn: () => signUrl("wedding-audio", wedding?.music_path),
    enabled: !!wedding,
  });

  const [galleryUrls, setGalleryUrls] = useState<Array<{ id: string; url: string; caption: string | null }>>([]);
  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!galleryQ.data) return;
      const items = await Promise.all(
        galleryQ.data.map(async (g) => ({
          id: g.id,
          caption: g.caption,
          url: (await signUrl("wedding-gallery", g.image_path)) ?? "",
        }))
      );
      if (!cancelled) setGalleryUrls(items.filter((i) => i.url));
    }
    run();
    return () => { cancelled = true; };
  }, [galleryQ.data]);

  if (weddingQ.isLoading || !wedding) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--ivory)]">
        <p className="font-script text-4xl text-[var(--gold)]">Nelson & Cidália</p>
      </div>
    );
  }

  const date = new Date(wedding.wedding_date);
  const coverUrl = coverQ.data ?? coverFallback;

  return (
    <div className="bg-[var(--ivory)] text-foreground min-h-screen">
      <MusicToggle src={musicQ.data ?? null} />

      {/* COVER */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-20"
        style={{
          backgroundImage: `linear-gradient(rgba(250,245,230,0.5), rgba(250,245,230,0.7)), url(${coverUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <p className="uppercase tracking-[0.5em] text-xs text-[var(--gold)]">Save the Date</p>
        <div className="mt-8">
          <p className="font-script text-6xl sm:text-8xl text-[var(--gold)] leading-none">
            {wedding.display_names.split(" & ")[0]}
          </p>
          <p className="text-[var(--gold)] my-2 uppercase tracking-[0.4em] text-sm">&</p>
          <p className="font-script text-6xl sm:text-8xl text-[var(--gold)] leading-none">
            {wedding.display_names.split(" & ")[1]}
          </p>
        </div>
        <GoldDivider />
        <p className="text-lg sm:text-xl tracking-[0.25em] uppercase font-light">
          {formatPt(date)}
        </p>

        {!opened && (
          <button
            onClick={() => {
              setOpened(true);
              setTimeout(() => {
                document.getElementById("welcome")?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
            className="mt-12 border border-[var(--gold)] px-8 py-3 text-xs uppercase tracking-[0.35em] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--primary-foreground)] transition"
          >
            Abrir Convite
          </button>
        )}
      </section>

      {opened && (
        <>
          {/* WELCOME */}
          <section id="welcome" className="px-6 py-24 max-w-2xl mx-auto text-center">
            <p className="uppercase tracking-[0.4em] text-xs text-[var(--gold)]">Bem-vindos</p>
            <GoldDivider />
            <p className="text-xl sm:text-2xl font-light italic leading-relaxed text-foreground/80">
              "{wedding.welcome_message}"
            </p>
            <p className="mt-8 font-script text-3xl text-[var(--gold)]">
              {wedding.display_names}
            </p>
          </section>

          {/* COUNTDOWN */}
          <section className="px-6 py-20 bg-card/40">
            <div className="max-w-3xl mx-auto text-center">
              <p className="uppercase tracking-[0.4em] text-xs text-[var(--gold)]">Contagem Decrescente</p>
              <GoldDivider />
              <Countdown date={wedding.wedding_date} />
            </div>
          </section>

          {/* DETAILS */}
          <section className="px-6 py-24 max-w-3xl mx-auto">
            <div className="text-center">
              <p className="uppercase tracking-[0.4em] text-xs text-[var(--gold)]">Detalhes</p>
              <GoldDivider />
            </div>

            <div className="grid sm:grid-cols-2 gap-10 mt-6">
              <DetailCard
                title="Cerimónia"
                time={wedding.ceremony_time ?? undefined}
                venue={wedding.ceremony_venue ?? undefined}
                address={wedding.ceremony_address ?? undefined}
              />
              <DetailCard
                title="Recepção"
                time={wedding.reception_time ?? undefined}
                venue={wedding.reception_venue ?? undefined}
                address={wedding.reception_address ?? undefined}
              />
            </div>

            {wedding.dress_code && (
              <div className="mt-12 text-center">
                <p className="uppercase tracking-[0.3em] text-xs text-[var(--gold)]">Traje</p>
                <p className="mt-2 text-lg">{wedding.dress_code}</p>
              </div>
            )}
          </section>

          {/* GALLERY */}
          {galleryUrls.length > 0 && (
            <section className="px-6 py-24 bg-card/40">
              <div className="text-center">
                <p className="uppercase tracking-[0.4em] text-xs text-[var(--gold)]">Momentos</p>
                <GoldDivider />
              </div>
              <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {galleryUrls.map((g) => (
                  <figure key={g.id} className="aspect-[3/4] overflow-hidden bg-muted">
                    <img
                      src={g.url}
                      alt={g.caption ?? "Foto"}
                      className="w-full h-full object-cover hover:scale-105 transition duration-700"
                      loading="lazy"
                    />
                  </figure>
                ))}
              </div>
            </section>
          )}

          {/* RSVP */}
          <section id="rsvp" className="px-6 py-24">
            <div className="text-center">
              <p className="uppercase tracking-[0.4em] text-xs text-[var(--gold)]">Confirmação</p>
              <GoldDivider label="RSVP" />
              <p className="max-w-md mx-auto text-muted-foreground mb-10">
                Por favor confirme a sua presença para que possamos preparar tudo com carinho.
              </p>
            </div>
            <RsvpForm weddingId={wedding.id} />
          </section>

          {/* FOOTER */}
          <footer className="px-6 py-16 text-center bg-card/40">
            <p className="font-script text-4xl text-[var(--gold)]">{wedding.display_names}</p>
            <p className="mt-3 uppercase tracking-[0.35em] text-xs text-[var(--gold)]">
              {formatPt(date)}
            </p>
            {wedding.hashtag && (
              <p className="mt-6 text-sm text-muted-foreground">{wedding.hashtag}</p>
            )}
            <p className="mt-10 text-[10px] uppercase tracking-widest text-muted-foreground">
              <Link to="/admin" className="hover:text-[var(--gold)]">Admin</Link>
            </p>
          </footer>
        </>
      )}
    </div>
  );
}

function DetailCard({ title, time, venue, address }: { title: string; time?: string; venue?: string; address?: string }) {
  return (
    <div className="text-center border border-[var(--gold)]/30 p-8 bg-card/50">
      <p className="font-script text-3xl text-[var(--gold)]">{title}</p>
      <div className="w-10 h-px bg-[var(--gold)]/60 mx-auto my-4" />
      {time && <p className="text-lg tracking-widest">{time}</p>}
      {venue && <p className="mt-2 text-base">{venue}</p>}
      {address && <p className="mt-1 text-sm text-muted-foreground">{address}</p>}
    </div>
  );
}
