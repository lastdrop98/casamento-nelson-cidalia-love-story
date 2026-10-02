import { useEffect, useState } from "react";

const gold = "#C9A84C";

export function InviteBadge({ tipo: tipoConvite }: { tipo?: "individual" | "casal" }) {
  const [tipoDaUrl, setTipoDaUrl] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTipoDaUrl(params.get("tipo"));
  }, []);

  const tipo = tipoConvite ?? tipoDaUrl;
  if (tipo !== "individual" && tipo !== "casal") return null;

  const label =
    tipo === "individual"
      ? "Convite válido para 1 pessoa"
      : "Convite válido para 2 pessoas";

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "14px auto 0",
        padding: "8px 18px",
        border: `1px solid ${gold}`,
        borderRadius: 999,
        background: "rgba(255,252,245,0.85)",
        fontFamily: "'Cinzel', serif",
        fontSize: 10,
        letterSpacing: 2,
        textTransform: "uppercase",
        color: "#1B3526",
      }}
    >
      {label}
    </div>
  );
}
