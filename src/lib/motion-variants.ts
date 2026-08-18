import type { Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export const zoomFade: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } },
};

export const blurFade: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export const blurFadeDown: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: -40 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

export const flipIn: Variants = {
  hidden: { opacity: 0, rotateX: -30, y: 40 },
  visible: { opacity: 1, rotateX: 0, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const springPop: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 12 } },
};

export const inView = { once: true, margin: "-80px" } as const;
export const inViewNear = { once: true, margin: "-60px" } as const;
export const willChange = { willChange: "transform, opacity" } as const;
