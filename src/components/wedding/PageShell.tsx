import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "./PageHeader";

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
    <div style={{ minHeight: "100vh", background: bg }}>
      <PageHeader title={title} />
      <motion.main
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ paddingBottom: 110 }}
      >
        {children}
      </motion.main>
    </div>
  );
}
