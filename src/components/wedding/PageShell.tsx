import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "./PageHeader";
import { BotanicalCorner } from "./BotanicalCorner";

export function PageShell({
  title,
  children,
  background = "cream",
}: {
  title: string;
  children: ReactNode;
  background?: "cream" | "green";
}) {
  const bg =
    background === "green"
      ? "linear-gradient(180deg,#1B3526 0%,#0E2014 100%)"
      : "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 60%), linear-gradient(180deg,#FDFAF2 0%,#F5EDD8 100%)";
  return (
    <div style={{ minHeight: "100vh", background: bg, position: "relative", overflow: "hidden" }}>
      <PageHeader title={title} />
      <BotanicalCorner position="top-left" size={78} opacity={0.7} inset={76} />
      <BotanicalCorner position="top-right" size={78} opacity={0.7} inset={76} />
      <BotanicalCorner position="bottom-left" size={74} opacity={0.6} inset={28} />
      <BotanicalCorner position="bottom-right" size={74} opacity={0.6} inset={28} />
      <motion.main
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ paddingBottom: 110, position: "relative", zIndex: 1 }}
      >
        {children}
      </motion.main>
    </div>
  );
}
