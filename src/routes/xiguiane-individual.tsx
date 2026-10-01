import { createFileRoute } from "@tanstack/react-router";
import { XiguianeInvite } from "./xiguiane";

export const Route = createFileRoute("/xiguiane-individual")({
  head: () => ({
    meta: [
      { title: "Nelson & Cidália — Xiguiane | Convite Individual" },
      { name: "description", content: "Convite individual para o Copo de Água em Xiguiane, a 28 de Novembro de 2026, às 13H00." },
    ],
  }),
  component: () => <XiguianeInvite forcedType="individual" />,
});
