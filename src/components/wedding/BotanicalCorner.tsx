type Pos = "tl" | "tr" | "bl" | "br";

export function BotanicalCorner({ pos, size = 96 }: { pos: Pos; size?: number }) {
  const rotate = { tl: 0, tr: 90, br: 180, bl: 270 }[pos];
  const style: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    pointerEvents: "none",
    opacity: 0.75,
    willChange: "transform",
    transform: `translateZ(0) rotate(${rotate}deg)`,
    animation: "floatLeaf 6s ease-in-out infinite",
    ...(pos === "tl" && { top: 14, left: 14 }),
    ...(pos === "tr" && { top: 14, right: 14 }),
    ...(pos === "bl" && { bottom: 14, left: 14 }),
    ...(pos === "br" && { bottom: 14, right: 14 }),
  };
  return (
    <svg viewBox="0 0 100 100" style={style} aria-hidden>
      <g fill="none" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round">
        <path d="M8 8 C 30 12, 46 26, 52 48" />
        <path d="M14 10 C 20 20, 22 26, 24 32" />
        <path d="M10 14 C 20 22, 26 24, 32 24" />
        <path d="M22 18 C 26 22, 28 28, 28 34" />
        <path d="M18 22 C 24 26, 30 28, 34 28" />
        <ellipse cx="30" cy="20" rx="4" ry="2.2" transform="rotate(30 30 20)" fill="#C9A84C" opacity="0.6" />
        <ellipse cx="20" cy="30" rx="4" ry="2.2" transform="rotate(-40 20 30)" fill="#C9A84C" opacity="0.6" />
        <ellipse cx="38" cy="34" rx="3.5" ry="2" transform="rotate(20 38 34)" fill="#C9A84C" opacity="0.5" />
        <circle cx="46" cy="42" r="2.4" fill="#C9A84C" opacity="0.7" />
      </g>
    </svg>
  );
}
