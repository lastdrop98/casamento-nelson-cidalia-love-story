import { createFileRoute } from "@tanstack/react-router";
import { XiguianeInvite } from "./xiguiane";

export const Route = createFileRoute("/xiguiane-casal")({
  head: () => ({
    meta: [
      { title: "Nelson & Cidália — Xiguiane | Convite Casal" },
      { name: "description", content: "Convite válido para 2 pessoas para o Copo de Água em Xiguiane, a 28 de Novembro de 2026, às 13H00." },
    ],
  }),
  component: () => <XiguianeInvite forcedType="casal" />,
});
