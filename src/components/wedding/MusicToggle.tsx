import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

export function MusicToggle({ src }: { src: string | null }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.volume = 0.5;
  }, [src]);

  if (!src) return null;

  const toggle = async () => {
    if (!ref.current) return;
    if (playing) {
      ref.current.pause();
      setPlaying(false);
    } else {
      try {
        await ref.current.play();
        setPlaying(true);
      } catch {
        /* autoplay blocked */
      }
    }
  };

  return (
    <>
      <audio ref={ref} src={src} loop preload="auto" />
      <button
        aria-label={playing ? "Pausar música" : "Tocar música"}
        onClick={toggle}
        className="fixed bottom-5 right-5 z-50 h-12 w-12 rounded-full bg-[var(--gold)] text-[var(--primary-foreground)] shadow-lg flex items-center justify-center hover:scale-105 transition"
      >
        {playing ? <Music className="h-5 w-5 animate-pulse" /> : <VolumeX className="h-5 w-5" />}
      </button>
    </>
  );
}
