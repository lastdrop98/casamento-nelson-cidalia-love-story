import { useState } from "react";
import { submitRsvp } from "@/lib/wedding";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function RsvpForm({ weddingId }: { weddingId: string }) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [count, setCount] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || attending === null) {
      toast.error("Por favor preencha o seu nome e confirmação.");
      return;
    }
    setLoading(true);
    try {
      await submitRsvp({
        wedding_id: weddingId,
        guest_name: name.trim(),
        attending,
        guest_count: count,
        message: message.trim() || undefined,
      });
      setDone(true);
      toast.success("Obrigado! A sua confirmação foi recebida.");
    } catch (err) {
      toast.error("Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="text-center py-10">
        <p className="font-script text-4xl text-[var(--gold)]">Obrigado!</p>
        <p className="mt-3 text-muted-foreground">A sua resposta foi registada com carinho.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-md mx-auto">
      <div>
        <Label htmlFor="name" className="uppercase tracking-widest text-xs text-[var(--gold)]">
          O seu nome
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-2 border-[var(--gold)]/40 bg-transparent"
        />
      </div>

      <div>
        <Label className="uppercase tracking-widest text-xs text-[var(--gold)]">
          Irá comparecer?
        </Label>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setAttending(true)}
            className={`py-3 border transition ${
              attending === true
                ? "bg-[var(--gold)] text-[var(--primary-foreground)] border-[var(--gold)]"
                : "border-[var(--gold)]/40 text-foreground"
            }`}
          >
            Sim, com alegria
          </button>
          <button
            type="button"
            onClick={() => setAttending(false)}
            className={`py-3 border transition ${
              attending === false
                ? "bg-[var(--gold)] text-[var(--primary-foreground)] border-[var(--gold)]"
                : "border-[var(--gold)]/40 text-foreground"
            }`}
          >
            Infelizmente não
          </button>
        </div>
      </div>

      {attending && (
        <div>
          <Label htmlFor="count" className="uppercase tracking-widest text-xs text-[var(--gold)]">
            Número de convidados
          </Label>
          <Input
            id="count"
            type="number"
            min={1}
            max={10}
            value={count}
            onChange={(e) => setCount(Math.min(10, Math.max(1, Number(e.target.value) || 1)))}
            className="mt-2 border-[var(--gold)]/40 bg-transparent"
          />
        </div>
      )}

      <div>
        <Label htmlFor="msg" className="uppercase tracking-widest text-xs text-[var(--gold)]">
          Mensagem aos noivos (opcional)
        </Label>
        <Textarea
          id="msg"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-2 border-[var(--gold)]/40 bg-transparent"
          rows={3}
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-[var(--primary-foreground)] uppercase tracking-[0.3em] text-xs py-6"
      >
        {loading ? "A enviar..." : "Confirmar Presença"}
      </Button>
    </form>
  );
}
