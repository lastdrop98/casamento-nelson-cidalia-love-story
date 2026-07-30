import { motion } from "framer-motion";

type Short = "tl" | "tr" | "bl" | "br";
type Long = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface Props {
  pos?: Short;
  position?: Long;
  size?: number;
  opacity?: number;
  /** distance from the page edge, so the art sits inside the margin */
  inset?: number;
}

const toLong = (p: Short): Long =>
  p === "tl" ? "top-left" : p === "tr" ? "top-right" : p === "bl" ? "bottom-left" : "bottom-right";

export function BotanicalCorner({ pos, position, size = 180, opacity = 1, inset = 26 }: Props) {
  const which: Long = position ?? (pos ? toLong(pos) : "top-left");

  const transforms: Record<Long, string> = {
    "top-left": "scale(1, 1)",
    "top-right": "scale(-1, 1)",
    "bottom-left": "scale(1, -1)",
    "bottom-right": "scale(-1, -1)",
  };
  const positions: Record<Long, React.CSSProperties> = {
    "top-left": { top: inset, left: inset },
    "top-right": { top: inset, right: inset },
    "bottom-left": { bottom: inset, left: inset },
    "bottom-right": { bottom: inset, right: inset },
  };
  const origin =
    which.includes("right")
      ? which.includes("bottom") ? "bottom right" : "top right"
      : which.includes("bottom") ? "bottom left" : "top left";

  return (
    <div
      style={{
        position: "absolute",
        ...positions[which],
        width: size,
        height: size,
        pointerEvents: "none",
        zIndex: 0,
        opacity,
        transform: transforms[which],
        transformOrigin: origin,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 200 200" fill="none" style={{ overflow: "hidden", display: "block" }}>
        <g transform="translate(26, -14) scale(0.9)">
        <motion.g
          animate={{ y: [0, -6, -3, 0], rotate: [0, 0.5, -0.3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
          style={{ willChange: "transform", transformOrigin: "bottom left" }}
        >

          <path d="M 0 185 C 28 148 62 105 108 62" stroke="rgba(165,135,55,0.55)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M 0 155 C 22 118 52 82 90 48" stroke="rgba(155,125,48,0.42)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M 0 122 C 18 95 40 70 74 40" stroke="rgba(145,118,45,0.32)" strokeWidth="0.9" fill="none" strokeLinecap="round" />

          <motion.ellipse cx="18" cy="158" rx="32" ry="12" fill="rgba(186,161,73,0.28)" stroke="rgba(176,146,59,0.45)" strokeWidth="0.9" transform="rotate(-23 18 158)"
            animate={{ y: [0, -4, 0], rotate: [-23, -22, -24, -23] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ willChange: "transform" }} />
          <motion.ellipse cx="44" cy="130" rx="35" ry="13" fill="rgba(171,145,67,0.24)" stroke="rgba(162,133,52,0.42)" strokeWidth="0.9" transform="rotate(-43 44 130)"
            animate={{ y: [0, -5, -2, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} style={{ willChange: "transform" }} />
          <motion.ellipse cx="70" cy="102" rx="30" ry="11.5" fill="rgba(189,163,75,0.24)" stroke="rgba(179,149,61,0.42)" strokeWidth="0.8" transform="rotate(-58 70 102)"
            animate={{ y: [0, -4, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }} style={{ willChange: "transform" }} />
          <motion.ellipse cx="94" cy="75" rx="26" ry="10" fill="rgba(173,147,68,0.21)" stroke="rgba(164,136,53,0.38)" strokeWidth="0.8" transform="rotate(-68 94 75)"
            animate={{ y: [0, -3, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.8 }} style={{ willChange: "transform" }} />
          <motion.ellipse cx="114" cy="50" rx="22" ry="9" fill="rgba(161,136,63,0.18)" stroke="rgba(153,125,50,0.33)" strokeWidth="0.7" transform="rotate(-75 114 50)"
            animate={{ y: [0, -3, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.4 }} style={{ willChange: "transform" }} />
          <motion.ellipse cx="6" cy="120" rx="23" ry="9" fill="rgba(179,153,71,0.22)" stroke="rgba(168,140,56,0.38)" strokeWidth="0.7" transform="rotate(-13 6 120)"
            animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} style={{ willChange: "transform" }} />
          <motion.ellipse cx="30" cy="90" rx="20" ry="8.5" fill="rgba(183,157,73,0.20)" stroke="rgba(173,144,58,0.35)" strokeWidth="0.7" transform="rotate(-38 30 90)"
            animate={{ y: [0, -3, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.9 }} style={{ willChange: "transform" }} />
          <motion.ellipse cx="56" cy="62" rx="18" ry="7.5" fill="rgba(168,142,65,0.18)" stroke="rgba(158,130,51,0.32)" strokeWidth="0.6" transform="rotate(-55 56 62)"
            animate={{ y: [0, -3, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} style={{ willChange: "transform" }} />
          <ellipse cx="148" cy="12" rx="12" ry="4.5" fill="rgba(158,133,60,0.28)" stroke="rgba(148,122,46,0.36)" strokeWidth="0.5" transform="rotate(-82 148 12)" />
          <ellipse cx="165" cy="22" rx="9" ry="3.5" fill="rgba(148,124,56,0.22)" stroke="rgba(140,113,43,0.30)" strokeWidth="0.5" transform="rotate(-78 165 22)" />
        </motion.g>

        <motion.g
          animate={{ scale: [1, 1.04, 1], opacity: [0.73, 0.88, 0.73] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
          style={{ willChange: "transform", transformOrigin: "10px 172px" }}
        >
          <ellipse cx="10" cy="172" rx="28" ry="22" fill="rgba(255,252,243,0.75)" stroke="rgba(222,202,142,0.28)" strokeWidth="0.9" />
          <ellipse cx="10" cy="150" rx="15" ry="11" fill="rgba(255,251,241,0.70)" stroke="rgba(217,197,137,0.24)" strokeWidth="0.7" />
          <ellipse cx="-8" cy="162" rx="14" ry="10" fill="rgba(255,250,239,0.68)" stroke="rgba(214,193,133,0.22)" strokeWidth="0.7" />
          <ellipse cx="28" cy="162" rx="14" ry="10" fill="rgba(255,251,241,0.68)" stroke="rgba(214,193,133,0.22)" strokeWidth="0.7" />
          <ellipse cx="10" cy="193" rx="13" ry="9" fill="rgba(255,250,237,0.62)" stroke="rgba(212,191,131,0.19)" strokeWidth="0.6" />
          <ellipse cx="10" cy="160" rx="8" ry="6" fill="rgba(255,251,240,0.65)" stroke="rgba(216,196,136,0.22)" strokeWidth="0.5" />
          <ellipse cx="-2" cy="170" rx="7" ry="5" fill="rgba(255,250,238,0.60)" stroke="rgba(212,192,132,0.20)" strokeWidth="0.5" />
          <ellipse cx="22" cy="170" rx="7" ry="5" fill="rgba(255,250,238,0.60)" stroke="rgba(212,192,132,0.20)" strokeWidth="0.5" />
          <circle cx="10" cy="172" r="9" fill="rgba(240,218,130,0.62)" stroke="rgba(203,170,78,0.48)" strokeWidth="0.9" />
          <circle cx="10" cy="172" r="4.5" fill="rgba(203,170,78,0.65)" />
          <circle cx="7" cy="170" r="1.2" fill="rgba(201,168,76,0.7)" />
          <circle cx="13" cy="170" r="1.2" fill="rgba(201,168,76,0.7)" />
          <circle cx="10" cy="167" r="1.2" fill="rgba(201,168,76,0.7)" />
        </motion.g>

        <motion.g
          animate={{ scale: [1, 1.035, 1], opacity: [0.65, 0.82, 0.65] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2, repeatType: "loop" }}
          style={{ willChange: "transform", transformOrigin: "56px 134px" }}
        >
          <circle cx="56" cy="134" r="20" fill="rgba(255,251,242,0.66)" stroke="rgba(219,199,139,0.24)" strokeWidth="0.8" />
          <ellipse cx="56" cy="115" rx="11" ry="8.5" fill="rgba(255,250,240,0.62)" stroke="rgba(213,193,133,0.21)" strokeWidth="0.7" />
          <ellipse cx="40" cy="124" rx="11" ry="7.5" fill="rgba(255,249,238,0.60)" stroke="rgba(211,191,131,0.19)" strokeWidth="0.6" />
          <ellipse cx="72" cy="124" rx="11" ry="7.5" fill="rgba(255,249,238,0.60)" stroke="rgba(211,191,131,0.19)" strokeWidth="0.6" />
          <ellipse cx="56" cy="152" rx="10" ry="7" fill="rgba(255,249,237,0.57)" stroke="rgba(210,190,129,0.18)" strokeWidth="0.6" />
          <circle cx="56" cy="134" r="6.5" fill="rgba(237,215,128,0.58)" stroke="rgba(200,165,74,0.43)" strokeWidth="0.7" />
          <circle cx="56" cy="134" r="3" fill="rgba(200,165,74,0.60)" />
        </motion.g>

        <motion.g
          animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          style={{ willChange: "transform", transformOrigin: "92px 48px" }}
        >
          <circle cx="92" cy="48" r="8" fill="rgba(255,250,240,0.55)" stroke="rgba(215,192,130,0.30)" strokeWidth="0.7" />
          <circle cx="92" cy="40" r="4.5" fill="rgba(255,249,238,0.48)" stroke="rgba(212,190,128,0.25)" strokeWidth="0.6" />
          <circle cx="85" cy="44" r="4" fill="rgba(255,249,238,0.45)" />
          <circle cx="99" cy="44" r="4" fill="rgba(255,249,238,0.45)" />
          <circle cx="92" cy="56" r="4" fill="rgba(255,249,238,0.42)" />
          <circle cx="92" cy="48" r="3.5" fill="rgba(235,210,122,0.55)" stroke="rgba(198,162,70,0.38)" strokeWidth="0.6" />
          <circle cx="92" cy="48" r="1.8" fill="rgba(198,162,70,0.60)" />
        </motion.g>

        {[
          { cx: 30, cy: 180, r: 2.5, delay: 0 },
          { cx: 65, cy: 145, r: 2, delay: 1 },
          { cx: 100, cy: 110, r: 1.8, delay: 2 },
          { cx: 135, cy: 75, r: 1.5, delay: 0.5 },
        ].map((dot, i) => (
          <motion.circle
            key={i}
            cx={dot.cx} cy={dot.cy} r={dot.r}
            fill={`rgba(201,168,76,${0.25 - i * 0.04})`}
            animate={{ y: [0, -5, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: dot.delay }}
            style={{ willChange: "transform" }}
          />
        ))}
      </svg>
    </div>
  );
}
