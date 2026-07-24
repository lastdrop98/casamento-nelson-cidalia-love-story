import { ChevronLeft } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

export function PageHeader({ title }: { title: string }) {
  const router = useRouter();
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        height: 60,
        background: "linear-gradient(180deg,#1E3828,#142A1C)",
        borderBottom: "1px solid rgba(201,168,76,0.25)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
        display: "grid",
        gridTemplateColumns: "60px 1fr 60px",
        alignItems: "center",
      }}
    >
      <button
        onClick={() => router.history.back()}
        aria-label="Voltar"
        style={{
          background: "transparent", border: "none", color: "#C9A84C",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", height: "100%",
        }}
      >
        <ChevronLeft size={24} />
      </button>
      <h1 style={{
        margin: 0, textAlign: "center",
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 11, letterSpacing: 6, textTransform: "uppercase",
        color: "#C9A84C",
      }}>{title}</h1>
      <div />
    </header>
  );
}
