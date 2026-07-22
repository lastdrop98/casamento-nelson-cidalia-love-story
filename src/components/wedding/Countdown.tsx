import { useEffect, useState } from "react";

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

export function Countdown({ date }: { date: string }) {
  const target = new Date(date);
  const [t, setT] = useState(() => diff(target));
  useEffect(() => {
    const i = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(i);
  }, [date]);

  const items = [
    { label: "Dias", value: t.days },
    { label: "Horas", value: t.hours },
    { label: "Min", value: t.minutes },
    { label: "Seg", value: t.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-md mx-auto">
      {items.map((it) => (
        <div key={it.label} className="text-center">
          <div className="border border-[var(--gold)]/40 rounded-md py-4 px-2 bg-card/60 backdrop-blur">
            <div className="text-3xl sm:text-4xl font-light tabular-nums text-[var(--foreground)]">
              {String(it.value).padStart(2, "0")}
            </div>
          </div>
          <div className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
            {it.label}
          </div>
        </div>
      ))}
    </div>
  );
}
