// Singleton audio manager so background music survives route changes.
import { useEffect, useState } from "react";

let audio: HTMLAudioElement | null = null;
let currentSrc: string | null = null;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function ensure(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!audio) {
    audio = new Audio();
    audio.loop = true;
    audio.volume = 0.55;
    audio.preload = "auto";
    audio.addEventListener("play", emit);
    audio.addEventListener("pause", emit);
  }
  return audio;
}

export const music = {
  setSrc(src: string | null) {
    const a = ensure();
    if (!a) return;
    if (src && src !== currentSrc) {
      currentSrc = src;
      a.src = src;
    }
  },
  async play() {
    const a = ensure();
    if (!a || !currentSrc) return;
    try {
      await a.play();
    } catch {
      /* autoplay blocked */
    }
  },
  pause() {
    audio?.pause();
  },
  toggle() {
    if (!audio) return;
    if (audio.paused) this.play();
    else audio.pause();
  },
  get playing() {
    return !!audio && !audio.paused;
  },
  get hasSrc() {
    return !!currentSrc;
  },
};

export function useMusic() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const l = () => setTick((n) => n + 1);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return {
    playing: music.playing,
    hasSrc: music.hasSrc,
    play: () => music.play(),
    pause: () => music.pause(),
    toggle: () => music.toggle(),
  };
}
