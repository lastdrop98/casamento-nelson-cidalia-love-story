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

/** Small white blossom used as a delicate accent */
function Blossom({ cx, cy, r, delay = 0 }: { cx: number; cy: number; r: number; delay?: number }) {
  const petals = [0, 72, 144, 216, 288];
  return (
    <motion.g
      animate={{ scale: [1, 1.05, 1], opacity: [0.85, 1, 0.85] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
      style={{ willChange: "transform", transformOrigin: `${cx}px ${cy}px` }}
    >
      {petals.map((a) => (
        <ellipse
          key={a}
          cx={cx}
          cy={cy - r * 0.78}
          rx={r * 0.46}
          ry={r * 0.78}
          fill="rgba(255,252,244,0.92)"
          stroke="rgba(201,168,76,0.35)"
          strokeWidth={r * 0.05}
          transform={`rotate(${a} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={r * 0.38} fill="rgba(232,206,126,0.95)" stroke="rgba(184,150,62,0.5)" strokeWidth={r * 0.05} />
    </motion.g>
  );
}

/** Leaf pair along a stem */
function Leaf({ cx, cy, rx, ry, rot }: { cx: number; cy: number; rx: number; ry: number; rot: number }) {
  return (
    <ellipse
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      fill="rgba(168,142,64,0.30)"
      stroke="rgba(178,148,62,0.55)"
      strokeWidth="0.6"
      transform={`rotate(${rot} ${cx} ${cy})`}
    />
  );
}

export function BotanicalCorner({ pos, position, size = 96, opacity = 1, inset = 26 }: Props) {
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
  const origin = which.includes("right")
    ? which.includes("bottom")
      ? "bottom right"
      : "top right"
    : which.includes("bottom")
      ? "bottom left"
      : "top left";

  return (
    <div
      style={{
        position: "absolute",
        ...positions[which],
        width: size,
        height: size,
        pointerEvents: "none",
        zIndex: 3,
        opacity,
        transform: transforms[which],
        transformOrigin: origin,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ display: "block", overflow: "visible" }}>
        <motion.g
          animate={{ y: [0, -2.5, 0], rotate: [0, 0.6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform", transformOrigin: "6px 6px" }}
        >
          {/* main stem sweeping right */}
          <path d="M 4 8 C 26 10, 48 14, 72 22" stroke="rgba(178,148,62,0.55)" strokeWidth="1.1" strokeLinecap="round" />
          {/* secondary stem sweeping down */}
          <path d="M 8 4 C 10 26, 14 48, 22 72" stroke="rgba(178,148,62,0.45)" strokeWidth="1" strokeLinecap="round" />
          {/* fine inner sprig */}
          <path d="M 6 6 C 20 20, 32 32, 44 44" stroke="rgba(170,140,58,0.3)" strokeWidth="0.7" strokeLinecap="round" />

          {/* leaves on horizontal stem */}
          <Leaf cx={22} cy={6} rx={8} ry={3} rot={-14} />
          <Leaf cx={36} cy={11} rx={8} ry={3} rot={-8} />
          <Leaf cx={52} cy={15} rx={7} ry={2.7} rot={10} />
          <Leaf cx={66} cy={21} rx={6} ry={2.4} rot={16} />
          <Leaf cx={30} cy={16} rx={6.5} ry={2.5} rot={22} />
          <Leaf cx={46} cy={22} rx={6} ry={2.3} rot={26} />

          {/* leaves on vertical stem */}
          <Leaf cx={6} cy={22} rx={3} ry={8} rot={14} />
          <Leaf cx={11} cy={36} rx={3} ry={8} rot={8} />
          <Leaf cx={15} cy={52} rx={2.7} ry={7} rot={-10} />
          <Leaf cx={21} cy={66} rx={2.4} ry={6} rot={-16} />
          <Leaf cx={16} cy={30} rx={2.5} ry={6.5} rot={-22} />
          <Leaf cx={22} cy={46} rx={2.3} ry={6} rot={-26} />

          {/* blossoms */}
          <Blossom cx={7} cy={7} r={7} />
          <Blossom cx={30} cy={26} r={4.6} delay={1.2} />
          <Blossom cx={60} cy={17} r={3.8} delay={0.6} />
          <Blossom cx={17} cy={60} r={3.8} delay={1.8} />
        </motion.g>
      </svg>
    </div>
  );
}
