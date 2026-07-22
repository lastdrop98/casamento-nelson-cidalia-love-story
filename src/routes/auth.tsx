import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin — Nelson & Cidália" },
      { name: "description", content: "Área de administração." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        nav({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Conta criada. Peça a um admin para lhe atribuir permissões.");
      }
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--ivory)]">
      <form onSubmit={submit} className="w-full max-w-sm space-y-5 border border-[var(--gold)]/30 p-8 bg-card/50">
        <div className="text-center">
          <p className="font-script text-4xl text-[var(--gold)]">Admin</p>
          <p className="mt-1 uppercase tracking-[0.35em] text-xs text-[var(--gold)]">Nelson & Cidália</p>
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 border-[var(--gold)]/40 bg-transparent" />
        </div>
        <div>
          <Label>Palavra-passe</Label>
          <Input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 border-[var(--gold)]/40 bg-transparent" />
        </div>
        <Button type="submit" disabled={loading} className="w-full bg-[var(--gold)] hover:bg-[var(--gold)]/90 uppercase tracking-[0.3em] text-xs py-6">
          {loading ? "..." : mode === "signin" ? "Entrar" : "Criar conta"}
        </Button>
        <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="w-full text-xs uppercase tracking-widest text-muted-foreground hover:text-[var(--gold)]">
          {mode === "signin" ? "Criar nova conta" : "Já tenho conta"}
        </button>
      </form>
    </div>
  );
}
